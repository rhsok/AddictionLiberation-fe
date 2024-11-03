import React, { useState } from 'react';

interface ConfirmModalType {
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  submitFunction: () => Promise<void>;
}

function ConfirmModal({ setIsModalActive, submitFunction }: ConfirmModalType) {
  const [isActive, setIsActive] = useState<boolean>();
  return (
    <div className={`fixed inset-0 flex items-center justify-center `}>
      <div className='absolute flex flex-col items-center top-20 bg-white rounded-lg w-[480px] h-[255px] border border-black'>
        <p className='mt-[38px] text-[30px] font-bold '>삭제 하시겠습니까?</p>
        <div className='flex flex-row  gap-10 mt-[70px]'>
          <button
            onClick={submitFunction}
            className='text-[22px]  px-8 py-2 rounded-xl bg-black text-white'
          >
            확 인
          </button>
          <button
            onClick={() => {
              setIsModalActive(false);
            }}
            className='text-[22px] px-8 py-2 rounded-xl bg-white border-black border'
          >
            취 소
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
