"use client";

import { useGetProjectOverviewQuery } from "@/features/project/project.api";
import { selectProject } from "@/features/project/project.slice";
import { selectWorkspace } from "@/features/workspace/workspace.slice";
import { Project } from "@/types/project/project.interface";
import { motion } from "framer-motion";
import {
  Calendar,
  Globe,
  Info,
  Layers,
  Lock,
  Clock,
  ChevronRight,
  Shield,
  Activity,
} from "lucide-react";
import { useSelector } from "react-redux";

const ProjectInfo = () => {
  const project: Project | null = useSelector(selectProject);
  const workspace = useSelector(selectWorkspace);

  const { data: overviewData } = useGetProjectOverviewQuery(
    { projectId: project?.id || "", workspaceId: workspace?.id || "" },
    {
      skip: !project?.id || !workspace?.id,
    },
  );

  const overview = overviewData?.overview;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "ON_HOLD":
        return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      case "BLOCKED":
        return "text-red-400 bg-red-500/10 border-red-500/20";
      case "COMPLETED":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      default:
        return "text-neutral-400 bg-neutral-500/10 border-neutral-500/20";
    }
  };

  if (!project) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="lg:col-span-2 space-y-6"
    >
      {/* Main Info Card */}
      <motion.div
        variants={itemVariants}
        className="bg-dashboard-card-bg/40 border border-white/5 p-8 rounded-[40px] relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 blur-[100px] pointer-events-none group-hover:bg-brand/10 transition-colors duration-700" />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-brand/10 border border-brand/20 text-brand shadow-lg transform group-hover:scale-110 transition-transform duration-500">
                <Layers size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight leading-tight">
                  {project.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(project.status)}`}
                  >
                    {project.status}
                  </span>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-1 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                    {project.nature === "PUBLIC" ? (
                      <Globe size={10} />
                    ) : (
                      <Lock size={10} />
                    )}
                    {project.nature}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                Created
              </p>
              <p className="text-xs font-mono text-neutral-300 bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl mb-8">
            {project.description ||
              "No description provided for this project. Track your tasks, milestones, and team progress in one place."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/5 p-4 rounded-3xl group/meta hover:bg-white/10 transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 group-hover/meta:scale-110 transition-transform">
                  <Activity size={16} />
                </div>
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                  Active Members
                </p>
              </div>
              <p className="text-xl font-bold text-white leading-none">
                {overview?.membersCount || 0}
              </p>
            </div>

            <div className="bg-white/5 border border-white/5 p-4 rounded-3xl group/meta hover:bg-white/10 transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover/meta:scale-110 transition-transform">
                  <Clock size={16} />
                </div>
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                  Last Updated
                </p>
              </div>
              <p className="text-xs font-bold text-white truncate">
                {new Date(project.updatedAt).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-white/5 border border-white/5 p-4 rounded-3xl group/meta hover:bg-white/10 transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover/meta:scale-110 transition-transform">
                  <Shield size={16} />
                </div>
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                  Workspace
                </p>
              </div>
              <p className="text-xs font-bold text-white truncate">
                {workspace?.name || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectInfo;
