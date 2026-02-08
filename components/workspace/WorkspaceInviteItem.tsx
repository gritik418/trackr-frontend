"use client";

import { WorkspaceInvite } from "@/features/workspace/workspace.interface";
import {
  useResendWorkspaceInviteMutation,
  useRevokeWorkspaceInviteMutation,
} from "@/features/workspace/workspace.api";
import { Clock, Loader2, Mail, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { RevokeInviteModal } from "./RevokeInviteModal";

type Props = {
  invite: WorkspaceInvite;
  workspaceId: string;
};

const WorkspaceInviteItem = ({ invite, workspaceId }: Props) => {
  const [revokeInvite, { isLoading: isRevoking }] =
    useRevokeWorkspaceInviteMutation();
  const [resendInvite, { isLoading: isResending }] =
    useResendWorkspaceInviteMutation();
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);

  const handleResend = async () => {
    try {
      await resendInvite({ workspaceId, inviteId: invite.id }).unwrap();
      toast.success("Invitation resent successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to resend invitation");
    }
  };

  const handleRevoke = async () => {
    try {
      await revokeInvite({ workspaceId, inviteId: invite.id }).unwrap();
      toast.success("Invitation revoked successfully");
      setIsRevokeModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to revoke invitation");
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "ACCEPTED":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "REVOKED":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "EXPIRED":
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
      default:
        return "bg-white/5 text-neutral-400 border-white/10";
    }
  };

  return (
    <>
      <tr key={invite.id} className="group hover:bg-white/2 transition-colors">
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500 shrink-0">
              <Mail size={16} />
            </div>
            <div>
              <div className="text-sm font-medium text-white group-hover:text-brand transition-colors">
                {invite.email}
              </div>
              <div className="text-xs text-neutral-500">Invitation sent</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 text-neutral-400 border border-white/10">
            {invite.role.charAt(0) + invite.role.slice(1).toLowerCase()}
          </span>
        </td>
        <td className="px-6 py-4">
          <span
            className={`inline-flex capitalize items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyles(
              invite.status,
            )}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                invite.status === "PENDING"
                  ? "bg-amber-400 animate-pulse"
                  : invite.status === "ACCEPTED"
                    ? "bg-green-400"
                    : invite.status === "REVOKED"
                      ? "bg-red-400"
                      : "bg-gray-400"
              }`}
            />
            {invite.status.toLowerCase()}
          </span>
        </td>
        <td className="px-6 py-4 text-sm text-neutral-500 text-right font-mono">
          {new Date(invite.createdAt).toLocaleDateString()}
        </td>
        <td className="px-6 py-4 text-right">
          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100">
            <button
              onClick={() => setIsRevokeModalOpen(true)}
              disabled={isRevoking || invite.status === "REVOKED"}
              className="p-2 cursor-pointer text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title="Revoke Invite"
            >
              {isRevoking ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Trash2 size={16} />
              )}
            </button>
            <button
              onClick={handleResend}
              disabled={isResending || invite.status === "REVOKED"}
              className="p-2 cursor-pointer text-neutral-500 hover:text-white hover:bg-white/10 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title="Resend"
            >
              {isResending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Clock size={16} />
              )}
            </button>
          </div>
        </td>
      </tr>

      <RevokeInviteModal
        isOpen={isRevokeModalOpen}
        onClose={() => setIsRevokeModalOpen(false)}
        email={invite.email}
        onConfirm={handleRevoke}
        isRevoking={isRevoking}
      />
    </>
  );
};

export default WorkspaceInviteItem;
