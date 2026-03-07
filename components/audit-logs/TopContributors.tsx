import React from "react";
import { Trophy, TrendingUp } from "lucide-react";
import { AuditLog } from "../../features/audit-logs/audit-logs.interface";

interface TopContributorsProps {
  logs: AuditLog[];
}

export const TopContributors: React.FC<TopContributorsProps> = ({ logs }) => {
  // Aggregate contributions by user
  const contributions = logs.reduce(
    (acc, log) => {
      if (!log.user) return acc;
      const userId = log.user.id;
      if (!acc[userId]) {
        acc[userId] = {
          name: log.user.name,
          email: log.user.email,
          avatarUrl: log.user.avatarUrl,
          count: 0,
        };
      }
      acc[userId].count += 1;
      return acc;
    },
    {} as Record<
      string,
      { name: string; email: string; avatarUrl?: string | null; count: number }
    >,
  );

  const sortedContributors = Object.values(contributions)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.3em] flex items-center gap-2">
          <Trophy size={14} className="text-amber-400" />
          Top Contributors
        </h3>
        <TrendingUp size={14} className="text-emerald-500 opacity-50" />
      </div>

      <div className="space-y-2">
        {sortedContributors.map((c, i) => (
          <div
            key={c.email}
            className="group flex items-center gap-3 p-3 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/4 hover:border-brand/20 transition-all cursor-default"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-neutral-400 overflow-hidden shadow-inner group-hover:border-brand/40 transition-colors">
                {c.avatarUrl ? (
                  <img
                    src={c.avatarUrl}
                    alt={c.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  c.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                )}
              </div>
              {i === 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center shadow-lg border border-bg-dark-0 animate-bounce">
                  <Trophy size={8} className="text-bg-dark-0" />
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col min-w-0">
              <span className="text-[11px] font-bold text-white truncate group-hover:text-brand transition-colors">
                {c.name}
              </span>
              <span className="text-[9px] text-neutral-500 truncate font-medium">
                {c.email}
              </span>
            </div>

            <div className="flex flex-col items-end gap-0.5">
              <span className="text-[12px] font-black text-white leading-none">
                {c.count}
              </span>
              <span className="text-[8px] font-bold text-neutral-600 uppercase tracking-widest leading-none">
                Events
              </span>
            </div>
          </div>
        ))}

        {sortedContributors.length === 0 && (
          <div className="p-8 text-center rounded-2xl border border-dashed border-white/5 opacity-30 italic text-[10px]">
            No activity recorded yet
          </div>
        )}
      </div>

      <div className="p-4 rounded-2xl bg-linear-to-br from-brand/10 to-transparent border border-brand/10 group overflow-hidden relative">
        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-brand/5 blur-2xl group-hover:bg-brand/10 transition-colors" />
        <p className="text-[10px] text-neutral-400 leading-relaxed relative z-10">
          <span className="text-brand font-bold">Pro Tip:</span> Active
          contributors increase workspace velocity and team transparency.
        </p>
      </div>
    </div>
  );
};
