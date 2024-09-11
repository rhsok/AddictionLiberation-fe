export const decodeJWT = (token: string) => {
  const base64Url = token.split('.')[1]; // JWT의 두 번째 부분 (Payload)를 가져옵니다.
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  const decoded = JSON.parse(jsonPayload);
  return decoded;
};
