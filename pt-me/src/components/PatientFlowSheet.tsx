'use client';
import { useEffect, useState } from 'react';
import { MdOutlineTipsAndUpdates } from 'react-icons/md';
import { FaExpand } from 'react-icons/fa';
import { CLIENT, BASE_URL } from './api';

interface Id {
  patientId: string;
}

interface exercise {
  id: number;
  injuryId: number;
  description: string;
  name: string;
  musclesWorked: string;
  tips: string;
  videoLink: string;
}

interface scheduleExercise {
  id: number;
  date: Date;
  exerciseId: number;
  sets: number;
  reps: number;
  scheduleId: number;
  exercise: exercise;
}

interface Schedule {
  id: number;
  patientId: number;
  exercises: scheduleExercise[];
}

export default function PatientFlowSheet({ patientId }: Id) {
  const [schedule, setSchedule] = useState<Schedule>();

  useEffect(() => {
    async function getSchedule() {
      const { data } = await CLIENT.get(
        `${BASE_URL}/api/schedule/patient/${patientId}`
      );
      console.log(data);
    }
    getSchedule();
  });

  return (
    <div className='bg-[#fdfff5] p-7 shadow-lg shadow-gray-200 rounded-md w-[70%] text-lg uppercase tracking-widest overflow-y-scroll overflow-x-scroll'>
      <div className='flex items-center justify-between'>
        <h1>Schedule</h1>
        <div className='flex justify-between items-center gap-2'>
          <button className='text-[15px] text-blue-500 flex items-center hover:bg-[#fdfff5] hover:shadow-lg hover:shadow-gray-300 rounded-lg p-2 duration-300 hover:scale-110 cursor-pointer'>
            <FaExpand className='p-2' size={35} />
            Expand
          </button>
          <button className='text-[15px] text-blue-500 flex items-center hover:bg-[#fdfff5] hover:shadow-lg hover:shadow-gray-300 rounded-lg p-2 duration-300 hover:scale-110 cursor-pointer'>
            <MdOutlineTipsAndUpdates className='p-2' size={35} />
            Update
          </button>
        </div>
      </div>
      <table className='table-auto mt-4'>
        <thead>
          <tr>
            <th className='border border-green-500 px-6 py-4'></th>
            {Array.from({ length: 6 }).map((_, colIndex) => (
              <th key={colIndex} className='border border-green-500 px-6 py-4'>
                Date {colIndex + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className='border border-green-500 px-6 py-4'>Exercise</th>
            {Array.from({ length: 6 }).map((_, colIndex) => (
              <td key={colIndex} className='border border-green-500 px-6 py-4'>
                5 x 30
              </td>
            ))}
          </tr>
          {Array.from({ length: 6 - 1 }).map((_, rowIndex) => (
            <tr key={rowIndex + 1}>
              <th className='border border-green-500 px-6 py-4'>Exercise</th>
              {Array.from({ length: 6 }).map((_, colIndex) => (
                <td
                  key={colIndex}
                  className='border border-green-500 px-6 py-4'
                >
                  5 x 30
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
