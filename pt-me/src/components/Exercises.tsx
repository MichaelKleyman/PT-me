'use client';
import React, { useEffect, useState } from 'react';
import { CLIENT, BASE_URL } from '@/components/api';

interface Exercise {
  name: String;
}

export default function Exercises() {
  const [exercises, setExercises] = useState<Record<string, Exercise>>({});
  const [specificExercise, setSpecificExercise] = useState<Array<Exercise>>([]);
  const [selected, setSelected] = useState<String>('All');

  const getAllExercises = async () => {
    const { data } = await CLIENT.get(`${BASE_URL}/api/exercises`);
    setExercises(data);
  };

  useEffect(() => {
    getAllExercises();
  }, []);

  const filterExercises = (exerciseType: String) => {
    setSelected(exerciseType);
    if (exerciseType === 'All') {
      getAllExercises();
      setSpecificExercise([]);
    } else {
      const filteredExerciseType = Object.keys(exercises).filter((exercise) => {
        if (exercise === exerciseType) {
          return exercise;
        }
      });
      setSpecificExercise(exercises[filteredExerciseType[0]]);
    }
  };
  console.log('Exercises: ', exercises);
  console.log('Specific Exercise: ', specificExercise);

  return (
    <div>
      <h1 className='text-green-500 text-xl uppercase tracking-widest'>
        Exercises
      </h1>
      <div className='mt-1 flex'>
        <button
          onClick={() => filterExercises('All')}
          className={`${
            selected === 'All' ? 'bg-green-500 text-white' : ''
          } p-2 cursor-pointer border border-green-500 m-2 rounded-lg hover:bg-green-500 hover:text-white`}
        >
          All
        </button>
        {Object.keys(exercises).map((exerciseType, i) => (
          <button
            onClick={() => filterExercises(exerciseType)}
            key={i}
            className={`${
              selected === exerciseType ? 'bg-green-500 text-white' : ''
            } p-2 cursor-pointer border border-green-500 m-2 rounded-lg hover:bg-green-500 hover:text-white`}
          >
            {exerciseType}
          </button>
        ))}
      </div>
      <div>
        {specificExercise.length ? (
          <>
            {specificExercise.map((exercise: any, i: any) => (
              <div key={i}>{exercise.name}</div>
            ))}
          </>
        ) : (
          <>
            {Object.keys(exercises).map((exercise: any, i: any) => (
              <div key={i}>{exercise}</div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
