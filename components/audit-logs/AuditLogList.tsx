import React, { useState } from "react";
import { AuditLog } from "../../features/audit-logs/audit-logs.interface";
import { AuditLogItem } from "./AuditLogItem";

interface AuditLogListProps {
  logs: AuditLog[];
  isLoading?: boolean;
}

export const AuditLogList: React.FC<AuditLogListProps> = ({
  logs,
  isLoading,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-24 bg-white/5 rounded-2xl animate-pulse border border-white/5"
          />
        ))}
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-3xl bg-white/2">
        <span className="text-sm text-neutral-500 font-medium">
          No activity recorded yet.
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {logs.map((log) => (
        <AuditLogItem
          key={log.id}
          log={log}
          view="list"
          isExpanded={expandedId === log.id}
          onToggleExpand={() =>
            setExpandedId(expandedId === log.id ? null : log.id)
          }
        />
      ))}
    </div>
  );
};
