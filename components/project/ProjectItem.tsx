"use client";

import {
  ProjectMember,
  ProjectNature,
  ProjectsWithStats,
} from "@/features/project/project.interface";
import { Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MdPublic } from "react-icons/md";

interface ProjectItemProps {
  project: ProjectsWithStats;
  slug: string;
}

export default function ProjectItem({ project, slug }: ProjectItemProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "text-brand bg-brand/10 border-brand/20";
      case "COMPLETED":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "ON_HOLD":
        return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "BLOCKED":
        return "text-rose-400 bg-rose-400/10 border-rose-400/20";
      case "DRAFT":
        return "text-sky-400 bg-sky-400/10 border-sky-400/20";
      case "CANCELED":
        return "text-zinc-500 bg-zinc-500/10 border-zinc-500/20";
      case "ARCHIVED":
        return "text-purple-400 bg-purple-400/10 border-purple-400/20";
      default:
        return "text-neutral-400 bg-neutral-400/10 border-neutral-400/20";
    }
  };

  return (
    <Link
      href={`/dashboard/${slug}/projects/${project.id}`}
      className="cursor-pointer group p-6 rounded-4xl border border-white/5 bg-dashboard-card-bg/20 backdrop-blur-md hover:bg-dashboard-card-bg/40 hover:border-brand/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-500 flex flex-col relative overflow-hidden"
    >
      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex gap-2">
          <span
            className={`px-3 py-1 flex items-center gap-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-sm ${
              project.nature === "PRIVATE"
                ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
                : "text-blue-400 bg-blue-400/10 border-blue-400/20"
            }`}
          >
            {project.nature === "PRIVATE" ? (
              <Lock size={10} strokeWidth={3} />
            ) : (
              <MdPublic size={12} />
            )}
            {project.nature}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-sm ${getStatusColor(
              project.status,
            )}`}
          >
            {project.status.replace("_", " ")}
          </span>
        </div>
      </div>

      <div className="relative z-10 flex-1">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand transition-colors tracking-tight">
          {project.name}
        </h3>
        <p className="text-sm text-neutral-400 line-clamp-2 mb-8 leading-relaxed font-light">
          {project.description || "No description provided."}
        </p>
      </div>

      <div className="space-y-6 relative z-10">
        {/* Progress Bar */}
        {typeof project.stats?.completionPercentage === "number" && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs items-end">
              <span className="text-neutral-500 font-medium tracking-wide">
                COMPLETION
              </span>
              <span className="text-white font-black text-sm">
                {project.stats?.completionPercentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden p-[2px]">
              <div
                className="h-full bg-linear-to-r from-brand to-brand-hover rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(var(--brand-rgb),0.3)]"
                style={{ width: `${project.stats?.completionPercentage}%` }}
              />
            </div>
          </div>
        )}

        <div className="pt-5 border-t border-white/5 flex items-center justify-between">
          {/* Members */}
          <div className="flex items-center">
            <div className="flex -space-x-3 mr-3">
              {project.nature === ProjectNature.PRIVATE &&
                project?.stats?.members
                  ?.slice(0, 3)
                  .map((member: ProjectMember, index: number) => (
                    <div className="flex" key={index}>
                      {member.user.avatarUrl ? (
                        <Image
                          height={32}
                          width={32}
                          src={member.user.avatarUrl}
                          alt={member.user.name}
                          className="w-8 h-8 rounded-full border-2 border-dashboard-card-bg bg-neutral-800 object-cover shadow-lg ring-1 ring-white/10"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full border-2 border-dashboard-card-bg bg-linear-to-br from-neutral-700 to-neutral-800 flex items-center justify-center text-[10px] font-bold text-white shadow-lg ring-1 ring-white/10">
                          {member?.user?.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  ))}

              {project.nature === ProjectNature.PRIVATE &&
                (project.stats?.membersCount || 0) > 3 && (
                  <div className="w-8 h-8 rounded-full border-2 border-dashboard-card-bg bg-neutral-800 flex items-center justify-center text-[10px] font-bold text-neutral-400 shadow-lg ring-1 ring-white/10">
                    +{(project.stats?.membersCount || 0) - 3}
                  </div>
                )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-500 group-hover:text-neutral-300 transition-colors tracking-widest uppercase">
            View Project
          </div>
        </div>
      </div>
    </Link>
  );
}
