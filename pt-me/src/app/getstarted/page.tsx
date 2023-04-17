'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../Redux/store';
import { signup } from '../Redux/Features/auth/authSlice';
import TextField from '@mui/material/TextField';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { Roboto } from 'next/font/google';
import { AnyAction } from 'redux';
// import axios from 'axios';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

interface Credentials {
  email: String;
  clinicName: String;
  address: String;
  password: String;
}

// const createUser = async (credentials: Credentials) => {
//   try {
//     console.log(credentials);
//     await axios.post('http://localhost:3001/api/users', credentials);
//   } catch (error) {
//     console.error(error as Error);
//   }
// };

const Page = () => {
  // const method = 'signup';
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [credentials, setCredentials] = useState({
    email: '',
    clinicName: '',
    address: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newObject = { ...credentials, [e.target.name]: e.target.value };
    setCredentials(newObject);
  };

  const makeUser = () => {
    // await createUser(credentials);
    console.log(credentials);
    dispatch(signup(credentials));
  };

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
      <div className='mt-[1rem] bg-[#fdfff5] dark:bg-[#2f2d2d] max-w-[900px] w-full mx-auto p-5 rounded-lg shadow-lg shadow-gray-400'>
        <h1 className='text-4xl font-bold pb-4'>
          Create a portal for your{' '}
          <span className='text-green-500'>clinic</span>.
        </h1>
        <h1 className='text-sm pb-7 text-gray-400'>
          Appointments and exercises for each patient in one convenient address.
        </h1>
        <form className='grid grid-cols-1 md:grid-cols-2 gap-7'>
          <TextField
            required
            type='email'
            name='email'
            value={credentials.email}
            onChange={handleChange}
            label='Email'
            sx={{ width: '100%', borderRadius: '10px' }}
          />
          <TextField
            required
            type='name'
            value={credentials.clinicName}
            name='clinicName'
            onChange={handleChange}
            label='Clinic Name'
            sx={{ width: '100%', borderRadius: '10px' }}
          />
          <TextField
            required
            type='address'
            value={credentials.address}
            name='address'
            onChange={handleChange}
            label='Address'
            sx={{ width: '100%', borderRadius: '10px' }}
          />
          <TextField
            required
            type='password'
            value={credentials.password}
            name='password'
            onChange={handleChange}
            label='Password'
            sx={{ width: '100%', borderRadius: '10px' }}
          />
        </form>
        <div
          onClick={makeUser}
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
