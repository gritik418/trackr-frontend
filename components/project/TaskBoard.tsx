"use client";

import { Task } from "@/features/project/project.interface";
import { Plus } from "lucide-react";
import TaskCard from "./TaskCard";

interface Column {
  id: Task["status"];
  title: string;
  color: string;
}

interface TaskBoardProps {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
  onAddTask?: (status: Task["status"]) => void;
}

const COLUMNS: Column[] = [
  { id: "TODO", title: "To Do", color: "bg-neutral-500" },
  { id: "IN_PROGRESS", title: "In Progress", color: "bg-blue-500" },
  { id: "IN_REVIEW", title: "In Review", color: "bg-amber-500" },
  { id: "DONE", title: "Done", color: "bg-emerald-500" },
];

export default function TaskBoard({
  tasks,
  onTaskClick,
  onAddTask,
}: TaskBoardProps) {
  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter((t) => t.status === status);
  };

  return (
    <div className="flex gap-6 min-w-[1000px] px-4 sm:px-0 h-full pb-6">
      {COLUMNS.map((column) => {
        const columnTasks = getTasksByStatus(column.id);
        return (
          <div
            key={column.id}
            className="flex-1 min-w-[280px] flex flex-col gap-4"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${column.color} shadow-[0_0_8px] shadow-current`}
                />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  {column.title}
                </h3>
                <span className="text-xs text-neutral-500 font-mono bg-white/5 px-2 py-0.5 rounded-full">
                  {columnTasks.length}
                </span>
              </div>
              <button
                onClick={() => onAddTask?.(column.id)}
                className="text-neutral-600 hover:text-white transition-all hover:rotate-90 p-1"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Task List */}
            <div className="flex-1 bg-white/2 rounded-2xl p-2 border border-white/5 space-y-3 min-h-[150px] overflow-y-auto max-h-[calc(100vh-250px)] scrollbar-thin scrollbar-thumb-white/10">
              {columnTasks.map((task) => (
                <TaskCard key={task.id} task={task} onClick={onTaskClick} />
              ))}

              <button
                onClick={() => onAddTask?.(column.id)}
                className="w-full py-3 flex items-center justify-center gap-2 text-sm text-neutral-500 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-dashed border-white/5 hover:border-white/20 group"
              >
                <Plus
                  size={16}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="font-medium">Add Task</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
