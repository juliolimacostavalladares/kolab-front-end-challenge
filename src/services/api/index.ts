import api from '../../utils/axios';
import { Comments, Post, User } from './types';

export const getPosts = async () => {
  const response = await api.get<Array<Post>>(`/posts`);
  return response.data;
};

export const getOnePosts = async (postId: number) => {
  const response = await api.get<Post>(`/posts/${postId}`);
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get<Array<User>>('/users');
  return response.data;
};

export const getCommentsOfPost = async (postId: number) => {
  const response = await api.get<Array<Comments>>(`/posts/${postId}/comments`);
  return response.data;
};

export const getUsersById = async (userId: number) => {
  const response = await api.get<User>(`/users/${userId}`);
  return response.data;
};

export const getPostsOfOneUser = async (userId: number) => {
  const response = await api.get<Array<Post>>(`/posts?userId=${userId}`);
  return response.data;
};


export const createPost = async (post: { title: string; body: string; userId: number, image?: string }) => {
  const response = await api.post('/posts', post);
  return response.data;
};

export const deletePost = async (postId: number) => {
  await api.delete(`/posts/${postId}`);
};

export const createComment = async (comment: { postId: number; body: string; email: string }) => {
  const response = await api.post('/comments', comment);
  return response.data;
};

export const updateUser = async (user: { id: number; name: string, username: string }) => {
  const response = await api.patch(`/users/${user.id}`, {
    name: user.name,
    username: user.username
  });
  return response.data;
};

export const updateComment = async (comment: { id: number; body: string }) => {
  const response = await api.patch(`/comments/${comment.id}`, {
    body: comment.body,
  });
  return response.data;
};

export const updatePost = async (post: { id: number; body: string }) => {
  const response = await api.patch(`/comments/${post.id}`, {
    body: post.body,
  });
  return response.data;
};

export const deleteComment = async (commentId: number) => {
  const response = await api.delete(`/comments/${commentId}`);
  return response.data;
};
