import { API_BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateWorkspaceRequest,
  CreateWorkspaceResponse,
  GetWorkspacesResponse,
  GetWorkspaceDetailsResponse,
  UpdateWorkspaceRequest,
  UpdateWorkspaceResponse,
  DeleteWorkspaceResponse,
} from "./workspace.interface";

const workspaceApi = createApi({
  reducerPath: "workspaceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}`,
    credentials: "include",
  }),
  tagTypes: ["workspaces"],
  endpoints: (build) => ({
    getWorkspaces: build.query<GetWorkspacesResponse, string>({
      query: (orgId) => `/organizations/${orgId}/workspaces`,
      providesTags: ["workspaces"],
    }),
    getWorkspaceDetails: build.query<GetWorkspaceDetailsResponse, string>({
      query: (slug) => `/workspaces/slug/${slug}`,
      providesTags: (result) => [
        {
          type: "workspaces",
          id: result?.workspace?.id,
        },
      ],
    }),
    createWorkspace: build.mutation<
      CreateWorkspaceResponse,
      { orgId: string; body: CreateWorkspaceRequest }
    >({
      query: ({ orgId, body }) => ({
        url: `/organizations/${orgId}/workspaces`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["workspaces"],
    }),
    updateWorkspace: build.mutation<
      UpdateWorkspaceResponse,
      { id: string; body: UpdateWorkspaceRequest }
    >({
      query: ({ id, body }) => ({
        url: `/workspaces/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result) => [
        { type: "workspaces", id: result?.workspace?.id },
      ],
    }),
    deleteWorkspace: build.mutation<DeleteWorkspaceResponse, string>({
      query: (id) => ({
        url: `/workspaces/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["workspaces"],
    }),
  }),
});

export const {
  useGetWorkspacesQuery,
  useGetWorkspaceDetailsQuery,
  useCreateWorkspaceMutation,
  useUpdateWorkspaceMutation,
  useDeleteWorkspaceMutation,
} = workspaceApi;

export default workspaceApi;
