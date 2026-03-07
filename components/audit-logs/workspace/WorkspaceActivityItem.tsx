import { format } from "date-fns";
import {
  ChevronRight,
  Edit,
  Globe,
  Laptop,
  MessageSquare,
  Search,
  Settings,
  ShieldAlert,
  Users,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { FaSuitcase, FaTasks } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import {
  AuditAction,
  AuditLog,
} from "../../../features/audit-logs/audit-logs.interface";

import { getActionUI, getHumanDescription } from "../AuditLogUtils";

interface WorkspaceActivityItemProps {
  log: AuditLog;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export const getEntityIcon = (type: string) => {
  const t = type.toUpperCase();
  if (t.includes("MEMBER")) return Users;
  if (t.includes("ORG")) return Settings;
  if (t.includes("WORKSPACE")) return Globe;
  if (t.includes("COMMENT")) return MessageSquare;
  if (t.includes("TASK")) return FaTasks;
  if (t.includes("PROJECT")) return FaSuitcase;
  return Search;
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const DiffComponent: React.FC<{ log: AuditLog }> = ({ log }) => {
  const { action, details: d, previousState: p, previousAssignees: pa } = log;

  // For TASK_UPDATE
  if (action === AuditAction.TASK_UPDATE && p) {
    const changes = Object.entries(d).filter(([key, value]) => {
      if (key === "updatedBy" || key === "previousState") return false;
      return String(value) !== String(p[key]);
    });

    if (changes.length === 0) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3 px-1">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
          <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-[0.3em]">
            Detailed Modifications
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {changes.map(([key, value], idx) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 rounded-4xl bg-white/2 border border-white/5 flex flex-col gap-4 group/diff hover:border-white/10 transition-all duration-300 shadow-inner"
            >
              <span className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em] group-hover/diff:text-neutral-400 transition-colors">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </span>
              <div className="flex items-center gap-4">
                <div className="flex-1 px-4 py-3 rounded-2xl bg-rose-500/5 border border-rose-500/10 text-xs text-rose-400/80 line-through truncate font-medium relative group-hover/diff:bg-rose-500/10 transition-colors">
                  {String(p[key] || "None")}
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                  <ChevronRight size={14} className="text-neutral-600" />
                </div>
                <div className="flex-1 px-4 py-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-xs text-emerald-400 font-black truncate relative group-hover/diff:bg-emerald-500/10 transition-colors shadow-sm">
                  {String(value)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // For TASK_ASSIGN / UNASSIGN
  if (
    (action === AuditAction.TASK_ASSIGN ||
      action === AuditAction.TASK_UNASSIGN) &&
    pa
  ) {
    const isAssign = action === AuditAction.TASK_ASSIGN;
    const currentAssignees =
      log.details.assignedTo || log.details.unassignedFrom || [];

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3 px-1">
          <div className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.5)]" />
          <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-[0.3em]">
            Resource Allocation Shift
          </span>
        </div>
        <div className="flex flex-col lg:flex-row items-stretch gap-6">
          <div className="flex-1 p-6 rounded-[2.5rem] bg-white/2 border border-white/5 flex flex-col items-center gap-5 group/team hover:bg-white/3 transition-all">
            <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest group-hover/team:text-neutral-500">
              Legacy Team
            </span>
            <div className="flex flex-wrap justify-center gap-3">
              {pa.map((u: any, idx: number) => (
                <motion.div
                  key={u.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0.4, scale: 1 }}
                  whileHover={{
                    opacity: 1,
                    scale: 1.1,
                    filter: "grayscale(0%)",
                  }}
                  className="w-10 h-10 rounded-2xl border border-white/10 overflow-hidden grayscale transition-all shadow-lg"
                  title={u.name}
                >
                  {u.avatarUrl ? (
                    <img
                      src={u.avatarUrl}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5 text-xs font-black text-neutral-400">
                      {u.name[0]}
                    </div>
                  )}
                </motion.div>
              ))}
              {pa.length === 0 && (
                <span className="text-xs text-neutral-700 italic font-medium py-2">
                  No prior assignees recorded
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-2xl"
            >
              <ChevronRight size={24} className="text-brand" strokeWidth={3} />
            </motion.div>
          </div>

          <div
            className={`flex-1 p-6 rounded-[2.5rem] border flex flex-col items-center gap-5 transition-all duration-500 ${isAssign ? "bg-emerald-500/5 border-emerald-500/10 hover:bg-emerald-500/10" : "bg-rose-500/5 border-rose-500/10 hover:bg-rose-500/10"}`}
          >
            <span
              className={`text-[10px] font-black uppercase tracking-widest ${isAssign ? "text-emerald-500" : "text-rose-500"}`}
            >
              {isAssign ? "Newly Inducted" : "Members Withdrawn"}
            </span>
            <div className="flex flex-wrap justify-center gap-3">
              {currentAssignees.map((u: any, idx: number) => (
                <motion.div
                  key={u.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex items-center gap-3 px-4 py-2 rounded-2xl border shadow-sm ${isAssign ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-rose-500/10 border-rose-500/20 text-rose-400"}`}
                >
                  <div className="w-6 h-6 rounded-lg overflow-hidden border border-white/10 shrink-0">
                    {u.avatarUrl ? (
                      <img
                        src={u.avatarUrl}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-white/10 text-[8px] font-black">
                        {u.name[0]}
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-black tracking-tight">
                    {u.name}
                  </span>
                </motion.div>
              ))}
              {currentAssignees.length === 0 && (
                <span className="text-xs text-neutral-700 italic font-medium py-2">
                  Standard protocol execution
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
};

export const WorkspaceActivityItem: React.FC<WorkspaceActivityItemProps> = ({
  log,
  isExpanded,
  onToggleExpand,
}) => {
  const { color: actionColor, icon: ActionIcon } = getActionUI(log.action);
  const EntityIcon = getEntityIcon(log.entityType);
  const userInitials = getInitials(log.user?.name || "System");
  const description = getHumanDescription(log);

  return (
    <motion.div
      layout
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className={`group relative p-6 bg-white/2 hover:bg-white/4 border border-white/5 rounded-[2.5rem] transition-all duration-700 cursor-pointer overflow-hidden ${isExpanded ? "ring-2 ring-brand/30 bg-white/5 shadow-[0_40px_80px_rgba(0,0,0,0.6)] scale-[1.02] z-50" : "hover:border-white/10 hover:translate-x-1"}`}
      onClick={onToggleExpand}
    >
      {/* Dynamic Background Accents */}
      <div
        className={`absolute -top-32 -right-32 w-64 h-64 blur-[120px] pointer-events-none transition-opacity duration-1000 ${isExpanded ? "bg-brand/15 opacity-100" : "bg-brand/5 opacity-0 group-hover:opacity-100"}`}
      />
      <div
        className={`absolute -bottom-32 -left-32 w-64 h-64 blur-[120px] pointer-events-none transition-opacity duration-1000 ${isExpanded ? "bg-blue-500/15 opacity-100" : "bg-blue-500/5 opacity-0 group-hover:opacity-40"}`}
      />

      <motion.div
        layout="position"
        className="flex items-start justify-between gap-8 relative z-10"
      >
        <div className="flex items-center gap-6">
          <div className="relative shrink-0">
            <motion.div
              layoutId={`avatar-${log.id}`}
              className="w-14 h-14 rounded-2xl bg-linear-to-br from-white/10 via-white/5 to-transparent border border-white/10 flex items-center justify-center text-neutral-400 text-sm font-bold shadow-2xl overflow-hidden group-hover:border-white/20 transition-colors"
            >
              {log.user?.avatarUrl ? (
                <Image
                  height={56}
                  width={56}
                  src={log.user.avatarUrl}
                  alt={log.user.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : log.user?.name === "System" ? (
                <ShieldAlert
                  size={28}
                  className="text-brand/80 animate-pulse"
                />
              ) : (
                <span className="text-lg tracking-tight">{userInitials}</span>
              )}
            </motion.div>
            {/* Action Badge on Avatar */}
            <motion.div
              layoutId={`badge-${log.id}`}
              className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-lg ${actionColor} flex items-center justify-center border-2 border-[#0A0A0B] shadow-lg scale-90 group-hover:scale-100 transition-transform`}
            >
              <ActionIcon size={12} strokeWidth={3} />
            </motion.div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-lg font-black text-white leading-none tracking-tight">
                {log.user?.name || "System"}
              </span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/5 shadow-sm">
                <span className="text-[9px] text-neutral-500 font-black uppercase tracking-widest">
                  {format(new Date(log.createdAt), "HH:mm:ss")}
                </span>
              </div>
            </div>
            <div className="text-[15px] text-neutral-400 leading-snug font-medium max-w-2xl group-hover:text-neutral-300 transition-colors">
              {description}
            </div>

            <AnimatePresence>
              {!isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex items-center gap-4 mt-3"
                >
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 bg-white/5 px-3 py-1 rounded-lg border border-white/5 shadow-sm">
                    <EntityIcon size={12} className="text-brand/60" />
                    {log.entityType.replace(/_/g, " ")}
                  </div>
                  <div
                    className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] ${actionColor.split(" ")[0]} bg-white/5 px-3 py-1 rounded-lg border border-white/5 shadow-sm`}
                  >
                    <ActionIcon size={12} />
                    {log.action.split("_").pop()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 shrink-0">
          <div className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/5 text-[10px] text-brand/60 font-mono font-bold tracking-wider shadow-inner group-hover:border-brand/20 transition-colors">
            {log.ipAddress}
          </div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isExpanded ? "bg-brand/20 text-brand rotate-90 shadow-[0_0_15px_rgba(var(--brand-rgb),0.3)]" : "bg-white/5 text-neutral-700 group-hover:text-neutral-400 group-hover:bg-white/10"}`}
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 32 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="pt-8 border-t border-white/10 space-y-12 overflow-hidden"
          >
            {/* New Sophisticated Diff Component */}
            <div className="relative">
              <div className="absolute inset-0 bg-brand/5 blur-3xl rounded-full opacity-30 pointer-events-none" />
              <DiffComponent log={log} />
            </div>

            {/* Standard Details Section (Hidden if Diff is active and comprehensive) */}
            {!log.previousState &&
              Object.keys(log.details || {}).length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {Object.entries(log.details).map(
                    ([key, value]: [string, any], idx) => {
                      if (typeof value === "object" && value !== null)
                        return null;
                      if (
                        key === "id" ||
                        key === "userId" ||
                        key === "workspaceId" ||
                        key === "updatedBy"
                      )
                        return null;

                      return (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="group/item p-5 rounded-4xl bg-white/3 border border-white/5 hover:border-brand/20 transition-all duration-500 flex flex-col gap-2 shadow-inner"
                        >
                          <span className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] group-hover/item:text-brand transition-colors">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                          <span className="text-sm font-bold text-white/90 break-all leading-tight">
                            {String(value)}
                          </span>
                        </motion.div>
                      );
                    },
                  )}
                </div>
              )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand shadow-[0_0_15px_rgba(var(--brand-rgb),0.6)]" />
                  <span className="text-[11px] uppercase font-black text-white/40 tracking-[0.4em]">
                    Atomic Transaction State
                  </span>
                </div>
                <div className="relative group/ledger">
                  <div className="absolute -inset-1 bg-linear-to-r from-brand/10 to-blue-500/10 rounded-[2.5rem] blur opacity-25 group-hover/ledger:opacity-40 transition-opacity" />
                  <pre className="relative text-[11px] p-8 rounded-[2.5rem] bg-[#0A0A0B]/80 backdrop-blur-2xl border border-white/10 font-mono text-brand/90 overflow-x-auto max-h-[350px] shadow-2xl leading-relaxed scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {JSON.stringify(log.details, null, 2)}
                  </pre>
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div className="p-8 rounded-[3rem] bg-linear-to-br from-white/3 to-transparent border border-white/10 shadow-2xl relative overflow-hidden group/origin">
                  <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand/10 blur-3xl group-hover/origin:bg-brand/20 transition-colors" />
                  <div className="flex items-center gap-4 mb-8 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center shadow-lg">
                      <Laptop size={22} className="text-brand" />
                    </div>
                    <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">
                      Origin Verification
                    </span>
                  </div>
                  <div className="space-y-8 relative z-10">
                    <div className="flex flex-col gap-3">
                      <span className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em]">
                        Endpoint Agent String
                      </span>
                      <p className="text-xs text-neutral-400 leading-relaxed font-mono break-all bg-black/40 p-5 rounded-2xl border border-white/5 opacity-90 shadow-inner">
                        {log.userAgent}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-8 border-t border-white/5">
                      <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em]">
                          Transmission IP
                        </span>
                        <code className="text-15px text-brand font-black font-mono tracking-tight shadow-[0_0_20px_rgba(var(--brand-rgb),0.1)]">
                          {log.ipAddress}
                        </code>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em]">
                          Temporal Marker
                        </span>
                        <span className="text-15px text-white font-black font-mono tracking-tight">
                          {format(new Date(log.createdAt), "MMM d, HH:mm:ss")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-8 bg-white/2 rounded-4xl border border-white/5 hover:border-white/10 hover:bg-white/4 transition-all group/entity shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-brand-cyan/5 blur-2xl group-hover/entity:bg-brand-cyan/10 transition-colors" />
                    <span className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] block mb-4 group-hover/entity:text-brand-cyan transition-colors">
                      Entity Trace
                    </span>
                    <code className="text-[11px] text-neutral-500 font-mono select-all truncate block bg-black/40 p-3 rounded-xl border border-white/5 group-hover/entity:text-neutral-300 transition-colors">
                      {log.entityId}
                    </code>
                  </div>
                  <div className="p-8 bg-white/2 rounded-4xl border border-white/5 hover:border-white/10 hover:bg-white/4 transition-all group/uuid shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-violet-400/5 blur-2xl group-hover/uuid:bg-violet-400/10 transition-colors" />
                    <span className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] block mb-4 group-hover/uuid:text-violet-400 transition-colors">
                      TX Identifier
                    </span>
                    <code className="text-[11px] text-neutral-500 font-mono select-all truncate block bg-black/40 p-3 rounded-xl border border-white/5 group-hover/uuid:text-neutral-300 transition-colors">
                      {log.id}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
