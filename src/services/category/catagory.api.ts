import instance from '../instance/axiosInstance';

export const getCategory = async (categoryId: string): Promise<any> => {
  const response = await instance.get(`/category/${categoryId}`);
  return response.data;
};
