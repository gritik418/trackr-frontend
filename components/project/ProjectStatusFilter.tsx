import { ProjectStatusWithAll } from "@/features/project/project.interface";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Filter } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface ProjectStatusFilterProps {
  value: (typeof ProjectStatusWithAll)[keyof typeof ProjectStatusWithAll];
  onChange: (
    value: (typeof ProjectStatusWithAll)[keyof typeof ProjectStatusWithAll],
  ) => void;
}

const ProjectStatusFilter = ({ value, onChange }: ProjectStatusFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-brand text-brand";
      case "COMPLETED":
        return "bg-emerald-400 text-emerald-400";
      case "ON_HOLD":
        return "bg-amber-400 text-amber-400";
      case "BLOCKED":
        return "bg-rose-400 text-rose-400";
      case "DRAFT":
        return "bg-sky-400 text-sky-400";
      case "CANCELED":
        return "bg-zinc-500 text-zinc-500";
      case "ARCHIVED":
        return "bg-purple-400 text-purple-400";
      default:
        return "bg-neutral-500 text-neutral-500";
    }
  };

  return (
    <div className={`relative ${isOpen ? "z-50" : "z-10"}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-dashboard-card-bg/30 border border-dashboard-border rounded-xl text-sm text-neutral-300 hover:text-white hover:border-brand/30 hover:bg-dashboard-card-bg/50 transition-all cursor-pointer group"
      >
        <Filter
          size={14}
          className={
            value !== (ProjectStatusWithAll.ALL as any) ? "text-brand" : ""
          }
        />
        <span className="font-medium min-w-[80px] text-left">
          {value === (ProjectStatusWithAll.ALL as any)
            ? "All Statuses"
            : (value as string).replace("_", " ")}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-56 p-2 bg-[#0C0C0C] border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl z-50 overflow-hidden"
          >
            <div className="space-y-1">
              {Object.values(ProjectStatusWithAll)
                .sort((a, b) => {
                  if (a === (ProjectStatusWithAll.ALL as any)) return -1;
                  if (b === (ProjectStatusWithAll.ALL as any)) return 1;
                  return a.localeCompare(b);
                })
                .map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      onChange(status);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all cursor-pointer group ${
                      value === status
                        ? "bg-brand/10 text-brand font-bold"
                        : "text-neutral-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {status !== ProjectStatusWithAll.ALL && (
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${getStatusColor(status).split(" ")[0]}`}
                        />
                      )}
                      <span className="capitalize">
                        {status.toLowerCase().replace("_", " ")}
                      </span>
                    </div>
                    {value === status && (
                      <motion.div
                        layoutId="active-indicator"
                        className="w-1 h-1 rounded-full bg-brand"
                      />
                    )}
                  </button>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectStatusFilter;
