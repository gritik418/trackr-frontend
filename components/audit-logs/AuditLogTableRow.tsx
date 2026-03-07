import { format } from "date-fns";
import { Activity, Laptop, ShieldAlert } from "lucide-react";
import React from "react";
import {
  AuditEntityType,
  AuditLog,
} from "../../features/audit-logs/audit-logs.interface";
import {
  getActionUI,
  getEntityTypeUi,
  getHumanDescription,
} from "./AuditLogUtils";

interface AuditLogTableRowProps {
  log: AuditLog;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const AuditLogTableRow: React.FC<AuditLogTableRowProps> = ({
  log,
  isExpanded,
  onToggleExpand,
}) => {
  const { icon: ActionIcon } = getActionUI(log.action);
  const userInitials = getInitials(log.user?.name || "System");
  const description = getHumanDescription(log);

  return (
    <>
      <tr
        className="group hover:bg-white/2 transition-colors cursor-pointer"
        onClick={onToggleExpand}
      >
        <td className="px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 text-xs font-bold overflow-hidden shrink-0 shadow-inner">
              {log.user?.avatarUrl ? (
                <img
                  src={log.user.avatarUrl}
                  alt={log.user.name}
                  className="w-full h-full object-cover"
                />
              ) : log.user?.name === "System" ? (
                <ShieldAlert size={16} />
              ) : (
                userInitials
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white group-hover:text-brand transition-colors">
                {log.user?.name || "System"}
              </span>
              <span className="text-[10px] text-neutral-500 font-medium tracking-tight">
                {log.user?.email || "System Level Action"}
              </span>
            </div>
          </div>
        </td>
        <td className="px-6 py-5">
          <div className="flex flex-col gap-1">
            <div className="text-sm text-neutral-300 leading-relaxed">
              {description}
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-bold tracking-widest uppercase opacity-60`}
              >
                <ActionIcon size={8} />
                {log.action.split("_").pop()}
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-5">
          <div className="flex flex-col gap-1">
            <div className="text-sm text-neutral-300 leading-relaxed">
              {getEntityTypeUi(log.entityType as AuditEntityType)}
            </div>
          </div>
        </td>
        <td className="px-6 py-5 text-right">
          <div className="flex flex-col items-end">
            <span className="text-xs text-neutral-400 font-mono font-medium">
              {format(new Date(log.createdAt), "MMM d, HH:mm")}
            </span>
            <span className="text-[10px] text-neutral-600 font-mono">
              {format(new Date(log.createdAt), "ss")}s
            </span>
          </div>
        </td>

        <td className="py-5 pr-6 text-right">
          <div className="flex items-center justify-self-end gap-2 text-neutral-600">
            <div className="flex flex-col items-end justify-center">
              <span className="text-[10px] font-mono tracking-tight">
                {log.ipAddress}
              </span>
              <div className="flex items-center gap-1 opacity-40">
                <Laptop size={10} />
                <span className="text-[8px] font-bold uppercase text-slate-400 tracking-widest">
                  Secure
                </span>
              </div>
            </div>
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-white/1 w-full border-b border-white/5">
          <td
            colSpan={5}
            className="px-12 py-6 w-full animate-in slide-in-from-top-2 duration-300"
          >
            {/* Same expanded view as WorkspaceActivityItem could be used here or simplified */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <Activity size={12} className="text-brand" />
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
                    Raw Transaction Data
                  </span>
                </div>
                <pre className="text-[11px] p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-brand/80 overflow-x-auto shadow-2xl leading-relaxed">
                  {JSON.stringify(log.details, null, 2)}
                </pre>
              </div>
              <div className="lg:col-span-4 space-y-6">
                <div className="flex flex-col gap-4">
                  <div className="p-3 bg-white/2 border border-white/5 rounded-xl">
                    <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest block mb-1">
                      Resource ID
                    </span>
                    <code className="text-[10px] text-neutral-400 font-mono select-all">
                      {log.entityId}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
