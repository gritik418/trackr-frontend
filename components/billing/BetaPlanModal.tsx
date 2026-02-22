"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Zap, ShieldCheck } from "lucide-react";

interface BetaPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BetaPlanModal: React.FC<BetaPlanModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-60 flex items-center justify-center pointer-events-none p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-lg bg-org-card-bg/90 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden pointer-events-auto relative group"
            >
              {/* Background Glows */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 blur-[80px] rounded-full -mr-32 -mt-32 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/10 blur-[60px] rounded-full -ml-24 -mb-24 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute cursor-pointer top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-all z-20 border border-white/5"
              >
                <X size={18} />
              </button>

              <div className="p-8 md:p-10 relative z-10 flex flex-col items-center text-center">
                {/* Icon Header */}
                <div className="relative mb-8">
                  <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-brand/20 to-brand/5 border border-brand/20 flex items-center justify-center shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-500">
                    <Sparkles size={40} className="text-brand animate-pulse" />
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-4 border border-brand/10 rounded-full border-dashed"
                  />
                </div>

                {/* Content */}
                <h3 className="text-3xl font-extrabold text-white tracking-tight mb-4">
                  Beta Access Active
                </h3>
                <p className="text-neutral-400 text-lg font-light leading-relaxed mb-8 max-w-sm">
                  Our standard subscription plans are still being polished.
                  During this beta phase, you can enjoy all premium features for{" "}
                  <span className="text-brand font-semibold">free</span> through
                  our Early Access plan.
                </p>

                {/* Benefits Box */}
                <div className="w-full grid grid-cols-1 gap-3 mb-8 text-left">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group/item">
                    <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand shrink-0 group-hover/item:scale-110 transition-transform">
                      <Zap size={20} fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white tracking-wide">
                        All Premium Features
                      </p>
                      <p className="text-xs text-neutral-500">
                        Multiple workspaces, audit logs, and more.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group/item">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0 group-hover/item:scale-110 transition-transform">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white tracking-wide">
                        Free Until Stability
                      </p>
                      <p className="text-xs text-neutral-500">
                        No billing until the stable release.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={onClose}
                  className="w-full cursor-pointer py-4 bg-brand hover:bg-brand-hover text-black font-bold rounded-2xl transition-all shadow-xl shadow-brand/20 active:scale-[0.98]"
                >
                  Explore Early Access
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
