'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import signupSchema from '@/utils/zod/auth/singupSchema';
import { zodResolver } from '@hookform/resolvers/zod';

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <div className={`flex mx-auto w-[1440px]  s flex-grow`}>
      <div className='mx-auto mt-[144px] mb-[168px] w-[683px] h-[728px] bg-white border border-black'>
        <div className='mt-[87px] text-[50px]'>
          <p className='text-center'>Sign Up</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col items-center mt-[27px]'
        >
          <div className='w-[571px] h-[76px] pl-[17px]'>
            <p>이름</p>
            <input
              {...register('name')}
              className=' border mt-1 border-black w-[540px] h-[42px] rounded-[7px]'
            />
          </div>
          <div className='w-[571px] h-[76px] mt-[14px] pl-[17px]'>
            <p>아이디</p>
            <input
              {...register('Id')}
              className='border mt-1 border-black w-[540px] h-[42px] rounded-[7px]'
            />
          </div>
          <div className='w-[571px] h-[76px] mt-[14px] pl-[17px]'>
            <p>비밀번호</p>
            <input
              {...register('password')}
              className='border mt-1 border-black w-[540px] h-[42px] rounded-[7px]'
            />
          </div>
          <div className='w-[571px] h-[76px] mt-[14px] pl-[17px]'>
            <p>비밀번호 확인</p>
            <input
              {...register('passwordConfirm')}
              className='border mt-1 border-black w-[540px] h-[42px] rounded-[7px]'
            />
          </div>
        </form>
        <div className='flex flex-row justify-center gap-[108px] mt-[76px] '>
          <button className='w-[193px] h-[47px] text-center border border-black rounded-[7px] '>
            확 인
          </button>
          <button className='w-[193px] h-[47px] text-center border border-black rounded-[7px]'>
            취 소
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
