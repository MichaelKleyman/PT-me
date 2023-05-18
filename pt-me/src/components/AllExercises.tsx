'use client';
import React, { useEffect, useState } from 'react';
import { CLIENT, BASE_URL } from '@/components/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import '../styles/exercises.css';
import CircularProgress from '@mui/material/CircularProgress';
import ReactPaginate from 'react-paginate';
import TextField from '@mui/material/TextField';
import { BsSearch } from 'react-icons/bs';
import InputAdornment from '@mui/material/InputAdornment';
import Iframe from 'react-iframe';

interface Exercise {
  map: any;
  name: String;
  injuryId: Number;
  videoLink: string;
}

const style = {
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#3BE13B',
    },
  },
  width: '50%',
};

export default function AllExercises() {
  const [searchInput, setSearchInput] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageNumber2, setPageNumber2] = useState<number>(0);
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
    setExercises(data);
    // setLoading(false);
  };

  useEffect(() => {
    getAllExercises();
  }, []);

  const filterExercises = async (exerciseType: String) => {
    setSelected(exerciseType);
    setPageNumber(0);
    setPageNumber2(0);
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
  const pagesVisited2 = pageNumber2 * exercisesPerPage;

  const displaySpecificExercise = specificExercise
    .slice(pagesVisited2, pagesVisited2 + exercisesPerPage)
    .map((exercise, i) => {
      return (
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
            <Iframe url={exercise.videoLink} width='560' height='315' />
          </div>
        </Container>
      );
    });

  const displayAllExercises = exercises
    .slice(pagesVisited, pagesVisited + exercisesPerPage)
    .map((exercise, i) => {
      return (
        <div key={i}>
          <Container className='border border-gray-200 rounded-lg'>
            <div className='p-3'>{exercise.name}</div>
            <div className='ratio ratio-1x1'>
              <Iframe url={exercise.videoLink} width='560' height='315' />
            </div>
          </Container>
        </div>
      );
    });

  const allExercisesPageCount = Math.ceil(exercises.length / exercisesPerPage);
  const specificExercisesPageCount = Math.ceil(
    specificExercise.length / exercisesPerPage
  );

  const changePageForAllExercises = ({ selected }: any) => {
    setPageNumber(selected);
    window.scrollTo({ top: 0 });
  };

  const changePageForSpecificExercises = ({ selected }: any) => {
    setPageNumber2(selected);
    window.scrollTo({ top: 0 });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <h1 className='text-green-500 text-xl uppercase tracking-widest m-4'>
        Exercises
      </h1>
      <div className='mt-1 flex'>
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
      <div className='flex items-center justify-center'>
        <TextField
          id='outlined-search'
          value={searchInput}
          onChange={handleSearch}
          type='search'
          focused
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <BsSearch color='#3BE13B' />
              </InputAdornment>
            ),
          }}
          sx={style}
          placeholder='Search Exercises'
        />
      </div>
      <div className='mt-3 w-[100%] p-3 grid sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {selected === 'All' && displayAllExercises}
      </div>
      <div className='mt-3 w-[100%] p-3 grid sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {selected !== 'All' && displaySpecificExercise}
      </div>
      {selected === 'All' ? (
        <div className='flex items-center justify-center mb-4'>
          <ReactPaginate
            previousLabel='Previous'
            nextLabel='Next'
            pageCount={allExercisesPageCount}
            onPageChange={changePageForAllExercises}
            containerClassName='paginationBttns'
            previousClassName='previousBttn'
            nextLinkClassName='nextBttn'
            activeClassName='paginationActive'
            activeLinkClassName='activeLink'
          />
        </div>
      ) : (
        <div className='flex items-center justify-center mb-4'>
          <ReactPaginate
            previousLabel='Previous'
            nextLabel='Next'
            pageCount={specificExercisesPageCount}
            onPageChange={changePageForSpecificExercises}
            containerClassName='paginationBttns2'
            previousClassName='previousBttn2'
            nextLinkClassName='nextBttn2'
            activeClassName='paginationActive2'
            activeLinkClassName='activeLink2'
          />
        </div>
      )}
    </div>
  );
}
