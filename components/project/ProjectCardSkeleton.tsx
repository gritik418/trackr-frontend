"use client";

import { cn } from "@/lib/utils";

export default function ProjectCardSkeleton() {
  return (
    <div className="p-6 rounded-3xl border border-dashboard-border bg-dashboard-card-bg/40 backdrop-blur-sm flex flex-col animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="w-20 h-6 bg-white/5 rounded-full" />
        <div className="w-8 h-8 bg-white/5 rounded-lg" />
      </div>

      <div className="w-3/4 h-7 bg-white/5 rounded-md mb-2" />
      <div className="w-full h-4 bg-white/5 rounded-md mb-2" />
      <div className="w-2/3 h-4 bg-white/5 rounded-md mb-6" />

      <div className="space-y-4">
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <div className="w-12 h-3 bg-white/5 rounded" />
            <div className="w-6 h-3 bg-white/5 rounded" />
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full" />
        </div>

        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="w-7 h-7 rounded-full bg-white/5" />
          <div className="w-24 h-4 bg-white/5 rounded" />
        </div>
      </div>
    </div>
  );
}
