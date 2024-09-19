import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { API_BASE_URL, AUTH_REFRESH } from '@/constants/api';
//import https from 'https';
// import fs from 'fs';

// 응답 데이터 타입 정의
interface AuthResponse {
  token: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  const refreshToken = req.cookies.get('jwt')?.value;
  //console.log('jwt', refreshToken);
  //console.log('rf', refreshToken);
  // const agent = new https.Agent({
  //   ca: fs.readFileSync('/etc/ssl/certs/nginx-selfsigned.crt'), // 인증서 검증을 무시
  // });
  if (!refreshToken) {
    /**리프레시 토큰 소실 */
    const data = 'Refresh Token is missing';
    return NextResponse.json({ data }, { status: 401 });
  }
  try {
    const response = await axios.post<AuthResponse>(
      `${API_BASE_URL}${AUTH_REFRESH}`,
      '',
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
        // httpsAgent: agent,
      }
    );
    console.log('res', response);
    const { token } = response.data;
    return NextResponse.json({ token });
  } catch (error) {
    /**리프레시 토큰 기간 만료 */
    const data = 'Refresh Token is unavailable';
    //console.log(error);
    return NextResponse.json({ data }, { status: 403 });
  }
}
