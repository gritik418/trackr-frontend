import { API_BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateProjectRequest,
  CreateProjectResponse,
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
  }),
});

export const { useGetProjectsQuery, useCreateProjectMutation } = projectApi;

export default projectApi;
