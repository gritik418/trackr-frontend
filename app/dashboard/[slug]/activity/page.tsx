"use client";

import { Calendar, Filter } from "lucide-react";
import { useParams } from "next/navigation";
import { useGetWorkspaceDetailsQuery } from "@/features/workspace/workspace.api";
import { useGetWorkspaceAuditLogsQuery } from "@/features/audit-logs/audit-logs.api";
import {
  getActionUI,
  getHumanDescription,
} from "@/components/audit-logs/AuditLogItem";
import { formatDistanceToNow } from "date-fns";
import { AuditLog } from "@/features/audit-logs/audit-logs.interface";
import { ShieldAlert } from "lucide-react";

export default function WorkspaceActivityPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { data: workspaceData, isLoading: isWorkspaceLoading } =
    useGetWorkspaceDetailsQuery(slug, {
      skip: !slug,
    });

  const workspaceId = workspaceData?.workspace?.id;
  const orgId = workspaceData?.workspace?.organizationId;

  const { data: auditData, isLoading: isAuditLoading } =
    useGetWorkspaceAuditLogsQuery(
      { orgId: orgId!, workspaceId: workspaceId! },
      { skip: !orgId || !workspaceId },
    );

  const isLoading = isWorkspaceLoading || isAuditLoading;
  const logs = auditData?.logs || [];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto py-8 animate-pulse">
        <div className="h-10 w-48 bg-white/5 rounded-lg mb-4" />
        <div className="h-6 w-96 bg-white/5 rounded-lg mb-10" />
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-white/5" />
              <div className="flex-1 h-24 bg-white/5 rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-white/60 tracking-tight">
            Activity Feed
          </h2>
          <p className="text-neutral-400 mt-2 text-lg font-light">
            Stay updated with what&apos;s happening in your workspace.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-sm font-medium transition-colors text-neutral-300">
          <Filter size={16} />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Timeline */}
        <div className="lg:col-span-2 relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-4 bottom-4 w-px bg-linear-to-b from-white/10 via-white/5 to-transparent z-0" />

          {logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <Calendar size={40} className="text-neutral-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No activity yet
              </h3>
              <p className="text-neutral-500 max-w-xs">
                Actions taken in this workspace will appear here in
                chronological order.
              </p>
            </div>
          ) : (
            <div className="space-y-8 relative z-10">
              {logs.map((log: AuditLog) => {
                const { color: actionColor, icon: ActionIcon } = getActionUI(
                  log.action,
                );
                const userInitials = getInitials(log.user?.name || "System");
                const description = getHumanDescription(log);

                return (
                  <div key={log.id} className="group relative flex gap-6">
                    {/* Icon Marker */}
                    <div
                      className={`shrink-0 w-12 h-12 rounded-full border flex items-center justify-center shadow-[0_0_15px_-3px_rgba(0,0,0,0.3)] bg-dashboard-bg z-10 ${actionColor}`}
                    >
                      <ActionIcon size={20} />
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 bg-dashboard-card-bg/40 border border-white/5 rounded-2xl p-5 hover:bg-dashboard-card-bg/60 hover:border-white/10 transition-all duration-300 group-hover:translate-x-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-bold text-white overflow-hidden bg-white/5`}
                          >
                            {log.user?.avatarUrl ? (
                              <img
                                src={log.user.avatarUrl}
                                alt={log.user.name}
                                className="w-full h-full object-cover"
                              />
                            ) : log.user?.name === "System" ? (
                              <ShieldAlert
                                size={14}
                                className="text-brand/80"
                              />
                            ) : (
                              userInitials
                            )}
                          </div>
                          <div className="text-sm font-semibold text-white">
                            {log.user?.name || "System"}
                          </div>
                        </div>
                        <span className="text-[10px] text-neutral-500 whitespace-nowrap font-mono">
                          {formatDistanceToNow(new Date(log.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>

                      <div className="text-sm text-neutral-300 leading-relaxed">
                        {description}
                      </div>

                      <div className="mt-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-bold tracking-widest uppercase text-neutral-500">
                          {log.entityType.replace(/_/g, " ")}
                        </div>
                        <div className="w-1 h-1 rounded-full bg-neutral-800" />
                        <div
                          className={`text-[9px] font-bold uppercase tracking-widest ${actionColor.split(" ")[0]}`}
                        >
                          {log.action.split("_").pop()}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar Stats */}
        <div className="hidden lg:block space-y-6">
          <div className="bg-dashboard-card-bg/30 border border-white/5 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-6">
              Workspace Overview
            </h3>

            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-white/2 border border-white/5">
                <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest block mb-1">
                  Total Events
                </span>
                <span className="text-2xl font-bold text-white">
                  {auditData?.total || 0}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white/2 border border-white/5">
                <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest block mb-1">
                  Active Entity
                </span>
                <span className="text-sm font-medium text-neutral-300">
                  {workspaceData?.workspace?.name}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-brand/10 to-transparent border border-brand/10 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand/10 rounded-xl text-brand">
                <Calendar size={20} />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">Next Step</h4>
                <p className="text-sm text-neutral-400 mt-1">
                  Keep track of all changes in real-time with the activity feed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
