import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createComment, deleteComment, getCommentsOfPost, updateComment } from "../services/api"; // Supondo que essa função busque os comentários
import { Comments, Post } from "../services/api/types";

export const useComments = (postId: number, userId: number, commentId?: number) => {
  const queryClient = useQueryClient();

  const { data: queryComments, isLoading, isSuccess } = useQuery<Array<Comments>>({
    queryKey: ["comments", postId],
    queryFn: () => getCommentsOfPost(postId),
    staleTime: Infinity,
  });

  const postQueries = queryClient.getQueryData<Array<Post>>(["posts"]);
  
  const postComment = postQueries?.find((post) => post.id === postId);

  const { mutate } = useMutation<void, Error, Comments>({
    mutationFn: createComment,
    onSuccess: (_, variables) => {
      queryClient.setQueryData<Array<Comments>>(
        ["comments", postId],
        (oldComments) => {
          const commentWithNewId = {
            ...variables,
            id: Date.now(),
            userId,
          };

          if (!oldComments) {
            return [commentWithNewId];
          }
          const newComment = [commentWithNewId, ...oldComments];
          return newComment;
        }
      );
    },
  });

  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteComment,
    onSuccess: (_, commentId) => {
      queryClient.setQueryData<Array<Comments>>(
        ["comments", postId],
        (oldComments) => {
          return (
            oldComments?.filter((comment) => {
              return comment.id !== commentId;
            }) || []
          );
        }
      );
    },
  });

  const { mutate: editMutation } = useMutation({
    mutationFn: updateComment,
    onSuccess: (updatedComment: Comments) => {
      queryClient.setQueryData<Array<Comments>>(
        ["comments", postId],
        (oldComments) => {
          return (
            oldComments?.map((comment) => {
              return comment.id === commentId
                ? { ...comment, body: updatedComment.body }
                : comment;
            }) || []
          );
        }
      );
    },
  });


  return { queryComments, createComment: mutate, deleteMutation, editMutation, postComment, isLoading, isSuccess, postId };
};
