"use client";

import { WorkspaceGraphs } from "@/features/workspace/workspace.interface";
import { Activity } from "lucide-react";
import { useMemo } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  data?: WorkspaceGraphs["tasksCreatedVsCompleted"];
  isLoading: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length >= 2) {
    return (
      <div className="bg-neutral-900 border border-white/10 p-3 rounded-xl shadow-2xl min-w-[140px]">
        <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest leading-none mb-3 border-b border-white/5 pb-2">
          {label}
        </p>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-neutral-400 font-medium">
              Created
            </span>
            <span className="text-xs font-bold text-white">
              {payload[1].value}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-orange-400 font-bold">Done</span>
            <span className="text-xs font-bold text-white">
              {payload[0].value}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function DashboardTrends({ data, isLoading }: Props) {
  const chartData = useMemo(() => {
    if (!data) return [];
    return data.map((d) => ({
      date: d.date,
      formattedDate: d.date.split("-").slice(1).join("/"),
      created: d.created,
      completed: d.completed,
    }));
  }, [data]);

  if (isLoading) {
    return (
      <div className="bg-dashboard-card-bg/40 border border-white/5 p-8 rounded-[40px] h-[300px] animate-pulse" />
    );
  }

  if (!data || data.length === 0) return null;

  return (
    <div className="bg-dashboard-card-bg/40 border border-white/5 p-8 rounded-[40px] relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[100px] pointer-events-none" />

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
            <Activity size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Workload Trends
            </h3>
            <p className="text-xs text-neutral-500">
              Created vs Completed tasks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
              Created
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
              Completed
            </span>
          </div>
        </div>
      </div>

      <div className="w-full h-[180px] relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="formattedDate"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fontWeight: 700, fill: "#525252" }}
              interval={chartData.length > 7 ? 4 : 0}
            />
            <YAxis hide domain={[0, "auto"]} />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "rgba(255,255,255,0.05)", strokeWidth: 20 }}
            />
            {/* Completed Line (Higher Z-index visually by being first/last depending on order) */}
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#f97316"
              strokeWidth={3}
              dot={{
                r: 3,
                fill: "#f97316",
                stroke: "#0a0a0a",
                strokeWidth: 1.5,
                opacity: 0,
              }}
              activeDot={{
                r: 5,
                fill: "#f97316",
                stroke: "#0a0a0a",
                strokeWidth: 2,
              }}
              animationDuration={2000}
            />
            {/* Created Line */}
            <Line
              type="monotone"
              dataKey="created"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{
                r: 4,
                fill: "white",
                stroke: "#0a0a0a",
                strokeWidth: 2,
              }}
              animationDuration={2000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
