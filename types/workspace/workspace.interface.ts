import { Organization } from "../organization/organization.interface";

export interface Workspace {
  id: string;
  name: string;
  organizationId: string;
  slug: string;
  role?: string;
  iconUrl: string;
  organization: Organization;
  description: string | null;
  ownerId: string;
  members: any[];
  projects: any[];
  createdAt: string;
  updatedAt: string;
}
