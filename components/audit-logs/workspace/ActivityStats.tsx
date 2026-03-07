import React from "react";
import { Activity, Target, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface ActivityStatsProps {
  totalEvents: number;
}

export const ActivityStats: React.FC<ActivityStatsProps> = ({
  totalEvents,
}) => {
  const stats = [
    {
      label: "Total Activity",
      value: totalEvents,
      icon: Activity,
      color: "text-brand",
      bg: "bg-brand/5",
      border: "border-brand/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`p-6 rounded-3xl bg-white/2 border border-white/5 hover:border-white/10 transition-all group overflow-hidden relative shadow-2xl`}
          >
            {/* Background Glow */}
            <div
              className={`absolute -top-12 -right-12 w-24 h-24 ${stat.bg} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
            />

            <div className="absolute top-4 right-4 p-3 rounded-2xl bg-white/3 border border-white/5 opacity-40 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <Icon size={20} className={stat.color} />
            </div>

            <div className="flex flex-col gap-2 relative z-10">
              <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] group-hover:text-neutral-400 transition-colors">
                {stat.label}
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-white tracking-tighter">
                  {stat.value}
                </span>
              </div>
            </div>

            {/* Subtle Progress Line */}
            <div className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-transparent via-white/10 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        );
      })}
    </div>
  );
};
