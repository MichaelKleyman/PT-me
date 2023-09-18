"use client";
import React, { useEffect, useState } from "react";
import { CLIENT, BASE_URL } from "@/components/api";
import "../styles/exercises.css";
import CircularProgress from "@mui/material/CircularProgress";
import ReactPaginate from "react-paginate";
import TextField from "@mui/material/TextField";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import InputAdornment from "@mui/material/InputAdornment";
import Iframe from "react-iframe";
import Link from "next/link";
import { IoMdAddCircle } from "react-icons/io";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

interface Exercise {
  id: number;
  map: any;
  name: String;
  injuryId: Number;
  videoLink: string;
}

const style = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#3BE13B",
    },
  },
  width: "50%",
};

export default function AllExercises() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageNumber2, setPageNumber2] = useState<number>(0);
  // const [loading, setLoading] = useState<Boolean>(true);
  //exercises state is an array, where each key is a exercise object
  const [exercises, setExercises] = useState<Exercise[]>([]);
  //specific exercises state is an array of objects where each key is a string and each value is a a string.
  const [specificExercise, setSpecificExercise] = useState<Exercise[]>([]);
  const [exerciseOptions, setOptions] = useState<String[]>([
    "All",
    "Shoulders",
    "Back",
    "Knee",
    "Hip",
    "Neck",
    "Wrist/Hand",
    "Ankle/Foot",
    "Abdominal",
    "Gluteal",
  ]);
  const [selected, setSelected] = useState<String>("All");

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
    if (exerciseType === "All") {
      getAllExercises();
      setSpecificExercise([]);
    } else {
      const fetchExerciseTypeInjuryId = {
        Shoulders: 1,
        Back: 2,
        Knee: 3,
        Hip: 4,
        Neck: 5,
        "Wrist/Hand": 6,
        "Ankle/Foot": 7,
        Abdominal: 8,
        Gluteal: 9,
      };
      if (exerciseType === "Shoulders") {
        const { data } = await CLIENT.get(
          `${BASE_URL}/api/exercises/injury/${fetchExerciseTypeInjuryId["Shoulders"]}`
        );
        setSpecificExercise(data);
      } else if (exerciseType === "Back") {
        const { data } = await CLIENT.get(
          `${BASE_URL}/api/exercises/injury/${fetchExerciseTypeInjuryId["Back"]}`
        );
        setSpecificExercise(data);
      } else if (exerciseType === "Knee") {
        const { data } = await CLIENT.get(
          `${BASE_URL}/api/exercises/injury/${fetchExerciseTypeInjuryId["Knee"]}`
        );
        setSpecificExercise(data);
      } else if (exerciseType === "Hip") {
        const { data } = await CLIENT.get(
          `${BASE_URL}/api/exercises/injury/${fetchExerciseTypeInjuryId["Hip"]}`
        );
        setSpecificExercise(data);
      } else if (exerciseType === "Neck") {
        const { data } = await CLIENT.get(
          `${BASE_URL}/api/exercises/injury/${fetchExerciseTypeInjuryId["Neck"]}`
        );
        setSpecificExercise(data);
      } else if (exerciseType === "Wrist/Hand") {
        const { data } = await CLIENT.get(
          `${BASE_URL}/api/exercises/injury/${fetchExerciseTypeInjuryId["Wrist/Hand"]}`
        );
        setSpecificExercise(data);
      } else if (exerciseType === "Ankle/Foot") {
        const { data } = await CLIENT.get(
          `${BASE_URL}/api/exercises/injury/${fetchExerciseTypeInjuryId["Ankle/Foot"]}`
        );
        setSpecificExercise(data);
      } else if (exerciseType === "Abdominal") {
        const { data } = await CLIENT.get(
          `${BASE_URL}/api/exercises/injury/${fetchExerciseTypeInjuryId["Abdominal"]}`
        );
        setSpecificExercise(data);
      } else if (exerciseType === "Gluteal") {
        const { data } = await CLIENT.get(
          `${BASE_URL}/api/exercises/injury/${fetchExerciseTypeInjuryId["Gluteal"]}`
        );
        setSpecificExercise(data);
      }
    }
  };

  const exercisesPerPage = 9;
  const pagesVisited = pageNumber * exercisesPerPage;
  const pagesVisited2 = pageNumber2 * exercisesPerPage;

  const displaySpecificExercise = specificExercise
    .filter((ex) => ex.name.toLowerCase().includes(searchInput))
    .slice(pagesVisited2, pagesVisited2 + exercisesPerPage)
    .map((exercise, i) => {
      return (
        <div key={i} className='p-2'>
          <div className='bg-[#fdfff5] shadow-lg shadow-[#fdfff5] rounded-lg'>
            <div className='p-3 text-xl flex items-center justify-between'>
              <div className='flex items-center justify-between gap-4'>
                <button
                  onClick={handleClick}
                  className='rounded-full p-2 bg-slate-100 shadow-lg shadow-gray-300 duration-300 hover:scale-110 hover:bg-slate-200 hover:shadow-gray-400'
                >
                  <BsThreeDotsVertical color='#B2BEB5' size={15} />
                </button>
                <p
                  className={`tracking-wide ${
                    exercise.name.length > 21 ? "text-[14px]" : "text-[18px]"
                  }`}
                >
                  {exercise.name}
                </p>
              </div>
              <Link
                href={`/exercises/${exercise.id}`}
                className='text-sm self-center border border-gray-200 text-gray-400 p-2 rounded-lg hover:text-white hover:bg-green-500 duration-300 hover:scale-110'
              >
                View Exercise
              </Link>
            </div>
            <div className='ratio ratio-1x1 p-6'>
              <Iframe
                url={exercise.videoLink}
                width='360'
                height='315'
                allowFullScreen
              />
            </div>
          </div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>
              <h1 className='my-2'>Edit</h1>
              <h1 className='my-2'>Remove</h1>
            </Typography>
          </Popover>
        </div>
      );
    });

  const displayAllExercises = exercises
    .filter((ex) => ex.name.toLowerCase().includes(searchInput))
    .slice(pagesVisited, pagesVisited + exercisesPerPage)
    .map((exercise, i) => {
      return (
        <div key={i} className='p-2'>
          <div className='bg-[#fdfff5] shadow-lg shadow-[#fdfff5] rounded-lg'>
            <div className='p-3 text-xl flex justify-between items-center'>
              <div className='flex items-center justify-between gap-4'>
                <button
                  onClick={handleClick}
                  className='rounded-full p-2 bg-slate-100 shadow-lg shadow-gray-300 duration-300 hover:scale-110 hover:bg-slate-200 hover:shadow-gray-400'
                >
                  <BsThreeDotsVertical color='#B2BEB5' size={15} />
                </button>
                <p
                  className={`tracking-wide ${
                    exercise.name.length > 21 ? "text-[14px]" : "text-[18px]"
                  }`}
                >
                  {exercise.name}
                </p>
              </div>
              <Link
                href={`/exercises/${exercise.id}`}
                className='text-sm self-center border border-gray-200 text-gray-400 p-2 rounded-lg hover:text-white hover:bg-green-500 duration-300 hover:scale-110'
              >
                View Exercise
              </Link>
            </div>
            <div className='ratio ratio-1x1 flex items-center justify-center'>
              <Iframe
                url={exercise.videoLink}
                width='360'
                height='315'
                allowFullScreen
              />
            </div>
          </div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>
              <h1 className='text-center my-2 border border-green-500 p-2 rounded-lg duration-300 hover:scale-110 hover:text-white hover:bg-green-500 cursor-pointer'>
                Edit
              </h1>
              <h1 className='text-center my-2 border border-red-400 p-2 rounded-lg duration-300 hover:scale-110 hover:text-white hover:bg-red-500 cursor-pointer'>
                Remove
              </h1>
            </Typography>
          </Popover>
        </div>
      );
    });

  const searchAllExercisesResults = exercises.filter((ex: Exercise) =>
    ex.name.toLowerCase().includes(searchInput)
  );

  const searchSpecificExercisesResults = specificExercise.filter(
    (ex: Exercise) => ex.name.toLowerCase().includes(searchInput)
  );

  let allExercisesPageCount;
  let specificExercisesPageCount;

  if (searchAllExercisesResults.length) {
    allExercisesPageCount = Math.ceil(
      searchAllExercisesResults.length / exercisesPerPage
    );
  } else {
    allExercisesPageCount = Math.ceil(exercises.length / exercisesPerPage);
  }

  if (searchSpecificExercisesResults.length) {
    specificExercisesPageCount = Math.ceil(
      searchSpecificExercisesResults.length / exercisesPerPage
    );
  } else {
    specificExercisesPageCount = Math.ceil(exercises.length / exercisesPerPage);
  }

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
      <div className='mt-1 flex justify-between items-center'>
        <div className='flex'>
          {exerciseOptions.map((option: String, i) => (
            <button
              onClick={() => filterExercises(option)}
              key={i}
              className={`${
                selected === option ? "bg-green-500 text-white" : ""
              } className='cursor-pointer m-2 hover:bg-slate-200 rounded-lg p-2 shadow-lg hover:shadow-gray-300 duration-300 hover:scale-110'`}
            >
              {option}
            </button>
          ))}
        </div>
        <Link
          href='/exercises/new-exercise'
          className='mr-[3rem] p-2 bg-[#3BE13B] rounded-lg shadow-green-400 shadow-lg duration-300 hover:scale-110 text-white flex items-center gap-3'
        >
          <IoMdAddCircle size={22} />
          New Exercise
        </Link>
      </div>
      <div className='flex items-center justify-center my-4'>
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
      <div className='mt-3 w-[100%] p-3 grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {selected === "All" && displayAllExercises}
      </div>
      <div className='mt-3 w-[100%] p-3 grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {selected !== "All" && displaySpecificExercise}
      </div>
      {selected === "All" ? (
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
