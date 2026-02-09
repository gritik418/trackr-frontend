"use client";

import { useGetTaskByIdQuery } from "@/features/task/task.api";
import { TaskPriority, TaskStatus } from "@/features/task/task.interface";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Flag,
  MessageSquare,
  MoreHorizontal,
  MoreVertical,
  Paperclip,
  Share2,
  Tag,
  User,
  X,
  ChevronLeft,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CommentSection from "@/components/project/CommentSection";
import { cn } from "@/lib/utils";

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.taskId as string;
  const slug = params.slug as string;
  const projectId = params.projectId as string;

  const { data: taskData, isLoading, error } = useGetTaskByIdQuery(taskId);
  const task = taskData?.task;

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand border-t-transparent" />
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="flex flex-col h-[calc(100vh-100px)] items-center justify-center space-y-4">
        <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-500">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-xl font-bold text-white">Task not found</h2>
        <p className="text-neutral-500">
          The task you are looking for does not exist or has been deleted.
        </p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all"
        >
          Go Back
        </button>
      </div>
    );
  }

  const priorityColors = {
    LOW: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    MEDIUM: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    HIGH: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    URGENT: "bg-red-500/10 text-red-500 border-red-500/30",
  };

  const statusIcons = {
    TODO: <Clock size={16} />,
    IN_PROGRESS: <Clock size={16} className="animate-pulse" />,
    IN_REVIEW: <AlertCircle size={16} />,
    DONE: <CheckCircle2 size={16} />,
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-700">
      {/* Breadcrumbs & Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-all active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2 text-sm text-neutral-500 mb-1">
              <Link
                href={`/dashboard/${slug}/projects/${projectId}`}
                className="hover:text-brand transition-colors"
              >
                Project Dashboard
              </Link>
              <span>/</span>
              <span className="text-white">Task Details</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Task Details
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/5 rounded-xl text-sm font-bold transition-all">
            <Share2 size={16} />
            Share
          </button>
          <button className="p-2.5 text-neutral-500 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (Left) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-dashboard-card-bg/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-10 shadow-2xl relative overflow-hidden">
            {/* Decorative Ambience */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-brand/5 blur-[120px] rounded-full pointer-events-none -ml-40 -mt-20" />

            <div className="relative z-10 space-y-8">
              {/* Title Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-[0.15em] flex items-center gap-2",
                      priorityColors[task.priority],
                    )}
                  >
                    <Flag size={12} strokeWidth={3} />
                    {task.priority} Priority
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-neutral-400 uppercase tracking-[0.15em] flex items-center gap-2">
                    {statusIcons[task.status]}
                    {task.status.replace("_", " ")}
                  </div>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  {task.title}
                </h2>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-px bg-brand/30" />
                  <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">
                    Description
                  </span>
                </div>
                <div className="text-neutral-300 leading-relaxed text-lg font-medium bg-white/2 p-6 rounded-2xl border border-white/5">
                  {task.description || (
                    <span className="text-neutral-600 italic">
                      No description provided for this task.
                    </span>
                  )}
                </div>
              </div>

              {/* Links / Attachments */}
              {task.links && task.links.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-px bg-brand/30" />
                    <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">
                      Resources
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {task.links.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-brand/30 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-brand/10 text-brand">
                            <ExternalLink size={16} />
                          </div>
                          <span className="text-sm font-bold text-white group-hover:text-brand transition-colors">
                            {link.title || "Untitled Link"}
                          </span>
                        </div>
                        <span className="text-[10px] text-neutral-500 font-mono truncate max-w-[120px]">
                          {new URL(link.url).hostname}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Comment Section (Standalone Card for emphasis) */}
          <div className="bg-dashboard-card-bg/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
            <CommentSection taskId={task.id} />
          </div>
        </div>

        {/* Sidebar (Right) */}
        <div className="space-y-6">
          {/* Metadata Card */}
          <div className="bg-dashboard-card-bg/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-8 shadow-xl">
            {/* Assignees */}
            <div className="space-y-4">
              <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                <User size={14} className="text-emerald-400" />
                Assignees
              </label>
              <div className="space-y-3">
                {task.assignees && task.assignees.length > 0 ? (
                  task.assignees.map((assignee) => (
                    <div
                      key={assignee.id}
                      className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-xs text-white overflow-hidden group-hover:scale-105 transition-transform">
                        {assignee.avatarUrl ? (
                          <Image
                            src={assignee.avatarUrl}
                            alt={assignee.name}
                            width={40}
                            height={40}
                          />
                        ) : (
                          assignee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          {assignee.name}
                        </p>
                        <p className="text-[10px] text-neutral-500 font-medium">
                          Project Member
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center border border-dashed border-white/10 rounded-2xl text-neutral-600 italic text-sm">
                    No assignees
                  </div>
                )}
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-4">
              <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                <Calendar size={14} className="text-blue-400" />
                Schedule
              </label>
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                <div>
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider mb-1">
                    Created
                  </p>
                  <p className="text-sm text-white font-medium">
                    {new Date(task.createdAt).toLocaleDateString([], {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                {task.deadline && (
                  <div>
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider mb-1">
                      Deadline
                    </p>
                    <p className="text-sm text-brand font-black">
                      {new Date(task.deadline).toLocaleDateString([], {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {task.tag && (
              <div className="space-y-4">
                <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                  <Tag size={14} className="text-purple-400" />
                  Category
                </label>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                  <span className="text-xs font-black text-purple-300 uppercase tracking-widest">
                    {task.tag}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Tips/Info Card */}
          <div className="bg-brand/10 border border-brand/20 rounded-2xl p-6 space-y-3 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 text-brand/20 group-hover:scale-110 transition-transform">
              <AlertCircle size={40} strokeWidth={1} />
            </div>
            <h4 className="text-sm font-bold text-brand flex items-center gap-2">
              Team Productivity
            </h4>
            <p className="text-xs text-brand/80 leading-relaxed font-medium">
              Keep the discussion active! Good communication leads to 40% faster
              task completion. Use comments to share progress updates or
              blockers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
