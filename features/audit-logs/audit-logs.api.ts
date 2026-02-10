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
      }
    >({
      query: ({ orgId, ...params }) => ({
        url: `/organization/${orgId}`,
        params,
      }),
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
      }
    >({
      query: ({ orgId, workspaceId, ...params }) => ({
        url: `/workspace/${orgId}/${workspaceId}`,
        params,
      }),
      providesTags: ["audit-logs"],
    }),
  }),
});

export const { useGetOrgAuditLogsQuery, useGetWorkspaceAuditLogsQuery } =
  auditLogsApi;
export default auditLogsApi;
