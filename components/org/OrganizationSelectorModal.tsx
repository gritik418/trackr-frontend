"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Building2, Plus, Info, Sparkles } from "lucide-react";
import { OrgWithRole } from "@/features/organization/organization.interface";

interface OrganizationSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizations: OrgWithRole[];
  onSelect: (orgId: string) => void;
  onCreateNew: () => void;
  isLoading: boolean;
  isClaiming: boolean;
}

export const OrganizationSelectorModal = ({
  isOpen,
  onClose,
  organizations,
  onSelect,
  onCreateNew,
  isLoading,
  isClaiming,
}: OrganizationSelectorModalProps) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#020202]/80 backdrop-blur-md"
          />

          {/* Background Glow */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none overflow-hidden h-full w-full">
            <div className="w-[800px] h-[600px] bg-brand/20 blur-[130px] rounded-full opacity-30 animate-pulse" />
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-stone-900/60 backdrop-blur-3xl border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.7)] flex flex-col max-h-[90vh]"
          >
            {/* Mesh/Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-brand/5 via-transparent to-brand/5 pointer-events-none" />
            <div className="absolute -inset-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--brand-rgb),0.05),transparent_50%)] animate-[spin_20s_linear_infinite] pointer-events-none" />
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 pb-4 border-b border-white/5 relative z-10"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shadow-[0_0_20px_rgba(var(--brand-rgb),0.2)]">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-white line-clamp-1">
                      Claim Early Access
                    </h3>
                    <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">
                      Exclusive Benefit
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2.5 cursor-pointer hover:bg-white/5 rounded-full transition-all text-neutral-400 hover:text-white hover:rotate-90"
                >
                  <X size={20} />
                </button>
              </div>
            </motion.div>

            {/* Warning / Constraint Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="px-8 py-4 relative z-10"
            >
              <div className="flex gap-4 p-5 rounded-3xl bg-amber-500/5 border border-amber-500/10 items-start backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-linear-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                  <Info size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-amber-500 mb-1 uppercase tracking-tight">
                    Single Organization Limit
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-medium">
                    Early access can only be claimed for{" "}
                    <span className="text-amber-500 font-bold decoration-amber-500/30 underline underline-offset-4">
                      one organization
                    </span>{" "}
                    per user. This action is{" "}
                    <span className="text-white font-bold">permanent</span> and
                    cannot be transferred later.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-8 pt-2 custom-scrollbar space-y-3">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-6">
                  <div className="relative">
                    <div className="w-12 h-12 border-4 border-brand/20 border-t-brand rounded-full animate-spin" />
                    <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-brand rounded-full animate-ping opacity-20" />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-white text-sm font-black uppercase tracking-widest animate-pulse">
                      Loading
                    </p>
                    <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest">
                      Your Organizations
                    </p>
                  </div>
                </div>
              ) : organizations && organizations.length > 0 ? (
                <>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-6 px-2">
                    Available Organizations
                  </p>
                  <div className="space-y-4">
                    {organizations.map((org, index) => (
                      <motion.button
                        key={org.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        onClick={() => onSelect(org.id)}
                        disabled={isClaiming}
                        className="w-full relative cursor-pointer flex items-center gap-5 p-5 rounded-4xl bg-white/5 border border-white/5 hover:border-brand/40 hover:bg-brand/5 transition-all group active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                      >
                        {/* Hover Shine Effect */}
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                        <div className="w-14 h-14 rounded-2xl bg-stone-800 border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-brand group-hover:border-brand/30 group-hover:shadow-[0_0_20px_rgba(var(--brand-rgb),0.2)] transition-all overflow-hidden relative z-10">
                          {org.logoUrl ? (
                            <img
                              src={org.logoUrl}
                              alt={org.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Building2 size={24} />
                          )}
                        </div>
                        <div className="flex flex-col items-start relative z-10 transition-transform group-hover:translate-x-1">
                          <span className="font-black text-xl text-white group-hover:text-brand transition-colors tracking-tight">
                            {org.name}
                          </span>
                          <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-0.5 group-hover:text-brand/70 transition-colors">
                            Click to claim access
                          </span>
                        </div>
                        <div className="ml-auto relative z-10">
                          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all group-hover:-rotate-45">
                            <ArrowRight
                              size={20}
                              className="transition-transform"
                            />
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 bg-white/3 border border-dashed border-white/10 rounded-[3rem] relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-linear-to-b from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-20 h-20 rounded-4xl bg-stone-800 border border-white/5 flex items-center justify-center mx-auto mb-6 text-neutral-600 relative z-10 shadow-2xl">
                    <Building2
                      size={40}
                      className="group-hover:text-brand/50 transition-colors"
                    />
                  </div>
                  <p className="text-neutral-400 font-bold mb-8 px-12 leading-relaxed text-sm relative z-10">
                    You don't have any organizations yet. Create one to claim
                    your early access benefits.
                  </p>
                  <button
                    onClick={onCreateNew}
                    className="relative cursor-pointer z-10 inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-bg-dark-0 font-black text-sm hover:bg-brand hover:text-white transition-all active:scale-95 shadow-[0_20px_40px_-12px_rgba(255,255,255,0.2)] hover:shadow-[0_20px_40px_-12px_rgba(var(--brand-rgb),0.4)]"
                  >
                    <Plus size={20} strokeWidth={3} />
                    Create Organization
                  </button>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            {organizations && organizations.length > 0 && (
              <div className="p-8 border-t border-white/5 bg-white/2 flex items-center justify-center relative z-10">
                <button
                  onClick={onCreateNew}
                  className="flex cursor-pointer items-center gap-3 p-4 px-6 rounded-2xl text-xs font-black uppercase tracking-widest text-neutral-500 hover:text-brand hover:bg-brand/10 transition-all group active:scale-95"
                >
                  <Plus
                    size={16}
                    strokeWidth={3}
                    className="text-neutral-500 group-hover:text-brand transition-colors"
                  />
                  Need a different organization?
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
