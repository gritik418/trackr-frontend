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
