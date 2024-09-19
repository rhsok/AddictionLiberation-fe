'use client';
import Link from 'next/link';
import React, { useState } from 'react';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative flex flex-col items-center w-full  h-[256px] bg-[#32B67A] '>
      <div className={` text-[70px] text-white mt-[22px] `}>
        Addiction liberation journal
      </div>
      <p className='mt-[33px]'>
        The first step in overcoming an addiction is to recognize that it exists
      </p>
      <div className='w-[1440px] absolute bottom-0 flex gap-5 text-white text-[25px]'>
        <div className='mt-1'>
          <button
            onClick={toggleMenu}
            className='flex flex-col w-6 h-6 text-white  rounded-md focus:outline-none'
          >
            <span
              className={`block w-full h-0.5 bg-white transition-transform duration-300 ${
                isOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            ></span>
            <span
              className={`block w-full h-0.5 mt-1 bg-white transition-opacity duration-300 ${
                isOpen ? 'opacity-0' : 'opacity-100 mt-2 '
              }`}
            ></span>
            <span
              className={`block w-full h-0.5 bg-white transition-transform duration-300 ${
                isOpen ? '-rotate-45 -translate-y-1.5 mt-1' : 'mt-2'
              }`}
            ></span>
          </button>
        </div>
        <Link href=''>News</Link>
        <Link href=''>Categories</Link>
      </div>
    </div>
  );
}

export default Header;
