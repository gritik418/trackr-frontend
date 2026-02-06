"use client";

import { APP_CONFIG } from "@/constants";
import Image from "next/image";

const OrgContextLoading = () => {
  return (
    <div className="fixed inset-0 z-9999 bg-[#020202] flex flex-col items-center justify-center overflow-hidden">
      {/* 1. LAYERED BACKGROUND EFFECTS */}

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.15] bg-size-[40px_40px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Primary Cyan Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/20 blur-[120px] rounded-full animate-[pulse_6s_ease-in-out_infinite]" />

      {/* Secondary Brand Purple/Blue Glow */}
      <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-brand/10 blur-[100px] rounded-full animate-[pulse_8s_ease-in-out_infinite_1s]" />

      <div className="relative z-10 flex flex-col items-center gap-12 max-w-sm w-full transition-all duration-700 ease-out">
        {/* 2. ADVANCED LOGO CONTAINER */}
        <div className="relative">
          {/* Conic Gradient Rotating Border */}
          <div className="absolute -inset-[3px] rounded-[32%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_90deg,#22d3ee_180deg,transparent_270deg,transparent_360deg)] opacity-70" />

          {/* Inner Static Border */}
          <div className="absolute -inset-px rounded-[32%] bg-white/10" />

          {/* Logo Rings (Ambient) */}
          <div className="absolute inset-x-0 -top-4 -bottom-4 bg-brand-cyan/5 blur-2xl animate-pulse" />

          <div className="relative w-28 h-28 rounded-[30%] overflow-hidden border border-white/5 shadow-[0_0_50px_-12px_rgba(34,211,238,0.3)] bg-[#0A0A0B]/80 backdrop-blur-xl">
            <Image
              src="/logo.jpeg"
              alt={APP_CONFIG?.NAME || "Trackr"}
              fill
              priority
              className="object-cover animate-[scale-breathing_4s_ease-in-out_infinite]"
            />
          </div>

          {/* Floating Particles (Small Dots) */}
          <div
            className="absolute -top-4 -right-2 w-2 h-2 rounded-full bg-brand-cyan/40 blur-[1px] animate-bounce"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="absolute -bottom-2 -left-4 w-1.5 h-1.5 rounded-full bg-white/20 blur-[1px] animate-bounce"
            style={{ animationDelay: "1.2s" }}
          />
        </div>

        {/* 3. TYPOGRAPHY & PROGRESS */}
        <div className="flex flex-col items-center gap-6 text-center w-full">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white to-white/60 animate-[text-shimmer_3s_ease-in-out_infinite]">
              Configuring Organization
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-[2px] w-8 rounded-full bg-linear-to-r from-transparent to-brand-cyan/40" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-cyan/80">
                initializing dashboard
              </span>
              <div className="h-[2px] w-8 rounded-full bg-linear-to-l from-transparent to-brand-cyan/40" />
            </div>
          </div>

          {/* Subtle Modern Progress Bar */}
          <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden relative">
            <div className="absolute inset-0 bg-brand-cyan/20 animate-[loading-shimmer_2s_infinite]" />
            <div className="h-full bg-brand-cyan rounded-full animate-[progress-flow_3s_ease-in-out_infinite]" />
          </div>

          <p className="text-neutral-500 text-xs font-medium max-w-[200px] leading-relaxed animate-[fade-in-up_1s_ease-out_forwards_0.5s] opacity-0">
            Securely mounting your organization's resources and settings.
          </p>
        </div>
      </div>

      {/* 4. CUSTOM ANIMATIONS */}
      <style jsx global>{`
        @keyframes scale-breathing {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }
        @keyframes text-shimmer {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        @keyframes progress-flow {
          0% {
            width: 0%;
            left: 0%;
          }
          50% {
            width: 60%;
            left: 20%;
          }
          100% {
            width: 0%;
            left: 100%;
          }
        }
        @keyframes loading-shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default OrgContextLoading;
