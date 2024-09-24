'use client';
import { getPostById } from '@/services/post/post.api';
import React, { useEffect, useState } from 'react';

interface PostProps {
  params: { postId: string };
}

const Post = ({ params }: PostProps) => {
  const [postdata, setPostData] = useState<any>();

  useEffect(() => {
    console.log('params', params);
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
      <div className=' w-[1580px]  min-h-[1000px] '>
        <div className='flex flex-col items-center justify-center w-full mt-[70px]'>
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
        <div className='w-full flex flex-row justify-center py-10 gap-5'>
          <div
            dangerouslySetInnerHTML={{ __html: postdata?.content }}
            className='w-[800px] min-h-[700px] shrink-0 border'
          ></div>
          <div className='w-[300px] shrink-0 border'></div>
        </div>
      </div>
    </div>
  );
};

export default Post;
