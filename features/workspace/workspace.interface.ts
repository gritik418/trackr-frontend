import { Workspace } from "@/types/workspace/workspace.interface";

export interface WorkspaceState {
  workspace: Workspace | null;
}

export interface GetWorkspacesResponse {
  success: boolean;
  message: string;
  workspaces: Workspace[];
}
