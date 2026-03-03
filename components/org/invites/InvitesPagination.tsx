import { OrganizationInvitation } from "@/features/organization/organization.interface";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const InvitesPagination = ({
  invites,
  totalInvites,
  setPage,
  page,
  totalPages,
}: {
  invites: OrganizationInvitation[];
  totalInvites: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  totalPages: number;
}) => {
  if (totalPages < 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 bg-white/2 border-t border-white/5"
    >
      <div className="flex items-center gap-4">
        <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
          Page {page} of {totalPages}
        </div>
        <span className="text-[10px] text-neutral-600 font-medium uppercase tracking-tighter">
          Showing {invites?.length || 0} of {totalInvites} invites
        </span>
      </div>

      <div className="flex items-center gap-1.5 p-1 bg-black/20 rounded-xl border border-white/5">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="p-2 cursor-pointer rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-1 px-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            // Show only a few pages if too many
            if (totalPages > 7) {
              if (
                p !== 1 &&
                p !== totalPages &&
                (p < page - 1 || p > page + 1)
              ) {
                if (p === page - 2 || p === page + 2) {
                  return (
                    <span key={p} className="text-neutral-600 text-[10px]">
                      ...
                    </span>
                  );
                }
                return null;
              }
            }

            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 flex items-center justify-center cursor-pointer rounded-lg text-xs font-bold transition-all ${
                  page === p
                    ? "bg-brand text-bg-dark-0 shadow-lg shadow-brand/20"
                    : "text-neutral-500 hover:text-white hover:bg-white/5"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="p-2 cursor-pointer rounded-lg text-brand hover:text-brand-light hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default InvitesPagination;
