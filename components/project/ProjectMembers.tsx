"use client";

import AddProjectMemberModal from "@/components/project/AddProjectMemberModal";
import { Project } from "@/types/project/project.interface";
import { Eye, Mail, Trash2, UserPlus, Users } from "lucide-react";
import { useState } from "react";

interface ProjectMembersProps {
  project: Project;
}

export default function ProjectMembers({ project }: ProjectMembersProps) {
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

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
    if (members.find((m) => m.id === member.user.id)) return;

    setMembers([
      ...members,
      {
        id: member.user.id,
        name: member.user.name,
        email: member.user.email,
        role: "MEMBER",
        avatar: member.user.avatarUrl,
      },
    ]);
  };

  const nature = project.nature;

  return (
    <div className="mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <AddProjectMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        workspaceId={project.workspaceId}
        currentMemberIds={members.map((m) => m.id)}
        onAddMember={handleAddMember}
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

      {nature === "PRIVATE" ? (
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
                      <div className="w-12 h-12 rounded-2xl bg-neutral-800 border border-white/5 flex items-center justify-center text-sm font-bold text-white group-hover:scale-105 transition-transform">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
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
                    <button className="p-2.5 text-neutral-600 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                      <Trash2 size={20} />
                    </button>
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
