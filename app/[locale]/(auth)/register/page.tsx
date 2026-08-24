"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { InsertUser } from "@/database/zod-schemas/users";

type FieldErrors = Partial<Record<keyof InsertUser, string[]>>;

export default function RegisterPage() {
  const t = useTranslations("auth");
  const tt = useTranslations();
  const router = useRouter();
  const locale = useLocale();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const [formData, setFormData] = useState<InsertUser>({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const apiMessage = (key: string | undefined) => {
    if (!key) return "";

    return tt.has(key) ? tt(key) : key;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name as keyof InsertUser;
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    if (fieldErrors[fieldName]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }

    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});
    setIsRegistered(false);

    // Email ýa-da Phone ikisinden biri hökman bolmaly
    const hasEmail = Boolean(formData.email && formData.email.trim() !== "");
    const hasPhone = Boolean(formData.phone && formData.phone.trim() !== "");

    if (!hasEmail && !hasPhone) {
      setFieldErrors((prev) => ({
        ...prev,
        email: [t("register.emailOrPhoneRequired")],
        phone: [t("register.emailOrPhoneRequired")],
      }));
      setLoading(false);
      setIsRegistered(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setFieldErrors(data.errors);
        } else {
          setError(apiMessage(data.message) || t("register.defaultError"));
          // to login page when existing error
          if (String(data.message).includes("error-message.has")) {
            setFormData({
              username: "",
              email: "",
              phone: "",
              password: "",
            });
            setTimeout(() => {
              router.push(`/${locale}/login`);
            }, 1000);
          }
        }
        return;
      }

      setIsRegistered(true);
      setFormData({
        username: "",
        email: "",
        phone: "",
        password: "",
      });
      setTimeout(() => {
        setIsRegistered(false);
        router.push(`/${locale}`);
      }, 1000);
    } catch (err) {
      setError(t("common.networkError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 text-slate-100 p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          {/* <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center justify-center p-3 rounded-2xl bg-slate-900 border border-slate-800 text-emerald-400 mb-4 shadow-xl shadow-emerald-950/20"
          >
            <Sparkles className="w-7 h-7" />
          </motion.div> */}
          <h1 className="text-3xl font-bold bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            {t("register.title")}
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            {t("register.subtitle")}
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}
          {/* Success Banner (Registrasiýa üstünlikli geçende) */}
          {isRegistered && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-start gap-3 shadow-lg shadow-emerald-950/20"
            >
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
              <div className="flex-1">
                <p className="font-semibold text-emerald-300 mb-0.5">
                  {apiMessage("success-message.success-register")}
                </p>
                <p className="text-xs text-emerald-400/80">
                  {t("register.canRegisterNow")}
                </p>
              </div>
            </motion.div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                {t("register.usernameLabel")}
              </label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Meselem: Mekan_20"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </div>
              {fieldErrors.username && (
                <p className="text-xs text-rose-400 mt-1 pl-1">
                  {apiMessage(fieldErrors.username[0])}
                </p>
              )}
            </div>

            {/* Email (Optional) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                {t("register.emailLabel")} {"  "}
                <span className="text-slate-500 text-[10px] font-normal">
                  {t("register.emailOptional")}
                </span>
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  name="email"
                  value={String(formData.email)}
                  onChange={handleChange}
                  placeholder={t("register.emailPlaceholder")}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </div>
              {fieldErrors.email && (
                <p className="text-xs text-rose-400 mt-1 pl-1">
                  {apiMessage(fieldErrors.email[0])}
                </p>
              )}
            </div>

            {/* Phone (Optional) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                {t("register.phoneLabel")}{" "}
                <span className="text-slate-500 text-[10px] font-normal">
                  {t("register.phoneOptional")}
                </span>
              </label>
              <div className="relative">
                <Phone className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="tel"
                  name="phone"
                  value={String(formData.phone)}
                  onChange={handleChange}
                  placeholder={t("register.phonePlaceholder")}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </div>
              {fieldErrors.phone && (
                <p className="text-xs text-rose-400 mt-1 pl-1">
                  {apiMessage(fieldErrors.phone[0])}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                {t("register.passwordLabel")}
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t("register.passwordPlaceholder")}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-3 pl-11 pr-11 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-xs text-rose-400 mt-1 pl-1">
                  {apiMessage(fieldErrors.password[0])}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-3.5 px-4 rounded-xl font-medium text-sm text-slate-950 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{t("register.submitButton")}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer link */}
          <div className="mt-6 pt-6 border-t border-slate-800/80 text-center">
            <p className="text-sm text-slate-400">
              {t("register.hasAccount")}{" "}
              <Link
                href={`/${locale}/login`}
                className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1"
              >
                {t("register.loginLink")}
              </Link>
            </p>
          </div>
        </div>

        {/* Security badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500/80" />
          <span>{t("common.securityBadge")}</span>
        </div>
      </motion.div>
    </div>
  );
}
