"use client";

import WorkspaceItem from "@/components/workspace/WorkspaceItem";
import WorkspaceSkeleton from "@/components/workspace/WorkspaceSkeleton";
import { selectOrganization } from "@/features/organization/organization.slice";
import { useGetWorkspacesQuery } from "@/features/workspace/workspace.api";
import { Workspace } from "@/types/workspace/workspace.interface";
import { Boxes, Crown, Plus, Search, Shield, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function OrgWorkspacesPage() {
  const organization = useSelector(selectOrganization);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const router = useRouter();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useGetWorkspacesQuery(organization?.id || "", {
    skip: !organization?.id,
  });

  useEffect(() => {
    if (data?.workspaces) {
      setWorkspaces(data.workspaces);
    }
  }, [data]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!organization) {
    router.push("/dashboard");
  }

  const toggleMenu = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateString));
  };

  const getRoleConfig = (role: string) => {
    const roleLower = role.toLowerCase();
    switch (roleLower) {
      case "owner":
        return {
          icon: <Crown size={10} className="text-amber-500" />,
          styles: "bg-amber-500/10 border-amber-500/20 text-amber-500",
        };
      case "admin":
        return {
          icon: <Shield size={10} className="text-blue-500" />,
          styles: "bg-blue-500/10 border-blue-500/20 text-blue-500",
        };
      default:
        return {
          icon: <User size={10} className="text-neutral-500" />,
          styles: "bg-white/5 border-white/10 text-neutral-500",
        };
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div>
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-white/60 tracking-tight">
            Workspaces
          </h2>
          <p className="text-org-item-text mt-2 text-lg font-light">
            Manage and organize your team's workspaces.
          </p>
        </div>
        <button className="flex cursor-pointer items-center gap-2 px-5 py-2.5 bg-brand text-bg-dark-0 font-bold rounded-xl hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/20 transition-all active:scale-95 group">
          <Plus
            size={18}
            strokeWidth={3}
            className="group-hover:rotate-90 transition-transform duration-300"
          />
          Create Workspace
        </button>
      </div>

      {/* Filters/Search Bar */}
      <div className="relative z-10">
        <div className="relative max-w-md">
          <Search
            className="absolute left-4 top-3.5 text-neutral-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search workspaces..."
            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/5 rounded-xl text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand/30 focus:bg-white/10 transition-all"
          />
        </div>
      </div>

      {/* Grid or Empty State */}
      <div className="relative z-10">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WorkspaceSkeleton />
            <WorkspaceSkeleton />
            <WorkspaceSkeleton />
          </div>
        ) : workspaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaces.map((ws) => {
              const roleConfig = getRoleConfig(ws.role || "member");
              return (
                <WorkspaceItem
                  key={ws.id}
                  ws={ws}
                  roleConfig={roleConfig}
                  formatDate={formatDate}
                  menuRef={menuRef}
                  openMenuId={openMenuId}
                  toggleMenu={toggleMenu}
                />
              );
            })}

            {/* New Workspace Placeholder Card */}
            <button className="group relative p-6 rounded-3xl border border-dashed border-white/10 hover:border-brand/40 hover:bg-brand/5 transition-all duration-300 flex flex-col items-center justify-center text-center gap-4 h-full min-h-[240px]">
              <div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-brand/10 flex items-center justify-center transition-colors duration-300">
                <Plus
                  size={32}
                  className="text-neutral-500 group-hover:text-brand transition-colors duration-300"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-brand transition-colors">
                  Create New Workspace
                </h3>
                <p className="text-sm text-neutral-500 max-w-[200px]">
                  Add a new workspace to organize your next big project.
                </p>
              </div>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-6 rounded-3xl border border-dashed border-white/10 bg-white/2 backdrop-blur-sm">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <Boxes size={40} className="text-neutral-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No Workspaces Yet
            </h3>
            <p className="text-neutral-500 text-center max-w-md mb-8">
              It looks like you haven't created any workspaces in this
              organization yet. Get started by creating your first workspace.
            </p>
            <button className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-brand text-bg-dark-0 font-bold rounded-xl hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/20 transition-all active:scale-95 group">
              <Plus
                size={20}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
              Create Your First Workspace
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
