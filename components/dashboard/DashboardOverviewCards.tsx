"use client";

import { WorkspaceOverview } from "@/features/workspace/workspace.interface";
import { Briefcase, Users, TrendingUp, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  overview?: WorkspaceOverview;
  isLoading: boolean;
}

export default function DashboardOverviewCards({ overview, isLoading }: Props) {
  const stats = [
    {
      label: "Total Projects",
      value: overview?.projectsCount ?? 0,
      icon: Briefcase,
      color: "text-brand",
      bg: "bg-brand/10",
      trend: "Active Workspace",
    },
    {
      label: "Workspace Members",
      value: overview?.membersCount ?? 0,
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      trend: "Collaborators",
    },
    {
      label: "Avg Tasks / Day",
      value: overview?.velocity?.avgTasksPerDay?.toFixed(1) ?? "0.0",
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      trend: "Velocity",
    },
    {
      label: "Completion Rate",
      value: `${overview?.completionRate.toFixed(2) ?? 0}%`,
      icon: CheckCircle2,
      color: "text-orange-400",
      bg: "bg-orange-400/10",
      trend: "Efficiency",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 rounded-3xl bg-white/5 animate-pulse border border-white/5"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-dashboard-card-bg/40 border border-white/5 p-6 rounded-3xl hover:bg-white/5 transition-all group overflow-hidden relative"
        >
          <div
            className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} blur-3xl -mr-12 -mt-12 group-hover:opacity-100 opacity-50 transition-opacity`}
          />

          <div className="flex items-center justify-between mb-4">
            <div
              className={`p-2.5 rounded-2xl ${stat.bg} border border-white/5 ${stat.color}`}
            >
              <stat.icon size={20} />
            </div>
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-full border border-white/5">
              {stat.trend}
            </span>
          </div>

          <div>
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
              {stat.label}
            </p>
            <p className="text-3xl font-black text-white tracking-tight group-hover:scale-105 transition-transform origin-left">
              {stat.value}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
