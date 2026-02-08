"use client";

import CreateTaskModal from "@/components/project/CreateTaskModal";
import ProjectOverview from "@/components/project/ProjectOverview";
import TaskBoard from "@/components/project/TaskBoard";
import TaskDetailModal from "@/components/project/TaskDetailModal";
import TaskListView from "@/components/project/TaskListView";
import ProjectSettings from "@/components/project/ProjectSettings";
import { Task } from "@/features/project/project.interface";
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

const MOCK_TASKS: Task[] = [
  {
    id: "task-1",
    title: "Research competitors and market trends",
    description:
      "Analyze the top 5 competitors in the market and identify their strengths and weaknesses. Look for gaps in their offerings that we can exploit.",
    tag: "Strategy",
    status: "TODO",
    priority: "MEDIUM",
    members: [{ id: "u1", name: "Ritik Gupta" }],
    subtasks: [
      { id: "s1", title: "Compile list of competitors", completed: true },
      { id: "s2", title: "SWOT analysis for each", completed: false },
    ],
    createdAt: new Date().toISOString(),
    deadline: new Date(Date.now() + 86400000 * 5).toISOString(),
  },
  {
    id: "task-2",
    title: "Design homepage hero section with animations",
    description:
      "Create a high-fidelity prototype of the hero section. Include smooth scroll animations and a clear CTA. The design should follow the new brand guidelines.",
    tag: "Design",
    status: "IN_PROGRESS",
    priority: "HIGH",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799314346d?w=800&auto=format&fit=crop&q=60",
    members: [
      { id: "u1", name: "Ritik Gupta" },
      { id: "u3", name: "Mike Johnson" },
    ],
    subtasks: [
      { id: "s3", title: "Sketches and wireframes", completed: true },
      { id: "s4", title: "High-fidelity mockups", completed: true },
      { id: "s5", title: "Prototypes for animations", completed: false },
    ],
    createdAt: new Date().toISOString(),
    deadline: new Date(Date.now() + 86400000 * 2).toISOString(),
  },
  {
    id: "task-3",
    title: "Setup project repository and CI/CD pipeline",
    description:
      "Initialize the repository with the necessary boilerplate. Setup GitHub Actions for automated testing and deployment to staging.",
    tag: "Dev",
    status: "IN_PROGRESS",
    priority: "URGENT",
    members: [{ id: "u2", name: "Sarah Connor" }],
    subtasks: [
      { id: "s6", title: "Initialize Repo", completed: true },
      { id: "s7", title: "Configure Actions", completed: false },
    ],
    createdAt: new Date().toISOString(),
    deadline: new Date(Date.now() + 86400000).toISOString(),
  },
  {
    id: "task-4",
    title: "Define component library structure",
    description:
      "Outline the core components required for the design system. Categorize them into atoms, molecules, and organisms.",
    tag: "Dev",
    status: "IN_REVIEW",
    priority: "MEDIUM",
    members: [
      { id: "u1", name: "Ritik Gupta" },
      { id: "u2", name: "Sarah Connor" },
      { id: "u3", name: "Mike Johnson" },
    ],
    subtasks: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: "task-5",
    title: "Project Kickoff Meeting",
    description:
      "Initial meeting with all stakeholders to define goals, timelines, and responsibilities.",
    tag: "Meeting",
    status: "DONE",
    priority: "HIGH",
    members: [
      { id: "u1", name: "Ritik Gupta" },
      { id: "u2", name: "Sarah Connor" },
      { id: "u3", name: "Mike Johnson" },
    ],
    subtasks: [
      { id: "s8", title: "Prepare Agenda", completed: true },
      { id: "s9", title: "Invite participants", completed: true },
    ],
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    deadline: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
];

export default function ProjectDetailsPage() {
  const workspace = useSelector(selectWorkspace);
  const project = useSelector(selectProject);

  const [activeTab, setActiveTab] = useState("board");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [initialStatusForCreate, setInitialStatusForCreate] =
    useState<Task["status"]>("TODO");

  const tabs = [
    { id: "overview", label: "Overview", icon: Layout },
    { id: "board", label: "Board", icon: Layout },
    { id: "list", label: "List", icon: List },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  const handleAddTask = (status: Task["status"]) => {
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
              onClick={() => handleAddTask("TODO")}
              className="ml-2 px-4 py-2 bg-brand text-bg-dark-0 text-sm font-black rounded-xl hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/20 transition-all flex items-center gap-2 active:scale-95"
            >
              <Plus size={18} strokeWidth={3} />
              New Task
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="-mx-4 sm:mx-0 flex-1 overflow-x-auto">
        {activeTab === "overview" && <ProjectOverview tasks={MOCK_TASKS} />}

        {activeTab === "board" && (
          <TaskBoard
            tasks={MOCK_TASKS}
            onTaskClick={handleTaskClick}
            onAddTask={handleAddTask}
          />
        )}

        {activeTab === "list" && (
          <TaskListView tasks={MOCK_TASKS} onTaskClick={handleTaskClick} />
        )}

        {activeTab === "settings" && <ProjectSettings project={project} />}
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
