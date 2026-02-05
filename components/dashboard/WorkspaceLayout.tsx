'use client';

import React, { useState } from 'react';
import { WorkspaceSidebar } from './WorkspaceSidebar';
import { DashboardHeader } from './DashboardHeader';

export function WorkspaceLayout({ 
  children, 
  slug 
}: { 
  children: React.ReactNode;
  slug: string;
}) {
  // Local state for sidebar expansion
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="flex h-screen bg-dashboard-bg text-white font-sans selection:bg-brand/30 overflow-hidden">
      
      {/* Sidebar */}
      <WorkspaceSidebar 
        slug={slug}
        isExpanded={isSidebarExpanded}
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto p-6 relative">
           <div className="max-w-7xl mx-auto w-full">
             {children}
           </div>
        </main>

      </div>
    </div>
  );
}
