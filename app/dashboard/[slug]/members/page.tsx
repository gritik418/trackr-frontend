"use client";

import { InviteWorkspaceMemberModal } from "@/components/workspace/InviteWorkspaceMemberModal";
import { RemoveWorkspaceMemberModal } from "@/components/workspace/RemoveWorkspaceMemberModal";
import WorkspaceInviteItem from "@/components/workspace/WorkspaceInviteItem";
import {
  useGetWorkspaceInvitesQuery,
  useGetWorkspaceMembersQuery,
  useRemoveWorkspaceMemberMutation,
  useUpdateWorkspaceMemberRoleMutation,
} from "@/features/workspace/workspace.api";
import { selectWorkspace } from "@/features/workspace/workspace.slice";
import { useUser } from "@/providers/AuthProvider";
import { WorkspaceRole } from "@/types/workspace/workspace.interface";
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  Mail,
  MoreVertical,
  Search,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaChevronRight } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function WorkspaceMembersPage() {
  const [activeTab, setActiveTab] = useState<"members" | "pending">("members");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useUser();
  const workspace = useSelector(selectWorkspace);

  const { data: membersData, isLoading: isLoadingMembers } =
    useGetWorkspaceMembersQuery(workspace?.id || "", { skip: !workspace?.id });

  const { data: invitesData, isLoading: isLoadingInvites } =
    useGetWorkspaceInvitesQuery(
      { workspaceId: workspace?.id || "" },
      { skip: !workspace?.id },
    );

  const [selectedMember, setSelectedMember] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const [removeMember, { isLoading: isRemovingMember }] =
    useRemoveWorkspaceMemberMutation();
  const [updateRole] = useUpdateWorkspaceMemberRoleMutation();

  const handleRemoveMemberSelection = (member: {
    id: string;
    name: string;
    email: string;
  }) => {
    setSelectedMember(member);
    setIsRemoveModalOpen(true);
  };

  const handleConfirmRemove = async () => {
    if (!workspace?.id || !selectedMember) return;

    try {
      await removeMember({
        workspaceId: workspace.id,
        memberId: selectedMember.id,
      }).unwrap();
      toast.success("Member removed successfully");
      setIsRemoveModalOpen(false);
      setSelectedMember(null);
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to remove member");
    }
  };

  const handleUpdateRole = async (memberId: string, newRole: string) => {
    if (!workspace?.id) return;
    try {
      await updateRole({
        workspaceId: workspace.id,
        memberId,
        body: { role: newRole },
      }).unwrap();
      toast.success("Role updated successfully");
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to update role");
    }
  };

  const isWorkspaceAdminOrOwner =
    workspace?.role === WorkspaceRole.OWNER ||
    workspace?.role === WorkspaceRole.ADMIN;

  const members = (membersData?.members || []).filter(
    (member) =>
      member.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const invites = (invitesData?.invitations || []).filter((invite) =>
    invite.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-white/60 tracking-tight">
            Workspace Members
          </h2>
          <p className="text-neutral-400 mt-2 text-lg font-light">
            Manage access to this workspace.
          </p>
        </div>
        {isWorkspaceAdminOrOwner ? (
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="flex cursor-pointer items-center gap-2 px-5 py-2.5 bg-brand text-bg-dark-0 font-bold rounded-xl hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/20 transition-all active:scale-95 group"
          >
            <UserPlus size={18} strokeWidth={2.5} />
            Invite Member
          </button>
        ) : null}
      </div>

      <InviteWorkspaceMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />

      <RemoveWorkspaceMemberModal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        onConfirm={handleConfirmRemove}
        userName={selectedMember?.name || ""}
        userEmail={selectedMember?.email || ""}
        isRemoving={isRemovingMember}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        <div className="p-5 rounded-2xl bg-dashboard-card-bg/40 border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-neutral-500 font-medium">
              Total Members
            </p>
            <p className="text-2xl font-bold text-white">
              {membersData?.members?.length || 0}
            </p>
          </div>
        </div>

        {isWorkspaceAdminOrOwner && (
          <div className="p-5 rounded-2xl bg-dashboard-card-bg/40 border border-white/5 flex items-center gap-4 animate-in fade-in slide-in-from-right duration-500">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-neutral-500 font-medium">
                Pending Invites
              </p>
              <p className="text-2xl font-bold text-white">
                {invitesData?.invitations?.length || 0}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Card */}
      <div className="relative z-10 rounded-3xl bg-dashboard-card-bg/60 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/20 overflow-hidden flex flex-col min-h-[500px]">
        {/* Toolbar */}
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tabs */}
          {isWorkspaceAdminOrOwner ? (
            <div className="flex p-1 bg-white/5 rounded-xl self-start">
              <button
                onClick={() => setActiveTab("members")}
                className={`px-4 cursor-pointer py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "members" ? "bg-white/10 text-white shadow-sm" : "text-neutral-500 hover:text-neutral-300"}`}
              >
                Members
              </button>

              {isWorkspaceAdminOrOwner && (
                <button
                  onClick={() => setActiveTab("pending")}
                  className={`px-4 cursor-pointer py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "pending" ? "bg-white/10 text-white shadow-sm" : "text-neutral-500 hover:text-neutral-300"}`}
                >
                  Invites
                </button>
              )}
            </div>
          ) : (
            <div className="text-lg font-medium">Members</div>
          )}
          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search
              className="absolute left-3 top-2.5 text-neutral-500"
              size={16}
            />
            <input
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/5 rounded-xl text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand/30 focus:bg-white/10 transition-all"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-x-auto">
          {isLoadingMembers || isLoadingInvites ? (
            <div className="p-6 space-y-6 flex flex-col">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between animate-pulse"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5" />
                    <div className="space-y-2">
                      <div className="w-32 h-4 bg-white/5 rounded" />
                      <div className="w-48 h-3 bg-white/5 rounded" />
                    </div>
                  </div>
                  <div className="w-20 h-8 bg-white/5 rounded-lg" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/2">
                    <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">
                      {activeTab === "members" ? "Joined" : "Invited on"}
                    </th>
                    <th className="px-6 py-4 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {activeTab === "members"
                    ? members.map((member) => {
                        const isEditable =
                          member.role !== WorkspaceRole.OWNER &&
                          ((workspace?.role === WorkspaceRole.OWNER &&
                            member.userId !== user?.id) ||
                            (workspace?.role === WorkspaceRole.ADMIN &&
                              member.role === WorkspaceRole.MEMBER));

                        return (
                          <tr
                            key={member.id}
                            className="group hover:bg-white/2 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand font-bold text-sm overflow-hidden shrink-0">
                                  {member.user.avatarUrl ? (
                                    <Image
                                      width={40}
                                      height={40}
                                      src={member.user.avatarUrl}
                                      alt={member.user.name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    getInitials(member.user.name)
                                  )}
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-white group-hover:text-brand transition-colors">
                                    {member.user.name}
                                    {workspace?.role === member.role && (
                                      <span className="ml-2 text-[10px] bg-white/10 text-neutral-400 px-1.5 py-0.5 rounded uppercase tracking-wider">
                                        You
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-xs text-neutral-500">
                                    {member.user.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {workspace?.role &&
                              workspace?.role === WorkspaceRole.MEMBER ? (
                                <div
                                  className={`inline-flex w-20 text-center justify-center appearance-none items-center gap-1.5 py-1 rounded-full text-xs font-medium border bg-transparent focus:outline-none transition-all ${
                                    member.role === "OWNER" ||
                                    member.role === "ADMIN"
                                      ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                      : "bg-white/5 text-neutral-400 border-white/10"
                                  }`}
                                >
                                  {member.role}
                                </div>
                              ) : (
                                <div className="relative h-max w-max">
                                  {!isEditable ? null : (
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2">
                                      <ChevronDown size={14} />
                                    </span>
                                  )}
                                  <select
                                    value={member.role}
                                    onChange={(e) =>
                                      handleUpdateRole(
                                        member.id,
                                        e.target.value,
                                      )
                                    }
                                    disabled={!isEditable}
                                    className={`inline-flex w-24 appearance-none items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-transparent focus:outline-none transition-all ${
                                      !isEditable
                                        ? "cursor-not-allowed text-center"
                                        : "cursor-pointer"
                                    } ${
                                      member.role === "OWNER" ||
                                      member.role === "ADMIN"
                                        ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                        : "bg-white/5 text-neutral-400 border-white/10"
                                    }`}
                                  >
                                    <option
                                      value="MEMBER"
                                      className="bg-dashboard-card-bg"
                                    >
                                      MEMBER
                                    </option>
                                    <option
                                      value="ADMIN"
                                      className="bg-dashboard-card-bg"
                                    >
                                      ADMIN
                                    </option>
                                  </select>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-neutral-500 text-right font-mono">
                              {new Date(member.joinedAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-right">
                              {isEditable && (
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100">
                                  <button
                                    onClick={() =>
                                      handleRemoveMemberSelection({
                                        id: member.id,
                                        name: member.user.name,
                                        email: member.user.email,
                                      })
                                    }
                                    className="p-2 cursor-pointer text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                    title="Remove Member"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    : isWorkspaceAdminOrOwner
                      ? invites.map((invite) => (
                          <WorkspaceInviteItem
                            key={invite.id}
                            invite={invite}
                            workspaceId={workspace?.id || ""}
                          />
                        ))
                      : null}
                </tbody>
              </table>

              {activeTab === "pending" && invites.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <Mail size={24} className="text-neutral-500" />
                  </div>
                  <h3 className="text-white font-bold mb-1">
                    No pending invites
                  </h3>
                  <p className="text-neutral-500 text-sm">
                    Invite members to collaborate with your team.
                  </p>
                </div>
              )}

              {activeTab === "members" && members.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <Users size={24} className="text-neutral-500" />
                  </div>
                  <h3 className="text-white font-bold mb-1">
                    No members found
                  </h3>
                  <p className="text-neutral-500 text-sm">
                    Try adjusting your search or invite new members.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
