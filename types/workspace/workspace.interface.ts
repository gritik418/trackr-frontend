export interface Workspace {
  id: string;
  name: string;
  organizationId: string;
  slug: string;
  iconUrl: string;
  description: string | null;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}
