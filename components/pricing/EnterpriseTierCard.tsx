import { Feature, PlanType } from "@/features/plans/plans.interface";
import { motion } from "framer-motion";
import { ArrowRight, Check, Star } from "lucide-react";
import Link from "next/link";
import React from "react";

export interface PricingTier {
  id: string;
  name: string;
  href: string;
  type: PlanType;
  price: string | number;
  description: string;
  features: Feature[];
  isMostPopular: boolean;
  gradient: string;
  icon: React.ReactNode;
  note?: string;
  earlyAccess?: boolean;
}

type Props = {
  tier: PricingTier;
  index: number;
  handlePlanClick: (e: React.MouseEvent, type: PlanType) => void;
  getTierGradient: (type: PlanType) => string;
  getTierIcon: (type: PlanType) => React.ReactNode;
};

const EnterpriseTierCard = ({
  tier,
  index,
  handlePlanClick,
  getTierGradient,
  getTierIcon,
}: Props) => {
  return (
    <motion.div
      key={tier.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={`relative group h-full flex flex-col p-10 rounded-[2.5rem] bg-white/4 backdrop-blur-3xl border transition-all duration-700 hover:scale-[1.02] hover:-translate-y-3 ${
        tier.isMostPopular
          ? "border-brand/40 shadow-2xl shadow-brand/10 z-20 bg-linear-to-b from-brand/10 via-white/5 to-transparent ring-1 ring-brand/20"
          : "border-white/10 hover:border-white/20 shadow-xl shadow-black/40"
      } md:flex-row md:items-center md:gap-12 md:p-12 mb-12`}
    >
      {/* Tier-specific border glow */}
      <div
        className={`absolute inset-0 rounded-[2.5rem] bg-linear-to-b ${getTierGradient(tier.type)} opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none -m-px -z-10`}
      />
      {tier.isMostPopular && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand text-bg-dark-0 text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(0,216,230,0.4)] overflow-hidden"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Star size={12} fill="currentColor" />
            </motion.div>
            Most Popular
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </motion.div>
        </div>
      )}

      <div
        className={`absolute inset-0 bg-linear-to-b ${getTierGradient(tier.type)} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem] blur-2xl -z-10`}
      />

      <div
        className={`relative z-10 flex-1 flex flex-col md:flex-row md:items-center md:gap-12 w-full`}
      >
        <div className="md:w-1/3">
          <div className="flex items-center justify-between mb-8">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              {getTierIcon(tier.type)}
            </div>
            <div>
              <h3 className="text-2xl font-black text-white text-right tracking-tight">
                {tier.name}
              </h3>
              <p className="text-brand/80 text-[10px] text-right mt-1 uppercase tracking-[0.2em] font-black">
                {tier.name === "Enterprise" ? "Scale" : "Plan"}
              </p>
            </div>
          </div>

          <div className="mb-8 border-b border-white/5 pb-8">
            <div className="flex items-baseline gap-1">
              <span className="text-6xl font-black tracking-tighter text-white bg-linear-to-b from-white to-white/60 bg-clip-text">
                {tier.price}
              </span>
              {tier.name !== "Free" && tier.name !== "Enterprise" && (
                <span className="text-neutral-500 font-bold mb-1">/month</span>
              )}
            </div>
            <p className="text-neutral-400 font-medium mt-4 text-sm leading-relaxed">
              {tier.description}
            </p>
            {tier.note && (
              <p className="text-brand text-xs font-bold mt-2 animate-pulse">
                {tier.note}
              </p>
            )}
          </div>
        </div>

        <div
          className={`flex-1 flex flex-col md:border-l md:border-white/5 md:pl-12`}
        >
          <ul
            className={`md:space-y-4 mb-10 flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 space-y-0`}
          >
            {tier.features.map((feature: Feature) => (
              <li key={feature.text} className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="w-5 h-5 rounded-full bg-indigo-400/10 flex items-center justify-center shrink-0"
                >
                  <Check size={12} className="text-indigo-400" />
                </motion.div>
                <span className="text-neutral-300 font-medium text-sm">
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>

          <Link
            // href={tier.href}
            href={"/"}
            onClick={(e) => handlePlanClick(e, PlanType.ENTERPRISE)}
            className={`relative w-full py-5 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all group/btn active:scale-95 overflow-hidden ${
              tier.isMostPopular
                ? "bg-white text-bg-dark-0 shadow-xl shadow-white/5 hover:bg-brand hover:shadow-brand/20"
                : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
            } md:max-w-xs`}
          >
            {tier.isMostPopular && (
              <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent" />
            )}
            {tier.name === "Enterprise" ? "Contact Sales" : "Get Started"}
            <ArrowRight
              size={18}
              className="relative z-10 transition-transform group-hover/btn:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EnterpriseTierCard;
