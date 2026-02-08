"use client";

import { useGetWorkspaceMembersQuery } from "@/features/workspace/workspace.api";
import { Search, UserPlus, Users, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

interface AddProjectMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  workspaceId: string;
  currentMemberIds: string[];
  onAddMember: (member: any) => void;
}

export default function AddProjectMemberModal({
  isOpen,
  onClose,
  workspaceId,
  currentMemberIds,
  onAddMember,
}: AddProjectMemberModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: membersData, isLoading } = useGetWorkspaceMembersQuery(
    workspaceId,
    {
      skip: !workspaceId,
    },
  );

  if (!isOpen) return null;

  const members = membersData?.members || [];

  const filteredMembers = members.filter((member: any) => {
    // Filter out existing project members
    if (currentMemberIds.includes(member.user.id)) return false;

    // Filter by search query
    const nameMatch = member.user.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const emailMatch = member.user.email
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return nameMatch || emailMatch;
  });

  const handleAdd = (member: any) => {
    onAddMember(member);
    toast.success(`Added ${member.user.name} to project (Mock)`);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-dashboard-card-bg/90 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">Add Team Members</h3>
            <p className="text-neutral-400 text-sm mt-1">
              Select members from your workspace to add to this project.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors text-neutral-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-white/5 bg-white/2">
          <div className="relative">
            <Search
              className="absolute left-4 top-3.5 text-neutral-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand/30 focus:bg-white/10 transition-all font-medium"
              autoFocus
            />
          </div>
        </div>

        {/* List */}
        <div className="max-h-[400px] overflow-y-auto p-2">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10 text-neutral-500 space-y-2">
              <div className="w-6 h-6 border-2 border-brand/30 border-t-brand rounded-full animate-spin" />
              <p className="text-sm">Loading members...</p>
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <Users size={24} className="text-neutral-600" />
              </div>
              <p className="text-neutral-400 font-medium">No members found</p>
              <p className="text-neutral-600 text-sm mt-1">
                {searchQuery
                  ? "Try a different search term"
                  : "All workspace members are already in this project"}
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredMembers.map((member: any) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 hover:bg-white/5 rounded-2xl group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand font-bold text-xs shrink-0 overflow-hidden">
                      {member.user.avatarUrl ? (
                        <Image
                          src={member.user.avatarUrl}
                          alt={member.user.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        getInitials(member.user.name)
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm group-hover:text-brand transition-colors">
                        {member.user.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {member.user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAdd(member)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-brand text-xs font-bold text-white rounded-xl border border-white/5 hover:border-brand/50 transition-all active:scale-95 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
                  >
                    <UserPlus size={14} />
                    Add
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
