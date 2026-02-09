import { User } from "@/types/user/user.interface";

export interface Comment {
  id: string;
  content: string;
  taskId: string;
  userId: string;
  user: {
    id: string;
    name: string;
    avatarUrl?: string | null;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentRequest {
  content: string;
}

export interface CreateCommentResponse {
  success: boolean;
  message: string;
  comment: Comment;
}

export interface GetCommentsResponse {
  success: boolean;
  message: string;
  comments: Comment[];
}

export interface DeleteCommentResponse {
  success: boolean;
  message: string;
}
