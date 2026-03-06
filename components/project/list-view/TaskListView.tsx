"use client";

import { useGetTasksQuery } from "@/features/task/task.api";
import { SortBy, SortOrder, Task } from "@/features/task/task.interface";
import { AlertCircle, CheckCircle2, Clock, MinusCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import TaskListItem from "./TaskListItem";
import TaskSearchbar from "./TaskSearchbar";
import TaskStatusFilter from "./TaskStatusFilter";
import { TaskStatusWithAll } from "@/features/task/task.interface";

interface TaskListViewProps {
  projectId: string;
  onTaskClick: (task: Task) => void;
}

export default function TaskListView({
  projectId,
  onTaskClick,
}: TaskListViewProps) {
  const limit: number = 10;
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<SortBy>("updatedAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<TaskStatusWithAll>(
    TaskStatusWithAll.ALL,
  );
  const [tasks, setTasks] = useState<Task[]>([]);

  const { data } = useGetTasksQuery(
    {
      projectId,
      query: {
        page,
        limit,
        sortBy: sort,
        sortOrder,
        search,
        status,
      },
    },
    {
      skip: !projectId,
      refetchOnMountOrArgChange: true,
    },
  );

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

  useEffect(() => {
    if (data?.tasks) {
      setTasks(data.tasks);
    }
  }, [data]);

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <TaskSearchbar value={search} onChange={setSearch} />
        <TaskStatusFilter activeStatus={status} onStatusChange={setStatus} />
      </div>

      <div className="bg-dashboard-card-bg/40 border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto scrollbar-hidden overflow-y-auto max-h-[calc(100vh-320px)] scrollbar-thin scrollbar-thumb-white/10">
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
                  Category
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
                  Deadline
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tasks.map((task) => {
                return (
                  <TaskListItem
                    priorityColors={priorityColors}
                    statusIcons={statusIcons}
                    onTaskClick={onTaskClick}
                    key={task.id}
                    task={task}
                  />
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
    </div>
  );
}
