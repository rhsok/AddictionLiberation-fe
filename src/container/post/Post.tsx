'use client';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

function Post() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const subTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLinkModalActive, setIsLinkModalActive] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [linkURL, setLinkURL] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(
    null
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsLinkModalActive(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  function formatDoc(cmd: any, value: string | null = null) {
    if (value) {
      document.execCommand(cmd, false, value);
    } else {
      document.execCommand(cmd);
    }
  }

  const [isPlaceholderActive, setIsPlaceholderActive] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<string>('16px');
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.style.color = isPlaceholderActive ? 'gray' : 'black';
      if (isPlaceholderActive) {
        editorRef.current.textContent = '내용을 작성해 볼까요?';
      }
    }
  }, [isPlaceholderActive]);

  const handleEditableInput = () => {
    if (editorRef.current && isPlaceholderActive) {
      editorRef.current.textContent = ''; // Clear the placeholder only once when the user starts typing.
      setIsPlaceholderActive(false);
    }
  };

  const handleInsertLink = () => {
    const url = linkURL.trim();
    if (url && editorRef.current) {
      // contentEditable 영역에 포커스를 설정합니다.
      editorRef.current.focus();

      // 링크 HTML을 생성합니다.
      const linkHTML = `<a href="${url}" target="_blank" style="color: blue; text-decoration: underline; cursor: pointer;">${url}</a>`;

      // execCommand를 사용해 링크를 삽입합니다.
      document.execCommand('insertHTML', false, linkHTML);

      // 모달을 닫고 입력된 URL을 초기화합니다.
      setIsLinkModalActive(false);
      setLinkURL('');
    }
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (!editorRef.current) return;
        // contentEditable 영역에 포커스를 설정합니다.
        editorRef.current.focus();
        const imgHTML = `<img src="${e.target?.result}" style="max-width: 100%; height: auto;" />`;
        document.execCommand('insertHTML', false, imgHTML);
      };
      reader.readAsDataURL(file);
    }
  };

  // useEffect(() => {
  //   console.log('linkURL', linkURL);
  // }, [linkURL]);

  return (
    <div className='flex h-screen'>
      <div className='flex flex-col relative w-1/2 h-screen border-r'>
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
        <div className='flex items-center px-[48px] text-gray-400  '>
          <button className='w-[48px] h-[48px] hover:bg-gray-100'>
            <div
              onClick={() => formatDoc('fontSize', '1')}
              className='text-[16px]'
            >
              H<span className='text-[12px]'>1</span>
            </div>
          </button>
          <button
            onClick={() => formatDoc('fontSize', '3')}
            className='w-[48px] h-[48px] hover:bg-gray-100'
          >
            <div className='text-[16px]'>
              H<span className='text-[12px]'>2</span>
            </div>
          </button>
          <button
            onClick={() => formatDoc('fontSize', '6')}
            className='w-[48px] h-[48px] hover:bg-gray-100'
          >
            <div className='text-[16px]'>
              H<span className='text-[12px]'>3</span>
            </div>
          </button>
          <button
            onClick={() => formatDoc('fontSize', '7')}
            className='w-[48px] h-[48px] hover:bg-gray-100'
          >
            <div className='text-[16px]'>
              H<span className='text-[12px]'>4</span>
            </div>
          </button>
          <div className=' w-[1px] h-[20px] border mx-2 ' />
          <button
            onClick={() => formatDoc('bold')}
            className='w-[48px] h-[48px] hover:bg-gray-100'
          >
            <div className='text-[16px]'>B</div>
          </button>
          <button
            onClick={() => formatDoc('underline')}
            className='w-[48px] h-[48px] hover:bg-gray-100'
          >
            <div className='text-[16px]'>Line</div>
          </button>
          <button
            onClick={() => formatDoc('italic')}
            className='w-[48px] h-[48px] hover:bg-gray-100'
          >
            <div className='text-[16px]'>I</div>
          </button>
          <div className=' w-[1px] h-[20px] border mx-2 ' />
          {/* <button className='w-[48px] h-[48px] hover:bg-gray-100'>
            <div className='text-[16px]'>{`"`}</div>
          </button> */}
          <button
            // onClick={() => {
            //   document.execCommand('createLink', false, 'naver.com');
            // }}
            onClick={() => setIsLinkModalActive(!isLinkModalActive)}
            className='relative w-[48px] h-[48px] hover:bg-gray-100 cursor-default'
          >
            <div className='text-[16px]'>Link</div>
            {isLinkModalActive && (
              <div
                ref={modalRef}
                onClick={(e: any) => e.stopPropagation()}
                className='absolute flex flex-col w-[400px] h-[140px]  border bg-white px-4 '
              >
                <p className='mt-2 text-black'>링크를 입력하세요</p>
                <input
                  placeholder='https://example.com'
                  onChange={(e) => setLinkURL(e.target.value)}
                  value={linkURL}
                  className='outline-none border h-10 mt-4 rounded-lg px-4'
                />
                <button onClick={handleInsertLink} className='mt-3 text-black'>
                  확인
                </button>
              </div>
            )}
          </button>
          <input
            type='file'
            accept='image/*'
            id='image-upload'
            onChange={handleImageUpload}
            className='hidden '
          ></input>
          <label
            htmlFor='image-upload'
            className='flex items-center justify-center w-[48px] h-[48px]  hover:bg-gray-100'
          >
            <div className='text-[16px] '>Img</div>
          </label>
          {/* <button className='w-[48px] h-[48px] hover:bg-gray-100'>
            <div className='text-[16px]'>C</div>
          </button> */}
        </div>
        <div
          ref={editorRef}
          contentEditable
          onInput={handleEditableInput}
          className='px-4 pb-[65px] w-full flex-1  outline-none  bg-slate-100 overflow-y-scroll '
        />
        <div className='w-full h-[64px]'></div>
        <div className='fixed bottom-0 flex justify-between px-[48px] w-1/2 h-[64px] border-t'>
          <div className='flex items-center justify-center'>뒤로가기</div>
          <div className='flex items-center justify-center'>게시하기</div>
        </div>
      </div>
      <div className='w-1/2'></div>
    </div>
  );
}

export default Post;
