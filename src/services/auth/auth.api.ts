import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASEURL;
/**회원가입 */
export const signupUser = async (data: any) => {
  const response = await axios.post(`${baseURL}/users/register`, data, {
    headers: {
      'Origin': 'https://www.addictionliberation.kr/',
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

/**로그인 */
export const loginUser = async (data: any) => {
  const response = await axios.post(`${baseURL}/users/login`, data, {
    headers: {
      'Origin': 'https://addictionliberation.kr',
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.patch(``);
  return response.data;
};
