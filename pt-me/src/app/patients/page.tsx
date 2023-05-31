import React from 'react';
import patients from '@/components/Patients';

export default function page() {
  console.log(patients);

  return (
    <div className='mt-[2rem] ml-[6rem] p-9'>
      <h1 className='text-xl tracking-widest font-bold uppercase'>
        <span className='text-green-500'>Patients</span> in your clinic
      </h1>
      <div className='mt-8'>
        <div className='grid md:grid-cols-4 gap-6 place-items-center text-gray-400'>
          <h1>Name</h1>
          <h1>Address</h1>
          <h1>Phone Number</h1>
          <h1>Reason For Visit</h1>
        </div>
        {patients.map((patient, i) => (
          <div
            key={i}
            className='bg-[#fdfff5] grid md:grid-cols-4 gap-6 place-items-center p-8 m-5 shadow-xl shadow-gray-400 rounded-lg'
          >
            <p>{patient.name}</p>
            <p>{patient.address}</p>
            <p>{patient.phoneNumber}</p>
            <p>{patient.reasonForVisit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
