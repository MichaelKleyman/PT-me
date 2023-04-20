'use client';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/Redux/Features/auth/authSlice';
import { AppDispatch } from '../Redux/store';

type Obj = {
  id: Number;
};

type Params = {
  params: Obj;
};

export default function Account(User: Params) {
  const { params } = User;
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  // console.log(params.id);

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
      <p>Clinic ID: {params.id}</p>
      <button
        onClick={handleLogout}
        className='duration-300 hover:scale-110 cursor-pointer hover:bg-slate-200 p-2 rounded-lg bg-[#3BE13B] my-2'
      >
        Log out
      </button>
    </div>
  );
}
