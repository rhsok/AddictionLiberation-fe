'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(256); // 초기 헤더 높이 설정
  const router = useRouter();
  const handleScroll = () => {
    if (window.scrollY > 150) {
      setHeaderHeight(50); // 스크롤 100픽셀 이상일 때 헤더 높이 반으로 줄이기
    } else {
      setHeaderHeight(256); // 원래 높이로 되돌리기
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{ height: `${headerHeight}px` }}
      className='fixed flex flex-col items-center w-full   bg-[#32B67A]  z-10 '
    >
      <div
        onClick={() => {
          router.push('/auth/login');
        }}
        className='absolute top-3 right-10 text-white'
      >
        login
      </div>
      {headerHeight === 256 ? (
        <>
          <div
            onClick={() => {
              router.push('/main');
            }}
            className={` text-[70px] text-white mt-[22px]  `}
          >
            Addiction liberation journal
          </div>
          <p className='mt-[33px]'>
            The first step in overcoming an addiction is to recognize that it
            exists
          </p>
        </>
      ) : (
        <>
          <div
            onClick={() => {
              router.push('/main');
            }}
            className={` text-[30px] text-white  cursor-pointer z-10 `}
          >
            Addiction liberation journal
          </div>
        </>
      )}

      <div
        className={`w-[1440px] ${
          headerHeight ? 'absolute bottom-0 ' : ''
        } flex gap-5 text-white text-[25px]`}
      >
        <div className='mt-1'>
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

        {/* <button onClick={toggleMenu}>Categories</button> */}
      </div>
      {isOpen && (
        <>
          <div
            style={{ top: `${headerHeight}px` }}
            className='fixed w-full  flex justify-center bg-green-100 '
          >
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

export default Header;
