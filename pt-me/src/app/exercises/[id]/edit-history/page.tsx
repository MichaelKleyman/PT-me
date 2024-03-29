import Link from "next/link";
import { AiOutlineFileSearch } from "react-icons/ai";
import ExerciseEditHistory from "@/components/ExerciseEditHistory";

export default function EditExerciseHistoryComponent({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const exerciseName = searchParams.name;
  const exerciseId = params.id;

  return (
    <div className='mt-[1rem] md:ml-[2rem]'>
      <div className='flex text-center gap-2 ml-[4rem] p-4'>
        <Link
          href='/exercises'
          className='mb-5 text-sm text-gray-400 hover:underline duration-300 hover:scale-110 flex items-center gap-2'
        >
          <AiOutlineFileSearch />
          All Exercises
        </Link>
        <div>/</div>
        <Link
          href={`/exercises/${exerciseId}`}
          className='mb-5 text-sm text-gray-400 hover:underline duration-300 hover:scale-110 flex items-center gap-2'
        >
          {exerciseName}
        </Link>
        <div>/</div>
        <p className='text-sm font-medium'>Edit Exercise</p>
      </div>
      <h1 className='ml-[5rem]'>Edit History For {exerciseName} </h1>
      <ExerciseEditHistory exerciseId={exerciseId} />
    </div>
  );
}
