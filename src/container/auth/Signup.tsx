import React from 'react';

function Signup() {
  return (
    <div className={`flex mx-auto w-[1440px]  s flex-grow`}>
      <div className='mx-auto mt-[144px] mb-[168px] w-[683px] h-[728px] bg-white border border-black'>
        <div className='mt-[87px] text-[50px]'>
          <p className='text-center'>Sign Up</p>
        </div>
        <div className='flex flex-col items-center mt-[27px]'>
          <div className='w-[571px] h-[76px] pl-[17px]'>
            <p>이름</p>
            <input className=' border mt-1 border-black w-[540px] h-[42px] rounded-[7px]' />
          </div>
          <div className='w-[571px] h-[76px] mt-[14px] pl-[17px]'>
            <p>아이디</p>
            <input className='border mt-1 border-black w-[540px] h-[42px] rounded-[7px]' />
          </div>
          <div className='w-[571px] h-[76px] mt-[14px] pl-[17px]'>
            <p>비밀번호</p>
            <input className='border mt-1 border-black w-[540px] h-[42px] rounded-[7px]' />
          </div>
          <div className='w-[571px] h-[76px] mt-[14px] pl-[17px]'>
            <p>비밀번호 확인</p>
            <input className='border mt-1 border-black w-[540px] h-[42px] rounded-[7px]' />
          </div>
        </div>
        <div className='flex flex-row justify-center gap-[108px] mt-[46px] '>
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
