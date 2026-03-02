"use client";

import { Zap, Plus } from "lucide-react";
import React from "react";

interface NoActivePlanProps {
  onExplorePlans?: () => void;
}

const NoActivePlan: React.FC<NoActivePlanProps> = ({ onExplorePlans }) => {
  return (
    <section className="p-10 rounded-[2.5rem] bg-org-card-bg/60 backdrop-blur-2xl border border-white/5 shadow-2xl shadow-black/40 relative overflow-hidden group min-h-[400px] flex flex-col items-center justify-center text-center">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-linear-to-br from-brand/10 via-transparent to-purple-500/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand/10 blur-[100px] rounded-full animate-pulse pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-md">
        {/* Animated Icon Container */}
        <div className="w-20 h-20 rounded-2xl bg-linear-to-tr from-brand/20 to-brand/5 border border-brand/20 flex items-center justify-center text-brand mb-8 relative group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-brand/10">
          <Zap size={40} fill="currentColor" className="animate-pulse" />
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-bg-dark-2 border border-brand/30 flex items-center justify-center">
            <Plus size={16} className="text-brand" />
          </div>
        </div>

        <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
          No Active Subscription
        </h3>
        <p className="text-org-item-text text-lg font-light leading-relaxed mb-10">
          Your organization is currently on a manual setup or has no active
          plan. Unlock premium features and scale your workforce efficiently.
        </p>

        <button
          onClick={onExplorePlans}
          className="px-8 cursor-pointer py-4 rounded-2xl bg-brand text-bg-dark-0 font-bold text-lg hover:bg-brand-hover transition-all duration-300 shadow-xl shadow-brand/20 hover:shadow-brand/40 hover:-translate-y-1 active:scale-95"
        >
          Explore Plans
        </button>

        <p className="mt-6 text-sm text-neutral-500 font-medium">
          Start for free, upgrade when you&apos;re ready.
        </p>
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-brand/20 to-transparent" />
    </section>
  );
};

export default NoActivePlan;
