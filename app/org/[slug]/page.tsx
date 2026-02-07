"use client";
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
import { useSelector } from "react-redux";

export default function OrgDashboardPage() {
  const organization = useSelector(selectOrganization);
  const stats = [
    {
      label: "Total Members",
      value: "24",
      change: "+12% this month",
      trend: "up",
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20",
      progress: 75,
    },
    {
      label: "Active Workspaces",
      value: "8",
      change: "2 new this week",
      trend: "up",
      icon: Building2,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/20",
      progress: 40,
    },
    {
      label: "Storage Used",
      value: "1.2 TB",
      change: "85% of quota",
      trend: "warning",
      icon: Activity,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      border: "border-amber-400/20",
      progress: 85,
    },
  ];

  const activities = [
    {
      user: "Sarah Connor",
      action: "invited",
      target: "Kyle Reese",
      time: "2 mins ago",
    },
    {
      user: "John Doe",
      action: "created workspace",
      target: "Q4 Marketing",
      time: "1 hour ago",
    },
    {
      user: "Admin",
      action: "updated settings",
      target: "Billing Cycle",
      time: "3 hours ago",
    },
    {
      user: "System",
      action: "generated invoice",
      target: "#INV-2024-001",
      time: "1 day ago",
    },
  ];

  if (!organization) return null;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            Organization Overview
          </h1>
          <p className="text-neutral-400">
            Manage your organization's global configuration and state.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/org/${organization.slug}/workspaces/new`}
            className="px-4 py-2 bg-brand text-bg-dark-0 rounded-xl text-sm font-bold hover:bg-brand-hover transition-colors flex items-center gap-2"
          >
            <Plus size={16} />
            New Workspace
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl bg-bg-dark-1 border ${stat.border} relative overflow-hidden group hover:border-brand/30 transition-all duration-300`}
          >
            <div
              className={`absolute top-0 right-0 p-24 ${stat.bg} filter blur-[60px] opacity-10 rounded-full translate-x-10 -translate-y-10 group-hover:opacity-20 transition-opacity`}
            ></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.border} border flex items-center justify-center`}
                >
                  <stat.icon size={24} className={stat.color} />
                </div>
                <div
                  className={`text-xs font-semibold px-2 py-1 rounded-lg ${stat.bg} ${stat.color} border ${stat.border} flex items-center gap-1`}
                >
                  {stat.trend === "up" && <ArrowUpRight size={12} />}
                  {stat.change}
                </div>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-neutral-400 text-sm font-medium mb-4">
                  {stat.label}
                </p>

                {/* Progress bar visual */}
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${stat.bg.replace("/10", "")} opacity-80`}
                    style={{ width: `${stat.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity size={20} className="text-neutral-400" />
              Audit Log
            </h2>
            <Link
              href={`/org/${organization.slug}/settings`}
              className="text-xs text-brand hover:text-brand-hover font-medium"
            >
              View All
            </Link>
          </div>

          <div className="bg-bg-dark-1 border border-white/5 rounded-2xl overflow-hidden">
            {activities.map((item, i) => (
              <div
                key={i}
                className="p-4 border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-linear-to-tr from-neutral-700 to-neutral-600 border border-white/10 flex items-center justify-center text-xs font-bold text-white">
                    {item.user.charAt(0)}
                  </div>
                  <div className="text-sm">
                    <span className="text-white font-medium hover:text-brand transition-colors cursor-pointer">
                      {item.user}
                    </span>
                    <span className="text-neutral-500 mx-1">{item.action}</span>
                    <span className="text-white font-medium">
                      {item.target}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-neutral-500 font-mono group-hover:text-neutral-400 transition-colors">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck size={20} className="text-neutral-400" />
            Quick Actions
          </h2>

          <div className="bg-bg-dark-1 border border-white/5 rounded-2xl p-2 space-y-1">
            {[
              {
                label: "Invite Member",
                icon: UserPlus,
                desc: "Add new user to org",
              },
              {
                label: "Manage Roles",
                icon: ShieldCheck,
                desc: "Update permissions",
              },
              {
                label: "Update Billing",
                icon: CreditCard,
                desc: "Change subscription",
              },
            ].map((action, i) => (
              <button
                key={i}
                className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:border-white/10 transition-all">
                  <action.icon size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-white group-hover:text-brand transition-colors">
                    {action.label}
                  </h4>
                  <p className="text-xs text-neutral-500">{action.desc}</p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-neutral-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
                />
              </button>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-linear-to-br from-brand/10 to-brand-secondary/5 border border-brand/10">
            <h3 className="text-brand font-bold mb-2 text-sm">Pro Tip</h3>
            <p className="text-xs text-brand/80 leading-relaxed">
              You can configure SSO for your organization in Settings to
              automate member access control.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
