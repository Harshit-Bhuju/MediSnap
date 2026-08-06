import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Stethoscope,
  Briefcase,
  Clock,
  ChevronRight,
  ShieldCheck,
  Grid3x3,
  LayoutGrid,
  CheckCircle2,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import API from "@/Configs/ApiEndpoints";

const Consultants = () => {
  const { t } = useTranslation();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'compact'
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(API.CONSULTANTS_LIST, {
        withCredentials: true,
      });
      if (res.data.status === "success") {
        setDoctors(res.data.doctors);
      }
    } catch (error) {
      toast.error("Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  const specialties = ["All", ...new Set(doctors.map((d) => d.specialty))];

  const filteredDoctors = doctors.filter((d) => {
    const matchesSearch =
      d.username.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialty =
      specialtyFilter === "All" || d.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  const handleBookNow = (doctor) => {
    navigate("/booking", { state: { doctor } });
  };

  // Skeleton Loading
  const SkeletonCard = ({ compact = false }) => (
    <div
      className={`bg-white rounded-2xl border border-gray-100 overflow-hidden ${
        compact ? "h-[120px]" : "h-[360px]"
      }`}>
      <div className="animate-pulse h-full">
        {!compact && <div className="h-40 bg-gray-100" />}
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-100 rounded w-3/4" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
          {!compact && (
            <>
              <div className="h-3 bg-gray-100 rounded w-full" />
              <div className="h-3 bg-gray-100 rounded w-5/6" />
            </>
          )}
        </div>
      </div>
    </div>
  );

  // Compact Card
  const CompactDoctorCard = ({ doc }) => (
    <div className="bg-white rounded-2xl border border-gray-100 hover:border-primary-200 transition-colors overflow-hidden">
      <div className="flex gap-4 p-4">
        <div className="relative flex-shrink-0">
          {doc.profile_pic ? (
            <img
              src={doc.profile_pic}
              alt={doc.display_name || doc.username}
              className="w-16 h-16 rounded-xl object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-xl bg-primary-50 flex items-center justify-center">
              <Stethoscope className="w-7 h-7 text-primary-500" />
            </div>
          )}
          <div className="absolute -top-1 -right-1 bg-success-500 w-4 h-4 rounded-full border-2 border-white" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-sm truncate">
            {doc.display_name || doc.username}
          </h3>
          <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-md bg-primary-50 text-primary-700 text-[10px] font-semibold">
            <Stethoscope className="w-3 h-3" />
            {doc.specialty}
          </span>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              {doc.experience_years}y exp
            </span>
            <span className="font-bold text-primary-600">
              Rs. {doc.consultation_rate}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 flex-shrink-0 justify-center">
          <button
            onClick={() => navigate(`/consultant-profile/${doc.id}`)}
            className="px-4 py-2 rounded-lg text-xs font-semibold border border-gray-200 hover:bg-gray-50 transition-colors">
            View
          </button>
          <button
            onClick={() => handleBookNow(doc)}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors flex items-center justify-center gap-1">
            Book <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );

  // Standard Card
  const StandardDoctorCard = ({ doc }) => (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-primary-200 hover:shadow-card-hover transition-all duration-200">
      <div className="relative h-40 bg-gray-50">
        {doc.profile_pic ? (
          <img
            src={doc.profile_pic}
            alt={doc.display_name || doc.username}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Stethoscope className="w-14 h-14 text-primary-200" />
          </div>
        )}

        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white text-primary-700 text-[10px] font-bold border border-gray-100 shadow-sm">
            {doc.specialty}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <div className="w-7 h-7 rounded-full bg-success-500 flex items-center justify-center shadow-sm">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-base leading-tight mb-3">
          {doc.display_name || doc.username}
        </h3>

        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Briefcase className="w-4 h-4 text-primary-500" />
            <span className="font-semibold">{doc.experience_years}</span>
            <span className="text-gray-400">
              {t("consultantsPage.years")} Exp.
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <Clock className="w-4 h-4 text-success-500" />
            <span className="font-bold text-success-600">Available</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-gray-500 font-medium">
            {t("consultantsPage.fee")}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-gray-500">Rs.</span>
            <span className="text-xl font-bold text-primary-600">
              {doc.consultation_rate}
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-2">
          {doc.bio || t("consultantsPage.noDesc")}
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/consultant-profile/${doc.id}`)}
            className="flex-1 rounded-xl py-2.5 text-[10px] font-bold uppercase tracking-widest border border-gray-200 hover:bg-gray-50 transition-colors">
            {t("consultantsPage.viewProfile")}
          </button>
          <button
            onClick={() => handleBookNow(doc)}
            className="flex-[1.5] rounded-xl py-2.5 text-[10px] font-bold uppercase tracking-widest bg-primary-600 text-white hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
            {t("consultantsPage.bookNow")}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Simple Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-primary-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary-600">
              {t("consultantsPage.verifiedTitle")}
            </span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            {t("consultantsPage.title")}
          </h1>
          <p className="text-gray-500 text-sm max-w-2xl">
            {t("consultantsPage.subtitle")}
          </p>

          <div className="flex gap-8 mt-6">
            <div>
              <div className="text-2xl font-black text-gray-900">
                {doctors.length}+
              </div>
              <div className="text-xs text-gray-500 font-medium">
                Specialists
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">24/7</div>
              <div className="text-xs text-gray-500 font-medium">
                Available
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-6 bg-white rounded-2xl border border-gray-100 p-4">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t("consultantsPage.search")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary-100 focus:bg-white focus:border-primary-300 transition-all"
              />
            </div>

            <div className="w-full lg:w-56">
              <select
                value={specialtyFilter}
                onChange={(e) => setSpecialtyFilter(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary-100 focus:bg-white focus:border-primary-300 transition-all">
                {specialties.map((s) => (
                  <option key={s} value={s}>
                    {s === "All" ? "All Specialties" : s}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}>
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("compact")}
                className={`p-2.5 rounded-lg transition-colors ${
                  viewMode === "compact"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}>
                <Grid3x3 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {(search || specialtyFilter !== "All") && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs font-semibold text-gray-400">
                Filters:
              </span>
              {search && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold">
                  "{search}"
                  <button
                    onClick={() => setSearch("")}
                    className="ml-0.5 hover:bg-primary-100 rounded-full w-4 h-4 flex items-center justify-center">
                    ×
                  </button>
                </span>
              )}
              {specialtyFilter !== "All" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold">
                  {specialtyFilter}
                  <button
                    onClick={() => setSpecialtyFilter("All")}
                    className="ml-0.5 hover:bg-primary-100 rounded-full w-4 h-4 flex items-center justify-center">
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {!loading && (
          <p className="text-sm text-gray-500 mb-4">
            Showing{" "}
            <span className="font-bold text-gray-900">
              {filteredDoctors.length}
            </span>{" "}
            specialists
          </p>
        )}

        <div
          className={`grid gap-5 ${
            viewMode === "compact"
              ? "grid-cols-1 lg:grid-cols-2"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}>
          {loading ? (
            [1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} compact={viewMode === "compact"} />
            ))
          ) : filteredDoctors.length === 0 ? (
            <div className="col-span-full">
              <div className="text-center py-16 px-4">
                <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gray-100 flex items-center justify-center">
                  <Users className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {t("consultantsPage.noSpecialists")}
                </h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                  {t("consultantsPage.noSpecialistsDesc")}
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setSpecialtyFilter("All");
                  }}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors">
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            filteredDoctors.map((doc) =>
              viewMode === "compact" ? (
                <CompactDoctorCard key={doc.id} doc={doc} />
              ) : (
                <StandardDoctorCard key={doc.id} doc={doc} />
              ),
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Consultants;