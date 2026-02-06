import { Organization } from "@/types/organization/organization.interface";

export interface OrganizationState {
  organizations: any[];
}

export interface OrgWithRole extends Organization {
  role: "OWNER" | "ADMIN" | "MEMBER";
}

export interface GetOrganizationsResponse {
  success: boolean;
  message: string;
  organizations: OrgWithRole[];
}
