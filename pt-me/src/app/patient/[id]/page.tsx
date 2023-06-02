/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useState, useEffect } from 'react';
import patients from '@/components/Patients';

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
  reasonForVisit: string;
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

  return <div className='mt-[2rem] ml-[6rem] p-9'>{params.id.toString()}</div>;
}
// /Users/michaelkleyman/Documents/Web development/PT-me/pt-me/src/app/patient/id/page.tsx
