"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineFileSearch } from "react-icons/ai";
import { CLIENT, BASE_URL } from "@/components/api";
import Iframe from "react-iframe";

type Obj = {
  id: Number;
};

type Params = {
  params: Obj;
};

interface ExerciseData {
  id: number;
  map: any;
  name: String;
  injuryId: Number;
  videoLink: string;
  tips: String;
  description: String;
  musclesWorked: String;
}

export default function SpecificExercise({ params }: Params) {
  const [exercise, setExercise] = useState<ExerciseData>({
    name: "",
    id: 0,
    injuryId: 0,
    videoLink: "",
    map: "",
    tips: "",
    description: "",
    musclesWorked: "",
  });

  useEffect(() => {
    const getExercise = async () => {
      const { data } = await CLIENT.get(
        `${BASE_URL}/api/exercises/${params.id}`
      );
      console.log(data);

      setExercise(data);
      // setLoading(false);
    };
    getExercise();
  }, []);

  return (
    <div className='mt-[1rem] ml-[6rem] p-4'>
      <div className='mb-2 flex text-center gap-2'>
        <Link
          href='/exercises'
          className='mb-5 text-sm text-gray-400 hover:underline duration-300 hover:scale-110 flex items-center gap-2'
        >
          <AiOutlineFileSearch />
          All Exercises
        </Link>
        <div>/</div>
        <div className='text-sm'>Exercise</div>
      </div>
      <div className='grid lg:grid-cols-2 gap-4 mt-[1rem] place-items-center'>
        <div>
          <h1 className='uppercase tracking-widest text-2xl font-medium'>
            {exercise?.name}
          </h1>
          <div className='mt-4'>
            <h1 className='underline text-green-500 my-2'>Description</h1>
            <p>{exercise?.description}</p>
          </div>
          <div className='mt-3'>
            <h1 className='underline text-green-500 my-2'>Tips</h1>
            <p>{exercise?.tips}</p>
          </div>
          <div className='mt-3'>
            <h1 className='underline text-green-500 my-2'>Muscles Worked</h1>
            <p>{exercise?.musclesWorked}</p>
          </div>
        </div>
        <div>
          <Iframe
            url={exercise?.videoLink}
            width='560'
            height='315'
            allowFullScreen
          />
        </div>
      </div>
      <div className='mt-[2rem] cursor-pointer bg-blue-500 text-white p-1 text-center duration-300 hover:scale-110 rounded-lg w-[20%] md:w-[30%] lg:w-[10%]'>
        <button>Assign</button>
      </div>
    </div>
  );
}
