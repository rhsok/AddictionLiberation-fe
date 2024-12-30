'use client';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import ModalPortal from '@/components/Modal/ModalPortal';
import Dropdown from '@/components/Dropdown/Dropdown';
import {
  editPostById,
  getPostById,
  uploadImage,
  writePost,
} from '@/services/post/post.api';
import LeftSVG from '../../../public/Image/write/LeftSVG';
import CenterSVG from '../../../public/Image/write/CenterSVG';
import RightSVG from '../../../public/Image/write/RightSVG';
import ImageSVG from '../../../public/Image/write/ImageSVG';
import VideoTagSVG from '../../../public/Image/write/VideoTagSVG';
import ThumbnailModal from '@/components/Modal/ThumbnailModal/ThumbnailModal';
import postStore from '@/states/postStore/postStore';
import { PostType } from '@/types/postStore/postStore.types';
import { useRouter } from 'next/navigation';

// DropdownKey는 세 가지 키만을 허용하는 타입
type DropdownKey = 'category' | 'postType' | 'isMain';

// 각 키에 대한 타입을 Record를 사용하여 정의
interface IDropdownRefs {
  category: React.RefObject<HTMLDivElement>;
  postType: React.RefObject<HTMLDivElement>;
  isMain: React.RefObject<HTMLDivElement>;
}

interface PostEditProps {
  params: { postId: string };
}

function PostEdit({ params }: PostEditProps) {
  const router = useRouter();
  //게시글 정보
  const { setPost, post } = postStore();
  const [postdata, setPostData] = useState<PostType>();
  //에디터 정보
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const subTextareaRef = useRef<HTMLTextAreaElement>(null);
  const lastRangeRef = useRef<Range | null>(null);
  const [isLinkModalActive, setIsLinkModalActive] = useState<boolean>(false);
  const [isVideoModalActive, setVideoModalActive] = useState<boolean>(false);
  const [thumbanilModalActive, setThumbnailModalActive] =
    useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [linkURL, setLinkURL] = useState<string>('');
  const [videoTag, setVideoTag] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isImageModified, setIsImageModified] = useState<boolean>(false);
  const [thumbnailImage, setThumbnailImage] = useState<{
    file: File | undefined;
    url: string;
  }>({
    file: undefined,
    url: '',
  });
  const [originThumbnailImageURL, setOriginThumbnailImageURL] =
    useState<string>('/');

  const [editPost, setEditPost] = useState<{
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
    postType: false,
    isMain: false,
  }); // 드롭다운 메뉴 상태
  // 초기화
  const buttonRef: IDropdownRefs = {
    category: useRef<HTMLDivElement>(null),
    postType: useRef<HTMLDivElement>(null),
    isMain: useRef<HTMLDivElement>(null),
  };
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: { label: string; value: number | boolean };
  }>({
    category: { label: '카테고리', value: 0 },
    postType: { label: '포스트 타입', value: 0 },
    isMain: { label: '메인여부', value: true },
  });

  // 드롭다운 옵션
  const dropdownOptions: Record<
    DropdownKey,
    { label: string; value: number | boolean }[]
  > = {
    category: [
      { label: 'About Addiction', value: 1 },
      { label: 'Youtube', value: 2 },
      { label: 'Game', value: 3 },
      { label: 'Alcoholism', value: 4 },
      { label: 'Gambling', value: 5 },
      { label: 'Drug', value: 6 },
      { label: 'porn', value: 7 },
    ],
    postType: [
      { label: 'Main', value: 1 },
      { label: 'Normal', value: 2 },
    ],
    isMain: [
      { label: 'true', value: true },
      { label: 'false', value: false },
    ],
  };

  const handleSelect = (
    key: string,
    option: { label: string; value: number | boolean }
  ) => {
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
    setEditPost((prev) => {
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
    setEditPost((prev) => {
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

  const handlefocus = () => {
    if (editorRef.current && isPlaceholderActive) {
      setIsPlaceholderActive(false);
      editorRef.current.textContent = ''; // Clear the placeholder only once when the user starts typing.
    }
  };

  const handleEditableInput = () => {
    //클릭시 플레이스 홀더 사라짐
    // if (editorRef.current && isPlaceholderActive) {
    //   setIsPlaceholderActive(false);
    //   editorRef.current.textContent = ''; // Clear the placeholder only once when the user starts typing.
    // }
    //마지막 커서위치
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      lastRangeRef.current = selection.getRangeAt(0);
      // console.log('Current Range:', lastRangeRef.current);
    }
    //게시글 내용
    if (editorRef.current) {
      setEditPost((prev) => {
        return {
          ...prev,
          htmlContent: editorRef.current!.innerHTML,
        };
      });
      // console.log(editorRef.current.innerHTML);
    }
  };

  const handleInsertLink = () => {
    const url = linkURL.trim();
    if (url && editorRef.current) {
      // contentEditable 영역에 포커스를 설정합니다.
      editorRef.current.focus();

      const range = lastRangeRef.current;
      if (range) {
        range.deleteContents();
        const linkElement = document.createElement('a');
        linkElement.href = url;
        linkElement.target = '_blank';
        linkElement.style.color = 'blue';
        linkElement.style.textDecoration = 'underline';
        linkElement.style.cursor = 'pointer';
        linkElement.textContent = url;

        range.insertNode(linkElement);

        // 링크 뒤에 커서를 위치시키기 위한 텍스트 노드 추가
        const space = document.createTextNode(' ');
        range.insertNode(space);

        // 삽입된 링크 뒤로 커서 이동
        range.setStartAfter(linkElement);
        range.setEndAfter(linkElement);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);

        // 모달을 닫고 입력된 URL을 초기화합니다.
        setIsLinkModalActive(false);
        setLinkURL('');
      }
    }
  };

  const insertIframe = () => {
    // console.log(videoTag);
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
      setIsImageModified(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (editorRef.current) {
          editorRef.current.focus();
          const range = lastRangeRef.current;
          if (range) {
            range.deleteContents();
            const imgElement = document.createElement('img');
            imgElement.src = e.target?.result as string;
            imgElement.style.width = '99%';
            imgElement.style.cursor = 'pointer';
            range.insertNode(imgElement);

            // 이미지 뒤에 커서를 위치시키기 위한 텍스트 노드 추가
            const space = document.createTextNode(' ');
            range.insertNode(space);

            // 삽입된 이미지 뒤로 커서 이동
            range.setStartAfter(imgElement);
            range.setEndAfter(imgElement);
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);
          } else {
            const selection = window.getSelection();
            const firstRange = selection?.rangeCount
              ? selection.getRangeAt(0)
              : null;
            if (firstRange) {
              firstRange.deleteContents();
              const imgElement = document.createElement('img');
              imgElement.src = e.target?.result as string;
              imgElement.style.width = '99%';
              imgElement.style.cursor = 'pointer';
              firstRange.insertNode(imgElement);

              // 이미지 뒤에 커서를 위치시키기 위한 텍스트 노드 추가
              const space = document.createTextNode(' ');
              firstRange.insertNode(space);

              // 삽입된 이미지 뒤로 커서 이동
              firstRange.setStartAfter(imgElement);
              firstRange.setEndAfter(imgElement);
              selection?.removeAllRanges();
              selection?.addRange(firstRange);
            }
          }
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

  const handleSubmit = async () => {
    validateFunction(); // 유효성 검사
    let thumbnailUrl = originThumbnailImageURL; // 썸네일 URL 초기값
    let htmlContent = editorRef.current?.innerHTML || editPost.htmlContent; // contentEditable의 HTML 내용

    if (!params.postId) return alert('게시글id를 확인하십시오.');

    // 1. 썸네일 이미지가 변경된 경우
    if (thumbnailImage.url !== originThumbnailImageURL && thumbnailImage.file) {
      try {
        const blob = new Blob([thumbnailImage.file], {
          type: thumbnailImage.file.type,
        });
        const uploadedThumbnail = await uploadImage(blob); // 서버에 이미지 업로드
        thumbnailUrl = uploadedThumbnail.filePath;
      } catch (error) {
        // console.log('썸네일 이미지 등록 실패:', error);
        alert('이미지 등록에 실패했습니다.');
        return;
      }
    }

    // 2. 콘텐츠의 이미지가 변경된 경우
    if (isImageModified) {
      const regex = /<img[^>]+src="([^">]+)"/g;
      let match;
      while ((match = regex.exec(htmlContent)) !== null) {
        const imgSrc = match[1]; // img 태그의 src 값
        let file;

        try {
          if (imgSrc.startsWith('data:image/')) {
            const response = await fetch(imgSrc);
            const blob = await response.blob();
            file = new File([blob], 'uploaded_image.png', { type: blob.type });
          } else {
            file = await fetch(imgSrc).then((res) => res.blob());
          }

          const uploadedImage = await uploadImage(file); // 서버에 이미지 업로드
          htmlContent = htmlContent.replace(imgSrc, uploadedImage.filePath); // src 경로 업데이트
        } catch (error) {
          console.error('이미지 업로드 중 오류 발생:', error);
        }
      }
    }

    // 3. 게시글 데이터 준비 및 전송
    const reqData = {
      title: editPost.main,
      content: htmlContent,
      subtitle: editPost.sub,
      videoUrl: videoTag,
      published: true,
      postTypeId: selectedOptions.postType.value,
      publishedDate: new Date(),
      thumbnailImageURL: thumbnailUrl, // 최종 썸네일 URL
      categories: [
        {
          categoryId: selectedOptions.category.value,
          isMain: selectedOptions.isMain.value,
        },
      ],
    };

    try {
      const resData = await editPostById(params.postId, reqData);
      // console.log('게시글 수정 완료:', resData);
      alert('게시글 수정 완료');
    } catch (error) {
      console.error('게시글 수정 실패, 서버 요청 오류:', error);
    }
  };

  const validateFunction = () => {
    if (
      editPost.main === '' ||
      editPost.sub === ' ' ||
      editPost.htmlContent === ''
    )
      return alert('내용을 입력해 주세요.');
    if (
      selectedOptions.category.label === '카테고리' ||
      selectedOptions.postType.label === '포스트 타입' ||
      selectedOptions.isMain.label === '메인여부'
    )
      return alert('카테고리를 선택해 주세요');
    openModal();
  };

  const openModal = () => {
    setThumbnailModalActive(true);
  };

  const closeModal = () => {
    setThumbnailModalActive(false);
  };

  //게시글 정보 불러오기
  useEffect(() => {
    //post에서 전역변수로 데이터를 저장해서 불러 올 수 없으면 데이터를 요청한다.
    // console.log('post', post);
    if (post) return;
    const fetchPost = async () => {
      try {
        const resData = await getPostById(params.postId);
        setPost(resData);
        setPostData(resData);
        setThumbnailImage((prev) => ({
          ...prev,
          url: resData.thumbnailImageURL,
        }));
        setOriginThumbnailImageURL(resData.thumbnailImageURL);
      } catch (error) {}
    };
    fetchPost();
  }, [params, post]);

  useEffect(() => {
    if (!post) return;
    // console.log('post.thumbnailImageURL', post.thumbnailImageURL);
    setThumbnailImage((prev) => ({
      ...prev,
      url: post.thumbnailImageURL,
    }));
    setOriginThumbnailImageURL(post.thumbnailImageURL);
  }, [post]);

  //title, content, subtitle, category 매핑
  useEffect(() => {
    if (!post) return;
    if (post?.title && textareaRef.current) {
      textareaRef.current.value = post.title;
      setEditPost((prev) => {
        return { ...prev, main: post.title };
      });
    }
    if (post?.subtitle && subTextareaRef.current) {
      subTextareaRef.current.value = post.subtitle;
      setEditPost((prev) => {
        return { ...prev, sub: post.subtitle };
      });
    }
    if (post?.content && editorRef.current) {
      handlefocus();
      editorRef.current.innerHTML = post.content;
      setEditPost((prev) => {
        return { ...prev, htmlContent: post.content };
      });
    }

    // category, postType, isMain 값 모두 설정
    const category =
      post.categories?.length > 0
        ? dropdownOptions.category.find(
            (option) => option.value === post.categories[0].category.id
          )
        : selectedOptions.category;

    const isMain =
      post.categories?.length > 0
        ? dropdownOptions.isMain.find(
            (option) => option.value === post.categories[0].isMain
          )
        : selectedOptions.isMain;

    const postType =
      dropdownOptions.postType.find(
        (option) => option.value === post.postTypeId
      ) || selectedOptions.postType;

    setSelectedOptions((prev) => ({
      ...prev,
      category: category || prev.category,
      postType: postType || prev.postType,
      isMain: isMain || prev.isMain,
    }));
  }, [post]);

  return (
    <div className='flex h-screen'>
      <div className='flex flex-col relative w-1/2 h-screen border-r'>
        <div className='w-full h-[50px]'></div>
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
              onClick={() => formatDoc('fontSize', '3')}
              className='text-[16px]'
            >
              H<span className='text-[12px]'>1</span>
            </div>
          </button>
          <button
            onClick={() => formatDoc('fontSize', '4')}
            className='w-[48px] h-[48px] hover:bg-gray-100'
          >
            <div className='text-[16px]'>
              H<span className='text-[12px]'>2</span>
            </div>
          </button>
          <button
            onClick={() => formatDoc('fontSize', '5')}
            className='w-[48px] h-[48px] hover:bg-gray-100'
          >
            <div className='text-[16px]'>
              H<span className='text-[12px]'>3</span>
            </div>
          </button>
          <button
            onClick={() => formatDoc('fontSize', '6')}
            className='w-[48px] h-[48px] hover:bg-gray-100'
          >
            <div className='text-[16px]'>
              H<span className='text-[12px]'>4</span>
            </div>
          </button>
          <button
            onClick={() => formatDoc('fontSize', '7')}
            className='w-[48px] h-[48px] hover:bg-gray-100'
          >
            <div className='text-[16px]'>
              H<span className='text-[12px]'>5</span>
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
            <div className='text-[16px]'>Italic</div>
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
            className='hidden'
          ></input>
          <label
            htmlFor='image-upload'
            className='flex items-center justify-center w-[48px] h-[48px]  hover:bg-gray-100 cursor-pointer'
          >
            <div className='text-[16px] '>
              <ImageSVG />
            </div>
          </label>
          <button
            onClick={() => setVideoModalActive(!isVideoModalActive)}
            className=' h-[48px] ml-1  hover:bg-gray-100'
          >
            <div className='text-[16px] px-3'>
              <VideoTagSVG />
            </div>
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
            <div className='text-[16px]'>
              <LeftSVG />
            </div>
          </button>

          {/* 가운데 정렬 버튼 */}
          <button
            className='w-[48px] h-[48px] hover:bg-gray-100 flex justify-center items-center'
            onClick={() => {
              alignImage('center');
              formatDoc('justifyCenter');
            }}
          >
            <div className='text-[16px]'>
              <CenterSVG />
            </div>
          </button>

          {/* 오른쪽 정렬 버튼 */}
          <button
            className='w-[48px] h-[48px] hover:bg-gray-100 flex justify-center items-center'
            onClick={() => {
              alignImage('right');
              formatDoc('justifyRight');
            }}
          >
            <div className='text-[16px]'>
              <RightSVG />
            </div>
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
              {selectedOptions[key as keyof IDropdownRefs].label}
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
        <div className='px-[48px] mt-2  flex flex-1 overflow-y-scroll '>
          <div
            ref={editorRef}
            contentEditable
            onFocus={handlefocus}
            onInput={handleEditableInput}
            className='px-4 py-2 w-full outline-none  bg-slate-100 overflow-y-scroll  '
          />
        </div>

        <div className='w-full h-[64px]'></div>
        <div className=' bottom-0 flex justify-between px-[48px] w-full h-[64px] border-t bg-b'>
          <div
            onClick={() => {
              router.push(`/post/${params.postId}`);
            }}
            className='flex items-center justify-center cursor-pointer'
          >
            뒤로가기
          </div>
          <div
            onClick={() => {
              // handleSubmit();
              validateFunction();
            }}
            className='flex items-center justify-center my-2 px-2 cursor-pointer hover:bg-gray-200'
          >
            수정하기
          </div>
          {thumbanilModalActive && (
            <ModalPortal>
              <ThumbnailModal
                videoTag={videoTag}
                handleSubmit={handleSubmit}
                selectedImage={selectedImage}
                selectedOptions={selectedOptions}
                editPost={editPost}
                isOpen={thumbanilModalActive}
                onClose={closeModal}
                openModal={openModal}
                setThumbnailImage={setThumbnailImage}
                thumbnailImage={thumbnailImage}
                originThumbnailImageURL={originThumbnailImageURL}
              />
            </ModalPortal>
          )}
        </div>
      </div>
      <div className='w-1/2   overflow-hidden break-words '>
        <div className='w-full h-screen pt-[32px] px-[48px] overflow-y-scroll'>
          <pre className='w-full mt-4 whitespace-pre-wrap min-h-[56px] text-[44px] font-bold'>
            {editPost.main}
          </pre>
          <div className='w-full h-[4px] border border-black bg-black'></div>
          <pre className='w-full mt-4 text-[24px] min-h-[30px] whitespace-pre-wrap '>
            {editPost.sub}
          </pre>
          <div
            className='my-4 px-4 py-2 w-full h-[calc(100%-200px)]  bg-slate-100 flex-1  whitespace-pre-wrap overflow-y-scroll'
            dangerouslySetInnerHTML={{ __html: editPost.htmlContent }}
          />
        </div>
      </div>
    </div>
  );
}

export default PostEdit;
