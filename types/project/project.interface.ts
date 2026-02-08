export interface Project {
  id: string;
  name: string;
  description?: string | null;
  nature: "PRIVATE" | "PUBLIC";
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
}
