export interface Project {
  id: string;
  name: string;
  description?: string | null;
  status: "ACTIVE" | "ON_HOLD" | "COMPLETED" | "ARCHIVED";
  nature: "PRIVATE" | "PUBLIC";
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
}
