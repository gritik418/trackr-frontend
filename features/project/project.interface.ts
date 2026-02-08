import { Project } from "@/types/project/project.interface";
import { CreateProjectDto } from "@/types/project/create-project.interface";

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

export type CreateProjectRequest = CreateProjectDto;
