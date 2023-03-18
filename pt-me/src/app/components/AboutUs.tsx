import React from 'react';
import Image from 'next/image';
import PtImage from '../images/homepage.jpg';

const AboutUs = () => {
  return (
    <section id='about-us'>
      <div className='flex flex-col text-center items-center justify-center'>
        <div>
          <Image src={PtImage} alt='/' width={300} height={300} />
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default AboutUs;
