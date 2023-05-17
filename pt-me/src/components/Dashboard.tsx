import React from 'react';
// import YouTube from 'react-youtube';

export default function Dashboard({ clinicName }: any) {
  return (
    <div>
      <p className='text-xl tracking-widest font-bold uppercase'>
        {clinicName} <span className='text-green-500'>Dashboard</span>
      </p>
      <div></div>
    </div>
  );
}
