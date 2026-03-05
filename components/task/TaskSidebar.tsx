"use client";

import { Task, TaskPriority, TaskStatus } from "@/features/task/task.interface";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Check,
  ChevronLeft,
  Plus,
  Tag as TagIcon,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

interface TaskSidebarProps {
  task: Task;
  members: any[];
  isAssigneeSelectorOpen: boolean;
  setIsAssigneeSelectorOpen: (open: boolean) => void;
  toggleAssignee: (userId: string) => void;
  handleUpdate: (body: any) => void;
  priorityColors: Record<string, string>;
  statusIcons: Record<string, React.ReactNode>;
  tag: string;
  handleTagChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SidebarAssignees({
  task,
  members,
  isAssigneeSelectorOpen,
  setIsAssigneeSelectorOpen,
  toggleAssignee,
}: Pick<
  TaskSidebarProps,
  | "task"
  | "members"
  | "isAssigneeSelectorOpen"
  | "setIsAssigneeSelectorOpen"
  | "toggleAssignee"
>) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-1">
        <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.3em] flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          Assignees
        </label>
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsAssigneeSelectorOpen(!isAssigneeSelectorOpen)}
            className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all border border-emerald-500/20 shadow-lg"
          >
            <Plus size={16} strokeWidth={3} />
          </motion.button>

          <AnimatePresence>
            {isAssigneeSelectorOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-20"
                  onClick={() => setIsAssigneeSelectorOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10, x: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10, x: 20 }}
                  className="absolute right-0 top-14 w-72 bg-[#0F0F0F] border border-white/10 rounded-[24px] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-30 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-brand/5 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="p-3 border-b border-white/5 mb-2">
                      <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest italic">
                        Members
                      </p>
                    </div>
                    <div className="max-h-72 overflow-y-auto py-1 space-y-1 scrollbar-hide">
                      {members.map((m: any) => {
                        const isAssigned = task.assignees.some(
                          (a) => a.id === m.user.id,
                        );
                        return (
                          <motion.button
                            key={m.user.id}
                            whileHover={{
                              x: 4,
                              backgroundColor: "rgba(255,255,255,0.03)",
                            }}
                            onClick={() => toggleAssignee(m.user.id)}
                            className="w-full flex items-center justify-between p-3 rounded-2xl transition-all group/member"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/5 overflow-hidden shadow-inner">
                                {m.user.avatarUrl ? (
                                  <Image
                                    src={m.user.avatarUrl}
                                    alt={m.user.name}
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-xs font-black text-white uppercase bg-linear-to-br from-neutral-800 to-neutral-950">
                                    {m.user.name.slice(0, 2)}
                                  </div>
                                )}
                              </div>
                              <div className="text-left">
                                <p className="text-sm font-bold text-white group-hover/member:text-brand transition-colors">
                                  {m.user.name}
                                </p>
                                <p className="text-[10px] text-neutral-600 font-medium truncate w-32">
                                  {m.user.email}
                                </p>
                              </div>
                            </div>
                            {isAssigned && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-6 h-6 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center"
                              >
                                <Check
                                  size={12}
                                  className="text-brand"
                                  strokeWidth={4}
                                />
                              </motion.div>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {task.assignees && task.assignees.length > 0 ? (
            task.assignees.map((assignee) => (
              <motion.div
                layout
                key={assignee.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group flex items-center justify-between p-4 bg-white/3 border border-white/5 rounded-[22px] hover:bg-white/6 hover:border-brand/20 transition-all relative overflow-hidden shadow-sm"
              >
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-white/5 flex items-center justify-center text-sm font-black text-white overflow-hidden group-hover:scale-105 transition-transform shadow-xl">
                    {assignee.avatarUrl ? (
                      <Image
                        src={assignee.avatarUrl}
                        alt={assignee.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    ) : (
                      assignee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)
                    )}
                  </div>
                  <div>
                    <p className="text-[15px] font-black text-white group-hover:text-brand transition-colors tracking-tight">
                      {assignee.name}
                    </p>
                    <p className="text-[10px] text-neutral-600 font-black uppercase tracking-widest mt-0.5">
                      Operative
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(239,68,68,0.1)",
                  }}
                  onClick={() => toggleAssignee(assignee.id)}
                  className="p-2 text-neutral-700 hover:text-red-500 rounded-xl transition-all"
                >
                  <X size={16} strokeWidth={2.5} />
                </motion.button>
              </motion.div>
            ))
          ) : (
            <motion.button
              layout
              onClick={() => setIsAssigneeSelectorOpen(true)}
              className="w-full p-10 text-center border-2 border-dashed border-white/5 rounded-[32px] text-neutral-700 hover:text-neutral-500 hover:bg-white/2 hover:border-brand/30 transition-all group/empty shadow-inner"
            >
              <User
                size={28}
                className="mx-auto mb-4 opacity-20 group-hover/empty:text-brand group-hover/empty:scale-110 group-hover/empty:opacity-100 transition-all"
              />
              <span className="text-[11px] font-black uppercase tracking-[0.3em]">
                Assign Node Personnel
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function SidebarSelectors({
  task,
  handleUpdate,
}: Pick<TaskSidebarProps, "task" | "handleUpdate">) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] flex items-center gap-3 px-1">
          <div className="w-1 h-1 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
          Status
        </label>
        <div className="relative group/select">
          <select
            value={task.status}
            onChange={(e) =>
              handleUpdate({ status: e.target.value as TaskStatus })
            }
            className="w-full appearance-none bg-[#0F0F0F] border border-white/5 rounded-2xl px-5 py-4 text-[10px] font-black text-white uppercase tracking-[0.2em] cursor-pointer hover:bg-neutral-900 hover:border-brand/40 transition-all outline-none shadow-xl"
          >
            {Object.values(TaskStatus).map((status) => (
              <option
                key={status}
                value={status}
                className="bg-bg-dark-0 text-white py-2"
              >
                {status.replace("_", " ")}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-600 group-hover/select:text-brand transition-colors">
            <ChevronLeft size={14} className="-rotate-90" strokeWidth={3} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] flex items-center gap-3 px-1">
          <div className="w-1 h-1 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
          Priority
        </label>
        <div className="relative group/select">
          <select
            value={task.priority}
            onChange={(e) =>
              handleUpdate({ priority: e.target.value as TaskPriority })
            }
            className="w-full appearance-none bg-[#0F0F0F] border border-white/5 rounded-2xl px-5 py-4 text-[10px] font-black text-white uppercase tracking-[0.2em] cursor-pointer hover:bg-neutral-900 hover:border-brand/40 transition-all outline-none shadow-xl"
          >
            {Object.values(TaskPriority).map((priority) => (
              <option
                key={priority}
                value={priority}
                className="bg-bg-dark-0 text-white py-2"
              >
                {priority}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-600 group-hover/select:text-brand transition-colors">
            <ChevronLeft size={14} className="-rotate-90" strokeWidth={3} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SidebarSchedule({
  task,
  handleUpdate,
}: Pick<TaskSidebarProps, "task" | "handleUpdate">) {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    if (dateInputRef.current) {
      try {
        if ("showPicker" in HTMLInputElement.prototype) {
          dateInputRef.current.showPicker();
        } else {
          dateInputRef.current.focus();
          dateInputRef.current.click();
        }
      } catch (err) {
        dateInputRef.current.focus();
        dateInputRef.current.click();
      }
    }
  };

  return (
    <div className="space-y-4">
      <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] flex items-center gap-3 px-1">
        <div className="w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
        Schedule
      </label>
      <div className="p-6 bg-[#0F0F0F] border border-white/5 rounded-[24px] flex items-center justify-between group/date hover:border-brand/20 transition-all shadow-xl">
        <div>
          <p className="text-[9px] text-neutral-600 font-black uppercase tracking-[0.2em] mb-2">
            Task Deadline
          </p>
          <input
            ref={dateInputRef}
            type="date"
            value={
              task.deadline
                ? new Date(task.deadline).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => handleUpdate({ deadline: e.target.value })}
            className="bg-transparent text-[16px] text-brand font-black outline-none border-none cursor-pointer focus:text-white transition-colors"
          />
        </div>
        <div
          onClick={handleIconClick}
          className="p-3 bg-brand/5 rounded-xl group-hover/date:bg-brand/10 cursor-pointer active:scale-90 transition-all"
        >
          <Calendar
            size={22}
            className="text-brand/50 group-hover/date:text-brand transition-colors"
          />
        </div>
      </div>
    </div>
  );
}

export function SidebarTag({
  task,
  tag,
  handleTagChange,
  handleUpdate,
}: Pick<
  TaskSidebarProps,
  "task" | "tag" | "handleTagChange" | "handleUpdate"
>) {
  return (
    <div className="space-y-4">
      <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] flex items-center gap-3 px-1">
        <div className="w-1 h-1 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
        Tag
      </label>
      <div className="relative group/tag">
        <TagIcon
          className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-700 group-focus-within/tag:text-purple-400 transition-colors"
          size={14}
        />
        <input
          type="text"
          placeholder="Add node tag..."
          value={tag}
          onChange={handleTagChange}
          onBlur={(e) =>
            e.target.value !== task.tag && handleUpdate({ tag: e.target.value })
          }
          onKeyDown={(e) =>
            e.key === "Enter" &&
            handleUpdate({ tag: (e.target as HTMLInputElement).value })
          }
          className="w-full pl-14 pr-6 py-5 bg-[#0F0F0F] border border-white/5 rounded-[22px] text-[11px] font-black text-purple-300 uppercase tracking-[0.2em] outline-none focus:border-purple-500/30 transition-all placeholder:text-neutral-800 shadow-xl"
        />
      </div>
    </div>
  );
}

export function TaskSidebar({
  task,
  members,
  isAssigneeSelectorOpen,
  setIsAssigneeSelectorOpen,
  toggleAssignee,
  handleUpdate,
  tag,
  handleTagChange,
}: TaskSidebarProps) {
  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="space-y-8"
    >
      <div className="bg-[#0A0A0A]/60 backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 space-y-10 shadow-2xl relative overflow-hidden group/sidebar">
        <div className="absolute inset-px rounded-[31px] border border-white/2 pointer-events-none" />

        <SidebarAssignees
          task={task}
          members={members}
          isAssigneeSelectorOpen={isAssigneeSelectorOpen}
          setIsAssigneeSelectorOpen={setIsAssigneeSelectorOpen}
          toggleAssignee={toggleAssignee}
        />

        <div className="h-px bg-white/5 w-full" />

        <SidebarSelectors task={task} handleUpdate={handleUpdate} />

        <div className="h-px bg-white/5 w-full" />

        <SidebarSchedule task={task} handleUpdate={handleUpdate} />

        <SidebarTag
          task={task}
          tag={tag}
          handleTagChange={handleTagChange}
          handleUpdate={handleUpdate}
        />
      </div>

      {/* Activity Logs Meta */}
      <motion.div
        whileHover={{ y: -5 }}
        className="p-6 bg-white/2 border border-white/5 rounded-[24px] space-y-3 shadow-xl group/meta"
      >
        <div className="flex items-center justify-between">
          <p className="text-[9px] text-neutral-600 font-bold uppercase tracking-[0.3em]">
            System Log
          </p>
          <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
        </div>
        <p className="text-xs text-neutral-400 font-black tracking-tight text-center">
          Task last updated on {new Date(task.updatedAt).toLocaleDateString()}
        </p>
      </motion.div>
    </motion.div>
  );
}
