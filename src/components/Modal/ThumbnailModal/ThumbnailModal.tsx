import React, { useEffect, useState } from 'react';

interface ThumbnailModalType {
  isOpen: boolean;
  onClose: () => void;
  openModal: () => void;
}

function ThumbnailModal({ isOpen, onClose, openModal }: ThumbnailModalType) {
  const [slideOver, setSlideOver] = useState(false);
  const [slideOut, setSlideOut] = useState(false);

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
        <div className='flex flex-col items-center justify-center text-white text-[20px] w-[320px] h-[200px] bg-gray-200 mx-auto'>
          <p>이미지를 추가해 주세요</p>
          <div> {`<클릭>`}</div>
        </div>
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
          <button className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'>
            게시하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThumbnailModal;
