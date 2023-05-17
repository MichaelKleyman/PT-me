'use client';
import React, { useEffect, useState } from 'react';
import { CLIENT, BASE_URL } from '@/components/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import '../styles/exercises.css';
import CircularProgress from '@mui/material/CircularProgress';
import ReactPaginate from 'react-paginate';

interface Exercise {
  map: any;
  name: String;
  injuryId: Number;
  videoLink: string;
}

export default function AllExercises() {
  const [pageNumber, setPageNumber] = useState<number>(0);
  // const [loading, setLoading] = useState<Boolean>(true);
  //exercises state is an array, where each key is a exercise object
  const [exercises, setExercises] = useState<Exercise[]>([]);
  //specific exercises state is an array of objects where each key is a string and each value is a a string.
  const [specificExercise, setSpecificExercise] = useState<Exercise[]>([]);
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
    // console.log(data);
    setExercises(data);
    // setLoading(false);
    console.log('Not loading anymore');
  };

  useEffect(() => {
    getAllExercises();
  }, []);

  const filterExercises = async (exerciseType: String) => {
    setSelected(exerciseType);
    if (exerciseType === 'All') {
      getAllExercises();
      setSpecificExercise([]);
    } else {
      console.log(exerciseType);
      const fetchExerciseTypeInjuryId = {
        Shoulders: 1,
        Back: 2,
        Knee: 3,
        Hip: 4,
      };
      if (exerciseType === 'Shoulders') {
        const { data } = await CLIENT.get(
          `${BASE_URL}/api/exercises/${fetchExerciseTypeInjuryId['Shoulders']}`
        );
        setSpecificExercise(data);
      } else if (exerciseType === 'Back') {
        const { data } = await CLIENT.get(
          `${BASE_URL}/api/exercises/${fetchExerciseTypeInjuryId['Back']}`
        );
        setSpecificExercise(data);
      } else if (exerciseType === 'Knee') {
        const { data } = await CLIENT.get(
          `${BASE_URL}/api/exercises/${fetchExerciseTypeInjuryId['Knee']}`
        );
        setSpecificExercise(data);
      } else if (exerciseType === 'Hip') {
        const { data } = await CLIENT.get(
          `${BASE_URL}/api/exercises/${fetchExerciseTypeInjuryId['Hip']}`
        );
        setSpecificExercise(data);
      }
    }
  };

  const exercisesPerPage = 9;
  const pagesVisited = pageNumber * exercisesPerPage;

  const displayAllExercises = exercises
    .slice(pagesVisited, pagesVisited + exercisesPerPage)
    .map((exercise, i) => {
      return (
        <div key={i}>
          <Container className='border border-gray-200 rounded-lg'>
            <div className='p-3'>{exercise.name}</div>
            <div className='ratio ratio-1x1'>
              <iframe
                width='560'
                height='315'
                seamless
                src={exercise.videoLink}
                loading='lazy'
                referrerPolicy='same-origin'
                title='YouTube video player'
                // frameborder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                // allowfullscreen
              ></iframe>
            </div>
          </Container>
        </div>
      );
    });

  const allExercisesPageCount = Math.ceil(exercises.length / exercisesPerPage);

  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
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
          >
            {option}
          </button>
        ))}
      </div>
      <ReactPaginate
        previousLabel='Previous'
        nextLabel='Next'
        pageCount={allExercisesPageCount}
        onPageChange={changePage}
        containerClassName='paginationBttns'
        previousClassName='previousBttn'
        nextLinkClassName='nextBttn'
        activeClassName='paginationActive'
      />
      <div className='mt-3 w-[100%] p-3 grid sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {selected === 'All' && displayAllExercises}
        {/* exercises.map((exercise: Exercise, i: number) => (
             <div key={i}>
               <Container className='border border-gray-200 rounded-lg'>
                 <div className='p-3'>{exercise.name}</div>
                 <div className='ratio ratio-1x1'>
                   <iframe
                     width='560'
                     height='315'
                     seamless
                     src={exercise.videoLink}
                     loading='lazy'
                     referrerPolicy='same-origin'
                     title='YouTube video player'
                      frameborder='0'
                     allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowfullscreen
                   ></iframe>
                   {/* {loading ? (
                     <iframe
                       width='560'
                       height='315'
                       src={exercise.videoLink}
                       loading='eager'
                       referrerPolicy='same-origin'
                       title='YouTube video player'
                        frameborder='0'
                       allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowfullscreen
                     ></iframe>
                   ) : (
                     <CircularProgress />
                   )} */}
      </div>
      <div className='mt-3 w-[100%] p-3 grid sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {specificExercise.length ? (
          specificExercise.map((exercise: Exercise, i) => (
            <Container key={i} className='border border-gray-200 rounded-lg'>
              <div className='p-3'>{exercise.name}</div>
              <div className='ratio ratio-1x1'>
                {/* {loading ? (
                  <iframe
                    width='560'
                    height='315'
                    src={exercise.videoLink}
                    referrerPolicy='same-origin'
                    title='YouTube video player'
                    // frameborder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    // allowfullscreen
                  ></iframe>
                ) : (
                  <CircularProgress />
                )} */}
                <iframe
                  width='560'
                  loading='lazy'
                  seamless
                  height='315'
                  src={exercise.videoLink}
                  referrerPolicy='same-origin'
                  title='YouTube video player'
                  // frameborder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  // allowfullscreen
                ></iframe>
              </div>
            </Container>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
