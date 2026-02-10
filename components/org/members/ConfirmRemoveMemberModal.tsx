"use client";

import { X, AlertTriangle, ShieldAlert } from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface ConfirmRemoveMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  memberName: string;
  memberEmail: string;
  isLoading?: boolean;
}

export function ConfirmRemoveMemberModal({
  isOpen,
  onClose,
  onConfirm,
  memberName,
  memberEmail,
  isLoading,
}: ConfirmRemoveMemberModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-[#0A0A0B] border border-white/10 shadow-2xl shadow-black/80 animate-in zoom-in-95 fade-in duration-300">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/10 blur-[60px] -mr-24 -mt-24 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-500/5 blur-[60px] -ml-24 -mb-24 pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shadow-inner">
              <ShieldAlert size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight leading-none mb-1">
                Danger Zone
              </h3>
              <p className="text-[10px] text-red-500/70 font-bold uppercase tracking-[0.15em]">
                Confirm Removal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 cursor-pointer hover:bg-white/5 rounded-2xl transition-all text-neutral-500 hover:text-white group border border-transparent hover:border-white/10"
          >
            <X
              size={18}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 relative z-10 text-center">
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white tracking-tight">
              Remove from Org?
            </h4>
            <p className="text-neutral-400 leading-relaxed text-[0.9375rem] max-w-[320px] mx-auto">
              Are you sure you want to revoke access for this member?
            </p>
          </div>

          {/* Member Profile Card */}
          <div className="p-1 rounded-3xl bg-white/5 border border-white/5 w-full shadow-inner">
            <div className="bg-black/30 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 font-bold text-lg shadow-inner shrink-0 leading-none">
                {getInitials(memberName)}
              </div>
              <div className="text-left overflow-hidden">
                <p className="text-white font-bold truncate leading-none mb-1.5 min-w-0">
                  {memberName}
                </p>
                <p className="text-neutral-500 text-xs truncate font-medium min-w-0">
                  {memberEmail}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10 flex items-start gap-3 text-left">
            <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-red-500/80 leading-relaxed font-medium">
              This will immediately revoke access to all organization projects
              and shared data. You can re-invite them later if needed.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-black/40 flex gap-3 border-t border-white/5 relative z-10">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 cursor-pointer px-4 py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold text-sm rounded-2xl transition-all border border-white/5 hover:border-white/10 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              "flex-[1.5] cursor-pointer px-4 py-3.5 font-bold text-sm rounded-2xl transition-all flex items-center justify-center gap-2",
              "bg-red-500 text-white hover:bg-red-600 shadow-xl shadow-red-500/20 active:scale-95 disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed",
            )}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Removing...</span>
              </>
            ) : (
              "Remove Member"
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
