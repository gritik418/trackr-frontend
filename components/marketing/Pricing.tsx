"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Shield, ArrowRight, Globe } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const mainTiers = [
  {
    name: "Free",
    id: "tier-free",
    href: "/signup",
    price: { monthly: "$0", yearly: "$0" },
    description: "Ideal for personal projects and small side-hustles.",
    features: [
      "1 Business Organization",
      "1 Private Workspace",
      "3 Active Projects",
      "50 Tasks total capacity",
      "Up to 3 Team Members",
      "7-day Activity History",
      "Core Task Management",
    ],
    mostPopular: false,
    gradient: "from-neutral-500/10 to-transparent",
    icon: <Zap size={24} className="text-neutral-400" />,
    note: "No credit card required (in beta)",
  },
  {
    name: "Pro",
    id: "tier-pro",
    href: "/signup",
    price: { monthly: "$12", yearly: "$9" },
    description: "The standard for high-performance teams.",
    features: [
      "Everything in Free",
      "Up to 5 Specialized Workspaces",
      "15 Active Projects",
      "Unlimited Task Tracking",
      "Up to 15 Team Members",
      "Premium Role Management",
      "90-day Activity Archive",
      "Priority Email Support",
    ],
    mostPopular: true,
    gradient: "from-brand/20 to-purple-500/5",
    icon: <Sparkles size={24} className="text-brand" />,
  },
  {
    name: "Business",
    id: "tier-business",
    href: "/signup",
    price: { monthly: "$24", yearly: "$19" },
    description: "Scale your organization with advanced controls.",
    features: [
      "Everything in Pro",
      "Up to 5 Business Organizations",
      "Unlimited Managed Workspaces",
      "50 Active Projects",
      "Unlimited Team Members",
      "Full Audit Log Access",
      "Advanced Analytics Suite",
      "24/7 Priority Support",
    ],
    mostPopular: false,
    gradient: "from-purple-500/10 to-transparent",
    icon: <Shield size={24} className="text-purple-400" />,
  },
];

const enterpriseTier = {
  name: "Enterprise",
  id: "tier-enterprise",
  href: "/signup",
  price: { monthly: "Custom", yearly: "Custom" },
  description: "Global-scale infrastructure for large enterprises.",
  features: [
    "Everything in Business",
    "Unlimited Organizations & Workspaces",
    "Unlimited Project Capacity",
    "Dedicated Account Manager",
    "Tailored SLA & Compliance",
    "White-labeled Interface",
    "Single Sign-On (SSO) Support",
    "Private Cloud Deployment",
  ],
  mostPopular: false,
  gradient: "from-brand/10 via-purple-500/10 to-transparent",
  icon: <Globe size={24} className="text-brand/80" />,
};

interface PricingTier {
  name: string;
  id: string;
  href: string;
  price: { monthly: string; yearly: string };
  description: string;
  features: string[];
  mostPopular: boolean;
  gradient: string;
  icon: React.ReactNode;
  note?: string;
}

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  const renderTierCard = (tier: PricingTier, index: number, isWide = false) => (
    <motion.div
      key={tier.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative group h-full flex flex-col p-10 rounded-[3rem] bg-bg-dark-1 border transition-all duration-500 hover:scale-[1.01] ${
        tier.mostPopular
          ? "border-brand/40 shadow-2xl shadow-brand/5 scale-105 z-20 bg-linear-to-b from-brand/5 to-transparent"
          : "border-white/5 hover:border-white/10"
      } ${isWide ? "md:flex-row md:items-center md:gap-12 md:p-12" : ""}`}
    >
      {tier.mostPopular && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-brand text-bg-dark-0 text-xs font-black uppercase tracking-widest shadow-lg shadow-brand/20 z-30">
          Most Popular
        </div>
      )}

      <div
        className={`absolute inset-0 bg-linear-to-b ${tier.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[3rem]`}
      />

      <div
        className={`relative z-10 flex-1 flex flex-col ${isWide ? "md:flex-row md:items-center md:gap-12 w-full" : ""}`}
      >
        <div className={isWide ? "md:w-1/3" : ""}>
          <div className="flex items-center justify-between mb-8">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              {tier.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white text-right">
                {tier.name}
              </h3>
              <p className="text-neutral-500 text-xs text-right mt-1 uppercase tracking-widest font-black">
                Plan
              </p>
            </div>
          </div>

          <div className="mb-8 border-b border-white/5 pb-8">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold tracking-tighter text-white">
                {billingCycle === "yearly"
                  ? tier.price.yearly
                  : tier.price.monthly}
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
          className={`flex-1 flex flex-col ${isWide ? "md:border-l md:border-white/5 md:pl-12" : ""}`}
        >
          <ul
            className={`space-y-4 mb-10 flex-1 ${isWide ? "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 space-y-0" : ""}`}
          >
            {tier.features.map((feature: string) => (
              <li key={feature} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-brand" />
                </div>
                <span className="text-neutral-300 font-medium text-sm">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href={tier.href}
            className={`relative w-full py-5 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all group/btn active:scale-95 overflow-hidden ${
              tier.mostPopular
                ? "bg-white text-bg-dark-0 shadow-xl shadow-white/5 hover:bg-brand hover:shadow-brand/20"
                : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
            } ${isWide ? "md:max-w-xs" : ""}`}
          >
            {tier.mostPopular && (
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

  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 blur-[150px] rounded-full" />

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
          <div className="mt-12 flex justify-center items-center gap-4">
            <span
              className={`text-sm font-bold transition-colors ${billingCycle === "monthly" ? "text-white" : "text-neutral-500"}`}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBillingCycle(
                  billingCycle === "monthly" ? "yearly" : "monthly",
                )
              }
              className="relative w-16 h-8 rounded-full bg-white/5 border border-white/10 p-1 flex items-center transition-all"
            >
              <div
                className={`w-6 h-6 rounded-full bg-brand shadow-[0_0_15px_rgba(0,216,230,0.4)] transition-all duration-300 ${
                  billingCycle === "yearly" ? "translate-x-8" : "translate-x-0"
                }`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-bold transition-colors ${billingCycle === "yearly" ? "text-white" : "text-neutral-500"}`}
              >
                Yearly
              </span>
              <span className="px-2 py-0.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-black uppercase tracking-wider">
                20% OFF
              </span>
            </div>
          </div>
        </div>

        {/* Main Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mainTiers.map((tier, index) =>
            renderTierCard(tier as PricingTier, index),
          )}
        </div>

        {/* Enterprise Tier Row */}
        <div className="mt-8">
          {renderTierCard(enterpriseTier as PricingTier, 3, true)}
        </div>

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
