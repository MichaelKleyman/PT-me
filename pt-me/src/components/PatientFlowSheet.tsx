/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect, useState } from 'react';
import { MdOutlineTipsAndUpdates } from 'react-icons/md';
import { FaExpand } from 'react-icons/fa';
import { CLIENT, BASE_URL } from './api';

interface Id {
  patientId: number;
}

interface exercise {
  id: number;
  injuryId: number;
  description: string;
  name: string;
  musclesWorked: string;
  tips: string;
  videoLink: string;
}

interface scheduleExercise {
  id: number;
  date: Date;
  exerciseId: number;
  sets: number;
  reps: number;
  scheduleId: number;
  exercise: exercise;
}

interface Schedule {
  id: number;
  patientId: number;
  exercises: scheduleExercise[];
}

export default function PatientFlowSheet({ patientId }: Id) {
  const [schedule, setSchedule] = useState<Schedule>();
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    async function getSchedule() {
      const { data } = await CLIENT.get(
        `${BASE_URL}/api/schedule/patient/${patientId}`
      );
      setSchedule(data);
    }
    getSchedule();
  }, []);

  const maxExercises = 8; // Maximum number of exercises
  // const emptySlots = Array.from({
  //   length: maxExercises - schedule.exercises.length,
  // });

  const exerciseIds = Array.from(
    new Set(schedule?.exercises.map((exerciseObj) => exerciseObj.exerciseId))
  );
  const emptyExerciseSlots = Array.from({
    length: maxExercises - exerciseIds.length,
  });
  const uniqueDates = Array.from(
    new Set(schedule?.exercises.map((exerciseObj) => exerciseObj.date))
  );
  const emptyDateSlots = Array.from({
    length: maxExercises - uniqueDates.length,
  });

  const handleUpdate = () => {
    setUpdate(!update);
  };

  //changes the date for a specific id in the ScheduleExercises table
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };

  return (
    <div className='bg-[#fdfff5] p-7 shadow-lg shadow-gray-200 rounded-md w-[70%] text-lg uppercase tracking-widest'>
      <div className='flex items-center justify-between'>
        <h1>Schedule</h1>
        <div className='flex justify-between items-center gap-2'>
          <button className='text-[15px] text-blue-500 flex items-center hover:bg-[#fdfff5] hover:shadow-lg hover:shadow-gray-300 rounded-lg p-2 duration-300 hover:scale-110 cursor-pointer'>
            <FaExpand className='p-2' size={35} />
            Expand
          </button>
          {!update ? (
            <button
              onClick={handleUpdate}
              className='text-[15px] text-blue-500 flex items-center hover:bg-[#fdfff5] hover:shadow-lg hover:shadow-gray-300 rounded-lg p-2 duration-300 hover:scale-110 cursor-pointer'
            >
              <MdOutlineTipsAndUpdates className='p-2' size={35} />
              Update
            </button>
          ) : (
            <button
              onClick={handleUpdate}
              className='animate-bounce text-[15px] text-blue-500 flex items-center hover:bg-[#fdfff5] hover:shadow-lg hover:shadow-gray-300 rounded-lg p-2 duration-300 hover:scale-110 cursor-pointer'
            >
              <MdOutlineTipsAndUpdates className='p-2' size={35} />
              Save
            </button>
          )}
        </div>
      </div>
      <div className='overflow-y-scroll overflow-x-scroll'>
        {schedule?.id ? (
          <table className='table-auto mt-4'>
            <thead>
              <tr>
                <th className='border border-green-500 px-6 py-4'></th>
                {uniqueDates.map((date, i) => (
                  <th key={i} className='border border-green-500 px-6 py-4'>
                    {!update ? (
                      new Date(date).toLocaleDateString('en-US')
                    ) : (
                      <input
                        onChange={(e) => handleDateChange(e)}
                        type='text'
                        className='border border-green-500'
                        value={new Date(date).toLocaleDateString('en-US')}
                      />
                    )}
                  </th>
                ))}
                {emptyDateSlots.map((_, index) => (
                  <th key={index} className='border border-green-500 px-6 py-4'>
                    {update && (
                      <input
                        // onChange={handleChange}
                        type='text'
                        className='border border-green-500'
                      />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {exerciseIds.map((exerciseId) => {
                const filteredExercises = schedule?.exercises.filter(
                  (exerciseObj) => exerciseObj.exerciseId === exerciseId
                );

                return (
                  <tr key={exerciseId}>
                    <td className='border border-green-500 hover:border-[3px] px-6 py-4 duration-300 hover:scale-110 cursor-pointer'>
                      {filteredExercises[0]?.exercise.name}
                    </td>
                    {uniqueDates.map((date, i) => {
                      const exercise = filteredExercises.find(
                        (exerciseObj) => exerciseObj.date === date
                      );

                      return (
                        <td
                          key={i}
                          className='border border-green-500 px-6 py-4'
                        >
                          {!update ? (
                            exercise && `${exercise.sets} X ${exercise.reps}`
                          ) : (
                            <input
                              // onChange={handleChange}
                              type='text'
                              className='border border-green-500'
                              value={
                                exercise &&
                                `${exercise.sets} X ${exercise.reps}`
                              }
                            />
                          )}
                        </td>
                      );
                    })}
                    {emptyExerciseSlots.map((_, index) => (
                      <td
                        key={index}
                        className='border border-green-500 px-6 py-4'
                      >
                        {update && (
                          <input
                            // onChange={handleChange}
                            type='text'
                            className='border border-green-500'
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
              {emptyDateSlots.map((_, index) => (
                <tr key={index}>
                  <td className='border border-green-500 px-6 py-4'></td>
                  {Array.from({ length: uniqueDates.length }).map(
                    (_, index) => (
                      <td
                        key={index}
                        className='border border-green-500 px-6 py-4'
                      >
                        {update && (
                          <input
                            // onChange={handleChange}
                            type='text'
                            className='border border-green-500'
                          />
                        )}
                      </td>
                    )
                  )}
                  {emptyExerciseSlots.map((_, index) => (
                    <td
                      key={index}
                      className='border border-green-500 px-6 py-4'
                    >
                      {update && (
                        <input
                          // onChange={handleChange}
                          type='text'
                          className='border border-green-500'
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className='mt-4 normal-case'>Make a schedule for patient.</div>
        )}
      </div>
    </div>
  );
}

{
  /* <tr>
  <th className='border border-green-500 px-6 py-4'>Exercise</th>
  {Array.from({ length: 6 }).map((_, colIndex) => (
    <td key={colIndex} className='border border-green-500 px-6 py-4'>
      5 x 30
    </td>
  ))}
</tr>
{Array.from({ length: 6 - 1 }).map((_, rowIndex) => (
  <tr key={rowIndex + 1}>
    <th className='border border-green-500 px-6 py-4'>Exercise</th>
    {Array.from({ length: 6 }).map((_, colIndex) => (
      <td
        key={colIndex}
        className='border border-green-500 px-6 py-4'
      >
        5 x 30
      </td>
    ))}
  </tr>
))} */
}

{
  /* <table className='table-auto mt-4'>
  <thead>
    <tr>
      <th className='border border-green-500 px-6 py-4'></th>
      {schedule?.exercises.map((exerciseObj) => (
        <th key={exerciseObj.id} className='border border-green-500 px-6 py-4'>
          {new Date(exerciseObj.date).toLocaleDateString('en-US')}
        </th>
      ))}
      {Array.from({ length: 8 }).map((_, index) => (
        <th key={index} className='border border-green-500 px-6 py-4'></th>
      ))}
    </tr>
  </thead>
  <tbody>
    {schedule?.exercises.map((exerciseObj) => (
      <tr key={exerciseObj.id}>
        <td className='border border-green-500 hover:border-[3px] px-6 py-4 duration-300 hover:scale-110 cursor-pointer'>
          {exerciseObj.exercise.name}
        </td>
        {schedule.exercises.map((exercise) => (
          <td key={exercise.id} className='border border-green-500 px-6 py-4'>
            {exercise.id === exerciseObj.id &&
              `${exercise.sets} X ${exercise.reps}`}
          </td>
        ))}
        {Array.from({ length: 8 }).map((_, index) => (
          <td key={index} className='border border-green-500 px-6 py-4'></td>
        ))}
      </tr>
    ))}
    {Array.from({ length: 8 }).map((_, index) => (
      <tr key={index}>
        <td className='border border-green-500 px-6 py-4'></td>
        {Array.from({ length: schedule.exercises.length }).map((_, index) => (
          <td key={index} className='border border-green-500 px-6 py-4'></td>
        ))}
        {Array.from({ length: 6 }).map((_, index) => (
          <td key={index} className='border border-green-500 px-6 py-4'></td>
        ))}
      </tr>
    ))}
  </tbody>
</table>; */
}
