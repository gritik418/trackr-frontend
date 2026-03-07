"use client";

import CreateProjectModal from "@/components/project/CreateProjectModal";
import DeleteProjectModal from "@/components/project/DeleteProjectModal";
import ProjectCardSkeleton from "@/components/project/ProjectCardSkeleton";
import ProjectItem from "@/components/project/ProjectItem";
import ProjectStatusFilter from "@/components/project/ProjectStatusFilter";
import {
  useCreateProjectMutation,
  useGetProjectsQuery,
} from "@/features/project/project.api";
import { ProjectStatusWithAll } from "@/features/project/project.interface";
import { selectWorkspace } from "@/features/workspace/workspace.slice";
import { CreateProjectFormData } from "@/lib/schemas/project/create-project.schema";
import { Project } from "@/types/project/project.interface";
import { WorkspaceRole } from "@/types/workspace/workspace.interface";
import { Plus, Search } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function ProjectsListPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const workspace = useSelector(selectWorkspace);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<
    (typeof ProjectStatusWithAll)[keyof typeof ProjectStatusWithAll]
  >(ProjectStatusWithAll.ALL);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data, isLoading } = useGetProjectsQuery(
    {
      workspaceId: workspace?.id || "",
      search: searchQuery,
      status: statusFilter,
    },
    {
      skip: !workspace?.id,
      refetchOnMountOrArgChange: true,
    },
  );

  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();

  const handleCreateProject = async (formData: CreateProjectFormData) => {
    if (!workspace?.id) return;

    try {
      await createProject({
        workspaceId: workspace.id,
        body: formData,
      }).unwrap();
      toast.success("Project created successfully!");

      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to create project");
    }
  };

  const isWorkspaceAdminOrOwner =
    workspace?.role === WorkspaceRole.OWNER ||
    workspace?.role === WorkspaceRole.ADMIN;

  const projects = data?.projects || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10 relative">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[0%] w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[0%] left-[-10%] w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Projects
          </h2>
          <p className="text-neutral-400 mt-1 text-lg font-light">
            Manage and track your team's initiatives.
          </p>
        </div>
        {isWorkspaceAdminOrOwner ? (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex cursor-pointer items-center gap-2 px-5 py-2.5 bg-brand text-bg-dark-0 font-bold rounded-xl hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/20 transition-all active:scale-95 group"
          >
            <Plus size={18} strokeWidth={2.5} />
            <span>New Project</span>
          </button>
        ) : null}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 relative z-20">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-3.5 text-neutral-500"
            size={18}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-9 pr-4 py-3 bg-dashboard-card-bg/30 border border-dashboard-border rounded-xl text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand/50 focus:bg-dashboard-card-bg/50 transition-all"
          />
        </div>
        <ProjectStatusFilter value={statusFilter} onChange={setStatusFilter} />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <ProjectItem key={project.id} project={project} slug={slug} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 px-6 rounded-4xl border border-dashed border-white/10 bg-white/2 backdrop-blur-sm">
            <div className="w-16 h-16 rounded-3xl bg-brand/5 flex items-center justify-center mb-6">
              <Plus size={32} className="text-brand" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No projects yet
            </h3>
            {isWorkspaceAdminOrOwner ? (
              <p className="text-neutral-400 text-center max-w-xs mb-8">
                Create your first project to start tracking tasks and
                collaborating with your team.
              </p>
            ) : (
              <p className="text-neutral-400 text-center mb-8">
                You don&apos;t have access to any projects yet.
                <br /> Please contact your admin to be added to a project.
              </p>
            )}
            {isWorkspaceAdminOrOwner ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 cursor-pointer py-3 bg-brand text-bg-dark-0 font-bold rounded-2xl hover:bg-brand-hover shadow-xl shadow-brand/20 transition-all active:scale-95"
              >
                Create Project
              </button>
            ) : null}
          </div>
        )}

        {projects.length > 0 && isWorkspaceAdminOrOwner && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-3xl cursor-pointer border border-dashed border-white/10 bg-transparent hover:bg-white/5 hover:border-brand/30 transition-all duration-300 flex flex-col items-center justify-center gap-3 min-h-[280px] group text-neutral-500 hover:text-brand"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-brand/10 flex items-center justify-center transition-colors">
              <Plus size={24} />
            </div>
            <span className="font-medium">Create New Project</span>
          </button>
        )}
      </div>

      <CreateProjectModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProject}
        isSubmitting={isCreating}
      />

      {selectedProject && (
        <DeleteProjectModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedProject(null);
          }}
          workspaceId={workspace?.id || ""}
          projectId={selectedProject.id}
          projectName={selectedProject.name}
          slug={slug}
        />
      )}
    </div>
  );
}
