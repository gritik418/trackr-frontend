"use client";

import { ProfileMenu } from "@/components/org/ProfileMenu";
import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";

export function DashboardHeader() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const workspace = segments[1] || "Workspace";
  const page = segments[2] || "Overview";

  return (
    <header className="h-[72px] flex items-center px-6 gap-4 sticky top-0 z-30 transition-all duration-200 bg-dashboard-header-bg/80 backdrop-blur-md border-b border-dashboard-border">
      {/* Breadcrumbs / Title */}
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center justify-center w-6 h-6 rounded-md bg-dashboard-item-bg border border-dashboard-border text-dashboard-item-text">
          <span className="text-xs">⌘</span>
        </div>
        <span className="text-dashboard-item-text font-medium capitalize">
          {workspace}
        </span>
        <span className="text-dashboard-item-text/50">/</span>
        <span className="text-dashboard-item-text-active font-medium capitalize">
          {page}
        </span>
      </div>

      <div className="ml-auto flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dashboard-item-bg border border-dashboard-border text-sm text-dashboard-item-text hover:border-dashboard-border-hover hover:text-dashboard-item-text-active transition-all w-64 cursor-text group">
          <Search
            size={14}
            className="group-hover:text-dashboard-item-text-active transition-colors"
          />
          <span>Search...</span>
          <span className="ml-auto text-[10px] font-medium text-dashboard-item-text px-1.5 py-0.5 rounded border border-dashboard-border">
            CTRL K
          </span>
        </div>

        <div className="h-6 w-px bg-dashboard-border hidden md:block" />

        {/* Notifications */}
        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-dashboard-item-bg-hover border border-transparent hover:border-dashboard-border text-dashboard-item-text hover:text-dashboard-item-text-active transition-all relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-brand rounded-full border border-dashboard-header-bg" />
        </button>

        <ProfileMenu />
      </div>
    </header>
  );
}
