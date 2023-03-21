import React from 'react';
import Image from 'next/image';
import PtImage from '../app/images/homepage.jpg';

const AboutUs = () => {
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
    </section>
  );
};

export default AboutUs;
