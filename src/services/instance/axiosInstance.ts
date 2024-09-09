import { API_BASE_URL } from '@/constants/api';
import axios from 'axios';

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    // 요청이 전송되기 전에 수행할 작업을 설정합니다.
    // 예: JWT 토큰을 요청 헤더에 추가
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('Request:', config);
    return config;
  },
  (error) => {
    // 요청 오류가 발생한 경우 수행할 작업
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => {
    // 응답 데이터가 반환되기 전에 수행할 작업을 설정합니다.
    console.log('Response:', response);
    return response;
  },
  (error) => {
    // 응답 오류가 발생한 경우 수행할 작업
    if (error.response) {
      // 서버가 응답했지만 상태 코드가 2xx 범위를 벗어난 경우
      console.error('Response Error:', error.response);
    } else if (error.request) {
      // 요청이 전송되었지만 응답이 수신되지 않은 경우
      console.error('No Response:', error.request);
    } else {
      // 요청 설정 중에 문제가 발생한 경우
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default instance;
