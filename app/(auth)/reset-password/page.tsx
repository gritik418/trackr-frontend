"use client";

import { Logo } from "@/components/ui/Logo";
import { resetPassword } from "@/features/auth/api";
import resetPasswordSchema from "@/lib/validations/auth/reset-password.schema";
import { ResetPasswordDto } from "@/types/auth/password-recovery.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdEmail } from "react-icons/md";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const emailFromUrl = searchParams.get("email");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordDto>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: emailFromUrl || "",
      password: "",
      passwordConfirmation: "",
      token: token || "",
    },
  });
  const onSubmit = async (data: ResetPasswordDto) => {
    try {
      await resetPassword(data);
      toast.success("Password reset successfully.");
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to reset password";

      if (error.response?.data?.errors) {
        Object.keys(error.response.data.errors).forEach((key) => {
          setError(key as keyof ResetPasswordDto, {
            type: "server",
            message: error.response.data.errors[key],
          });
        });
      }

      toast.error(Array.isArray(message) ? message[0] : message);
    }
  };

  useEffect(() => {
    if (!token) {
      setError("token", {
        type: "server",
        message: "Invalid or missing reset token.",
      });
    }
    if (!emailFromUrl) {
      setError("email", {
        type: "server",
        message: "Invalid or missing email.",
      });
    }
  }, [token, emailFromUrl]);

  if (isSuccess) {
    return (
      <div className="text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
          <ShieldCheck className="text-emerald-400" size={32} />
        </div>
        <h2 className="text-3xl font-bold tracking-tighter mb-2 text-white">
          Password reset!
        </h2>
        <p className="text-neutral-500 font-medium mb-8 leading-relaxed">
          Your password has been successfully updated. <br />
          Redirecting you to login...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[400px] z-10">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tighter mb-2 bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
          Reset password
        </h2>
        <p className="text-neutral-500 font-medium">
          Create a new strong password for your account.
        </p>
      </div>

      {errors.root?.message && (
        <div className="p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
          {errors.root.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/*  (Hidden or Read-only) */}
        <input type="hidden" id="token" {...register("token")} />
        {/* Email */}
        <div
          className={`transition-all duration-200 ${focusedField === "password" ? "scale-[1.02]" : ""}`}
        >
          <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest ml-1 mb-2 block">
            Email
          </label>
          <div className="input-field-wrapper opacity-50 cursor-not-allowed">
            <div className="bg-bg-dark-2 rounded-[11px] relative h-full">
              <input
                {...register("email")}
                name="email"
                placeholder="email"
                className="w-full pl-11 pr-12 py-3.5 bg-transparent border-none outline-none text-white placeholder:text-neutral-600 font-medium rounded-xl"
                required
                readOnly
              />
              <MdEmail
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === "email" ? "icon-active" : "icon-default"}`}
                size={18}
              />
            </div>
          </div>
          {errors.email?.message && (
            <p className="text-red-400 text-xs mt-1 ml-1 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div
          className={`transition-all duration-200 ${focusedField === "password" ? "scale-[1.02]" : ""}`}
        >
          <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest ml-1 mb-2 block">
            New Password
          </label>
          <div
            className={
              focusedField === "password"
                ? "input-field-focused"
                : "input-field-wrapper"
            }
          >
            <div className="bg-bg-dark-2 rounded-[11px] relative h-full">
              <input
                {...register("password")}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-3.5 bg-transparent border-none outline-none text-white placeholder:text-neutral-600 font-medium rounded-xl"
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                required
              />
              <Lock
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === "password" ? "icon-active" : "icon-default"}`}
                size={18}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 icon-default icon-hover transition-colors focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {errors.password?.message && (
            <p className="text-red-400 text-xs mt-1 ml-1 font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div
          className={`transition-all duration-200 ${focusedField === "passwordConfirmation" ? "scale-[1.02]" : ""}`}
        >
          <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest ml-1 mb-2 block">
            Confirm New Password
          </label>
          <div
            className={
              focusedField === "passwordConfirmation"
                ? "input-field-focused"
                : "input-field-wrapper"
            }
          >
            <div className="bg-bg-dark-2 rounded-[11px] relative h-full">
              <input
                {...register("passwordConfirmation")}
                name="passwordConfirmation"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-3.5 bg-transparent border-none outline-none text-white placeholder:text-neutral-600 font-medium rounded-xl"
                onFocus={() => setFocusedField("passwordConfirmation")}
                onBlur={() => setFocusedField(null)}
                required
              />
              <Lock
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === "passwordConfirmation" ? "icon-active" : "icon-default"}`}
                size={18}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 icon-default icon-hover transition-colors focus:outline-none"
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {errors.passwordConfirmation?.message && (
            <p className="text-red-400 text-xs mt-1 ml-1 font-medium">
              {errors.passwordConfirmation.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !!errors.root?.message}
          className="w-full group cursor-pointer relative overflow-hidden rounded-xl bg-brand px-4 py-3.5 text-sm font-semibold text-bg-dark-0 shadow-lg shadow-brand/20 transition-all hover:bg-brand-hover hover:shadow-brand/40 active:scale-[0.98] outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-bg-dark-0 mt-4"
        >
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent z-10" />

          <div className="relative flex items-center justify-center gap-2">
            {isSubmitting ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                Update Password
                <ChevronRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </>
            )}
          </div>
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen w-full flex bg-bg-dark-0 text-white selection:bg-brand/30">
      {/* LEFT COLUMN: VISUAL / CONTEXT */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12 border-r border-white/5 bg-bg-dark-1">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[80px] animate-pulse delay-700"></div>
        </div>

        {/* Branding */}
        <Logo size={48} />

        {/* Main Content */}
        <div className="relative z-10 max-w-lg mt-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-medium text-emerald-400 mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Security Update
          </div>

          <h1 className="text-5xl font-medium tracking-tight mb-8 leading-[1.1] text-transparent bg-clip-text bg-linear-to-b from-white to-white/50">
            Secure your <br />
            account again.
          </h1>

          <div className="space-y-6">
            {[
              {
                title: "Reset Success",
                desc: "Choosing a strong password helps keep your data safe.",
                icon: ShieldCheck,
              },
            ].map(({ title, desc, icon: Icon }, i) => (
              <div
                key={i}
                className="flex items-start gap-4 group cursor-default"
              >
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/10 transition-colors">
                  <Icon
                    size={20}
                    className="text-emerald-400 group-hover:text-emerald-300 transition-colors"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-white/90 group-hover:text-white transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 pt-12">
          <p className="text-sm text-neutral-500 mb-4 font-mono uppercase tracking-widest opacity-60">
            © 2026 Trackr Inc.
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN: FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-bg-dark-0 relative overflow-y-auto">
        <Suspense fallback={<div className="text-neutral-500">Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
