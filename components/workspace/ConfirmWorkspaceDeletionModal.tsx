import { ShieldAlert, X } from "lucide-react";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  workspaceName: string;
  onConfirm: () => void;
  isDeleting?: boolean;
};

const ConfirmWorkspaceDeletionModal = ({
  open,
  onClose,
  workspaceName,
  onConfirm,
  isDeleting = false,
}: Props) => {
  const [confirmText, setConfirmText] = useState("");
  const isConfirmed = confirmText === workspaceName;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-4xl bg-dashboard-card-bg/80 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/50 animate-in zoom-in-95 fade-in duration-300">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl -mr-16 -mt-16 pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-red-500/10 border border-red-500/20">
              <ShieldAlert size={22} className="text-red-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Danger Zone
              </h3>
              <p className="text-xs text-red-500/70 font-medium">
                Action Required
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 cursor-pointer hover:bg-white/5 rounded-xl transition-all text-neutral-400 hover:text-white group"
          >
            <X
              size={20}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white">
              Delete Workspace
            </h4>
            <p className="text-neutral-400 leading-relaxed text-[0.9375rem]">
              This action is{" "}
              <span className="text-red-400 font-bold uppercase text-[0.7rem] tracking-widest px-1.5 py-0.5 rounded bg-red-400/10">
                irreversible
              </span>
              . All data, projects, and settings associated with{" "}
              <span className="text-white font-medium italic">
                "{workspaceName}"
              </span>{" "}
              will be permanently removed.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-4 shadow-inner">
            <p className="text-sm text-neutral-400 font-medium text-center">
              Type{" "}
              <span className="text-white font-bold select-all italic mx-1">
                "{workspaceName}"
              </span>{" "}
              to confirm:
            </p>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={`Enter "${workspaceName}"`}
              className="w-full px-5 py-3.5 bg-white/5 rounded-xl text-white border border-white/10 outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500/40 transition-all placeholder:text-neutral-700 font-medium text-center"
              autoFocus
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-black/20 flex gap-3 border-t border-white/5">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 cursor-pointer px-4 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all border border-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!isConfirmed || isDeleting}
            className={`flex-[1.8] cursor-pointer px-4 py-3.5 font-bold rounded-xl transition-all ${
              isConfirmed && !isDeleting
                ? "bg-red-500 text-white hover:bg-red-600 shadow-xl shadow-red-500/20 active:scale-95"
                : "bg-red-500/10 text-red-500/40 cursor-not-allowed border border-red-500/10"
            }`}
          >
            {isDeleting ? "Deleting..." : "Delete Permanently"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmWorkspaceDeletionModal;
