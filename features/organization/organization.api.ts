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
    revokeInvite: build.mutation<void, { orgId: string; inviteId: string }>({
      query: ({ orgId, inviteId }) => ({
        url: `/${orgId}/invites/${inviteId}`,
        method: "DELETE",
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
  useRevokeInviteMutation,
} = organizationApi;
export default organizationApi;
