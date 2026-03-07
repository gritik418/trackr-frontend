import { CreateProjectDto } from "@/types/project/create-project.interface";
import { Project } from "@/types/project/project.interface";

export interface ProjectsWithStats extends Project {
  stats?: {
    nature: ProjectNature;
    members: ProjectMember[] | null;
    membersCount: number;
    completionPercentage: number;
  };
}

export interface GetProjectsResponse {
  success: boolean;
  message: string;
  projects: ProjectsWithStats[];
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

export interface ProjectMember {
  id: string;
  projectId: string;
  userId: string;
  joinedAt: string;
  user: { id: string; name: string; email: string; avatarUrl?: string };
  role: "OWNER" | "ADMIN" | "MEMBER";
}

export interface GetProjectMembersResponse {
  success: boolean;
  message: string;
  members: ProjectMember[];
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

export enum ProjectStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  ON_HOLD = "ON_HOLD",
  BLOCKED = "BLOCKED",
  COMPLETED = "COMPLETED",
  ARCHIVED = "ARCHIVED",
  CANCELED = "CANCELED",
}

export enum ProjectNature {
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC",
}

export interface GetProjectOverviewResponse {
  success: boolean;
  message: string;
  overview?: ProjectOverview;
}

export interface ProjectOverview {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  nature: ProjectNature;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;

  membersCount: number;

  taskStatusCount?: ProjectTaskStatusCount;

  velocity?: ProjectVelocity;
}

export interface ProjectTaskStatusCount {
  total: number;
  todo: number;
  inProgress: number;
  inReview: number;
  onHold: number;
  done: number;
  canceled: number;
  blocked: number;
}

export interface ProjectVelocity {
  weeklyCompleted: number;
  completionRate: number;
  last7Days: {
    date: string;
    completed: number;
  }[];
}

export interface GetProjectsInput {
  workspaceId: string;
  search?: string;
  status?: ProjectStatusWithAll;
  nature?: ProjectNatureWithAll;
}

enum ExtraProjectStatus {
  ALL = "ALL",
}

enum ExtraProjectNature {
  ALL = "ALL",
}

export const ProjectStatusWithAll = {
  ...ProjectStatus,
  ...ExtraProjectStatus,
};

export const ProjectNatureWithAll = {
  ...ProjectNature,
  ...ExtraProjectNature,
};

type ProjectStatusWithAll =
  (typeof ProjectStatusWithAll)[keyof typeof ProjectStatusWithAll];

type ProjectNatureWithAll =
  (typeof ProjectNatureWithAll)[keyof typeof ProjectNatureWithAll];
