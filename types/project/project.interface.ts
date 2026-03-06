export interface Project {
  id: string;
  name: string;
  description?: string | null;
  status:
    | "DRAFT"
    | "ACTIVE"
    | "ON_HOLD"
    | "BLOCKED"
    | "COMPLETED"
    | "ARCHIVED"
    | "CANCELED";
  nature: "PRIVATE" | "PUBLIC";
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
  role?: ProjectRole;
}

export enum ProjectRole {
  ADMIN = "ADMIN",
  OWNER = "OWNER",
  MEMBER = "MEMBER",
}
