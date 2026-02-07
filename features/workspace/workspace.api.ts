import { API_BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetWorkspacesResponse } from "./workspace.interface";

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
  }),
});

export const { useGetWorkspacesQuery } = workspaceApi;

export default workspaceApi;
