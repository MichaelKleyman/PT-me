import Link from "next/link";
import { AiOutlineFileSearch } from "react-icons/ai";
import CreateExerciseForm from "@/components/CreateExerciseForm";

export default function page() {
  return (
    <div className='mt-[2rem] ml-[6rem] p-9'>
      <div className='flex text-center gap-2'>
        <Link
          href='/exercises'
          className='mb-5 text-sm text-gray-400 hover:underline duration-300 hover:scale-110 flex items-center gap-2'
        >
          <AiOutlineFileSearch />
          All Exercises
        </Link>
        <div>/</div>
        <div className='mb-5 text-sm'>Create New Exercise</div>
      </div>
      <h1 className='font-medium text-[1.5rem] tracking wide'>
        Create new exercise
      </h1>
      <div>
        <CreateExerciseForm />
      </div>
    </div>
  );
}
