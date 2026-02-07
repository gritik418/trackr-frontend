import { OrganizationInvitation } from "@/features/organization/organization.interface";
import { formatRelativeTime } from "@/lib/utils";
import { Clock, Mail, Trash2 } from "lucide-react";

type Props = {
  invite: OrganizationInvitation;
};

const OrgInviteItem = ({ invite }: Props) => {
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

  const statusLabel =
    invite.status === "PENDING"
      ? "Pending"
      : invite.status === "ACCEPTED"
        ? "Accepted"
        : invite.status === "REVOKED"
          ? "Revoked"
          : "Expired";

  return (
    <tr key={invite.id} className="group hover:bg-white/2 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500 shrink-0">
            <Mail size={16} />
          </div>
          <div>
            <div className="text-sm font-medium text-white">{invite.email}</div>
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
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyles(
            invite.status,
          )}`}
        >
          {statusLabel}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-neutral-500 text-right font-mono">
        {formatRelativeTime(invite.createdAt)}
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100">
          <button
            className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
            title="Revoke Invite"
          >
            <Trash2 size={16} />
          </button>
          <button
            className="p-2 text-neutral-500 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            title="Resend"
          >
            <Clock size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default OrgInviteItem;
