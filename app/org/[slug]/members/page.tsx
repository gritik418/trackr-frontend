"use client";

import AdminOrOwnerGuard from "@/components/guards/AdminOrOwnerGuard";
import { InviteMemberModal } from "@/components/org/InviteMemberModal";
import InvitesPagination from "@/components/org/invites/InvitesPagination";
import MembersPagination from "@/components/org/members/MembersPagination";
import { MembersSkeleton } from "@/components/org/members/MembersSkeleton";
import { OrgInvitesTab } from "@/components/org/members/OrgInvitesTab";
import OrgMemberItem from "@/components/org/members/OrgMemberItem";
import {
  useGetOrganizationInvitesQuery,
  useGetOrganizationMembersQuery,
} from "@/features/organization/organization.api";
import {
  OrganizationInvitation,
  OrgInviteStatus,
} from "@/features/organization/organization.interface";
import {
  selectInvites,
  selectOrganization,
} from "@/features/organization/organization.slice";
import { OrganizationMember } from "@/types/organization/organization.interface";
import { CheckCircle2, Clock, Search, UserPlus, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function OrgMembersPage() {
  const limit: number = 10;
  const [page, setPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"active" | "invitations">(
    "active",
  );
  const [totalMembers, setTotalMembers] = useState<number>(0);
  const [totalInvites, setTotalInvites] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [invites, setInvites] = useState<OrganizationInvitation[]>([]);
  const [statusFilter, setStatusFilter] = useState<"ALL" | OrgInviteStatus>(
    "ALL",
  );

  const organization = useSelector(selectOrganization);

  const { data, isLoading: isLoadingMembers } = useGetOrganizationMembersQuery(
    {
      orgId: organization?.id || "",
      search: searchQuery,
      page,
      limit,
    },
    { skip: !organization?.id, refetchOnMountOrArgChange: true },
  );

  const { data: invitesData, isLoading: isLoadingInvites } =
    useGetOrganizationInvitesQuery(
      {
        orgId: organization?.id || "",
        search: searchQuery,
        page,
        limit,
      },
      { skip: !organization?.id, refetchOnMountOrArgChange: true },
    );

  useEffect(() => {
    setPage(1);
  }, [searchQuery, activeTab]);

  useEffect(() => {
    if (data?.members) {
      setMembers(data.members);
    }
    if (data?.pagination?.totalPages) {
      setTotalPages(data.pagination.totalPages);
      setTotalMembers(data.pagination.total);
    }
  }, [data]);

  useEffect(() => {
    if (invitesData?.invitations) {
      setInvites(invitesData.invitations);
    }
    if (invitesData?.pagination?.totalPages) {
      setTotalPages(invitesData.pagination.totalPages);
      setTotalInvites(invitesData.pagination.total);
    }
  }, [invitesData]);

  if (!organization) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div>
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-white/60 tracking-tight">
            Members
          </h2>
          <p className="text-org-item-text mt-2 text-lg font-light">
            {organization.role === "OWNER" || organization.role === "ADMIN"
              ? "Manage access and roles for your organization's members."
              : "View members of your organization."}
          </p>
        </div>
        <AdminOrOwnerGuard role={organization?.role}>
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="flex cursor-pointer items-center gap-2 px-5 py-2.5 bg-brand text-bg-dark-0 font-bold rounded-xl hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/20 transition-all active:scale-95 group"
          >
            <UserPlus size={18} strokeWidth={2.5} />
            Invite People
          </button>
        </AdminOrOwnerGuard>
      </div>

      <InviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        orgId={organization.id}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        <div className="p-5 rounded-2xl bg-org-card-bg/40 border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-neutral-500 font-medium">
              Total Members
            </p>
            <p className="text-2xl font-bold text-white">
              {members?.length || 0}
            </p>
          </div>
        </div>

        <AdminOrOwnerGuard
          role={organization?.role}
          className="p-5 rounded-2xl bg-org-card-bg/40 border border-white/5 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-sm text-neutral-500 font-medium">Active Seats</p>
            <p className="text-2xl font-bold text-white">
              {members?.length || 0}
            </p>
          </div>
        </AdminOrOwnerGuard>

        <AdminOrOwnerGuard
          role={organization?.role}
          className="p-5 rounded-2xl bg-org-card-bg/40 border border-white/5 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm text-neutral-500 font-medium">
              Total Invitations
            </p>
            <p className="text-2xl font-bold text-white">
              {invites?.length || 0}
            </p>
          </div>
        </AdminOrOwnerGuard>
      </div>

      {/* Main Content Card */}
      <div className="relative z-10 rounded-3xl bg-org-card-bg/60 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/20 overflow-hidden flex flex-col min-h-[600px]">
        {/* Toolbar */}
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tabs */}

          <AdminOrOwnerGuard role={organization?.role}>
            <div className="flex p-1 bg-white/5 rounded-xl self-start">
              <button
                onClick={() => setActiveTab("active")}
                className={`px-4 py-2 cursor-pointer rounded-lg text-sm font-medium transition-all ${activeTab === "active" ? "bg-white/10 text-white shadow-sm" : "text-neutral-500 hover:text-neutral-300"}`}
              >
                Members
              </button>
              <button
                onClick={() => setActiveTab("invitations")}
                className={`px-4 py-2 cursor-pointer rounded-lg text-sm font-medium transition-all ${activeTab === "invitations" ? "bg-white/10 text-white shadow-sm" : "text-neutral-500 hover:text-neutral-300"}`}
              >
                Invitations
              </button>
            </div>
          </AdminOrOwnerGuard>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            {activeTab === "invitations" && (
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value as
                        | "ALL"
                        | OrganizationInvitation["status"],
                    )
                  }
                  className="w-full md:w-40 px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-sm text-white focus:outline-none focus:border-brand/30 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                >
                  <option value="ALL" className="bg-neutral-900">
                    All Status
                  </option>
                  <option value="PENDING" className="bg-neutral-900">
                    Pending
                  </option>
                  <option value="ACCEPTED" className="bg-neutral-900">
                    Accepted
                  </option>
                  <option value="REVOKED" className="bg-neutral-900">
                    Revoked
                  </option>
                  <option value="EXPIRED" className="bg-neutral-900">
                    Expired
                  </option>
                </select>
                <div className="absolute right-3 top-3.5 pointer-events-none text-neutral-500">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5 4.5L6 8L9.5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            )}

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search
                className="absolute left-3 top-2.5 text-neutral-500"
                size={16}
              />
              <input
                type="text"
                placeholder={`Search ${activeTab === "active" ? "members" : "invitations"}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-white/5 border border-white/5 rounded-xl text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand/30 focus:bg-white/10 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-neutral-500 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-x-auto relative">
          {activeTab === "active" ? (
            isLoadingMembers ? (
              <MembersSkeleton />
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
                        Joined
                      </th>
                      <th className="px-6 py-4 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {members?.map((member) => (
                      <OrgMemberItem
                        orgUserRole={organization.role}
                        key={member.id}
                        member={member}
                      />
                    ))}
                  </tbody>
                </table>

                {members?.length === 0 && !searchQuery && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                      <Users size={24} className="text-neutral-500" />
                    </div>
                    <h3 className="text-white font-bold mb-1">
                      No active members
                    </h3>
                    <p className="text-neutral-500 text-sm">
                      Invite people to get started.
                    </p>
                  </div>
                )}

                {members?.length === 0 && searchQuery && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                      <Search size={24} className="text-neutral-500" />
                    </div>
                    <h3 className="text-white font-bold mb-1">
                      No members found
                    </h3>
                    <p className="text-neutral-500 text-sm">
                      Try adjusting your search query.
                    </p>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mt-4 text-sm text-brand hover:text-brand-hover font-medium cursor-pointer"
                    >
                      Clear search
                    </button>
                  </div>
                )}
              </>
            )
          ) : (
            <OrgInvitesTab
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              orgId={organization.id}
              searchQuery={searchQuery}
            />
          )}
        </div>

        {activeTab === "active" ? (
          <MembersPagination
            members={members}
            totalMembers={totalMembers}
            setPage={setPage}
            page={page}
            totalPages={totalPages}
          />
        ) : (
          <InvitesPagination
            invites={invites}
            totalInvites={totalInvites}
            setPage={setPage}
            page={page}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
}
