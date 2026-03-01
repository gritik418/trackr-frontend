export interface Plan {
  id: string;
  name: string;
  type: PlanType;
  description: string;
  note: string;
  price: number;
  currency: string;
  interval: PlanInterval;
  isActive: boolean;
  isMostPopular: boolean;
  features: Feature[];
  limits: {
    maxMembersPerOrg: number;
    maxOrganizations: number;
    maxTasksPerProject: number;
    maxWorkspacesPerOrg: number;
    isLogExportAvailable: boolean;
    auditLogRetentionDays: number;
    maxProjectsPerWorkspace: number;
  };
  createdAt: string;
  updatedAt: string;
}

export enum PlanType {
  FREE = "FREE",
  PRO = "PRO",
  ENTERPRISE = "ENTERPRISE",
  EARLY_ACCESS = "EARLY_ACCESS",
  CUSTOM = "CUSTOM",
  BUSINESS = "BUSINESS",
}

export interface Feature {
  text: string;
  included: boolean;
}

export interface GetPlansResponse {
  plans: Plan[];
  success: boolean;
  message: string;
}

export enum PlanInterval {
  MONTH = "MONTH",
  YEAR = "YEAR",
  LIFETIME = "LIFETIME",
}
