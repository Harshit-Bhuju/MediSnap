import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  LineChart,
  Brain,
  UploadCloud,
  ArrowRight,
  Lock,
  Quote,
  ChevronRight,
  Activity,
  CheckCircle2,
  FileText,
  Sparkles,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

// ——— 1. HERO ———
const HeroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary-600 text-xs sm:text-sm font-semibold mb-5 w-fit">
                <Zap className="w-4 h-4" />
                {t("hero.badge")}
              </span>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-gray-900">
                {t("hero.title").split(" ").slice(0, 4).join(" ")}{" "}
                <span className="text-primary-600">
                  {t("hero.title").split(" ").slice(4).join(" ")}
                </span>
              </h1>

              <p className="mt-5 text-gray-600 text-base sm:text-lg max-w-lg leading-relaxed">
                {t("hero.subtitle")}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/auth")}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-primary-600 text-white font-semibold text-base hover:bg-primary-700 transition-colors shadow-sm">
                  {t("hero.cta")}
                  <ArrowRight className="w-5 h-5" />
                </button>
                <span className="text-gray-500 text-sm">
                  Trusted by <span className="text-gray-900 font-semibold">10,000+</span> users
                </span>
              </div>

              {/* Trust badges */}
              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-primary-500" /> HIPAA Compliant
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-primary-500" /> 256-bit Encrypted
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary-500" /> Verified AI
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right: Clean modern preview card */}
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-md p-6 relative">
              
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Lab Analysis Preview</h3>
                    <p className="text-xs text-gray-400">Complete Blood Count (CBC)</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-success-50 text-success-700 text-xs font-bold">
                  Normal
                </span>
              </div>

              <div className="py-4 space-y-3">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-gray-500 font-medium">Hemoglobin</span>
                  <span className="font-bold text-gray-900">14.2 g/dL</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-600 h-full w-[75%] rounded-full" />
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
                  <span className="text-gray-500 font-medium">Fasting Blood Sugar</span>
                  <span className="font-bold text-gray-900">92 mg/dL</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-600 h-full w-[60%] rounded-full" />
                </div>
              </div>

              <div className="mt-2 p-3 bg-primary-50/70 rounded-xl border border-primary-100 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">
                  <strong className="text-primary-700">AI Summary:</strong> All blood values are within healthy target ranges.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ——— 2. STATS STRIP ———
const StatsStrip = () => {
  const { t } = useTranslation();
  const items = [
    { value: "10K+", label: t("stats.reportsProcessed") },
    { value: "50+", label: t("stats.partnerLabs") },
    { value: "4.9/5", label: t("stats.userRating") },
  ];

  return (
    <section className="bg-white border-b border-gray-100 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex gap-10 sm:gap-20 justify-center items-center flex-wrap"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          {items.map((item, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 text-center">
              <span className="font-heading text-3xl sm:text-4xl font-bold text-primary-600 tabular-nums">
                {item.value}
              </span>
              <span className="text-gray-600 text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ——— 3. HOW IT WORKS / FEATURES ———
const FeaturesSection = () => {
  const { t } = useTranslation();

  const cells = [
    {
      title: t("howItWorks.step1.title"),
      desc: t("howItWorks.step1.desc"),
      icon: UploadCloud,
    },
    {
      title: t("howItWorks.step2.title"),
      desc: t("howItWorks.step2.desc"),
      icon: Brain,
    },
    {
      title: t("howItWorks.step3.title"),
      desc: t("howItWorks.step3.desc"),
      icon: LineChart,
    },
    {
      title: t("features.feature1.title"),
      desc: t("features.feature1.desc"),
      icon: Zap,
    },
    {
      title: t("features.feature2.title"),
      desc: t("features.feature2.desc"),
      icon: Activity,
    },
    {
      title: t("trust.title"),
      desc: t("trust.security"),
      icon: Shield,
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              {t("howItWorks.title")}
            </h2>
            <p className="mt-3 text-gray-600 text-base max-w-lg mx-auto">
              {t("features.title")} — simple, secure, and built for clarity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cells.map((cell, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="rounded-2xl border border-gray-100 bg-white p-6 flex flex-col hover:border-primary-100 hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mb-4 text-primary-600">
                  <cell.icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-gray-900 mb-2">
                  {cell.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {cell.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ——— 4. TESTIMONIAL QUOTE ———
const QuoteSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-gray-50/50 border-y border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center">
          <Quote className="w-8 h-8 text-primary-300 mx-auto mb-4" />
          <blockquote className="font-heading text-2xl sm:text-3xl font-semibold text-gray-800 leading-snug">
            Finally, my lab results in one place with insights I can actually use.
          </blockquote>
          <p className="mt-4 text-gray-500 text-sm font-medium">
            — Sarah K., MediSnap user
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// ——— 5. TRUST STRIP ———
const TrustLine = () => {
  const items = [
    { icon: Shield, label: "HIPAA Compliant" },
    { icon: Lock, label: "ISO 27001" },
    { icon: Zap, label: "HL7 Compliant" },
  ];

  return (
    <section className="py-8 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors">
              <item.icon className="w-4 h-4" />
              <span className="text-sm font-semibold">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ——— 6. CTA ———
const CTASection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-gray-100 text-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
            Ready to take control of your health?
          </h2>
          <p className="mt-3 text-gray-600 text-base">
            Join thousands making informed decisions with AI-powered insights.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/auth")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary-600 text-white font-bold text-base hover:bg-primary-700 transition-colors shadow-sm">
              {t("cta.button")}
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/#features"
              className="text-gray-600 hover:text-primary-600 transition-colors flex items-center gap-1 text-sm font-medium">
              {t("cta.link")}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ——— PAGE ———
const Landing = () => {
  const { isAuthenticated, user, isProfileComplete } = useAuthStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      if (!isProfileComplete) {
        navigate("/profile-setup");
      } else if (user?.role === "admin") {
        navigate("/admin");
      } else if (user?.role === "doctor") {
        navigate("/doctor-dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, user, isProfileComplete, navigate]);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <StatsStrip />
      <FeaturesSection />
      <QuoteSection />
      <TrustLine />
      <CTASection />
    </div>
  );
};

export default Landing;
