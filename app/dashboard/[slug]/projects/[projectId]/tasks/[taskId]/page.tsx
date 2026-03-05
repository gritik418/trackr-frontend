"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
} from "@/features/task/task.api";
import { TaskStatus, TaskPriority } from "@/features/task/task.interface";
import { useGetProjectMembersQuery } from "@/features/project/project.api";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  Clock,
  ExternalLink,
  Flag,
  MoreHorizontal,
  Pause,
  Share2,
  Tag,
  User,
  X,
  Edit2,
  Check,
  Plus,
  Copy,
  ChevronRight,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import CommentSection from "@/components/project/CommentSection";

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.taskId as string;
  const slug = params.slug as string;
  const projectId = params.projectId as string;

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAssigneeSelectorOpen, setIsAssigneeSelectorOpen] = useState(false);

  const {
    data: taskData,
    isLoading,
    error,
  } = useGetTaskByIdQuery(
    { taskId, projectId },
    {
      skip: !taskId || !projectId,
      refetchOnMountOrArgChange: true,
    },
  );

  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const { data: membersData } = useGetProjectMembersQuery({
    workspaceId: taskData?.task?.workspaceId || "",
    projectId,
  });

  const task = taskData?.task;
  const members = membersData?.members || [];

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
    }
  }, [task]);

  const handleUpdate = async (body: any) => {
    try {
      await updateTask({
        taskId,
        projectId,
        body,
      }).unwrap();
      toast.success("Task updated");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update task");
    }
  };

  const handleTitleSubmit = () => {
    if (title !== task?.title) {
      handleUpdate({ title });
    }
    setIsEditingTitle(false);
  };

  const handleDescSubmit = () => {
    if (description !== task?.description) {
      handleUpdate({ description });
    }
    setIsEditingDesc(false);
  };

  const toggleAssignee = (userId: string) => {
    const currentAssigneeIds = task?.assignees.map((a) => a.id) || [];
    let newAssigneeIds: string[];

    if (currentAssigneeIds.includes(userId)) {
      newAssigneeIds = currentAssigneeIds.filter((id) => id !== userId);
    } else {
      newAssigneeIds = [...currentAssigneeIds, userId];
    }

    handleUpdate({ assignedToIds: newAssigneeIds });
  };

  const copyTaskLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard", {
      icon: <Zap className="text-brand w-4 h-4" />,
      style: {
        background: "#0A0A0A",
        color: "#fff",
        border: "1px solid rgba(0, 186, 199, 0.2)",
      },
    });
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setTag(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-brand/20 border-t-brand" />
          <div className="absolute inset-0 blur-xl bg-brand/20 animate-pulse rounded-full" />
        </div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="flex flex-col h-[calc(100vh-100px)] items-center justify-center space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-6 rounded-3xl bg-red-500/10 border border-red-500/20 text-red-500 shadow-[0_0_40px_rgba(239,68,68,0.1)]"
        >
          <AlertCircle size={48} />
        </motion.div>
        <h2 className="text-3xl font-black text-white tracking-tight">
          Task Disappeared
        </h2>
        <p className="text-neutral-500 font-medium">
          The task you're looking for has vanished into the void.
        </p>
        <button
          onClick={() => router.back()}
          className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/5 active:scale-95"
        >
          Return to Mission
        </button>
      </div>
    );
  }

  const priorityColors = {
    LOW: "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]",
    MEDIUM:
      "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]",
    HIGH: "bg-orange-500/10 text-orange-400 border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.1)]",
    URGENT:
      "bg-red-500/10 text-red-500 border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)]",
  };

  const statusIcons: Record<TaskStatus, React.ReactNode> = {
    [TaskStatus.TODO]: <Clock size={16} />,
    [TaskStatus.IN_PROGRESS]: (
      <Zap size={16} className="text-brand animate-pulse" />
    ),
    [TaskStatus.IN_REVIEW]: (
      <AlertCircle size={16} className="text-amber-400" />
    ),
    [TaskStatus.DONE]: <CheckCircle2 size={16} className="text-emerald-400" />,
    [TaskStatus.BLOCKED]: <X size={16} className="text-red-500" />,
    [TaskStatus.CANCELED]: <X size={16} className="text-neutral-500" />,
    [TaskStatus.ON_HOLD]: <Pause size={16} className="text-blue-400" />,
  };

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden selection:bg-brand/30">
      {/* Immersive Background Layers */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 blur-[150px] rounded-full animate-pulse [animation-duration:5s]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150 brightness-150" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-12 space-y-10">
        {/* Navigation & Actions */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-5">
            <button
              onClick={() => router.back()}
              className="group p-3 cursor-pointer rounded-2xl bg-white/2 border border-white/5 text-neutral-500 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 shadow-xl"
            >
              <ChevronLeft
                size={22}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-600 mb-2">
                <Link
                  href={`/dashboard/${slug}/projects/${projectId}`}
                  className="hover:text-brand transition-colors"
                >
                  Workspace
                </Link>
                <ChevronRight size={10} className="opacity-30" />
                <span className="text-neutral-400">Task Node</span>
              </div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                Task <span className="text-brand">Details</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={copyTaskLink}
              className="flex cursor-pointer items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] active:scale-95"
            >
              <Copy size={14} />
              Copy Node URL
            </button>
          </div>
        </motion.div>

        <div className="gap-10">
          {/* Main Column */}
          <div className="space-y-10">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="group/main bg-[#0A0A0A]/80 backdrop-blur-3xl border border-white/10 rounded-[32px] p-10 space-y-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              {/* Internal Borders & Glows */}
              <div className="absolute inset-px rounded-[31px] border border-white/3 pointer-events-none" />
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full pointer-events-none -mr-60 -mt-20 group-hover/main:bg-brand/10 transition-colors duration-1000" />

              <div className="relative z-10 space-y-12">
                {/* Status & Priority Badges */}
                <div className="flex flex-wrap items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={cn(
                      "px-4 py-1.5 rounded-2xl text-[11px] font-black border uppercase tracking-[0.2em] flex items-center gap-2.5 cursor-pointer backdrop-blur-md transition-all shadow-lg",
                      priorityColors[
                        task.priority as keyof typeof priorityColors
                      ],
                    )}
                  >
                    <Flag size={14} strokeWidth={3} />
                    {task.priority} Priority
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-1.5 rounded-2xl bg-white/5 border border-white/10 text-[11px] font-black text-neutral-400 uppercase tracking-[0.2em] flex items-center gap-2.5 cursor-pointer hover:bg-white/10 hover:border-white/20 hover:text-white transition-all shadow-lg"
                  >
                    {statusIcons[task.status as TaskStatus]}
                    {task.status.replace("_", " ")}
                  </motion.div>
                </div>

                {/* Title Section with AnimatePresence */}
                <div className="relative">
                  <AnimatePresence mode="wait">
                    {isEditingTitle ? (
                      <motion.div
                        key="editing-title"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        className="flex items-stretch gap-3"
                      >
                        <input
                          autoFocus
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          onBlur={handleTitleSubmit}
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleTitleSubmit()
                          }
                          className="text-3xl font-black text-white tracking-tighter leading-none bg-white/5 border-2 border-brand/50 rounded-3xl px-6 py-4 w-full outline-none focus:border-brand transition-all shadow-[0_0_40px_rgba(0,186,199,0.15)] placeholder:text-neutral-700"
                          placeholder="Define the objective..."
                        />
                        <button
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={handleTitleSubmit}
                          className="px-6 bg-brand cursor-pointer text-bg-dark-0 rounded-3xl shadow-[0_10px_30px_rgba(0,186,199,0.3)] active:scale-90 transition-all flex items-center justify-center"
                        >
                          <Check size={28} strokeWidth={4} />
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="static-title"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        onClick={() => setIsEditingTitle(true)}
                        className="flex items-start justify-between group/title-hover cursor-pointer pr-4"
                      >
                        <h2 className="text-3xl font-black text-white tracking-tighter leading-tight group-hover/title-hover:text-brand transition-colors flex-1 selection:bg-brand/30">
                          {task.title}
                        </h2>
                        <div className="mt-2 p-3 text-neutral-700 group-hover/title-hover:text-brand bg-white/0 group-hover/title-hover:bg-brand/10 rounded-2xl opacity-0 group-hover/title-hover:opacity-100 transition-all duration-300">
                          <Edit2 size={24} strokeWidth={2.5} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-px bg-brand/40 shadow-[0_0_8px_rgba(0,186,199,0.5)]" />
                    <span className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.4em] italic">
                      Documentation
                    </span>
                  </div>
                  <AnimatePresence>
                    {!isEditingDesc && (
                      <motion.button
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        onClick={() => setIsEditingDesc(true)}
                        className="text-[10px] font-black text-neutral-600 uppercase tracking-widest hover:text-brand bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 hover:border-brand/30 transition-all flex items-center gap-2 group/edit-btn shadow-lg"
                      >
                        <Edit2
                          size={12}
                          className="group-hover/edit-btn:rotate-12 transition-transform"
                        />
                        Override
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative">
                  <AnimatePresence mode="wait">
                    {isEditingDesc ? (
                      <motion.div
                        key="editing-desc"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="space-y-4"
                      >
                        <div className="relative group/textarea">
                          <textarea
                            autoFocus
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full min-h-[300px] text-neutral-200 leading-relaxed text-lg font-medium bg-[#0A0A0A] p-8 rounded-[32px] border-2 border-brand/20 focus:border-brand/40 outline-none transition-all shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] resize-none selection:bg-brand/20 scrollbar-hide"
                            placeholder="Initialize project documentation..."
                          />
                        </div>
                        <div className="flex justify-end gap-3 px-2">
                          <button
                            onClick={() => {
                              setDescription(task.description || "");
                              setIsEditingDesc(false);
                            }}
                            className="px-6 py-3 rounded-2xl bg-white/2 text-neutral-500 font-bold text-sm tracking-widest uppercase hover:text-white hover:bg-white/5 transition-all"
                          >
                            Discard
                          </button>
                          <button
                            onClick={handleDescSubmit}
                            className="px-10 py-3 bg-brand text-bg-dark-0 font-black text-sm tracking-widest uppercase rounded-2xl shadow-[0_10px_30px_rgba(0,186,199,0.2)] active:scale-95 transition-all flex items-center gap-3"
                          >
                            <Check size={18} strokeWidth={3} />
                            Commit Changes
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="static-desc"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsEditingDesc(true)}
                        className="group/desc-box relative text-neutral-400 leading-relaxed text-[17px] font-medium bg-white/2 p-8 rounded-[32px] border border-white/5 hover:border-brand/20 transition-all duration-500 cursor-pointer shadow-inner"
                      >
                        {task.description ? (
                          <div className="selection:bg-brand/20 whitespace-pre-wrap">
                            {task.description}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-12 gap-4 text-neutral-700 group-hover/desc-box:text-neutral-500 transition-colors">
                            <AlertCircle size={32} className="opacity-20" />
                            <span className="italic font-light tracking-wide">
                              No active documentation for this node. Click to
                              initialize.
                            </span>
                          </div>
                        )}

                        <div className="absolute top-4 right-4 opacity-0 group-hover/desc-box:opacity-100 transition-opacity">
                          <Edit2 size={16} className="text-brand/50" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Links / Attachments */}
              {task.links && task.links.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-px bg-brand/30" />
                    <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">
                      Resources
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {task.links.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-brand/30 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-brand/10 text-brand">
                            <ExternalLink size={16} />
                          </div>
                          <span className="text-sm font-bold text-white group-hover:text-brand transition-colors">
                            {link.title || "Untitled Link"}
                          </span>
                        </div>
                        <span className="text-[10px] text-neutral-500 font-mono truncate max-w-[120px]">
                          {new URL(link.url).hostname}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Comment Section (Standalone Card for emphasis) */}
        <div className="bg-dashboard-card-bg/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
          <CommentSection taskId={task.id} />
        </div>
      </div>

      {/* Sidebar (Right) */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-8"
      >
        {/* Metadata Card */}
        <div className="bg-[#0A0A0A]/60 backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 space-y-10 shadow-2xl relative overflow-hidden group/sidebar">
          <div className="absolute inset-px rounded-[31px] border border-white/2 pointer-events-none" />

          {/* Assignees */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
              <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.3em] flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                Assignees
              </label>
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    setIsAssigneeSelectorOpen(!isAssigneeSelectorOpen)
                  }
                  className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all border border-emerald-500/20 shadow-lg"
                >
                  <Plus size={16} strokeWidth={3} />
                </motion.button>

                {/* Assignee Selector Popover */}
                <AnimatePresence>
                  {isAssigneeSelectorOpen && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-20"
                        onClick={() => setIsAssigneeSelectorOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10, x: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10, x: 20 }}
                        className="absolute right-0 top-14 w-72 bg-[#0F0F0F] border border-white/10 rounded-[24px] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-30 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-brand/5 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none" />
                        <div className="relative z-10">
                          <div className="p-3 border-b border-white/5 mb-2">
                            <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest italic">
                              Members
                            </p>
                          </div>
                          <div className="max-h-72 overflow-y-auto py-1 space-y-1 scrollbar-hide">
                            {members.map((m: any) => {
                              const isAssigned = task.assignees.some(
                                (a) => a.id === m.user.id,
                              );
                              return (
                                <motion.button
                                  key={m.user.id}
                                  whileHover={{
                                    x: 4,
                                    backgroundColor: "rgba(255,255,255,0.03)",
                                  }}
                                  onClick={() => toggleAssignee(m.user.id)}
                                  className="w-full flex items-center justify-between p-3 rounded-2xl transition-all group/member"
                                >
                                  <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/5 overflow-hidden shadow-inner">
                                      {m.user.avatarUrl ? (
                                        <Image
                                          src={m.user.avatarUrl}
                                          alt={m.user.name}
                                          width={40}
                                          height={40}
                                          className="object-cover"
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs font-black text-white uppercase bg-linear-to-br from-neutral-800 to-neutral-950">
                                          {m.user.name.slice(0, 2)}
                                        </div>
                                      )}
                                    </div>
                                    <div className="text-left">
                                      <p className="text-sm font-bold text-white group-hover/member:text-brand transition-colors">
                                        {m.user.name}
                                      </p>
                                      <p className="text-[10px] text-neutral-600 font-medium truncate w-32">
                                        {m.user.email}
                                      </p>
                                    </div>
                                  </div>
                                  {isAssigned && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="w-6 h-6 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center"
                                    >
                                      <Check
                                        size={12}
                                        className="text-brand"
                                        strokeWidth={4}
                                      />
                                    </motion.div>
                                  )}
                                </motion.button>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {task.assignees && task.assignees.length > 0 ? (
                  task.assignees.map((assignee) => (
                    <motion.div
                      layout
                      key={assignee.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="group flex items-center justify-between p-4 bg-white/3 border border-white/5 rounded-[22px] hover:bg-white/6 hover:border-brand/20 transition-all relative overflow-hidden shadow-sm"
                    >
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-white/5 flex items-center justify-center text-sm font-black text-white overflow-hidden group-hover:scale-105 transition-transform shadow-xl">
                          {assignee.avatarUrl ? (
                            <Image
                              src={assignee.avatarUrl}
                              alt={assignee.name}
                              width={48}
                              height={48}
                              className="object-cover"
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
                          <p className="text-[15px] font-black text-white group-hover:text-brand transition-colors tracking-tight">
                            {assignee.name}
                          </p>
                          <p className="text-[10px] text-neutral-600 font-black uppercase tracking-widest mt-0.5">
                            Operative
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(239,68,68,0.1)",
                        }}
                        onClick={() => toggleAssignee(assignee.id)}
                        className="p-2 text-neutral-700 hover:text-red-500 rounded-xl transition-all"
                      >
                        <X size={16} strokeWidth={2.5} />
                      </motion.button>
                    </motion.div>
                  ))
                ) : (
                  <motion.button
                    layout
                    onClick={() => setIsAssigneeSelectorOpen(true)}
                    className="w-full p-10 text-center border-2 border-dashed border-white/5 rounded-[32px] text-neutral-700 hover:text-neutral-500 hover:bg-white/2 hover:border-brand/30 transition-all group/empty shadow-inner"
                  >
                    <User
                      size={28}
                      className="mx-auto mb-4 opacity-20 group-hover/empty:text-brand group-hover/empty:scale-110 group-hover/empty:opacity-100 transition-all"
                    />
                    <span className="text-[11px] font-black uppercase tracking-[0.3em]">
                      Assign Node Personnel
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="h-px bg-white/5 w-full" />

          {/* Status & Priority */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] flex items-center gap-3 px-1">
                <div className="w-1 h-1 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                Status
              </label>
              <div className="relative group/select">
                <select
                  value={task.status}
                  onChange={(e) =>
                    handleUpdate({ status: e.target.value as TaskStatus })
                  }
                  className="w-full appearance-none bg-[#0F0F0F] border border-white/5 rounded-2xl px-5 py-4 text-[10px] font-black text-white uppercase tracking-[0.2em] cursor-pointer hover:bg-neutral-900 hover:border-brand/40 transition-all outline-none shadow-xl"
                >
                  {Object.values(TaskStatus).map((status) => (
                    <option
                      key={status}
                      value={status}
                      className="bg-bg-dark-0 text-white py-2"
                    >
                      {status.replace("_", " ")}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-600 group-hover/select:text-brand transition-colors">
                  <ChevronLeft
                    size={14}
                    className="-rotate-90"
                    strokeWidth={3}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] flex items-center gap-3 px-1">
                <div className="w-1 h-1 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                Priority
              </label>
              <div className="relative group/select">
                <select
                  value={task.priority}
                  onChange={(e) =>
                    handleUpdate({ priority: e.target.value as TaskPriority })
                  }
                  className="w-full appearance-none bg-[#0F0F0F] border border-white/5 rounded-2xl px-5 py-4 text-[10px] font-black text-white uppercase tracking-[0.2em] cursor-pointer hover:bg-neutral-900 hover:border-brand/40 transition-all outline-none shadow-xl"
                >
                  {Object.values(TaskPriority).map((priority) => (
                    <option
                      key={priority}
                      value={priority}
                      className="bg-bg-dark-0 text-white py-2"
                    >
                      {priority}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-600 group-hover/select:text-brand transition-colors">
                  <ChevronLeft
                    size={14}
                    className="-rotate-90"
                    strokeWidth={3}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-white/5 w-full" />

          {/* Dates */}
          <div className="space-y-4">
            <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] flex items-center gap-3 px-1">
              <div className="w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              Schedule
            </label>
            <div className="p-6 bg-[#0F0F0F] border border-white/5 rounded-[24px] flex items-center justify-between group/date hover:border-brand/20 transition-all shadow-xl">
              <div>
                <p className="text-[9px] text-neutral-600 font-black uppercase tracking-[0.2em] mb-2">
                  Temporal Deadline
                </p>
                <input
                  type="date"
                  value={
                    task.deadline
                      ? new Date(task.deadline).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => handleUpdate({ deadline: e.target.value })}
                  className="bg-transparent text-[16px] text-brand font-black outline-none border-none cursor-pointer focus:text-white transition-colors"
                />
              </div>
              <div className="p-3 bg-brand/5 rounded-xl group-hover/date:bg-brand/10 transition-colors">
                <Calendar
                  size={22}
                  className="text-brand/50 group-hover/date:text-brand transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] flex items-center gap-3 px-1">
              <div className="w-1 h-1 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
              Category
            </label>
            <div className="relative group/tag">
              <Tag
                className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-700 group-focus-within/tag:text-purple-400 transition-colors"
                size={14}
              />
              <input
                type="text"
                placeholder="Set node tag..."
                value={task.tag || ""}
                onChange={handleTagChange}
                onBlur={(e) =>
                  e.target.value !== task.tag &&
                  handleUpdate({ tag: e.target.value })
                }
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  handleUpdate({ tag: (e.target as HTMLInputElement).value })
                }
                className="w-full pl-14 pr-6 py-5 bg-[#0F0F0F] border border-white/5 rounded-[22px] text-[11px] font-black text-purple-300 uppercase tracking-[0.2em] outline-none focus:border-purple-500/30 transition-all placeholder:text-neutral-800 shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Activity Logs Meta */}
        <motion.div
          whileHover={{ y: -5 }}
          className="p-6 bg-white/2 border border-white/5 rounded-[24px] space-y-3 shadow-xl group/meta"
        >
          <div className="flex items-center justify-between">
            <p className="text-[9px] text-neutral-600 font-bold uppercase tracking-[0.3em]">
              System Log
            </p>
            <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          </div>
          <p className="text-xs text-neutral-400 font-black tracking-tight text-center">
            Node last synced on {new Date(task.updatedAt).toLocaleDateString()}
          </p>
        </motion.div>

        {/* Tips/Info Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-brand/10 border border-brand/20 rounded-[32px] p-8 space-y-4 relative overflow-hidden group/tip hover:bg-brand/15 transition-all cursor-help shadow-2xl"
        >
          <div className="absolute -top-6 -right-6 p-8 text-brand/10 group-hover/tip:text-brand/20 group-hover/tip:scale-125 transition-all duration-700">
            <Zap size={80} strokeWidth={1.5} />
          </div>
          <h4 className="text-sm font-black text-brand uppercase tracking-[0.2em] flex items-center gap-3 italic">
            <Zap size={16} />
            Neuro-Sync Tip
          </h4>
          <p className="text-[13px] text-brand/70 leading-relaxed font-bold tracking-tight">
            Maintain high frequency documentation. Cognitive load studies show
            that detailing nodes immediately increases team velocity by 40%.
          </p>
        </motion.div>
      </motion.div>
    </div>
    // </div>
  );
}
