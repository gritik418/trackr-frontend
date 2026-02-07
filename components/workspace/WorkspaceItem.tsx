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

type Props = {
  ws: Workspace;
  roleConfig: {
    icon: React.ReactNode;
    styles: string;
  };
  openMenuId: string | null;
  menuRef: React.RefObject<HTMLDivElement | null>;
  toggleMenu: (e: React.MouseEvent, id: string) => void;
  formatDate: (dateString: string) => string;
};

const WorkspaceItem = ({
  ws,
  roleConfig,
  formatDate,
  menuRef,
  openMenuId,
  toggleMenu,
}: Props) => {
  return (
    <div
      key={ws.id}
      className="group relative p-6 rounded-3xl bg-org-card-bg/60 backdrop-blur-xl border border-white/5 hover:border-brand/20 hover:bg-org-card-bg/80 transition-all duration-300 hover:shadow-2xl hover:shadow-black/20 flex flex-col h-full cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform duration-300">
            <Briefcase
              size={22}
              className="text-white/80 group-hover:text-brand transition-colors"
            />
          </div>
          {ws.role && (
            <div
              className={`px-2.5 py-1 rounded-full border flex items-center gap-1.5 transition-colors ${roleConfig.styles}`}
            >
              {roleConfig.icon}
              <span className="text-[10px] uppercase tracking-wider font-bold">
                {ws.role}
              </span>
            </div>
          )}
        </div>
        <div
          className="relative z-20"
          ref={openMenuId === ws.id ? menuRef : null}
        >
          <button
            onClick={(e) => toggleMenu(e, ws.id)}
            className={`p-2 cursor-pointer rounded-lg transition-colors ${openMenuId === ws.id ? "bg-white/10 text-white" : "text-neutral-500 hover:bg-white/5 hover:text-white"}`}
          >
            <MoreVertical size={18} />
          </button>

          {/* Dropdown Menu */}
          {openMenuId === ws.id && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-bg-dark-1 border border-white/10 rounded-xl shadow-xl shadow-black/50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
              <div className="p-1">
                <button className="w-full cursor-pointer flex items-center gap-2 px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left">
                  <Edit size={14} />
                  Edit Workspace
                </button>
                <button className="w-full cursor-pointer flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-left">
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-brand transition-colors">
          {ws.name}
        </h3>
        <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-medium">
          <Clock size={12} />
          <span>Updated {formatDate(ws.updatedAt)}</span>
        </div>
      </div>

      <p className="text-org-item-text text-sm mb-6 line-clamp-2 flex-1 leading-relaxed">
        {ws.description || "No description provided."}
      </p>

      <div className="flex items-center gap-4 text-xs font-medium text-neutral-500 border-t border-white/5 pt-4 mt-auto">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
          <Users size={14} className="text-neutral-400" />
          <span>{ws?.members?.length || 0} Members</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
          <Boxes size={14} className="text-neutral-400" />
          <span>{ws?.projects?.length || 0} Projects</span>
        </div>
      </div>

      <Link
        href={`/dashboard/${ws.slug}`}
        className="absolute inset-0 rounded-3xl ring-0 focus:ring-2 ring-brand/50 outline-none"
      ></Link>
    </div>
  );
};

export default WorkspaceItem;
