"use client";

import AdminOrOwnerGuard from "@/components/guards/AdminOrOwnerGuard";
import WorkspaceItem from "@/components/workspace/WorkspaceItem";
import WorkspaceSkeleton from "@/components/workspace/WorkspaceSkeleton";
import { selectOrganization } from "@/features/organization/organization.slice";
import { useGetWorkspacesQuery } from "@/features/workspace/workspace.api";
import { Workspace } from "@/types/workspace/workspace.interface";
import { Boxes, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

export default function OrgWorkspacesPage() {
  const organization = useSelector(selectOrganization);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data, isLoading } = useGetWorkspacesQuery(organization?.id || "", {
    skip: !organization?.id,
  });

  const filteredWorkspaces = useMemo(() => {
    if (!workspaces) return [];
    if (!searchQuery.trim()) return workspaces;
    return workspaces.filter((ws: Workspace) =>
      ws.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [workspaces, searchQuery]);

  useEffect(() => {
    if (data?.workspaces) {
      setWorkspaces(data.workspaces);
    }
  }, [data]);

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateString));
  };

  if (!organization) {
    return null;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10 relative overflow-hidden h-full">
      {/* Complex Atmospheric Background Mesh - Synced with /org */}
      <div className="absolute top-[-10%] left-1/4 w-[800px] h-[600px] bg-brand/10 blur-[150px] rounded-full pointer-events-none opacity-40 animate-pulse duration-[10s]" />
      <div className="absolute top-[20%] right-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none opacity-30 animate-pulse duration-[15s]" />
      <div className="absolute bottom-[-10%] left-1/3 w-[900px] h-[700px] bg-purple-600/5 blur-[180px] rounded-full pointer-events-none opacity-20" />

      {/* Header with Search */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="animate-in slide-in-from-left-4 duration-700 ease-out">
          <h1 className="text-4xl font-black tracking-tight text-white mb-2">
            Workspaces
          </h1>
          <p className="text-neutral-400 font-light tracking-wide">
            Manage and organize your projects in this organization.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 animate-in slide-in-from-right-4 duration-700 ease-out">
          <div className="relative flex-1 sm:w-80 group">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-brand transition-colors duration-300"
              size={18}
            />
            <input
              type="text"
              placeholder="Filter workspaces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 transition-all duration-300 group-hover:bg-white/10"
            />
          </div>
          <AdminOrOwnerGuard role={organization?.role}>
            <Link
              href={`/org/${organization?.slug}/workspaces/new`}
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-brand text-bg-dark-0 font-bold rounded-xl hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/20 transition-all active:scale-95 group"
            >
              <Plus
                size={20}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
              New Workspace
            </Link>
          </AdminOrOwnerGuard>
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
        ) : filteredWorkspaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredWorkspaces.map((ws, index) => (
              <div
                key={ws.id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <WorkspaceItem
                  userOrgRole={organization.role}
                  ws={ws}
                  formatDate={formatDate}
                />
              </div>
            ))}

            {/* New Workspace Placeholder Card */}
            <AdminOrOwnerGuard role={organization?.role} className="h-full">
              <div
                className="animate-in fade-in h-full slide-in-from-bottom-4 duration-700 fill-mode-both"
                style={{
                  animationDelay: `${filteredWorkspaces.length * 100}ms`,
                }}
              >
                <Link
                  href={`/org/${organization?.slug}/workspaces/new`}
                  className="group h-full relative cursor-pointer p-6 rounded-3xl border border-dashed border-white/10 hover:border-brand/40 hover:bg-brand/5 transition-all duration-300 flex flex-col items-center justify-center text-center gap-4 min-h-[240px]"
                >
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
                </Link>
              </div>
            </AdminOrOwnerGuard>
          </div>
        ) : workspaces.length > 0 && filteredWorkspaces.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 rounded-3xl border border-dashed border-white/10 bg-white/2 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-500">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <Search size={40} className="text-neutral-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No results for "{searchQuery}"
            </h3>
            <p className="text-neutral-500 text-center max-w-md mb-8">
              We couldn't find any workspaces matching your search. Try
              adjusting your keywords or clear the search to see all workspaces.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-all active:scale-95 group border border-white/10"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-6 rounded-3xl border border-dashed border-white/10 bg-white/2 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-500">
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
            <Link
              href={`/org/${organization?.slug}/workspaces/new`}
              className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-brand text-bg-dark-0 font-bold rounded-xl hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/20 transition-all active:scale-95 group"
            >
              <Plus
                size={20}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
              Create Your First Workspace
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
