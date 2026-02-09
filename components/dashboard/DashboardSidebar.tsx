"use client";

import { useGetProjectsQuery } from "@/features/project/project.api";
import { selectWorkspace } from "@/features/workspace/workspace.slice";
import { cn, getInitials } from "@/lib/utils";
import { Project } from "@/types/project/project.interface";
import {
  Activity,
  CheckSquare,
  Folder,
  FolderOpenDot,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WorkspaceSwitcher from "../workspace/WorkspaceSwitcher";
import ProjectItemSkeleton from "./skeletons/ProjectItemSkeleton";

interface DashboardSidebarProps {
  slug: string;
  isExpanded: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function DashboardSidebar({
  slug,
  isExpanded,
  onMouseEnter,
  onMouseLeave,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const [projects, setProjects] = useState<Project[]>([]);
  const workspace = useSelector(selectWorkspace);
  const { data, isLoading } = useGetProjectsQuery(workspace?.id || "", {
    skip: !workspace?.id,
  });
  const baseUrl = `/dashboard/${slug}`;

  const navItems = [
    { name: "Overview", href: baseUrl, icon: LayoutDashboard },
    { name: "Projects", href: `${baseUrl}/projects`, icon: FolderOpenDot },
    { name: "My Tasks", href: `${baseUrl}/tasks`, icon: CheckSquare },
    { name: "Members", href: `${baseUrl}/members`, icon: Users },
    { name: "Activity", href: `${baseUrl}/activity`, icon: Activity },
  ];

  useEffect(() => {
    if (data) {
      setProjects(data.projects);
    }
  }, [data]);

  return (
    <aside
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "relative z-40 py-3 h-screen shrink-0 bg-dashboard-sidebar-bg border-r border-dashboard-border hidden lg:flex flex-col select-none transition-[width] duration-300 ease-in-out will-change-[width] overflow-hidden",
        isExpanded ? "w-64" : "w-[78px]",
      )}
    >
      <div className="flex flex-col h-full w-full overflow-hidden">
        {/* Org Header */}
        <div className="h-16 flex items-center px-4 shrink-0 transition-opacity duration-300">
          {/* Org Icon */}
          <Link
            href={`/org/${workspace?.organization?.slug}`}
            className="flex w-full items-center cursor-pointer group/logo shrink-0"
          >
            {workspace?.organization?.logoUrl ? (
              <Image
                src={workspace?.organization?.logoUrl}
                alt="Org Logo"
                width={48}
                height={48}
                className="rounded-lg min-w-12! max-w-12! min-h-12! max-h-12! object-cover"
              />
            ) : (
              <div className="w-12 h-12 border-3 border-white/30 rounded-lg bg-indigo-500 flex items-center justify-center shrink-0">
                <span className="font-bold text-white text-sm">
                  {getInitials(workspace?.organization?.name || "")}
                </span>
              </div>
            )}

            {/* Org Name */}
            <div
              className={cn(
                "ml-3 transition-opacity flex flex-col duration-200 overflow-hidden",
                isExpanded ? "opacity-100" : "opacity-0 w-0",
              )}
            >
              <span className="font-bold text-white whitespace-nowrap">
                {workspace?.organization?.name}
              </span>
              <span className="font-bold uppercase text-[10px] text-slate-400 whitespace-nowrap">
                organization
              </span>
            </div>
          </Link>
        </div>

        {/* Workspace Switcher */}
        <WorkspaceSwitcher workspace={workspace} isExpanded={isExpanded} />

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto scrollbar-none">
          {/* Section Label */}
          <div
            className={cn(
              "px-3 mb-2 text-[10px] font-bold text-neutral-500 uppercase tracking-widest transition-opacity duration-300 overflow-hidden whitespace-nowrap",
              isExpanded ? "opacity-100" : "opacity-0",
            )}
          >
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
                    : "text-dashboard-item-text hover:text-dashboard-item-text-active hover:bg-dashboard-item-bg-hover",
                )}
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <item.icon
                    size={20}
                    className={
                      isActive
                        ? "text-brand"
                        : "group-hover/item:text-dashboard-item-text-active"
                    }
                  />
                </div>

                <span
                  className={cn(
                    "ml-3 text-[14px] font-medium whitespace-nowrap transition-opacity duration-300",
                    isExpanded ? "opacity-100 delay-75" : "opacity-0",
                  )}
                >
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
        {projects.length > 0 && (
          <div className="flex-1 px-3 py-2 overflow-y-auto scrollbar-none border-t border-dashboard-border mt-2">
            <div className="flex inset-0 top-0 items-center justify-between px-3 mb-2 transition-opacity duration-300 overflow-hidden">
              <span
                className={cn(
                  "text-[10px] font-bold text-neutral-500 uppercase tracking-widest whitespace-nowrap",
                  isExpanded ? "opacity-100" : "opacity-0",
                )}
              >
                Projects
              </span>
            </div>

            <div className="space-y-1">
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <ProjectItemSkeleton key={i} isExpanded={isExpanded} />
                  ))
                : projects.map((project) => {
                    const isProjectActive = pathname.includes(project.id);
                    return (
                      <Link
                        key={project.name}
                        href={`${baseUrl}/projects/${project.id}`}
                        className={cn(
                          "relative h-9 flex items-center px-2.5 rounded-lg transition-all duration-200 group/project overflow-hidden",
                          isProjectActive
                            ? "bg-brand/10 text-brand"
                            : "text-dashboard-item-text hover:text-dashboard-item-text-active hover:bg-dashboard-item-bg-hover",
                        )}
                      >
                        <div className="w-5 h-5 flex items-center justify-center shrink-0">
                          <Folder
                            size={16}
                            className={
                              isProjectActive
                                ? "text-brand"
                                : "group-hover/project:text-dashboard-item-text-active"
                            }
                          />
                        </div>

                        <span
                          className={cn(
                            "ml-3 text-[13px] font-medium whitespace-nowrap transition-opacity duration-300",
                            isExpanded ? "opacity-100 delay-75" : "opacity-0",
                          )}
                        >
                          {project.name}
                        </span>
                      </Link>
                    );
                  })}
            </div>
          </div>
        )}

        {/* Settings / Bottom */}
        <div className="p-3 border-t border-dashboard-border space-y-1 bg-dashboard-sidebar-bg shrink-0">
          <Link
            href={`${baseUrl}/settings`}
            className={cn(
              "relative h-10 flex items-center px-2.5 rounded-lg transition-all duration-200 group/item overflow-hidden",
              pathname === `${baseUrl}/settings`
                ? "bg-brand/10 text-brand"
                : "text-dashboard-item-text hover:text-dashboard-item-text-active hover:bg-dashboard-item-bg-hover",
            )}
          >
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              <Settings size={20} />
            </div>
            <span
              className={cn(
                "ml-3 text-[14px] font-medium whitespace-nowrap transition-opacity duration-300",
                isExpanded ? "opacity-100 delay-75" : "opacity-0",
              )}
            >
              Workspace Settings
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
