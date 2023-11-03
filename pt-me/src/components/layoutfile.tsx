/* eslint-disable react-hooks/exhaustive-deps */
"use client"; //this will be a client component
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../Redux/store";
import { me } from "../Redux/Features/auth/authSlice";
import Footer from "./Footer";

export default function Layoutfile({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    dispatch(me());
    setLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center mt-[20rem]'>
        <span className='loader'></span>
      </div>
    );
  }
  return (
    <>
      <Navbar2 />
      <div className='h-screen'>
        {children}
          <Footer />
      </div>
      {/* {user?.id ? <Footer /> : <Footer2 />} */}
      {/* <Footer /> */}
    </>
  );
}
