"use client";
import Link from "next/link";
import { AiOutlineFileSearch } from "react-icons/ai";
import EditExercise from "@/components/EditExercise";
import { useParams } from "next/navigation";

export default function EditExercisePage() {
  const { id } = useParams();

  return (
    <div className='mt-[1rem] ml-[6rem] p-4'>
      <div className='flex text-center gap-2'>
        <Link
          href={``}
          className='mb-5 text-sm text-gray-400 hover:underline duration-300 hover:scale-110 flex items-center gap-2'
        >
          <AiOutlineFileSearch />
          All Exercises
        </Link>
        <div>/</div>
        <div className='mb-5 text-sm'>Edit Exercise</div>
      </div>
      <EditExercise exerciseId={id} />
    </div>
  );
}
