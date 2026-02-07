export interface Workspace {
  id: string;
  name: string;
  organizationId: string;
  slug: string;
  role?: string;
  iconUrl: string;
  description: string | null;
  ownerId: string;
  members: any[];
  projects: any[];
  createdAt: string;
  updatedAt: string;
}
