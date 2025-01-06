// src/hooks/usePosts.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, deletePost, getPosts, updatePost } from "../services/api"; // Supondo que essa seja a função que busca os posts
import { Post } from "../services/api/types";
import { useMemo } from "react";

export const usePosts = () => {
  const queryClient = useQueryClient();

  const { data: posts, isLoading, isSuccess } = useQuery<Array<Post>>({
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime: Infinity,
  });

  const cachedPosts = queryClient.getQueryData<Array<Post>>(["posts"]);

  const updatedPosts = useMemo(() => {
    return (
      cachedPosts?.map((post) => {
        if (!post.image) {
          post.image = `https://picsum.photos/id/${post.id}/600/400`;
        }
        return post;
      }) || []
    );
  }, [cachedPosts]);

  if (isSuccess) {
    queryClient.setQueryData(["posts"], updatedPosts);
  }

  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost: Post) => {
      queryClient.setQueryData(["posts"], (oldPosts: Array<Post>) => {
        const maxId =
          oldPosts.length > 0
            ? Math.max(...oldPosts.map((post) => post.id))
            : 0;

        newPost.id = maxId + 1;
        return oldPosts ? [newPost, ...oldPosts] : [newPost];
      });
    },
  });

  const { mutate: editMutationPost } = useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost: Post) => {
      queryClient.setQueryData<Array<Post>>(
        ["posts"],
        (oldPosts) =>
          oldPosts?.map((post) =>
            post.id === updatedPost.id ? { ...post, ...updatedPost } : post
          ) || []
      );
    },
  });

  const { mutate: deleteMutation } = useMutation<void, Error, number>({
    mutationFn: deletePost,
    onSuccess: (_, postId: number) => {
      queryClient.setQueryData<Array<Post>>(
        ["posts"],
        (oldPosts) => oldPosts?.filter((post) => post.id !== postId) || []
      );
    },
  });


  return { posts, cachedPosts, createPost: mutate, deletePost: deleteMutation, editPost: editMutationPost, isLoading, isSuccess };
};
