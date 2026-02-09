import { Project } from "@/types/project/project.interface";
import { CreateProjectDto } from "@/types/project/create-project.interface";
import { WorkspaceMember } from "@/types/workspace/workspace.interface";

export interface GetProjectsResponse {
  success: boolean;
  message: string;
  projects: Project[];
}

export interface CreateProjectResponse {
  success: boolean;
  message: string;
  project: Project;
}

export interface GetProjectByIdResponse {
  success: boolean;
  message: string;
  project: Project;
}

export interface GetProjectMembersResponse {
  success: boolean;
  message: string;
  members: (WorkspaceMember & {
    user: {
      id: string;
      name: string;
      email: string;
      avatarUrl?: string;
    };
    role: "OWNER" | "ADMIN" | "MEMBER";
  })[];
}

export interface AddProjectMemberRequest {
  userId: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
}

export interface AddProjectMemberResponse {
  success: boolean;
  message: string;
  member: any;
}

export type CreateProjectRequest = CreateProjectDto;
export type UpdateProjectRequest = Partial<CreateProjectDto> & {
  status?: Project["status"];
};

export interface UpdateProjectResponse {
  success: boolean;
  message: string;
  project: Project;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  tag: string;
  status:
    | "TODO"
    | "IN_PROGRESS"
    | "IN_REVIEW"
    | "BLOCKED"
    | "ON_HOLD"
    | "DONE"
    | "CANCELED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  members: {
    id: string;
    name: string;
    avatarUrl?: string;
  }[];
  image?: string;
  subtasks: {
    id: string;
    title: string;
    completed: boolean;
  }[];
  createdAt: string;
  deadline?: string;
}
