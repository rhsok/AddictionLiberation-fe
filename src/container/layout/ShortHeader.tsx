'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function ShortHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const router = useRouter();

  return (
    <div className='fixed flex flex-col items-center w-full h-[50px]   bg-[#32B67A]  z-10'>
      <div
        onClick={() => {
          router.push('/main');
        }}
        className={` text-[30px] text-white mt-[0px] cursor-pointer z-10 `}
      >
        Addiction liberation journal
      </div>
      <div className='w-[1440px] absolute bottom-1 flex gap-5 text-white text-[25px]'>
        <div className=''>
          <button
            onClick={toggleMenu}
            className='flex flex-col w-6 h-6 mb-2 text-white  rounded-md focus:outline-none'
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
        <>
          {/* <Link href=''>News</Link> */}
          {/* <Link href=''>Categories</Link> */}
        </>
      </div>
      {isOpen && (
        <>
          <div className='fixed w-full top-[50px]  flex justify-center bg-green-100 '>
            <div className='flex gap-10 w-[1440px] py-5 text-[21px]  text-green-500 '>
              <div
                onClick={() => {
                  router.push('/categories/youtube');
                }}
                className='cursor-pointer hover:text-white '
              >
                Youtube
              </div>
              <div
                onClick={() => {
                  router.push('/categories/alcholism');
                }}
                className='cursor-pointer hover:text-white'
              >
                Alcholism
              </div>
              <div
                onClick={() => {
                  router.push('/categories/game');
                }}
                className='cursor-pointer hover:text-white'
              >
                Game
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ShortHeader;
