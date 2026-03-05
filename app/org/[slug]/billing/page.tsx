"use client";

import NoActivePlan from "@/components/billing/NoActivePlan";
import { selectOrganization } from "@/features/organization/organization.slice";
import { PlanType } from "@/features/plans/plans.interface";
import {
  useGetActiveSubscriptionQuery,
  useGetSubscriptionHistoryQuery,
} from "@/features/subscription/subscription.api";
import { Subscription } from "@/features/subscription/subscription.interface";
import { Check, Download, ExternalLink, X, Zap } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function OrgBillingPage() {
  const organization = useSelector(selectOrganization);

  const [activePlan, setActivePlan] = useState<Subscription | null>(null);
  const [history, setHistory] = useState<Subscription[]>([]);

  const { data } = useGetActiveSubscriptionQuery(organization?.id as string, {
    skip: !organization?.id,
  });

  const { data: historyData } = useGetSubscriptionHistoryQuery(
    organization?.id as string,
    {
      skip: !organization?.id,
    },
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const invoices = [
    {
      id: "INV-2026-001",
      date: "Feb 1, 2026",
      amount: "$49.00",
      status: "PAID",
      plan: "Growth Plan",
      method: "Visa •••• 4242",
    },
    {
      id: "INV-2026-002",
      date: "Jan 1, 2026",
      amount: "$49.00",
      status: "PAID",
      plan: "Growth Plan",
      method: "Visa •••• 4242",
    },
    {
      id: "INV-2025-012",
      date: "Dec 1, 2025",
      amount: "$49.00",
      status: "PAID",
      plan: "Growth Plan",
      method: "Visa •••• 4242",
    },
    {
      id: "INV-2025-011",
      date: "Nov 1, 2025",
      amount: "$49.00",
      status: "FAILED",
      plan: "Growth Plan",
      method: "Visa •••• 1111",
    },
  ];

  useEffect(() => {
    if (data?.subscription) {
      setActivePlan(data.subscription);
    }
  }, [data]);

  useEffect(() => {
    if (historyData?.history) {
      setHistory(historyData.history);
    }
  }, [historyData]);

  console.log(history);
  if (!organization) {
    return notFound();
  }

  const getStatusStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case "PAID":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "FAILED":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "PENDING":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-neutral-500/10 text-neutral-400 border-neutral-500/20";
    }
  };

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
        <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Plan Card */}
          <div className="lg:col-span-2 space-y-8">
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

          {/* Right Column - Payment Method */}
          <div className="space-y-8 lg:col-span-1">
            {/* Billing Support / Help */}
            <section className="p-6 rounded-3xl bg-brand/5 border border-brand/10 relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand/10 blur-2xl rounded-full" />
              <h4 className="text-white font-bold mb-2 relative z-10">
                Need help with billing?
              </h4>
              <p className="text-sm text-neutral-400 mb-4 relative z-10">
                Our support team is available 24/7 for any subscription or
                invoice inquiries.
              </p>
              <Link
                href={"/contact"}
                className="flex items-center gap-2 text-sm font-bold text-brand hover:text-brand-light transition-all group/link relative z-10"
              >
                Contact Support{" "}
                <ExternalLink
                  size={14}
                  className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"
                />
              </Link>
            </section>
          </div>
        </div>

        {/* Left Column - Plan & Usage */}
        <div className="lg:col-span-3 space-y-8">
          {/* Detailed Invoice History - Moved to Left for more space */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-2xl font-bold text-white">Billing History</h3>
            </div>

            <div className="rounded-3xl border border-white/5 bg-org-card-bg/40 backdrop-blur-xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/2">
                      <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                        Invoice ID
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                        Plan
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">
                        Purchase Date
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">
                        Expires On
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {history.map((history) => (
                      <tr
                        key={history.id}
                        className="group hover:bg-white/5 transition-all duration-200"
                      >
                        <td className="px-6 py-5">
                          <div className="text-sm text-white font-bold group-hover:text-brand transition-colors">
                            {history.id}
                          </div>
                          <div className="text-xs text-neutral-500 mt-1 font-medium">
                            {new Date(history?.createdAt).toDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-sm text-neutral-300 font-medium">
                            {history?.plan?.name}
                          </div>
                          <div className="text-[10px] text-neutral-600 font-mono mt-1">
                            {history?.plan?.interval}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-sm text-white font-bold">
                            {history.currency === "USD" ? "$" : "₹"}{" "}
                            {history.price}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${getStatusStyle(history.status)}`}
                          >
                            {history.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <span className="text-sm text-neutral-300 font-medium">
                            {new Date(history?.createdAt).toDateString()}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <span className="text-sm text-neutral-300 font-medium">
                            {history.expiresAt
                              ? new Date(history?.expiresAt).toDateString()
                              : "N/A"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {invoices.length > 5 && (
                <div className="p-4 border-t border-white/5 text-center">
                  <button className="text-sm font-bold text-neutral-500 hover:text-white transition-colors">
                    View full history
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
