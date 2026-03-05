"use client";

import AddProjectMemberModal from "@/components/project/AddProjectMemberModal";
import {
  useGetProjectMembersQuery,
  useRemoveMemberFromProjectMutation,
} from "@/features/project/project.api";
import { Project } from "@/types/project/project.interface";
import {
  Eye,
  Loader2,
  Mail,
  Search,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import NextImage from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

interface ProjectMembersProps {
  project: Project;
  setActiveTab: (tab: string) => void;
}

export default function ProjectMembers({
  project,
  setActiveTab,
}: ProjectMembersProps) {
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const nature = project.nature;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <AddProjectMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        workspaceId={project.workspaceId}
        projectId={project.id}
        currentMemberIds={members.map((m) => m.id)}
      />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shadow-lg shadow-brand/5">
            <Users size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight">
              Project Team
            </h3>
            <p className="text-sm text-neutral-500 font-medium">
              {members.length} collaborators managing this project
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-brand transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Filter members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-3 bg-white/5 border border-white/5 rounded-2xl text-sm font-medium text-white focus:outline-none focus:border-brand/40 w-full md:w-64 transition-all placeholder:text-neutral-600"
            />
          </div>
          {nature === "PRIVATE" && (
            <button
              onClick={() => setIsAddMemberModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-black font-black rounded-2xl hover:text-brand/80 hover:border-brand/80 border text-brand border-brand transition-all active:scale-95 shadow-xl shadow-brand/10 cursor-pointer"
            >
              <UserPlus size={18} strokeWidth={3} />
              <span className="hidden sm:inline">Add Member</span>
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 text-neutral-500">
          <Loader2 className="w-12 h-12 animate-spin text-brand mb-4 opacity-50" />
          <p className="font-bold uppercase tracking-widest text-[10px]">
            Syncing Team Data...
          </p>
        </div>
      ) : nature === "PRIVATE" ? (
        <div className="grid gap-4">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <div
                key={member.id}
                className="group flex items-center justify-between p-6 rounded-4xl bg-white/2 border border-white/5 hover:border-brand/30 hover:bg-white/4 transition-all duration-300 backdrop-blur-xl relative overflow-hidden"
              >
                <div className="flex items-center gap-5 relative z-10">
                  <div className="relative">
                    {member.avatar ? (
                      <NextImage
                        src={member.avatar}
                        alt={member.name}
                        width={56}
                        height={56}
                        className="w-14 h-14 rounded-2xl border border-white/10 object-cover shadow-2xl"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-neutral-800 border border-white/10 flex items-center justify-center text-lg font-black text-white">
                        {member.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-4 border-bg-dark-0" />
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-bold text-white tracking-tight group-hover:text-brand transition-colors text-xl">
                        {member.name}
                      </p>
                      <span
                        className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                          member.role === "OWNER"
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                            : member.role === "ADMIN"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                              : "bg-white/5 text-neutral-500 border-white/10"
                        }`}
                      >
                        {member.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-500 text-sm font-medium">
                      <Mail size={14} className="opacity-50" />
                      {member.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                  {member.role !== "OWNER" && (
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      disabled={isRemoving}
                      className="p-3 text-neutral-600 hover:text-red-400 hover:bg-red-400/10 rounded-2xl transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50 cursor-pointer"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>

                {/* Subtle highlight glow on hover */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-12 bg-brand rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))
          ) : (
            <div className="py-20 text-center border border-dashed border-white/10 rounded-[3rem] bg-white/1">
              <Search
                size={40}
                className="mx-auto text-neutral-700 mb-4 opacity-20"
              />
              <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">
                No members found matching "{searchTerm}"
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white/2 border border-white/5 border-dashed rounded-[3rem] p-24 flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full" />
          <div className="relative z-10 p-8 rounded-[2.5rem] bg-blue-500/10 border border-blue-500/20 text-blue-400 shadow-2xl shadow-blue-500/10">
            <Eye size={56} />
          </div>
          <div className="max-w-md space-y-3 relative z-10">
            <h4 className="text-3xl font-black text-white tracking-tight">
              Open Workspace Project
            </h4>
            <p className="text-neutral-500 text-lg font-light leading-relaxed">
              This project is public to all workspace members. Anyone can view,
              coordinate, and contribute to tasks here.
            </p>
          </div>
          <button
            onClick={() => setActiveTab("settings")}
            className="relative z-10 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all cursor-pointer"
          >
            Manage Workspace Access
          </button>
        </div>
      )}
    </div>
  );
}
