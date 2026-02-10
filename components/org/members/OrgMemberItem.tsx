import { formatRelativeTime, getInitials } from "@/lib/utils";
import { useUser } from "@/providers/AuthProvider";
import { OrganizationMember } from "@/types/organization/organization.interface";
import { Shield } from "lucide-react";
import Image from "next/image";
import { MemberOptionsDropdown } from "./MemberOptionsDropdown";
import AdminOrOwnerGuard from "@/components/guards/AdminOrOwnerGuard";

type Props = {
  member: OrganizationMember;
  orgUserRole: string;
};

const OrgMemberItem = ({ member, orgUserRole }: Props) => {
  const { user } = useUser();

  return (
    <tr key={member.id} className="group hover:bg-white/2 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand font-bold text-sm overflow-hidden shrink-0">
            {member.user.avatarUrl ? (
              <Image
                width={40}
                height={40}
                src={member.user.avatarUrl}
                alt={member.user.name}
                className="w-10 h-10 object-cover"
              />
            ) : (
              getInitials(member.user.name)
            )}
          </div>
          <div>
            <div className="flex items-start gap-1">
              <div className="text-sm font-medium text-white group-hover:text-brand transition-colors">
                {member.user.name}
              </div>
              {user.id === member.user.id && (
                <span className="text-xs text-blue-400 font-semibold">
                  (You)
                </span>
              )}
            </div>
            <div className="text-xs text-neutral-500">{member.user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
            member.role === "OWNER"
              ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
              : member.role === "ADMIN"
                ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                : "bg-white/5 text-neutral-400 border-white/10"
          }`}
        >
          {(member.role === "OWNER" || member.role === "ADMIN") && (
            <Shield size={10} />
          )}
          {member.role.charAt(0) + member.role.slice(1).toLowerCase()}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Active
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-neutral-500 text-right font-mono">
        {formatRelativeTime(member.joinedAt)}
      </td>
      <td className="px-6 py-4 text-right">
        <AdminOrOwnerGuard role={orgUserRole}>
          {member.role !== "OWNER" && user.id !== member.user.id ? (
            <MemberOptionsDropdown member={member} />
          ) : null}
        </AdminOrOwnerGuard>
      </td>
    </tr>
  );
};

export default OrgMemberItem;
