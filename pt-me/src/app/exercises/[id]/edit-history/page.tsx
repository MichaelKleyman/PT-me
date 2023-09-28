import Link from "next/link";
import { AiOutlineFileSearch } from "react-icons/ai";

export default function EditExerciseHistoryComponent({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const exerciseName = searchParams.name;
  const exerciseId = params.id;

  return (
    <div className='mt-[1rem] ml-[2rem] p-4'>
      <div className='mb-2 flex text-center gap-2 ml-[4rem]'>
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
        <p className='text-sm'>Edit Exercise</p>
      </div>
      <h1 className='ml-[4rem]'>Edit History For {exerciseName} </h1>
      <div className='fixed w-[450px] duration-300 h-screen shadow-xl shadow-gray-400 flex flex-col justify-between'></div>{" "}
    </div>
  );
}
