'use client';
import React, { useEffect } from 'react';
import AboutUs from '@/components/AboutUs';
import Services from '@/components/Services';
import { Inter } from 'next/font/google';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './Redux/store';
import { me } from './Redux/Features/auth/authSlice';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  // console.log(user);

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <main className='mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl mt-[10rem]'>
      {!user?.id ? (
        <React.Fragment>
          <AboutUs />
          <Services />
        </React.Fragment>
      ) : (
        <div>{user.clinicName} Dashboard</div>
      )}
    </main>
  );
}
