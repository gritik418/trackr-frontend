"use client";
import { Task, TaskStatus } from "@/features/task/task.interface";
import { Info } from "lucide-react";
import { motion } from "framer-motion";
import TaskBoardContainer from "./TaskBoardContainer";

interface Column {
  id: TaskStatus;
  status: TaskStatus;
  title: string;
  color: string;
}

const COLUMNS: Column[] = [
  {
    id: TaskStatus.TODO,
    status: TaskStatus.TODO,
    title: "To Do",
    color: "bg-neutral-500",
  },
  {
    id: TaskStatus.IN_PROGRESS,
    status: TaskStatus.IN_PROGRESS,
    title: "In Progress",
    color: "bg-blue-500",
  },
  {
    id: TaskStatus.IN_REVIEW,
    status: TaskStatus.IN_REVIEW,
    title: "In Review",
    color: "bg-amber-500",
  },
  {
    id: TaskStatus.DONE,
    status: TaskStatus.DONE,
    title: "Done",
    color: "bg-emerald-500",
  },
];

type Props = {
  onTaskClick: (task: Task) => void;
  onAddTask: (status: TaskStatus) => void;
  projectId: string;
};

export default function TaskBoard({
  projectId,
  onTaskClick,
  onAddTask,
}: Props) {
  const limit = 10;
  return (
    <div className="flex flex-col h-full">
      {/* Visibility Note */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 px-5 py-3 mb-8 bg-white/2 border border-white/5 rounded-2xl w-fit backdrop-blur-md shadow-xl border-l-brand/30 border-l-2"
      >
        <div className="p-1.5 bg-brand/10 rounded-lg">
          <Info size={14} className="text-brand" strokeWidth={3} />
        </div>
        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">
          Hold, blocked and cancelled tasks are only visible in{" "}
          <span className="text-white">List View</span>. This board focuses on{" "}
          <span className="text-brand">Active Operations</span>.
        </p>
      </motion.div>

      <div className="flex gap-6 min-w-[1000px] px-4 sm:px-0 h-full pb-6">
        {COLUMNS.map((column) => {
          return (
            <TaskBoardContainer
              columnColor={column.color}
              columnTitle={column.title}
              key={column.id}
              projectId={projectId}
              status={column.status}
              limit={limit}
              onTaskClick={onTaskClick}
              onAddTask={onAddTask}
            />
          );
        })}
      </div>
    </div>
  );
}
