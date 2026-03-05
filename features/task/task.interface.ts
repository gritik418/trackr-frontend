export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  BLOCKED = "BLOCKED",
  ON_HOLD = "ON_HOLD",
  DONE = "DONE",
  CANCELED = "CANCELED",
}

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  deadline?: string | null;
  tag?: string | null;
  workspaceId: string;
  projectId: string;
  categoryId?: string | null;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  assignees: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
  }[];
  links?: {
    id: string;
    title?: string | null;
    url: string;
  }[];
}

export interface CreateTaskLinkDto {
  title?: string;
  url: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  deadline?: string | null | Date;
  tag?: string | null;
  assignedToIds?: string[];
  categoryId?: string | null;
  links?: CreateTaskLinkDto[];
}

export interface CreateTaskResponse {
  success: boolean;
  message: string;
  task: Task;
}

enum ExtraTaskStatus {
  ALL = "ALL",
}

export const TaskStatusWithAll = {
  ...TaskStatus,
  ...ExtraTaskStatus,
};

type TaskStatusWithAll =
  (typeof TaskStatusWithAll)[keyof typeof TaskStatusWithAll];

export type SortBy = "createdAt" | "updatedAt" | "deadline";

export type SortOrder = "asc" | "desc";

export interface GetTasksQuery {
  status?: TaskStatusWithAll;
  priority?: TaskPriority;
  tag?: string;
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
}

export interface GetTasksResponse {
  success: boolean;
  message: string;
  tasks?: Task[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface GetTaskByIdResponse {
  success: boolean;
  message: string;
  task: Task;
}
export interface UpdateTaskRequest extends Partial<CreateTaskRequest> {}

export interface UpdateTaskResponse {
  success: boolean;
  message: string;
  task: Task;
}
