import { API_BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AssignTaskRequest,
  AssignTaskResponse,
  CreateTaskRequest,
  CreateTaskResponse,
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
      { workspaceId: string; query?: Omit<GetTasksQuery, "assignedToId"> }
    >({
      query: ({ workspaceId, query }) => ({
        url: `/workspaces/${workspaceId}/my-tasks`,
        params: query,
      }),
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
