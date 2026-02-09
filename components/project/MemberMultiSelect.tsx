"use client";

import { WorkspaceMember } from "@/types/workspace/workspace.interface";
import { Search, Check, X, User } from "lucide-react";
import Image from "next/image";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MemberMultiSelectProps {
  members: WorkspaceMember[];
  selectedIds: string[];
  onToggle: (userId: string) => void;
}

export default function MemberMultiSelect({
  members,
  selectedIds,
  onToggle,
}: MemberMultiSelectProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = useMemo(() => {
    return members.filter(
      (member) =>
        member.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.user.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [members, searchQuery]);

  const selectedMembers = useMemo(() => {
    return members.filter((m) => selectedIds.includes(m.user.id));
  }, [members, selectedIds]);

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-brand transition-colors">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search members to assign..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand/30 focus:bg-white/10 transition-all font-medium"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Selected Members Mini-List */}
      <AnimatePresence>
        {selectedMembers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-wrap gap-2 pb-2"
          >
            {selectedMembers.map((member) => (
              <motion.div
                layout
                key={`selected-${member.user.id}`}
                className="flex items-center gap-2 pl-1 pr-2 py-1 bg-brand/10 border border-brand/20 rounded-full text-[11px] font-bold text-brand animate-in zoom-in-95"
              >
                <div className="w-5 h-5 rounded-full bg-neutral-800 border border-white/5 overflow-hidden flex items-center justify-center shrink-0">
                  {member.user.avatarUrl ? (
                    <Image
                      src={member.user.avatarUrl}
                      alt={member.user.name}
                      width={20}
                      height={20}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={10} className="text-neutral-500" />
                  )}
                </div>
                <span>{member.user.name}</span>
                <button
                  type="button"
                  onClick={() => onToggle(member.user.id)}
                  className="hover:text-brand-hover transition-colors"
                >
                  <X size={12} strokeWidth={3} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Members List */}
      <div className="max-h-[240px] overflow-y-auto pr-2 space-y-1.5 scrollbar-thin scrollbar-thumb-white/10">
        {filteredMembers.map((member) => {
          const isSelected = selectedIds.includes(member.user.id);
          return (
            <button
              key={member.id}
              type="button"
              onClick={() => onToggle(member.user.id)}
              className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all border ${
                isSelected
                  ? "bg-brand/5 border-brand/30 text-white"
                  : "bg-white/2 border-white/5 text-neutral-400 hover:bg-white/5 hover:border-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-xs font-bold overflow-hidden shadow-inner group-hover:scale-105 transition-transform">
                  {member.user.avatarUrl ? (
                    <Image
                      src={member.user.avatarUrl}
                      alt={member.user.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    member.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)
                  )}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold tracking-tight leading-none mb-1">
                    {member.user.name}
                  </p>
                  <p className="text-[10px] text-neutral-500 font-medium">
                    {member.user.email}
                  </p>
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                  isSelected
                    ? "bg-brand border-brand text-bg-dark-0 scale-110"
                    : "bg-white/5 border-white/10 text-transparent"
                }`}
              >
                <Check size={14} strokeWidth={4} />
              </div>
            </button>
          );
        })}

        {filteredMembers.length === 0 && (
          <div className="py-8 text-center bg-white/2 border border-dashed border-white/10 rounded-3xl">
            <User
              size={24}
              className="mx-auto text-neutral-700 mb-2 opacity-20"
            />
            <p className="text-xs text-neutral-500 font-medium">
              No members found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
