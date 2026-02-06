"use client";

import { Logo } from "@/components/ui/Logo";
import { emailVerification, resendOtp } from "@/features/auth/auth.service";
import emailVerificationSchema from "@/lib/schemas/auth/email-verification.schema";
import { EmailVerificationDto } from "@/types/auth/email-verification.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ChevronRight,
  Mail,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState<string>("");
  const [activeInput, setActiveInput] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const {
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EmailVerificationDto>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      email,
      otp: otp.join(""),
    },
  });

  useEffect(() => {
    const pendingEmail = localStorage.getItem("pending_email");
    if (pendingEmail) {
      setEmail(pendingEmail);
      setValue("email", pendingEmail);
    } else {
      router.push("/signup");
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setValue("otp", newOtp.join(""));
    setError("otp", { message: "" });

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
      setActiveInput(index + 1);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveInput(index - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d*$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    setValue("otp", newOtp.join(""));

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
    setActiveInput(nextIndex);
  };

  const handleResend = async () => {
    if (timer > 0) return;
    setIsResending(true);

    try {
      await resendOtp({ email });
      toast.success("OTP resent successfully!");
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to resend OTP";
      toast.error(Array.isArray(message) ? message[0] : message);
    } finally {
      setIsResending(false);
      setTimer(30);
    }
  };

  const onSubmit = async (data: EmailVerificationDto) => {
    try {
      await emailVerification(data);
      localStorage.removeItem("pending_email");
      toast.success("Account verified! Please log in.");
      router.push("/login");
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to verify account";

      if (error.response?.data?.errors) {
        Object.keys(error.response.data.errors).forEach((key) => {
          setError(key as keyof EmailVerificationDto, {
            type: "server",
            message: error.response.data.errors[key],
          });
        });
      }

      toast.error(Array.isArray(message) ? message[0] : message);
    }
  };

  const handleBack = () => {
    localStorage.removeItem("pending_email");
    router.push("/signup");
  };

  return (
    <div className="min-h-screen w-full flex bg-bg-dark-0 text-white selection:bg-brand/30">
      {/* LEFT COLUMN: VISUAL / CONTEXT */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12 border-r border-white/5 bg-bg-dark-1">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[80px] animate-pulse delay-700"></div>
          <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-violet-600/10 rounded-full blur-[60px] animate-bounce duration-10000"></div>
        </div>

        {/* Branding */}
        <Logo size={48} />

        {/* Main Content */}
        <div className="relative z-10 max-w-lg mt-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-medium text-brand mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
            </span>
            Security Check
          </div>

          <h1 className="text-5xl font-medium tracking-tight mb-8 leading-[1.1] text-transparent bg-clip-text bg-linear-to-b from-white to-white/50">
            Verify your <br />
            email address.
          </h1>

          <div className="space-y-6">
            {[
              {
                title: "One-Time Password",
                desc: "A 6-digit code has been sent to your email.",
                icon: ShieldCheck,
              },
              {
                title: "Account Protection",
                desc: "Verifying your email ensures your account is secure.",
                icon: Mail,
              },
              {
                title: "Almost Ready",
                desc: "Complete this step to start exploring Trackr.",
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
                    className="text-brand group-hover:text-brand/80 transition-colors"
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

      {/* RIGHT COLUMN: VERIFICATION FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-bg-dark-0 relative">
        <button
          onClick={handleBack}
          className="absolute cursor-pointer top-8 left-8 flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to signup
        </button>

        <div className="w-full max-w-[440px] z-10">
          <div className="mb-10 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center mx-auto mb-6">
              <Mail size={32} className="text-brand" />
            </div>
            <h2 className="text-3xl font-bold tracking-tighter mb-2 bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
              Check your email
            </h2>
            <p className="text-neutral-500 font-medium">
              We've sent a 6-digit verification code to{" "}
              <span className="text-white/80 font-semibold">{email}</span>.
              <br />
              <span className="text-xs mt-2 block opacity-80">
                This code is valid for 10 minutes.
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex justify-between gap-3">
              {otp.map((digit, index) => (
                <div
                  key={index}
                  className={`flex-1 transition-all duration-200 ${activeInput === index ? "scale-105" : ""}`}
                >
                  <div
                    className={
                      activeInput === index
                        ? "input-field-focused"
                        : "input-field-wrapper"
                    }
                  >
                    <div className="bg-bg-dark-2 rounded-[11px] relative">
                      <input
                        ref={(el) => {
                          inputRefs.current[index] = el;
                        }}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        onFocus={() => setActiveInput(index)}
                        className="w-full h-14 md:h-16 text-center text-2xl font-bold bg-transparent outline-none text-white rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {errors.otp?.message && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm animate-shake">
                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-red-500" />
                {errors.otp?.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full group cursor-pointer relative overflow-hidden rounded-xl bg-brand px-4 py-4 text-sm font-semibold text-bg-dark-0 shadow-lg shadow-brand/20 transition-all hover:bg-brand-hover hover:shadow-brand/40 active:scale-[0.98] outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-bg-dark-0"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent z-10" />

              <div className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Verify Account
                    <ChevronRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </div>
            </button>
          </form>

          <div className="mt-10 text-center">
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-neutral-500 font-medium">
                Didn't receive the code?
              </p>

              <button
                type="button"
                disabled={timer > 0 || isResending}
                onClick={handleResend}
                className={`relative group flex items-center gap-3 px-6 py-2.5 rounded-full border transition-all duration-300 ${
                  timer > 0 || isResending
                    ? "bg-white/5 border-white/5 text-neutral-600 cursor-not-allowed"
                    : "bg-white/5 border-white/10 text-brand hover:bg-white/10 hover:border-brand/30"
                }`}
              >
                {timer > 0 ? (
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="transparent"
                        className="text-white/5"
                      />
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="transparent"
                        strokeDasharray={50.24}
                        strokeDashoffset={50.24 - (50.24 * timer) / 30}
                        className="text-brand transition-all duration-1000 ease-linear"
                      />
                    </svg>
                    <span className="absolute text-[8px] font-bold text-brand">
                      {timer}
                    </span>
                  </div>
                ) : (
                  <RefreshCcw
                    size={16}
                    className={`${isResending ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`}
                  />
                )}

                <span className="text-sm font-semibold">
                  {isResending
                    ? "Sending..."
                    : timer > 0
                      ? "Wait to resend"
                      : "Resend code"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
