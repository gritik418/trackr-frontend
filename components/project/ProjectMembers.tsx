"use client";

import AddProjectMemberModal from "@/components/project/AddProjectMemberModal";
import {
  useGetProjectMembersQuery,
  useRemoveMemberFromProjectMutation,
} from "@/features/project/project.api";
import { Project } from "@/types/project/project.interface";
import { Eye, Mail, Trash2, UserPlus, Users, Loader2 } from "lucide-react";
import NextImage from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

interface ProjectMembersProps {
  project: Project;
}

export default function ProjectMembers({ project }: ProjectMembersProps) {
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

  const { data: membersData, isLoading } = useGetProjectMembersQuery({
    workspaceId: project.workspaceId,
    projectId: project.id,
  });

  const [removeMember, { isLoading: isRemoving }] =
    useRemoveMemberFromProjectMutation();

  const handleRemoveMember = async (userId: string) => {
    try {
      await removeMember({
        workspaceId: project.workspaceId,
        projectId: project.id,
        userId,
      }).unwrap();
      toast.success("Member removed from project");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to remove member");
    }
  };

  const members =
    membersData?.members.map((m: any) => ({
      id: m.user.id,
      name: m.user.name,
      email: m.user.email,
      role: m.role,
      avatar: m.user.avatarUrl,
    })) || [];

  const nature = project.nature;

  return (
    <div className="mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <AddProjectMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        workspaceId={project.workspaceId}
        projectId={project.id}
        currentMemberIds={members.map((m) => m.id)}
      />

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <Users size={20} />
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Project Team
          </h3>
        </div>
        {nature === "PRIVATE" && (
          <button
            onClick={() => setIsAddMemberModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-brand text-bg-dark-0 font-black rounded-2xl hover:bg-brand-hover transition-all active:scale-95 shadow-xl shadow-brand/10"
          >
            <UserPlus size={18} strokeWidth={3} />
            Add Member
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-neutral-500">
          <Loader2 className="w-10 h-10 animate-spin text-brand mb-4" />
          <p>Loading project team...</p>
        </div>
      ) : nature === "PRIVATE" ? (
        <div className="bg-dashboard-card-bg/40 border border-white/5 rounded-[32px] overflow-hidden backdrop-blur-xl shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="px-8 py-5 text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                  Member
                </th>
                <th className="px-8 py-5 text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                  Role
                </th>
                <th className="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {members.map((member) => (
                <tr
                  key={member.id}
                  className="group hover:bg-white/2 transition-all"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      {member.avatar ? (
                        <NextImage
                          src={member.avatar}
                          alt={member.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-2xl border border-white/5 object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-neutral-800 border border-white/5 flex items-center justify-center text-sm font-bold text-white group-hover:scale-105 transition-transform">
                          {member.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-white tracking-tight group-hover:text-brand transition-colors text-lg">
                          {member.name}
                        </p>
                        <div className="flex items-center gap-1.5 text-neutral-500 text-xs font-medium">
                          <Mail size={12} />
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
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
                  <td className="px-8 py-6 text-right">
                    {member.role !== "OWNER" && (
                      <button
                        onClick={() => handleRemoveMember(member.id)}
                        disabled={isRemoving}
                        className="p-2.5 text-neutral-600 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white/2 border border-white/5 border-dashed rounded-[40px] p-20 flex flex-col items-center justify-center text-center space-y-6">
          <div className="p-6 rounded-[32px] bg-blue-500/10 border border-blue-500/20 text-blue-400 shadow-2xl shadow-blue-500/5">
            <Eye size={48} />
          </div>
          <div className="max-w-md space-y-2">
            <h4 className="text-2xl font-bold text-white">Open to everyone</h4>
            <p className="text-neutral-500 text-sm leading-relaxed">
              This is a public project, which means every member of your
              workspace can view, join, and contribute to the tasks here.
            </p>
          </div>
          <button className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all">
            Manage Workspace Access
          </button>
        </div>
      )}
    </div>
  );
}
