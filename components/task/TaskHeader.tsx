"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Copy, Edit2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TaskHeaderProps {
  slug: string;
  projectId: string;
  copyTaskLink: () => void;
}

export function TaskHeader({ slug, projectId, copyTaskLink }: TaskHeaderProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-6"
    >
      <div className="flex items-center gap-5">
        <button
          onClick={() => router.back()}
          className="group p-3 cursor-pointer rounded-2xl bg-white/2 border border-white/5 text-neutral-500 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 shadow-xl"
        >
          <ChevronLeft
            size={22}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
        </button>
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-600 mb-2">
            <Link
              href={`/dashboard/${slug}/projects/${projectId}`}
              className="hover:text-brand transition-colors"
            >
              Workspace
            </Link>
            <ChevronRight size={10} className="opacity-30" />
            <span className="text-neutral-400">Task Node</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Task <span className="text-brand">Details</span>
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={copyTaskLink}
          className="flex cursor-pointer items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] active:scale-95"
        >
          <Copy size={14} />
          Copy Task URL
        </button>
      </div>
    </motion.div>
  );
}

export function TaskTitleSection({
  isEditingTitle,
  title,
  setTitle,
  handleTitleSubmit,
  setIsEditingTitle,
  displayTitle,
  canEdit = true,
}: {
  isEditingTitle: boolean;
  title: string;
  setTitle: (val: string) => void;
  handleTitleSubmit: () => void;
  setIsEditingTitle: (val: boolean) => void;
  displayTitle: string;
  canEdit?: boolean;
}) {
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isEditingTitle && canEdit ? (
          <motion.div
            key="editing-title"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className="flex items-stretch gap-3"
          >
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleSubmit}
              onKeyDown={(e) => e.key === "Enter" && handleTitleSubmit()}
              className="text-3xl font-black text-white tracking-tighter leading-none bg-white/5 border-2 border-brand/50 rounded-3xl px-6 py-4 w-full outline-none focus:border-brand transition-all shadow-[0_0_40px_rgba(0,186,199,0.15)] placeholder:text-neutral-700"
              placeholder="Define the objective..."
            />
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleTitleSubmit}
              className="px-6 bg-brand cursor-pointer text-bg-dark-0 rounded-3xl shadow-[0_10px_30px_rgba(0,186,199,0.3)] active:scale-90 transition-all flex items-center justify-center"
            >
              <Check size={28} strokeWidth={4} />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="static-title"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            onClick={() => canEdit && setIsEditingTitle(true)}
            className={cn(
              "flex items-start justify-between group/title-hover pr-4",
              canEdit ? "cursor-pointer" : "cursor-default",
            )}
          >
            <h2
              className={cn(
                "text-3xl font-black text-white tracking-tighter leading-tight flex-1 selection:bg-brand/30 transition-colors",
                canEdit && "group-hover/title-hover:text-brand",
              )}
            >
              {displayTitle}
            </h2>
            {canEdit && (
              <div className="mt-2 p-3 text-neutral-700 group-hover/title-hover:text-brand bg-white/0 group-hover/title-hover:bg-brand/10 rounded-2xl opacity-0 group-hover/title-hover:opacity-100 transition-all duration-300">
                <Edit2 size={24} strokeWidth={2.5} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
