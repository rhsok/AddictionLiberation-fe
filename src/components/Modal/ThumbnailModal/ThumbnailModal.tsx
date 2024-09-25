import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react';

interface ThumbnailModalType {
  isOpen: boolean;
  onClose: () => void;
  openModal: () => void;
  selectedOptions: {
    [key: string]: { label: string; value: number | boolean };
  };
  post: {
    main: string;
    sub: string;
    htmlContent: string;
  };
  selectedImage: File | null;
  handleSubmit: () => void;
  videoTag: string;
}

function ThumbnailModal({
  isOpen,
  onClose,
  openModal,
  selectedOptions,
  post,
  videoTag,
  handleSubmit,
}: ThumbnailModalType) {
  const [slideOver, setSlideOver] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [thumbanilImage, setThumbnailImage] = useState<File | undefined>();
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setSlideOver(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!slideOut) return;
    setTimeout(() => {
      onClose();
    }, 150);
  }, [slideOut, onClose]);

  const handleInsertImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setThumbnailImage(event.target.files[0]);
      setThumbnailImageUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className='fixed inset-0 bg-white '></div>
      <div
        className={`bg-white rounded-lg p-6 border w-[400px] transform transition-transform duration-300 ${
          slideOver ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <h2 className='text-xl mb-4'>썸네일 이미지 선택</h2>
        <input
          type='file'
          accept='image/*'
          id='thumbanilImage'
          className='hidden'
          onChange={handleInsertImage}
        />

        <label
          htmlFor='thumbanilImage'
          className='flex flex-col items-center justify-center text-white text-[20px] w-[320px] h-[200px] bg-gray-200 mx-auto overflow-hidden border'
        >
          {thumbanilImage ? (
            <>
              <Image
                width={320}
                height={200}
                src={thumbnailImageUrl}
                alt={'thumbnailImage'}
              />
            </>
          ) : (
            <>
              <p>이미지를 추가해 주세요</p>
              <div> {`<클릭>`}</div>
            </>
          )}
        </label>

        <div className='flex justify-between w-[320px] mx-auto '>
          <button
            className='mt-4   px-4 py-2 rounded border'
            onClick={() => {
              setSlideOver(false);
              setSlideOut(true);
            }}
          >
            닫기
          </button>
          <button
            onClick={handleSubmit}
            className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'
          >
            게시하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThumbnailModal;
