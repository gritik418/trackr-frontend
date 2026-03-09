"use client";
import DashboardOverviewCards from "@/components/dashboard/DashboardOverviewCards";
import DashboardQuickInsights from "@/components/dashboard/DashboardQuickInsights";
import DashboardRecentActivity from "@/components/dashboard/DashboardRecentActivity";
import DashboardStatusDistribution from "@/components/dashboard/DashboardStatusDistribution";
import DashboardTrends from "@/components/dashboard/DashboardTrends";
import DashboardVelocityChart from "@/components/dashboard/DashboardVelocityChart";
import { useGetWorkspaceTasksQuery } from "@/features/task/task.api";
import { useGetWorkspaceOverviewQuery } from "@/features/workspace/workspace.api";
import { selectWorkspace } from "@/features/workspace/workspace.slice";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

const WorkspaceDashboardPage = () => {
  const params = useParams();
  const workspace = useSelector(selectWorkspace);
  const slug = (params?.slug as string) || "Workspace";
  const { data, isLoading } = useGetWorkspaceOverviewQuery(
    workspace?.id || "",
    {
      skip: !workspace || !workspace.id,
    },
  );

  const { data: tasksData, isLoading: tasksLoading } =
    useGetWorkspaceTasksQuery(
      {
        workspaceId: workspace?.id || "",
        query: { limit: 7 },
      },
      {
        skip: !workspace || !workspace.id,
      },
    );

  const overview = data?.overview;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="space-y-10 relative">
        {/* Background Ambience */}
        <div className="absolute top-[-10%] right-[0%] w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[0%] left-[-10%] w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

        {/* Welcome / Header */}
        <div className="relative flex justify-between items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
              Workspace Overview
            </h1>
            <p className="text-neutral-400">
              Real-time insights for{" "}
              <span className="text-white font-medium capitalize">{slug}</span>
            </p>
          </motion.div>
          <div className="hidden md:block text-right">
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
              Active Now
            </p>
            <div className="flex items-center gap-2 justify-end">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-tighter">
                System Live
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <DashboardOverviewCards overview={overview} isLoading={isLoading} />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          <div className="lg:col-span-2 min-h-[400px]">
            <DashboardVelocityChart
              data={overview?.graphs?.tasksCompletedOverTime}
              isLoading={isLoading}
            />
          </div>
          <div className="min-h-[400px]">
            <DashboardStatusDistribution
              data={overview?.graphs?.taskStatusDistribution}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Secondary Content Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          <div className="lg:col-span-2 space-y-8">
            <DashboardTrends
              data={overview?.graphs?.tasksCreatedVsCompleted}
              isLoading={isLoading}
            />

            {/* My Tasks Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Recent Tasks
                </h2>
                <Link
                  href={`/dashboard/${workspace?.slug}/tasks`}
                  className="text-xs font-bold text-brand hover:text-brand-light transition-colors uppercase tracking-widest"
                >
                  View All Tasks
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {tasksLoading ? (
                  [1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-20 rounded-2xl bg-white/5 animate-pulse border border-white/5"
                    />
                  ))
                ) : tasksData?.tasks && tasksData.tasks.length > 0 ? (
                  tasksData.tasks.slice(0, 8).map((task) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-dashboard-card-bg/30 border border-white/5 hover:bg-white/5 transition-all cursor-pointer"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          task.status === "DONE"
                            ? "bg-emerald-500"
                            : task.status === "IN_PROGRESS"
                              ? "bg-yellow-500"
                              : "bg-neutral-600"
                        }`}
                      />

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white group-hover:text-brand transition-colors truncate">
                          {task.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {task.project?.name && (
                            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
                              {task.project.name}
                            </span>
                          )}
                          <span className="text-[10px] text-neutral-600 font-medium">
                            {task.deadline
                              ? new Date(task.deadline).toLocaleDateString()
                              : "No deadline"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {task.assignees && task.assignees.length > 0 && (
                          <div className="w-7 h-7 rounded-full bg-brand/20 border border-brand/20 flex items-center justify-center text-[10px] font-bold text-brand uppercase">
                            {task.assignees[0].name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                        )}
                        <span
                          className={`text-[10px] font-black px-2 py-1 rounded-lg border ${
                            task.priority === "HIGH"
                              ? "text-red-400 border-red-400/20 bg-red-400/10"
                              : task.priority === "MEDIUM"
                                ? "text-orange-400 border-orange-400/20 bg-orange-400/10"
                                : "text-blue-400 border-blue-400/20 bg-blue-400/10"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-8 rounded-2xl border border-dashed border-white/10 text-center">
                    <p className="text-sm text-neutral-500">
                      No tasks assigned to you yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats / Mini Cards */}
          <div className="space-y-6">
            <DashboardQuickInsights overview={overview} isLoading={isLoading} />

            <DashboardRecentActivity
              workspaceId={workspace?.id || ""}
              orgId={workspace?.organizationId || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceDashboardPage;
