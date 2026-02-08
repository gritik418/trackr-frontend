"use client";

import { useGetWorkspaceTasksQuery } from "@/features/task/task.api";
import { Task, TaskPriority, TaskStatus } from "@/features/task/task.interface";
import { selectWorkspace } from "@/features/workspace/workspace.slice";
import {
  Calendar,
  Check,
  ChevronDown,
  ListFilter,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function WorkspaceTasksPage() {
  const workspace = useSelector(selectWorkspace);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<TaskStatus[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<TaskPriority[]>(
    [],
  );
  const [tasks, setTasks] = useState<Task[]>([]);
  const { data, isLoading } = useGetWorkspaceTasksQuery(
    {
      workspaceId: workspace?.id!,
    },
    { skip: !workspace?.id },
  );

  const filteredTasks = tasks.filter((task) => {
    if (
      searchQuery &&
      !task.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    if (selectedStatuses.length > 0 && !selectedStatuses.includes(task.status))
      return false;

    if (
      selectedPriorities.length > 0 &&
      !selectedPriorities.includes(task.priority)
    )
      return false;

    return true;
  });

  const todayTasks = filteredTasks.filter((t) => {
    if (!t.deadline) return false;
    const date = new Date(t.deadline);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  });

  const upcomingTasks = filteredTasks.filter((t) => {
    if (!t.deadline) return true;
    const date = new Date(t.deadline);
    const today = new Date();
    return (
      date > today ||
      (date.getDate() !== today.getDate() &&
        date.getMonth() !== today.getMonth() &&
        date.getFullYear() !== today.getFullYear())
    );
  });

  const toggleStatus = (status: TaskStatus) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  const togglePriority = (priority: TaskPriority) => {
    setSelectedPriorities((prev) =>
      prev.includes(priority)
        ? prev.filter((p) => p !== priority)
        : [...prev, priority],
    );
  };

  useEffect(() => {
    if (data?.tasks) {
      setTasks(data.tasks);
    }
  }, [data]);
  return (
    <div className="flex h-[calc(100vh-2rem)] overflow-hidden animate-in fade-in duration-700">
      {/* Sidebar Filters */}
      <div className="w-64 border-r border-white/5 pr-6 hidden lg:flex flex-col gap-8 overflow-y-auto pt-2">
        {/* Projects Filter - Visual Only for now as endpoint returns tasks across projects */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Projects
            </h3>
            <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-neutral-500">
              {workspace?.projects?.length || 0}
            </span>
          </div>
          <div className="space-y-1">
            {workspace?.projects?.map((p) => (
              <label
                key={p.id}
                className="flex items-center gap-3 p-2 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-white/5 cursor-pointer transition-all group"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="peer appearance-none w-4 h-4 rounded border border-white/20 bg-white/5 checked:bg-brand checked:border-brand transition-colors"
                  />
                  <Check
                    size={10}
                    className="absolute text-black opacity-0 peer-checked:opacity-100 pointer-events-none"
                    strokeWidth={3}
                  />
                </div>
                <span className="truncate">{p.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4">
            Status
          </h3>
          <div className="space-y-1">
            {Object.values(TaskStatus).map((s) => (
              <label
                key={s}
                className="flex items-center gap-3 p-2 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-white/5 cursor-pointer transition-all group"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={selectedStatuses.includes(s)}
                    onChange={() => toggleStatus(s)}
                    className="peer appearance-none w-4 h-4 rounded border border-white/20 bg-white/5 checked:bg-brand checked:border-brand transition-colors"
                  />
                  <Check
                    size={10}
                    className="absolute text-black opacity-0 peer-checked:opacity-100 pointer-events-none"
                    strokeWidth={3}
                  />
                </div>
                <span>{s.replace("_", " ")}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div>
          <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4">
            Priority
          </h3>
          <div className="space-y-1">
            {Object.values(TaskPriority).map((p) => (
              <label
                key={p}
                className="flex items-center gap-3 p-2 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-white/5 cursor-pointer transition-all group"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={selectedPriorities.includes(p)}
                    onChange={() => togglePriority(p)}
                    className="peer appearance-none w-4 h-4 rounded border border-white/20 bg-white/5 checked:bg-brand checked:border-brand transition-colors"
                  />
                  <Check
                    size={10}
                    className="absolute text-black opacity-0 peer-checked:opacity-100 pointer-events-none"
                    strokeWidth={3}
                  />
                </div>
                <span>{p}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col pl-0 lg:pl-6 min-w-0">
        {/* Header */}
        <div className="flex flex-col gap-1 mb-6">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-white/60 tracking-tight">
            My Tasks
          </h2>
          <p className="text-neutral-400 text-sm">
            You have {filteredTasks.length} open tasks across{" "}
            {workspace?.projects?.length || 0} projects.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 relative z-10">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-2.5 text-neutral-500"
              size={16}
            />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/5 rounded-xl text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand/30 focus:bg-white/10 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-sm text-neutral-400 hover:text-white transition-all flex items-center gap-2 hover:bg-white/10">
              <ListFilter size={16} />
              <span>Group By</span>
              <ChevronDown size={14} className="opacity-50" />
            </button>
            <button className="px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-sm text-neutral-400 hover:text-white transition-all flex items-center gap-2 hover:bg-white/10">
              <SlidersHorizontal size={16} />
              <span>Sort</span>
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 pb-10">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" />
            </div>
          ) : (
            <>
              {/* Group: Today */}
              {todayTasks.length > 0 && (
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-bold text-white mb-4 pl-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand shadow-[0_0_8px_rgba(0,216,230,0.6)]"></span>
                    Today
                    <span className="text-neutral-500 font-normal ml-1 text-xs">
                      {todayTasks.length} tasks
                    </span>
                  </h3>
                  <div className="space-y-3">
                    {todayTasks.map((task) => (
                      <TaskItem key={task.id} task={task} />
                    ))}
                  </div>
                </div>
              )}

              {/* Group: Upcoming */}
              {upcomingTasks.length > 0 && (
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-bold text-white mb-4 pl-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600"></span>
                    Upcoming
                    <span className="text-neutral-500 font-normal ml-1 text-xs">
                      {upcomingTasks.length} tasks
                    </span>
                  </h3>
                  <div className="space-y-3">
                    {upcomingTasks.map((task) => (
                      <TaskItem key={task.id} task={task} />
                    ))}
                  </div>
                </div>
              )}

              {todayTasks.length === 0 && upcomingTasks.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-neutral-500">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <Check size={24} />
                  </div>
                  <p>No tasks found.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function TaskItem({ task }: { task: Task }) {
  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.DONE:
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case TaskStatus.IN_PROGRESS:
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case TaskStatus.IN_REVIEW:
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-white/5 text-neutral-400 border-white/10";
    }
  };

  const priorityColors = {
    LOW: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    MEDIUM: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    HIGH: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    URGENT: "bg-red-500/10 text-red-500 border-red-500/30",
  };

  return (
    <div className="group relative flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-dashboard-card-bg/40 hover:bg-dashboard-card-bg/80 hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300 cursor-pointer overflow-hidden">
      {/* Left Accent Border on Hover */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Checkbox */}
      <div className="shrink-0 pt-1">
        <div
          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 ${
            task.status === TaskStatus.DONE
              ? "bg-brand border-brand"
              : "border-white/20 bg-transparent group-hover:border-brand/50"
          }`}
        >
          {task.status === TaskStatus.DONE && (
            <Check size={12} className="text-black" strokeWidth={3} />
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        {/* Meta Row */}
        <div className="flex items-center flex-wrap gap-2">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider bg-white/5 text-neutral-400 border-white/10`}
          >
            Project
          </span>

          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${getStatusColor(task.status)}`}
          >
            {task.status.replace("_", " ")}
          </span>

          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ml-auto ${priorityColors[task.priority]}`}
          >
            {task.priority}
          </span>
        </div>

        {/* Content */}
        <div>
          <h4
            className={`text-base font-semibold text-white group-hover:text-brand transition-colors line-clamp-1 ${task.status === TaskStatus.DONE ? "line-through text-neutral-500 decoration-neutral-600" : ""}`}
          >
            {task.title}
          </h4>
          <p
            className={`text-sm text-neutral-500 line-clamp-1 mt-0.5 font-light ${task.status === TaskStatus.DONE ? "opacity-50" : ""}`}
          >
            {task.description}
          </p>
        </div>
      </div>

      {/* Right Side Actions/Meta */}
      <div className="flex flex-col items-end gap-3 shrink-0 pl-2">
        {task.deadline && (
          <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 group-hover:text-neutral-300 transition-colors bg-white/5 px-2 py-1 rounded-lg">
            <Calendar size={12} />
            <span>
              {new Date(task.deadline).toLocaleDateString([], {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
          {task.assignedTo && (
            <div
              className="w-7 h-7 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-[10px] text-brand font-bold"
              title={task.assignedTo.name}
            >
              {task.assignedTo.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
