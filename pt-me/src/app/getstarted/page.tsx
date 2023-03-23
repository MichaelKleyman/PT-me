'use client';
import React from 'react';
import TextField from '@mui/material/TextField';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const Page = () => {
  const router = useRouter();

  return (
    <div className='h-screen'>
      <button
        type='button'
        onClick={() => router.push('/')}
        className='mt-[9rem] px-4 cursor-pointer flex items-center hover:scale-110 duration-300'
      >
        <BiArrowBack size={32} />
        <p className='px-2'>Go Back</p>
      </button>
      <div className='mt-[1rem] bg-[#fdfff5] dark:bg-[#434343] max-w-[900px] w-full mx-auto p-5 rounded-lg shadow-lg shadow-gray-400'>
        <h1 className='text-4xl font-bold pb-4'>
          Create a portal for your{' '}
          <span className='text-green-500'>clinic</span>.
        </h1>
        <h1 className='text-sm pb-7 text-gray-400'>
          Appointments and exercises for each patient in one convenient
          location.
        </h1>
        <form className='grid grid-cols-1 md:grid-cols-2 gap-7'>
          <TextField
            required
            type='email'
            label='Email'
            sx={{ width: '100%', borderRadius: '10px' }}
          />
          <TextField
            required
            type='name'
            label='Clinic Name'
            sx={{ width: '100%', borderRadius: '10px' }}
          />
          <TextField
            required
            type='location'
            label='Address'
            sx={{ width: '100%', borderRadius: '10px' }}
          />
          <TextField
            required
            type='password'
            label='Password'
            sx={{ width: '100%', borderRadius: '10px' }}
          />
        </form>
        <div
          className={`${roboto.className} flex items-center justify-center md:items-start mt-8`}
        >
          <button className='bg-[#3BE13B] uppercase tracking-wider rounded-lg p-2 text-[14px] duration-300 hover:scale-110 hover:bg-[#55ee55] hover:text-white dark:text-black'>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
