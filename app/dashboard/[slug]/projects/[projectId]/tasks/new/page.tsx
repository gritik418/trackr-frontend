"use client";

import { useCreateTaskMutation } from "@/features/task/task.api";
import { TaskPriority, TaskStatus } from "@/features/task/task.interface";
import {
  AlignLeft,
  Calendar,
  ChevronLeft,
  Flag,
  Info,
  Tag,
  Type,
  UserPlus,
} from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectWorkspace } from "@/features/workspace/workspace.slice";
import { useGetWorkspaceMembersQuery } from "@/features/workspace/workspace.api";
import MemberMultiSelect from "@/components/project/MemberMultiSelect";
import Link from "next/link";

export default function CreateTaskPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const slug = params.slug as string;
  const projectId = params.projectId as string;
  const initialStatusFromQuery = searchParams.get("status") as TaskStatus;

  const [createTask, { isLoading }] = useCreateTaskMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [status, setStatus] = useState<TaskStatus>(
    initialStatusFromQuery || TaskStatus.TODO,
  );
  const [tag, setTag] = useState("Feature");
  const [deadline, setDeadline] = useState("");
  const [assignedToIds, setAssignedToIds] = useState<string[]>([]);

  const workspace = useSelector(selectWorkspace);
  const { data: membersData } = useGetWorkspaceMembersQuery(workspace?.id!, {
    skip: !workspace?.id,
  });
  const members = membersData?.members || [];

  const priorityOptions = [
    { value: TaskPriority.LOW, label: "Low", color: "text-blue-400" },
    { value: TaskPriority.MEDIUM, label: "Medium", color: "text-amber-400" },
    { value: TaskPriority.HIGH, label: "High", color: "text-orange-400" },
    { value: TaskPriority.URGENT, label: "Urgent", color: "text-red-500" },
  ];

  const statusOptions = [
    { value: TaskStatus.TODO, label: "To Do" },
    { value: TaskStatus.IN_PROGRESS, label: "In Progress" },
    { value: TaskStatus.IN_REVIEW, label: "In Review" },
    { value: TaskStatus.DONE, label: "Done" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Task title is required");
      return;
    }

    try {
      await createTask({
        projectId,
        body: {
          title,
          description: description || null,
          priority,
          status,
          tag: tag || null,
          deadline: deadline ? new Date(deadline).toISOString() : null,
          assignedToIds,
        },
      }).unwrap();

      toast.success("Task created successfully");
      router.push(`/dashboard/${slug}/projects/${projectId}`);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create task");
    }
  };

  const toggleAssignee = (userId: string) => {
    setAssignedToIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col gap-6 mb-10">
        <div className="flex items-center gap-4">
          <Link
            href={`/dashboard/${slug}/projects/${projectId}`}
            className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-all active:scale-95"
          >
            <ChevronLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-sm text-neutral-500 mb-1">
              <Link
                href={`/dashboard/${slug}/projects/${projectId}`}
                className="hover:text-brand transition-colors"
              >
                Project Dashboard
              </Link>
              <span>/</span>
              <span className="text-white">New Task</span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Create New Task
            </h1>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-8">
          {/* Main Info Card */}
          <div className="bg-dashboard-card-bg/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 space-y-8 shadow-2xl">
            {/* Title */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                <Type size={14} className="text-brand" />
                Task Title
              </label>
              <input
                autoFocus
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g., Design system components"
                className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-5 text-xl text-white placeholder:text-neutral-700 focus:outline-none focus:border-brand/30 focus:bg-white/10 transition-all font-medium shadow-inner"
              />
            </div>

            {/* Description */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                <AlignLeft size={14} className="text-brand" />
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the task in detail..."
                className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-5 text-lg text-neutral-300 placeholder:text-neutral-700 focus:outline-none focus:border-brand/30 focus:bg-white/10 transition-all min-h-[220px] resize-none shadow-inner leading-relaxed"
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-4 text-neutral-400 hover:text-white font-bold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-12 py-4 bg-brand text-bg-dark-0 font-black rounded-2xl hover:bg-brand-hover hover:shadow-[0_0_30px_rgba(var(--brand-rgb),0.3)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {isLoading ? "Creating Task..." : "Create Task"}
            </button>
          </div>
        </div>

        {/* Sidebar Configuration */}
        <div className="space-y-6">
          <div className="bg-dashboard-card-bg/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 space-y-8 shadow-xl">
            {/* Status & Priority */}
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Info size={14} className="text-blue-400" />
                  Status
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {statusOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setStatus(opt.value)}
                      className={`px-4 py-3 rounded-2xl text-sm font-bold border transition-all text-left flex items-center justify-between ${
                        status === opt.value
                          ? "bg-brand/10 border-brand/40 text-brand shadow-[0_0_15px_rgba(var(--brand-rgb),0.1)]"
                          : "bg-white/2 border-white/5 text-neutral-500 hover:bg-white/5 hover:border-white/10"
                      }`}
                    >
                      {opt.label}
                      {status === opt.value && (
                        <div className="w-2 h-2 rounded-full bg-brand shadow-[0_0_8px_rgba(var(--brand-rgb),0.8)]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Flag size={14} className="text-orange-400" />
                  Priority
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {priorityOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setPriority(opt.value)}
                      className={`px-3 py-2.5 rounded-xl text-[11px] font-black border uppercase tracking-wider transition-all ${
                        priority === opt.value
                          ? "bg-white/10 border-white/20 text-white shadow-lg"
                          : `bg-white/2 border-white/5 ${opt.color} opacity-60 hover:opacity-100`
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tag & Deadline */}
            <div className="space-y-6 pt-2">
              <div className="space-y-3">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Tag size={14} className="text-purple-400" />
                  Tag
                </label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="Feature, Bug, etc."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand/30 transition-all font-medium shadow-inner"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Calendar size={14} className="text-amber-400" />
                  Deadline
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand/30 transition-all scheme-dark shadow-inner"
                />
              </div>
            </div>
          </div>

          <div className="bg-dashboard-card-bg/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 shadow-xl">
            <div className="space-y-4">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em] flex items-center gap-2">
                <UserPlus size={14} className="text-emerald-400" />
                Assignees
              </label>
              <MemberMultiSelect
                members={members}
                selectedIds={assignedToIds}
                onToggle={toggleAssignee}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
