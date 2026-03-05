"use client";

import { Task } from "@/features/task/task.interface";
import { List, MoreHorizontal } from "lucide-react";
import Image from "next/image";

interface TaskCardProps {
  task: Task;
  onClick?: (task: Task) => void;
}

export default function TaskCard({ task, onClick }: TaskCardProps) {
  // Mock subtasks for now as API doesn't return them yet
  const subtasks = [];
  const completedSubtasks = 0;

  const priorityColors = {
    LOW: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    MEDIUM: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    HIGH: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    URGENT: "bg-red-500/10 text-red-500 border-red-500/30",
  };

  return (
    <div
      onClick={() => onClick?.(task)}
      className="bg-dashboard-card-bg/60 border border-white/5 p-4 rounded-xl shadow-sm hover:border-brand/30 hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden"
    >
      {/* Hover Effect */}
      <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-2 gap-2">
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/5 text-neutral-400 border border-white/5 uppercase tracking-wider">
              {task.tag || "Task"}
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${priorityColors[task.priority]}`}
            >
              {task.priority}
            </span>
          </div>
          <button className="text-neutral-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity p-1">
            <MoreHorizontal size={14} />
          </button>
        </div>

        <h4 className="text-sm font-medium text-white leading-snug mb-3 group-hover:text-brand transition-colors line-clamp-2">
          {task.title}
        </h4>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-1.5 focus-within:z-10">
            {task.assignees && task.assignees.length > 0 ? (
              task.assignees.map((assignee) => (
                <div
                  key={assignee.id}
                  title={assignee.name}
                  className="w-6 h-6 rounded-full bg-neutral-800 border-2 border-bg-dark-0 flex items-center justify-center text-[8px] text-white overflow-hidden hover:z-10 transition-all hover:scale-110"
                >
                  {assignee.avatarUrl ? (
                    <Image
                      src={assignee.avatarUrl}
                      alt={assignee.name}
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
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
              ))
            ) : (
              <div className="w-6 h-6 rounded-full bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center text-[8px] text-neutral-500">
                ?
              </div>
            )}
          </div>
          <div className="flex items-center gap-2.5 text-xs text-neutral-500">
            {task.deadline && (
              <span className="text-[10px] opacity-60">
                {new Date(task.deadline).toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
