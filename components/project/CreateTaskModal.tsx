"use client";

import { Task } from "@/features/project/project.interface";
import {
  Calendar,
  ChevronDown,
  Flag,
  Plus,
  Tag,
  Type,
  UserPlus,
  X,
  AlignLeft,
  Info,
} from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStatus?: Task["status"];
}

export default function CreateTaskModal({
  isOpen,
  onClose,
  initialStatus = "TODO",
}: CreateTaskModalProps) {
  const [mounted, setMounted] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("MEDIUM");
  const [status, setStatus] = useState<Task["status"]>(initialStatus);
  const [tag, setTag] = useState("Feature");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setStatus(initialStatus);
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, initialStatus]);

  if (!isOpen || !mounted) return null;

  const priorityOptions: {
    value: Task["priority"];
    label: string;
    color: string;
  }[] = [
    { value: "LOW", label: "Low", color: "text-blue-400" },
    { value: "MEDIUM", label: "Medium", color: "text-amber-400" },
    { value: "HIGH", label: "High", color: "text-orange-400" },
    { value: "URGENT", label: "Urgent", color: "text-red-500" },
  ];

  const statusOptions: { value: Task["status"]; label: string }[] = [
    { value: "TODO", label: "To Do" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "IN_REVIEW", label: "In Review" },
    { value: "DONE", label: "Done" },
    { value: "BLOCKED", label: "Blocked" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd call an API here
    console.log({ title, description, priority, status, tag, deadline });
    onClose();
    setTitle("");
    setDescription("");
  };

  return createPortal(
    <div className="fixed inset-0 z-120 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-dashboard-card-bg/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-transparent via-brand/50 to-transparent" />

        {/* Header */}
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-brand/10 border border-brand/20">
              <Plus size={22} className="text-brand" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Create New Task
              </h3>
              <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider">
                Project Details Flow
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-white hover:bg-white/5 rounded-xl transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-[0.15em] flex items-center gap-2">
              <Type size={14} />
              Task Title
            </label>
            <input
              autoFocus
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., Implement dark mode toggle"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand/30 focus:bg-white/10 transition-all text-lg font-medium"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-[0.15em] flex items-center gap-2">
              <AlignLeft size={14} />
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-base text-neutral-300 placeholder:text-neutral-600 focus:outline-none focus:border-brand/30 focus:bg-white/10 transition-all min-h-[120px] resize-none"
            />
          </div>

          {/* Meta Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-[0.15em] flex items-center gap-2">
                <Flag size={14} />
                Priority
              </label>
              <div className="relative group">
                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value as Task["priority"])
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white appearance-none focus:outline-none focus:border-brand/30 cursor-pointer"
                >
                  {priorityOptions.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      className="bg-neutral-900"
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-4 top-3.5 text-neutral-500 pointer-events-none group-focus-within:rotate-180 transition-transform"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-[0.15em] flex items-center gap-2">
                <Info size={14} />
                Status
              </label>
              <div className="relative group">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Task["status"])}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white appearance-none focus:outline-none focus:border-brand/30 cursor-pointer"
                >
                  {statusOptions.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      className="bg-neutral-900"
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-4 top-3.5 text-neutral-500 pointer-events-none group-focus-within:rotate-180 transition-transform"
                />
              </div>
            </div>
          </div>

          {/* Meta Row 2 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-[0.15em] flex items-center gap-2">
                <Tag size={14} />
                Tag
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Feature, Bug, etc."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand/30 transition-all font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-[0.15em] flex items-center gap-2">
                <Calendar size={14} />
                Deadline
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand/30 transition-all scheme-dark"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-6 border-t border-white/5 flex items-center justify-between">
            <button
              type="button"
              className="flex items-center gap-2 text-neutral-500 hover:text-white text-sm font-medium transition-colors"
            >
              <UserPlus size={18} />
              Add Assignees
            </button>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-neutral-400 hover:text-white text-sm font-bold transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-brand text-bg-dark-0 font-bold rounded-xl hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/20 transition-all active:scale-95"
              >
                Create Task
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
