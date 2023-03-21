'use client';

import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();

  return (
    <div id='log-in'>
      <button
        type='button'
        onClick={() => router.push('/')}
        className='mt-[10rem] px-4 cursor-pointer flex items-center hover:scale-110 duration-300'
      >
        <BiArrowBack size={32} />
        <p className='px-2'>Go Back</p>
      </button>
      <div className='mt-[8rem]'>
        <div className='bg-[#fdfff5] max-w-[400px] w-full mx-auto rounded-xl shadow-xl p-5'>
          <h2 className='text-3xl font-thin text-center py-4'>Welcome back</h2>
        </div>
      </div>
    </div>
  );
};

export default page;
