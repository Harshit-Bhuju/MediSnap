import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import api from "@/lib/api";
import API from "@/Configs/ApiEndpoints";
import Button from "@/components/ui/Button";
import {
  Shield,
  Sparkles,
  Brain,
  Lock,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const Auth = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { login: setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          },
        );

        const { sub, email, name, picture } = userInfo.data;

        const response = await api.post(API.GOOGLE_LOGIN, {
          google_id: sub,
          email: email,
          username: name,
          picture: picture,
        });

        if (
          response.data.status === "success" ||
          response.data.status === "not_null"
        ) {
          setAuth(response.data.user, tokenResponse.access_token);
          if (response.data.user.language) {
            i18n.changeLanguage(response.data.user.language);
          }
          toast.success(`Welcome back, ${response.data.user.name}!`);

          if (response.data.user.role === "doctor") {
            navigate("/doctor-dashboard");
          } else if (response.data.user.profileComplete) {
            if (response.data.user.role === "admin") {
              navigate("/admin");
            } else {
              navigate("/dashboard");
            }
          } else {
            navigate("/profile-setup");
          }
        } else {
          toast.error(response.data.message || "Login failed");
        }
      } catch (error) {
        toast.error("Failed to login with Google");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      toast.error(t("auth.googleLoginFailed"));
    },
  });

  return (
    <div className="min-h-[calc(100vh-72px)] w-full flex items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          {/* Part 1: Left Branding Panel */}
          <div className="p-10 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-100 bg-white">
            <div>


              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold mb-5">
                <Sparkles className="w-4 h-4 text-gray-500" />
                {t("auth.badge")}
              </span>

              <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4 text-gray-900">
                {t("auth.heroTitle1")}{" "}
                <span className="text-gray-900">{t("auth.heroTitle2")}</span>
              </h1>

              <p className="text-base text-gray-500 leading-relaxed max-w-sm mb-8">
                {t("auth.heroSubtitle")}
              </p>
            </div>

            <div className="space-y-3.5 pt-6 border-t border-gray-100">
              {[
                { icon: Brain, title: t("auth.feature1Title") },
                { icon: Shield, title: t("auth.feature2Title") },
                { icon: TrendingUp, title: t("auth.feature3Title") },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 shrink-0" />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Part 2: Right Login Action Panel */}
          <div className="p-10 sm:p-12 flex flex-col justify-center bg-white">
            <div className="w-full max-w-sm mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {t("auth.createTitle")}
              </h2>
              <p className="text-sm sm:text-base text-gray-500 mb-8 leading-relaxed">
                {t("auth.createSubtitle")}
              </p>

              {/* Google Sign In Button */}
              <Button
                variant="outline"
                type="button"
                className="w-full py-3.5 rounded-xl border border-gray-200 flex items-center justify-center gap-3 hover:bg-gray-50 bg-white text-gray-800 transition-all font-semibold text-sm sm:text-base hover:border-gray-300 shadow-sm"
                onClick={handleGoogleLogin}
                loading={isLoading}>
                {!isLoading && (
                  <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google"
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                )}
                {t("auth.continueGoogle")}
              </Button>

              {/* Security Badges */}
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-600">
                    {t("auth.hipaa")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-600">
                    Encrypted
                  </span>
                </div>
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-400 leading-relaxed mt-6">
                {t("auth.termsAgree")}{" "}
                <button className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                  {t("auth.terms")}
                </button>{" "}
                &{" "}
                <button className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                  {t("auth.privacy")}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
