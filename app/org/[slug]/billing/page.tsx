"use client";

import NoActivePlan from "@/components/billing/NoActivePlan";
import { selectOrganization } from "@/features/organization/organization.slice";
import { PlanType } from "@/features/plans/plans.interface";
import { useGetActiveSubscriptionQuery } from "@/features/subscription/subscription.api";
import { Subscription } from "@/features/subscription/subscription.interface";
import { Check, Download, ExternalLink, X, Zap } from "lucide-react";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function OrgBillingPage() {
  const organization = useSelector(selectOrganization);

  const [activePlan, setActivePlan] = useState<Subscription | null>(null);
  const { data } = useGetActiveSubscriptionQuery(organization?.id as string, {
    skip: !organization?.id,
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const invoices = [
    { id: "inv_001", date: "Feb 1, 2026", amount: "$49.00", status: "Paid" },
    { id: "inv_002", date: "Jan 1, 2026", amount: "$49.00", status: "Paid" },
    { id: "inv_003", date: "Dec 1, 2025", amount: "$49.00", status: "Paid" },
  ];

  useEffect(() => {
    if (data?.subscription) {
      setActivePlan(data.subscription);
    }
  }, [data]);

  if (!organization) {
    return notFound();
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="relative z-10">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-white/60 tracking-tight">
          Billing & Plans
        </h2>
        <p className="text-org-item-text mt-2 text-lg font-light">
          Manage your subscription and billing details.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 relative z-10">
        {/* Left Column - Plan & Usage */}
        <div className="lg:col-span-2 space-y-8">
          {/* Current Plan Card */}
          {activePlan && activePlan.id ? (
            <section className="p-8 rounded-3xl bg-org-card-bg/60 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
                      <Zap size={20} fill="currentColor" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {activePlan?.plan.name}
                    </h3>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                      {activePlan?.status}
                    </span>
                  </div>
                  {activePlan?.expiresAt && (
                    <p className="text-org-item-text text-sm">
                      Renews on{" "}
                      <span className="text-white font-medium">
                        {activePlan?.expiresAt}
                      </span>
                    </p>
                  )}

                  {activePlan?.plan.type &&
                    activePlan?.plan.type === PlanType.EARLY_ACCESS && (
                      <p className="text-[10px] text-brand hover:text-brand-hover font-medium underline-offset-4 hover:underline mt-1">
                        Early access plan is valid during the beta phase
                      </p>
                    )}
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-1 justify-end">
                    <span className="text-4xl font-bold text-white">
                      {activePlan?.price}
                    </span>
                    {activePlan?.plan.interval && (
                      <span className="text-neutral-500">
                        /{activePlan?.plan.interval}
                      </span>
                    )}
                  </div>
                  <button className="text-sm text-brand hover:text-brand-hover font-medium underline-offset-4 hover:underline mt-1">
                    Change Plan
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 grid sm:grid-cols-2 gap-4">
                {activePlan?.plan.features.map((feature, index: number) => (
                  <div
                    key={feature.text + index}
                    className="flex items-center gap-2 text-sm text-neutral-400"
                  >
                    {feature.included ? (
                      <Check size={16} className="text-brand" />
                    ) : (
                      <X size={16} className="text-brand" />
                    )}
                    {feature.text}
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 grid sm:grid-cols-2 gap-4">
                {activePlan?.startDate && (
                  <p className="text-sm text-neutral-400">
                    Start date:{" "}
                    <span className="text-white font-medium">
                      {formatDate(new Date(activePlan?.startDate))}
                    </span>
                  </p>
                )}
              </div>
            </section>
          ) : (
            <NoActivePlan onExplorePlans={() => {}} />
          )}
        </div>

        {/* Right Column - Payment & History */}
        <div className="space-y-8">
          {/* Payment Method */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-white px-1">
              Payment Method
            </h3>
            <div className="p-6 rounded-3xl bg-linear-to-br from-white/5 to-white/2 border border-white/5 relative overflow-hidden">
              <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-8 rounded bg-white/10 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-red-500/80 -mr-2" />
                  <div className="w-4 h-4 rounded-full bg-yellow-500/80" />
                </div>
                <button className="text-xs font-bold text-neutral-400 hover:text-white transition-colors border border-white/10 hover:bg-white/5 px-2 py-1 rounded-md">
                  Edit
                </button>
              </div>
              <div>
                <p className="text-neutral-400 text-sm">Visa ending in</p>
                <p className="text-xl font-mono text-white tracking-widest mt-1">
                  •••• 4242
                </p>
              </div>
              <p className="text-xs text-neutral-500 mt-4">Expires 12/28</p>
            </div>
          </section>

          {/* Invoice History */}
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-lg font-semibold text-white">Invoices</h3>
              <button className="text-xs text-brand hover:text-brand-hover flex items-center gap-1">
                View All <ExternalLink size={12} />
              </button>
            </div>

            <div className="rounded-2xl border border-white/5 bg-org-card-bg/40 overflow-hidden">
              <table className="w-full text-left">
                <tbody className="divide-y divide-white/5">
                  {invoices.map((inv) => (
                    <tr
                      key={inv.id}
                      className="group hover:bg-white/5 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="text-sm text-white font-medium">
                          {inv.date}
                        </div>
                        <div className="text-xs text-neutral-500">{inv.id}</div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="text-sm text-white">{inv.amount}</div>
                        <span className="text-[10px] uppercase font-bold text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded-sm">
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-2 py-3 w-10 text-right pr-4">
                        <button className="text-neutral-500 hover:text-white transition-colors">
                          <Download size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
