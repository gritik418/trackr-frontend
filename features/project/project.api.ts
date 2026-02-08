import { API_BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateProjectRequest,
  CreateProjectResponse,
  GetProjectByIdResponse,
  GetProjectsResponse,
} from "./project.interface";

const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}`,
    credentials: "include",
  }),
  tagTypes: ["Projects"],
  endpoints: (build) => ({
    getProjects: build.query<GetProjectsResponse, string>({
      query: (workspaceId) => `/workspaces/${workspaceId}/projects`,
      providesTags: (result) =>
        result
          ? [
              ...result.projects.map(({ id }) => ({
                type: "Projects" as const,
                id,
              })),
              { type: "Projects", id: "LIST" },
            ]
          : [{ type: "Projects", id: "LIST" }],
    }),
    createProject: build.mutation<
      CreateProjectResponse,
      { workspaceId: string; body: CreateProjectRequest }
    >({
      query: ({ workspaceId, body }) => ({
        url: `/workspaces/${workspaceId}/projects`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Projects", id: "LIST" }],
    }),
    getProjectById: build.query<
      GetProjectByIdResponse,
      { workspaceId: string; projectId: string }
    >({
      query: ({ workspaceId, projectId }) =>
        `/workspaces/${workspaceId}/projects/${projectId}`,
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetProjectByIdQuery,
} = projectApi;

export default projectApi;
