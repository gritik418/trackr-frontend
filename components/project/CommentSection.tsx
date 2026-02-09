"use client";

import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
} from "@/features/comment/comment.api";
import {
  MessageSquare,
  Paperclip,
  Send,
  Trash2,
  User as UserIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";

interface CommentSectionProps {
  taskId: string;
}

export default function CommentSection({ taskId }: CommentSectionProps) {
  const [content, setContent] = useState("");
  const { data: commentsData, isLoading } = useGetCommentsQuery(taskId);
  const [addComment, { isLoading: isAdding }] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await addComment({ taskId, body: { content } }).unwrap();
      setContent("");
      toast.success("Comment added");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add comment");
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment({ taskId, commentId }).unwrap();
      toast.success("Comment deleted");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete comment");
    }
  };

  const comments = commentsData?.comments || [];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center gap-2 text-neutral-400">
        <div className="w-8 h-px bg-white/10" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
          Discussion ({comments.length})
        </span>
      </div>

      {/* Comment Input */}
      <div className="flex gap-4">
        <div className="w-8 h-8 rounded-xl bg-brand/20 border border-brand/30 flex items-center justify-center text-brand font-bold text-xs shrink-0">
          U
        </div>
        <form onSubmit={handleSubmit} className="flex-1 space-y-4">
          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write a comment..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand/30 min-h-[100px] transition-all resize-none"
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <button
                type="button"
                className="p-2 text-neutral-500 hover:text-white rounded-lg transition-colors"
                title="Attach file"
              >
                <Paperclip size={16} />
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isAdding || !content.trim()}
              className="px-6 py-2.5 bg-brand text-bg-dark-0 font-bold rounded-xl hover:bg-brand-hover transition-all shadow-lg shadow-brand/10 text-sm flex items-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAdding ? (
                "Sending..."
              ) : (
                <>
                  <Send size={14} />
                  Comment
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand border-t-transparent" />
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 group">
              <div className="w-8 h-8 rounded-xl bg-neutral-800 border border-white/5 flex items-center justify-center text-xs text-white overflow-hidden shrink-0">
                {comment.user.avatarUrl ? (
                  <Image
                    src={comment.user.avatarUrl}
                    alt={comment.user.name}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  comment.user.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2) || (
                    <UserIcon size={14} className="text-neutral-500" />
                  )
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">
                      {comment.user.name}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-medium">
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="p-1 px-2 text-neutral-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    title="Delete comment"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
                <div className="text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap selection:bg-brand/30">
                  {comment.content}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center bg-white/2 border border-dashed border-white/5 rounded-3xl">
            <MessageSquare
              size={24}
              className="mx-auto text-neutral-700 mb-2 opacity-20"
            />
            <p className="text-xs text-neutral-500 font-medium">
              No comments yet. Start the conversation!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
