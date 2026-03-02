"use client";

import { Calendar } from "lucide-react";
import { useRef } from "react";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export const DatePicker = ({
  value,
  onChange,
  placeholder,
  label,
}: DatePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest pl-1">
          {label}
        </span>
      )}
      <div
        onClick={() => inputRef.current?.showPicker()}
        className="group relative flex items-center gap-2 px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-xl transition-all cursor-pointer backdrop-blur-md"
      >
        <Calendar
          size={14}
          className="text-neutral-500 group-hover:text-brand transition-colors"
        />
        <input
          ref={inputRef}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent outline-none text-xs font-bold text-neutral-400 group-hover:text-white transition-colors w-full cursor-pointer scheme-dark"
        />
      </div>
    </div>
  );
};
