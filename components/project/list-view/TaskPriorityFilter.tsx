"use client";

import { TaskPriorityWithAll } from "@/features/task/task.interface";
import { ChevronDown, Zap } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  activePriority: TaskPriorityWithAll;
  onPriorityChange: (priority: TaskPriorityWithAll) => void;
};

const TaskPriorityFilter = ({ activePriority, onPriorityChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const priorities = Object.values(TaskPriorityWithAll);

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
            isOpen || activePriority !== TaskPriorityWithAll.ALL
              ? "bg-brand/10 text-brand border-brand/30 shadow-[0_0_15px_rgba(var(--brand-rgb),0.1)]"
              : "bg-dashboard-card-bg/40 text-neutral-500 border-white/5 hover:border-white/10 hover:text-neutral-300"
          }
        `}
      >
        <Zap
          size={14}
          className={
            activePriority !== TaskPriorityWithAll.ALL
              ? "text-brand"
              : "text-neutral-500"
          }
        />
        <span className="text-nowrap">{activePriority.replace("_", " ")}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-dashboard-card-bg/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="py-1">
            {priorities.toSorted().map((priority) => (
              <button
                key={priority}
                onClick={() => {
                  onPriorityChange(priority);
                  setIsOpen(false);
                }}
                className={`
                  w-full text-left cursor-pointer px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors
                  ${
                    activePriority === priority
                      ? "bg-brand/10 text-brand"
                      : "text-neutral-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                {priority.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskPriorityFilter;
