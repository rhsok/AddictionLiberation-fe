import React from 'react';

function MainPage() {
  return (
    <div className='flex justify-center w-full h-full bg-white '>
      <div className='flex flex-row w-[1440px] h-full border'>
        <div className='flex  w-full mt-10'>
          <div className='w-[300px] h-[400px] bg-zinc-600'></div>
          <div className='w-[600px] h-[400px]'></div>
        </div>
        <div className='w-[315px] h-[932px] border border-black'></div>
      </div>
    </div>
  );
}

export default MainPage;
