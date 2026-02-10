"use client";

import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft, Home, RefreshCcw } from "lucide-react";
import Link from "next/link";

interface AuthContextErrorProps {
  error?: any;
}

const AuthContextError = ({ error }: AuthContextErrorProps) => {
  return (
    <div className="fixed inset-0 z-9999 bg-[#020202] flex flex-col items-center justify-center overflow-hidden p-4">
      {/* 1. BACKGROUND EFFECTS */}
      <div className="absolute inset-0 opacity-[0.1] bg-[radial-gradient(circle_at_50%_50%,#ef4444_0%,transparent_50%)]" />
      <div className="absolute inset-0 opacity-[0.1] bg-size-[40px_40px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]" />

      {/* Animated Red Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/10 blur-[100px] rounded-full"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-md w-full"
      >
        <div className="bg-[#0A0A0B]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden relative">
          {/* Subtle top light effect */}
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

          <div className="flex flex-col items-center text-center space-y-6">
            {/* Error Icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full" />
              <div className="relative w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Authentication Error
              </h1>
              <p className="text-neutral-400 text-sm leading-relaxed">
                We encountered an issue while trying to secure your session.
                This might be due to a network problem or an issue with your
                account.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full pt-2">
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                <Home className="w-4 h-4" />
                Go Home
              </Link>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 text-neutral-500 hover:text-white text-xs font-medium transition-colors"
            >
              <RefreshCcw className="w-3.0 h-3.0" />
              Try Reconnecting
            </button>
          </div>
        </div>

        {/* Support Link Shortcut */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-neutral-600 text-[10px] uppercase tracking-[0.2em] font-bold"
        >
          Need help?{" "}
          <a
            href="mailto:support@trackr.com"
            className="text-neutral-400 hover:text-white transition-colors"
          >
            Contact Support
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AuthContextError;
