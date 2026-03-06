"use client";

import { useUpdateProjectMutation } from "@/features/project/project.api";
import DeleteProjectModal from "@/components/project/DeleteProjectModal";
import { Project, ProjectRole } from "@/types/project/project.interface";
import {
  AlertTriangle,
  Archive,
  ChevronDown,
  Globe,
  Layout,
  Lock,
  Save,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectWorkspace } from "@/features/workspace/workspace.slice";
import { WorkspaceRole } from "@/types/workspace/workspace.interface";

interface ProjectSettingsProps {
  project: Project;
  slug: string;
}

export default function ProjectSettings({
  project,
  slug,
}: ProjectSettingsProps) {
  const projectId = project.id;
  const workspace = useSelector(selectWorkspace);
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const [name, setName] = useState(project?.name || "");
  const [description, setDescription] = useState(project?.description || "");
  const [status, setStatus] = useState(project?.status || "ACTIVE");
  const [nature, setNature] = useState(project?.nature || "PRIVATE");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isProjectAdminOrOwner =
    project.role === ProjectRole.OWNER || project.role === ProjectRole.ADMIN;

  const isWorkspaceAdminOrOwner =
    workspace?.role === WorkspaceRole.OWNER ||
    workspace?.role === WorkspaceRole.ADMIN;

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description || "");
      setStatus(project.status);
      setNature(project.nature);
    }
  }, [project]);

  const handleSave = async () => {
    try {
      await updateProject({
        workspaceId: project.workspaceId,
        projectId,
        body: {
          name,
          description,
          status: status as Project["status"],
          nature: nature as Project["nature"],
        },
      }).unwrap();
      toast.success("Project updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update project");
    }
  };

  return (
    <div className="mx-auto space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* General Settings */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-brand/10 border border-brand/20 text-brand">
            <Layout size={20} />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            General Settings
          </h3>
        </div>

        <div className="mt-6 bg-dashboard-card-bg/40 border border-white/5 rounded-[32px] p-8 space-y-8 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">
                Project Name
              </label>
              <input
                type="text"
                value={name}
                readOnly={!isProjectAdminOrOwner && !isWorkspaceAdminOrOwner}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-brand/40 transition-all font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">
                Project Status
              </label>
              <div className="relative group">
                <select
                  value={status}
                  disabled={!isProjectAdminOrOwner && !isWorkspaceAdminOrOwner}
                  onChange={(e) =>
                    setStatus(e.target.value as Project["status"])
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white appearance-none focus:outline-none focus:border-brand/40 cursor-pointer font-medium disabled:cursor-not-allowed"
                >
                  <option value="ACTIVE" className="bg-neutral-900">
                    Active
                  </option>
                  <option value="ON_HOLD" className="bg-neutral-900">
                    On Hold
                  </option>
                  <option value="COMPLETED" className="bg-neutral-900">
                    Completed
                  </option>
                  <option value="ARCHIVED" className="bg-neutral-900">
                    Archived
                  </option>
                </select>
                <ChevronDown
                  size={18}
                  className="absolute right-5 top-4.5 text-neutral-500 pointer-events-none group-focus-within:rotate-180 transition-transform"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">
              Description
            </label>
            <textarea
              value={description}
              readOnly={!isProjectAdminOrOwner && !isWorkspaceAdminOrOwner}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the goals and scope of this project..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-brand/40 transition-all min-h-[120px] resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-4 p-1.5 bg-black/20 rounded-2xl w-fit border border-white/5">
              <button
                onClick={() =>
                  (isProjectAdminOrOwner || isWorkspaceAdminOrOwner) &&
                  setNature("PRIVATE")
                }
                disabled={!isProjectAdminOrOwner && !isWorkspaceAdminOrOwner}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  nature === "PRIVATE"
                    ? "bg-white/10 text-white shadow-lg"
                    : "text-neutral-500 hover:text-neutral-300"
                } ${
                  isProjectAdminOrOwner || isWorkspaceAdminOrOwner
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
              >
                <Lock size={14} />
                Private
              </button>
              <button
                onClick={() =>
                  (isProjectAdminOrOwner || isWorkspaceAdminOrOwner) &&
                  setNature("PUBLIC")
                }
                disabled={!isProjectAdminOrOwner && !isWorkspaceAdminOrOwner}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  nature === "PUBLIC"
                    ? "bg-white/10 text-white shadow-lg"
                    : "text-neutral-500 hover:text-neutral-300"
                } ${
                  isProjectAdminOrOwner || isWorkspaceAdminOrOwner
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
              >
                <Globe size={14} />
                Public
              </button>
            </div>
            {(isProjectAdminOrOwner || isWorkspaceAdminOrOwner) && (
              <button
                onClick={handleSave}
                disabled={isUpdating}
                className="flex cursor-pointer items-center gap-2 px-8 py-4 bg-brand text-bg-dark-0 font-black rounded-2xl hover:bg-brand-hover transition-all active:scale-95 shadow-xl shadow-brand/10 disabled:opacity-50"
              >
                <Save size={18} strokeWidth={3} />
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      {isWorkspaceAdminOrOwner || isProjectAdminOrOwner ? (
        <section className="space-y-6 pt-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500">
              <AlertTriangle size={20} />
            </div>
            <h3 className="text-xl font-bold text-red-500 tracking-tight">
              Danger Zone
            </h3>
          </div>

          <div className="flex mt-6 items-center justify-between p-6 bg-red-500/10 rounded-2xl border border-red-500/20 hover:bg-red-500/20 transition-all group">
            <div>
              <h4 className="font-bold text-red-400 text-lg">
                Delete this project
              </h4>
              <p className="text-red-500/50 text-sm">
                Once deleted, all data including tasks and files will be
                permanently lost.
              </p>
            </div>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-xl shadow-red-500/20 active:scale-95"
            >
              <Trash2 size={18} />
              Delete permanently
            </button>
          </div>
        </section>
      ) : null}

      <DeleteProjectModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        workspaceId={project.workspaceId}
        projectId={projectId}
        projectName={project.name}
        slug={slug}
      />
    </div>
  );
}
