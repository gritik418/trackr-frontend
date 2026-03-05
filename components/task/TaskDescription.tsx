"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Edit2, AlertCircle, Check } from "lucide-react";

interface TaskDescriptionProps {
  description: string;
  setDescription: (val: string) => void;
  isEditingDesc: boolean;
  setIsEditingDesc: (val: boolean) => void;
  handleDescSubmit: () => void;
  displayDescription: string | null | undefined;
}

export function TaskDescription({
  description,
  setDescription,
  isEditingDesc,
  setIsEditingDesc,
  handleDescSubmit,
  displayDescription,
}: TaskDescriptionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-px bg-brand/40 shadow-[0_0_8px_rgba(0,186,199,0.5)]" />
          <span className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.4em] italic">
            Description
          </span>
        </div>
        <AnimatePresence>
          {!isEditingDesc && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => setIsEditingDesc(true)}
              className="text-[10px] font-black text-neutral-600 uppercase tracking-widest hover:text-brand bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 hover:border-brand/30 transition-all flex items-center gap-2 group/edit-btn shadow-lg"
            >
              <Edit2
                size={12}
                className="group-hover/edit-btn:rotate-12 transition-transform"
              />
              Override
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          {isEditingDesc ? (
            <motion.div
              key="editing-desc"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-4"
            >
              <div className="relative group/textarea">
                <textarea
                  autoFocus
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full min-h-[300px] text-neutral-200 leading-relaxed text-lg font-medium bg-[#0A0A0A] p-8 rounded-[32px] border-2 border-brand/20 focus:border-brand/40 outline-none transition-all shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] resize-none selection:bg-brand/20 scrollbar-hide"
                  placeholder="Initialize project documentation..."
                />
              </div>
              <div className="flex justify-end gap-3 px-2">
                <button
                  onClick={() => {
                    setDescription(displayDescription || "");
                    setIsEditingDesc(false);
                  }}
                  className="px-6 py-3 rounded-2xl bg-white/2 text-neutral-500 font-bold text-sm tracking-widest uppercase hover:text-white hover:bg-white/5 transition-all"
                >
                  Discard
                </button>
                <button
                  onClick={handleDescSubmit}
                  className="px-10 py-3 bg-brand text-bg-dark-0 font-black text-sm tracking-widest uppercase rounded-2xl shadow-[0_10px_30px_rgba(0,186,199,0.2)] active:scale-95 transition-all flex items-center gap-3"
                >
                  <Check size={18} strokeWidth={3} />
                  Commit Changes
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="static-desc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditingDesc(true)}
              className="group/desc-box relative text-neutral-400 leading-relaxed text-[17px] font-medium bg-white/2 p-8 rounded-[32px] border border-white/5 hover:border-brand/20 transition-all duration-500 cursor-pointer shadow-inner"
            >
              {displayDescription ? (
                <div className="selection:bg-brand/20 whitespace-pre-wrap">
                  {displayDescription}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 gap-4 text-neutral-700 group-hover/desc-box:text-neutral-500 transition-colors">
                  <AlertCircle size={32} className="opacity-20" />
                  <span className="italic font-light tracking-wide">
                    No active documentation for this node. Click to initialize.
                  </span>
                </div>
              )}

              <div className="absolute top-4 right-4 opacity-0 group-hover/desc-box:opacity-100 transition-opacity">
                <Edit2 size={16} className="text-brand/50" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
