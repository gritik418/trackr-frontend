import { API_BASE_URL } from "@/constants";
import { CreateOrganizationDto } from "@/types/organization/create-organization.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetOrganizationDetailsResponse,
  GetOrganizationsResponse,
  UpdateOrgDto,
} from "./organization.interface";

const organizationApi = createApi({
  reducerPath: "organizationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/organizations`,
    credentials: "include",
  }),
  tagTypes: ["organizations"],
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
  }),
});

export const {
  useGetOrganizationsQuery,
  useGetOrganizationDetailsQuery,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
} = organizationApi;
export default organizationApi;
