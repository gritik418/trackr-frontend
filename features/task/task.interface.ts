export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
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

export interface GetTasksQuery {
  status?: TaskStatus;
  priority?: TaskPriority;
  assignedToIds?: string[];
  tag?: string;
}

export interface GetTasksResponse {
  success: boolean;
  message: string;
  tasks: Task[];
}

export interface GetTaskByIdResponse {
  success: boolean;
  message: string;
  task: Task;
}
