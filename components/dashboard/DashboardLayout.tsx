"use client";

import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import DashboardProvider from "./DashboardProvider";

export default function DashboardLayout({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug: string;
}) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <DashboardProvider slug={slug}>
      <div className="flex h-screen bg-dashboard-bg text-white font-sans selection:bg-brand/30 overflow-hidden">
        {/* Sidebar */}
        <DashboardSidebar
          slug={slug}
          isExpanded={isSidebarExpanded}
          onMouseEnter={() => setIsSidebarExpanded(true)}
          onMouseLeave={() => setIsSidebarExpanded(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
          <DashboardHeader />

          <main className="flex-1 overflow-y-auto p-6 relative">
            <div className="max-w-7xl mx-auto w-full">{children}</div>
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}
