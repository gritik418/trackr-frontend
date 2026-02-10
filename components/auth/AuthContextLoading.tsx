"use client";

import { APP_CONFIG } from "@/constants";
import Image from "next/image";
import { motion } from "framer-motion";

const AuthContextLoading = () => {
  return (
    <div className="fixed inset-0 z-9999 bg-[#020202] flex flex-col items-center justify-center overflow-hidden">
      {/* 1. LAYERED BACKGROUND EFFECTS */}

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.15] bg-size-[40px_40px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Primary Cyan Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/20 blur-[120px] rounded-full"
      />

      {/* Secondary Brand Purple/Blue Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-brand/10 blur-[100px] rounded-full"
      />

      <div className="relative z-10 flex flex-col items-center gap-12 max-w-sm w-full">
        {/* 2. ADVANCED LOGO CONTAINER */}
        <div className="relative">
          {/* Conic Gradient Rotating Border */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-[3px] rounded-[32%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_90deg,#22d3ee_180deg,transparent_270deg,transparent_360deg)] opacity-70"
          />

          {/* Inner Static Border */}
          <div className="absolute -inset-px rounded-[32%] bg-white/10" />

          {/* Logo Rings (Ambient) */}
          <div className="absolute inset-x-0 -top-4 -bottom-4 bg-brand-cyan/5 blur-2xl animate-pulse" />

          <div className="relative w-28 h-28 rounded-[30%] overflow-hidden border border-white/5 shadow-[0_0_50px_-12px_rgba(34,211,238,0.3)] bg-[#0A0A0B]/80 backdrop-blur-xl">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <Image
                src="/logo.jpeg"
                alt={APP_CONFIG?.NAME || "Trackr"}
                fill
                sizes="112px"
                priority
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Floating Particles */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute -top-4 -right-2 w-2 h-2 rounded-full bg-brand-cyan/40 blur-[1px]"
          />
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
            className="absolute -bottom-2 -left-4 w-1.5 h-1.5 rounded-full bg-white/20 blur-[1px]"
          />
        </div>

        {/* 3. TYPOGRAPHY & PROGRESS */}
        <div className="flex flex-col items-center gap-6 text-center w-full">
          <div className="space-y-2">
            <motion.h2
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white to-white/60"
            >
              Securing Session
            </motion.h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-[2px] w-8 rounded-full bg-linear-to-r from-transparent to-brand-cyan/40" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-cyan/80">
                authenticating user
              </span>
              <div className="h-[2px] w-8 rounded-full bg-linear-to-l from-transparent to-brand-cyan/40" />
            </div>
          </div>

          {/* Subtle Modern Progress Bar */}
          <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden relative">
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-brand-cyan/20"
            />
            <motion.div
              animate={{
                width: ["0%", "60%", "100%"],
                left: ["0%", "20%", "0%"],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="h-full bg-brand-cyan rounded-full relative"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-neutral-500 text-xs font-medium max-w-[200px] leading-relaxed"
          >
            Verifying your identity and establishing a secure connection.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default AuthContextLoading;
