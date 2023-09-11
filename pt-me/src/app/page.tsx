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
  const dispatch = useDispatch<AppDispatch>();
  const clinic = useSelector((state: RootState) => state.auth.user);
  // console.log(user);

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <main className='mx-auto max-w-3xl px-4 ml-[6rem] sm:px-6 md:max-w-[1300px] mt-[5rem]'>
      {!clinic?.id ? (
        <React.Fragment>
          <AboutUs />
          <Services />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Dashboard clinicName={clinic.clinicName} />
        </React.Fragment>
      )}
    </main>
  );
}
