"use client";

import {
  Calendar,
  ChevronDown,
  Download,
  Filter,
  Search,
  LayoutGrid,
  List as ListIcon,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import { useGetOrganizationDetailsQuery } from "@/features/organization/organization.api";
import { useGetOrgAuditLogsQuery } from "@/features/audit-logs/audit-logs.api";
import { AuditLogTable } from "@/components/audit-logs/AuditLogTable";
import { AuditLogList } from "@/components/audit-logs/AuditLogList";

export default function OrgLogsPage() {
  const { slug } = useParams() as { slug: string };
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"table" | "list">("table");
  const limit = 50;

  const { data: orgData, isLoading: isOrgLoading } =
    useGetOrganizationDetailsQuery(slug, {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    });
  const orgId = orgData?.organization?.id;

  const {
    data: logsData,
    isLoading: isLogsLoading,
    isFetching,
    isError,
  } = useGetOrgAuditLogsQuery(
    {
      orgId: orgId!,
      limit,
      page,
      search,
    },
    { skip: !orgId },
  );

  const isLoading = isOrgLoading || isLogsLoading;
  const logs = logsData?.logs || [];

  const groupedLogs = useMemo(() => {
    const groups: { [key: string]: typeof logs } = {};
    logs.forEach((log) => {
      const date = new Date(log.createdAt);
      let dateKey = format(date, "MMM d, yyyy");

      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      if (format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")) {
        dateKey = "Today";
      } else if (
        format(date, "yyyy-MM-dd") === format(yesterday, "yyyy-MM-dd")
      ) {
        dateKey = "Yesterday";
      }

      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(log);
    });
    return groups;
  }, [logs]);

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <div className="text-center">
          <h3 className="text-white font-semibold">Failed to load logs</h3>
          <p className="text-neutral-400 text-sm max-w-xs mx-auto mt-1">
            There was an issue synchronizing with the audit service. Please
            refresh page.
          </p>
        </div>
      </div>
    );
  }

  const totalLogs = logsData?.total || 0;
  const totalPages = Math.ceil(totalLogs / limit);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20 relative px-4 md:px-0">
      {/* Background Ambience */}
      <div className="fixed top-[-10%] right-[-10%] w-[800px] h-[800px] bg-brand/5 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* Header Section */}
      <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            <span className="text-[10px] uppercase font-bold text-brand tracking-[0.2em]">
              Security Protocol
            </span>
          </div>
          <h2 className="text-5xl font-extrabold text-white tracking-tighter">
            Audit Logs
          </h2>
          <p className="text-neutral-500 mt-2 text-lg font-light max-w-xl">
            Monitor and analyze security events across your organization.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-md">
          <button
            onClick={() => setView("table")}
            className={`p-2 rounded-lg transition-all ${view === "table" ? "bg-white text-black shadow-lg" : "text-neutral-500 hover:text-white"}`}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-lg transition-all ${view === "list" ? "bg-white text-black shadow-lg" : "text-neutral-500 hover:text-white"}`}
          >
            <ListIcon size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Advanced Toolbar */}
        <div className="p-3 bg-white/5 border border-white/5 rounded-2xl flex flex-col lg:flex-row gap-4 backdrop-blur-xl">
          <div className="relative flex-1 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-brand transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by action, user, or details..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-11 pr-4 py-3 bg-black/20 rounded-xl text-sm text-white border border-transparent focus:border-brand/30 focus:outline-none transition-all placeholder:text-neutral-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button className="px-4 py-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all">
              <Calendar size={14} className="text-brand" />
              <span>History</span>
              <ChevronDown size={14} className="opacity-30" />
            </button>
            <div className="w-px h-8 bg-white/10 mx-1 hidden lg:block" />
            <button className="p-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all">
              <Filter size={16} />
            </button>
            <button className="px-4 py-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white bg-brand/10 hover:bg-brand/20 border border-brand/20 rounded-xl transition-all ml-auto">
              <Download size={16} className="text-brand" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative">
          {isFetching && (
            <div className="absolute top-0 right-0 p-4 z-30">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <Loader2 className="w-3 h-3 text-brand animate-spin" />
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
                  Syncing
                </span>
              </div>
            </div>
          )}

          <div
            className={`transition-all duration-500 ${isFetching ? "opacity-60 grayscale-[0.5]" : "opacity-100"} space-y-12`}
          >
            {isLoading ? (
              view === "table" ? (
                <div className="rounded-3xl border border-white/5 bg-org-card-bg/60 backdrop-blur-xl overflow-hidden shadow-2xl">
                  <AuditLogTable logs={[]} isLoading={true} />
                </div>
              ) : (
                <AuditLogList logs={[]} isLoading={true} />
              )
            ) : logs.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-3xl bg-white/2">
                <span className="text-sm text-neutral-500 font-medium">
                  No activity matching your search criteria.
                </span>
              </div>
            ) : (
              Object.entries(groupedLogs).map(([date, items]) => (
                <div key={date} className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-600 whitespace-nowrap">
                      {date}
                    </span>
                    <div className="h-px w-full bg-linear-to-r from-white/5 to-transparent" />
                  </div>
                  {view === "table" ? (
                    <div className="rounded-3xl border border-white/5 bg-org-card-bg/60 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/40">
                      <AuditLogTable logs={items} isLoading={false} />
                    </div>
                  ) : (
                    <AuditLogList logs={items} isLoading={false} />
                  )}
                </div>
              ))
            )}
          </div>

          {/* Premium Pagination */}
          {!isLoading && logs.length > 0 && (
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-white/2 p-4 rounded-3xl border border-white/5">
              <div className="flex items-center gap-4">
                <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                  Page {page} of {totalPages}
                </div>
                <span className="text-[10px] text-neutral-600 font-medium uppercase tracking-tighter">
                  Total {totalLogs} events found
                </span>
              </div>

              <div className="flex items-center gap-1.5 p-1 bg-black/20 rounded-xl border border-white/5">
                <button
                  disabled={page === 1 || isFetching}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white disabled:opacity-30 disabled:hover:text-neutral-400 transition-colors"
                >
                  Back
                </button>
                <div className="w-px h-4 bg-white/10" />
                <button
                  disabled={page >= totalPages || isFetching}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-brand hover:text-brand-light disabled:opacity-30 disabled:text-neutral-400 transition-colors"
                >
                  Forward
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
