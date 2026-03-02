import { API_BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OrgDashboardStatsResponse } from "./dashboard.interface";

const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/organizations`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getDashboardStats: builder.query<OrgDashboardStatsResponse, string>({
      query: (orgId: string) => ({
        url: `/${orgId}/dashboard/overview`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;

export default dashboardApi;
