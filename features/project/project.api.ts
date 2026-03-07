import { API_BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auditLogsApi } from "../audit-logs/audit-logs.api";
import {
  AddProjectMemberRequest,
  AddProjectMemberResponse,
  CreateProjectRequest,
  CreateProjectResponse,
  GetProjectByIdResponse,
  GetProjectMembersResponse,
  GetProjectOverviewResponse,
  GetProjectsInput,
  GetProjectsResponse,
  UpdateProjectRequest,
  UpdateProjectResponse,
} from "./project.interface";

const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}`,
    credentials: "include",
  }),
  tagTypes: ["Projects"],
  endpoints: (build) => ({
    getProjects: build.query<GetProjectsResponse, GetProjectsInput>({
      query: ({ workspaceId, nature, search, status }) => {
        const searchParams = new URLSearchParams();
        if (status) searchParams.set("status", status);
        if (search) searchParams.set("search", search);
        if (nature) searchParams.set("nature", nature);

        return {
          url: `/workspaces/${workspaceId}/projects`,
          params: searchParams,
        };
      },
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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            auditLogsApi.util.invalidateTags([{ type: "audit-logs" as any }]),
          );
        } catch {}
      },
    }),
    updateProject: build.mutation<
      UpdateProjectResponse,
      { workspaceId: string; projectId: string; body: UpdateProjectRequest }
    >({
      query: ({ workspaceId, projectId, body }) => ({
        url: `/workspaces/${workspaceId}/projects/${projectId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { projectId }) => [
        { type: "Projects", id: projectId },
        { type: "Projects", id: "LIST" },
      ],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            auditLogsApi.util.invalidateTags([{ type: "audit-logs" as any }]),
          );
        } catch {}
      },
    }),
    getProjectById: build.query<
      GetProjectByIdResponse,
      { workspaceId: string; projectId: string }
    >({
      query: ({ workspaceId, projectId }) =>
        `/workspaces/${workspaceId}/projects/${projectId}`,
      providesTags: (result, error, { projectId }) => [
        { type: "Projects", id: projectId },
      ],
    }),
    getProjectMembers: build.query<
      GetProjectMembersResponse,
      { workspaceId: string; projectId: string }
    >({
      query: ({ workspaceId, projectId }) =>
        `/workspaces/${workspaceId}/projects/${projectId}/members`,
      providesTags: (result, error, { projectId }) => [
        { type: "Projects", id: `${projectId}-members` },
      ],
    }),
    deleteProject: build.mutation<
      { success: boolean; message: string },
      { workspaceId: string; projectId: string }
    >({
      query: ({ workspaceId, projectId }) => ({
        url: `/workspaces/${workspaceId}/projects/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Projects", id: "LIST" }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            auditLogsApi.util.invalidateTags([{ type: "audit-logs" as any }]),
          );
        } catch {}
      },
    }),
    addMemberToProject: build.mutation<
      AddProjectMemberResponse,
      { workspaceId: string; projectId: string; body: AddProjectMemberRequest }
    >({
      query: ({ workspaceId, projectId, body }) => ({
        url: `/workspaces/${workspaceId}/projects/${projectId}/members`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { projectId }) => [
        { type: "Projects", id: `${projectId}-members` },
      ],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            auditLogsApi.util.invalidateTags([{ type: "audit-logs" as any }]),
          );
        } catch {}
      },
    }),
    removeMemberFromProject: build.mutation<
      { success: boolean; message: string },
      { workspaceId: string; projectId: string; userId: string }
    >({
      query: ({ workspaceId, projectId, userId }) => ({
        url: `/workspaces/${workspaceId}/projects/${projectId}/members/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { projectId }) => [
        { type: "Projects", id: `${projectId}-members` },
      ],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            auditLogsApi.util.invalidateTags([{ type: "audit-logs" as any }]),
          );
        } catch {}
      },
    }),
    getProjectOverview: build.query<
      GetProjectOverviewResponse,
      { workspaceId: string; projectId: string }
    >({
      query: ({ workspaceId, projectId }) =>
        `/workspaces/${workspaceId}/projects/${projectId}/overview`,
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
  useGetProjectMembersQuery,
  useDeleteProjectMutation,
  useAddMemberToProjectMutation,
  useRemoveMemberFromProjectMutation,
  useGetProjectOverviewQuery,
} = projectApi;

export default projectApi;
