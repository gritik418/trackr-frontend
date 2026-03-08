import { API_BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auditLogsApi } from "../audit-logs/audit-logs.api";
import {
  AssignTaskRequest,
  AssignTaskResponse,
  CreateTaskRequest,
  CreateTaskResponse,
  GetMyTasksQuery,
  GetTaskByIdResponse,
  GetTasksQuery,
  GetTasksResponse,
  UnassignTaskRequest,
  UnassignTaskResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
} from "./task.interface";

const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Tasks", "ProjectTasks", "WorkspaceTasks"],
  endpoints: (build) => ({
    getTasks: build.query<
      GetTasksResponse,
      { projectId: string; query?: GetTasksQuery }
    >({
      query: ({ projectId, query }) => {
        const searchParams = new URLSearchParams();
        if (query?.status) searchParams.set("status", query.status);

        if (query?.priority) searchParams.set("priority", query.priority);

        if (query?.tag) searchParams.set("tag", query.tag);
        if (query?.page) searchParams.set("page", query.page.toString());
        if (query?.limit) searchParams.set("limit", query.limit.toString());
        if (query?.search) searchParams.set("search", query.search);
        if (query?.sortBy) searchParams.set("sortBy", query.sortBy);
        if (query?.sortOrder) searchParams.set("sortOrder", query.sortOrder);

        return {
          url: `/projects/${projectId}/tasks`,
          params: searchParams,
        };
      },
      providesTags: ["ProjectTasks"],
    }),
    getWorkspaceTasks: build.query<
      GetTasksResponse,
      { workspaceId: string; query?: GetMyTasksQuery }
    >({
      query: ({ workspaceId, query }) => {
        const searchParams = new URLSearchParams();
        if (query?.statuses && query.statuses.length > 0) {
          query.statuses.forEach((s) => searchParams.append("statuses", s));
        }
        if (query?.priorities && query.priorities.length > 0) {
          query.priorities.forEach((p) => searchParams.append("priorities", p));
        }
        if (query?.projectIds && query.projectIds.length > 0) {
          query.projectIds.forEach((id) =>
            searchParams.append("projectIds", id),
          );
        }
        if (query?.priorities && query.priorities.length > 0) {
          query.priorities.forEach((p) => searchParams.append("priorities", p));
        }
        if (query?.tag) searchParams.set("tag", query.tag);
        if (query?.page) searchParams.set("page", query.page.toString());
        if (query?.limit) searchParams.set("limit", query.limit.toString());
        if (query?.search) searchParams.set("search", query.search);
        if (query?.sortBy) searchParams.set("sortBy", query.sortBy);
        if (query?.sortOrder) searchParams.set("sortOrder", query.sortOrder);
        if (query?.projectIds && query.projectIds.length > 0) {
          query.projectIds.forEach((id) =>
            searchParams.append("projectIds", id),
          );
        }

        return {
          url: `/workspaces/${workspaceId}/my-tasks`,
          params: searchParams,
        };
      },
      providesTags: ["WorkspaceTasks", "ProjectTasks", "Tasks"],
    }),
    createTask: build.mutation<
      CreateTaskResponse,
      { projectId: string; body: CreateTaskRequest }
    >({
      query: ({ projectId, body }) => ({
        url: `/projects/${projectId}/tasks`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ProjectTasks"],
    }),
    getTaskById: build.query<
      GetTaskByIdResponse,
      { taskId: string; projectId: string }
    >({
      query: ({ taskId, projectId }) =>
        `/projects/${projectId}/tasks/${taskId}`,
      providesTags: (result, error, { taskId }) => [
        { type: "Tasks", id: taskId },
      ],
    }),

    updateTask: build.mutation<
      UpdateTaskResponse,
      { taskId: string; projectId: string; body: UpdateTaskRequest }
    >({
      query: ({ taskId, projectId, body }) => ({
        url: `/projects/${projectId}/tasks/${taskId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tasks", id: taskId },
        "ProjectTasks",
      ],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            auditLogsApi.util.invalidateTags([{ type: "audit-logs" as any }]),
          );
        } catch {}
      },
    }),
    assignTask: build.mutation<
      AssignTaskResponse,
      { taskId: string; projectId: string; body: AssignTaskRequest }
    >({
      query: ({ taskId, projectId, body }) => ({
        url: `/projects/${projectId}/tasks/${taskId}/assign`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tasks", id: taskId },
        "ProjectTasks",
      ],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            auditLogsApi.util.invalidateTags([{ type: "audit-logs" as any }]),
          );
        } catch {}
      },
    }),
    unassignTask: build.mutation<
      UnassignTaskResponse,
      { taskId: string; projectId: string; body: UnassignTaskRequest }
    >({
      query: ({ taskId, projectId, body }) => ({
        url: `/projects/${projectId}/tasks/${taskId}/unassign`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tasks", id: taskId },
        "ProjectTasks",
      ],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            auditLogsApi.util.invalidateTags([{ type: "audit-logs" as any }]),
          );
        } catch {}
      },
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetTasksQuery,
  useGetWorkspaceTasksQuery,
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
  useAssignTaskMutation,
  useUnassignTaskMutation,
} = taskApi;

export default taskApi;
