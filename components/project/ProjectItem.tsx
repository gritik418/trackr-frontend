"use client";

import { Project } from "@/types/project/project.interface";
import { Clock, Lock, Trash2 } from "lucide-react";
import Link from "next/link";
import { MdPublic } from "react-icons/md";

interface ProjectItemProps {
  project: Project;
  slug: string;
}

export default function ProjectItem({ project, slug }: ProjectItemProps) {
  console.log(project);
  return (
    <Link
      href={`/dashboard/${slug}/projects/${project.id}`}
      className="cursor-pointer group p-6 rounded-3xl border border-dashboard-border bg-dashboard-card-bg/40 backdrop-blur-sm hover:bg-dashboard-card-bg/60 hover:border-brand/20 hover:shadow-2xl hover:shadow-brand/5 transition-all duration-300 flex flex-col"
    >
      <div className="flex justify-between items-start mb-4">
        <span
          className={`px-2.5 py-1 flex items-center gap-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
            project.nature === "PRIVATE"
              ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
              : "text-blue-400 bg-blue-400/10 border-blue-400/20"
          }`}
        >
          {project.nature === "PRIVATE" ? (
            <Lock size={10} />
          ) : (
            <MdPublic size={12} />
          )}
          {project.nature}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand transition-colors">
        {project.name}
      </h3>
      <p className="text-sm text-neutral-400 line-clamp-2 mb-6 flex-1">
        {project.description || "No description provided."}
      </p>

      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-400 font-medium">Progress</span>
            <span className="text-white font-bold">0%</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand rounded-full transition-all duration-500 ease-out group-hover:bg-brand-hover"
              style={{ width: `0%` }}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          {/* Members - Mocked for now as backend doesn't return them yet in project list */}
          <div className="flex -space-x-2">
            <div className="w-7 h-7 rounded-full border border-dashboard-card-bg bg-white/10 flex items-center justify-center text-[9px] font-bold text-neutral-400">
              RG
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors">
            {project.status}
          </div>
        </div>
      </div>
    </Link>
  );
}
