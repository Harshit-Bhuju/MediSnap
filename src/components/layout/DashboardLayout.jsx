import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, Search, Bell, Globe, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const currentLangLabel = i18n.language === "ne" ? "नेपाली" : "English";

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="lg:pl-64 flex flex-col min-h-screen print:pl-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 sm:px-6 py-3.5 print:hidden">
          <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="Toggle Sidebar">
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden sm:flex items-center gap-2 text-gray-400 bg-gray-50 px-3.5 py-1.5 rounded-xl border border-gray-100 w-48 lg:w-64">
                <Search className="w-4 h-4" />
                <span className="text-xs font-medium truncate">
                  {t("common.quickSearch")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-error-500 rounded-full border-2 border-white" />
              </button>
              <div className="h-6 w-[1px] bg-gray-100 mx-1" />

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
            </div>
          </div>
        </header>

        <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
