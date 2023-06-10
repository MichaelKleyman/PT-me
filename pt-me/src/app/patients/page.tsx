'use client';
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import patients from '@/components/Patients';
import { IoIosArrowForward } from 'react-icons/io';
import Link from 'next/link';

export default function page() {
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  return (
    <div className='mt-[2rem] ml-[6rem] p-9'>
      <h1 className='text-xl tracking-widest font-bold uppercase'>
        <span className='text-green-500'>Patients</span> in your clinic
      </h1>
      <div className='mt-8'>
        <h1>
          Total Number of Patients: <span>{patients.length}</span>
        </h1>
      </div>
      <div className='mt-8'>
        <div className='grid md:grid-cols-5 gap-6 place-items-center text-gray-400 text-sm'>
          <></>
          <h1>Name</h1>
          <h1>Address</h1>
          <h1>Phone Number</h1>
          <h1>Reason For Visit</h1>
        </div>
        {patients.map((patient, i) => (
          <div
            key={i}
            className='bg-[#fdfff5] grid md:grid-cols-5 gap-6 place-items-center p-8 m-5 shadow-xl shadow-gray-400 rounded-lg'
          >
            <div className='flex items-center gap-5'>
              <Stack direction='row' spacing={2}>
                <Avatar
                  {...stringAvatar(patient.title)}
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: `${stringToColor(patient.title)}`,
                  }}
                />
              </Stack>
              <p className='font-bold'>{patient.title}</p>
            </div>
            <p>{patient.address}</p>
            <p>{patient.phoneNumber}</p>
            <p>{patient.reasonForVisit}</p>
            <Link
              href={`/patient/${patient.id}`}
              className='bg-[#f7fddf] flex items-center justify-center border border-[#3BE13B] p-1 rounded-lg w-[50%] cursor-pointer hover:scale-110 duration-300 hover:bg-[#3BE13B] hover:text-white'
            >
              View
              <IoIosArrowForward className='p-2' size={30} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
