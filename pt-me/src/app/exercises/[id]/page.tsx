import React from 'react';
import Link from 'next/link';
import { AiOutlineFileSearch } from 'react-icons/ai';

type Obj = {
  id: Number;
};

type Params = {
  params: Obj;
};

export default function SpecificExercise({ params }: Params) {
  return (
    <div className='mt-[1rem] ml-[6rem] p-4'>
      <div className=' flex text-center gap-2'>
        <Link
          href='/exercises'
          className='mb-5 text-sm text-gray-400 hover:underline duration-300 hover:scale-110 flex items-center gap-2'
        >
          <AiOutlineFileSearch />
          All Exercises
        </Link>
        <div>/</div>
        <div className='mb-5 text-sm'>Exercise</div>
      </div>
      <div> SpecificExercise: {params.id.toString()}</div>
    </div>
  );
}
