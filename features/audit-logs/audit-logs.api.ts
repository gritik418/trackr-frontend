import { API_BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetAuditLogsResponse } from "./audit-logs.interface";

export const auditLogsApi = createApi({
  reducerPath: "auditLogsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/audit-logs`,
    credentials: "include",
  }),
  tagTypes: ["audit-logs"],
  endpoints: (build) => ({
    getOrgAuditLogs: build.query<
      GetAuditLogsResponse,
      {
        orgId: string;
        limit?: number;
        page?: number;
        action?: string;
        entityType?: string;
        entityId?: string;
        userId?: string;
        search?: string;
        startDate?: string;
        endDate?: string;
      }
    >({
      query: ({ orgId, ...params }) => {
        const queryParams = new URLSearchParams();
        if (params.limit) queryParams.set("limit", params.limit.toString());
        if (params.page) queryParams.set("page", params.page.toString());
        if (params.action) queryParams.set("action", params.action);
        if (params.entityType) queryParams.set("entityType", params.entityType);
        if (params.entityId) queryParams.set("entityId", params.entityId);
        if (params.userId) queryParams.set("userId", params.userId);
        if (params.search) queryParams.set("search", params.search);
        if (params.startDate) queryParams.set("startDate", params.startDate);
        if (params.endDate) queryParams.set("endDate", params.endDate);

        return {
          url: `/organization/${orgId}`,
          params: queryParams,
        };
      },
      providesTags: ["audit-logs"],
    }),
    getWorkspaceAuditLogs: build.query<
      GetAuditLogsResponse,
      {
        orgId: string;
        workspaceId: string;
        limit?: number;
        page?: number;
        action?: string;
        entityType?: string;
        entityId?: string;
        userId?: string;
        startDate?: string;
        endDate?: string;
      }
    >({
      query: ({ orgId, workspaceId, ...params }) => {
        const queryParams = new URLSearchParams();
        if (params.limit) queryParams.set("limit", params.limit.toString());
        if (params.page) queryParams.set("page", params.page.toString());
        if (params.action) queryParams.set("action", params.action);
        if (params.entityType) queryParams.set("entityType", params.entityType);
        if (params.entityId) queryParams.set("entityId", params.entityId);
        if (params.userId) queryParams.set("userId", params.userId);
        if (params.startDate) queryParams.set("startDate", params.startDate);
        if (params.endDate) queryParams.set("endDate", params.endDate);

        return {
          url: `/workspace/${orgId}/${workspaceId}`,
          params: queryParams,
        };
      },
      providesTags: ["audit-logs"],
    }),
  }),
});

export const { useGetOrgAuditLogsQuery, useGetWorkspaceAuditLogsQuery } =
  auditLogsApi;
export default auditLogsApi;
