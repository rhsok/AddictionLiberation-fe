/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000', // 포트도 함께 명시해야 합니다.
        pathname: '/api/posts/images/**', // 경로를 세부적으로 지정할 수 있습니다.
      },
    ],
  },
};

export default nextConfig;
