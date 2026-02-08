import { API_BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateWorkspaceRequest,
  CreateWorkspaceResponse,
  GetWorkspacesResponse,
  GetWorkspaceDetailsResponse,
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
  }),
});

export const {
  useGetWorkspacesQuery,
  useGetWorkspaceDetailsQuery,
  useCreateWorkspaceMutation,
} = workspaceApi;

export default workspaceApi;
