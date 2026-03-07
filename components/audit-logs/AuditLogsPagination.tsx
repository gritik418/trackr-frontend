import { AuditLog } from "@/features/audit-logs/audit-logs.interface";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  logs: AuditLog[];
  totalLogs: number;
  page: number;
  setPage: (page: number) => void;
  isFetching: boolean;
  totalPages: number;
};

const AuditLogsPagination = ({
  logs,
  totalLogs,
  page,
  setPage,
  isFetching,
  totalPages,
}: Props) => {
  if (totalPages < 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 flex w-full flex-col md:flex-row justify-between items-center gap-4 bg-white/2 p-4 rounded-3xl border border-white/5"
    >
      <div className="flex items-center gap-4">
        <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
          Page {page} of {totalPages}
        </div>
        <span className="text-[10px] text-neutral-600 font-medium uppercase tracking-tighter">
          Showing {logs.length || 0} of {totalLogs} events found
        </span>
      </div>

      <div className="flex items-center gap-1.5 p-1 bg-black/20 rounded-xl border border-white/5">
        <button
          disabled={page === 1 || isFetching}
          onClick={() => setPage(page - 1)}
          className="p-2 cursor-pointer rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-1 px-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
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
          disabled={page >= totalPages || isFetching}
          onClick={() => setPage(page + 1)}
          className="p-2 cursor-pointer rounded-lg text-brand hover:text-brand-light hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default AuditLogsPagination;
