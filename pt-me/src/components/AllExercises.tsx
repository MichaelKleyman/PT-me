'use client';
import React, { useEffect, useState } from 'react';
import { CLIENT, BASE_URL } from '@/components/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import '../styles/exercises.css';

interface Exercise {
  map: any;
  name: String;
  injuryId: Number;
  videoLink: string;
}

export default function AllExercises() {
  //exercises state is an array, where each key is a exercise object
  const [exercises, setExercises] = useState<Exercise[]>([]);
  //specific exercises state is an array of objects where each key is a string and each value is a a string.
  const [specificExercise, setSpecificExercise] = useState<Array<Exercise[]>>(
    []
  );
  const [exerciseOptions, setOptions] = useState<String[]>([
    'All',
    'Shoulders',
    'Back',
    'Knee',
    'Hip',
  ]);
  const [selected, setSelected] = useState<String>('All');

  const getAllExercises = async () => {
    const { data } = await CLIENT.get(`${BASE_URL}/api/exercises`);
    console.log(data);
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
      console.log(exerciseType);
      // const arr = exercises[filteredExerciseType[0]];
      // setSpecificExercise([arr] as any);
    }
  };

  return (
    <div>
      <h1 className='text-green-500 text-xl uppercase tracking-widest'>
        Exercises
      </h1>
      <div className='mt-1 flex'>
        {/* <button
          // onClick={() => filterExercises('All')}
          className={`${
            selected === 'All' ? 'bg-green-500 text-white' : ''
          } p-2 cursor-pointer border border-green-500 m-2 rounded-lg hover:bg-green-500 hover:text-white`}
        >
          All
        </button> */}
        {exerciseOptions.map((option: String, i) => (
          <button
            onClick={() => filterExercises(option)}
            key={i}
            className={`${
              selected === option ? 'bg-green-500 text-white' : ''
            } p-2 cursor-pointer border border-green-500 m-2 rounded-lg hover:bg-green-500 hover:text-white`}
            // className='p-2 cursor-pointer border border-green-500 m-2 rounded-lg hover:bg-green-500 hover:text-white'
          >
            {option}
          </button>
        ))}
      </div>
      <div className=' mt-3 w-[100%] p-3 grid sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {exercises.map((exercise: Exercise, i: number) => (
          <div key={i}>
            <Container key={i} className='border border-gray-200 rounded-lg'>
              <div className='p-3'>{exercise.name}</div>
              <div className='ratio ratio-1x1'>
                <iframe
                  width='560'
                  height='315'
                  // src={exercise.videoLink}
                  title='YouTube video player'
                  // frameborder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  // allowfullscreen
                ></iframe>
              </div>
            </Container>
          </div>
        ))}
      </div>
    </div>
  );
}
