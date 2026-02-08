"use client";

import { Task, TaskStatus } from "@/features/task/task.interface";
import {
  BarChart3,
  CheckCircle2,
  Clock,
  Users,
  Target,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

interface ProjectOverviewProps {
  tasks: Task[];
}

export default function ProjectOverview({ tasks }: ProjectOverviewProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (t) => t.status === TaskStatus.DONE,
  ).length;
  const inProgressTasks = tasks.filter(
    (t) => t.status === TaskStatus.IN_PROGRESS,
  ).length;
  const overdueTasks = tasks.filter(
    (t) =>
      t.deadline &&
      new Date(t.deadline) < new Date() &&
      t.status !== TaskStatus.DONE,
  ).length;

  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: Target,
      color: "text-brand",
    },
    {
      label: "Completed",
      value: completedTasks,
      icon: CheckCircle2,
      color: "text-emerald-400",
    },
    {
      label: "In Progress",
      value: inProgressTasks,
      icon: Clock,
      color: "text-blue-400",
    },
    {
      label: "Overdue",
      value: overdueTasks,
      icon: AlertCircle,
      color: "text-red-400",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-dashboard-card-bg/40 border border-white/5 p-6 rounded-3xl hover:bg-white/5 transition-all group overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 blur-3xl -mr-12 -mt-12 group-hover:bg-brand/10 transition-colors" />
            <div className="flex items-center gap-4 relative z-10">
              <div
                className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${stat.color}`}
              >
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-white tracking-tight">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Chart Placeholder */}
        <div className="lg:col-span-2 bg-dashboard-card-bg/40 border border-white/5 p-8 rounded-[40px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] pointer-events-none" />

          <div className="flex items-center justify-between mb-10 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <TrendingUp size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Project Velocity
                </h3>
                <p className="text-xs text-neutral-500">
                  Tasks completed over the last 14 days
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-black text-emerald-400">
                {completionRate}%
              </p>
              <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
                Completion Rate
              </p>
            </div>
          </div>

          {/* Mock Chart Visualization */}
          <div className="h-64 flex items-end gap-3 relative z-10">
            {[45, 60, 30, 80, 50, 90, 40, 70, 85, 55, 100, 65, 75, 95].map(
              (val, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-2 group/bar"
                >
                  <div
                    className="w-full bg-emerald-500/20 rounded-t-lg group-hover/bar:bg-emerald-500/40 transition-all duration-1000 ease-out border-x border-t border-emerald-500/10"
                    style={{ height: `${val}%` }}
                  />
                  <span className="text-[8px] font-bold font-mono text-neutral-600 uppercase tracking-tighter">
                    D{i + 1}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Team Activity */}
        <div className="bg-dashboard-card-bg/40 border border-white/5 p-8 rounded-[40px] flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-2xl bg-brand/10 border border-brand/20 text-brand">
              <Users size={20} />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Active Members
            </h3>
          </div>

          <div className="space-y-6 flex-1">
            {[
              {
                name: "Ritik Gupta",
                role: "Frontend Dev",
                contribution: "12 tasks",
              },
              {
                name: "Sarah Connor",
                role: "Product Manager",
                contribution: "8 tasks",
              },
              {
                name: "Mike Johnson",
                role: "UI Designer",
                contribution: "15 tasks",
              },
            ].map((member, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/2 hover:bg-white/5 transition-all border border-transparent hover:border-white/10 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-white/5 flex items-center justify-center text-xs font-bold text-white">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white group-hover:text-brand transition-colors tracking-tight">
                    {member.name}
                  </p>
                  <p className="text-xs text-neutral-500">{member.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-white font-mono">
                    {member.contribution}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-8 w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-white hover:bg-white/10 transition-all active:scale-95">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}
