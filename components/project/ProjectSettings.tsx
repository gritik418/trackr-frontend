"use client";

import AddProjectMemberModal from "@/components/project/AddProjectMemberModal";
import { useUpdateProjectMutation } from "@/features/project/project.api";
import { Project } from "@/types/project/project.interface";
import {
  AlertTriangle,
  Archive,
  ChevronDown,
  Eye,
  Globe,
  Layout,
  Lock,
  Mail,
  Save,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ProjectSettingsProps {
  project: Project;
}

export default function ProjectSettings({ project }: ProjectSettingsProps) {
  const projectId = project.id;

  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const [name, setName] = useState(project?.name || "");
  const [description, setDescription] = useState(project?.description || "");
  const [status, setStatus] = useState(project?.status || "ACTIVE");
  const [nature, setNature] = useState(project?.nature || "PRIVATE");
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

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

  const [members, setMembers] = useState([
    {
      id: "u1",
      name: "Ritik Gupta",
      email: "ritik@trackr.com",
      role: "OWNER",
      avatar: null,
    },
    {
      id: "u2",
      name: "Sarah Connor",
      email: "sarah@trackr.com",
      role: "ADMIN",
      avatar: null,
    },
    {
      id: "u3",
      name: "Mike Johnson",
      email: "mike@trackr.com",
      role: "MEMBER",
      avatar: null,
    },
  ]);

  const handleAddMember = (member: any) => {
    // Check if member already exists (should be handled by modal filter, but double check)
    if (members.find((m) => m.id === member.user.id)) return;

    setMembers([
      ...members,
      {
        id: member.user.id,
        name: member.user.name,
        email: member.user.email,
        role: "MEMBER", // Default role
        avatar: member.user.avatarUrl,
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <AddProjectMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        workspaceId={project.workspaceId}
        currentMemberIds={members.map((m) => m.id)}
        onAddMember={handleAddMember}
      />
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

        <div className="bg-dashboard-card-bg/40 border border-white/5 rounded-[32px] p-8 space-y-8 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">
                Project Name
              </label>
              <input
                type="text"
                value={name}
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
                  onChange={(e) =>
                    setStatus(e.target.value as Project["status"])
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white appearance-none focus:outline-none focus:border-brand/40 cursor-pointer font-medium"
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
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the goals and scope of this project..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-brand/40 transition-all min-h-[120px] resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-4 p-1.5 bg-black/20 rounded-2xl w-fit border border-white/5">
              <button
                onClick={() => setNature("PRIVATE")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${nature === "PRIVATE" ? "bg-white/10 text-white shadow-lg" : "text-neutral-500 hover:text-neutral-300"}`}
              >
                <Lock size={14} />
                Private
              </button>
              <button
                onClick={() => setNature("PUBLIC")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${nature === "PUBLIC" ? "bg-white/10 text-white shadow-lg" : "text-neutral-500 hover:text-neutral-300"}`}
              >
                <Globe size={14} />
                Public
              </button>
            </div>
            <button
              onClick={handleSave}
              disabled={isUpdating}
              className="flex items-center gap-2 px-8 py-4 bg-brand text-bg-dark-0 font-black rounded-2xl hover:bg-brand-hover transition-all active:scale-95 shadow-xl shadow-brand/10 disabled:opacity-50"
            >
              <Save size={18} strokeWidth={3} />
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </section>

      {/* Team Management */}
      <section className="space-y-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Users size={20} />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Project Team
            </h3>
          </div>
          {nature === "PRIVATE" && (
            <button
              onClick={() => setIsAddMemberModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl border border-white/5 transition-all"
            >
              <UserPlus size={16} />
              Add Member
            </button>
          )}
        </div>

        {nature === "PRIVATE" ? (
          <div className="bg-dashboard-card-bg/40 border border-white/5 rounded-[32px] overflow-hidden backdrop-blur-xl shrink-0">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/5">
                  <th className="px-8 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                    Member
                  </th>
                  <th className="px-8 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                    Role
                  </th>
                  <th className="px-8 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {members.map((member) => (
                  <tr
                    key={member.id}
                    className="group hover:bg-white/2 transition-all"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-neutral-800 border border-white/5 flex items-center justify-center text-xs font-bold text-white">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-bold text-white tracking-tight group-hover:text-brand transition-colors">
                            {member.name}
                          </p>
                          <div className="flex items-center gap-1.5 text-neutral-500 text-[10px] font-medium">
                            <Mail size={10} />
                            {member.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                          member.role === "OWNER"
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                            : member.role === "ADMIN"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                              : "bg-white/5 text-neutral-400 border-white/10"
                        }`}
                      >
                        {member.role}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 text-neutral-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white/2 border border-white/5 border-dashed rounded-[32px] p-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-4 rounded-3xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Eye size={32} />
            </div>
            <div className="max-w-xs space-y-1">
              <h4 className="font-bold text-white">Anyone can access</h4>
              <p className="text-neutral-500 text-xs">
                Since this is a public project, anyone in this workspace can
                view and contribute.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Danger Zone */}
      <section className="space-y-6 pt-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500">
            <AlertTriangle size={20} />
          </div>
          <h3 className="text-xl font-bold text-red-500 tracking-tight">
            Danger Zone
          </h3>
        </div>

        <div className="bg-red-500/5 border border-red-500/10 rounded-[32px] p-8 space-y-6 backdrop-blur-md">
          <div className="flex items-center justify-between p-6 bg-white/2 rounded-2xl border border-white/5 hover:bg-white/5 transition-all group">
            <div>
              <h4 className="font-bold text-white text-lg">
                Archive this project
              </h4>
              <p className="text-neutral-500 text-sm">
                Members will no longer be able to edit or view tasks.
              </p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl transition-all border border-white/5 active:scale-95">
              <Archive size={18} />
              Archive
            </button>
          </div>

          <div className="flex items-center justify-between p-6 bg-red-500/10 rounded-2xl border border-red-500/20 hover:bg-red-500/20 transition-all group">
            <div>
              <h4 className="font-bold text-red-400 text-lg">
                Delete this project
              </h4>
              <p className="text-red-500/50 text-sm">
                Once deleted, all data including tasks and files will be
                permanently lost.
              </p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-xl shadow-red-500/20 active:scale-95">
              <Trash2 size={18} />
              Delete permanently
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
