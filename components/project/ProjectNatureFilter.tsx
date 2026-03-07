import { ProjectNatureWithAll } from "@/features/project/project.interface";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Globe, Lock, Shield } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface ProjectNatureFilterProps {
  value: (typeof ProjectNatureWithAll)[keyof typeof ProjectNatureWithAll];
  onChange: (
    value: (typeof ProjectNatureWithAll)[keyof typeof ProjectNatureWithAll],
  ) => void;
}

const ProjectNatureFilter = ({ value, onChange }: ProjectNatureFilterProps) => {
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

  const getIcon = (nature: string) => {
    switch (nature) {
      case "PRIVATE":
        return <Lock size={14} className="text-emerald-400" />;
      case "PUBLIC":
        return <Globe size={14} className="text-blue-400" />;
      default:
        return <Shield size={14} />;
    }
  };

  return (
    <div className={`relative ${isOpen ? "z-50" : "z-10"}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-dashboard-card-bg/30 border border-dashboard-border rounded-xl text-sm text-neutral-300 hover:text-white hover:border-brand/30 hover:bg-dashboard-card-bg/50 transition-all cursor-pointer group"
      >
        {getIcon(value as string)}
        <span className="font-medium min-w-[80px] text-left">
          {value === (ProjectNatureWithAll.ALL as any)
            ? "All Natures"
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
              {Object.values(ProjectNatureWithAll)
                .sort((a, b) => {
                  if (a === (ProjectNatureWithAll.ALL as any)) return -1;
                  if (b === (ProjectNatureWithAll.ALL as any)) return 1;
                  return a.localeCompare(b);
                })
                .map((nature) => (
                  <button
                    key={nature}
                    onClick={() => {
                      onChange(nature);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all cursor-pointer group ${
                      value === nature
                        ? "bg-brand/10 text-brand font-bold"
                        : "text-neutral-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {getIcon(nature as string)}
                      <span className="capitalize">
                        {nature.toLowerCase().replace("_", " ")}
                      </span>
                    </div>
                    {value === nature && (
                      <motion.div
                        layoutId="nature-active-indicator"
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

export default ProjectNatureFilter;
