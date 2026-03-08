"use client";

import { WorkspaceGraphs } from "@/features/workspace/workspace.interface";
import { TrendingUp } from "lucide-react";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  data?: WorkspaceGraphs["tasksCompletedOverTime"];
  isLoading: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-900 border border-white/10 px-3 py-1.5 rounded-xl shadow-2xl">
        <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest leading-none mb-1">
          {label}
        </p>
        <p className="text-sm font-bold text-white">{payload[0].value} tasks</p>
      </div>
    );
  }
  return null;
};

export default function DashboardVelocityChart({ data, isLoading }: Props) {
  const chartData = useMemo(() => {
    if (!data) return [];
    return data.map((d) => ({
      date: d.date,
      formattedDate: d.date.split("-").slice(1).join("/"),
      count: d.count,
    }));
  }, [data]);

  if (isLoading) {
    return (
      <div className="bg-dashboard-card-bg/40 border border-white/5 p-8 rounded-[40px] h-[400px] animate-pulse" />
    );
  }

  if (!data || data.length === 0) return null;

  return (
    <div className="bg-dashboard-card-bg/40 border border-white/5 p-8 rounded-[40px] relative overflow-hidden group h-full flex flex-col">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 blur-[100px] pointer-events-none" />

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-brand/10 border border-brand/20 text-brand">
            <TrendingUp size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Workspace Velocity
            </h3>
            <p className="text-xs text-neutral-500">
              Tasks completed over time
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[250px] relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorVelocity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00f2fe" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="rgba(255,255,255,0.05)"
            />
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
              cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#00f2fe"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorVelocity)"
              animationDuration={2000}
              dot={{
                r: 4,
                fill: "#00f2fe",
                stroke: "#0a0a0a",
                strokeWidth: 2,
                opacity: 0,
              }}
              activeDot={{
                r: 6,
                fill: "#00f2fe",
                stroke: "#0a0a0a",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
