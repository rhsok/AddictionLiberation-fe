'use client';
import { getPostById } from '@/services/post/post.api';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface PostProps {
  params: { postId: string };
}

const Post = ({ params }: PostProps) => {
  const [postdata, setPostData] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const resData = await getPostById(params.postId);
        console.log('res', resData);
        setPostData(resData);
      } catch (error) {}
    };
    fetchPost();
  }, [params]);

  useEffect(() => {
    console.log('postdata', postdata);
  }, [postdata]);

  return (
    <div className='flex justify-center'>
      <div className='relative w-[1580px]  min-h-[1000px]  '>
        <div className='flex flex-col items-center justify-center w-full mt-[70px] min-h-[112px]'>
          <p className='w-[840px] text-[45px] text-center line-clamp-2 '>
            {postdata && postdata.title}
          </p>
          <p className='w-[840px] text-[10px] text-center line-clamp-2 '>
            {postdata && postdata.publishedDate}
          </p>
          <p className='w-[840px] text-[20px] text-center text-gray-500 '>
            {postdata && postdata.subtitle}
          </p>
        </div>
        <div className='absolute flex gap-4 top-[150px] right-[190px] '>
          <button
            onClick={() => {
              router.push(`/postEdit/${params.postId}`);
            }}
            className='border border-black p-2 px-4 cursor-pointer rounded-lg bg-gray-300 hover:bg-gray-100 focus:bg-gray-200'
          >
            수정
          </button>
          <button className='border border-black p-2 px-4 cursor-pointer rounded-lg hover:bg-gray-100 focus:bg-gray-200'>
            삭제
          </button>
        </div>
        <div className='w-full flex flex-row justify-center py-10 gap-5'>
          <div
            dangerouslySetInnerHTML={{ __html: postdata?.content }}
            className='w-[800px] min-h-[700px] shrink-0 border py-10 px-5'
          ></div>
          <div className='w-[300px] shrink-0 border'></div>
        </div>
      </div>
    </div>
  );
};

export default Post;
