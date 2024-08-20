import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <div className='relative flex flex-col items-center w-full  h-[256px] bg-[#32B67A] '>
      <div className={` text-[70px] text-white mt-[22px] `}>
        Addiction liberation journal
      </div>
      <p className='mt-[33px]'>
        The first step in overcoming an addiction is to recognize that it exists
      </p>
      <div className='w-[1440px] absolute bottom-0 flex gap-5 text-white text-[25px]'>
        <div>햄버거</div>
        <Link href=''>News</Link>
        <Link href=''>Categories</Link>
      </div>
    </div>
  );
}

export default Header;
