"use client";

import { WorkspaceActivityItem } from "@/components/audit-logs/workspace/WorkspaceActivityItem";
import AuditLogsPagination from "@/components/audit-logs/AuditLogsPagination";
import { useGetWorkspaceAuditLogsQuery } from "@/features/audit-logs/audit-logs.api";
import { AuditLog } from "@/features/audit-logs/audit-logs.interface";
import { useGetWorkspaceDetailsQuery } from "@/features/workspace/workspace.api";
import { Calendar, Filter, Loader2, Sparkles } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ActivityStats } from "@/components/audit-logs/ActivityStats";
import { TopContributors } from "@/components/audit-logs/TopContributors";

export default function WorkspaceActivityPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { data: workspaceData, isLoading: isWorkspaceLoading } =
    useGetWorkspaceDetailsQuery(slug, {
      skip: !slug,
    });

  const workspaceId = workspaceData?.workspace?.id;
  const orgId = workspaceData?.workspace?.organizationId;

  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const limit = 10;

  const {
    data: auditData,
    isLoading: isAuditLoading,
    isFetching,
  } = useGetWorkspaceAuditLogsQuery(
    {
      orgId: orgId!,
      workspaceId: workspaceId!,
      page,
      limit,
    },
    { skip: !orgId || !workspaceId, refetchOnMountOrArgChange: true },
  );

  const isLoading = isWorkspaceLoading || isAuditLoading;
  const logs = auditData?.logs || [];
  const totalLogs = auditData?.pagination?.total || 0;
  const totalPages = auditData?.pagination?.totalPages || 0;

  useEffect(() => {
    setPage(1);
  }, [slug, workspaceId]);

  if (isLoading) {
    return (
      <div className="mx-auto py-8 animate-pulse">
        <div className="h-10 w-48 bg-white/5 rounded-lg mb-4" />
        <div className="h-6 w-96 bg-white/5 rounded-lg mb-12" />
        <div className="grid grid-cols-4 gap-4 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-white/5 rounded-3xl" />
          ))}
        </div>
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5" />
              <div className="flex-1 h-24 bg-white/5 rounded-3xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto py-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="px-2 py-0.5 rounded-full bg-brand/10 border border-brand/20 flex items-center gap-1.5">
              <Sparkles size={10} className="text-brand" />
              <span className="text-[9px] font-black text-brand uppercase tracking-[0.2em]">
                Live Feed
              </span>
            </div>
            {isFetching && (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/5 animate-pulse">
                <Loader2 size={10} className="text-brand animate-spin" />
                <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
                  Updating
                </span>
              </div>
            )}
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight leading-none">
            Workspace <span className="text-neutral-500">Activity</span>
          </h1>
          <p className="text-neutral-500 text-sm font-medium">
            Real-time synchronization for{" "}
            <span className="text-white font-bold">
              {workspaceData?.workspace?.name}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white/2 hover:bg-white/5 border border-white/5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all text-neutral-400 hover:text-white active:scale-95 group">
            <Filter
              size={14}
              className="group-hover:text-brand transition-colors"
            />
            Advanced Filter
          </button>
        </div>
      </div>

      {/* Quick Stats Header */}
      <ActivityStats totalEvents={totalLogs} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Timeline */}
        <div className="lg:col-span-3 relative">
          {/* Vertical Line Visual */}
          <div className="absolute left-6 top-8 bottom-8 w-px bg-linear-to-b from-brand/40 via-white/10 to-transparent opacity-30 z-0" />

          {logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center bg-white/1 border border-dashed border-white/5 rounded-[3rem]">
              <div className="w-24 h-24 rounded-full bg-white/2 flex items-center justify-center mb-6 border border-white/5 shadow-inner">
                <Calendar size={48} className="text-neutral-700" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">
                No activity recorded
              </h3>
              <p className="text-neutral-500 max-w-xs text-sm">
                Activity logs will appear here as your team starts working in
                this workspace.
              </p>
            </div>
          ) : (
            <div className="space-y-6 relative z-10">
              {logs.map((log: AuditLog) => (
                <WorkspaceActivityItem
                  key={log.id}
                  log={log}
                  isExpanded={expandedId === log.id}
                  onToggleExpand={() =>
                    setExpandedId(expandedId === log.id ? null : log.id)
                  }
                />
              ))}
            </div>
          )}

          {!isLoading && logs.length > 0 && (
            <div className="mt-12 flex w-full justify-center">
              <AuditLogsPagination
                logs={logs}
                totalLogs={totalLogs}
                page={page}
                setPage={setPage}
                isFetching={isFetching}
                totalPages={totalPages}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
