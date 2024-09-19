'use client';
import { loginUser } from '@/services/auth/auth.api';
import userStore from '@/states/userStore/userStore';
import { decodeJWT } from '@/utils/decodeJWT';
import loginSchema, { loginSchemaType } from '@/utils/zod/auth/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { setCookie } from 'nookies';

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const { setAccessToken, setUser, user } = userStore();

  const onSubmit = async (data: loginSchemaType) => {
    try {
      const resData = await loginUser(data);
      setAccessToken(resData.token);
      const decodedJWT = decodeJWT(resData.accessToken);
      setUser({
        id: decodedJWT.id,
        email: decodedJWT.email,
        name: decodedJWT.name,
        scope: decodedJWT.scope,
        iat: decodedJWT.iat,
        exp: decodedJWT.exp,
      });
      setCookie(null, 'jwt', resData.refreshToken, {
        maxAge: 24 * 60 * 60,
        path: '/',
      });
      alert('로그인 완료');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data === 'Invaild credentials.')
          return alert('비밀번호가 일치하지 않습니다.');
        console.log('error', error);
        alert('잘못된 요청입니다.');
      }
    }
  };

  useEffect(() => {
    console.log('user', user);
  }, [user]);

  return (
    <div className={`flex mx-auto w-[1440px]  s flex-grow`}>
      <div className='mx-auto mt-[144px] mb-[168px] w-[623px] h-[756px] bg-white border border-black'>
        <div className='mt-[87px] text-[50px]'>
          <p className='text-center'>Log In</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col items-center mt-[87px]'
        >
          <div className='w-[571px]  mt-[14px] pl-[17px]'>
            <p>email</p>
            <input
              {...register('email')}
              className={`border mt-1 border-black w-[540px] h-[42px] rounded-[7px] pl-2 ${
                errors.email?.message
                  ? 'border border-red-500'
                  : 'border-black '
              }`}
            />
            {errors && (
              <p
                className={` my-3 ${
                  errors.email?.message ? 'text-red-500' : ''
                }`}
              >
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className='w-[571px]  mt-[14px] pl-[17px]'>
            <p>비밀번호</p>
            <input
              type='password'
              {...register('password')}
              className={`border mt-1 border-black w-[540px] h-[42px] rounded-[7px] pl-2 ${
                errors.password?.message
                  ? 'border border-red-500'
                  : 'border-black '
              }`}
            />
            {errors && (
              <p
                className={` my-3 ${
                  errors.password?.message ? 'text-red-500' : ''
                }`}
              >
                {errors.password?.message}
              </p>
            )}
          </div>
          <div className='flex flex-row justify-center  mt-[146px] '>
            <button className='w-[193px] h-[47px] text-center border border-black rounded-[7px] '>
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
