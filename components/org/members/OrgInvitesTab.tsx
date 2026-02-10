"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Mail, Search } from "lucide-react";
import { useGetOrganizationInvitesQuery } from "@/features/organization/organization.api";
import {
  OrganizationInvitation,
  OrgInviteStatus,
} from "@/features/organization/organization.interface";
import { selectInvites } from "@/features/organization/organization.slice";
import OrgInviteItem from "@/components/org/invites/OrgInviteItem";
import { MembersSkeleton } from "@/components/org/members/MembersSkeleton";

interface OrgInvitesTabProps {
  orgId: string;
  searchQuery: string;
  statusFilter: "ALL" | OrgInviteStatus;
  setStatusFilter: (status: "ALL" | OrgInviteStatus) => void;
}

export function OrgInvitesTab({
  orgId,
  searchQuery,
  statusFilter,
}: OrgInvitesTabProps) {
  const { isLoading: isLoadingInvites } = useGetOrganizationInvitesQuery(
    {
      orgId: orgId,
      status: statusFilter === "ALL" ? undefined : statusFilter,
    },
    { skip: !orgId, refetchOnMountOrArgChange: true },
  );

  const invites = useSelector(selectInvites);

  const filteredInvites = invites?.filter(
    (invite) =>
      invite.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invite.role.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoadingInvites) {
    return <MembersSkeleton />;
  }

  return (
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
              Invited on
            </th>
            <th className="px-6 py-4 w-10"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {filteredInvites?.map((invite) => (
            <OrgInviteItem key={invite.id} invite={invite} orgId={orgId} />
          ))}
        </tbody>
      </table>

      {invites?.length === 0 && !searchQuery && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <Mail size={24} className="text-neutral-500" />
          </div>
          <h3 className="text-white font-bold mb-1">No invitations</h3>
          <p className="text-neutral-500 text-sm">
            {statusFilter === "ALL"
              ? "Invite members to collaborate with your team."
              : `No ${statusFilter.toLowerCase()} invitations found.`}
          </p>
        </div>
      )}

      {filteredInvites?.length === 0 && searchQuery && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <Search size={24} className="text-neutral-500" />
          </div>
          <h3 className="text-white font-bold mb-1">No invites found</h3>
          <p className="text-neutral-500 text-sm">
            Try adjusting your search query.
          </p>
        </div>
      )}
    </>
  );
}
