import { Workspace } from "@/types/workspace/workspace.interface";
import {
  Boxes,
  Briefcase,
  Clock,
  Edit,
  MoreVertical,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import RoleBadgeIcon from "../ui/RoleBadgeIcon";

type Props = {
  ws: Workspace;
  openMenuId: string | null;
  menuRef: React.RefObject<HTMLDivElement | null>;
  toggleMenu: (e: React.MouseEvent, id: string) => void;
  formatDate: (dateString: string) => string;
};

const WorkspaceItem = ({
  ws,
  formatDate,
  menuRef,
  openMenuId,
  toggleMenu,
}: Props) => {
  return (
    <div
      key={ws.id}
      className="group relative p-6 rounded-3xl bg-white/3 backdrop-blur-xl border border-white/10 ring-1 ring-inset ring-white/5 hover:border-brand/40 hover:bg-white/5 transition-all duration-500 hover:shadow-[0_0_50px_-12px_rgba(var(--brand-rgb),0.2)] hover:-translate-y-1.5 flex flex-col h-full cursor-pointer overflow-hidden"
    >
      {/* Dynamic Card Highlight Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute -inset-px bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-700" />

      <div className="relative z-10 flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute -inset-2 bg-brand/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 relative z-10 group-hover:scale-110 group-hover:border-brand/30 transition-all duration-500 shadow-2xl">
              <Briefcase
                size={22}
                className="text-white/70 group-hover:text-brand transition-colors duration-300"
              />
            </div>
          </div>
          {ws.role && (
            <div
              className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-[0.15em] flex items-center gap-1.5 transition-all duration-500 ${ws.role === "OWNER" ? "border-amber-500/30 bg-amber-500/10 text-amber-500 group-hover:bg-amber-500/20" : ws.role === "ADMIN" ? "border-blue-500/30 bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20" : "border-white/10 bg-white/5 text-neutral-400 group-hover:bg-white/10"}`}
            >
              <RoleBadgeIcon size={12} role={ws.role} />
              <span>{ws.role}</span>
            </div>
          )}
        </div>
        <div
          className="relative z-30"
          ref={openMenuId === ws.id ? menuRef : null}
        >
          <button
            onClick={(e) => toggleMenu(e, ws.id)}
            className={`p-2 cursor-pointer rounded-lg transition-all duration-300 ${openMenuId === ws.id ? "bg-white/10 text-white scale-110" : "text-neutral-500 hover:bg-white/10 hover:text-white"}`}
          >
            <MoreVertical size={18} />
          </button>

          {/* Dropdown Menu */}
          {openMenuId === ws.id && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-bg-dark-1/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right z-50 ring-1 ring-white/10">
              <div className="p-1.5">
                <button className="w-full cursor-pointer flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/10 rounded-xl transition-all text-left">
                  <Edit size={14} className="text-brand/80" />
                  Edit Workspace
                </button>
                <button className="w-full cursor-pointer flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all text-left">
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 mb-5">
        <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-brand transition-colors duration-300 flex items-center gap-2">
          {ws.name}
        </h3>
        <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-bold tracking-wide">
          <Clock size={12} className="text-brand/40" />
          <span className="group-hover:text-neutral-400 transition-colors">
            Updated {formatDate(ws.updatedAt)}
          </span>
        </div>
      </div>

      <p className="relative z-10 text-neutral-400 text-sm mb-8 line-clamp-2 flex-1 leading-relaxed font-light group-hover:text-neutral-300 transition-colors duration-300">
        {ws.description || "No description provided."}
      </p>

      <div className="relative z-10 flex items-center gap-4 text-xs font-bold text-neutral-500 border-t border-white/10 pt-5 mt-auto group-hover:border-white/20 transition-colors duration-500">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 group-hover:bg-brand/10 group-hover:text-brand transition-all duration-500 border border-transparent group-hover:border-brand/20">
          <Users
            size={14}
            className="group-hover:scale-110 transition-transform"
          />
          <span>{ws?.members?.length || 0} Members</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 group-hover:bg-brand/10 group-hover:text-brand transition-all duration-500 border border-transparent group-hover:border-brand/20">
          <Boxes
            size={14}
            className="group-hover:scale-110 transition-transform"
          />
          <span>{ws?.projects?.length || 0} Projects</span>
        </div>
      </div>

      <Link
        href={`/dashboard/${ws.slug}`}
        className="absolute inset-0 rounded-3xl ring-0 focus:ring-2 ring-brand/50 outline-none z-20"
      ></Link>
    </div>
  );
};

export default WorkspaceItem;
