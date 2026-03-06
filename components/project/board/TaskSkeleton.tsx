"use client";

import { cn } from "@/lib/utils";

export default function TaskSkeleton() {
  return (
    <div className="bg-dashboard-card-bg/60 border border-white/5 p-4 rounded-xl shadow-sm animate-pulse flex flex-col gap-3">
      {/* Header: Tags & Priority */}
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-wrap gap-1.5">
          <div className="w-12 h-4 bg-white/5 rounded-md border border-white/5" />
          <div className="w-16 h-4 bg-white/5 rounded-md border border-white/5" />
        </div>
        <div className="w-4 h-4 bg-white/5 rounded-full" />
      </div>

      {/* Title */}
      <div className="space-y-2">
        <div className="h-4 bg-white/10 rounded-md w-3/4" />
        <div className="h-4 bg-white/10 rounded-md w-1/2" />
      </div>

      {/* Footer: Assignees & Metadata */}
      <div className="flex items-center justify-between mt-1">
        <div className="flex -space-x-1.5">
          <div className="w-6 h-6 rounded-full bg-white/10 border-2 border-bg-dark-0" />
          <div className="w-6 h-6 rounded-full bg-white/10 border-2 border-bg-dark-0" />
        </div>
        <div className="w-12 h-3 bg-white/5 rounded-md" />
      </div>
    </div>
  );
}
