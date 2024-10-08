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
    <div>
      <div className='w-full h-[256px]'></div>
      <div className='flex flex-row w-[1800px]'>
        {/* current issue */}
        <div className='mt-[23px] w-[1440px] pl-[52px]'>
          <div className='text-[35px] cursor-pointer'>Current Issue</div>
          <div className=' mt-[15px] flex '>
            <div className='w-[540px] h-[337px] bg-gray-200 rounded-lg'></div>
            <div className='w-[790px] ml-[54px]'>
              <p className='w-[760px] text-[30px] line-clamp-2'>
                test1 test1test1test1test1test1test1test1test1a
              </p>
              <div className='w-[760px] text-[20px] mt-5'>
                test1test1test1test1test1test1test1test1
              </div>
            </div>
          </div>
          <div className='flex flex-row pl-[12px] py-[64px] gap-[50px]'>
            <div className='w-[410px] h-[337px] bg-gray-200 rounded-lg'></div>
            <div className='w-[410px] h-[337px] bg-gray-200 rounded-lg'></div>
            <div className='w-[410px] h-[337px] bg-gray-200 rounded-lg'></div>
          </div>
        </div>
        <div className='flex w-[360px]  p-1'>
          <div className='w-full  border border-black'>
            <div className='flex justify-center mt-[38px] text-[27px]'>
              <p>Recconmend</p>
            </div>
            <div className='px-[29px] mt-9'>
              <div className='pb-8'>
                <div className='flex flex-row text-[20px]'>
                  <div> 1.</div>
                  <div className='ml-3'>
                    I tracked every single task for 30 days.
                  </div>
                </div>
                <div className='mt-2 text-[12px]'>- Nathaniel Drew</div>
              </div>
              <div className='pb-8'>
                <div className='flex flex-row text-[20px]'>
                  <div> 2.</div>
                  <div className='ml-3'>
                    I tracked every single task for 30 days.
                  </div>
                </div>
                <div className='mt-2 text-[12px]'>- Jordan peterson</div>
              </div>
              <div className='pb-8'>
                <div className='flex flex-row text-[20px]'>
                  <div> 3.</div>
                  <div className='ml-3'>
                    I tracked every single task for 30 days.
                  </div>
                </div>
                <div className='mt-2 text-[12px]'>- Nathaniel Drew</div>
              </div>
              <div className='pb-8'>
                <div className='flex flex-row text-[20px]'>
                  <div> 4.</div>
                  <div className='ml-3'>
                    I tracked every single task for 30 days.
                  </div>
                </div>
                <div className='mt-2 text-[12px]'>- Jordan peterson</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-center w-full h-full bg-white '>
        <div className='flex flex-col w-[1440px]   '>
          <div className='w-full h-1 border-black border-2'></div>
          <div className='w-full px-[67px] pb-[64px] pt-[14px]'>
            <div
              onClick={() => {
                router.push(`/categories/youtube`);
              }}
              className='text-[25px] cursor-pointer'
            >
              Youtube
            </div>
            <div className='flex gap-[49px] w-full mt-[14px] '>
              {data &&
                data.youtube.map((item: any) => (
                  <div
                    onClick={() => {
                      router.push(`/post/${item.id}`);
                    }}
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
              className='text-[25px] cursor-pointer'
            >
              Alcoholism
            </div>
            <div className='flex gap-[49px] w-full mt-[14px] '>
              {data &&
                data.alcoholism.map((item: any) => (
                  <div
                    onClick={() => {
                      router.push(`/post/${item.id}`);
                    }}
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
              className='text-[25px] cursor-pointer'
            >
              Game
            </div>
            <div className='flex gap-[49px] w-full mt-[14px] '>
              {data &&
                data.game.map((item: any) => (
                  <div
                    onClick={() => {
                      router.push(`/post/${item.id}`);
                    }}
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
    </div>
  );
}

export default MainPage;
