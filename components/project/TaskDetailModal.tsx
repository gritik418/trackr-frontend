"use client";

import { Task } from "@/features/task/task.interface";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare,
  Paperclip,
  Tag,
  User,
  X,
  MoreVertical,
  MinusCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import CommentSection from "./CommentSection";

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export default function TaskDetailModal({
  isOpen,
  onClose,
  task,
}: TaskDetailModalProps) {
  const [mounted, setMounted] = useState(false);

  // Mock subtasks
  const subtasks = [];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !mounted || !task) return null;

  const priorityColors = {
    LOW: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    MEDIUM: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    HIGH: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    URGENT: "bg-red-500/10 text-red-500 border-red-500/30",
  };

  const statusIcons = {
    TODO: <Clock size={14} />,
    IN_PROGRESS: <Clock size={14} className="animate-pulse" />,
    IN_REVIEW: <AlertCircle size={14} />,
    DONE: <CheckCircle2 size={14} />,
    BLOCKED: <MinusCircle size={14} />,
    ON_HOLD: <Clock size={14} />,
    CANCELED: <X size={14} />,
  };

  return createPortal(
    <div className="fixed inset-0 z-110 flex items-center justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-500"
        onClick={onClose}
      />

      {/* Slide-over Content */}
      <div className="relative w-full max-w-2xl h-full bg-dashboard-card-bg/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out">
        {/* Decorative Ambience */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand/5 blur-[100px] rounded-full pointer-events-none -mr-40 -mt-20" />

        {/* Header */}
        <div className="relative z-10 px-8 py-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest flex items-center gap-1.5 ${priorityColors[task.priority]}`}
            >
              {task.priority} Priority
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-1.5 text-neutral-400 text-xs font-medium uppercase tracking-wider">
              {statusIcons[task.status] || <AlertCircle size={14} />}
              {task.status.replace("_", " ")}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-neutral-500 hover:text-white hover:bg-white/5 rounded-xl transition-all">
              <MoreVertical size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-500 hover:text-white hover:bg-white/5 rounded-xl transition-all group"
            >
              <X
                size={20}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="relative z-10 flex-1 overflow-y-auto px-8 py-10 space-y-10 scrollbar-thin scrollbar-thumb-white/10">
          {/* Title and Meta */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white tracking-tight leading-tight">
              {task.title}
            </h2>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  <Tag size={16} className="text-brand" />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                    Project
                  </p>
                  <p className="text-white font-medium">Design System</p>
                </div>
              </div>
              {task.tag && (
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <Tag size={16} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                      Tag
                    </p>
                    <p className="text-white font-medium">{task.tag}</p>
                  </div>
                </div>
              )}
              {task.deadline && (
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <Calendar size={16} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                      Due Date
                    </p>
                    <p className="text-white font-medium">
                      {new Date(task.deadline).toLocaleDateString([], {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-neutral-400">
              <div className="w-8 h-px bg-white/10" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Description
              </span>
            </div>
            <p className="text-neutral-300 leading-relaxed text-lg font-light">
              {task.description ||
                "No description provided for this task. Set a clear goal to help the team understand the requirements."}
            </p>
          </div>

          {/* Members */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-neutral-400">
              <div className="w-8 h-px bg-white/10" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Assignees
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {task.assignees && task.assignees.length > 0 ? (
                task.assignees.map((assignee) => (
                  <div
                    key={assignee.id}
                    className="flex items-center gap-3 p-2 pr-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-neutral-800 border border-white/5 flex items-center justify-center text-xs text-white overflow-hidden group-hover:border-brand/50 transition-colors">
                      {assignee.avatarUrl ? (
                        <Image
                          src={assignee.avatarUrl}
                          alt={assignee.name}
                          width={32}
                          height={32}
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
                      <p className="text-sm font-semibold text-white group-hover:text-brand transition-colors">
                        {assignee.name}
                      </p>
                      <p className="text-[10px] text-neutral-500">Assignee</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-neutral-600 italic">
                  No one assigned yet
                </p>
              )}
              <button className="w-10 h-10 rounded-2xl border border-dashed border-white/20 flex items-center justify-center text-neutral-500 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all">
                <User size={18} />
              </button>
            </div>
          </div>

          {/* Subtasks - HIDDEN FOR NOW */}
          {/* <div className="space-y-4"> ... </div> */}

          {/* Activity Section / Comments */}
          <CommentSection taskId={task.id} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
