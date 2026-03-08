"use client";

import { useGetWorkspaceAuditLogsQuery } from "@/features/audit-logs/audit-logs.api";
import { motion } from "framer-motion";
import {
  Plus,
  CheckCircle2,
  UserPlus,
  Settings,
  Clock,
  Trash2,
  Edit3,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Props {
  workspaceId: string;
  orgId: string;
}

const getActionIcon = (action: string) => {
  const a = action.toLowerCase();
  if (a.includes("create")) return <Plus size={12} />;
  if (a.includes("complete") || a.includes("done"))
    return <CheckCircle2 size={12} />;
  if (a.includes("add") || a.includes("member") || a.includes("invite"))
    return <UserPlus size={12} />;
  if (a.includes("update") || a.includes("edit")) return <Edit3 size={12} />;
  if (a.includes("delete") || a.includes("remove")) return <Trash2 size={12} />;
  return <Settings size={12} />;
};

const getActionColor = (action: string) => {
  const a = action.toLowerCase();
  if (a.includes("create")) return "text-emerald-400 bg-emerald-400/10";
  if (a.includes("complete") || a.includes("done"))
    return "text-blue-400 bg-blue-400/10";
  if (a.includes("delete") || a.includes("remove"))
    return "text-red-400 bg-red-400/10";
  return "text-brand bg-brand/10";
};

export default function DashboardRecentActivity({ workspaceId, orgId }: Props) {
  const { data, isLoading } = useGetWorkspaceAuditLogsQuery({
    workspaceId,
    orgId,
    limit: 6,
  });

  if (isLoading) {
    return (
      <div className="p-8 rounded-[40px] bg-dashboard-card-bg/40 border border-white/5 animate-pulse h-[450px]" />
    );
  }

  const logs = data?.logs || [];

  return (
    <div className="p-8 rounded-[40px] bg-dashboard-card-bg/40 border border-white/5 relative overflow-hidden flex flex-col h-full group">
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 blur-[80px] -ml-16 -mt-16 opacity-50" />

      <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          Recent Activity
        </div>
        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-neutral-400">
          Live Feed
        </span>
      </h4>

      <div className="relative flex-1">
        {/* Ladder Line */}
        <div className="absolute left-[19px] top-2 bottom-4 w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent" />

        <div className="space-y-8 relative">
          {logs.length > 0 ? (
            logs.map((log, idx) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-5 items-start relative group/item"
              >
                {/* Avatar / Icon Container */}
                <div className="relative z-10">
                  {log.user?.avatarUrl ? (
                    <img
                      src={log.user.avatarUrl}
                      alt={log.user.name}
                      className="w-10 h-10 rounded-2xl border border-white/10 object-cover shadow-2xl group-hover/item:scale-110 transition-transform"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-2xl bg-dashboard-card-bg border border-white/10 flex items-center justify-center text-xs font-bold text-white shadow-2xl group-hover/item:scale-110 transition-transform">
                      {log.user?.name
                        ? log.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : "S"}
                    </div>
                  )}
                  {/* Small Action Icon Badge */}
                  <div
                    className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-lg border-2 border-neutral-900 flex items-center justify-center shadow-lg ${getActionColor(log.action)}`}
                  >
                    {getActionIcon(log.action)}
                  </div>
                </div>

                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-white truncate pr-4 group-hover/item:text-brand transition-colors">
                      {log.user?.name || "System"}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Clock size={10} className="text-neutral-600" />
                      <span className="text-[10px] text-neutral-600 font-bold uppercase tracking-tighter tabular-nums">
                        {formatDistanceToNow(new Date(log.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-400 font-medium leading-relaxed">
                    {log.action.toLowerCase().replace(/_/g, " ")}{" "}
                    <span className="text-white/80 font-bold">
                      {log.entityType.toLowerCase()}
                    </span>
                    {log.metadata?.title && (
                      <>
                        :{" "}
                        <span className="text-brand/80">
                          {log.metadata.title}
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-20 text-center">
              <p className="text-sm text-neutral-600 font-bold uppercase tracking-widest">
                No activity yet
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10">
        <button className="w-full py-3 text-[10px] font-bold text-neutral-500 hover:text-white transition-colors uppercase tracking-widest border border-dashed border-white/5 rounded-2xl hover:border-white/20 hover:bg-white/5">
          View all logs
        </button>
      </div>
    </div>
  );
}
