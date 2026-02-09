import { User } from "../user/user.interface";
import { Organization } from "../organization/organization.interface";

export enum WorkspaceRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export interface WorkspaceMember {
  id: string;
  userId: string;
  workspaceId: string;
  role: WorkspaceRole;
  joinedAt: string;
  user: User;
}

export interface Workspace {
  id: string;
  name: string;
  organizationId: string;
  slug: string;
  role?: WorkspaceRole;
  iconUrl: string;
  organization: Organization;
  description: string | null;
  ownerId: string;
  owner: User;
  members: WorkspaceMember[];
  projects: any[];
  createdAt: string;
  updatedAt: string;
}
