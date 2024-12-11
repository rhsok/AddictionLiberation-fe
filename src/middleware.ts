// import { NextRequest, NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('jwt');
//   console.log('middlewarer', token);

//   if (request.nextUrl.pathname === '/write' && !token) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   if (request.nextUrl.pathname === '/auth/login' && token) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   // try {
//   //   jwt.verify(token, process.env.JWT_SECRET);
//   //   return NextResponse.next();
//   // } catch (error) {
//   //   return NextResponse.redirect(new URL('/login', request.url));
//   // }
// }

// // 특정 경로에 대해 미들웨어를 적용
// export const config = {
//   matcher: ['/write', '/auth/login'], // 모든 API 경로에 미들웨어 적용
// };
