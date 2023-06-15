'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { CLIENT, BASE_URL } from '@/components/api';

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
}

export default function SpecificExercise({ params }: Params) {
  const [exercise, setExercise] = useState<ExerciseData>();

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
      <div>{exercise?.name}</div>
    </div>
  );
}
