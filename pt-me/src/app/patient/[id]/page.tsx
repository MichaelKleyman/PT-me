/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useState, useEffect } from 'react';
import patients from '@/components/Patients';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { GrCalendar } from 'react-icons/gr';
import { BsDot } from 'react-icons/bs';

type Obj = {
  id: Number;
};

type Params = {
  params: Obj;
};

interface Patient {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  reasonForVisit: string;
  age: string;
  injuryId: number;
}

export default function Patient({ params }: Params) {
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const selectedPatient = patients.filter(
      (elem) => elem.id === Number(params.id)
    );
    setPatient(selectedPatient[0]);
  }, []);

  function stringToColor(string: string) {
    if (!string) return '';
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
    const sanitizedName = name || '';

    return {
      sx: {
        bgcolor: stringToColor(sanitizedName),
      },
      children: `${sanitizedName.split(' ')[0][0]}${name.split(' ')[1]?.[0]}`,
    };
  }

  return (
    <div className='mt-[2rem] ml-[6rem] p-9'>
      <div className='bg-[#fdfff5] p-7 shadow-lg shadow-gray-200 rounded-md'>
        <div className='grid lg:grid-cols-2'>
          <div className='flex gap-6 w-full'>
            <Stack direction='row' spacing={2}>
              <Avatar
                {...stringAvatar(patient?.name || '')}
                sx={{
                  width: 86,
                  height: 86,
                  bgcolor: `${stringToColor(patient?.name || '')}`,
                  fontSize: '2rem',
                }}
              />
            </Stack>
            <div>
              <h1 className='font-medium text-[1.6rem] tracking-wider'>
                {patient?.name}
              </h1>
              <div className='flex flex-col md:flex-row md:items-center md:justify-between mt-3'>
                <p>Age: {patient?.age}</p>
                <p>Lorem Ipsum</p>
                <p>Lorem Ipsum</p>
              </div>
              <div className='mt-3 text-[12px] grid grid-cols-2 place-content-between'>
                <div className='flex items-center'>
                  <GrCalendar className='pr-2' size={25} />
                  Arrived June 1, 2022
                </div>
                <div>
                  <h2 className='tracking-wide flex items-center'>
                    Status{' '}
                    <span className='flex items-center'>
                      {' '}
                      <BsDot size={50} color='#c3e736' /> Checked in
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-center w-full'>
            <div className='border border-green-300 rounded-lg h-10 p-2 text-center text-xs md:text-base'>
              {patient?.phoneNumber}
            </div>
            <div className='border border-green-300 rounded-lg h-10 p-2 text-center text-xs md:text-base'>
              {patient?.email}
            </div>
            <div className='border border-green-300 rounded-lg h-10 p-2 text-center text-xs md:text-base'>
              {patient?.reasonForVisit}
            </div>
          </div>
        </div>
        {/* <div className='flex flex-col gap-8'>
          <div className='flex flex-col md:flex-row md:items-center md:gap-8'>
            <Stack direction='row' spacing={2}>
              <Avatar
                {...stringAvatar(patient?.name || '')}
                sx={{
                  width: 86,
                  height: 86,
                  bgcolor: `${stringToColor(patient?.name || '')}`,
                  fontSize: '2rem',
                }}
              />
            </Stack>
            <div className='w-full md:w-[27%]'>
              <h1 className='font-medium text-[1.6rem] tracking-wider'>
                {patient?.name}
              </h1>
              <div className='flex flex-col md:flex-row md:items-center md:justify-between mt-3'>
                <p>Age: {patient?.age}</p>
                <p>Lorem Ipsum</p>
                <p>Lorem Ipsum</p>
              </div>
              <div className='mt-3 text-[12px] grid grid-cols-2 place-content-between'>
                <div className='flex items-center'>
                  <GrCalendar className='pr-2' size={25} />
                  Arrived June 1, 2022
                </div>
                <div>
                  <h2 className='tracking-wide flex items-center'>
                    Status{' '}
                    <span className='flex items-center'>
                      {' '}
                      <BsDot size={50} color='#c3e736' /> Checked in
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-2 md:ml-[12rem]'>
            <div className='border border-green-300 rounded-lg h-10 p-2 text-center text-xs md:text-base'>
              {patient?.phoneNumber}
            </div>
            <div className='border border-green-300 rounded-lg h-10 p-2 text-center text-xs md:text-base'>
              {patient?.email}
            </div>
            <div className='border border-green-300 rounded-lg h-10 p-2 text-center text-xs md:text-base'>
              {patient?.reasonForVisit}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
// /Users/michaelkleyman/Documents/Web development/PT-me/pt-me/src/app/patient/id/page.tsx
