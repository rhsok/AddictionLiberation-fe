'use client';
import React, { useEffect, useRef } from 'react';

function Post() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const subTextareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      // Reset height to auto to calculate the correct scrollHeight
      textareaRef.current.style.height = 'auto';
      // Set the height based on scrollHeight with a maximum limit of 250px
      const newHeight = Math.min(textareaRef.current.scrollHeight, 200);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };
  const handleSubInput = () => {
    if (subTextareaRef.current) {
      // Reset height to auto to calculate the correct scrollHeight
      subTextareaRef.current.style.height = 'auto';
      // Set the height based on scrollHeight with a maximum limit of 250px
      const newHeight = Math.min(subTextareaRef.current.scrollHeight, 100);
      subTextareaRef.current.style.height = `${newHeight}px`;
    }
  };

  return (
    <div className='flex'>
      <div className='relative w-1/2 h-screen border-r'>
        <div className='max-h-[583px] pt-[32px] px-[48px] '>
          <textarea
            ref={textareaRef}
            onInput={handleInput}
            rows={1}
            className='w-full outline-none resize-none text-[44px] font-bold    '
            placeholder='제목을 입력하세요'
          ></textarea>
          <div className='w-full h-[4px] border border-black bg-black'></div>
          <textarea
            ref={subTextareaRef}
            onInput={handleSubInput}
            rows={1}
            className='mt-4 w-full outline-none resize-none text-[24px]   '
            placeholder='부제를 입력하세요'
          ></textarea>
        </div>
        <div className='flex items-center px-[48px] text-gray-400 '>
          <button className='w-[48px] h-[48px] hover:bg-gray-100'>
            <div className='text-[16px]'>
              H<span className='text-[12px]'>1</span>
            </div>
          </button>
          <button className='w-[48px] h-[48px] hover:bg-gray-100'>
            <div className='text-[16px]'>
              H<span className='text-[12px]'>2</span>
            </div>
          </button>
          <button className='w-[48px] h-[48px] hover:bg-gray-100'>
            <div className='text-[16px]'>
              H<span className='text-[12px]'>3</span>
            </div>
          </button>
          <button className='w-[48px] h-[48px] hover:bg-gray-100'>
            <div className='text-[16px]'>
              H<span className='text-[12px]'>4</span>
            </div>
          </button>
          <div className=' w-[1px] h-[20px] border mx-2 ' />
          <button className='w-[48px] h-[48px] hover:bg-gray-100'>
            <div className='text-[16px]'>B</div>
          </button>
          <button className='w-[48px] h-[48px] hover:bg-gray-100'>
            <div className='text-[16px]'>I</div>
          </button>
          <button className='w-[48px] h-[48px] hover:bg-gray-100'>
            <div className='text-[16px]'>T</div>
          </button>
          <div className=' w-[1px] h-[20px] border mx-2 ' />
          <button className='w-[48px] h-[48px] hover:bg-gray-100'>
            <div className='text-[16px]'>{`"`}</div>
          </button>
          <button className='w-[48px] h-[48px] hover:bg-gray-100'>
            <div className='text-[16px]'>L</div>
          </button>
          <button className='w-[48px] h-[48px] hover:bg-gray-100'>
            <div className='text-[16px]'>Img</div>
          </button>
          <button className='w-[48px] h-[48px] hover:bg-gray-100'>
            <div className='text-[16px]'>C</div>
          </button>
        </div>
        <div></div>
        <div className=''></div>
      </div>
      <div className='w-1/2'></div>
    </div>
  );
}

export default Post;
