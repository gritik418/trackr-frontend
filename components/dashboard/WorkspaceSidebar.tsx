'use client';

import { cn } from '@/lib/utils';
import {
  Activity,
  CheckSquare,
  ChevronDown,
  Folder,
  LayoutDashboard,
  Plus,
  Settings,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface WorkspaceSidebarProps {
  slug: string;
  isExpanded: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function WorkspaceSidebar({ 
  slug, 
  isExpanded, 
  onMouseEnter, 
  onMouseLeave 
}: WorkspaceSidebarProps) {
  const pathname = usePathname();
  const baseUrl = `/dashboard/${slug}`;

  const navItems = [
    { name: 'Overview', href: baseUrl, icon: LayoutDashboard },
    { name: 'My Tasks', href: `${baseUrl}/tasks`, icon: CheckSquare },
    { name: 'Members', href: `${baseUrl}/members`, icon: Users },
    { name: 'Activity', href: `${baseUrl}/activity`, icon: Activity },
  ];

  const projects = [
    { name: 'Website Redesign', href: `${baseUrl}/projects/website-redesign` },
    { name: 'Mobile App Launch', href: `${baseUrl}/projects/mobile-app` },
    { name: 'Q1 Marketing', href: `${baseUrl}/projects/q1-marketing` },
  ];

  return (
    <aside 
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "relative z-40 py-3 h-screen shrink-0 bg-dashboard-sidebar-bg border-r border-dashboard-border hidden lg:flex flex-col select-none transition-[width] duration-300 ease-in-out will-change-[width] overflow-hidden",
        isExpanded ? "w-64" : "w-[78px]"
      )}
    >
      <div className="flex flex-col h-full w-full overflow-hidden">
        
        {/* Org Header */}
        <div className="h-16 flex items-center px-4 shrink-0 transition-opacity duration-300">
           {/* Org Icon */}
           <div className="w-12 h-12 border-3 border-white/30 rounded-lg bg-indigo-500 flex items-center justify-center shrink-0">
               <span className="font-bold text-white text-sm">A</span>
           </div>
           
           {/* Org Name */}
           <div className={cn(
             "ml-3 transition-opacity duration-200 overflow-hidden",
             isExpanded ? "opacity-100" : "opacity-0 w-0"
           )}>
               <span className="font-bold text-white whitespace-nowrap">Acme Corp</span>
           </div>
        </div>

        {/* Workspace Switcher */}
        <div className="w-full mt-6 items-center justify-center flex shrink-0">
          <button className={cn(
             "w-fit flex items-center py-2 gap-3 rounded-xl border border-dashboard-border bg-dashboard-item-bg hover:bg-dashboard-item-bg-hover transition-colors group text-left", isExpanded ? "min-w-[90%] p-2" : "w-fit"
           )}>
            {/* Icon / Avatar */}
            <div className="w-10 h-10 rounded-2xl bg-white to-blue-500/20 border border-white/10 flex items-center justify-center shrink-0">
               <span className="text-[10px] font-bold text-black">M</span>
            </div>
            
            {/* Label & Arrow */}
            {isExpanded && <div className={cn(
              "flex-1 transition-opacity duration-200 min-w-0 overflow-hidden",
              isExpanded ? "opacity-100 block" : "opacity-0 hidden w-0"
            )}>
                <p className="text-xs font-semibold text-white truncate">Marketing</p>
            </div>
}
            {isExpanded && <ChevronDown 
              size={14} 
              className={cn(
                "text-neutral-500 transition-opacity duration-200 shrink-0",
                isExpanded ? "opacity-100" : "opacity-0 hidden"
              )} 
            />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto scrollbar-none">
           {/* Section Label */}
           <div className={cn(
             "px-3 mb-2 text-[10px] font-bold text-neutral-500 uppercase tracking-widest transition-opacity duration-300 overflow-hidden whitespace-nowrap",
             isExpanded ? "opacity-100" : "opacity-0"
           )}>
             Menu
           </div>

           {navItems.map((item) => {
             const isActive = pathname === item.href;
             return (
               <Link
                 key={item.name}
                 href={item.href}
                 className={cn(
                   "relative h-10 flex items-center px-2.5 rounded-lg transition-all duration-200 group/item overflow-hidden",
                   isActive 
                     ? "bg-brand/10 text-brand" 
                     : "text-dashboard-item-text hover:text-dashboard-item-text-active hover:bg-dashboard-item-bg-hover"
                 )}
               >
                 <div className="w-5 h-5 flex items-center justify-center shrink-0">
                   <item.icon size={20} className={isActive ? "text-brand" : "group-hover/item:text-dashboard-item-text-active"} />
                 </div>

                 <span className={cn(
                   "ml-3 text-[14px] font-medium whitespace-nowrap transition-opacity duration-300",
                   isExpanded ? "opacity-100 delay-75" : "opacity-0"
                 )}>
                   {item.name}
                 </span>

                  {isActive && (
                    <div className="absolute left-0 top-2 bottom-2 w-[3px] bg-brand rounded-r-full" />
                  )}
               </Link>
             );
           })}
        </nav>

        {/* Projects Section */}
        <div className="flex-1 px-3 py-2 overflow-y-auto scrollbar-none border-t border-dashboard-border mt-2">
           <div className="flex items-center justify-between px-3 mb-2 transition-opacity duration-300 overflow-hidden">
               <span className={cn(
                 "text-[10px] font-bold text-neutral-500 uppercase tracking-widest whitespace-nowrap",
                 isExpanded ? "opacity-100" : "opacity-0"
               )}>
                 Projects
               </span>
               <button className={cn(
                 "text-neutral-500 hover:text-white transition-colors",
                 isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
               )}>
                  <Plus size={14} />
               </button>
           </div>

           <div className="space-y-0.5">
             {projects.map((project) => {
               const isProjectActive = pathname.startsWith(project.href);
               return (
                 <Link
                   key={project.name}
                   href={project.href}
                   className={cn(
                     "relative h-9 flex items-center px-2.5 rounded-lg transition-all duration-200 group/project overflow-hidden",
                     isProjectActive 
                       ? "bg-brand/10 text-brand" 
                       : "text-dashboard-item-text hover:text-dashboard-item-text-active hover:bg-dashboard-item-bg-hover"
                   )}
                 >
                   <div className="w-5 h-5 flex items-center justify-center shrink-0">
                     <Folder size={16} className={isProjectActive ? "text-brand" : "group-hover/project:text-dashboard-item-text-active"} />
                   </div>

                   <span className={cn(
                     "ml-3 text-[13px] font-medium whitespace-nowrap transition-opacity duration-300",
                     isExpanded ? "opacity-100 delay-75" : "opacity-0"
                   )}>
                     {project.name}
                   </span>
                 </Link>
               );
             })}
           </div>
        </div>

        {/* Settings / Bottom */}
        <div className="p-3 border-t border-dashboard-border space-y-1 bg-dashboard-sidebar-bg shrink-0">
           <Link
             href={`${baseUrl}/settings`}
             className={cn(
               "relative h-10 flex items-center px-2.5 rounded-lg transition-all duration-200 group/item overflow-hidden",
               pathname === `${baseUrl}/settings`
                 ? "bg-brand/10 text-brand" 
                 : "text-dashboard-item-text hover:text-dashboard-item-text-active hover:bg-dashboard-item-bg-hover"
             )}
           >
             <div className="w-5 h-5 flex items-center justify-center shrink-0">
               <Settings size={20} />
             </div>
             <span className={cn(
               "ml-3 text-[14px] font-medium whitespace-nowrap transition-opacity duration-300",
               isExpanded ? "opacity-100 delay-75" : "opacity-0"
             )}>
               Workspace Settings
             </span>
           </Link>
        </div>

      </div>
    </aside>
  );
}
