"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Check,
  Zap,
  ArrowRight,
  Shield,
  Star,
  Lock,
  Rocket,
  ArrowLeft,
} from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";

const earlyAccessFeatures = [
  "1 Business Organization",
  "Up to 5 Workspaces (Beta)",
  "15 Active Projects (Beta)",
  "Unlimited Tasks (Beta)",
  "Up to 15 Team Members (Beta)",
  "90-day Activity Logs (Beta)",
  "Role-based Access Control",
  "Org & Workspace Audit Logs",
  "Priority Community Support",
  "Shape the Product Roadmap",
];

export default function EarlyAccessPage() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-bg-dark-0 text-white selection:bg-brand/30">
      <Navbar />
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-32 font-sans">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="group cursor-pointer flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-bold uppercase tracking-widest text-[10px]">
            Back to Pricing
          </span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[10px] font-black uppercase tracking-widest w-fit mb-8"
            >
              <Star size={10} fill="currentColor" />
              Limited Early Access
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-6"
            >
              Full power for <br />
              <span className="text-linear-to-r from-brand to-purple-400 bg-clip-text text-transparent">
                early believers.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-neutral-400 font-medium mb-12 max-w-lg leading-relaxed"
            >
              We're building Trackr to be the most performant workspace for
              teams. Join our early access program to unlock premium features
              for free while we're in beta.
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-start gap-4 p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-brand/30 transition-colors group">
                <div className="p-3 rounded-2xl bg-brand/10 group-hover:scale-110 transition-transform">
                  <Rocket size={24} className="text-brand" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    Accelerate Workflow
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    Unlimited tasks and specialized workspaces for high-octane
                    project management.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors group">
                <div className="p-3 rounded-2xl bg-purple-500/10 group-hover:scale-110 transition-transform">
                  <Shield size={24} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    Enterprise-Grade Security
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    Role-based access controls and detailed audit logs for your
                    entire organization.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Comparison / Plan Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Glossy Card */}
            <div className="relative z-20 overflow-hidden rounded-[3rem] bg-linear-to-b from-white/10 to-transparent border border-white/10 p-10 backdrop-blur-xl shadow-2xl">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-black italic tracking-tighter">
                    EARLY ACCESS
                  </h2>
                  <p className="text-brand text-[10px] font-black uppercase tracking-widest mt-1">
                    Founders Edition
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-brand flex items-center justify-center shadow-[0_0_30px_rgba(0,216,230,0.5)]">
                  <Sparkles size={28} className="text-bg-dark-0" />
                </div>
              </div>

              {/* Price */}
              <div className="mb-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black tracking-tighter">
                    $0
                  </span>
                  <span className="text-neutral-500 font-bold">
                    forever during beta
                  </span>
                </div>
                <p className="text-amber-400 text-xs font-bold mt-3 animate-pulse">
                  Limited slots available for the first 1,000 users.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-10">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
                  What's included:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {earlyAccessFeatures.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div className="shrink-0 w-4 h-4 rounded-full bg-brand/10 flex items-center justify-center">
                        <Check size={10} className="text-brand" />
                      </div>
                      <span className="text-sm text-neutral-300 font-medium">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/signup"
                className="group relative w-full h-16 rounded-2xl bg-white text-bg-dark-0 font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-brand/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                Claim My Early Access
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <div className="mt-6 flex items-center justify-center gap-2 text-neutral-500">
                <Lock size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  No credit card required
                </span>
              </div>
            </div>

            {/* Decorative Background Elements behind the card */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand/20 blur-[100px] rounded-full z-10" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full z-10" />
          </motion.div>
        </div>

        {/* FAQ / Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 pt-32 border-t border-white/5"
        >
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">
              Why Early Access?
            </h2>
            <p className="text-neutral-400 font-medium leading-relaxed">
              We're polishing the final edges of Trackr. As an Early Access
              user, you'll help us stress-test our infrastructure and define the
              next set of features. In return, you get all the power of our Pro
              tier at no cost.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 text-brand">
                <Zap size={24} />
              </div>
              <h4 className="font-bold mb-2">High Performance</h4>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Built for speed. Real-time collaboration without the lag.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 text-purple-400">
                <Check size={24} />
              </div>
              <h4 className="font-bold mb-2">Beta Feedback</h4>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Your feedback goes directly to our product engineering team.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 text-amber-400">
                <Star size={24} />
              </div>
              <h4 className="font-bold mb-2">Priority Status</h4>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Early users maintain special status even after we exit beta.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
