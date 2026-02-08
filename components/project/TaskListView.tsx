"use client";

import { Task } from "@/features/task/task.interface";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  List as ListIcon,
  MoreHorizontal,
  Tag as TagIcon,
  MinusCircle,
  X,
} from "lucide-react";
import Image from "next/image";

interface TaskListViewProps {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
}

export default function TaskListView({
  tasks,
  onTaskClick,
}: TaskListViewProps) {
  const priorityColors = {
    LOW: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    MEDIUM: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    HIGH: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    URGENT: "bg-red-500/10 text-red-500 border-red-500/30",
  };

  const statusIcons = {
    TODO: <Clock size={14} className="text-neutral-500" />,
    IN_PROGRESS: <Clock size={14} className="text-blue-400 animate-pulse" />,
    IN_REVIEW: <AlertCircle size={14} className="text-amber-400" />,
    DONE: <CheckCircle2 size={14} className="text-emerald-400" />,
    BLOCKED: <MinusCircle size={14} className="text-red-400" />,
    ON_HOLD: <Clock size={14} className="text-gray-400" />,
    CANCELED: <X size={14} className="text-red-500" />,
  };

  return (
    <div className="bg-dashboard-card-bg/40 border border-white/5 rounded-2xl overflow-hidden animate-in fade-in duration-500 shadow-xl">
      <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-320px)] scrollbar-thin scrollbar-thumb-white/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5 backdrop-blur-md sticky top-0 z-10">
              <th className="px-6 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
                Task Title
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
                Status
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
                Priority
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
                Assignees
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
                Subtasks
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
                Deadline
              </th>
              <th className="px-6 py-4 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {tasks.map((task) => {
              // Mock subtasks
              const subtasks = [];
              const completedSubtasks = 0;

              return (
                <tr
                  key={task.id}
                  onClick={() => onTaskClick?.(task)}
                  className="group hover:bg-white/2 transition-all cursor-pointer relative"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-neutral-500 border border-white/5 group-hover:border-brand/30 transition-colors">
                        <TagIcon size={14} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white group-hover:text-brand transition-colors tracking-tight line-clamp-1">
                          {task.title}
                        </p>
                        <p className="text-[10px] text-neutral-500 font-mono tracking-tighter uppercase flex items-center gap-2">
                          <span>{task.id.slice(0, 8)}</span>
                          {task.tag && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-white/20" />
                              <span className="text-brand/80 font-bold">
                                {task.tag}
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-300">
                      {/* Cast because API status might have values not in map yet, or verify map covers all */}
                      {statusIcons[task.status] || <AlertCircle size={14} />}
                      <span className="opacity-80 font-mono text-[10px]">
                        {task.status.replace("_", " ")}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase tracking-widest ${priorityColors[task.priority]}`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-1.5 overflow-hidden">
                      {task.assignedTo ? (
                        <div
                          className="w-6 h-6 rounded-full border-2 border-bg-dark-0 bg-neutral-800 flex items-center justify-center text-[8px] text-white relative z-0 hover:z-10 transition-transform hover:scale-110"
                          title={task.assignedTo.name}
                        >
                          {task.assignedTo.avatarUrl ? (
                            <Image
                              src={task.assignedTo.avatarUrl}
                              alt={task.assignedTo.name}
                              width={24}
                              height={24}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            task.assignedTo.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)
                          )}
                        </div>
                      ) : (
                        <span className="text-neutral-600 text-[10px] italic">
                          Unassigned
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {/* Mock subtasks UI or hide */}
                      <span className="text-[10px] text-neutral-600 italic">
                        --
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-neutral-400 font-mono text-[10px]">
                      <Clock size={12} />
                      {task.deadline
                        ? new Date(task.deadline).toLocaleDateString([], {
                            month: "short",
                            day: "numeric",
                          })
                        : "--"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-neutral-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="px-8 py-4 bg-white/2 border-t border-white/5 backdrop-blur-xl flex justify-between items-center text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
        <span>Showing {tasks.length} Tasks</span>
        <div className="flex gap-4">
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {tasks.filter((t) => t.status === "DONE").length} Completed
          </span>
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand" />
            {tasks.filter((t) => t.status !== "DONE").length} Active
          </span>
        </div>
      </div>
    </div>
  );
}
