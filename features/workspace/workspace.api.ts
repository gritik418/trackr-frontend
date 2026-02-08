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
  UpdateWorkspaceMemberRoleRequest,
  UpdateWorkspaceMemberRoleResponse,
  RemoveWorkspaceMemberResponse,
  GetWorkspaceMembersResponse,
  GetWorkspaceInvitesResponse,
  SendWorkspaceInviteRequest,
  SendWorkspaceInviteResponse,
  RevokeWorkspaceInviteResponse,
  ResendWorkspaceInviteResponse,
} from "./workspace.interface";

const workspaceApi = createApi({
  reducerPath: "workspaceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}`,
    credentials: "include",
  }),
  tagTypes: ["workspaces", "members", "workspaceInvites"],
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
    getWorkspaceMembers: build.query<GetWorkspaceMembersResponse, string>({
      query: (workspaceId) => `/workspaces/${workspaceId}/members`,
      providesTags: ["members"],
    }),
    sendWorkspaceInvite: build.mutation<
      SendWorkspaceInviteResponse,
      { workspaceId: string; body: SendWorkspaceInviteRequest }
    >({
      query: ({ workspaceId, body }) => ({
        url: `/workspaces/${workspaceId}/invites`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["workspaceInvites"],
    }),
    getWorkspaceInvites: build.query<
      GetWorkspaceInvitesResponse,
      { workspaceId: string; status?: string }
    >({
      query: ({ workspaceId, status }) => ({
        url: `/workspaces/${workspaceId}/invites`,
        params: status && status !== "ALL" ? { status } : undefined,
      }),
      providesTags: ["workspaceInvites"],
    }),
    revokeWorkspaceInvite: build.mutation<
      RevokeWorkspaceInviteResponse,
      { workspaceId: string; inviteId: string }
    >({
      query: ({ workspaceId, inviteId }) => ({
        url: `/workspaces/${workspaceId}/invites/${inviteId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["workspaceInvites"],
    }),
    resendWorkspaceInvite: build.mutation<
      ResendWorkspaceInviteResponse,
      { workspaceId: string; inviteId: string }
    >({
      query: ({ workspaceId, inviteId }) => ({
        url: `/workspaces/${workspaceId}/invites/${inviteId}/resend`,
        method: "PATCH",
      }),
      invalidatesTags: ["workspaceInvites"],
    }),
    updateWorkspaceMemberRole: build.mutation<
      UpdateWorkspaceMemberRoleResponse,
      {
        workspaceId: string;
        memberId: string;
        body: UpdateWorkspaceMemberRoleRequest;
      }
    >({
      query: ({ workspaceId, memberId, body }) => ({
        url: `/workspaces/${workspaceId}/members/${memberId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["members"],
    }),
    removeWorkspaceMember: build.mutation<
      RemoveWorkspaceMemberResponse,
      { workspaceId: string; memberId: string }
    >({
      query: ({ workspaceId, memberId }) => ({
        url: `/workspaces/${workspaceId}/members/${memberId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["members"],
    }),
  }),
});

export const {
  useGetWorkspacesQuery,
  useGetWorkspaceDetailsQuery,
  useCreateWorkspaceMutation,
  useUpdateWorkspaceMutation,
  useDeleteWorkspaceMutation,
  useGetWorkspaceMembersQuery,
  useUpdateWorkspaceMemberRoleMutation,
  useRemoveWorkspaceMemberMutation,
  useGetWorkspaceInvitesQuery,
  useSendWorkspaceInviteMutation,
  useRevokeWorkspaceInviteMutation,
  useResendWorkspaceInviteMutation,
} = workspaceApi;

export default workspaceApi;
