import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import API from "@/Configs/ApiEndpoints";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  LogOut,
  X,
  Stethoscope,
  ScanLine,
  Map,
  Users,
  ChevronDown,
  UserCog,
  Shield,
  ClipboardList,
  Activity,
  Gift,
  History,
  Calendar,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";
import logoIcon from "@/assets/logos/medisnap_logo.png";

const Sidebar = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userPoints, setUserPoints] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    fetch(API.REWARDS_LIST, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d?.status === "success") setUserPoints(d.userPoints ?? 0);
      })
      .catch(() => {});
  }, [user?.id]);

  const mainGroups = [
    {
      title: t("footer.quickLinks"),
      items: [
        {
          name: t("sidebar.dashboard"),
          path: "/dashboard",
          icon: LayoutDashboard,
        },
        { name: t("sidebar.reports"), path: "/reports", icon: FileText },
        { name: t("sidebar.history"), path: "/medical-history", icon: History },
      ],
    },
    {
      title: t("sidebar.intelligence"),
      items: [
        { name: t("sidebar.symptoms"), path: "/symptoms", icon: Activity },
        {
          name: t("sidebar.prescriptions"),
          path: "/prescriptions",
          icon: ScanLine,
        },
      ],
    },
    {
      title: t("sidebar.connect"),
      items: [
        {
          name: t("sidebar.consultation"),
          path: "/consultation",
          icon: MessageSquare,
        },
        { name: "My Appointments", path: "/my-appointments", icon: Calendar },
        { name: t("sidebar.doctors"), path: "/consultants", icon: Stethoscope },
        { name: t("family.title"), path: "/family", icon: Users },
      ],
    },
    {
      title: t("sidebar.discover"),
      items: [
        { name: t("quest.title"), path: "/quest-game", icon: Map },
        {
          name: t("marketplace.title"),
          path: "/marketplace",
          icon: Gift,
          badge: userPoints != null ? `${userPoints} pts` : null,
        },
      ],
    },
  ];

  // System/Admin items
  const systemItems = [
    ...(user?.role === "doctor"
      ? [
          {
            name: t("sidebar.doctorProfile"),
            path: "/doctor-profile",
            icon: ClipboardList,
          },
        ]
      : []),
    ...(user?.role === "admin"
      ? [{ name: t("nav.adminPanel"), path: "/admin", icon: Shield }]
      : []),
  ];

  if (systemItems.length > 0) {
    mainGroups.push({
      title: t("sidebar.system"),
      items: systemItems,
    });
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 lg:hidden print:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-100 z-50 transition-all duration-300 print:hidden",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="px-5 py-4 flex items-center justify-between border-b border-gray-50">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={logoIcon}
                alt="MediSnap"
                className="h-9 w-9 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-lg font-black text-gray-900 tracking-tight leading-none">
                  Medi<span className="text-primary-600">Snap</span>
                </span>
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider leading-none mt-1">
                  Precision Health
                </span>
              </div>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-grow px-3 space-y-4 overflow-y-auto scrollbar-hide py-4">
            {mainGroups.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-1">
                <div className="px-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                  {group.title}
                </div>
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => window.innerWidth < 1024 && onClose()}
                    className={({ isActive }) =>
                      cn(
                        "relative flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 group overflow-hidden",
                        isActive
                          ? "bg-primary-50 text-primary-600 font-bold"
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
                      )
                    }>
                    {({ isActive }) => (
                      <>
                        <item.icon
                          className={cn(
                            "w-4 h-4 min-w-[16px] transition-all duration-200",
                            isActive
                              ? "text-primary-600"
                              : "text-gray-400 group-hover:text-primary-600",
                          )}
                        />
                        <span className="truncate tracking-tight flex-1">
                          {item.name}
                        </span>
                        {item.badge && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-primary-100 text-primary-600 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            ))}
          </nav>

          {/* User Profile / Logout */}
          <div className="p-3 border-t border-gray-100 mt-auto bg-gray-50/50">
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={cn(
                  "w-full flex items-center gap-2.5 p-2 rounded-xl transition-all duration-200 group",
                  isUserMenuOpen
                    ? "bg-white shadow-sm ring-1 ring-gray-200"
                    : "hover:bg-white",
                )}>
                <div className="relative shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 overflow-hidden ring-1 ring-white">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-bold text-xs">
                        {user?.name?.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-grow min-w-0 text-left">
                  <p className="text-xs font-bold text-gray-900 truncate">
                    {user?.name}
                  </p>
                  <p className="text-[10px] font-medium text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 text-gray-400 transition-transform duration-200",
                    isUserMenuOpen && "rotate-180",
                  )}
                />
              </button>

              {/* Floating Menu */}
              {isUserMenuOpen && (
                <div
                  className={cn(
                    "absolute bottom-full mb-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[60] transition-all",
                    "lg:left-0 lg:bottom-full lg:mb-2 lg:w-full",
                    "left-0 right-0 w-full",
                  )}>
                  <div className="p-1.5 space-y-1">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setIsUserMenuOpen(false);
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors">
                      <UserCog className="w-4 h-4 text-gray-400" />
                      {t("common.edit") || "Edit"} Profile
                    </button>
                    <div className="h-px bg-gray-100 mx-1" />
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-error-600 hover:bg-error-50 rounded-lg transition-colors">
                      <LogOut className="w-4 h-4 text-error-500" />
                      {t("sidebar.signout")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
