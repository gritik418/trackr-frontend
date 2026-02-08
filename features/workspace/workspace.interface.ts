import { Workspace } from "@/types/workspace/workspace.interface";
import { CreateWorkspaceDto } from "@/types/workspace/create-workspace.interface";
import { UpdateWorkspaceDto } from "@/types/workspace/update-workspace.interface";

export interface WorkspaceState {
  workspace: Workspace | null;
}

export interface GetWorkspacesResponse {
  success: boolean;
  message: string;
  workspaces: Workspace[];
}

export type CreateWorkspaceRequest = CreateWorkspaceDto;

export interface CreateWorkspaceResponse {
  success: boolean;
  message: string;
  workspace: Workspace;
}

export interface GetWorkspaceDetailsResponse {
  success: boolean;
  message: string;
  workspace: Workspace;
}

export type UpdateWorkspaceRequest = UpdateWorkspaceDto;

export interface UpdateWorkspaceResponse {
  success: boolean;
  message: string;
  workspace: Workspace;
}

export interface DeleteWorkspaceResponse {
  success: boolean;
  message: string;
}

export interface GetWorkspaceMembersResponse {
  success: boolean;
  message: string;
  members: any[];
}

export interface AddWorkspaceMemberRequest {
  email: string;
  role: string;
}

export interface AddWorkspaceMemberResponse {
  success: boolean;
  message: string;
}

export interface UpdateWorkspaceMemberRoleRequest {
  role: string;
}

export interface UpdateWorkspaceMemberRoleResponse {
  success: boolean;
  message: string;
}

export interface RemoveWorkspaceMemberResponse {
  success: boolean;
  message: string;
}

export interface WorkspaceInvite {
  id: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  expiresAt: string;
  invitedById: string;
  workspaceId: string;
  invitedBy: any; // User type basically
}

export interface GetWorkspaceInvitesResponse {
  success: boolean;
  message: string;
  invitations: WorkspaceInvite[];
  total: number;
}

export interface SendWorkspaceInviteRequest {
  email: string;
  role: string;
}

export interface SendWorkspaceInviteResponse {
  success: boolean;
  message: string;
}

export interface RevokeWorkspaceInviteResponse {
  success: boolean;
  message: string;
}

export interface ResendWorkspaceInviteResponse {
  success: boolean;
  message: string;
}
