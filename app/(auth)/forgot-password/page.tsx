"use client";

import { Logo } from "@/components/ui/Logo";
import { forgotPassword } from "@/features/auth/api";
import forgotPasswordSchema from "@/lib/validations/auth/forgot-password.schema";
import { ForgotPasswordDto } from "@/types/auth/password-recovery.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ChevronRight, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [isSent, setIsSent] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordDto>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordDto) => {
    try {
      await forgotPassword(data);
      setIsSent(true);
      toast.success("Password reset link sent to your email.");
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to send password reset link";

      if (error.response?.data?.errors) {
        Object.keys(error.response.data.errors).forEach((key) => {
          setError(key as keyof ForgotPasswordDto, {
            type: "server",
            message: error.response.data.errors[key],
          });
        });
      }

      toast.error(Array.isArray(message) ? message[0] : message);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-bg-dark-0 text-white selection:bg-brand/30">
      {/* LEFT COLUMN: VISUAL / CONTEXT */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12 border-r border-white/5 bg-bg-dark-1">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[80px] animate-pulse delay-700"></div>
        </div>

        {/* Branding */}
        <Logo size={48} />

        {/* Main Content */}
        <div className="relative z-10 max-w-lg mt-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-medium text-amber-400 mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Password Recovery
          </div>

          <h1 className="text-5xl font-medium tracking-tight mb-8 leading-[1.1] text-transparent bg-clip-text bg-linear-to-b from-white to-white/50">
            Regain access <br />
            to your workspace.
          </h1>

          <div className="space-y-6">
            {[
              {
                title: "Secure Recovery",
                desc: "We'll send a secure link to your registered email.",
                icon: Mail,
              },
              {
                title: "Account Safety",
                desc: "Identity verification is our top priority.",
                icon: Sparkles,
              },
            ].map(({ title, desc, icon: Icon }, i) => (
              <div
                key={i}
                className="flex items-start gap-4 group cursor-default"
              >
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/10 transition-colors">
                  <Icon
                    size={20}
                    className="text-amber-400 group-hover:text-amber-300 transition-colors"
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
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-bg-dark-0 relative">
        <Link
          href="/login"
          className="absolute top-8 left-8 flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to login
        </Link>

        <div className="w-full max-w-[400px] z-10">
          {!isSent ? (
            <>
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold tracking-tighter mb-2 bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
                  Forgot password?
                </h2>
                <p className="text-neutral-500 font-medium">
                  Enter your email and we'll send you a link to reset your
                  password.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div
                  className={`transition-all duration-200 ${focusedField === "email" ? "scale-[1.02]" : ""}`}
                >
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest ml-1 mb-2 block">
                    Email Address
                  </label>
                  <div
                    className={
                      focusedField === "email"
                        ? "input-field-focused"
                        : "input-field-wrapper"
                    }
                  >
                    <div className="bg-bg-dark-2 rounded-[11px] relative h-full">
                      <input
                        type="email"
                        placeholder="name@company.com"
                        className="w-full pl-11 pr-4 py-3.5 bg-transparent border-none outline-none text-white placeholder:text-neutral-600 font-medium rounded-xl"
                        {...register("email")}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        required
                      />
                      <Mail
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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group cursor-pointer relative overflow-hidden rounded-xl bg-brand px-4 py-3.5 text-sm font-semibold text-bg-dark-0 shadow-lg shadow-brand/20 transition-all hover:bg-brand-hover hover:shadow-brand/40 active:scale-[0.98] outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-bg-dark-0 mt-4"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent z-10" />

                  <div className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Send Reset Link
                        <ChevronRight
                          size={16}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      </>
                    )}
                  </div>
                </button>
              </form>
            </>
          ) : (
            <div className="text-center animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-brand/20">
                <Mail className="text-brand" size={32} />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter mb-2 text-white">
                Check your mail
              </h2>
              <p className="text-neutral-500 font-medium mb-8 leading-relaxed">
                We've sent a password reset link to <br />
                <span className="text-white font-semibold">
                  {watch("email")}
                </span>
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="text-sm font-semibold text-brand hover:text-brand/80 transition-colors"
              >
                Didn't receive the email? Try again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
