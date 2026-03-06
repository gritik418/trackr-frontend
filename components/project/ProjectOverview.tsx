"use client";

import {
  useGetProjectMembersQuery,
  useGetProjectOverviewQuery,
} from "@/features/project/project.api";
import {
  ProjectMember,
  ProjectOverview,
} from "@/features/project/project.interface";
import { selectWorkspace } from "@/features/workspace/workspace.slice";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Clock10Icon,
  Eye,
  List,
  Pause,
  Target,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface ProjectOverviewProps {
  projectId: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

export default function ProjectOverviewScreen({
  projectId,
  setActiveTab,
}: ProjectOverviewProps) {
  const workspace = useSelector(selectWorkspace);
  const [overview, setOverview] = useState<ProjectOverview>();
  const [members, setMembers] = useState<ProjectMember[]>([]);

  const { data: membersData } = useGetProjectMembersQuery(
    {
      projectId,
      workspaceId: workspace?.id || "",
    },
    {
      skip: !projectId || !workspace?.id,
    },
  );

  const { data } = useGetProjectOverviewQuery(
    { projectId, workspaceId: workspace?.id || "" },
    {
      skip: !projectId || !workspace?.id,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    },
  );

  const stats = [
    {
      label: "Total Tasks",
      value: overview?.taskStatusCount?.total,
      icon: Target,
      color: "text-brand",
      isHidden:
        typeof overview?.taskStatusCount?.total === "number" ? false : true,
    },
    {
      label: "To Do",
      value: overview?.taskStatusCount?.todo,
      icon: List,
      color: "text-brand",
      isHidden:
        typeof overview?.taskStatusCount?.todo === "number" ? false : true,
    },
    {
      label: "In Progress",
      value: overview?.taskStatusCount?.inProgress,
      icon: Clock10Icon,
      color: "text-brand",
      isHidden:
        typeof overview?.taskStatusCount?.inProgress === "number"
          ? false
          : true,
    },
    {
      label: "In Review",
      value: overview?.taskStatusCount?.inReview,
      icon: Eye,
      color: "text-blue-400",
      isHidden:
        typeof overview?.taskStatusCount?.inReview === "number" ? false : true,
    },
    {
      label: "Completed",
      value: overview?.taskStatusCount?.done,
      icon: CheckCircle2,
      color: "text-emerald-400",
      isHidden:
        typeof overview?.taskStatusCount?.done === "number" ? false : true,
    },
    {
      label: "Blocked",
      value: overview?.taskStatusCount?.blocked,
      icon: AlertCircle,
      color: "text-red-400",
      isHidden:
        typeof overview?.taskStatusCount?.blocked === "number" ? false : true,
    },
    {
      label: "Cancelled",
      value: overview?.taskStatusCount?.canceled,
      icon: X,
      color: "text-red-400",
      isHidden:
        typeof overview?.taskStatusCount?.canceled === "number" ? false : true,
    },
    {
      label: "Hold",
      value: overview?.taskStatusCount?.onHold,
      icon: Pause,
      color: "text-red-400",
      isHidden:
        typeof overview?.taskStatusCount?.onHold === "number" ? false : true,
    },
  ];

  useEffect(() => {
    if (data?.overview) {
      setOverview(data.overview);
    }
  }, [data]);

  useEffect(() => {
    if (membersData?.members) {
      setMembers(membersData.members);
    }
  }, [membersData]);

  const getHeightPercentage = (value: number): number => {
    if (!overview?.velocity?.last7Days) return 0;
    const counts = overview.velocity.last7Days.map((d) => d.completed);
    const max = Math.max(...counts, 1);

    return (value / max) * 100;
  };

  return (
    <div className="space-y-8 pb-20 scrollbar-hidden animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          if (stat.isHidden) return null;
          return (
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
          );
        })}
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
                  Tasks completed over the last 7 days
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-right">
                <p className="text-2xl font-black text-emerald-400">
                  {overview?.velocity?.completionRate}%
                </p>
                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
                  Completion Rate
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-emerald-400">
                  {overview?.velocity?.weeklyCompleted}%
                </p>
                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
                  Weekly Completed
                </p>
              </div>
            </div>
          </div>

          {/* Mock Chart Visualization */}
          <div className="h-96 flex items-end gap-3 relative z-10">
            {overview?.velocity?.last7Days.map((val, i) => {
              const height = getHeightPercentage(val.completed);
              return (
                <div
                  key={i}
                  className="flex-1 flex h-full flex-col justify-end gap-2 group/bar relative"
                >
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: `${height}%`, opacity: 1 }}
                    transition={{
                      duration: 1,
                      delay: i * 0.1,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                    className="w-full bg-linear-to-t from-emerald-500/80 to-emerald-400 rounded-t-xl group-hover/bar:from-emerald-400 group-hover/bar:to-emerald-300 transition-all cursor-pointer relative"
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-emerald-400/20 blur-md opacity-0 group-hover/bar:opacity-100 transition-opacity rounded-t-xl" />

                    {/* Tooltip */}
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-all pointer-events-none z-50 transform group-hover/bar:-translate-y-1">
                      <div className="bg-neutral-900 border border-white/10 px-3 py-1.5 rounded-xl shadow-2xl whitespace-nowrap">
                        <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest leading-none mb-1">
                          {val.date}
                        </p>
                        <p className="text-sm font-bold text-white">
                          {val.completed} tasks
                        </p>
                      </div>
                      <div className="w-2 h-2 bg-neutral-900 border-r border-b border-white/10 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                    </div>
                  </motion.div>
                  <span className="text-[10px] text-center font-bold font-mono text-neutral-600 uppercase tracking-tighter">
                    {val.date.split("-").slice(1).join("/")}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Activity */}
        <div className="bg-dashboard-card-bg/40 border border-white/5 p-8 rounded-[40px] flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-2xl bg-brand/10 border border-brand/20 text-brand">
              <Users size={20} />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Project Members
            </h3>
          </div>

          <div className="space-y-3 flex-1">
            {members.slice(0, 5).map((member, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/2 hover:bg-white/5 transition-all border border-transparent hover:border-white/10 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-white/5 flex items-center justify-center text-xs font-bold text-white">
                  {member.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white group-hover:text-brand transition-colors tracking-tight">
                    {member.user.name}
                  </p>
                  <p className="text-xs text-neutral-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveTab("members")}
            className="mt-8 w-full py-4 rounded-2xl cursor-pointer bg-white/5 border border-white/10 text-sm font-bold text-white hover:bg-white/10 transition-all active:scale-95"
          >
            View All Members
          </button>
        </div>
      </div>
    </div>
  );
}
