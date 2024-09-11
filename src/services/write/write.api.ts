import instance from '../instance/axiosInstance';

export const writePost = async (data: any): Promise<any> => {
  const response = await instance.post(`/post`, data);
  return response.data;
};
