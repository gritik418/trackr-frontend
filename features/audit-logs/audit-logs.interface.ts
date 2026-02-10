export interface AuditLogUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
}

export enum AuditAction {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  INVITE = "INVITE",
  ACCEPT = "ACCEPT",
  REJECT = "REJECT",
  REVOKE = "REVOKE",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export enum AuditEntityType {
  ORGANIZATION = "ORGANIZATION",
  WORKSPACE = "WORKSPACE",
  PROJECT = "PROJECT",
  TASK = "TASK",
  MEMBER = "MEMBER",
  INVITE = "INVITE",
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
