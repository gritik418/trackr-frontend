import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type Role = 'OWNER' | 'ADMIN' | 'MEMBER' | 'USER';

interface Org {
  id: string;
  role: Role;
}

interface Workspace {
  id: string;
  role: Role;
}

interface UserPayload {
  organizations?: Org[];
  workspaces?: Workspace[];
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function resolveRedirectPath(user: UserPayload): string {
  const org = user.organizations?.find(
    (org) => org.role === 'OWNER' || org.role === 'ADMIN'
  );

  if (org) {
    return `/org/${org.id}`;
  }

  const workspace = user.workspaces?.[0];

  if (workspace) {
    return `/workspace/${workspace.id}`;
  }

  return '/';
}
