import React from 'react';
import Image from 'next/image';
import PtImage from '../app/images/homepage.jpg';

const AboutUs = () => {
  return (
    <section id='about-us'>
      <div className='flex flex-col text-center items-center justify-center my-10 py-16'>
        <div className='w-[100%] md:mt-2'>
          <Image src={PtImage} alt='/' width={1300} height={1300} />
        </div>
        <div className='py-8'>
          <h1>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </h1>
          <p>erherherhe</p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
