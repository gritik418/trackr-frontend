import { format } from "date-fns";
import {
  ChevronRight,
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

export const WorkspaceActivityItem: React.FC<WorkspaceActivityItemProps> = ({
  log,
  isExpanded,
  onToggleExpand,
}) => {
  const {
    color: actionColor,
    icon: ActionIcon,
    theme,
  } = getActionUI(log.action) as any;
  const EntityIcon = getEntityIcon(log.entityType);
  const userInitials = getInitials(log.user?.name || "System");
  const description = getHumanDescription(log);

  const themeColors: Record<string, string> = {
    emerald:
      "from-emerald-500/20 border-emerald-500/10 shadow-emerald-500/5 ring-emerald-500/30",
    blue: "from-blue-500/20 border-blue-500/10 shadow-blue-500/5 ring-blue-500/30",
    rose: "from-rose-500/20 border-rose-500/10 shadow-rose-500/5 ring-rose-500/30",
    violet:
      "from-violet-500/20 border-violet-500/10 shadow-violet-500/5 ring-violet-500/30",
    indigo:
      "from-indigo-500/20 border-indigo-500/10 shadow-indigo-500/5 ring-indigo-500/30",
    amber:
      "from-amber-500/20 border-amber-500/10 shadow-amber-500/5 ring-amber-500/30",
    orange:
      "from-orange-500/20 border-orange-500/10 shadow-orange-500/5 ring-orange-500/30",
    neutral: "from-white/10 border-white/5 shadow-white/5 ring-white/30",
  };

  const activeTheme = themeColors[theme] || themeColors.neutral;

  return (
    <div className="relative pl-24 pb-12 group/item">
      {/* Ladder Spine Connection */}
      <div className="absolute left-[42px] top-14 bottom-0 w-px bg-white/5 group-last/item:hidden pointer-events-none" />
      {/* Ladder Icon (Only Action Icon) */}
      <motion.div
        layout
        className="absolute left-4 top-0 z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="relative">
          <motion.div
            layoutId={`icon-container-${log.id}`}
            className={`w-14 h-14 rounded-full ${actionColor} flex items-center justify-center overflow-hidden group-hover/item:scale-110 transition-all duration-500 border-2 border-[${actionColor}]/10`}
          >
            <ActionIcon size={20} strokeWidth={3} />
          </motion.div>
          {/* Subtle Glow on Icon */}
          <div
            className={`absolute inset-0 blur-xl opacity-20 ${actionColor.split(" ")[0]} pointer-events-none`}
          />
        </div>
      </motion.div>

      {/* Content Card */}
      <motion.div
        layout
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className={`relative z-10 bg-white/2 hover:bg-white/4 border border-white/5 rounded-[2.5rem] transition-all duration-700 cursor-pointer overflow-hidden ${isExpanded ? `ring-2 ${activeTheme.split(" ").pop()} bg-white/5 shadow-[0_40px_80px_rgba(0,0,0,0.6)] scale-[1.01]` : "hover:border-white/10 hover:translate-x-1 shadow-2xl border-white/5"}`}
        onClick={onToggleExpand}
      >
        {/* Card Internal Glow (Dynamic) */}
        <div
          className={`absolute -top-32 -right-32 w-64 h-64 blur-[120px] pointer-events-none transition-opacity duration-1000 bg-linear-to-br ${activeTheme.split(" ")[0]} ${isExpanded ? "opacity-100" : "opacity-0 group-hover/item:opacity-60"}`}
        />

        <div className="p-6">
          <motion.div
            layout="position"
            className="flex items-start justify-between gap-8"
          >
            <div className="flex gap-5">
              {/* User Avatar Inside Card */}
              <div className="relative shrink-0">
                <motion.div
                  layoutId={`avatar-${log.id}`}
                  className="w-12 h-12 rounded-2xl bg-linear-to-br from-white/10 via-white/5 to-transparent border border-white/10 flex items-center justify-center overflow-hidden shadow-xl"
                >
                  {log.user?.avatarUrl ? (
                    <Image
                      height={48}
                      width={48}
                      src={log.user.avatarUrl}
                      alt={log.user.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                    />
                  ) : log.user?.name === "System" ? (
                    <ShieldAlert size={22} className="text-brand/80" />
                  ) : (
                    <span className="text-[15px] font-black text-white/40 tracking-tight">
                      {userInitials}
                    </span>
                  )}
                </motion.div>
              </div>

              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-lg font-black text-white leading-none tracking-tight group-hover/item:text-brand transition-colors">
                    {log.user?.name || "System"}
                  </span>
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/20 border border-white/5 shadow-inner">
                    <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest">
                      {format(new Date(log.createdAt), "HH:mm:ss")}
                    </span>
                  </div>
                </div>
                <div className="text-[15px] text-neutral-400 leading-snug font-medium max-w-2xl group-hover/item:text-neutral-200 transition-colors">
                  {description}
                </div>

                {!isExpanded && (
                  <div className="flex items-center gap-4 mt-3 opacity-60 group-hover/item:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 bg-black/30 px-3 py-1 rounded-lg border border-white/5 shadow-sm">
                      <EntityIcon size={12} className="text-brand/60" />
                      {log.entityType.replace(/_/g, " ")}
                    </div>
                    <div
                      className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] ${actionColor.split(" ")[0]} bg-black/30 px-3 py-1 rounded-lg border border-white/5 shadow-sm`}
                    >
                      <ActionIcon size={12} />
                      {log.action.split("_").pop()}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 shrink-0">
              <div className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/5 text-[10px] text-brand/60 font-mono font-bold tracking-wider shadow-inner group-hover/item:border-brand/20 transition-colors">
                {log.ipAddress}
              </div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isExpanded ? `bg-${theme}-500/20 text-${theme}-400 rotate-90 shadow-[0_0_15px_rgba(var(--brand-rgb),0.3)]` : "bg-white/5 text-neutral-700 group-hover/item:text-neutral-400 group-hover/item:bg-white/10"}`}
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
                {/* Sub-panels */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 px-2">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${actionColor.split(" ")[0].replace("text-", "bg-")} shadow-[0_0_15px_rgba(255,255,255,0.2)]`}
                      />
                      <span className="text-[11px] uppercase font-black text-white/40 tracking-[0.4em]">
                        Atomic Transaction State
                      </span>
                    </div>
                    <div className="relative group/ledger">
                      <div
                        className={`absolute -inset-1 bg-linear-to-r ${activeTheme.split(" ")[0]} to-blue-500/10 rounded-[2.5rem] blur opacity-10 group-hover/ledger:opacity-25 transition-opacity`}
                      />
                      <pre className="relative text-[11px] p-8 rounded-[2.5rem] bg-[#0A0A0B]/80 backdrop-blur-2xl border border-white/10 font-mono text-brand/90 overflow-x-auto max-h-[350px] shadow-2xl leading-relaxed scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    </div>
                  </div>

                  <div className="flex flex-col gap-8">
                    <div className="p-8 rounded-[3rem] bg-linear-to-br from-white/3 to-transparent border border-white/10 shadow-2xl relative overflow-hidden group/origin">
                      <div
                        className={`absolute -top-12 -right-12 w-40 h-40 ${activeTheme.split(" ")[0]} blur-3xl opacity-10 group-hover/origin:opacity-20 transition-opacity`}
                      />
                      <div className="flex items-center gap-4 mb-8 relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg">
                          <Laptop size={22} className="text-neutral-400" />
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
                            <code className="text-15px text-brand font-black font-mono tracking-tight">
                              {log.ipAddress}
                            </code>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em]">
                              Timestamp
                            </span>
                            <span className="text-15px text-white font-black font-mono tracking-tight">
                              {format(
                                new Date(log.createdAt),
                                "MMM d, HH:mm:ss",
                              )}
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
        </div>
      </motion.div>
    </div>
  );
};
