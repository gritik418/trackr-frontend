"use client";

import CreateTaskModal from "@/components/project/CreateTaskModal";
import ProjectOverview from "@/components/project/ProjectOverview";
import TaskBoard from "@/components/project/TaskBoard";
import TaskDetailModal from "@/components/project/TaskDetailModal";
import TaskListView from "@/components/project/TaskListView";
import ProjectSettings from "@/components/project/ProjectSettings";
import { Task } from "@/features/task/task.interface";
import { TaskStatus } from "@/features/task/task.interface";
import { useGetTasksQuery } from "@/features/task/task.api";
import { selectProject } from "@/features/project/project.slice";
import { selectWorkspace } from "@/features/workspace/workspace.slice";
import {
  Calendar,
  Filter,
  Layout,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ProjectDetailsPage() {
  const workspace = useSelector(selectWorkspace);
  const project = useSelector(selectProject);

  const [activeTab, setActiveTab] = useState("board");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [initialStatusForCreate, setInitialStatusForCreate] =
    useState<TaskStatus>(TaskStatus.TODO);

  const tabs = [
    { id: "overview", label: "Overview", icon: Layout },
    { id: "board", label: "Board", icon: Layout },
    { id: "list", label: "List", icon: List },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const { data: tasksData, isLoading } = useGetTasksQuery(
    { projectId: project?.id! },
    { skip: !project?.id },
  );
  const tasks = tasksData?.tasks || [];

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  const handleAddTask = (status: TaskStatus) => {
    setInitialStatusForCreate(status);
    setIsCreateModalOpen(true);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col gap-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-neutral-500 mb-1">
              <Link href={`/dashboard/${workspace?.slug}/projects`}>
                Projects
              </Link>
              <span>/</span>
              <span className="text-white hover:text-brand transition-colors cursor-pointer">
                {project?.name}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              {project?.name}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2 mr-2">
              {["RG", "SC", "MJ"].map((name, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-bg-dark-0 bg-neutral-800 flex items-center justify-center text-[10px] font-bold text-white hover:z-10 transition-transform hover:scale-110 cursor-pointer"
                >
                  {name}
                </div>
              ))}
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="w-8 h-8 rounded-full border-2 border-bg-dark-0 bg-white/10 flex items-center justify-center text-xs text-white hover:bg-brand hover:text-bg-dark-0 transition-all active:scale-95"
              >
                <Plus size={14} />
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/5 rounded-xl text-sm font-bold transition-all active:scale-95">
              <Share2 size={16} />
              Share
            </button>
            <button className="p-2.5 text-neutral-500 hover:text-white hover:bg-white/5 rounded-xl transition-all">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Navigation & Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-1 relative">
          {/* Tabs */}
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all relative ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-[-5px] left-0 right-0 h-0.5 bg-brand rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                )}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mb-2 sm:mb-0">
            <div className="h-6 w-px bg-white/10 mx-2 hidden sm:block" />
            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-white transition-colors">
              <Filter size={16} />
              Filter
            </button>
            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-white transition-colors">
              <Calendar size={16} />
              Date
            </button>
            <div className="relative">
              <Search
                className="absolute left-3 top-2.5 text-neutral-600"
                size={14}
              />
              <input
                type="text"
                placeholder="Search tasks..."
                className="pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-white focus:outline-none focus:border-brand/40 w-40 hover:w-56 focus:w-56 transition-all duration-300 placeholder:text-neutral-600"
              />
            </div>
            <button
              onClick={() => handleAddTask(TaskStatus.TODO)}
              className="ml-2 cursor-pointer px-4 py-2 bg-brand text-bg-dark-0 text-sm font-black rounded-xl hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/20 transition-all flex items-center gap-2 active:scale-95"
            >
              <Plus size={18} strokeWidth={3} />
              New Task
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="-mx-4 sm:mx-0 flex-1 overflow-x-auto">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" />
          </div>
        ) : (
          <>
            {activeTab === "overview" && <ProjectOverview tasks={tasks} />}

            {activeTab === "board" && (
              <TaskBoard
                tasks={tasks}
                onTaskClick={handleTaskClick}
                onAddTask={handleAddTask}
              />
            )}

            {activeTab === "list" && (
              <TaskListView tasks={tasks} onTaskClick={handleTaskClick} />
            )}
          </>
        )}

        {activeTab === "settings" && project && (
          <ProjectSettings project={project} />
        )}
      </div>

      {/* Modals */}
      <TaskDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        task={selectedTask}
      />

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        initialStatus={initialStatusForCreate}
      />
    </div>
  );
}
