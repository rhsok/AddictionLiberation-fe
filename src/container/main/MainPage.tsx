'use client';
import { getMainPost } from '@/services/post/post.api';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import userStore from '@/states/userStore/userStore';

function MainPage() {
  const [data, setData] = useState<any>({
    main: [],
    youtube: [],
    game: [],
    alcoholism: [],
    gambling: [],
    drug: [],
    porn: [],
  });
  const router = useRouter();
  const { user } = userStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await getMainPost();
        console.log(resData, resData);
        const newData = {
          main: resData?.[1] || [],
          youtube: resData?.[2] || [],
          game: resData?.[3] || [],
          alcoholism: resData?.[4] || [],
          gambling: resData?.[5] || [],
          drug: resData?.[6] || [],
          porn: resData?.[7] || [],
        };
        setData(newData);
      } catch (error) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  useEffect(() => {
    console.log('user2', user);
  }, [user]);

  if (data.main.length === 0)
    return (
      <div className='inset-0 flex items-center justify-center'>
        <div> 데이터를 불러올 수 없습니다.</div>
      </div>
    );

  return (
    <div>
      <div className='w-full h-[256px]'></div>
      <div className='flex flex-row w-[1784px]'>
        {/* current issue */}
        <div className=' mt-[23px] w-[1440px] pl-[52px]'>
          <div
            onClick={() => {
              router.push(`/categories/aboutAddiction`);
            }}
            className='text-[35px] cursor-pointer font-bold'
          >
            About Addiction
          </div>
          <div className=' mt-[15px] flex '>
            <div className='w-[540px] h-[337px] bg-gray-200 rounded-lg  '>
              <img
                onClick={() => {
                  router.push(`/post/${data?.main[0].id}`);
                }}
                src={data?.main[0].thumbnailImageURL || ''}
                alt=''
                className='w-full h-full rounded-lg cursor-pointer'
              />
            </div>
            <div className='w-[790px] ml-[54px]'>
              <p
                onClick={() => {
                  router.push(`/post/${data?.main[0].id}`);
                }}
                className='w-[760px] text-[30px] line-clamp-2 mt-10 cursor-pointer font-bold'
              >
                {data?.main[0].title}
              </p>
              <div
                onClick={() => {
                  router.push(`/post/${data?.main[0].id}`);
                }}
                className='w-[760px] text-[20px] mt-5 cursor-pointer'
              >
                {data?.main[0].subtitle}
              </div>
            </div>
          </div>
          <div className='flex flex-row pl-[12px] py-[64px] gap-[50px]'>
            {data?.main.slice(1).map((item: any) => (
              <div
                key={item.id}
                className='w-[410px] h-[337px] px-[24px] py-[16px]'
              >
                <div className='w-full'>
                  <div
                    className='h-[202px] '
                    onClick={() => {
                      router.push(`${item.id}`);
                    }}
                  >
                    <img
                      src={item.thumbnailImageURL || ''}
                      alt=''
                      className='w-full h-full cursor-pointer'
                    />
                  </div>
                  <p
                    onClick={() => {
                      router.push(`${item.id}`);
                    }}
                    className=' mt-3 line-clamp-2 text-[20px]  cursor-pointer font-bold	'
                  >
                    {item.title}
                  </p>
                  <p
                    onClick={() => {
                      router.push(`${item.id}`);
                    }}
                    className='mt-1 line-clamp-2 cursor-pointer'
                  >
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className='flex w-[360px]  p-1'>
          <div className='w-full  border border-black'>
            <div className='flex justify-center mt-[38px] text-[27px]'>
              <p>Recconmend</p>
            </div>
            <div className='px-[29px] mt-9'>
              <div className='pb-8'>
                <div className='flex flex-row text-[18px]'>
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
        </div> */}
      </div>

      <div className='flex justify-center w-full h-full bg-white '>
        <div className='flex flex-col w-[1440px]   '>
          <div className='w-full h-1 mt-10 border-black border-2'></div>
          <div className='w-full px-[67px] pb-[64px] pt-[14px]'>
            <div
              onClick={() => {
                router.push(`/categories/youtube`);
              }}
              className='text-[25px] cursor-pointer font-bold'
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
                    className='w-1/3 h-[337px] px-[24px] py-[16px] border'
                  >
                    <div className='w-[360px] '>
                      <div className='h-[202px] bg-gray-200'>
                        <img
                          src={item.thumbnailImageURL || ''}
                          alt=''
                          className='w-full h-full cursor-pointer'
                        />
                      </div>
                      <p className='text-[18px] mt-3 line-clamp-2	cursor-pointer font-bold '>
                        {item.title}
                      </p>
                      <p className='mt-1 line-clamp-2 cursor-pointer'>
                        {item.subtitle}
                      </p>
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
              className='text-[25px] cursor-pointer font-bold'
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
                      <div className='h-[202px] bg-gray-200 cursor-pointer'>
                        <img
                          src={item.thumbnailImageURL || ''}
                          alt=''
                          className='w-full h-full cursor-pointer'
                        />
                      </div>
                      <p className='text-[18px] mt-3 line-clamp-2	cursor-pointer font-bold'>
                        {item.title}
                      </p>
                      <p className='mt-1 line-clamp-2 cursor-pointer'>
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className='w-full h-1 border-black border-2'></div>
          <div className='w-full px-[67px] pb-[64px] pt-[14px]'>
            <div
              onClick={() => {
                router.push(`/categories/alcoholism`);
              }}
              className='text-[25px] cursor-pointer font-bold'
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
                    className='w-1/3 h-[337px] px-[24px] py-[16px] border'
                  >
                    <div className='w-[360px] '>
                      <div className='h-[202px] bg-gray-200'>
                        <img
                          src={item.thumbnailImageURL || ''}
                          alt=''
                          className='w-full h-full cursor-pointer'
                        />
                      </div>
                      <p className='text-[18px] mt-3 line-clamp-2 font-bold	'>
                        {item.title}
                      </p>
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
                router.push(`/categories/gambling`);
              }}
              className='text-[25px] cursor-pointer font-bold'
            >
              Gambling
            </div>
            <div className='flex gap-[49px] w-full mt-[14px] '>
              {data &&
                data.gambling.map((item: any) => (
                  <div
                    onClick={() => {
                      router.push(`/post/${item.id}`);
                    }}
                    key={item.id}
                    className='w-1/3 h-[337px] px-[24px] py-[16px] border'
                  >
                    <div className='w-[360px] '>
                      <div className='h-[202px] bg-gray-200'>
                        <img
                          src={item.thumbnailImageURL || ''}
                          alt=''
                          className='w-full h-full cursor-pointer'
                        />
                      </div>
                      <p className=' mt-3 line-clamp-2	font-bold'>
                        {item.title}
                      </p>
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
                router.push(`/categories/drug`);
              }}
              className='text-[25px] cursor-pointer font-bold'
            >
              Drug
            </div>
            <div className='flex gap-[49px] w-full mt-[14px] '>
              {data &&
                data.drug.map((item: any) => (
                  <div
                    onClick={() => {
                      router.push(`/post/${item.id}`);
                    }}
                    key={item.id}
                    className='w-1/3 h-[337px] px-[24px] py-[16px] border'
                  >
                    <div className='w-[360px] '>
                      <div className='h-[202px] bg-gray-200'>
                        <img
                          src={item.thumbnailImageURL || ''}
                          alt=''
                          className='w-full h-full cursor-pointer'
                        />
                      </div>
                      <p className='text-[18px] mt-3 line-clamp-2 font-bold	'>
                        {item.title}
                      </p>
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
                router.push(`/categories/porn`);
              }}
              className='text-[25px] cursor-pointer font-bold'
            >
              Pron
            </div>
            <div className='flex gap-[49px] w-full mt-[14px] '>
              {data &&
                data.porn.map((item: any) => (
                  <div
                    onClick={() => {
                      router.push(`/post/${item.id}`);
                    }}
                    key={item.id}
                    className='w-1/3 h-[337px] px-[24px] py-[16px] border'
                  >
                    <div className='w-[360px] '>
                      <div className='h-[202px] bg-gray-200'>
                        <img
                          src={item.thumbnailImageURL || ''}
                          alt=''
                          className='w-full h-full cursor-pointer'
                        />
                      </div>
                      <p className='text-[18px] mt-3 line-clamp-2 font-bold	'>
                        {item.title}
                      </p>
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
