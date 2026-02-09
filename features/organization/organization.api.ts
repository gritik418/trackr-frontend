import { API_BASE_URL } from "@/constants";
import { CreateOrganizationDto } from "@/types/organization/create-organization.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetMembersResponse,
  GetInvitationsResponse,
  GetOrganizationDetailsResponse,
  GetOrganizationsResponse,
  InviteMemberDto,
  UpdateOrgDto,
  PreviewOrgInviteResponse,
  AcceptOrgInviteResponse,
} from "./organization.interface";

const organizationApi = createApi({
  reducerPath: "organizationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/organizations`,
    credentials: "include",
  }),
  tagTypes: ["organizations", "invites"],
  endpoints: (build) => ({
    getOrganizations: build.query<GetOrganizationsResponse, void>({
      query: () => "/",
      providesTags: ["organizations"],
    }),
    getOrganizationDetails: build.query<GetOrganizationDetailsResponse, string>(
      {
        query: (slug) => `/slug/${slug}`,
        providesTags: (result) => [
          {
            type: "organizations",
            id: result?.organization?.id,
          },
        ],
      },
    ),
    createOrganization: build.mutation<void, CreateOrganizationDto>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["organizations"],
    }),
    updateOrganization: build.mutation<void, UpdateOrgDto>({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["organizations"],
    }),
    deleteOrganization: build.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["organizations"],
    }),
    inviteMember: build.mutation<void, InviteMemberDto>({
      query: ({ orgId, ...data }) => ({
        url: `/${orgId}/invites`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["invites"],
    }),
    getOrganizationMembers: build.query<GetMembersResponse, string>({
      query: (orgId) => `/${orgId}/members`,
      providesTags: ["organizations"],
    }),
    getOrganizationInvites: build.query<
      GetInvitationsResponse,
      { orgId: string; status?: string }
    >({
      query: ({ orgId, status }) => ({
        url: `/${orgId}/invites`,
        params: status && status !== "ALL" ? { status } : undefined,
      }),
      providesTags: ["invites"],
    }),
    previewOrgInvite: build.query<
      PreviewOrgInviteResponse,
      { orgId: string; token: string }
    >({
      query: ({ orgId, token }) => `/${orgId}/invites/preview?token=${token}`,
      providesTags: ["invites"],
    }),
    acceptOrgInvite: build.mutation<
      AcceptOrgInviteResponse,
      { orgId: string; body: { token: string } }
    >({
      query: ({ orgId, body }) => ({
        url: `/${orgId}/invites/accept`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["organizations", "invites"],
    }),
    declineOrgInvite: build.mutation<
      AcceptOrgInviteResponse,
      { orgId: string; body: { token: string } }
    >({
      query: ({ orgId, body }) => ({
        url: `/${orgId}/invites/reject`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["invites"],
    }),
    revokeInvite: build.mutation<void, { orgId: string; inviteId: string }>({
      query: ({ orgId, inviteId }) => ({
        url: `/${orgId}/invites/${inviteId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["invites"],
    }),
    resendInvite: build.mutation<void, { orgId: string; inviteId: string }>({
      query: ({ orgId, inviteId }) => ({
        url: `/${orgId}/invites/${inviteId}/resend`,
        method: "PATCH",
      }),
      invalidatesTags: ["invites"],
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useGetOrganizationDetailsQuery,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
  useInviteMemberMutation,
  useGetOrganizationMembersQuery,
  useGetOrganizationInvitesQuery,
  usePreviewOrgInviteQuery,
  useAcceptOrgInviteMutation,
  useDeclineOrgInviteMutation,
  useRevokeInviteMutation,
  useResendInviteMutation,
} = organizationApi;
export default organizationApi;
