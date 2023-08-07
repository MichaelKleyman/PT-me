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
import { FaExpand, FaRegCalendarCheck } from "react-icons/fa";
import { CLIENT, BASE_URL } from "../../../components/api";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { DM_Sans } from "next/font/google";
import TextField from "@mui/material/TextField";
import { BsSearch } from "react-icons/bs";
import { MdAddBox } from "react-icons/md";
import InputAdornment from "@mui/material/InputAdornment";
// import PatientFlowSheet from "@/components/PatientFlowSheet";
// import ExerciseTable from "@/components/PatientFlowSheet2";

const dm_sans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const style = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#fdfff5",
      borderRadius: "15px",
    },
  },
  width: "100%",
  height: "30%",
  backgroundColor: "white",
  borderRadius: "20px",
  boxShadow: "0px 0px 8px #ddd",
};

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

interface Repetitions {
  sets: number;
  reps: number;
  id: number;
}

export default function Patient({ params }: Params) {
  const [results, setResults] = useState<ExerciseData[]>([]);
  const [patient, setPatient] = useState<Patient>();
  const [searchInput, setSearchInput] = useState<string>("");
  const [patientsExercises, setExercises] = useState<ExerciseData[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [schedule, setSchedule] = useState<Exercise[]>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const [add, setAddExercise] = useState<boolean>(false);
  // const [scheduleChanged, setScheduleChanged] = useState<boolean>(false);
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
  }, [setExercises]);

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
  }, [params.id, setSchedule]);

  const handleUpdate = () => {
    setUpdate(!update);
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
        if (patientFlowSheet.length) {
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
        } else {
          const { data } = await CLIENT.post(
            `${BASE_URL}/api/schedule/patient/${patient?.id}/new-flowsheet/${add.id}`
          );
          console.log(data);
          const newExercise = {
            id: data.id,
            exerciseId: data.exerciseId,
            scheduleId: data.scheduleId,
            sets: data.sets,
            reps: data.reps,
            exercise: add,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          patientFlowSheet?.splice(0, 0, newExercise);
        }
      }
    }
    setExercises(exerciseList);
    setSchedule(patientFlowSheet);
  };

  const removeExercise = async (id: number) => {
    await CLIENT.delete(
      `${BASE_URL}/api/exercises/patient/${patient?.id}/${id}`
    );
    const newExerciseList = patientsExercises.filter(
      (exercise) => exercise.id !== id
    );
    setExercises(newExerciseList);
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    const input = e.target.value;
    if (input.length >= 2) {
      const { data } = await CLIENT.get(
        `${BASE_URL}/api/exercises/search-exercise/${input}`
      );

      setResults(data);
    }
  };

  const assignExercise = async (exerciseId: number) => {
    const res = await CLIENT.post(
      `${BASE_URL}/api/exercises//patient/add-exercise/${patient?.id}/${exerciseId}`
    );

    console.log(res);

    const { payload } = await dispatch(fetchPatientsExercises(params.id));
    setExercises(payload as ExerciseData[]);
    setSearchInput("");
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
        <div className='md:flex mt-[1rem] gap-5'>
          <Droppable droppableId='exercise-list'>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`bg-[#fdfff5] relative p-7 shadow-lg shadow-gray-200 rounded-md md:w-[30%] max-h-[900px] overflow-y-scroll ${
                  snapshot.isDraggingOver
                    ? "bg-[#fffffe] border-[5px] border-[#fdfff5] shadow-lg shadow-gray-500"
                    : ""
                }`}
              >
                <h1
                  className={`${dm_sans.className} text-lg font-bold text-[15px]`}
                >
                  Exercise List
                </h1>
                <div>
                  <h1 className='text-sm mt-3 mb-2 text-blue-500 flex items-center gap-3'>
                    <MdAddBox />
                    Add To {patient?.title.split(" ")[0]}'s Exercise List
                  </h1>
                  <div className='flex items-center justify-center'>
                    <TextField
                      id='outlined-search'
                      value={searchInput}
                      onChange={handleSearch}
                      type='search'
                      focused
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <BsSearch color='#3BE13B' />
                          </InputAdornment>
                        ),
                      }}
                      sx={style}
                      placeholder='Search Exercises'
                    />
                  </div>

                  <div
                    className='w-[90%] bg-white flex flex-col shadow-[#ddd] shadow-lg rounded-lg mt-[1rem] max-h-[200px] overflow-y-scroll'
                    style={{
                      zIndex: 2,
                      position: "absolute",
                    }}
                  >
                    {searchInput.length > 0 &&
                      results.map((result) => (
                        <div
                          key={result.id}
                          className='p-4 hover:bg-[#efefef] cursor-pointer border-b-1'
                        >
                          <h1>{result.name}</h1>
                          <div className='flex items-center gap-3 text-[12px] text-blue-500 mt-2'>
                            {/* <button>View</button> */}
                            <Link
                              href={`/exercises/${result.id}`}
                              className='hover:bg-green-300 cursor-pointer bg-green-500 text-white p-1 text-center duration-300 hover:scale-110 rounded-lg w-[20%]'
                            >
                              View
                            </Link>
                            <button
                              onClick={() => assignExercise(result.id)}
                              className='hover:bg-blue-300 cursor-pointer bg-blue-500 text-white p-1 text-center duration-300 hover:scale-110 rounded-lg w-[20%]'
                            >
                              Assign
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
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
                              <button
                                onClick={() => removeExercise(exercise.id)}
                                className='text-red-500 hover:underline cursor-pointer flex items-center w-[40%]'
                              >
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

          <Droppable droppableId='patient-flowsheet'>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className='bg-[#fdfff5] max-h-[900px] p-7 shadow-lg shadow-gray-200 rounded-md md:w-[70%] text-lg tracking-widest'
              >
                <div className='flex items-center justify-between'>
                  <h1
                    className={`${dm_sans.className} text-lg font-bold text-[15px] normal-case tracking-normal`}
                  >
                    Flow Sheet
                  </h1>
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
                      {/* <Droppable droppableId='patient-flowsheet'> */}
                      {/* {(provided, snapshot) => ( */}
                      <tbody>
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
                                  className={`hover:bg-[#fdfff5] w-full my-4 shadow-lg shadow-gray-300 rounded-lg cursor-pointer tracking-normal duration-300 hover:scale-105 ${
                                    snapshot.isDragging ? "shadow-gray-600" : ""
                                  }`}
                                >
                                  <td className=' px-6'>
                                    <h1 className='p-8'>
                                      {exerciseObj.exercise?.name}
                                    </h1>
                                  </td>
                                  <td className=' px-6 py-5'>
                                    <div className='flex gap-3'>
                                      <div>
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
                                      <p>
                                        {new Date(
                                          exerciseObj.createdAt
                                        ).toDateString()}
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </Draggable>
                          ))}
                      </tbody>
                      {/* </Droppable> */}
                    </table>
                  ) : (
                    <div className='mt-4 normal-case'>
                      Make a schedule for patient.
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
}
