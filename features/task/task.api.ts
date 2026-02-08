import { API_BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateTaskRequest,
  CreateTaskResponse,
  GetTasksQuery,
  GetTasksResponse,
} from "./task.interface";

const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Tasks", "ProjectTasks"],
  endpoints: (build) => ({
    getTasks: build.query<
      GetTasksResponse,
      { projectId: string; query?: GetTasksQuery }
    >({
      query: ({ projectId, query }) => ({
        url: `/projects/${projectId}/tasks`,
        params: query,
      }),
      providesTags: ["ProjectTasks"],
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
  }),
});

export const { useCreateTaskMutation, useGetTasksQuery } = taskApi;

export default taskApi;
