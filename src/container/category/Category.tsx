'use client';
import { getCategory } from '@/services/category/catagory.api';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CategoryProps {
  params: { categoryId: string };
}

const Category: React.FC<CategoryProps> = ({ params }) => {
  const [title, setTitle] = useState<string>('');
  const [selectedCategoryData, setSelectedCategoryData] = useState<any>();
  const router = useRouter();

  const switchTitleToId = (id: string) => {
    switch (id) {
      case 'youtube':
        return '1';
      case 'alcholism':
        return '2';
      case 'game':
        return '3';
    }
  };

  const switchTitle = (id: string) => {
    switch (id) {
      case 'youtube':
        return 'YOUTUBE ADDICTION';
      case 'alcholism':
        return 'ALCHOLSIM';
      case 'game':
        return 'GAME ADDICTION';
    }
  };

  useEffect(() => {
    const id = switchTitleToId(params.categoryId);
    const data = switchTitle(params.categoryId);
    console.log('id', id);

    setTitle(data || '');
    const getCategoryPost = async () => {
      try {
        if (!id) return;
        const resData = await getCategory(id);
        console.log('resData', resData);
        setSelectedCategoryData(resData);
      } catch (error) {}
    };
    getCategoryPost();
  }, [params]);

  useEffect(() => {
    console.log(
      'selectedCategoryData?.main[0].videoUrl',
      selectedCategoryData?.main[0].videoUrl
    );
  }, [selectedCategoryData]);

  return (
    <div className='flex flex-col items-center'>
      <div className='w-[1580px] px-[46px] '>
        <div className='pb-[60px]'>
          <p className='mt-[29px] text-[35px]'>{title}</p>
          <div className='w-full h-[2px] border border-[#D9D9D9]' />
          <div className='flex'>
            <div className='shrink-0 w-[1045px] pt-[29px]'>
              <div
                // dangerouslySetInnerHTML={{
                //   __html: selectedCategoryData?.main[0].videoUrl,
                // }}
                className='w-full h-[583px] border '
              ></div>
              <div
                onClick={() => {
                  router.push(`/post/${selectedCategoryData?.main[0].id}`);
                }}
                className='mt-[38px] text-[40px] font-bold line-clamp-2'
              >
                {selectedCategoryData?.main[0].title}
              </div>
              <div className='flex flex-row mt-[49px] gap-[53px] '>
                {selectedCategoryData?.main.slice(1).map((item: any) => (
                  <div className='w-[310px]' key={item.id}>
                    <div className=' h-[190px] border'></div>
                    <div
                      onClick={() => {
                        router.push(`/post/${item.id}`);
                      }}
                      className='mt-5 text-[20px] font-bold line-clamp-2'
                    >
                      {item.title}
                    </div>
                    {/* <div className='mt-5 text-[17px] line-clamp-2'>
                      {item.subtitle}
                    </div> */}
                  </div>
                ))}
              </div>
            </div>
            <div className='relative w-[565px]  pt-[29px] '>
              <div className='absolute right-0 flex items-center justify-center w-[378px] h-full border  bg-gray-300  text-[50px] font-bold'>
                AD
              </div>
            </div>
          </div>
        </div>
        <div className='w-full my-5 h-[2px] border border-[#D9D9D9]' />
        <div className='w-[1045px] mt-[69px] pb-10 flex flex-col gap-[46px]'>
          {selectedCategoryData?.normal.map((item: any) => (
            <div
              onClick={() => {
                router.push(`/post/${item.id}`);
              }}
              key={item.id}
              className='flex flex-row '
            >
              <div className='w-[328px] h-[190px] border bg-gray-200 shrink-0 '></div>
              <div className='ml-[46px] flex flex-col'>
                <div className='text-[25px] font-bold'>{item.title}</div>
                <div className='mt-[40px] text-[17px]'>{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
