import inviteMemberSchema from "@/lib/schemas/organization/invite-member.schema";
import {
  Organization,
  OrganizationMember,
} from "@/types/organization/organization.interface";
import { UpdateOrganizationDto } from "@/types/organization/update-organization.interface";
import z from "zod";

export interface OrganizationState {
  organization: OrgWithRole | null;
  members: OrganizationMember[];
  invites: OrganizationInvitation[];
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

export interface InviteMemberDto extends InviteMemberDataDto {
  orgId: string;
}

export type InviteMemberDataDto = z.infer<typeof inviteMemberSchema>;

export interface GetMembersResponse {
  success: boolean;
  message: string;
  members: OrganizationMember[];
}

export interface OrganizationInvitation {
  id: string;
  email: string;
  role: "ADMIN" | "MEMBER";
  status: "PENDING" | "ACCEPTED" | "DECLINED";
  createdAt: string;
  expiresAt: string;
}

export interface GetInvitationsResponse {
  success: boolean;
  message: string;
  invitations: OrganizationInvitation[];
}
