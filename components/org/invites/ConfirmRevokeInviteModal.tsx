"use client";

import { AlertTriangle, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onConfirm: () => void;
  isLoading?: boolean;
};

const ConfirmRevokeInviteModal = ({
  isOpen,
  onClose,
  email,
  onConfirm,
  isLoading,
}: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xs animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-4xl bg-org-card-bg/80 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/50 animate-in zoom-in-95 fade-in duration-300">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl -mr-16 -mt-16 pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
              <AlertTriangle size={22} className="text-amber-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Revoke Invite
              </h3>
              <p className="text-xs text-amber-500/70 font-medium">
                Confirmation Required
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 cursor-pointer hover:bg-white/5 rounded-xl transition-all text-org-item-text hover:text-white group"
          >
            <X
              size={20}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-4">
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white">Are you sure?</h4>
            <p className="text-org-item-text leading-relaxed text-[0.9375rem]">
              You are about to revoke the invitation sent to{" "}
              <span className="text-white font-medium italic">"{email}"</span>.
              This person will no longer be able to use the link to join your
              organization.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-black/20 flex gap-3 border-t border-white/5">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 cursor-pointer px-4 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all border border-white/5 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-[1.8] cursor-pointer px-4 py-3.5 bg-amber-500 text-bg-dark-0 font-bold rounded-xl transition-all hover:bg-amber-400 shadow-xl shadow-amber-500/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-bg-dark-0/30 border-t-bg-dark-0 animate-spin" />
                Revoking...
              </>
            ) : (
              "Revoke Invitation"
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ConfirmRevokeInviteModal;
