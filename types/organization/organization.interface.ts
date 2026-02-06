import { User } from "../user/user.interface";

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
}

export interface OrganizationMember {
  id: string;
  userId: string;
  organizationId: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
  joinedAt: string;
  user: User;
}
