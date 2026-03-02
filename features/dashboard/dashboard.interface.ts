import { AuditLog } from "../audit-logs/audit-logs.interface";
import { Subscription } from "../subscription/subscription.interface";

export interface OrgDashboardStatsResponse {
  success: boolean;
  message: string;
  stats?: {
    membersCount: number;
    projectsCount: number;
    workspacesCount: number;
    activeSubscription: Subscription | null;
    recentLogs: AuditLog[];
  };
  percentage?: {
    members: number;
    projects: number;
    workspaces: number;
  };
}

export interface OrgDashboardStats {
  membersCount: number;
  projectsCount: number;
  workspacesCount: number;
  activeSubscription: Subscription | null;
  recentLogs: AuditLog[];
  percentage: {
    members: number;
    projects: number;
    workspaces: number;
  };
}
