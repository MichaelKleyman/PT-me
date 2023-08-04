/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import patients from "@/components/Patients";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { GrCalendar } from "react-icons/gr";
import { BsDot } from "react-icons/bs";
import { FiPhone, FiDelete } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import {
  AiOutlineMail,
  AiOutlineFileSearch,
  AiOutlineLink,
  AiOutlineEye,
} from "react-icons/ai";
import { BsFileMedical, BsPrinter, BsSend } from "react-icons/bs";
import Link from "next/link";
import {
  fetchPatient,
  fetchPatientsExercises,
} from "@/Redux/Features/patients/patientSlice";
import type { AppDispatch } from "@/Redux/store";
import { useDispatch } from "react-redux";
import {
  MdOutlineTipsAndUpdates,
  MdOutlineAddCircleOutline,
} from "react-icons/md";
import { FaExpand } from "react-icons/fa";
import { CLIENT, BASE_URL } from "../../../components/api";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
// import PatientFlowSheet from "@/components/PatientFlowSheet";
// import ExerciseTable from "@/components/PatientFlowSheet2";

type Obj = {
  id: number;
};

type Params = {
  params: Obj;
};

interface Patient {
  id: number;
  title: string;
  address: string;
  phoneNumber: string;
  email: string;
  reasonForVisit: string;
  age: string;
  injuryId: number;
  insurance: string;
  start?: Date | undefined;
  end?: Date | undefined;
}

interface ExerciseData {
  id: number;
  map: any;
  name: String;
  injuryId: Number;
  videoLink: string;
  Patients: Patient[];
  tips: String;
  description: String;
  musclesWorked: String;
  length: number | null;
}

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

// interface Schedule {
//   id: number;
//   patientId: number;
//   createdAt: string;
//   updatedAt: string;
//   exercises: Exercise[];
// }

interface Repetitions {
  sets: number;
  reps: number;
  id: number;
}

export default function Patient({ params }: Params) {
  const [patient, setPatient] = useState<Patient>();
  const [patientsExercises, setExercises] = useState<ExerciseData[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [schedule, setSchedule] = useState<Exercise[]>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const [add, setAddExercise] = useState<boolean>(false);
  const [scheduleChanged, setScheduleChanged] = useState<boolean>(false);
  const [newRepetitions, setNewRepetitions] = useState<Repetitions>({
    sets: 0,
    reps: 0,
    id: 0,
  });

  useEffect(() => {
    async function getPatient() {
      const { payload } = await dispatch(fetchPatient(params.id));
      setPatient(payload as Patient);
    }
    async function getPatientExercises() {
      const { payload } = await dispatch(fetchPatientsExercises(params.id));
      console.log(payload);
      setExercises(payload as ExerciseData[]);
    }
    getPatient();
    getPatientExercises();
  }, []);

  function stringToColor(string: string) {
    if (!string) return "";
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    const sanitizedName = name || "";

    return {
      sx: {
        bgcolor: stringToColor(sanitizedName),
      },
      children: `${sanitizedName.split(" ")[0][0]}${name.split(" ")[1]?.[0]}`,
    };
  }

  useEffect(() => {
    async function getSchedule() {
      const { data } = await CLIENT.get(
        `${BASE_URL}/api/schedule/patient/${params.id}`
      );

      let exercises = data.exercises;

      setSchedule(exercises);
    }
    getSchedule();
  }, [params.id, scheduleChanged]);

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

    const updatedSchedule = schedule;

    const exerciseIndex = updatedSchedule.findIndex(
      (ex) => ex.id === exerciseId
    );

    if (exerciseIndex === -1) {
      return;
    }

    updatedSchedule[exerciseIndex].sets = Number(e.target.value);

    console.log("New sets", Number(e.target.value));

    setSchedule(updatedSchedule);
    setNewRepetitions({
      ...newRepetitions,
      sets: Number(e.target.value),
      id: exerciseId,
    });
  };

  const handleRepsChange = async (
    exerciseId: number,
    curReps: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!schedule) {
      return;
    }

    const updatedSchedule = schedule;
    const exerciseIndex = updatedSchedule.findIndex(
      (ex) => ex.id === exerciseId
    );

    if (exerciseIndex === -1) {
      return;
    }
    updatedSchedule[exerciseIndex].reps = Number(e.target.value);
    setSchedule(updatedSchedule);
    setNewRepetitions({
      ...newRepetitions,
      reps: Number(e.target.value),
      id: exerciseId,
    });
  };

  const handleSubmitUpdate = async () => {
    setUpdate(!update);
    if (newRepetitions.sets > 0 && newRepetitions.reps <= 0) {
      await CLIENT.put(
        `${BASE_URL}/api/schedule/patient/${params.id}/exercise-sets/${newRepetitions.id}`,
        { sets: newRepetitions.sets }
      );
    } else if (newRepetitions.sets <= 0 && newRepetitions.reps > 0) {
      await CLIENT.put(
        `${BASE_URL}/api/schedule/patient/${params.id}/exercise-reps/${newRepetitions.id}`,
        { reps: newRepetitions.reps }
      );
    } else if (newRepetitions.sets > 0 && newRepetitions.reps > 0) {
      await CLIENT.put(
        `${BASE_URL}/api/schedule/patient/${params.id}/exercise-sets/${newRepetitions.id}`,
        { sets: newRepetitions.sets }
      );
      await CLIENT.put(
        `${BASE_URL}/api/schedule/patient/${params.id}/exercise-reps/${newRepetitions.id}`,
        { reps: newRepetitions.reps }
      );
    }
  };

  // console.log("Exercise List: ", patientsExercises);
  console.log("Flow sheet Exercises: ", schedule);

  const onDragEnd = async (result: DropResult) => {
    console.log(result);
    const { source, destination } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add;
    let exerciseList = [...patientsExercises];
    let patientFlowSheet = [...schedule];

    if (source.droppableId === "exercise-list") {
      add = exerciseList?.[source.index];
      // exerciseList = [...exerciseList];
      exerciseList?.splice(source.index, 1);
    } else {
      add = patientFlowSheet?.[source.index] as any;
      patientFlowSheet?.splice(source.index, 1);
    }

    if (destination.droppableId === "exercise-list") {
      console.log("ADD: ", add);

      if (source.droppableId === "patient-flowsheet") {
        exerciseList?.splice(destination.index, 0, add.exercise);
        await CLIENT.post(
          `${BASE_URL}/api/schedule/patient/${patient?.id}/remove-from-flowsheet/${schedule[0].scheduleId}/${add.exerciseId}`,
          add.exercise
        );
      } else {
        exerciseList?.splice(destination.index, 0, add);
      }
    } else {
      if (source.droppableId === "patient-flowsheet") {
        patientFlowSheet?.splice(destination.index, 0, add);
      } else {
        const newExercise = {
          id: destination.index,
          exerciseId: add.id,
          scheduleId: schedule?.[0].scheduleId,
          sets: 3,
          reps: 10,
          exercise: add,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        patientFlowSheet?.splice(destination.index, 0, newExercise);

        await CLIENT.post(
          `${BASE_URL}/api/schedule/patient/${patient?.id}/new-exercise/${schedule[0].scheduleId}/${add.id}`,
          newExercise
        );
      }
    }
    setExercises(exerciseList);
    setSchedule(patientFlowSheet);
  };

  return (
    <div className='mt-[1rem] ml-[6rem] p-4'>
      <div className='flex text-center gap-2'>
        <Link
          href='/patients'
          className='mb-5 text-sm text-gray-400 hover:underline duration-300 hover:scale-110 flex items-center gap-2'
        >
          <AiOutlineFileSearch />
          All Patients
        </Link>
        <div>/</div>
        <div className='mb-5 text-sm'>{patient?.title}</div>
      </div>

      <div className='bg-[#fdfff5] p-7 shadow-lg shadow-gray-200 rounded-md'>
        <div className='grid lg:grid-cols-2'>
          <div className='flex gap-6 w-full'>
            <Stack direction='row' spacing={2}>
              <Avatar
                {...stringAvatar(patient?.title || "")}
                sx={{
                  width: 86,
                  height: 86,
                  bgcolor: `${stringToColor(patient?.title || "")}`,
                  fontSize: "2rem",
                }}
              />
            </Stack>
            <div>
              <h1 className='font-medium text-[1.6rem] tracking-wider'>
                {patient?.title}
              </h1>
              <div className='flex flex-col md:flex-row md:items-center md:justify-between mt-3'>
                <p>Age: {patient?.age}</p>
                <div className='hidden md:block'>
                  <BsDot size={30} />
                </div>
                <p>Lorem Ipsum</p>
                <div className='hidden md:block'>
                  <BsDot size={30} />
                </div>
                <p>{patient?.reasonForVisit}</p>
              </div>
              <div className='mt-3 text-[12px] grid grid-cols-2 place-content-between gap-3'>
                <div className='flex items-center'>
                  <GrCalendar className='pr-2' size={25} />
                  Arrived June 1, 2022
                </div>
                <div>
                  <h2 className='tracking-wide flex items-center'>
                    Status{" "}
                    <span className='flex items-center'>
                      {" "}
                      <BsDot size={50} color='#c3e736' /> Checked in
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className='relative'>
            <div className='flex justify-center w-full gap-5'>
              <div className='cursor-pointer duration-300 hover:scale-110 hover:bg-green-500 hover:border-none hover:text-white border border-green-300 rounded-lg h-10 p-2 text-center text-xs md:text-base w-[40%] flex items-center justify-evenly'>
                <FiPhone />
                <p className='hidden sm:block md:hidden lg:block'>
                  {patient?.phoneNumber}
                </p>
              </div>
              <div className='cursor-pointer duration-300 hover:scale-110 hover:bg-green-500 hover:border-none hover:text-white border border-green-300 rounded-lg h-10 p-2 text-center text-xs md:text-base w-[50%] flex items-center justify-evenly'>
                <AiOutlineMail />
                <p className='hidden sm:block md:hidden lg:block'>
                  {patient?.email}
                </p>
              </div>
              <div className='cursor-pointer duration-300 hover:scale-110 hover:bg-green-500 hover:border-none hover:text-white border border-green-300 rounded-lg h-10 p-2 text-center text-xs md:text-base w-[40%] flex items-center justify-evenly'>
                <BsFileMedical />
                <p className='hidden sm:block md:hidden lg:block'>
                  {patient?.insurance}
                </p>
              </div>
            </div>
            <div className='absolute bottom-0 right-0 flex items-center'>
              <p className='text-blue-500 flex items-center hover:underline duration-300 hover:scale-110 cursor-pointer mr-4'>
                <BsSend className='p-2' size={35} /> Send
              </p>
              <p className='text-blue-500 flex items-center hover:underline duration-300 hover:scale-110 cursor-pointer mr-4'>
                <AiOutlineLink className='p-2' size={35} /> Share Link
              </p>
              <p className='text-blue-500 flex items-center hover:underline duration-300 hover:scale-110 cursor-pointer mr-4'>
                <BsPrinter className='p-2' size={35} /> Print
              </p>
              <span className='border-l-[1px] border-gray-300 h-full p-2'></span>
              <p className='text-blue-500 flex items-center hover:underline duration-300 hover:scale-110 cursor-pointer'>
                <MdOutlineEdit className='p-2' size={35} /> Edit
              </p>
            </div>
          </div>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='flex mt-[1rem] gap-5'>
          <Droppable droppableId='exercise-list'>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`bg-[#fdfff5] p-7 shadow-lg shadow-gray-200 rounded-md w-[30%] overflow-y-scroll ${
                  snapshot.isDraggingOver ? "bg-[#f3f4ec]" : ""
                }`}
              >
                <h1 className='text-lg uppercase tracking-widest'>
                  Exercise List
                </h1>
                <div className='mt-[1rem]'>
                  {patientsExercises?.length ? (
                    patientsExercises?.map((exercise: ExerciseData, index) => (
                      <Draggable
                        key={exercise.id}
                        draggableId={exercise.name.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            // key={exercise.id}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className={`bg-[#fdfff5] shadow-lg shadow-gray-200 rounded-md m-3 p-7 duration-300 hover:scale-110 cursor-pointer ${
                              snapshot.isDragging ? "shadow-gray-500" : ""
                            }`}
                          >
                            <h1 className='font-semibold'>{exercise.name}</h1>
                            <div className='relative top-3 flex justify-evenly'>
                              <Link
                                href={`/exercises/${exercise.id}`}
                                className='text-blue-500 hover:underline cursor-pointer flex items-center w-[30%]'
                              >
                                <AiOutlineEye className='p-2' size={35} />
                                View
                              </Link>
                              <button className='text-blue-500 hover:underline cursor-pointer flex items-center w-[40%]'>
                                <FiDelete className='p-2' size={30} />
                                Remove
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <div className='m-3 p-7 tracking-widest text-center'>
                      <p>No exercises for this patient.</p>
                      <Link
                        href='/exercises'
                        className='text-blue-600 hover:underline'
                      >
                        View Exercises
                      </Link>
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>

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
                    onClick={handleSubmitUpdate}
                    className='animate-bounce text-[15px] text-blue-500 flex items-center hover:bg-[#fdfff5] hover:shadow-lg hover:shadow-gray-300 rounded-lg p-2 duration-300 hover:scale-110 cursor-pointer'
                  >
                    <MdOutlineTipsAndUpdates className='p-2' size={35} />
                    Save
                  </button>
                )}
              </div>
            </div>
            <div className='overflow-y-scroll overflow-x-scroll'>
              {schedule?.length ? (
                <table className='border-collapse m-4'>
                  <thead>
                    <tr>
                      <th className=' px-6 py-5'>Exercise Name</th>
                      <th className=' px-6 py-5'>Repetitions</th>
                    </tr>
                  </thead>
                  <Droppable droppableId='patient-flowsheet'>
                    {(provided, snapshot) => (
                      <tbody
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {schedule
                          // ?.sort((a, b) => a.id - b.id) // Sort exercises by id (ascending order)
                          .map((exerciseObj, index) => (
                            <Draggable
                              key={exerciseObj.id}
                              draggableId={exerciseObj.exercise?.name.toString()}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <tr
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  className={`hover:bg-[#fdfff5] my-4 shadow-lg shadow-gray-300 rounded-lg cursor-pointer duration-300 hover:scale-105 ${
                                    snapshot.isDragging ? "shadow-gray-600" : ""
                                  }`}
                                >
                                  <td className=' px-6'>
                                    <h1 className='p-8'>
                                      {exerciseObj.exercise?.name}
                                    </h1>
                                  </td>
                                  <td className=' px-6 py-5'>
                                    <>
                                      <div className='flex'>
                                        <label className='px-4'>Sets: </label>
                                        {!update ? (
                                          `${exerciseObj.sets}`
                                        ) : (
                                          <input
                                            onChange={(e) =>
                                              handleSetsChange(
                                                exerciseObj.id,
                                                e
                                              )
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
                                              handleRepsChange(
                                                exerciseObj.id,
                                                exerciseObj.reps,
                                                e
                                              )
                                            }
                                            type='text'
                                            className=' w-6'
                                            value={`${exerciseObj.reps}`}
                                          />
                                        )}
                                      </div>
                                    </>
                                  </td>
                                </tr>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </tbody>
                    )}
                  </Droppable>
                </table>
              ) : (
                <div className='mt-4 normal-case'>
                  Make a schedule for patient.
                </div>
              )}
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
