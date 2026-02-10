export interface AuditLogUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
}

export enum AuditAction {
  ORGANIZATION_CREATE = "ORGANIZATION_CREATE",
  ORGANIZATION_UPDATE = "ORGANIZATION_UPDATE",
  ORGANIZATION_DELETE = "ORGANIZATION_DELETE",
  ORGANIZATION_MEMBER_REMOVE = "ORGANIZATION_MEMBER_REMOVE",
  ORGANIZATION_MEMBER_ROLE_UPDATE = "ORGANIZATION_MEMBER_ROLE_UPDATE",
  WORKSPACE_CREATE = "WORKSPACE_CREATE",
  WORKSPACE_UPDATE = "WORKSPACE_UPDATE",
  WORKSPACE_DELETE = "WORKSPACE_DELETE",
  WORKSPACE_MEMBER_ADD = "WORKSPACE_MEMBER_ADD",
  WORKSPACE_MEMBER_ROLE_UPDATE = "WORKSPACE_MEMBER_ROLE_UPDATE",
  WORKSPACE_MEMBER_REMOVE = "WORKSPACE_MEMBER_REMOVE",
  PROJECT_CREATE = "PROJECT_CREATE",
  PROJECT_UPDATE = "PROJECT_UPDATE",
  PROJECT_DELETE = "PROJECT_DELETE",
  PROJECT_MEMBER_ADD = "PROJECT_MEMBER_ADD",
  PROJECT_MEMBER_REMOVE = "PROJECT_MEMBER_REMOVE",
  TASK_CREATE = "TASK_CREATE",
  TASK_UPDATE = "TASK_UPDATE",
  TASK_ASSIGN = "TASK_ASSIGN",
}

export enum AuditEntityType {
  ORGANIZATION = "ORGANIZATION",
  WORKSPACE = "WORKSPACE",
  PROJECT = "PROJECT",
  TASK = "TASK",
  ORGANIZATION_MEMBER = "ORGANIZATION_MEMBER",
  WORKSPACE_MEMBER = "WORKSPACE_MEMBER",
  PROJECT_MEMBER = "PROJECT_MEMBER",
  ORGANIZATION_INVITE = "ORGANIZATION_INVITE",
  WORKSPACE_INVITE = "WORKSPACE_INVITE",
}

export interface AuditLog {
  id: string;
  organizationId: string | null;
  workspaceId: string | null;
  userId: string | null;
  action: string;
  entityType: string;
  entityId: string;
  details: any;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
  user?: AuditLogUser | null;
}

export interface GetAuditLogsResponse {
  success: boolean;
  logs: AuditLog[];
  total: number;
  limit: number;
  page: number;
}
