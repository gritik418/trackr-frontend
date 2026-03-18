"use client";
import { AuditLogList } from "@/components/audit-logs/AuditLogList";
import { AuditLog } from "@/features/audit-logs/audit-logs.interface";
import { useGetDashboardStatsQuery } from "@/features/dashboard/dashboard.api";
import { selectOrganization } from "@/features/organization/organization.slice";
import {
  Activity,
  ArrowUpRight,
  Building2,
  CreditCard,
  Plus,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function OrgDashboardPage() {
  const organization = useSelector(selectOrganization);
  const [recentLogs, setRecentLogs] = useState<AuditLog[]>([]);
  const { data, isLoading } = useGetDashboardStatsQuery(organization?.id!, {
    skip: !organization?.id,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (data?.stats?.recentLogs) {
      setRecentLogs(data.stats.recentLogs);
    }
  }, [data]);

  const stats = [
    {
      label: "Total Members",
      value: data?.stats?.membersCount || 0,
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      progressBg: "bg-blue-400",
      border: "border-blue-400/20",
      progress: data?.percentage?.members || 0,
      isHidden: false,
    },
    {
      label: "Active Workspaces",
      value: data?.stats?.workspacesCount || 0,
      icon: Building2,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      progressBg: "bg-emerald-400",
      border: "border-emerald-400/20",
      progress: data?.percentage?.workspaces || 0,
      isHidden: organization?.role === "MEMBER" || !organization?.role,
    },
    {
      label: "Active Projects",
      value: data?.stats?.projectsCount || 0,
      icon: Activity,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      progressBg: "bg-amber-400",
      border: "border-amber-400/20",
      progress: data?.percentage?.projects || 0,
      isHidden: organization?.role === "MEMBER" || !organization?.role,
    },
  ];

  useEffect(() => {
    if (data?.stats?.recentLogs) {
      setRecentLogs(data.stats.recentLogs);
    }
  }, [data]);

  if (!organization) return null;

  const isOwnerOrAdmin =
    organization.role === "OWNER" || organization.role === "ADMIN";

  return (
    <div className="space-y-10 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-white/60 tracking-tight">
              Dashboard
            </h1>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm ${
                organization.role === "OWNER"
                  ? "bg-brand/10 text-brand border-brand/20 shadow-brand/5"
                  : organization.role === "ADMIN"
                    ? "bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-purple-500/5"
                    : "bg-neutral-500/10 text-neutral-400 border-neutral-500/20"
              }`}
            >
              {organization.role}
            </span>
          </div>
          <p className="text-org-item-text text-lg font-light">
            {isOwnerOrAdmin
              ? "Manage your organization's global configuration and state."
              : "View your organization's global configuration and state."}
          </p>
        </div>

        {isOwnerOrAdmin && (
          <div className="flex items-center gap-3">
            <Link
              href={`/org/${organization.slug}/workspaces/new`}
              className="px-6 py-2.5 bg-brand text-bg-dark-0 rounded-2xl text-sm font-bold hover:bg-brand-hover transition-all duration-300 shadow-lg shadow-brand/20 hover:shadow-brand/40 hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Plus size={18} />
              New Workspace
            </Link>
          </div>
        )}
      </div>

      {!isOwnerOrAdmin && (
        <section className="p-8 rounded-[2.5rem] bg-org-card-bg/60 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-linear-to-br from-brand/5 to-transparent opacity-50" />
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
            {organization.logoUrl ? (
              <img
                src={organization.logoUrl}
                alt={organization.name}
                className="w-24 h-24 rounded-3xl object-cover border border-white/10 shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-3xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand text-4xl font-bold shadow-lg">
                {organization.name.charAt(0)}
              </div>
            )}
            <div className="flex-1 space-y-3">
              <div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                  {organization.name}
                </h2>
                <p className="text-org-item-text text-lg font-medium">
                  {organization.description || "No description available."}
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <Users size={16} className="text-brand" />
                  <span className="text-sm font-bold text-white">
                    {organization.owner?.name || "Unknown Owner"}
                  </span>
                  <span className="text-[10px] text-org-item-text font-black uppercase tracking-wider">
                    Owner
                  </span>
                </div>
                {organization.websiteUrl && (
                  <Link
                    href={organization.websiteUrl}
                    target="_blank"
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2 hover:bg-white/10 transition-colors"
                  >
                    <ArrowUpRight size={16} className="text-brand" />
                    <span className="text-sm font-bold text-white">
                      Website
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          if (stat.isHidden) return null;
          return (
            <div
              key={i}
              className={`p-7 rounded-4xl bg-org-card-bg/60 backdrop-blur-xl border border-white/5 relative overflow-hidden group hover:border-brand/30 transition-all duration-500 shadow-2xl shadow-black/20`}
            >
              <div
                className={`absolute -top-24 -right-24 p-48 ${stat.bg} filter blur-[100px] opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-700 pointer-events-none`}
              ></div>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.border} border flex items-center justify-center shadow-inner`}
                  >
                    <stat.icon size={28} className={stat.color} />
                  </div>

                  {organization.role !== "MEMBER" && (
                    <div className="text-org-item-text bg-white/10 px-2 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider">
                      {stat.progress.toFixed(1)}%{" "}
                      <span className="tracking-normal">Used</span>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-5xl font-black text-white mb-2 tracking-tighter">
                    {stat.value}
                  </h3>
                  <p className="text-org-item-text text-sm mb-6 font-semibold uppercase tracking-widest">
                    {stat.label}
                  </p>

                  {/* Progress bar visual */}
                  {organization.role !== "MEMBER" && (
                    <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                      <div
                        className={`h-full rounded-full ${stat.progressBg} opacity-90 relative overflow-hidden`}
                        style={{ width: `${Math.ceil(stat.progress)}%` }}
                      >
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-8 w-full">
        {/* Role Specific Actions/Info */}
        <div className="space-y-8 w-full flex-1 flex flex-col col-span-1">
          {isOwnerOrAdmin ? (
            <>
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <ShieldCheck size={22} className="text-brand" />
                Quick Actions
              </h2>

              <div className="bg-org-card-bg/60 flex w-full backdrop-blur-xl border border-white/5 rounded-3xl p-3 gap-3 shadow-2xl shadow-black/20">
                {[
                  {
                    label: "Invite Member",
                    icon: UserPlus,
                    desc: "Add new user to org",
                    href: `/org/${organization.slug}/members`,
                  },
                  {
                    label: "Manage Roles",
                    icon: ShieldCheck,
                    desc: "Update permissions",
                    href: `/org/${organization.slug}/members`,
                  },
                  {
                    label: "Update Billing",
                    icon: CreditCard,
                    desc: "Change subscription",
                    href: `/org/${organization.slug}/billing`,
                  },
                ].map((action, i) => (
                  <Link
                    key={i}
                    href={action.href}
                    className="w-full flex-1 flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-neutral-400 group-hover:text-brand-hover group-hover:border-brand/20 group-hover:bg-brand/5 transition-all shadow-inner">
                      <action.icon size={22} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white group-hover:text-brand transition-colors">
                        {action.label}
                      </h4>
                      <p className="text-xs text-org-item-text font-medium mt-0.5">
                        {action.desc}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-neutral-600 group-hover:text-white transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
                    />
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <Users size={22} className="text-brand" />
                Your Role
              </h2>
              <div className="p-6 rounded-3xl bg-org-card-bg/60 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-linear-to-br from-brand/5 to-transparent opacity-50" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                      <Users size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white capitalize">
                        {organization.role.toLowerCase()}
                      </h4>
                      <p className="text-xs text-org-item-text font-medium uppercase tracking-wider">
                        Standard Access
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-org-item-text leading-relaxed font-medium">
                    You have access to contribute to assigned tasks and view
                    project's activity. For additional permissions, please
                    contact your administrator.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity / Audit Log (Restricted) */}
        {isOwnerOrAdmin && (
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Activity size={20} className="text-neutral-400" />
                Audit Log
              </h2>
              <Link
                href={`/org/${organization.slug}/logs`}
                className="text-xs text-brand hover:text-brand-hover font-medium"
              >
                View All
              </Link>
            </div>

            <div className="overflow-hidden p-2">
              <AuditLogList logs={recentLogs} isLoading={isLoading} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
