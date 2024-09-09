'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import signupSchema, { signupSchemaType } from '@/utils/zod/auth/singupSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupUser } from '@/services/auth/auth.api';
import { AxiosError } from 'axios';

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<signupSchemaType>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: signupSchemaType) => {
    try {
      const resData = await signupUser(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 500) return alert('이미 가입된 계정입니다.');
        console.log('error', error);
        alert('잘못된 요청입니다.');
      }
    }
  };

  return (
    <div className={`flex mx-auto w-[1440px]  flex-grow`}>
      <div className='mx-auto mt-[144px] mb-[168px] w-[683px]  bg-white border border-black rounded-xl'>
        <div className='mt-[47px] text-[50px]'>
          <p className='text-center'>Sign Up</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col items-center mt-[27px]'
        >
          <div className=' w-[571px]  pl-[17px]'>
            <p>이름</p>
            <input
              {...register('username')}
              className={`border mt-1 w-[540px] h-[42px] rounded-[7px] pl-2 ${
                errors.username?.message
                  ? 'border border-red-500'
                  : 'border-black '
              }`}
            />
            {errors && (
              <p
                className={` my-3 ${
                  errors.username?.message ? 'text-red-500' : ''
                }`}
              >
                {errors.username?.message}
              </p>
            )}
          </div>

          <div className='w-[571px] mt-[14px] pl-[17px]'>
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
          <div className='w-[571px] h-[76px] mt-[14px] pl-[17px]'>
            <p>비밀번호 확인</p>
            <input
              type='password'
              {...register('passwordConfirm')}
              className={`border mt-1 border-black w-[540px] h-[42px] rounded-[7px] pl-2 ${
                errors.passwordConfirm?.message
                  ? 'border border-red-500'
                  : 'border-black '
              }`}
            />
            {errors && (
              <p
                className={` my-3 ${
                  errors.passwordConfirm?.message ? 'text-red-500' : ''
                }`}
              >
                {errors.passwordConfirm?.message}
              </p>
            )}
          </div>
          <div className='flex flex-row justify-center gap-[108px] my-[86px] '>
            <button className='w-[193px] h-[47px] text-center border border-black rounded-[7px] '>
              확 인
            </button>
            <button className='w-[193px] h-[47px] text-center border border-black rounded-[7px]'>
              취 소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
