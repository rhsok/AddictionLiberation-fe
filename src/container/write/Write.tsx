'use client';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import ModalPortal from '@/components/ModalPortal';
import Dropdown from '@/components/Dropdown/Dropdown';

// DropdownKey는 세 가지 키만을 허용하는 타입
type DropdownKey = 'category' | 'detail' | 'main';

// 각 키에 대한 타입을 Record를 사용하여 정의
interface IDropdownRefs {
  category: React.RefObject<HTMLDivElement>;
  detail: React.RefObject<HTMLDivElement>;
  main: React.RefObject<HTMLDivElement>;
}

function Write() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const subTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLinkModalActive, setIsLinkModalActive] = useState<boolean>(false);
  const [isVideoModalActive, setVideoModalActive] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [linkURL, setLinkURL] = useState<string>('');
  const [videoTag, setVideoTag] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [post, setPost] = useState<{
    main: string;
    sub: string;
    htmlContent: string;
  }>({
    main: '',
    sub: '',
    htmlContent: '',
  });
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({
    category: false,
    detail: false,
    main: false,
  }); // 드롭다운 메뉴 상태
  // 초기화
  const buttonRef: IDropdownRefs = {
    category: useRef<HTMLDivElement>(null),
    detail: useRef<HTMLDivElement>(null),
    main: useRef<HTMLDivElement>(null),
  };
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({
    category: '카테고리',
    detail: '세부내용',
    main: '메인',
  });

  // 드롭다운 옵션
  const dropdownOptions: Record<DropdownKey, string[]> = {
    category: ['Option A', 'Option B', 'Option C'],
    detail: ['Detail 1', 'Detail 2', 'Detail 3'],
    main: ['Main 1', 'Main 2', 'Main 3'],
  };
  const handleSelect = (key: string, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [key]: option }));
  };

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

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      // Reset height to auto to calculate the correct scrollHeight
      textareaRef.current.style.height = 'auto';
      // Set the height based on scrollHeight with a maximum limit of 250px
      const newHeight = Math.min(textareaRef.current.scrollHeight, 200);
      textareaRef.current.style.height = `${newHeight}px`;
    }
    setPost((prev) => {
      return { ...prev, main: event.target.value };
    });
  };
  const handleSubInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (subTextareaRef.current) {
      // Reset height to auto to calculate the correct scrollHeight
      subTextareaRef.current.style.height = 'auto';
      // Set the height based on scrollHeight with a maximum limit of 250px
      const newHeight = Math.min(subTextareaRef.current.scrollHeight, 100);
      subTextareaRef.current.style.height = `${newHeight}px`;
    }
    setPost((prev) => {
      return { ...prev, sub: event.target.value };
    });
  };

  function formatDoc(cmd: any, value: string | null = null) {
    if (value) {
      document.execCommand(cmd, false, value);
    } else {
      document.execCommand(cmd);
    }
  }

  const [isPlaceholderActive, setIsPlaceholderActive] = useState<boolean>(true);
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
    if (editorRef.current) {
      setPost((prev) => {
        return {
          ...prev,
          htmlContent: editorRef.current!.innerHTML,
        };
      });
      console.log(editorRef.current.innerHTML);
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

  const insertIframe = () => {
    console.log(videoTag);
    if (editorRef.current) {
      editorRef.current.focus();
      const iframeHTML = `${videoTag}`;
      document.execCommand('insertHTML', false, iframeHTML);
    }
  };

  const [savedRange, setSavedRange] = useState<Range | null>(null);

  const handleFocus = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      setSavedRange(range);
    }
  };

  const insertTextAtCursor = () => {
    const text = ' 삽입할 텍스트 ';
    const selection = window.getSelection();
    const range = selection?.rangeCount ? selection.getRangeAt(0) : null;
    if (!selection) return;
    if (range && editorRef.current) {
      range.deleteContents(); // 선택된 텍스트가 있으면 내용을 삭제합니다.
      const textNode = document.createTextNode(text);
      range.insertNode(textNode);

      // 삽입 후 텍스트 뒤에 커서를 위치시킵니다.
      const space = document.createTextNode(' ');
      range.insertNode(space); // 커서를 이동하기 위해 텍스트 노드 뒤에 공백 노드를 삽입합니다.
      selection.removeAllRanges();
      range.setStartAfter(textNode);
      range.setEndAfter(textNode);
      selection.addRange(range);
    }
  };

  const handleInsertImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (editorRef.current) {
          editorRef.current.focus();
          // 이미지를 가운데 정렬된 상태로 삽입
          const imgHTML = `
            <div style="">
              <img src="${e.target?.result}" style="width: 70%; cursor: pointer; float: left;" class="inserted-image">
            </div>`;
          document.execCommand('insertHTML', false, imgHTML);
        }
      };
      reader.readAsDataURL(file);
    }
    if (event.target.files) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const alignImage = (alignment: 'left' | 'center' | 'right') => {
    if (editorRef.current) {
      const images = editorRef.current.getElementsByTagName('img');
      if (images.length > 0) {
        const img = images[images.length - 1]; // 가장 최근에 삽입된 이미지
        img.style.float = '';
        img.style.margin = '';
        img.style.display = '';

        if (alignment === 'left') {
          img.style.float = 'left';
          img.style.marginRight = '10px';
        } else if (alignment === 'right') {
          img.style.float = 'right';
          img.style.marginLeft = '10px';
        } else if (alignment === 'center') {
          img.parentElement!.style.textAlign = 'center';
          img.style.display = 'block';
          img.style.margin = '10px auto';
        }
      }
    }
  };

  // useEffect(() => {
  //   console.log('linkURL', linkURL);
  // }, [linkURL]);

  useEffect(() => {
    console.log('savedRange', savedRange);
  }, [savedRange]);

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
            onClick={() => setIsLinkModalActive(!isLinkModalActive)}
            className='relative w-[48px] h-[48px] hover:bg-gray-100 cursor-default'
          >
            <div className='text-[16px]'>Link</div>
            {isLinkModalActive && (
              <div
                ref={modalRef}
                onClick={(e: any) => e.stopPropagation()}
                className='absolute z-20 flex flex-col w-[400px] h-[140px]  border bg-white px-4 '
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
            onChange={handleInsertImage}
            className='hidden '
          ></input>
          <label
            htmlFor='image-upload'
            className='flex items-center justify-center w-[48px] h-[48px]  hover:bg-gray-100'
          >
            <div className='text-[16px] '>Img</div>
          </label>
          <button
            onClick={() => setVideoModalActive(!isVideoModalActive)}
            className=' h-[48px] mx-4 hover:bg-gray-100'
          >
            <div className='text-[16px]'>VideoTag</div>
            {isVideoModalActive && (
              <div
                ref={modalRef}
                onClick={(e: any) => e.stopPropagation()}
                className='absolute z-20 flex flex-col w-[700px] h-[340px]  border bg-white px-4 '
              >
                <p className='mt-4 text-black'>비디오 태그</p>
                <textarea
                  placeholder='내용을 입력하세요'
                  onChange={(e) => setVideoTag(e.target.value)}
                  className='outline-none border  mt-4 h-[300px] rounded-lg px-4 pt-4 resize-none text-black'
                />
                <button
                  onClick={insertIframe}
                  className='mt-3 mb-6 py-2 w-[100px] text-black border mx-auto rounded-lg'
                >
                  확인
                </button>
              </div>
            )}
          </button>
          <div className=' w-[1px] h-[20px] border mx-2 ' />
          {/* 왼쪽 정렬 버튼 */}
          <button
            className='w-[48px] h-[48px] hover:bg-gray-100 flex justify-center items-center'
            onClick={() => {
              alignImage('left');
              formatDoc('justifyLeft');
            }}
          >
            <div className='text-[16px]'>Left</div>
          </button>

          {/* 가운데 정렬 버튼 */}
          <button
            className='w-[48px] h-[48px] hover:bg-gray-100 flex justify-center items-center'
            onClick={() => {
              alignImage('center');
              formatDoc('justifyCenter');
            }}
          >
            <div className='text-[16px]'>Center</div>
          </button>

          {/* 오른쪽 정렬 버튼 */}
          <button
            className='w-[48px] h-[48px] hover:bg-gray-100 flex justify-center items-center'
            onClick={() => {
              alignImage('right');
              formatDoc('justifyRight');
            }}
          >
            <div className='text-[16px]'>Right</div>
          </button>
          {/* <button
            className='w-[48px] h-[48px] hover:bg-gray-100 flex justify-center items-center'
            onClick={() => insertTextAtCursor()}
          >
            <div className='text-[16px]'>글자</div>
          </button> */}
        </div>
        <div className='flex flex-row w-full px-[47px] py-2 gap-10'>
          {Object.keys(dropdownOptions).map((key) => (
            <div
              key={key}
              ref={buttonRef[key as keyof IDropdownRefs]} // 타입 단언
              onClick={() =>
                setIsOpen((prev) => ({
                  ...prev,
                  [key as keyof IDropdownRefs]: true,
                }))
              }
              className='relative px-10 py-1 border rounded-md cursor-pointer hover:bg-gray-200'
            >
              {selectedOptions[key as keyof IDropdownRefs]}
              {isOpen[key as keyof IDropdownRefs] && (
                <ModalPortal>
                  <Dropdown
                    buttonRef={buttonRef[key as keyof IDropdownRefs]}
                    onClose={() =>
                      setIsOpen((prev) => ({
                        ...prev,
                        [key as keyof IDropdownRefs]: false,
                      }))
                    }
                    options={dropdownOptions[key as keyof IDropdownRefs]}
                    onSelect={(option) =>
                      handleSelect(key as keyof IDropdownRefs, option)
                    }
                  />
                </ModalPortal>
              )}
            </div>
          ))}
        </div>
        <div className='px-[48px]  flex flex-1 overflow-y-scroll '>
          <div
            ref={editorRef}
            contentEditable
            onInput={handleEditableInput}
            className='px-4 py-2 w-full outline-none  bg-slate-100 overflow-y-scroll  '
          />
        </div>

        <div className='w-full h-[64px]'></div>
        <div className='fixed bottom-0 flex justify-between px-[48px] w-1/2 h-[64px] border-t'>
          <div className='flex items-center justify-center'>뒤로가기</div>
          <div className='flex items-center justify-center'>게시하기</div>
        </div>
      </div>
      <div className='w-1/2   overflow-hidden break-words '>
        <div className='w-full h-screen pt-[32px] px-[48px] overflow-y-scroll'>
          <pre className='w-full mt-4 whitespace-pre-wrap min-h-[56px] text-[44px] font-bold'>
            {post.main}
          </pre>
          <div className='w-full h-[4px] border border-black bg-black'></div>
          <pre className='w-full mt-4 text-[24px] min-h-[30px] whitespace-pre-wrap '>
            {post.sub}
          </pre>
          <div
            className='my-4 px-4 py-2 w-full h-[calc(100%-200px)]  bg-slate-100 flex-1  whitespace-pre-wrap overflow-y-scroll'
            dangerouslySetInnerHTML={{ __html: post.htmlContent }}
          />
        </div>
      </div>
    </div>
  );
}

export default Write;