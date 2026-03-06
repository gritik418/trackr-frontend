"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface TaskSearchbarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TaskSearchbar({
  value,
  onChange,
  placeholder = "Search tasks...",
}: TaskSearchbarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(handler);
  }, [localValue, onChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" || e.key === "K") {
        setIsFocused(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="relative group w-full">
      {/* Glow Effect */}
      <div
        className={`absolute -inset-0.5 bg-linear-to-r from-brand/20 to-brand/0 rounded-xl blur opacity-0 transition duration-500 group-hover:opacity-100 ${
          isFocused ? "opacity-100" : ""
        }`}
      />

      <div
        className={`relative flex items-center bg-dashboard-card-bg/40 backdrop-blur-xl border rounded-xl transition-all duration-300 ${
          isFocused
            ? "border-brand/40 ring-1 ring-brand/20 shadow-[0_0_20px_rgba(var(--brand-rgb),0.1)]"
            : "border-white/5 hover:border-white/10"
        }`}
      >
        <div className="pl-4 flex items-center pointer-events-none">
          <Search
            size={18}
            className={`transition-colors duration-300 ${
              isFocused ? "text-brand" : "text-neutral-500"
            }`}
          />
        </div>

        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full outline-none bg-transparent border-none focus:ring-0 text-sm py-3 px-3 text-white placeholder:text-neutral-500 font-medium"
        />

        {localValue && (
          <button
            onClick={() => {
              setLocalValue("");
              onChange("");
            }}
            className="pr-4 text-neutral-500 hover:text-white transition-colors p-1"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Keyboard shortcut hint */}
      {!isFocused && !localValue && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] text-neutral-500 font-sans">
            ⌘
          </kbd>
          <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] text-neutral-500 font-sans">
            K
          </kbd>
        </div>
      )}
    </div>
  );
}
