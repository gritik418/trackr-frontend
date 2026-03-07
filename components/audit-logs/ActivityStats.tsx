import React from "react";
import { Activity, Target, Users, Zap } from "lucide-react";

interface ActivityStatsProps {
  totalEvents: number;
}

export const ActivityStats: React.FC<ActivityStatsProps> = ({
  totalEvents,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      <div className="p-6 rounded-4xl bg-white/2 border border-white/5 hover:bg-white/4 transition-all group overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Activity size={48} className="text-brand" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest italic group-hover:text-brand transition-colors">
            Total Activity
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">
              {totalEvents}
            </span>
            <span className="text-[10px] text-emerald-500 font-bold">+12%</span>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-4xl bg-white/2 border border-white/5 hover:bg-white/4 transition-all group overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Target size={48} className="text-blue-400" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest italic group-hover:text-blue-400 transition-colors">
            Tasks Completed
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">42</span>
            <span className="text-[10px] text-blue-400 font-bold">
              This Week
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-4xl bg-white/2 border border-white/5 hover:bg-white/4 transition-all group overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Users size={48} className="text-violet-400" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest italic group-hover:text-violet-400 transition-colors">
            Active Members
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">8</span>
            <span className="text-[10px] text-neutral-500 font-bold">
              In Workspace
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-4xl bg-brand/5 border border-brand/20 hover:bg-brand/10 transition-all group overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Zap size={48} className="text-brand" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-brand uppercase tracking-widest italic">
            Velocity Score
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">94</span>
            <span className="text-[10px] text-brand font-bold">Premium</span>
          </div>
        </div>
      </div>
    </div>
  );
};
