import { EditPostData } from '@/types/postStore/postStore.types';
import instance from '../instance/axiosInstance';

export const writePost = async (data: any): Promise<any> => {
  const response = await instance.post(`/posts`, data);
  return response.data;
};

export const uploadImage = async (data: Blob) => {
  const formData = new FormData();
  formData.append('file', data); // 'file'은 서버에서 기대하는 필드 이름입니다.

  const response = await instance.post(`/posts/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // 헤더 설정
    },
  });
  return response.data;
};

export const getMainPost = async () => {
  const response = await instance.get(`/posts/main-posts`);
  return response.data;
};

export const getPostById = async (postId: string) => {
  const response = await instance.get(`/posts/${postId}`);
  return response.data;
};

export const editPostById = async (postId: string, data: EditPostData) => {
  const response = await instance.patch(`/posts/${postId}`, data);
  return response.data;
};

export const softDelteById = async (postId: string) => {
  const response = await instance.delete(`/posts/${postId}`);
  return response.data;
};
