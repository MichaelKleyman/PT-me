'use client';
import React, { useEffect, useState } from 'react';
import { CLIENT, BASE_URL } from '@/components/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import '../styles/exercises.css';

interface Exercise {
  map: any;
  name: String;
}

export default function Exercises() {
  //exercises state is an object, where each key is a string and each value is an array of objects
  const [exercises, setExercises] = useState<Record<string, Exercise>>({});
  //specific exercises state is an array of objects where each key is a string and each value is a a string.
  const [specificExercise, setSpecificExercise] = useState<Array<Exercise[]>>(
    []
  );
  const [selected, setSelected] = useState<String>('All');

  const getAllExercises = async () => {
    const { data } = await CLIENT.get(`${BASE_URL}/api/exercises`);
    // console.log(data);
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
      const filteredExerciseType = Object.keys(exercises).filter(
        (exercise: String) => {
          if (exercise === exerciseType) {
            return exercise;
          }
        }
      );
      // console.log(exercises);
      const arr = exercises[filteredExerciseType[0]];
      setSpecificExercise([arr] as any);
    }
  };

  console.log('Specific Exercise: ', specificExercise);
  // specificExercise.forEach((elem) => {
  //   console.log(elem);
  // });

  return (
    <div id='exercises-container'>
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
      <div className='border border-gray-200 mt-3 w-[100%]'>
        {specificExercise.length ? (
          <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-8 mt-3 m-5'>
            {specificExercise[0].map((exercise: Exercise, i: any) => (
              <Container key={i} className='border border-gray-200 rounded-lg'>
                <div className='p-3'>{exercise.name}</div>
                <div className='ratio ratio-1x1'>
                  <iframe
                    src='https://www.youtube.com/embed/zpOULjyy-n8?rel=0'
                    title='YouTube video'
                    // allowfullscreen
                  ></iframe>
                </div>
              </Container>
            ))}
          </div>
        ) : (
          <>
            {Object.keys(exercises).map((exercise: any, i: any) => (
              <div key={i} className='grid sm:grid-cols-2 md:grid-cols-4 gap-8'>
                {exercises[exercise].map((exercise: Exercise, i: any) => (
                  <Container
                    key={i}
                    className='border border-gray-200 rounded-lg'
                  >
                    <div className='p-3'>{exercise.name}</div>
                    <div className='ratio ratio-1x1'>
                      <iframe
                        src='https://www.youtube.com/embed/zpOULjyy-n8?rel=0'
                        title='YouTube video'
                        allowFullScreen
                      ></iframe>
                    </div>
                  </Container>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
