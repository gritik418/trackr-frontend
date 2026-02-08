import { getInitials } from "@/lib/utils";
import { OrganizationMember } from "@/types/organization/organization.interface";
import { Check } from "lucide-react";
import React from "react";

type Props = {
  member: OrganizationMember;
  setEmail: (email: string) => void;
  setIsMemberDropdownOpen: (open: boolean) => void;
};

const OrgMemberTile = ({
  member,
  setEmail,
  setIsMemberDropdownOpen,
}: Props) => {
  return (
    <button
      key={member.id}
      type="button"
      onClick={() => {
        setEmail(member.user.email);
        setIsMemberDropdownOpen(false);
      }}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-left group"
    >
      <div className="w-8 h-8 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand font-bold text-xs overflow-hidden shrink-0">
        {member.user.avatarUrl ? (
          <img
            src={member.user.avatarUrl}
            alt={member.user.name}
            className="w-full h-full object-cover"
          />
        ) : (
          getInitials(member.user.name)
        )}
      </div>
      <div className="overflow-hidden">
        <div className="text-sm font-medium text-white group-hover:text-brand transition-colors truncate">
          {member.user.name}
        </div>
        <div className="text-xs text-neutral-500 truncate">
          {member.user.email}
        </div>
      </div>
      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
        <Check size={14} className="text-brand" />
      </div>
    </button>
  );
};

export default OrgMemberTile;
