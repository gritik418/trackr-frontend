import React, { useState } from "react";
import { AuditLog } from "../../features/audit-logs/audit-logs.interface";
import { AuditLogItem } from "./AuditLogItem";

interface AuditLogTableProps {
  logs: AuditLog[];
  isLoading?: boolean;
}

export const AuditLogTable: React.FC<AuditLogTableProps> = ({
  logs,
  isLoading,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/5 bg-white/2">
            <th className="px-6 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
              User
            </th>
            <th className="px-6 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
              Action
            </th>
            <th className="px-6 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
              Entity Type
            </th>
            <th className="px-6 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] text-right">
              Timestamp
            </th>
            <th className="px-6 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] text-right">
              Security
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td className="px-6 py-6">
                  <div className="h-4 bg-white/5 rounded w-32" />
                </td>
                <td className="px-6 py-6">
                  <div className="h-4 bg-white/5 rounded w-24" />
                </td>
                <td className="px-6 py-6">
                  <div className="h-4 bg-white/5 rounded w-20" />
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
              <td colSpan={5} className="px-6 py-20 text-center">
                <div className="flex flex-col items-center gap-2 opacity-50">
                  <span className="text-sm text-neutral-400">
                    No events captured in this scope.
                  </span>
                </div>
              </td>
            </tr>
          ) : (
            logs.map((log) => (
              <AuditLogItem
                key={log.id}
                log={log}
                view="table"
                isExpanded={expandedId === log.id}
                onToggleExpand={() =>
                  setExpandedId(expandedId === log.id ? null : log.id)
                }
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
