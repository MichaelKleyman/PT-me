/* eslint-disable react-hooks/exhaustive-deps */
'use client'; //this will be a client component
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../Redux/store';
import { me } from '../Redux/Features/auth/authSlice';

export default function Layoutfile({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <>
      <Navbar2 />
      {children}
    </>
  );
}
