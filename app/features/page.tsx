"use client";

import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { useUser } from "@/providers/AuthProvider";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  CheckSquare,
  FolderTree,
  Globe,
  Layers,
  LineChart,
  Lock,
  MessageSquare,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const features = [
  {
    title: "Workspace-First Design",
    description:
      "Work happens inside dedicated spaces. Organizations provide the structure, but workspaces provide the focus.",
    icon: FolderTree,
    color: "text-brand bg-brand/10 border-brand/20",
    delay: 0.1,
  },
  {
    title: "Hierarchical Permissions",
    description:
      "Explicit roles at both Organization and Workspace levels ensure everyone has the right access.",
    icon: ShieldCheck,
    color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    delay: 0.2,
  },
  {
    title: "Task Lifecycle",
    description:
      "Full audit history for every unit of work. From creation to deployment, every move is tracked.",
    icon: CheckSquare,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    delay: 0.3,
  },
  {
    title: "Organization Control",
    description:
      "Top-level containers for teams. Manage billing, members, and multiple workspaces from one hub.",
    icon: Users,
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    delay: 0.4,
  },
  {
    title: "Categorized Workflows",
    description:
      "Group tasks by categories unique to each workspace. Standardize your operations without friction.",
    icon: Layers,
    color: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    delay: 0.5,
  },
  {
    title: "Real-time Activity",
    description:
      "Append-only activity logs provide an immutable timeline of your project progression.",
    icon: Activity,
    color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    delay: 0.6,
  },
];

const advancedFeatures = [
  {
    title: "Global Infrastructure",
    description:
      "Powered by a distributed architecture for zero-latency operations worldwide.",
    icon: Globe,
  },
  {
    title: "Granular RBAC",
    description:
      "Role-Based Access Control integrated at every level. Define precise permissions across Organizations and Workspaces.",
    icon: Lock,
  },
  {
    title: "Deep Analytics",
    description:
      "Visualize team velocity and project health with beautiful, interactive charts.",
    icon: LineChart,
  },
  {
    title: "Contextual Collaboration",
    description:
      "Discussion threads attached directly to tasks, ensuring zero loss of context.",
    icon: MessageSquare,
  },
];

export default function FeaturesPage() {
  const { isAuthenticated } = useUser();

  return (
    <div className="min-h-screen bg-bg-dark-0 text-white selection:bg-brand/30 relative overflow-hidden">
      <Navbar />

      {/* Persistent Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-brand/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-purple-600/5 blur-[150px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,216,230,0.02)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <main className="pb-32 relative z-10">
        {/* Hero Section */}
        <section className="relative px-6 py-20 md:py-32">
          {/* Section-Specific Background Effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_top,rgba(0,216,230,0.1)_0%,transparent_60%)]" />
          </div>

          <div className="max-w-7xl pt-20 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-brand mb-8 animate-pulse">
                <Zap size={14} className="fill-brand" />
                Evolution of Productivity
              </span>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 bg-linear-to-b from-white via-white to-white/40 bg-clip-text text-transparent leading-[1.1]">
                The Operating System <br className="hidden md:block" /> for
                Modern Work.
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-400 font-medium leading-relaxed mb-12">
                Trackr aligns strictly with your team's hierarchy. From
                organizations to individual tasks, every movement is recorded,
                analyzed, and optimized.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {isAuthenticated ? (
                  <Link
                    href="/org"
                    className="w-full sm:w-auto px-8 py-4 bg-brand text-bg-dark-0 font-bold rounded-2xl shadow-2xl shadow-brand/20 hover:shadow-brand/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
                  >
                    Start Tracking for Free
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="w-full sm:w-auto px-8 py-4 bg-brand text-bg-dark-0 font-bold rounded-2xl shadow-2xl shadow-brand/20 hover:shadow-brand/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
                  >
                    Start Tracking for Free
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                )}
                <Link
                  href="/pricing"
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 font-bold rounded-2xl transition-all"
                >
                  View Pricing
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Core Capabilities Grid */}
        <section className="px-6 py-24 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
              <div className="max-w-2xl">
                <h2 className="text-sm font-bold text-brand uppercase tracking-[0.3em] mb-4">
                  Core Capabilities
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                  Engineered for teams that <br className="hidden md:block" />{" "}
                  demand precision.
                </h3>
              </div>
              <p className="text-neutral-400 font-medium max-w-sm">
                A toolkit designed to handle the complexities of multi-workspace
                management with effortless ease.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: feature.delay, duration: 0.5 }}
                  className="p-8 rounded-4xl bg-bg-dark-1 border border-white/5 hover:border-brand/30 hover:bg-white/3 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-[50px] -mr-16 -mt-16 group-hover:bg-brand/10 transition-colors" />

                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border ${feature.color} group-hover:scale-110 transition-transform duration-500`}
                  >
                    <feature.icon size={28} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4 group-hover:text-brand transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-neutral-500 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Hierarchy Visualization Section */}
        <section className="px-6 py-24 bg-white/2 border-y border-white/5 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                  Structured for <span className="text-brand">Impact.</span>
                </h2>
                <p className="text-neutral-400 text-lg mb-10 leading-relaxed">
                  Most tools lose track when scale increases. Trackr's
                  hierarchical architecture ensures that whether you're managing
                  10 tasks or 10,000 across 50 workspaces, you always have a
                  clear view.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      label: "Organization",
                      desc: "Top-level governance and billing.",
                    },
                    {
                      label: "Workspaces",
                      desc: "Dedicated spaces for teams or projects.",
                    },
                    {
                      label: "Projects",
                      desc: "Logical groupings for execution units.",
                    },
                    {
                      label: "Tasks",
                      desc: "Individual units of actionable work.",
                    },
                  ].map((level, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                      </div>
                      <div>
                        <h5 className="font-bold text-white">{level.label}</h5>
                        <p className="text-sm text-neutral-500">{level.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                {/* Visual Mockup of Hierarchy */}
                <div className="relative rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl aspect-square flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-brand/5 to-purple-600/5" />
                  <div className="relative z-10 w-full max-w-sm space-y-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-2xl animate-pulse">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-brand/20 border border-brand/40" />
                        <div className="h-4 w-32 bg-white/20 rounded-md" />
                      </div>
                      <div className="ml-11 space-y-3">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                          <div className="h-2 w-24 bg-white/10 rounded-sm mb-2" />
                          <div className="ml-4 space-y-2">
                            <div className="h-2 w-full bg-white/5 rounded-sm" />
                            <div className="h-2 w-2/3 bg-white/5 rounded-sm" />
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-white/5 border border-white/5 opacity-60">
                          <div className="h-2 w-24 bg-white/10 rounded-sm" />
                        </div>
                      </div>
                    </div>
                    <motion.div
                      animate={{ x: [0, 50, 0], y: [0, -20, 0] }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute -right-20 -bottom-10 w-64 h-64 bg-brand/20 blur-[100px] rounded-full pointer-events-none"
                    />
                    <motion.div
                      animate={{ x: [0, -50, 0], y: [0, 20, 0] }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute -left-20 -top-10 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="px-6 py-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {advancedFeatures.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-brand/10 group-hover:border-brand/30 transition-all duration-500">
                    <f.icon
                      size={28}
                      className="text-neutral-400 group-hover:text-brand transition-colors"
                    />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {f.title}
                  </h4>
                  <p className="text-sm text-neutral-500 font-medium">
                    {f.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto relative rounded-[3rem] overflow-hidden bg-linear-to-br from-brand/20 via-bg-dark-1 to-purple-600/20 p-12 md:p-24 border border-white/10 text-center">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
                Ready to gain <br className="md:hidden" /> total{" "}
                <span className="text-brand">Visibility?</span>
              </h2>
              <p className="max-w-xl mx-auto text-neutral-400 text-lg mb-12 font-medium">
                Join hundreds of teams already using Trackr to streamline their
                organization's workflow and security.
              </p>
              {isAuthenticated ? (
                <Link
                  href="/org"
                  className="inline-flex items-center gap-2 px-10 py-5 bg-white text-bg-dark-0 font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10"
                >
                  Get Started Now
                  <ArrowRight size={20} />
                </Link>
              ) : (
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 px-10 py-5 bg-white text-bg-dark-0 font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10"
                >
                  Get Started Now
                  <ArrowRight size={20} />
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
