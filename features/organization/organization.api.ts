import { API_BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetOrganizationDetailsResponse,
  GetOrganizationsResponse,
} from "./organization.interface";

const organizationApi = createApi({
  reducerPath: "organizationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/organizations`,
    credentials: "include",
  }),
  endpoints: (build) => ({
    getOrganizations: build.query<GetOrganizationsResponse, void>({
      query: () => "/",
    }),
    getOrganizationDetails: build.query<GetOrganizationDetailsResponse, string>(
      {
        query: (slug) => `/slug/${slug}`,
      },
    ),
  }),
});

export const { useGetOrganizationsQuery, useGetOrganizationDetailsQuery } =
  organizationApi;
export default organizationApi;
