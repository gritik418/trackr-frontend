"use client";

import { WorkspaceGraphs } from "@/features/workspace/workspace.interface";
import { motion } from "framer-motion";
import { PieChart } from "lucide-react";

interface Props {
  data?: WorkspaceGraphs["taskStatusDistribution"];
  isLoading: boolean;
}

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  TODO: { label: "To Do", color: "text-neutral-400", bg: "bg-neutral-400" },
  IN_PROGRESS: {
    label: "In Progress",
    color: "text-yellow-400",
    bg: "bg-yellow-400",
  },
  IN_REVIEW: { label: "In Review", color: "text-blue-400", bg: "bg-blue-400" },
  DONE: { label: "Completed", color: "text-emerald-400", bg: "bg-emerald-400" },
  BLOCKED: { label: "Blocked", color: "text-red-400", bg: "bg-red-400" },
  CANCELED: {
    label: "Canceled",
    color: "text-neutral-600",
    bg: "bg-neutral-600",
  },
  ON_HOLD: { label: "On Hold", color: "text-orange-400", bg: "bg-orange-400" },
};

export default function DashboardStatusDistribution({
  data,
  isLoading,
}: Props) {
  const total = data?.reduce((acc, curr) => acc + curr.count, 0) || 1;

  if (isLoading) {
    return (
      <div className="bg-dashboard-card-bg/40 border border-white/5 p-8 rounded-[40px] h-[400px] animate-pulse" />
    );
  }

  if (!data || data.length === 0) return null;

  return (
    <div className="bg-dashboard-card-bg/40 border border-white/5 p-8 rounded-[40px] h-full flex flex-col group relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand/5 blur-[100px] pointer-events-none" />

      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="p-2.5 rounded-2xl bg-brand/10 border border-brand/20 text-brand">
          <PieChart size={20} />
        </div>
        <h3 className="text-lg font-bold text-white tracking-tight">
          Status Distribution
        </h3>
      </div>

      <div className="space-y-6 flex-1 relative z-10">
        {data.map((item, i) => {
          const config = statusConfig[item.status] || {
            label: item.status,
            color: "text-white",
            bg: "bg-white",
          };
          const percentage = (item.count / total) * 100;

          return (
            <div key={item.status} className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                  {config.label}
                </span>
                <span className="text-xs font-bold text-white">
                  {item.count}{" "}
                  <span className="text-neutral-500 font-medium">
                    ({percentage.toFixed(0)}%)
                  </span>
                </span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                  className={`h-full ${config.bg} rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
