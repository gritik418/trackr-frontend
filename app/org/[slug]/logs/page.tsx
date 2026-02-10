"use client";

import {
  Calendar,
  ChevronDown,
  Download,
  Filter,
  Search,
  ShieldAlert,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { useParams } from "next/navigation";
import {
  useGetAuditLogsQuery,
  useGetOrganizationDetailsQuery,
} from "@/features/organization/organization.api";
import { format } from "date-fns";

export default function OrgLogsPage() {
  const { slug } = useParams() as { slug: string };
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  const { data: orgData, isLoading: isOrgLoading } =
    useGetOrganizationDetailsQuery(slug);
  const orgId = orgData?.organization?.id;

  const {
    data: logsData,
    isLoading: isLogsLoading,
    isFetching,
    isError,
  } = useGetAuditLogsQuery(
    { orgId: orgId!, page, limit, search },
    { skip: !orgId },
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const isLoading = isOrgLoading || isLogsLoading;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500/50" />
        <p className="text-neutral-400">
          Failed to load audit logs. Please try again later.
        </p>
      </div>
    );
  }

  const logs = logsData?.logs || [];
  const totalLogs = logsData?.total || 0;
  const totalPages = Math.ceil(totalLogs / limit);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="relative z-10">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-white/60 tracking-tight">
          Audit Logs
        </h2>
        <p className="text-org-item-text mt-2 text-lg font-light">
          Monitor activity and security events across your organization.
        </p>
      </div>

      <div className="relative z-10 space-y-4">
        {/* Filters Toolbar */}
        <div className="p-1.5 bg-white/5 border border-white/5 rounded-2xl flex flex-col md:flex-row gap-2">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-2.5 text-neutral-500"
              size={16}
            />
            <input
              type="text"
              placeholder="Search logs..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 bg-transparent rounded-xl text-sm text-white placeholder:text-neutral-600 focus:outline-none transition-all"
            />
          </div>

          <div className="h-full w-px bg-white/10 hidden md:block my-1" />

          {/* Filter Actions */}
          <div className="flex items-center gap-2 px-1">
            <button className="px-3 py-2 flex items-center gap-2 text-sm text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              <Calendar size={16} />
              <span>Date Range</span>
              <ChevronDown size={14} className="opacity-50" />
            </button>
            <button className="px-3 py-2 flex items-center gap-2 text-sm text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              <Filter size={16} />
              <span>Event Type</span>
              <ChevronDown size={14} className="opacity-50" />
            </button>
            <button className="px-3 py-2 flex items-center gap-2 text-sm text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors ml-auto md:ml-0">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Logs Table */}
        <div className="rounded-3xl border border-white/5 bg-org-card-bg/60 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/20 relative">
          {isFetching && (
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-20 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-brand animate-spin" />
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/2">
                  <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Resource
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">
                    Date
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">
                    IP Address
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isLoading ? (
                  // Skeleton rows
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-6">
                        <div className="h-4 bg-white/5 rounded w-32" />
                      </td>
                      <td className="px-6 py-6">
                        <div className="h-4 bg-white/5 rounded w-48" />
                      </td>
                      <td className="px-6 py-6">
                        <div className="h-4 bg-white/5 rounded w-24" />
                      </td>
                      <td className="px-6 py-6">
                        <div className="h-4 bg-white/5 rounded w-24 ml-auto" />
                      </td>
                      <td className="px-6 py-6">
                        <div className="h-4 bg-white/5 rounded w-32 ml-auto" />
                      </td>
                    </tr>
                  ))
                ) : logs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-neutral-500 text-sm"
                    >
                      No audit logs found.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr
                      key={log.id}
                      className="group hover:bg-white/2 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 text-xs font-bold overflow-hidden shrink-0">
                            {log.user.avatarUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={log.user.avatarUrl}
                                alt={log.user.name}
                                className="w-full h-full object-cover"
                              />
                            ) : log.user.name === "System" ? (
                              <ShieldAlert size={14} />
                            ) : (
                              getInitials(log.user.name)
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-white">
                              {log.user.name}
                            </span>
                            <span className="text-[10px] text-neutral-500">
                              {log.user.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-neutral-300">
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <code className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-xs font-mono text-brand/80">
                          {log.resource}
                        </code>
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-neutral-500 font-mono">
                        {format(new Date(log.createdAt), "MMM d, yyyy h:mm a")}
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-neutral-600 font-mono">
                        {log.ipAddress}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!isLoading && logs.length > 0 && (
            <div className="p-4 border-t border-white/5 bg-white/2 flex justify-between items-center text-xs text-neutral-500">
              <span>
                Showing {(page - 1) * limit + 1} to{" "}
                {Math.min(page * limit, totalLogs)} of {totalLogs} events
              </span>
              <div className="flex gap-2">
                <button
                  disabled={page === 1 || isFetching}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-3 py-1.5 rounded-lg border border-white/5 hover:bg-white/5 disabled:opacity-50 transition-colors"
                >
                  Previous
                </button>
                <button
                  disabled={page >= totalPages || isFetching}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1.5 rounded-lg border border-white/5 hover:bg-white/5 disabled:opacity-50 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
