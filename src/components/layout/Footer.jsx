import React from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin } from "lucide-react";
import logoIcon from "@/assets/logos/medisnap_logo.png";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src={logoIcon}
                alt="MediSnap"
                className="h-9 w-9 object-contain"
              />
              <span className="text-xl font-black text-gray-900 tracking-tight leading-none">
                Medi<span className="text-primary-600">Snap</span>
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-4 max-w-xs">
              {t("hero.subtitle")}
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
              {t("footer.builtInNepal")}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">
              {t("nav.home")}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#features"
                  className="text-xs font-medium text-gray-500 hover:text-primary-600 transition-colors">
                  {t("nav.features")}
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-xs font-medium text-gray-500 hover:text-primary-600 transition-colors">
                  {t("nav.pricing")}
                </a>
              </li>
              <li>
                <a
                  href="/dashboard"
                  className="text-xs font-medium text-gray-500 hover:text-primary-600 transition-colors">
                  {t("nav.dashboard")}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#"
                  className="text-xs font-medium text-gray-500 hover:text-primary-600 transition-colors">
                  {t("footer.privacy")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs font-medium text-gray-500 hover:text-primary-600 transition-colors">
                  {t("footer.terms")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs font-medium text-gray-500 hover:text-primary-600 transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2.5 text-xs font-medium text-gray-500">
                <Mail className="w-3.5 h-3.5 text-primary-500 shrink-0" />
                info@medisnap.com.np
              </li>
              <li className="flex items-center gap-2.5 text-xs font-medium text-gray-500">
                <Phone className="w-3.5 h-3.5 text-primary-500 shrink-0" />
                +977-1-4XXXXXX
              </li>
              <li className="flex items-center gap-2.5 text-xs font-medium text-gray-500">
                <MapPin className="w-3.5 h-3.5 text-primary-500 shrink-0" />
                Kathmandu, Nepal
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-gray-400">
            © {currentYear} MediSnap Nepal. {t("footer.rights")}.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-[11px] font-medium text-gray-400 hover:text-primary-600 transition-colors">
              Facebook
            </a>
            <a
              href="#"
              className="text-[11px] font-medium text-gray-400 hover:text-primary-600 transition-colors">
              LinkedIn
            </a>
            <a
              href="#"
              className="text-[11px] font-medium text-gray-400 hover:text-primary-600 transition-colors">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
