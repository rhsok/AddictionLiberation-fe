'use client';
import { getPostById, softDelteById } from '@/services/post/post.api';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import postStore from '@/states/postStore/postStore';
import ModalPortal from '@/components/Modal/ModalPortal';
import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal';

interface PostProps {
  params: { postId: string };
}

const Post = ({ params }: PostProps) => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [postdata, setPostData] = useState<any>();
  const router = useRouter();
  const { setPost, post } = postStore();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const resData = await getPostById(params.postId);
        // console.log('res', resData);
        setPostData(resData);
        setPost(resData);
      } catch (error) {}
    };
    fetchPost();
  }, [params]);

  useEffect(() => {
    // console.log('post', post);
  }, [post]);

  const handleDeleteSubmit = async () => {
    try {
      const resData = await softDelteById(params.postId);
      alert('삭제완료');
      router.push('/main');
      // console.log('resData', resData);
    } catch (error) {
      console.log('error', error);
    }
  };

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit', // 월을 숫자로 표시
      day: '2-digit', // 일자를 두 자리로 표시
      hour: '2-digit', // 시간을 두 자리로 표시
      minute: '2-digit', // 분을 두 자리로 표시
    });
  };

  return (
    <div className='flex justify-center'>
      <div className='relative w-[1580px]  min-h-[1000px]  '>
        <div className='flex flex-col items-center justify-center w-full mt-[70px] min-h-[112px]'>
          <p className='w-[840px] text-[45px] text-center line-clamp-2 '>
            {postdata && postdata.title}
          </p>
          <p className='w-[840px] text-[10px] text-center line-clamp-2 '>
            {postdata && formatDateTime(postdata.publishedDate)}
          </p>
          <p className='w-[840px] text-[20px] text-center text-gray-500 '>
            {postdata && postdata.subtitle}
          </p>
        </div>
        <div className='absolute flex gap-4 top-[150px] right-[230px] '>
          <button
            onClick={() => {
              router.push(`/postEdit/${params.postId}`);
            }}
            className='border border-black p-2 px-4 cursor-pointer rounded-lg  hover:bg-gray-100 focus:bg-gray-200'
          >
            수정
          </button>
          <button
            onClick={() => {
              setIsModalActive(true);
            }}
            className='border border-black p-2 px-4 cursor-pointer rounded-lg hover:bg-gray-100 focus:bg-gray-200'
          >
            삭제
          </button>
          {isModalActive && (
            <ModalPortal>
              <ConfirmModal
                submitFunction={handleDeleteSubmit}
                setIsModalActive={setIsModalActive}
              />
            </ModalPortal>
          )}
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
