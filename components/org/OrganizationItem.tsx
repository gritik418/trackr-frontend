import { OrgWithRole } from "@/features/organization/organization.interface";
import { ArrowRight, Globe, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RoleBadgeIcon from "../ui/RoleBadgeIcon";

type Props = {
  org: OrgWithRole;
};

const OrganizationItem = ({ org }: Props) => {
  return (
    <Link
      key={org.id}
      href={
        org.role === "OWNER" || org.role === "ADMIN"
          ? `/org/${org.slug}`
          : `/org/${org.slug}/workspaces`
      }
      className="group cursor-pointer relative bg-white/3 backdrop-blur-xl border border-white/10 ring-1 ring-inset ring-white/5 rounded-2xl p-6 transition-all duration-500 hover:border-brand/40 hover:shadow-[0_0_50px_-12px_rgba(var(--brand-rgb),0.2)] hover:-translate-y-1.5 hover:scale-[1.02] overflow-hidden flex flex-col h-full"
    >
      {/* Dynamic Card Highlight Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="absolute -inset-px bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-700 pointer-events-none" />

      <div className="relative z-10 flex justify-between items-start mb-6">
        {org.logoUrl ? (
          <div className="relative">
            <div className="absolute -inset-2 bg-brand/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Image
              src={org.logoUrl}
              alt={org.name}
              width={56}
              height={56}
              className="w-14 h-14 rounded-xl object-cover relative z-10 border border-white/10 shadow-2xl"
            />
          </div>
        ) : (
          <div
            className={`w-14 h-14 rounded-xl ${org.role === "OWNER" ? "bg-brand" : "bg-brand/30"} flex items-center justify-center text-xl font-black text-white shadow-2xl ring-4 ring-white/5 ring-offset-2 ring-offset-[#020202] group-hover:ring-brand/20 transition-all duration-500 relative z-10`}
          >
            {org.name.charAt(0)}
          </div>
        )}
        <div
          className={`px-3 flex items-center gap-1.5 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-500 border relative z-10 ${org.role === "OWNER" ? "border-amber-500/30 bg-amber-500/10 text-amber-500 group-hover:bg-amber-500/20" : org.role === "ADMIN" ? "border-blue-500/30 bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20" : "border-white/10 bg-white/5 text-neutral-400 group-hover:bg-white/10"}`}
        >
          <RoleBadgeIcon role={org.role} size={12} />
          {org.role}
        </div>
      </div>

      <div className="relative z-10 space-y-2 mb-8 flex-1">
        <h3 className="text-xl font-bold text-white group-hover:text-brand transition-colors duration-300 line-clamp-1 flex items-center gap-2">
          {org.name}
        </h3>
        {org.websiteUrl && (
          <p className="text-sm text-neutral-400 flex items-center gap-2 group-hover:text-neutral-300 transition-colors duration-300">
            <Globe
              size={13}
              strokeWidth={2}
              className="text-brand/60 group-hover:text-brand transition-colors"
            />{" "}
            <span className="truncate">{org.websiteUrl}</span>
          </p>
        )}
      </div>

      <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-sm group-hover:border-white/20 transition-all duration-500 mt-auto">
        <div className="flex items-center gap-2.5 text-neutral-400 group-hover:text-neutral-200 transition-colors duration-300">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-brand/10 group-hover:text-brand transition-all">
            <Users size={14} strokeWidth={2.5} />
          </div>
          <span className="font-semibold tracking-wide">
            {org.members?.length || 0}{" "}
            {(org.members?.length || 0) === 1 ? "member" : "members"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-brand font-bold opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">
          Go <ArrowRight size={16} strokeWidth={3} />
        </div>
      </div>
    </Link>
  );
};

export default OrganizationItem;
