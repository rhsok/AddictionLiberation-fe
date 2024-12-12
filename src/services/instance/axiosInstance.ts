import { API_BASE_URL } from '@/constants/api';
import userStore from '@/states/userStore/userStore';
import { UserType } from '@/types/userStore/userStore.types';
import { decodeJWT } from '@/utils/decodeJWT';
import axios, { AxiosError, AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

/**
 * 리프래시 토큰 요청을 위한 객체
 *  **/
const retryCountMap = new Map<string, { count: number; timestamp: number }>();
const MAX_RETRY_COUNT = 3;

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    const token = userStore.getState().accessToken;
    console.log('엑세스토큰 확인', token);
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    const reqId = '1';
    config.headers['X-Request-ID'] = reqId;
    retryCountMap.set(reqId, { count: 0, timestamp: Date.now() });
    return config;
  },
  (error) => {
    // 요청 오류가 발생한 경우 수행할 작업
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const reqId = response.config?.headers['X-Request-ID'];
    retryCountMap.delete(reqId);
    return response;
  },
  async (error: AxiosError) => {
    const reqId = error.config?.headers['X-Request-ID'];
    const { count, timestamp } = retryCountMap.get(reqId) || {
      count: 0,
      timestamp: Date.now(),
    };
    if (error.response?.status === 401 && count < MAX_RETRY_COUNT) {
      let retryCount = retryCountMap.get(reqId)?.count ?? 4;
      retryCountMap.set(reqId, { count: retryCount + 1, timestamp });
      const setAccessToken = userStore.getState().setAccessToken;
      const setUser = userStore.getState().setUser;
      return refreshTokenAndRetry(error, setAccessToken, setUser, reqId);
    }
    return Promise.reject(error);
  }
);

const refreshTokenAndRetry = async (
  error: AxiosError,
  setAccessToken: (token: string) => void,
  setUser: (user: UserType) => void,
  reqId: string
) => {
  try {
    /**엑세스 토큰기간 만료 or 없어짐 => 리프래시 토큰으로 엑세스 토큰요청
     * route handler (app/api/refreshToken)
     */
    const { data } = await axios.post(
      '/api/refreshToken',
      {},
      {
        withCredentials: true, // 쿠키를 포함
      }
    );
    setAccessToken(data.token);
    const decodedJWT = decodeJWT(data.token);
    setUser({
      id: decodedJWT.id,
      email: decodedJWT.email,
      name: decodedJWT.name,
      iat: decodedJWT.iat,
      exp: decodedJWT.exp,
      scope: decodedJWT.scope,
    });
    /** 엑세스토큰 갱신시 기존의 실패했던 요청을 다시 보냄
     */
    if (error.config) {
      error.config.headers.Authorization = `Bearer ${data.token}`;
      return instance.request(error.config);
    }
  } catch (e: any) {
    // 리프레시 토큰 조회안됨
    if (e.response.data.data === 'Authentication token is missing') {
      return Promise.reject(new Error(`Refresh token lost: ${e.message}`));
    }
    // 리프레시 토큰 만료
    if (e instanceof Error) {
      // console.error(
      //   `[reqID: ${reqId}] Refresh token failed: ${e.message}(Error Code:${e.name || 'UNKNOWN'}) `,
      // );
      // const data = await axios.get(`${API_BASE_URL}${AUTH_LOGOUT}`);
      return Promise.reject(new Error(`Refresh token failed: `));
    } else {
      //console.error(`[reqId: $[reqId]] AN unknown error occured.`);
      return Promise.reject(new Error('AN unkown error occured.'));
    }
  }
};
export default instance;
