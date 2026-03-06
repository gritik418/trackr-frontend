"use client";

import { TaskStatusWithAll } from "@/features/task/task.interface";
import { ChevronDown, Filter } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  activeStatus: TaskStatusWithAll;
  onStatusChange: (status: TaskStatusWithAll) => void;
};

const TaskStatusFilter = ({ activeStatus, onStatusChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const statuses = Object.values(TaskStatusWithAll);

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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center cursor-pointer flex-nowrap gap-2 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border
          ${
            isOpen || activeStatus !== TaskStatusWithAll.ALL
              ? "bg-brand/10 text-brand border-brand/30 shadow-[0_0_15px_rgba(var(--brand-rgb),0.1)]"
              : "bg-dashboard-card-bg/40 text-neutral-500 border-white/5 hover:border-white/10 hover:text-neutral-300"
          }
        `}
      >
        <Filter
          size={14}
          className={
            activeStatus !== TaskStatusWithAll.ALL
              ? "text-brand"
              : "text-neutral-500"
          }
        />
        <span className="text-nowrap">{activeStatus.replace("_", " ")}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-dashboard-card-bg/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="py-1">
            {statuses.toSorted().map((status) => (
              <button
                key={status}
                onClick={() => {
                  onStatusChange(status);
                  setIsOpen(false);
                }}
                className={`
                  w-full text-left cursor-pointer px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors
                  ${
                    activeStatus === status
                      ? "bg-brand/10 text-brand"
                      : "text-neutral-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                {status.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskStatusFilter;
