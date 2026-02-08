import { API_BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateTaskRequest, CreateTaskResponse } from "./task.interface";

const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Tasks", "ProjectTasks"],
  endpoints: (build) => ({
    createTask: build.mutation<
      CreateTaskResponse,
      { projectId: string; body: CreateTaskRequest }
    >({
      query: ({ projectId, body }) => ({
        url: `/projects/${projectId}/tasks`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tasks", "ProjectTasks"],
    }),
  }),
});

export const { useCreateTaskMutation } = taskApi;

export default taskApi;
