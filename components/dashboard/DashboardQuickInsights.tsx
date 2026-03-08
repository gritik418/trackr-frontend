"use client";

import { WorkspaceOverview } from "@/features/workspace/workspace.interface";
import { motion } from "framer-motion";
import { ArrowUpRight, BarChart3, Target, Zap } from "lucide-react";

interface Props {
  overview?: WorkspaceOverview;
  isLoading: boolean;
}

export default function DashboardQuickInsights({ overview, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="p-8 rounded-[40px] bg-dashboard-card-bg/40 border border-white/5 animate-pulse h-[350px]" />
    );
  }

  const insights = [
    {
      label: "Completion Rate",
      value: `${overview?.completionRate?.toFixed(1) || 0}%`,
      icon: Target,
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/10",
      description: "Overall task finishing efficiency",
    },
    {
      label: "Daily Average",
      value: overview?.velocity?.avgTasksPerDay?.toFixed(1) || "0.0",
      icon: Zap,
      color: "text-brand",
      bgColor: "bg-brand/10",
      description: "Tasks completed per day",
    },
    {
      label: "7d Velocity",
      value: `+${overview?.velocity?.tasksCompletedLast7Days || 0}`,
      icon: BarChart3,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      description: "Progress in the last week",
    },
    {
      label: "30d Velocity",
      value: `+${overview?.velocity?.tasksCompletedLast30Days || 0}`,
      icon: ArrowUpRight,
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
      description: "Monthly output trend",
    },
  ];

  return (
    <div className="p-8 rounded-[40px] bg-dashboard-card-bg/40 border border-white/5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 blur-[80px] -mr-16 -mt-16 opacity-50" />

      <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-8 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
        Quick Insights
      </h4>

      <div className="grid grid-cols-1 gap-6">
        {insights.map((insight, idx) => (
          <motion.div
            key={insight.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-4 group/item"
          >
            <div
              className={`p-3 rounded-2xl ${insight.bgColor} ${insight.color} border border-white/5 group-hover/item:scale-110 transition-transform`}
            >
              <insight.icon size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between mb-0.5">
                <span className="text-sm font-black text-white">
                  {insight.value}
                </span>
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-tight">
                  {insight.label}
                </span>
              </div>
              <p className="text-[10px] text-neutral-600 font-medium truncate">
                {insight.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
