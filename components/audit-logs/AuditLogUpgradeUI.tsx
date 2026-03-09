"use client";

import { selectOrganization } from "@/features/organization/organization.slice";
import { OrganizationRole } from "@/types/organization/organization.interface";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock as LockIcon,
  Sparkles as SparklesIcon,
  ArrowRight as ArrowRightIcon,
  ShieldAlert as ShieldAlertIcon,
  Info as InfoIcon,
} from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

// Helper for the badge icon
const CheckBadgeIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.491 4.491 0 01-3.397-1.549a4.49 4.49 0 01-3.498-1.307 4.491 4.491 0 01-1.307-3.497A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.491 4.491 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
      clipRule="evenodd"
    />
  </svg>
);

interface Props {
  isCompact?: boolean;
}

export const AuditLogUpgradeUI = ({ isCompact = false }: Props) => {
  const organization = useSelector(selectOrganization);
  const userRole = organization?.role;
  const isOwner = userRole === OrganizationRole.OWNER;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative group overflow-hidden rounded-[2.5rem] border border-white/10 bg-linear-to-b from-white8 to-transparent backdrop-blur-3xl transition-all duration-700 hover:border-brand/30 ${
        isCompact ? "p-10" : "p-12 py-20"
      }`}
    >
      {/* Premium Background Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/10 blur-[120px] -mr-64 -mt-64 opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 blur-[100px] -ml-48 -mb-48 opacity-30" />

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Animated Icon Container */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="relative mb-10"
        >
          <div className="absolute inset-0 bg-brand/30 blur-2xl rounded-full animate-pulse" />
          <div className="relative w-24 h-24 rounded-4xl bg-linear-to-br from-brand/20 to-purple-500/10 border border-brand/30 flex items-center justify-center text-brand shadow-[0_0_50px_-12px_rgba(var(--brand-rgb),0.3)] group-hover:shadow-[0_0_60px_-12px_rgba(var(--brand-rgb),0.5)] transition-all duration-500">
            <LockIcon
              size={40}
              strokeWidth={1.5}
              className="group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-bg-dark-0 border border-white/10 flex items-center justify-center text-amber-400 shadow-2xl"
          >
            <ShieldAlertIcon size={20} />
          </motion.div>
        </motion.div>

        {/* Improved Typography */}
        <div className="max-w-lg mb-12">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-black text-white tracking-tightest mb-6 leading-none italic uppercase"
          >
            History <span className="text-white/30">Exceeded</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-neutral-400 text-lg font-medium leading-relaxed"
          >
            Upgrade your plan to unlock full historical audit trails and
            advanced workspace analytics. Gain complete visibility into every
            action across your entire team.
          </motion.p>
        </div>

        {/* Role-Based Action Area */}
        <AnimatePresence mode="wait">
          {isOwner ? (
            <motion.div
              key="owner-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col sm:flex-row items-center gap-5 w-full justify-center"
            >
              <Link
                href={"/pricing"}
                className="px-10 py-5 uppercase w-full sm:w-auto rounded-2xl bg-white/5 border border-white/10 text-neutral-300 font-bold text-sm tracking-widest hover:bg-white/10 hover:text-white transition-all backdrop-blur-xl"
              >
                View All Available Plans
              </Link>
              <Link
                href={`/org/${organization?.slug}/billing`}
                className="group cursor-pointer relative flex items-center justify-center gap-3 px-10 py-5 w-full sm:w-auto rounded-2xl bg-white text-bg-dark-0 font-black text-sm tracking-widest transition-all hover:scale-105 active:scale-95 overflow-hidden shadow-[0_20px_40px_-15px_rgba(255,255,255,0.2)]"
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-brand/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                <SparklesIcon size={18} className="text-brand" />
                UPGRADE NOW
                <ArrowRightIcon
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="member-notice"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-brand/5 border border-brand/20 text-brand/80"
            >
              <InfoIcon size={20} />
              <p className="text-sm font-bold tracking-tight">
                Contact your workspace owner to upgrade and access full history.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Premium Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex items-center gap-3 py-2 px-4 rounded-full bg-white/2 border border-white/5"
        >
          <CheckBadgeIcon className="w-5 h-5 text-brand" />
          <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">
            Enterprise-grade security & compliance
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};
