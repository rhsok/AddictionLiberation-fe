'use client';
import { getMainPost } from '@/services/post/post.api';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function MainPage() {
  const [data, setData] = useState<any>();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await getMainPost();
        const newData = {
          youtube: resData?.[1],
          alcoholism: resData?.[2],
          game: resData?.[3],
        };
        setData(newData);
      } catch (error) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('data', data?.youtube);
  }, [data]);

  return (
    <div className='flex justify-center w-full h-full bg-white '>
      {/* <div className='flex flex-row w-[1440px] h-full border'>
        <div className='flex  w-full mt-10'>
          <div className='w-[300px] h-[400px] bg-zinc-600'></div>
          <div className='w-[600px] h-[400px]'></div>
        </div>
        <div className='w-[315px] h-[932px] border border-black'></div>
      </div> */}
      <div className='flex flex-col w-[1440px]   '>
        <div className='w-full h-[256px]'></div>
        <div className='w-full px-[67px] pb-[64px] pt-[14px]'>
          <div
            onClick={() => {
              router.push(`/categories/youtube`);
            }}
            className='text-[25px]'
          >
            Youtube
          </div>
          <div className='flex gap-[49px] w-full mt-[14px] '>
            {data &&
              data.youtube.map((item: any) => (
                <div
                  key={item.id}
                  className='w-1/3 h-[337px] px-[24px] pt-[16px] border'
                >
                  <div className='w-[360px] '>
                    <div className='h-[202px] bg-gray-200'></div>
                    <p className=' mt-3 line-clamp-2	'>{item.title}</p>
                    <p className='mt-1 line-clamp-2'>{item.subtitle}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className='w-full h-1 border-black border-2'></div>
        <div className='w-full px-[67px] pb-[64px] pt-[14px]'>
          <div
            onClick={() => {
              router.push(`/categories/alcholism`);
            }}
            className='text-[25px]'
          >
            Alcoholism
          </div>
          <div className='flex gap-[49px] w-full mt-[14px] '>
            {data &&
              data.alcoholism.map((item: any) => (
                <div
                  key={item.id}
                  className='w-1/3 h-[337px] px-[24px] pt-[16px] border'
                >
                  <div className='w-[360px] '>
                    <div className='h-[202px] bg-gray-200'></div>
                    <p className=' mt-3 line-clamp-2	'>{item.title}</p>
                    <p className='mt-1 line-clamp-2'>{item.subtitle}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className='w-full h-1 border-black border-2'></div>
        <div className='w-full px-[67px] pb-[64px] pt-[14px]'>
          <div
            onClick={() => {
              router.push(`/categories/game`);
            }}
            className='text-[25px]'
          >
            Game
          </div>
          <div className='flex gap-[49px] w-full mt-[14px] '>
            {data &&
              data.game.map((item: any) => (
                <div
                  key={item.id}
                  className='w-1/3 h-[337px] px-[24px] pt-[16px] border'
                >
                  <div className='w-[360px] '>
                    <div className='h-[202px] bg-gray-200'></div>
                    <p className=' mt-3 line-clamp-2	'>{item.title}</p>
                    <p className='mt-1 line-clamp-2'>{item.subtitle}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
