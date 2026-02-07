import { API_BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateWorkspaceRequest,
  CreateWorkspaceResponse,
  GetWorkspacesResponse,
} from "./workspace.interface";

const workspaceApi = createApi({
  reducerPath: "workspaceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/organizations`,
    credentials: "include",
  }),
  tagTypes: ["workspaces"],
  endpoints: (build) => ({
    getWorkspaces: build.query<GetWorkspacesResponse, string>({
      query: (orgId) => `/${orgId}/workspaces`,
      providesTags: ["workspaces"],
    }),
    createWorkspace: build.mutation<
      CreateWorkspaceResponse,
      { orgId: string; body: CreateWorkspaceRequest }
    >({
      query: ({ orgId, body }) => ({
        url: `/${orgId}/workspaces`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["workspaces"],
    }),
  }),
});

export const { useGetWorkspacesQuery, useCreateWorkspaceMutation } =
  workspaceApi;

export default workspaceApi;
