import React, { ReactElement } from 'react';
import { Quicksand } from '@next/font/google';
import { IoMdFitness, IoIosFastforward } from 'react-icons/io';

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '700'],
});

interface Service {
  logo: ReactElement;
  service: string;
}

const services: Array<Service> = [
  { logo: <IoMdFitness size={30} color='blue' />, service: 'Fitness' },
  { logo: <IoIosFastforward size={30} color='blue' />, service: 'Speed' },
  { logo: <IoMdFitness size={30} />, service: 'fitness' },
  { logo: <IoMdFitness size={30} />, service: 'fitness' },
];

const Services = () => {
  return (
    <section id='services' className='w-full md:h-screen my-12 py-[12rem]'>
      <div className={quicksand.className}>
        <h1
          className='text-center
         text-green-700'
        >
          Our Services
        </h1>
        <h1 className='text-center font-bold text-4xl text-green-700 pt-3'>
          Services For Your Clinic
        </h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 place-content-center py-8'>
        {services.map((service, i) => (
          <div
            key={i}
            className='w-full h-full shadow-lg shadow-gray-400 rounded-lg p-4 duration-300 hover:scale-110'
          >
            <div>{service.logo}</div>
            <h1 className='font-bold py-4'>{service.service}</h1>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
