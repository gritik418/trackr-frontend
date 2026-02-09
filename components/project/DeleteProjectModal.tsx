"use client";

import { AlertTriangle, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useDeleteProjectMutation } from "@/features/project/project.api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface DeleteProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  workspaceId: string;
  projectId: string;
  projectName: string;
  slug: string;
}

export default function DeleteProjectModal({
  isOpen,
  onClose,
  workspaceId,
  projectId,
  projectName,
  slug,
}: DeleteProjectModalProps) {
  const [confirmName, setConfirmName] = useState("");
  const [deleteProject, { isLoading }] = useDeleteProjectMutation();
  const router = useRouter();

  if (!isOpen) return null;

  const handleDelete = async () => {
    if (confirmName !== projectName) {
      toast.error("Project name does not match");
      return;
    }

    try {
      await deleteProject({ workspaceId, projectId }).unwrap();
      toast.success("Project deleted successfully");
      router.push(`/dashboard/${slug}/projects`);
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete project");
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-[#0D0D0E] border border-red-500/20 rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        {/* Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-red-500/10 blur-[80px] pointer-events-none" />

        <div className="p-10 space-y-8 relative z-10">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 rounded-[32px] bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shadow-2xl shadow-red-500/10">
              <AlertTriangle size={40} strokeWidth={1.5} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white tracking-tight">
                Delete Project?
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed max-w-xs mx-auto">
                This action is permanent. All tasks, files, and activity in{" "}
                <span className="text-white font-bold">{projectName}</span> will
                be lost forever.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] ml-1">
                Type the project name to confirm
              </label>
              <input
                type="text"
                placeholder={projectName}
                value={confirmName}
                onChange={(e) => setConfirmName(e.target.value)}
                className="w-full bg-red-500/5 border border-red-500/10 rounded-2xl px-6 py-4 text-white placeholder:text-neutral-700 focus:outline-none focus:border-red-500/40 focus:bg-red-500/10 transition-all font-medium"
                autoFocus
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl transition-all border border-white/5 active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading || confirmName !== projectName}
              className="flex-1 px-8 py-4 bg-red-500 hover:bg-red-600 disabled:bg-red-500/20 disabled:text-red-500/50 disabled:cursor-not-allowed text-white font-black rounded-2xl transition-all shadow-xl shadow-red-500/20 active:scale-95 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Trash2 size={18} strokeWidth={2.5} />
                  Delete Project
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
