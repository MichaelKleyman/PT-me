'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout, me } from '@/app/Redux/Features/auth/authSlice';
import { AppDispatch, RootState } from '../Redux/store';

type Obj = {
  id: Number;
};

type Params = {
  params: Obj;
};

export default function Account({ params }: Params) {
  const dispatch = useDispatch<AppDispatch>();
  const clinic = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  // console.log(clinic);

  useEffect(() => {
    async function getClinic() {
      await dispatch(me());
    }
    getClinic();
  }, []);

  const handleLogout = () => {
    try {
      router.push('/');
      dispatch(logout);
    } catch (error) {
      console.error('UH OH: ', error);
    }
  };

  return (
    <div className='px-4 sm:px-6 mt-[10rem]'>
      <p>Clinic ID: {params.id.toString()}</p>
      <p>Clinic Name: {clinic?.clinicName}</p>
      <p>Clinic Address: {clinic?.address}</p>
      <p>Clinic Email: {clinic?.email}</p>
      <button
        onClick={handleLogout}
        className='duration-300 hover:scale-110 cursor-pointer hover:bg-slate-200 p-2 rounded-lg bg-[#3BE13B] my-2'
      >
        Log out
      </button>
    </div>
  );
}
