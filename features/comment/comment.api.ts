import { API_BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateCommentRequest,
  CreateCommentResponse,
  GetCommentsResponse,
  DeleteCommentResponse,
} from "./comment.interface";

const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}`,
    credentials: "include",
  }),
  tagTypes: ["Comments"],
  endpoints: (build) => ({
    getComments: build.query<GetCommentsResponse, string>({
      query: (taskId) => `/tasks/${taskId}/comments`,
      providesTags: (result, error, taskId) => [
        { type: "Comments", id: taskId },
      ],
    }),
    addComment: build.mutation<
      CreateCommentResponse,
      { taskId: string; body: CreateCommentRequest }
    >({
      query: ({ taskId, body }) => ({
        url: `/tasks/${taskId}/comments`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Comments", id: taskId },
      ],
    }),
    deleteComment: build.mutation<
      DeleteCommentResponse,
      { taskId: string; commentId: string }
    >({
      query: ({ taskId, commentId }) => ({
        url: `/tasks/${taskId}/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Comments", id: taskId },
      ],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
} = commentApi;

export default commentApi;
