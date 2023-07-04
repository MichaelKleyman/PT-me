import React, { useEffect, useState } from 'react';
import {
  MdOutlineTipsAndUpdates,
  MdOutlineAddCircleOutline,
} from 'react-icons/md';
import { FaExpand } from 'react-icons/fa';
import { CLIENT, BASE_URL } from './api';

interface Exercise {
  id: number;
  scheduleId: number;
  exerciseId: number;
  date: string;
  sets: number;
  reps: number;
  createdAt: string;
  updatedAt: string;
  exercise: {
    id: number;
    name: string;
    injuryId: number;
    videoLink: string;
    tips: string;
    description: string;
    musclesWorked: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface Schedule {
  id: number;
  patientId: number;
  createdAt: string;
  updatedAt: string;
  exercises: Exercise[];
}

interface Props {
  patientId: number;
}

const ExerciseTable: React.FC<Props> = ({ patientId }) => {
  const [schedule, setSchedule] = useState<Schedule | undefined>(undefined);
  const [update, setUpdate] = useState<boolean>(false);
  const [add, setAddExercise] = useState<boolean>(false);

  useEffect(() => {
    async function getSchedule() {
      const { data } = await CLIENT.get<Schedule>(
        `${BASE_URL}/api/schedule/patient/${patientId}`
      );
      setSchedule(data);
    }
    getSchedule();
  }, [patientId]);

  const handleUpdate = () => {
    setUpdate(!update);
  };

  const handleAdd = () => {
    setAddExercise(!add);
  };

  const handleSetsChange = async (
    exerciseId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!schedule) {
      return;
    }

    const updatedSchedule = { ...schedule };
    const exerciseIndex = updatedSchedule.exercises.findIndex(
      (ex) => ex.id === exerciseId
    );

    if (exerciseIndex === -1) {
      return;
    }

    updatedSchedule.exercises[exerciseIndex].sets = Number(e.target.value);
    setSchedule(updatedSchedule);

    await CLIENT.put(
      `${BASE_URL}/api/schedule/patient/${patientId}/exercise/${exerciseId}`,
      { sets: e.target.value }
    );
  };

  const handleRepsChange = async (
    exerciseId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!schedule) {
      return;
    }

    const updatedSchedule = { ...schedule };
    const exerciseIndex = updatedSchedule.exercises.findIndex(
      (ex) => ex.id === exerciseId
    );

    if (exerciseIndex === -1) {
      return;
    }

    updatedSchedule.exercises[exerciseIndex].reps = Number(e.target.value);
    setSchedule(updatedSchedule);

    await CLIENT.put(
      `${BASE_URL}/api/schedule/patient/${patientId}/exercise/${exerciseId}`,
      { reps: e.target.value }
    );
  };

  return (
    <div className='bg-[#fdfff5] p-7 shadow-lg shadow-gray-200 rounded-md w-[70%] text-lg uppercase tracking-widest'>
      <div className='flex items-center justify-between'>
        <h1>Flow Sheet</h1>
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
          {!add ? (
            <button
              onClick={handleAdd}
              className='text-[15px] text-blue-500 flex items-center hover:bg-[#fdfff5] hover:shadow-lg hover:shadow-gray-300 rounded-lg p-2 duration-300 hover:scale-110 cursor-pointer'
            >
              <MdOutlineAddCircleOutline className='p-2' size={35} />
              Add Exercise
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className='animate-bounce text-[15px] text-blue-500 flex items-center hover:bg-[#fdfff5] hover:shadow-lg hover:shadow-gray-300 rounded-lg p-2 duration-300 hover:scale-110 cursor-pointer'
            >
              <MdOutlineAddCircleOutline className='p-2' size={35} />
              Save
            </button>
          )}
        </div>
      </div>
      <div className='overflow-y-scroll overflow-x-scroll'>
        {schedule?.id ? (
          <table className='border-collapse border border-green-300'>
            <thead>
              <tr>
                <th className='border border-green-300 px-6 py-5'>
                  Exercise Name
                </th>
                <th className='border border-green-300 px-6 py-5'>
                  Repetitions
                </th>
              </tr>
            </thead>
            <tbody>
              {schedule?.exercises?.map((exerciseObj) => (
                <tr key={exerciseObj.id}>
                  <td className='border border-green-300 px-6'>
                    <h1 className='hover:bg-[#f5fbde] hover:shadow-lg hover:shadow-gray-300 rounded-lg p-8 duration-300 hover:scale-110 cursor-pointer'>
                      {exerciseObj.exercise.name}
                    </h1>
                  </td>
                  <td className='border border-green-300 px-6 py-5'>
                    <>
                      <div className='flex'>
                        <label className='px-4'>Sets: </label>
                        {!update ? (
                          `${exerciseObj.sets}`
                        ) : (
                          <input
                            onChange={(e) =>
                              handleSetsChange(exerciseObj.id, e)
                            }
                            type='text'
                            className='border border-green-500 w-6'
                            value={`${exerciseObj.sets}`}
                          />
                        )}
                      </div>
                      <br />
                      <div className='flex'>
                        <label className='px-4'>Reps: </label>
                        {!update ? (
                          `${exerciseObj.reps}`
                        ) : (
                          <input
                            onChange={(e) =>
                              handleRepsChange(exerciseObj.id, e)
                            }
                            type='text'
                            className='border border-green-500 w-6'
                            value={`${exerciseObj.reps}`}
                          />
                        )}
                      </div>
                    </>
                  </td>
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
};

export default ExerciseTable;
