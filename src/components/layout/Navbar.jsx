import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import {
  Menu as MenuIcon,
  X,
  Globe,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import Button from "@/components/ui/Button";
import logoIcon from "@/assets/logos/rapireport_logo.png";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, user, updateProfile } = useAuthStore();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    if (isAuthenticated) {
      updateProfile({ ...user, language: lang });
    }
  };

  const getNavLinks = () => {
    if (!isAuthenticated) {
      return [{ name: t("nav.home"), path: "/" }];
    }

    if (user?.role === "admin") {
      return [{ name: t("nav.adminPanel"), path: "/admin" }];
    }

    if (user?.role === "doctor") {
      return [{ name: t("nav.dashboard"), path: "/doctor-dashboard" }];
    }

    return [
      { name: t("nav.home"), path: "/" },
      { name: t("nav.dashboard"), path: "/dashboard" },
    ];
  };

  const navLinks = getNavLinks();

  const getHomePath = () => {
    if (!isAuthenticated) return "/";
    if (user?.role === "admin") return "/admin";
    if (user?.role === "doctor") return "/doctor-dashboard";
    return "/dashboard";
  };

  const currentLangLabel = i18n.language === "ne" ? "नेपाली" : "English";

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container-custom h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to={getHomePath()} className="flex items-center gap-2 group">
          <img
            src={logoIcon}
            alt="MediSnap"
            className="h-10 w-10 object-contain"
          />
          <div className="flex flex-col">
            <span className="text-xl font-black text-gray-900 tracking-tight leading-none">
              Medi<span className="text-primary-600">Snap</span>
            </span>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-1">
              Precision Health
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm font-semibold text-gray-600 hover:text-primary-600 transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Selector Dropdown */}
          <HeadlessMenu as="div" className="relative inline-block text-left">
            <HeadlessMenu.Button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all text-xs font-semibold text-gray-700">
              <Globe className="w-3.5 h-3.5 text-gray-500" />
              <span>{currentLangLabel}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </HeadlessMenu.Button>

            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0">
              <HeadlessMenu.Items className="absolute right-0 mt-2 w-32 origin-top-right rounded-xl bg-white p-1.5 shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
                <HeadlessMenu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => changeLanguage("en")}
                      className={`${
                        active ? "bg-primary-50 text-primary-600" : "text-gray-700"
                      } group flex w-full items-center rounded-lg px-3 py-2 text-xs font-semibold`}>
                      English
                    </button>
                  )}
                </HeadlessMenu.Item>
                <HeadlessMenu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => changeLanguage("ne")}
                      className={`${
                        active ? "bg-primary-50 text-primary-600" : "text-gray-700"
                      } group flex w-full items-center rounded-lg px-3 py-2 text-xs font-semibold`}>
                      नेपाली
                    </button>
                  )}
                </HeadlessMenu.Item>
              </HeadlessMenu.Items>
            </Transition>
          </HeadlessMenu>

          {isAuthenticated ? (
            <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
              <div className="text-right">
                <p className="text-xs font-bold text-gray-900 leading-tight">
                  {user?.name || "User"}
                </p>
                <button
                  onClick={logout}
                  className="text-[10px] font-medium text-gray-400 hover:text-error-600 flex items-center gap-1 ml-auto transition-colors">
                  <LogOut className="w-3 h-3" />
                  {t("nav.logout")}
                </button>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                <User className="w-4 h-4" />
              </div>
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() => navigate("/auth")}>
                {t("nav.login")}
              </Button>
              <Button
                size="sm"
                className="text-xs rounded-lg"
                onClick={() => navigate("/auth")}>
                {t("nav.signup")}
              </Button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 -translate-y-4"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-4">
        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full left-0 overflow-hidden shadow-lg">
          <div className="container-custom py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-base font-semibold text-gray-900 border-b border-gray-50 pb-2">
                {link.name}
              </Link>
            ))}

            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-xs font-semibold text-gray-500">Language</span>
              <div className="flex gap-2">
                <button
                  onClick={() => changeLanguage("en")}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    i18n.language === "en" ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-700"
                  }`}>
                  EN
                </button>
                <button
                  onClick={() => changeLanguage("ne")}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    i18n.language === "ne" ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-700"
                  }`}>
                  NE
                </button>
              </div>
            </div>

            {!isAuthenticated ? (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    navigate("/auth");
                    setIsOpen(false);
                  }}>
                  {t("nav.login")}
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    navigate("/auth");
                    setIsOpen(false);
                  }}>
                  {t("nav.signup")}
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}>
                {t("nav.logout")}
              </Button>
            )}
          </div>
        </div>
      </Transition>
    </nav>
  );
};

export default Navbar;
