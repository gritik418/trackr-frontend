"use client";

import { SortBy, SortOrder } from "@/features/task/task.interface";
import { ArrowDownAZ, ArrowUpAZ, ChevronDown, ListFilter } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  sort: SortBy;
  sortOrder: SortOrder;
  onSortChange: (sort: SortBy) => void;
  onOrderToggle: () => void;
};

const TaskSortFilter = ({
  sort,
  sortOrder,
  onSortChange,
  onOrderToggle,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sortOptions: { value: SortBy; label: string }[] = [
    { value: "updatedAt", label: "Updated At" },
    { value: "createdAt", label: "Created At" },
    { value: "deadline", label: "Deadline" },
  ];

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

  const currentLabel =
    sortOptions.find((opt) => opt.value === sort)?.label || sort;

  return (
    <div className="relative flex items-center gap-1" ref={dropdownRef}>
      <div className="flex items-center bg-dashboard-card-bg/40 border border-white/5 rounded-xl overflow-hidden shadow-sm group hover:border-white/10 transition-all duration-300">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            flex items-center cursor-pointer flex-nowrap gap-2 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-300
            ${
              isOpen
                ? "bg-brand/10 text-brand shadow-[0_0_15px_rgba(var(--brand-rgb),0.1)]"
                : "text-neutral-500 hover:text-neutral-300"
            }
          `}
        >
          <ListFilter
            size={14}
            className={isOpen ? "text-brand" : "text-neutral-500"}
          />
          <span className="text-nowrap">{currentLabel}</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        <div className="w-px h-4 bg-white/10" />

        <button
          onClick={onOrderToggle}
          className="px-3 py-2.5 text-neutral-500 hover:text-brand hover:bg-brand/5 transition-all duration-300 flex items-center justify-center cursor-pointer"
          title={sortOrder === "asc" ? "Sort Ascending" : "Sort Descending"}
        >
          {sortOrder === "asc" ? (
            <ArrowUpAZ size={16} />
          ) : (
            <ArrowDownAZ size={16} />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 top-full w-48 bg-dashboard-card-bg/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="py-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value);
                  setIsOpen(false);
                }}
                className={`
                  w-full text-left cursor-pointer px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors
                  ${
                    sort === option.value
                      ? "bg-brand/10 text-brand"
                      : "text-neutral-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskSortFilter;
