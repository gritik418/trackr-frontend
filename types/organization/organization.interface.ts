import { User } from "../user/user.interface";
import { Workspace } from "../workspace/workspace.interface";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  websiteUrl: string;
  description: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  members: OrganizationMember[];
  owner: User;
  workspaces: Workspace[];
  contactEmail?: string;
}

export interface OrganizationMember {
  id: string;
  userId: string;
  organizationId: string;
  role: OrganizationRole;
  joinedAt: string;
  user: User;
}

export enum OrganizationRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}
