"use client";

import { cn } from "@/lib/utils";

interface ProjectItemSkeletonProps {
  isExpanded: boolean;
}

export default function ProjectItemSkeleton({
  isExpanded,
}: ProjectItemSkeletonProps) {
  return (
    <div
      className={cn(
        "h-9 flex items-center px-2.5 rounded-lg animate-pulse",
        "bg-white/5",
      )}
    >
      <div className="w-5 h-5 flex items-center justify-center shrink-0">
        <div className="w-4 h-4 bg-white/10 rounded-sm" />
      </div>
      <div
        className={cn(
          "ml-3 h-3 hover:bg-white/10 bg-white/10 rounded-md transition-all duration-300",
          isExpanded ? "w-20 opacity-100" : "w-0 opacity-0",
        )}
      />
    </div>
  );
}
