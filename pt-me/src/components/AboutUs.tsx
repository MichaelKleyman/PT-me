'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PtImage from '../app/images/homepage.jpg';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get('/api/route');
    console.log('>>>', response.data);
  } catch (error) {
    console.error('Fetch error: ', error);
  }
};

const AboutUs = () => {
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id='about-us'>
      <div className='flex flex-col text-center items-center justify-center my-10 py-16 h-full'>
        <div className='w-[100%] md:mt-2'>
          <Image src={PtImage} alt='/' width={1300} height={1300} />
        </div>
        <div className='py-8'>
          <p>
            Physical Therapists can quickly build personalized treatment and
            exercise plans for patients. Abstract the process of piles of
            paperwork with treatments and have a catered portal to your clinic
            with the necessary information to make a seemless visit for the
            patient.
          </p>
          <h1 className='py-3 text-green-500 font-bold text-xl'>
            We provide immediate access to perform onsite PT on any logged in
            device
          </h1>
        </div>
      </div>
      <div
        onClick={() => router.push('/login')}
        className='flex items-center justify-center'
      >
        <div className='md:hidden bg-[#3BE13B] p-2 rounded-xl w-[60%] text-center font-bold duration-300 hover:scale-110 '>
          <button>Take me to my portal</button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
