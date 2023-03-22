'use client';

import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import LoginImg from '../images/loginimage2.jpg';
import Image from 'next/legacy/image';

const Page = () => {
  const router = useRouter();

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 h-full'>
        <div className='h-screen'>
          <button
            type='button'
            onClick={() => router.push('/')}
            className='mt-[9rem] px-4 cursor-pointer flex items-center hover:scale-110 duration-300'
          >
            <BiArrowBack size={32} />
            <p className='px-2'>Go Back</p>
          </button>
          <div className='mt-[6rem] max-w-[400px] w-full mx-auto p-5'>
            <h2 className='text-3xl font-thin text-center py-4 pb-6'>
              Welcome back
            </h2>
            <div className='py-2'>
              <TextField
                required
                type='email'
                id='email-login'
                label='Email'
                sx={{ width: '100%', borderRadius: '10px' }}
              />
            </div>
            <div className='py-2'>
              <TextField
                required
                type='password'
                id='password-login'
                label='Password'
                sx={{ width: '100%', borderRadius: '10px' }}
              />
            </div>
            <button className='bg-[#3BE13B] w-full p-2 my-4 rounded-lg duration-300 hover:scale-110'>
              Sign In
            </button>
            <p className='text-center text-sm text-gray-400'>
              Not a member?{' '}
              <span
                onClick={() => router.push('/getstarted')}
                className='text-blue-600 cursor-pointer hover:underline'
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
        <div className='hidden md:block md:h-screen md:relative'>
          <Image
            layout='fill'
            objectFit='cover'
            alt='login-image'
            src={LoginImg}
            width={720}
            height={900}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
