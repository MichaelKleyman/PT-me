'use client';
import React, { useEffect, useState } from 'react';
import { CLIENT, BASE_URL } from '@/components/api';

export default function Exercises() {
  const [exercises, setExercises] = useState<any>({});
  const [selected, setSelected] = useState<String>('All');

  useEffect(() => {
    async function getExercises() {
      const { data } = await CLIENT.get(`${BASE_URL}/api/exercises`);
      setExercises(data);
    }
    getExercises();
  }, []);

  console.log(exercises);

  return (
    <div>
      <h1 className='text-green-500 text-xl uppercase tracking-widest'>
        Exercises
      </h1>
      <div className='mt-1 flex'>
        <div
          className={`${
            selected === 'All' ? 'bg-green-500 text-white' : ''
          } p-2 cursor-pointer border border-green-500 m-2 rounded-lg hover:bg-green-500 hover:text-white`}
        >
          All
        </div>
        {Object.keys(exercises).map((exerciseType, i) => (
          <button
            onClick={() => setSelected(exerciseType)}
            key={i}
            className={`${
              selected === exerciseType ? 'bg-green-500 text-white' : ''
            } p-2 cursor-pointer border border-green-500 m-2 rounded-lg hover:bg-green-500 hover:text-white`}
          >
            {exerciseType}
          </button>
        ))}
      </div>
      <div>{selected}</div>
    </div>
  );
}
