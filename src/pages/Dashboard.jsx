import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Activity,
  TrendingUp,
  Clock,
  ArrowRight,
  Sparkles,
  Plus,
  FileText,
  MessageSquare,
  ChevronRight,
  Stethoscope,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useHealthStore } from "@/store/healthStore";
import Button from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import ChatInterface from "@/components/features/ChatInterface";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const QuickAction = ({ icon: Icon, label, onClick, colorClass, bgClass }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 group text-center">
    <div
      className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors",
        bgClass,
      )}>
      <Icon className={cn("w-6 h-6", colorClass)} />
    </div>
    <span className="text-xs font-bold text-gray-700 group-hover:text-gray-900 leading-tight">
      {label}
    </span>
  </button>
);

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { reports, fetchReports, adherenceLogs, fetchAdherenceLogs } =
    useHealthStore();

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin");
      return;
    }
    if (user?.role === "doctor") {
      navigate("/doctor-dashboard");
      return;
    }
    fetchReports();
  }, [fetchReports, fetchAdherenceLogs, user, navigate]);

  // Calculate adherence stats for the chart
  const adherenceData = useMemo(() => {
    if (!adherenceLogs || adherenceLogs.length === 0) {
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const todayIndex = new Date().getDay();
      const rotatedDays = [
        ...days.slice(todayIndex),
        ...days.slice(0, todayIndex),
      ];
      return rotatedDays.map((day) => ({
        name: day,
        score: Math.floor(Math.random() * (100 - 60 + 1)) + 60,
      }));
    }

    const data = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const logs = adherenceLogs.filter((l) => l.date === dateStr);
      const taken = logs.filter((l) => l.taken).length;
      const total = logs.length || 1;
      const percentage = logs.length > 0 ? (taken / total) * 100 : 0;
      data.push({
        name: d.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        score: Math.round(percentage),
      });
    }
    return data;
  }, [adherenceLogs]);

  const displayReport =
    reports.length > 0
      ? reports[0]
      : {
          id: "mock-report",
          type: "General Blood Panel",
          date: new Date().toISOString(),
          lab: "MediCare Labs",
          status: "normal",
        };

  const currentHour = new Date().getHours();
  let greetingKey = "dashboardPage.greetingMorning";
  if (currentHour >= 12 && currentHour < 17) {
    greetingKey = "dashboardPage.greetingAfternoon";
  } else if (currentHour >= 17 || currentHour < 5) {
    greetingKey = "dashboardPage.greetingEvening";
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-gray-100">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {t(greetingKey, {
              name: user?.name?.split(" ")[0] || "User",
            })}
            <span className="text-primary-600">.</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1 text-sm">
            {t("dashboardPage.summary")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => navigate("/profile")}
            className="hidden sm:flex rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50 text-xs py-2.5">
            {t("dashboardPage.viewProfile")}
          </Button>
          <Button
            size="sm"
            onClick={() => navigate("/reports")}
            className="rounded-xl shadow-sm text-xs py-2.5 px-4">
            <Plus className="w-4 h-4 mr-1.5" />
            {t("dashboardPage.analyzeNew")}
          </Button>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <QuickAction
          icon={FileText}
          label={t("dashboardPage.uploadReport")}
          onClick={() => navigate("/reports")}
          bgClass="bg-primary-50"
          colorClass="text-primary-600"
        />
        <QuickAction
          icon={Activity}
          label={t("dashboardPage.logSymptoms")}
          onClick={() => navigate("/symptoms")}
          bgClass="bg-primary-50"
          colorClass="text-primary-600"
        />
        <QuickAction
          icon={MessageSquare}
          label={t("dashboardPage.askAI")}
          onClick={() => navigate("/consultation")}
          bgClass="bg-primary-50"
          colorClass="text-primary-600"
        />
      </div>

      {/* Main Grid: Insights & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
      

          {/* Adherence Chart */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary-600" />
                {t("dashboardPage.adherenceTitle")}
              </h2>
              <select className="text-xs font-semibold bg-transparent border-none text-gray-500 cursor-pointer focus:ring-0">
                <option>{t("dashboardPage.last7Days")}</option>
                <option>{t("dashboardPage.last30Days")}</option>
              </select>
            </div>
            <Card className="shadow-sm border border-gray-100 bg-white rounded-2xl">
              <CardBody className="p-5 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={adherenceData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient
                        id="colorScore"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1">
                        <stop
                          offset="5%"
                          stopColor="#2563eb"
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="95%"
                          stopColor="#2563eb"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f3f4f6"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9ca3af", fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9ca3af", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #f3f4f6",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#2563eb"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorScore)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
          </section>
        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-6">
          {/* Latest Report Card */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                {t("dashboardPage.recent")}
              </h2>
              <button
                onClick={() => navigate("/reports")}
                className="text-xs font-bold text-primary-600 hover:text-primary-700">
                {t("dashboardPage.viewAll")}
              </button>
            </div>

            <Card
              className="border border-gray-100 shadow-sm hover:shadow-card-hover transition-all duration-300 group cursor-pointer rounded-2xl"
              onClick={() =>
                displayReport.id !== "mock-report"
                  ? navigate(`/results/${displayReport.id}`)
                  : navigate("/reports")
              }>
              <CardBody className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2.5 bg-primary-50 rounded-xl text-primary-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <Badge
                    variant={
                      displayReport.status === "normal" ? "success" : "error"
                    }>
                    {displayReport.status === "normal"
                      ? t("dashboardPage.statusNormal")
                      : t("dashboardPage.statusAttention")}
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-1">
                  {displayReport.type || "Lab Report"}
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  {displayReport.lab || "Unknown Lab"} •{" "}
                  {displayReport.date
                    ? new Date(displayReport.date).toLocaleDateString("en-GB", {
                        month: "short",
                        day: "numeric",
                      })
                    : "No Date"}
                </p>

                <div className="flex items-center text-primary-600 font-bold text-xs group-hover:translate-x-1 transition-transform">
                  {t("dashboardPage.viewDetails")}
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </CardBody>
            </Card>
          </section>

          {/* Consult a Specialist */}
          <Card className="border border-gray-100 shadow-sm hover:shadow-card-hover transition-all duration-300 bg-white rounded-2xl">
            <CardBody className="p-6">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center mb-4 text-primary-600">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold mb-1.5 text-gray-900">
                {t("dashboardPage.consultSpecialist")}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">
                {t("dashboardPage.consultDesc")}
              </p>
              <Button
                className="w-full bg-primary-600 text-white hover:bg-primary-700 shadow-sm font-semibold rounded-xl py-3 text-xs flex items-center justify-center gap-2"
                onClick={() => navigate("/consultants")}>
                {t("dashboardPage.findDoctor")}
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
      <ChatInterface />
    </div>
  );
};

export default Dashboard;
