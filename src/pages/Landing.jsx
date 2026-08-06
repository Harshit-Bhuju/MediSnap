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
// ——— 1. HERO ———
const HeroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-1 max-w-6xl">
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

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] tracking-tight text-gray-900">
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

          {/* Right: Fragments assembling into one clean report */}
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] flex items-center justify-center">

              {/* Soft glow behind the sheet for depth */}
              <div
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(37,99,235,0.10), transparent 70%)",
                }}
              />

              {/* Target sheet outline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.85 }}
                className="absolute inset-x-6 inset-y-4 bg-white rounded-2xl border border-gray-200 shadow-lg"
              />

              {/* Fragment: header strip */}
              <motion.div
                initial={{ opacity: 0, x: -60, y: -80, rotate: -18 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
                className="absolute top-7 left-9 right-9 bg-white border border-gray-200 rounded-lg shadow-sm px-4 py-2 flex items-center gap-2"
              >
                <FileText className="w-3.5 h-3.5 text-gray-300" />
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                  Lab Report
                </span>
              </motion.div>

              {/* Fragment: hemoglobin number */}
              <motion.div
                initial={{ opacity: 0, x: 90, y: -35, rotate: 14 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                transition={{ duration: 0.4, delay: 0.13, ease: "easeOut" }}
                className="absolute top-20 right-9 bg-white border border-gray-200 rounded-lg shadow-sm px-3 py-2"
              >
                <p className="text-[9px] text-gray-400 font-medium">Hemoglobin</p>
                <p className="text-sm font-bold text-gray-900">14.2 g/dL</p>
              </motion.div>

              {/* Fragment: bar chart */}
              <motion.div
                initial={{ opacity: 0, x: -100, y: 10, rotate: -22 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                transition={{ duration: 0.4, delay: 0.21, ease: "easeOut" }}
                className="absolute top-[9.5rem] left-8 bg-white border border-gray-200 rounded-lg shadow-sm px-3 py-2.5 flex items-end gap-1"
              >
                <div className="w-1.5 h-4 bg-primary-200 rounded-sm" />
                <div className="w-1.5 h-6 bg-primary-400 rounded-sm" />
                <div className="w-1.5 h-3 bg-primary-200 rounded-sm" />
                <div className="w-1.5 h-7 bg-primary-600 rounded-sm" />
              </motion.div>

              {/* Fragment: pulse trace */}
              <motion.div
                initial={{ opacity: 0, x: 100, y: 25, rotate: 16 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                transition={{ duration: 0.4, delay: 0.29, ease: "easeOut" }}
                className="absolute top-[12.5rem] right-7 bg-white border border-gray-200 rounded-lg shadow-sm px-3 py-2 flex items-center gap-1.5"
              >
                <Activity className="w-3.5 h-3.5 text-primary-500" />
                <span className="text-[10px] font-semibold text-gray-700">72 bpm</span>
              </motion.div>

              {/* Fragment: glucose number */}
              <motion.div
                initial={{ opacity: 0, x: 75, y: 85, rotate: 20 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                transition={{ duration: 0.4, delay: 0.37, ease: "easeOut" }}
                className="absolute bottom-24 right-11 bg-white border border-gray-200 rounded-lg shadow-sm px-3 py-2"
              >
                <p className="text-[9px] text-gray-400 font-medium">Fasting Glucose</p>
                <p className="text-sm font-bold text-gray-900">92 mg/dL</p>
              </motion.div>

              {/* Fragment: sparkline */}
              <motion.div
                initial={{ opacity: 0, x: -70, y: 95, rotate: -12 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                transition={{ duration: 0.4, delay: 0.45, ease: "easeOut" }}
                className="absolute bottom-16 left-11 bg-white border border-gray-200 rounded-lg shadow-sm px-3 py-2.5"
              >
                <svg width="52" height="20" viewBox="0 0 52 20" fill="none">
                  <path
                    d="M2 16 L14 10 L24 13 L36 4 L50 8"
                    stroke="#2563EB"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>

             {/* Doctor handwritten notes on report — scribble lines, not text */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5, delay: 0.7 }}
  className="absolute inset-x-10 inset-y-8 pointer-events-none"
>
  <div className="w-full h-full px-6 py-20">

    {/* Patient name line — slightly longer, one continuous stroke */}
    <svg width="200" height="16" viewBox="0 0 200 16" fill="none" className="rotate-[-1deg]">
      <path
        d="M2 10 C6 4, 10 13, 15 8 C19 4, 23 12, 28 9 C33 6, 37 12, 42 8
           C48 4, 52 13, 58 9 C64 5, 68 11, 74 8 C80 5, 85 12, 91 9
           C97 6, 101 11, 107 8 C113 5, 117 12, 123 9 C129 6, 134 11, 140 8
           C146 5, 150 12, 156 9 C162 6, 166 11, 172 8 C178 5, 183 12, 189 9
           C193 7, 196 10, 198 8"
        stroke="#334155" strokeWidth="1.6" strokeLinecap="round" fill="none"
      />
    </svg>

    {/* Note line 1 */}
    <svg width="230" height="16" viewBox="0 0 230 16" fill="none" className="mt-3 rotate-[0.5deg]">
      <path
        d="M2 9 C7 4, 11 13, 16 8 C21 4, 25 12, 31 9 C37 5, 41 12, 47 8
           C53 4, 57 12, 63 9 C69 5, 74 11, 80 8 C86 5, 90 12, 96 9
           C102 6, 106 11, 112 8 C118 5, 123 12, 129 9 C135 6, 139 11, 145 8
           C151 5, 155 12, 161 9 C167 6, 170 10, 174 8 C179 4, 184 12, 190 9
           C196 5, 200 12, 206 8 C212 4, 217 12, 222 8 C226 6, 228 9, 229 8"
        stroke="#475569" strokeWidth="1.6" strokeLinecap="round" fill="none"
      />
    </svg>

    {/* Note line 2 */}
    <svg width="210" height="16" viewBox="0 0 210 16" fill="none" className="mt-1 rotate-[-0.5deg]">
      <path
        d="M2 8 C6 13, 11 4, 16 9 C21 13, 25 5, 31 8 C37 12, 41 4, 47 9
           C53 13, 57 5, 63 8 C69 12, 74 4, 80 9 C86 13, 90 5, 96 8
           C102 12, 106 4, 112 9 C118 13, 123 5, 129 8 C135 12, 139 4, 145 9
           C150 12, 155 5, 159 8 C164 12, 168 5, 173 8 C179 12, 183 4, 189 9
           C195 13, 199 5, 205 8 C207 9, 209 8, 209 8"
        stroke="#475569" strokeWidth="1.6" strokeLinecap="round" fill="none"
      />
    </svg>

    {/* Checkmark + short emphasis scribble */}
    <div className="mt-4 flex items-center gap-2 rotate-[1deg]">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 8 L6 12 L14 3" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      <svg width="160" height="16" viewBox="0 0 160 16" fill="none">
        <path
          d="M2 9 C6 4, 10 13, 15 8 C20 4, 24 12, 30 9 C36 5, 40 12, 46 8
             C52 4, 56 12, 62 9 C68 5, 73 11, 79 8 C85 5, 89 12, 95 9
             C101 6, 105 11, 111 8 C115 6, 118 9, 119 8 C124 4, 128 12, 134 9
             C140 5, 144 12, 150 8 C154 6, 157 9, 159 8"
          stroke="#1D4ED8" strokeWidth="1.8" strokeLinecap="round" fill="none"
        />
      </svg>
    </div>

    {/* Note line 3 */}
    <svg width="220" height="16" viewBox="0 0 220 16" fill="none" className="mt-3 rotate-[-1deg]">
      <path
        d="M2 9 C7 4, 11 13, 16 8 C21 4, 25 12, 31 9 C37 5, 41 12, 47 8
           C53 4, 57 12, 63 9 C69 5, 74 11, 80 8 C86 5, 90 12, 96 9
           C102 6, 106 11, 112 8 C118 5, 123 12, 129 9 C135 6, 139 11, 145 8
           C151 5, 155 12, 161 9 C165 7, 167 9, 167 8 C172 4, 177 12, 183 9
           C189 6, 193 11, 199 8 C205 5, 210 12, 216 9 C218 8, 219 8, 219 8"
        stroke="#475569" strokeWidth="1.6" strokeLinecap="round" fill="none"
      />
    </svg>

    {/* Note line 4 */}
    <svg width="185" height="16" viewBox="0 0 185 16" fill="none" className="mt-1 rotate-[0.5deg]">
      <path
        d="M2 8 C6 13, 11 4, 16 9 C21 13, 25 5, 31 8 C37 12, 41 4, 47 9
           C53 13, 57 5, 63 8 C69 12, 74 4, 80 9 C86 13, 90 5, 96 8
           C102 12, 106 4, 112 9 C118 13, 123 5, 129 8 C133 11, 136 6, 139 8
           C144 12, 148 5, 154 8 C160 12, 164 5, 170 8 C176 12, 180 5, 184 8"
        stroke="#475569" strokeWidth="1.6" strokeLinecap="round" fill="none"
      />
    </svg>

    {/* Doctor signature block */}
    <div className="mt-10 rotate-[-3deg]">
      <svg width="130" height="20" viewBox="0 0 130 20" fill="none">
        <path
          d="M2 14 C8 4, 12 18, 18 8 C24 2, 28 16, 34 10
             C40 4, 46 14, 52 9 C58 4, 64 15, 70 9
             C76 4, 82 14, 88 8 C92 5, 96 10, 99 7
             C104 3, 109 15, 115 9 C120 4, 125 13, 129 8"
          stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none"
        />
      </svg>
      <svg
        width="150" height="30" viewBox="0 0 150 30" fill="none"
        className="opacity-70 -mt-1"
      >
        <path
          d="M2 18 C18 3, 28 26, 42 12 S70 8, 86 16 S102 20, 118 8 S135 4, 148 14"
          stroke="#334155" strokeWidth="2" strokeLinecap="round" fill="none"
        />
      </svg>
    </div>
  </div>
</motion.div>
              {/* Confirmation, settles once everything has landed */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1.0 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-primary-50 border border-primary-100 rounded-full px-3.5 py-1.5 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-primary-600" />
                <span className="text-[10px] font-semibold text-primary-700">Report assembled</span>
              </motion.div>
            </div>
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
