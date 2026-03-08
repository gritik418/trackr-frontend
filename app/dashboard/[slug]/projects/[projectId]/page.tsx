"use client";

import TaskBoard from "@/components/project/board/TaskBoard";
import ProjectMembers from "@/components/project/ProjectMembers";
import ProjectOverview from "@/components/project/ProjectOverview";
import ProjectSettings from "@/components/project/ProjectSettings";
import TaskListView from "@/components/project/list-view/TaskListView";
import { selectProject } from "@/features/project/project.slice";
import { Task, TaskStatus } from "@/features/task/task.interface";
import { selectWorkspace } from "@/features/workspace/workspace.slice";
import { Clipboard, Layout, List, Plus, Settings, Users } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useGetProjectMembersQuery } from "@/features/project/project.api";
import { ProjectMember } from "@/features/project/project.interface";
import { getInitials } from "@/lib/utils";
import Image from "next/image";
import { ProjectRole } from "@/types/project/project.interface";
import { WorkspaceRole } from "@/types/workspace/workspace.interface";

export default function ProjectDetailsPage() {
  const workspace = useSelector(selectWorkspace);
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();
  const projectId = params.projectId as string;
  const project = useSelector(selectProject);

  const [projectMembers, setProjectMembers] = useState<ProjectMember[]>([]);
  const { data } = useGetProjectMembersQuery(
    { projectId, workspaceId: workspace?.id || "" },
    {
      skip: !workspace?.id || !projectId,
      refetchOnMountOrArgChange: true,
    },
  );

  const [activeTab, setActiveTab] = useState("board");

  const isProjectAdminOrOwner =
    project?.role === ProjectRole.OWNER || project?.role === ProjectRole.ADMIN;

  const isWorkspaceAdminOrOwner =
    workspace?.role === WorkspaceRole.OWNER ||
    workspace?.role === WorkspaceRole.ADMIN ||
    workspace?.organizationRole === WorkspaceRole.ADMIN ||
    workspace?.organizationRole === WorkspaceRole.OWNER;

  const tabs = [
    { id: "overview", label: "Overview", icon: Layout },
    { id: "board", label: "Board", icon: Layout },
    { id: "list", label: "List", icon: List },
    { id: "members", label: "Members", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const onTaskClick = (task: Task) => {
    router.push(`/dashboard/${slug}/projects/${projectId}/tasks/${task.id}`);
  };

  const onAddTask = (status: TaskStatus) => {
    router.push(
      `/dashboard/${slug}/projects/${projectId}/tasks/new?status=${status}`,
    );
  };

  const handleCopyProjectLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Project link copied to clipboard");
  };

  const handleAddTask = (status: TaskStatus) => {
    router.push(
      `/dashboard/${slug}/projects/${projectId}/tasks/new?status=${status}`,
    );
  };

  useEffect(() => {
    if (data?.success && data.members) {
      setProjectMembers(data.members);
    }
  }, [data]);

  return (
    <div className="flex flex-col scrollbar-hidden h-[calc(100vh-2rem)] animate-in fade-in duration-700">
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
            {projectMembers && projectMembers.length > 0 ? (
              <div className="flex -space-x-2 mr-2">
                {projectMembers.slice(0, 3).map((member, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-lg overflow-hidden bg-neutral-600 flex items-center justify-center font-bold text-white hover:z-10 transition-transform hover:scale-110 cursor-pointer"
                  >
                    {member.user.avatarUrl ? (
                      <Image
                        src={member.user.avatarUrl}
                        alt={member.user.name}
                        width={24}
                        height={24}
                        className="object-cover h-full w-full"
                      />
                    ) : (
                      <span>{getInitials(member.user.name)}</span>
                    )}
                  </div>
                ))}
                {projectMembers.length > 3 && (
                  <div className="w-8 text-[9px] h-8 rounded-full border-2 border-bg-dark-0 bg-neutral-800 flex items-center justify-center font-bold text-white hover:z-10 transition-transform hover:scale-110 cursor-pointer">
                    +{projectMembers.length - 3}
                  </div>
                )}
              </div>
            ) : null}
            <button
              onClick={handleCopyProjectLink}
              className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/5 rounded-xl text-sm font-bold transition-all active:scale-95"
            >
              <Clipboard size={14} />
              Copy Project Link
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
                className={`flex cursor-pointer items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all relative ${
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
          {isProjectAdminOrOwner || isWorkspaceAdminOrOwner ? (
            <div className="flex items-center gap-3 mb-2 sm:mb-0">
              <button
                onClick={() => handleAddTask(TaskStatus.TODO)}
                className="ml-2 cursor-pointer px-4 py-2 bg-brand text-bg-dark-0 text-sm font-black rounded-xl hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/20 transition-all flex items-center gap-2 active:scale-95"
              >
                <Plus size={18} strokeWidth={3} />
                New Task
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="-mx-4 sm:mx-0 flex-1 overflow-x-auto scrollbar-hidden">
        <>
          {activeTab === "overview" && (
            <ProjectOverview
              projectId={projectId}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === "board" && (
            <TaskBoard
              isProjectAdminOrOwner={isProjectAdminOrOwner}
              isWorkspaceAdminOrOwner={isWorkspaceAdminOrOwner}
              onTaskClick={onTaskClick}
              projectId={projectId}
              onAddTask={onAddTask}
            />
          )}

          {activeTab === "list" && (
            <TaskListView onTaskClick={onTaskClick} projectId={projectId} />
          )}

          {activeTab === "members" && project && (
            <ProjectMembers project={project} setActiveTab={setActiveTab} />
          )}
        </>

        {activeTab === "settings" && project && (
          <ProjectSettings project={project} slug={slug} />
        )}
      </div>
    </div>
  );
}
