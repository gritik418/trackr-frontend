"use client";

import CreateProjectModal from "@/components/project/CreateProjectModal";
import {
  useCreateProjectMutation,
  useGetProjectsQuery,
} from "@/features/project/project.api";
import { selectWorkspace } from "@/features/workspace/workspace.slice";
import { CreateProjectFormData } from "@/lib/schemas/project/create-project.schema";
import { Clock, Loader2, Lock, MoreVertical, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdPublic } from "react-icons/md";
import { useSelector } from "react-redux";

export default function ProjectsListPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const workspace = useSelector(selectWorkspace);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useGetProjectsQuery(workspace?.id || "", {
    skip: !workspace?.id,
  });

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
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex cursor-pointer items-center gap-2 px-5 py-2.5 bg-brand text-bg-dark-0 font-bold rounded-xl hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/20 transition-all active:scale-95 group"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span>New Project</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 relative z-10">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-2.5 text-neutral-500"
            size={16}
          />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-9 pr-4 py-2 bg-dashboard-card-bg/30 border border-dashboard-border rounded-xl text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand/50 focus:bg-dashboard-card-bg/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <select className="px-3 py-2 bg-dashboard-card-bg/30 border border-dashboard-border rounded-xl text-sm text-neutral-300 focus:outline-none focus:border-brand/50">
            <option>All Statuses</option>
            <option>On Track</option>
            <option>At Risk</option>
            <option>Completed</option>
          </select>
          <select className="px-3 py-2 bg-dashboard-card-bg/30 border border-dashboard-border rounded-xl text-sm text-neutral-300 focus:outline-none focus:border-brand/50">
            <option>Sort by Date</option>
            <option>Sort by Name</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {isLoading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-10 h-10 text-brand animate-spin" />
            <p className="text-neutral-500 font-medium">Loading projects...</p>
          </div>
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <Link
              key={project.id}
              href={`/dashboard/${slug}/projects/${project.id}`}
              className="group p-6 rounded-3xl border border-dashboard-border bg-dashboard-card-bg/40 backdrop-blur-sm hover:bg-dashboard-card-bg/60 hover:border-brand/20 hover:shadow-2xl hover:shadow-brand/5 transition-all duration-300 flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <span
                  className={`px-2.5 py-1 flex items-center gap-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    project.nature === "PRIVATE"
                      ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
                      : "text-blue-400 bg-blue-400/10 border-blue-400/20"
                  }`}
                >
                  {project.nature === "PRIVATE" ? (
                    <Lock size={10} />
                  ) : (
                    <MdPublic size={12} />
                  )}
                  {project.nature}
                </span>
                <button className="text-neutral-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                  <MoreVertical size={16} />
                </button>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-neutral-400 line-clamp-2 mb-6 flex-1">
                {project.description || "No description provided."}
              </p>

              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400 font-medium">
                      Progress
                    </span>
                    <span className="text-white font-bold">0%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand rounded-full transition-all duration-500 ease-out group-hover:bg-brand-hover"
                      style={{ width: `0%` }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  {/* Members - Mocked for now as backend doesn't return them yet in project list */}
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full border border-dashboard-card-bg bg-white/10 flex items-center justify-center text-[9px] font-bold text-neutral-400">
                      RG
                    </div>
                  </div>

                  {/* Due Date - Mocked */}
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors">
                    <Clock size={12} />
                    No due date
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 px-6 rounded-4xl border border-dashed border-white/10 bg-white/2 backdrop-blur-sm">
            <div className="w-16 h-16 rounded-3xl bg-brand/5 flex items-center justify-center mb-6">
              <Plus size={32} className="text-brand" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No projects yet
            </h3>
            <p className="text-neutral-400 text-center max-w-xs mb-8">
              Create your first project to start tracking tasks and
              collaborating with your team.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 cursor-pointer py-3 bg-brand text-bg-dark-0 font-bold rounded-2xl hover:bg-brand-hover shadow-xl shadow-brand/20 transition-all active:scale-95"
            >
              Create Project
            </button>
          </div>
        )}

        {projects.length > 0 && (
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
    </div>
  );
}
