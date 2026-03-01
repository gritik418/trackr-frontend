"use client";

import { BetaPlanModal } from "@/components/billing/BetaPlanModal";
import { useGetPlansQuery } from "@/features/plans/plans.api";
import { Plan, PlanInterval, PlanType } from "@/features/plans/plans.interface";
import { motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  Globe,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import EnterpriseTierCard, { PricingTier } from "../pricing/EnterpriseTierCard";
import PlanTierCard from "../pricing/PlanTierCard";

const enterpriseTier: PricingTier = {
  id: "tier-enterprise",
  name: "Enterprise",
  type: PlanType.ENTERPRISE,
  href: "/signup",
  price: "CUSTOM",
  description: "Global-scale infrastructure for large enterprises.",
  features: [
    { text: "Everything in Business", included: true },
    { text: "Unlimited Organizations & Workspaces", included: true },
    { text: "Unlimited Project Capacity", included: true },
    { text: "Dedicated Account Manager", included: true },
    { text: "Tailored SLA & Compliance", included: true },
    { text: "White-labeled Interface", included: true },
    { text: "Single Sign-On (SSO) Support", included: true },
    { text: "Private Cloud Deployment", included: true },
  ],
  isMostPopular: false,
  gradient: "from-brand/10 via-purple-500/10 to-transparent",
  icon: <Globe size={24} className="text-brand/80" />,
};

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<PlanInterval>(
    PlanInterval.MONTH,
  );
  const [earlyAccessTier, setEarlyAccessTier] = useState<Plan | null>(null);
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const router = useRouter();
  const { data } = useGetPlansQuery();

  const getTierIcon = (type: PlanType | "CUSTOM") => {
    switch (type) {
      case PlanType.FREE:
        return <Zap size={24} className="text-emerald-400" />;
      case PlanType.PRO:
        return <Sparkles size={24} className="text-cyan-400" />;
      case PlanType.BUSINESS:
        return <Building2 size={24} className="text-purple-400" />;
      case PlanType.ENTERPRISE:
        return <Shield size={24} className="text-indigo-400" />;
      case PlanType.EARLY_ACCESS:
        return <Briefcase size={24} className="text-amber-400" />;
      case "CUSTOM":
        return <Globe size={24} className="text-blue-400" />;
      default:
        return null;
    }
  };

  const getTierGradient = (type: PlanType | "CUSTOM") => {
    switch (type) {
      case PlanType.FREE:
        return "from-emerald-500/20 via-emerald-500/5 to-transparent";
      case PlanType.PRO:
        return "from-cyan-500/30 via-cyan-500/10 to-transparent";
      case PlanType.BUSINESS:
        return "from-purple-600/30 via-purple-600/10 to-transparent";
      case PlanType.EARLY_ACCESS:
        return "from-amber-400/30 via-orange-500/10 to-transparent";
      case PlanType.ENTERPRISE:
      case "CUSTOM":
        return "from-indigo-600/30 via-blue-600/10 to-transparent";
      default:
        return "from-neutral-500/10 to-transparent";
    }
  };

  const handlePlanClick = (e: React.MouseEvent, type: PlanType | "CUSTOM") => {
    if (type !== PlanType.EARLY_ACCESS) {
      e.preventDefault();
      setIsBetaModalOpen(true);
    } else {
      e.preventDefault();
      router.push(`/upgrade/early-access`);
    }
  };

  const filteredPlans = useMemo(() => {
    return plans.filter(
      (plan) => plan.interval === billingCycle || plan.type === PlanType.FREE,
    );
  }, [plans, billingCycle]);

  useEffect(() => {
    if (data?.plans) {
      setPlans(data.plans);
    }
    if (data?.plans) {
      const earlyAccessPlan = data.plans.find(
        (plan) => plan.type === PlanType.EARLY_ACCESS,
      );
      setEarlyAccessTier(earlyAccessPlan as Plan);
    }
  }, [data]);

  return (
    <section
      id="pricing"
      className="py-32 relative overflow-hidden bg-bg-dark-0"
    >
      <BetaPlanModal
        isOpen={isBetaModalOpen}
        onClose={() => setIsBetaModalOpen(false)}
      />

      {/* Dynamic Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-brand/15 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 120, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[5%] w-[40%] h-[60%] bg-purple-500/10 blur-[130px] rounded-full"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] bg-blue-500/5 blur-[150px] rounded-full"
        />
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-black uppercase tracking-widest mb-6">
              <Sparkles size={10} />
              Beta version
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
              Simple, <span className="text-brand">transparent</span> pricing.
            </h2>
            <p className="text-xl text-neutral-400 font-medium">
              Choose the plan that's right for you and your team. High
              performance, no hidden fees.
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <div className="mt-12 cursor-pointer flex justify-center items-center gap-4">
            <span
              className={`text-sm font-bold transition-colors ${billingCycle === PlanInterval.MONTH ? "text-white" : "text-neutral-500"}`}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBillingCycle(
                  billingCycle === PlanInterval.MONTH
                    ? PlanInterval.YEAR
                    : PlanInterval.MONTH,
                )
              }
              className="relative cursor-pointer w-16 h-8 rounded-full bg-white/5 border border-white/10 p-1 flex items-center transition-all"
            >
              <div
                className={`w-6 h-6 rounded-full bg-brand shadow-[0_0_15px_rgba(0,216,230,0.4)] transition-all duration-300 ${
                  billingCycle === PlanInterval.YEAR
                    ? "translate-x-8"
                    : "translate-x-0"
                }`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-bold transition-colors ${billingCycle === PlanInterval.YEAR ? "text-white" : "text-neutral-500"}`}
              >
                Yearly
              </span>
              <span className="px-2 py-0.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-black uppercase tracking-wider">
                Upto 12% OFF
              </span>
            </div>
          </div>
        </div>

        {/* Early Access Highlight Tier */}
        {earlyAccessTier && (
          <div className="mb-12">
            <PlanTierCard
              tier={earlyAccessTier}
              index={0}
              isWide={true}
              handlePlanClick={handlePlanClick}
              getTierGradient={getTierGradient}
              getTierIcon={getTierIcon}
            />
          </div>
        )}

        {/* Main Tiers Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {filteredPlans?.map((tier: Plan, index: number) => (
            <PlanTierCard
              key={index}
              tier={tier}
              index={index}
              isWide={false}
              handlePlanClick={handlePlanClick}
              getTierGradient={getTierGradient}
              getTierIcon={getTierIcon}
            />
          ))}
        </motion.div>

        {/* Enterprise Tier Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <EnterpriseTierCard
            index={4}
            tier={enterpriseTier}
            handlePlanClick={handlePlanClick}
            getTierGradient={getTierGradient}
            getTierIcon={getTierIcon}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-24 text-center"
        >
          <p className="text-neutral-500 font-bold uppercase tracking-[0.2em] text-xs mb-4">
            Trusted by performant teams worldwide
          </p>
        </motion.div>
      </div>
    </section>
  );
}
