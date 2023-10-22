import React from "react";
import { ExerciseData } from "../../types";
import { FaRegCalendarCheck } from "react-icons/fa";
import Image from "next/legacy/image";
import emptyImage from "../images/empty.jpg";

interface Exercise {
  id: number;
  scheduleId: number | undefined;
  exerciseId: number;
  // date: string;
  sets: number;
  reps: number;
  createdAt: Date;
  updatedAt: Date;
  exercise: ExerciseData;
}

interface Props {
  schedule: Exercise[];
  update: boolean;
  handleSetsChange: (
    exerciseId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleRepsChange: (
    exerciseId: number,
    curReps: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function ExpandedView({
  schedule,
  update,
  handleSetsChange,
  handleRepsChange,
}: Props) {
  return (
    <div>
      {schedule.length ? (
        <table className='border-collapse m-4 w-full'>
          <thead>
            <tr>
              <th className='text-start px-6 py-5 font-normal text-green-600'>
                Exercise Name
              </th>
              <th className='text-start px-6 py-5 font-normal text-green-600'>
                Repetitions
              </th>
              <th className='text-start px-6 py-5 font-normal text-green-600'>
                Assigned On
              </th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((exerciseObj, index) => (
              <tr
                key={exerciseObj.id}
                className={`hover:shadow-lg ${
                  index % 2 === 0 ? "bg-white" : "bg-[#faffe6]"
                } hover:shadow-gray-400 w-full my-4 cursor-pointer tracking-normal rounded-lg duration-300 `}
              >
                <td className=' px-6'>
                  <h1 className='p-8'>{exerciseObj.exercise?.name}</h1>
                </td>
                <td className=' px-6 py-5'>
                  <div className='flex gap-3'>
                    <div>
                      {!update ? (
                        `${exerciseObj.sets}`
                      ) : (
                        <input
                          onChange={(e) => handleSetsChange(exerciseObj.id, e)}
                          type='text'
                          className='border border-green-500 w-6 rounded-sm text-center'
                          value={`${exerciseObj.sets}`}
                        />
                      )}
                    </div>
                    <p>x</p>
                    <div>
                      {!update ? (
                        `${exerciseObj.reps}`
                      ) : (
                        <input
                          onChange={(e) =>
                            handleRepsChange(
                              exerciseObj.id,
                              exerciseObj.reps,
                              e
                            )
                          }
                          type='text'
                          className='border border-green-500 w-6 rounded-sm text-center'
                          value={`${exerciseObj.reps}`}
                        />
                      )}
                    </div>
                  </div>
                </td>
                <td className='text-[15px] text-blue-600'>
                  <div className='flex items-center justify-center gap-5'>
                    <FaRegCalendarCheck />
                    <p>{new Date(exerciseObj.createdAt).toDateString()}</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className='flex items-center justify-center h-screen'>
          <Image
            src={emptyImage}
            alt='nothing-found'
            height={500}
            width={500}
          />
        </div>
      )}
    </div>
  );
}
