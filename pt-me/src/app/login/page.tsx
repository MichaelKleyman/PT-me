'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../Redux/store';
import { login, me } from '../Redux/Features/auth/authSlice';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import LoginImg from '../images/loginimage2.jpg';
import Image from 'next/legacy/image';

interface Credentials {
  email: String;
  password: String;
}

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newObject = { ...credentials, [e.target.name]: e.target.value };
    setCredentials(newObject);
  };

  useEffect(() => {
    if (user && user.errorStatus === 'Unauthorized') {
      setError('Incorrect email or password.');
    } else {
      setError('');
    }
  }, [user]);

  const loginUser = async () => {
    // If fields are empty, show error message
    if (!credentials.email.length || !credentials.password.length) {
      setError('Fill in all fields.');
      console.log('Fill in all fields!');
      return;
    }

    // Dispatch the login action and wait for the response
    const response = await dispatch(login(credentials));

    // If the login is unsuccessful, show an error message
    if (response.payload?.errorStatus === 'Unauthorized') {
      setError('Incorrect email or password.');
      console.log('There was an error!');
      return;
    }

    // If the login is successful, clear the error message and navigate to the dashboard
    setError('');
    console.log('Logging in');
    router.push('/');
    // Here you can navigate to the dashboard or any other page of your app
  };

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
                name='email'
                onChange={handleChange}
                value={credentials.email}
                id='email-login'
                label='Email'
                sx={{ width: '100%', borderRadius: '10px' }}
              />
            </div>
            <div className='py-2'>
              <TextField
                required
                type='password'
                name='password'
                onChange={handleChange}
                value={credentials.password}
                id='password-login'
                label='Password'
                sx={{ width: '100%', borderRadius: '10px' }}
              />
            </div>
            <button
              onClick={loginUser}
              className='bg-[#3BE13B] w-full p-2 my-4 rounded-lg duration-300 hover:scale-110'
            >
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
            {error && (
              <div className='text-red-600 m-3 text-center'>{error}*</div>
            )}
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
