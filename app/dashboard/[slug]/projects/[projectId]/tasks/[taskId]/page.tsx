"use client";

import CommentSection from "@/components/project/CommentSection";
import { TaskDescription } from "@/components/task/TaskDescription";
import { TaskHeader, TaskTitleSection } from "@/components/task/TaskHeader";
import { TaskResources } from "@/components/task/TaskResources";
import { TaskSidebar } from "@/components/task/TaskSidebar";
import { useGetProjectMembersQuery } from "@/features/project/project.api";
import { selectProject } from "@/features/project/project.slice";
import {
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
} from "@/features/task/task.api";
import { TaskStatus } from "@/features/task/task.interface";
import { selectWorkspace } from "@/features/workspace/workspace.slice";
import { cn } from "@/lib/utils";
import { ProjectRole } from "@/types/project/project.interface";
import { WorkspaceRole } from "@/types/workspace/workspace.interface";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Flag,
  Pause,
  X,
  Zap,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.taskId as string;
  const slug = params.slug as string;
  const projectId = params.projectId as string;
  const project = useSelector(selectProject);
  const workspace = useSelector(selectWorkspace);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
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

  const [updateTask] = useUpdateTaskMutation();
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
      setTag(task.tag || "");
    }
  }, [task]);

  const handleUpdate = async (body: any) => {
    const loadingToast = toast.loading("Syncing node...");
    try {
      const processedBody = { ...body };
      if (processedBody.deadline === "") processedBody.deadline = null;
      if (processedBody.tag === "") processedBody.tag = null;
      if (processedBody.description === "") processedBody.description = null;

      await updateTask({
        taskId,
        projectId,
        body: processedBody,
      }).unwrap();
      toast.success("Task updated", { id: loadingToast });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update task", {
        id: loadingToast,
      });
    }
  };

  const isProjectAdminOrOwner =
    project?.role === ProjectRole.OWNER || project?.role === ProjectRole.ADMIN;

  const isWorkspaceAdminOrOwner =
    workspace?.role === WorkspaceRole.OWNER ||
    workspace?.role === WorkspaceRole.ADMIN ||
    workspace?.organizationRole === WorkspaceRole.ADMIN ||
    workspace?.organizationRole === WorkspaceRole.OWNER;

  const canEdit = isProjectAdminOrOwner || isWorkspaceAdminOrOwner;

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
    setTag(e.target.value);
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

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden selection:bg-brand/30">
      {/* Immersive Background Layers */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 blur-[150px] rounded-full animate-pulse [animation-duration:5s]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150 brightness-150" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-10">
        <TaskHeader
          slug={slug}
          projectId={projectId}
          copyTaskLink={copyTaskLink}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-10">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="group/main bg-[#0A0A0A]/80 backdrop-blur-3xl border border-white/10 rounded-[32px] p-10 space-y-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              <div className="absolute inset-px rounded-[31px] border border-white/3 pointer-events-none" />
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full pointer-events-none -mr-60 -mt-20 group-hover/main:bg-brand/10 transition-colors duration-1000" />

              <div className="relative z-10 space-y-12">
                <div className="flex flex-wrap items-center gap-4">
                  <div
                    className={cn(
                      "px-4 py-1.5 rounded-2xl text-[11px] font-black border uppercase tracking-[0.2em] flex items-center gap-2.5 backdrop-blur-md shadow-lg",
                      priorityColors[
                        task.priority as keyof typeof priorityColors
                      ],
                    )}
                  >
                    <Flag size={14} strokeWidth={3} />
                    {task.priority} Priority
                  </div>
                  <div className="px-4 py-1.5 rounded-2xl bg-white/5 border border-white/10 text-[11px] font-black text-neutral-400 uppercase tracking-[0.2em] flex items-center gap-2.5 backdrop-blur-md shadow-lg">
                    {statusIcons[task.status as TaskStatus]}
                    {task.status.replace("_", " ")}
                  </div>
                </div>

                <TaskTitleSection
                  isEditingTitle={isEditingTitle}
                  title={title}
                  setTitle={setTitle}
                  handleTitleSubmit={handleTitleSubmit}
                  setIsEditingTitle={setIsEditingTitle}
                  displayTitle={task.title}
                  canEdit={canEdit}
                />
              </div>

              <TaskDescription
                description={description}
                setDescription={setDescription}
                isEditingDesc={isEditingDesc}
                setIsEditingDesc={setIsEditingDesc}
                handleDescSubmit={handleDescSubmit}
                displayDescription={task.description}
                canEdit={canEdit}
              />

              <TaskResources links={task.links || []} />
            </motion.div>

            <div className="bg-dashboard-card-bg/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
              <CommentSection
                isProjectAdminOrOwner={isProjectAdminOrOwner}
                isWorkspaceAdminOrOwner={isWorkspaceAdminOrOwner}
                taskId={task.id}
              />
            </div>
          </div>

          {/* Sidebar Column */}
          <TaskSidebar
            task={task}
            members={members}
            isAssigneeSelectorOpen={isAssigneeSelectorOpen}
            setIsAssigneeSelectorOpen={setIsAssigneeSelectorOpen}
            toggleAssignee={toggleAssignee}
            handleUpdate={handleUpdate}
            priorityColors={priorityColors}
            statusIcons={statusIcons}
            tag={tag}
            handleTagChange={handleTagChange}
            canEdit={canEdit}
          />
        </div>
      </div>
    </div>
  );
}

// UI configuration moved outside component
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
  [TaskStatus.IN_REVIEW]: <AlertCircle size={16} className="text-amber-400" />,
  [TaskStatus.DONE]: <CheckCircle2 size={16} className="text-emerald-400" />,
  [TaskStatus.BLOCKED]: <X size={16} className="text-red-500" />,
  [TaskStatus.CANCELED]: <X size={16} className="text-neutral-500" />,
  [TaskStatus.ON_HOLD]: <Pause size={16} className="text-blue-400" />,
};
