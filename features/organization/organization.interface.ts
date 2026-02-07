import { Organization } from "@/types/organization/organization.interface";
import { UpdateOrganizationDto } from "@/types/organization/update-organization.interface";

export interface OrganizationState {
  organization: OrgWithRole | null;
}

export interface OrgWithRole extends Organization {
  role: "OWNER" | "ADMIN" | "MEMBER";
}

export interface GetOrganizationsResponse {
  success: boolean;
  message: string;
  organizations: OrgWithRole[];
}

export interface GetOrganizationDetailsResponse {
  success: boolean;
  message: string;
  organization: OrgWithRole;
}

export interface UpdateOrgDto extends UpdateOrganizationDto {
  id: string;
}
