"use client";

import { AlertTriangle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface RevokeInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  email: string;
  isRevoking: boolean;
}

export function RevokeInviteModal({
  isOpen,
  onClose,
  onConfirm,
  email,
  isRevoking,
}: RevokeInviteModalProps) {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-dashboard-card-bg border border-dashboard-border rounded-3xl shadow-2xl shadow-black/50 animate-in zoom-in-95 fade-in duration-300 transform overflow-hidden"
      >
        {/* Danger Zone Glow */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-red-500/50 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-500/10 blur-2xl rounded-full pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
              <AlertTriangle size={24} />
            </div>
            <button
              onClick={onClose}
              className="p-2 cursor-pointer rounded-xl text-neutral-500 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Revoke Invitation
            </h2>
            <p className="text-neutral-400 text-sm mt-2 leading-relaxed">
              Are you sure you want to revoke the invitation for{" "}
              <span className="text-white font-medium">{email}</span>? This will
              deactivate the link immediately.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              disabled={isRevoking}
              className="flex-1 cursor-pointer px-5 py-3.5 bg-white/5 border border-white/5 rounded-xl text-white font-bold hover:bg-white/10 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isRevoking}
              className="flex-1 cursor-pointer px-5 py-3.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isRevoking ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Revoking...
                </>
              ) : (
                "Revoke Link"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
