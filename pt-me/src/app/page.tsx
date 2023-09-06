/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import { Inter } from "next/font/google";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../Redux/store";
import { me } from "../Redux/Features/auth/authSlice";
import Dashboard from "@/components/Dashboard";
import CircularProgress from "@mui/material/CircularProgress";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  // console.log(user);

  useEffect(() => {
    dispatch(me());
    setLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center mt-[20rem]'>
        <CircularProgress />
      </div>
    );
  }
  return (
    <main className='mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl mt-[5rem]'>
      {!user?.id ? (
        <React.Fragment>
          <AboutUs />
          <Services />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Dashboard clinicName={user.clinicName} />
        </React.Fragment>
      )}
    </main>
  );
}
