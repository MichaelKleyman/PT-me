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

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const clinic = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    async function fetchData() {
      await dispatch(me());
      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center p-9 h-screen'>
        <span className='loader'></span>
      </div>
    );
  }
  return (
    <main className='mx-auto px-4 sm:px-6 mt-[5rem] text-center'>
      {!clinic?.id ? (
        <React.Fragment>
          <AboutUs />
          <Services />
        </React.Fragment>
      ) : (
        <div className='md:ml-[6rem]'>
          <Dashboard clinicName={clinic.clinicName} />
        </div>
      )}
    </main>
  );
}
