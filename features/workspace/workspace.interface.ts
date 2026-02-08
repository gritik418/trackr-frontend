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
