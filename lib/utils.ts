import { OrgWithRole } from "@/features/organization/organization.interface";
import { Workspace } from "@/types/workspace/workspace.interface";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface UserPayload {
  organizations?: OrgWithRole[];
  workspaces?: Workspace[];
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function resolveRedirectPath(user: UserPayload): string {
  const org = user.organizations?.find(
    (org) => org.role === "OWNER" || org.role === "ADMIN",
  );

  if (org) {
    return `/org/${org.slug}`;
  }

  const workspace = user.workspaces?.[0];

  if (workspace) {
    return `/workspace/${workspace.id}`;
  }

  if (user.organizations?.length === 0 && user.workspaces?.length === 0) {
    return "/org";
  }

  if (
    user.organizations &&
    user.organizations?.length > 0 &&
    user.workspaces?.length === 0
  ) {
    return `/org`;
  }

  return "/";
}

// Simple relative time formatter since date-fns is not available
export function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 604800)}w ago`;
  if (diffInSeconds < 31536000)
    return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  return `${Math.floor(diffInSeconds / 31536000)}y ago`;
}

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};
