/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, {
  useState,
  useEffect,
  forwardRef,
  ReactElement,
  Ref,
  ChangeEvent,
} from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { GrCalendar } from "react-icons/gr";
import { BiSolidCheckbox } from "react-icons/bi";
import {
  BsDot,
  BsFillBellFill,
  BsFileMedical,
  BsDownload,
  BsSend,
  BsChevronDown,
} from "react-icons/bs";
import { FiPhone, FiDelete } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import {
  AiOutlineMail,
  AiOutlineFileSearch,
  AiOutlineLink,
  AiOutlineEye,
  AiOutlineClose,
  AiOutlineEdit,
} from "react-icons/ai";
import Link from "next/link";
import {
  fetchPatient,
  fetchPatientsExercises,
} from "@/Redux/Features/patients/patientSlice";
import type { AppDispatch, RootState } from "@/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
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
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import PDFPreview from "@/components/PDFPreview";
import { Patient } from "../../../../types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Image from "next/legacy/image";
import emptyImage from "../../../images/empty.jpg";
import ExpandedView from "@/components/ExpandedView";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { MenuItem } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import ListItemText from "@mui/material/ListItemText";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 600,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

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

interface ExerciseData {
  id: number;
  map: any;
  name: string;
  injuryId: number;
  videoLink: string;
  Patients: Patient[];
  tips: string;
  description: string;
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

interface EmailConfig {
  type: string;
  subject: string;
  message: string;
}

type Obj = {
  id: number;
};

type Params = {
  params: Obj;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function Patient({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: {
    [key: string]: string | boolean | undefined;
  };
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingSchedule, setIsLoadingSchedule] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [expandedLoading, setExpandedLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<ExerciseData[]>([]);
  const [status, setStatus] = useState<string>();
  const [patient, setPatient] = useState<Patient | undefined>();
  const [searchInput, setSearchInput] = useState<string>("");
  const [patientsExercises, setExercises] = useState<ExerciseData[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [schedule, setSchedule] = useState<Exercise[]>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const [clickExpand, setClickExpand] = useState<boolean>(false);
  const [clickedRemove, setClickedRemove] = useState<boolean>(false);
  const [newRepetitions, setNewRepetitions] = useState<Repetitions>({
    sets: 0,
    reps: 0,
    id: 0,
  });
  const [emailConfig, setEmailConfig] = useState<EmailConfig>({
    type: "Appointment Reminder",
    subject: "Hey! Don't forget about your Physical Therapy appointment 📆",
    message: "",
  });
  const router = useRouter();
  let open = Boolean(anchorEl);
  const clinic = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    async function getPatient() {
      const { payload } = await dispatch(fetchPatient(params.id));
      if (searchParams.openEmail) {
        setAnchorEl(document.getElementById("click-email"));
        setEmailConfig({
          type: "Appointment Reminder",
          subject:
            "Hey! Don't forget about your Physical Therapy appointment 📆",
          message: `Hi ${
            (payload as Patient).title
          }, you have an appointment at ${
            clinic && clinic.clinicName
          } within an hour from now, at ${
            searchParams.appointmentTime
          }. Feel free to contact your physical therapy office at their email ${
            clinic && clinic.email
          } for any scheduling/appointment needs. See you soon!`,
        });
      }
      if (payload) {
        setIsLoading(false);
        const { data } = await CLIENT.get(
          `${BASE_URL}/api/appointments/latest-appointment/${
            (payload as Patient).id
          }`
        );
        if (
          data?.some(
            (appointment: any) =>
              new Date(appointment.start as Date) >= new Date()
          )
        ) {
          setStatus("Scheduled");
        } else {
          setStatus("No Appointment");
        }

        setPatient(payload as Patient);
      }
    }
    async function getPatientExercises() {
      const { payload } = await dispatch(fetchPatientsExercises(params.id));
      setExercises(payload as ExerciseData[]);
    }
    setTimeout(() => {
      getPatient();
      getPatientExercises();
    }, 1000);
  }, [setAnchorEl]);

  useEffect(() => {
    async function getSchedule() {
      const { data } = await CLIENT.get(
        `${BASE_URL}/api/schedule/patient/${params.id}`
      );
      if (data) {
        setIsLoadingSchedule(false);
        let exercises = data.exercises;

        setSchedule(exercises);
      }
    }
    setTimeout(() => {
      getSchedule();
    }, 1000);
  }, [params.id, setSchedule]);

  // useEffect(() => {
  //   if (searchParams.openEmail) {
  //     setAnchorEl(document.getElementById("click-email"));
  //     setEmailConfig({
  //       type: "Appointment Reminder",
  //       subject: "Hey! Don't forget about your Physical Therapy appointment 📆",
  //       message: `Hi ${patient && patient?.title}, you have an appointment at ${
  //         clinic && clinic.clinicName
  //       } within an hour from now, at ${searchParams.appointmentTime}.`,
  //     });
  //   }
  // }, [searchParams.openEmail]);

  const changeEmailType = (type: string) => {
    if (type === "Appointment Reminder") {
      setEmailConfig({
        type,
        subject: "Hey! Don't forget about your Physical Therapy appointment 📆",
        message: "",
      });
    } else {
      setEmailConfig({
        type,
        subject: "",
        message: "",
      });
    }
  };

  const handleClickEmail = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };
  const handleCloseEmail = () => {
    setAnchorEl(null);
  };

  const handleSendEmail = async (e: {
    target: any;
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    setAnchorEl(null);
    console.log(emailConfig);
    try {
      await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify({
          name: patient?.title,
          clinicName: clinic.clinicName,
          type: emailConfig.type,
          subject: emailConfig.subject,
          message: emailConfig.message,
          toEmail: patient?.email,
          clinicEmail: clinic.email,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to send Message");
        } else {
          return res.json(); //returns the response body parsed
        }
      });
    } catch (error) {
      console.log(">>>>>", error);
    }
    setEmailConfig({ type: "", subject: "", message: "" });
  };

  const handleSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    const obj = {
      type: emailConfig?.type,
      message: emailConfig?.message,
      subject: e.target.value,
    };
    setEmailConfig(obj as EmailConfig);
  };

  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const obj = {
      type: emailConfig?.type,
      subject: emailConfig?.subject,
      message: e.target.value,
    };
    setEmailConfig(obj as EmailConfig);
  };

  const downloadFullPDF = () => {
    const capture = document.querySelector(".patient-page");
    setLoading(true);
    html2canvas(capture as HTMLElement).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      //p is portrait, mm is millimeters, a4 is page size
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [12, 8],
      });
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoading(false);
      doc.save(`${patient?.title} profile.pdf`);
    });
  };

  const downloadExpandedPDF = () => {
    const capture = document.querySelector(".content");
    setExpandedLoading(true);
    html2canvas(capture as HTMLElement).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      //p is portrait, mm is millimeters, a4 is page size
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [8, 14],
      });
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setExpandedLoading(false);
      doc.save(`${patient?.title} Flowsheet.pdf`);
    });
  };

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

  const handleUpdate = () => {
    setUpdate(!update);
  };

  const handleClickExpand = () => {
    setClickExpand(true);
  };

  const handleCloseExpand = () => {
    setClickExpand(false);
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
    let patientFlowSheet = schedule ? [...schedule] : [];

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

    const { payload } = await dispatch(fetchPatientsExercises(params.id));
    setExercises(payload as ExerciseData[]);
    setSearchInput("");
  };

  const deletePatient = async () => {
    router.push("/patients");
    await CLIENT.delete(`${BASE_URL}/api/patients/${patient?.id}`);
    setClickedRemove(false);
  };

  const handleOpenDeletePatient = () => {
    setClickedRemove(true);
  };

  const handleCloseDeletePatient = () => {
    setClickedRemove(false);
  };

  interface InjuryDictionary {
    [key: number]: string;
  }
  const injuryDictionary: InjuryDictionary = {
    1: "Shoulders",
    2: "Back",
    3: "Knee",
    4: "Hip",
    5: "Neck",
    6: "Wrist/Hand",
    7: "Ankle/Foot",
    8: "Abdominal",
    9: "Gluteal",
  };

  const parts = patient?.address.split(",").map((part) => part.trim());
  const printReadyPatientData = {
    "Last Name": patient?.title.split(" ")[1] as string,
    "First Name": patient?.title.split(" ")[0] as string,
    Age: patient?.age as unknown as number,
    Gender: patient?.gender as string,
    Email: patient?.email as string,
    "Phone Number": patient?.phoneNumber as unknown as number,
    Insurance: patient?.insurance as string,
    Address: parts?.[0] as string,
    State: parts?.[1]?.split(" ")[1] as string,
    City: parts?.[1]?.split(" ")[0] as string,
    "Reason For Visit": patient?.reasonForVisit as string,
    Zipcode: parts?.[2] as unknown as number,
    "Injury Type": patient?.injuryId
      ? (injuryDictionary[patient.injuryId] as string)
      : "Unknown",
  };

  const showAppointment = () => {
    router.push("/");
  };

  if (isLoading || isLoadingSchedule) {
    return (
      <div className='flex items-center justify-center p-9 h-screen'>
        <span className='loader'></span>
      </div>
    );
  }
  return (
    <div className='mt-[1rem] md:ml-[6rem] p-4'>
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

      <div className='patient-page'>
        <div className='bg-[#fdfff5] p-7 shadow-lg shadow-gray-200 rounded-md'>
          <div className='grid xl:grid-cols-2'>
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
                    <BsDot size={30} color='green' />
                  </div>
                  <p>{injuryDictionary[patient?.injuryId as number]}</p>
                  <div className='hidden md:block'>
                    <BsDot size={30} color='green' />
                  </div>
                  <p>{patient?.reasonForVisit}</p>
                </div>
                <div className='mt-3 text-[12px] grid grid-cols-2 place-content-between gap-3'>
                  <div className='flex items-center'>
                    <GrCalendar className='pr-2' size={25} />

                    <div className='flex gap-3'>
                      <p>Arrived</p>
                      {new Date(patient?.createdAt as Date).toDateString()}
                    </div>
                  </div>
                  <div className='flex items-center justify-center'>
                    <h2 className='tracking-wide flex items-center gap-4'>
                      Status{" "}
                      <span
                        onClick={showAppointment}
                        typeof='button'
                        className='flex items-center gap-3 hover:underline cursor-pointer'
                      >
                        {" "}
                        <BiSolidCheckbox
                          size={18}
                          color={status === "Scheduled" ? "green" : "red"}
                        />{" "}
                        {status}
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative'>
              <div className='flex flex-col justify-center w-full gap-5'>
                <div className='flex justify-center w-full gap-5'>
                  <div
                    style={{ whiteSpace: "nowrap" }}
                    className='cursor-pointer shadow-lg shadow-green-400 rounded-lg h-10 p-2 text-center text-xs md:text-base w-[40%] flex items-center justify-evenly'
                  >
                    <FiPhone />
                    <p className='hidden sm:block md:hidden lg:block'>
                      {patient?.phoneNumber}
                    </p>
                  </div>
                  <button
                    style={{ whiteSpace: "nowrap" }}
                    id='click-email'
                    onClick={handleClickEmail}
                    className='cursor-pointer shadow-lg shadow-green-400 rounded-lg h-10 p-2 text-center text-xs md:text-base flex items-center justify-evenly gap-3'
                  >
                    <AiOutlineMail />
                    <p className='hidden sm:block md:hidden lg:block'>
                      {patient?.email}
                    </p>
                    <BsChevronDown />
                  </button>
                  <StyledMenu
                    id='demo-customized-menu'
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseEmail}
                  >
                    <div className='flex items-center gap-3 shadow-lg shadow-gray-300'>
                      <button
                        onClick={() => changeEmailType("Appointment Reminder")}
                        className={`${
                          emailConfig.type === "Appointment Reminder" &&
                          "bg-green-200"
                        } flex items-center gap-3 duration-300 hover:scale-110 hover:bg-gray-100 p-2 rounded-lg`}
                      >
                        <BsFillBellFill />
                        Appointment Reminder
                      </button>
                      <button
                        onClick={() => changeEmailType("Custom Email")}
                        className={`${
                          emailConfig.type === "Custom Email" && "bg-green-200"
                        } flex items-center gap-3 duration-300 hover:scale-110 hover:bg-gray-100 p-2 rounded-lg`}
                      >
                        <AiOutlineEdit />
                        Custom Email
                      </button>
                    </div>
                    <ListItemText className='ml-4 mt-5'>Subject</ListItemText>
                    <input
                      type='text'
                      name='subject'
                      className='w-[90%] border-b border-green-300 p-1 text-sm focus:border-blue-500 focus:outline-none m-4'
                      placeholder='Type subject here...'
                      value={emailConfig?.subject}
                      onChange={handleSubject}
                    />
                    <ListItemText className='ml-4 mt-2'>Message</ListItemText>
                    <textarea
                      rows={5}
                      cols={33}
                      name='message'
                      className='w-[90%] p-2 text-sm focus:border-blue-500 focus:outline-none m-4 rounded-lg shadow-lg shadow-green-300'
                      placeholder='Type email here...'
                      value={emailConfig?.message}
                      onChange={handleMessage}
                    />
                    <div className='flex items-center gap-3 m-4'>
                      <button
                        onClick={handleSendEmail}
                        className='ml-2 p-2 shadow-lg shadow-gray-400 bg-green-500 rounded-lg text-white duration-300 hover:scale-110 w-[30%]'
                      >
                        Send
                      </button>
                      <button
                        onClick={handleCloseEmail}
                        className='p-2 shadow-lg shadow-gray-400 rounded-lg duration-300 hover:scale-110 w-[30%]'
                      >
                        Cancel
                      </button>
                    </div>
                  </StyledMenu>
                  <div
                    style={{ whiteSpace: "nowrap" }}
                    className='cursor-pointer shadow-lg shadow-green-400 rounded-lg h-10 p-2 text-center text-xs md:text-base w-[40%] flex items-center justify-evenly'
                  >
                    <BsFileMedical />
                    <p className='hidden sm:block md:hidden lg:block'>
                      {patient?.insurance}
                    </p>
                  </div>
                </div>
                <div className='flex xl:hidden'>
                  <div className='flex items-center'>
                    <button
                      onClick={handleOpenDeletePatient}
                      className='text-red-600 flex items-center hover:underline duration-300 hover:scale-110 cursor-pointer mr-4'
                    >
                      <FiDelete className='p-2' size={35} /> Remove Patient
                    </button>
                    <button
                      onClick={downloadFullPDF}
                      className='text-blue-500 flex items-center hover:underline duration-300 hover:scale-110 cursor-pointer mr-4'
                    >
                      <BsDownload className='p-2' size={35} />{" "}
                      {loading ? "Downloading..." : "Download"}
                    </button>
                    {/* <p className='text-blue-500 flex items-center hover:underline duration-300 hover:scale-110 cursor-pointer mr-4'>
                <AiOutlineLink className='p-2' size={35} /> Share Link
              </p> */}
                    <span className='border-l-[1px] border-gray-300 h-full p-2'></span>
                    <Link
                      href={{
                        pathname: `/patient/edit-profile/${params.id}`,
                        query: { name: patient?.title },
                      }}
                      className='text-blue-500 flex items-center hover:underline duration-300 hover:scale-110 cursor-pointer'
                    >
                      <MdOutlineEdit className='p-2' size={35} /> Edit
                    </Link>
                  </div>
                </div>
              </div>

              <div className='absolute bottom-0 right-0 hidden xl:flex items-center'>
                <button
                  onClick={handleOpenDeletePatient}
                  className='text-red-600 flex items-center hover:underline duration-300 hover:scale-110 cursor-pointer mr-4'
                >
                  <FiDelete className='p-2' size={35} /> Remove Patient
                </button>
                <button
                  onClick={downloadFullPDF}
                  className='text-blue-500 flex items-center hover:underline duration-300 hover:scale-110 cursor-pointer mr-4'
                >
                  <BsDownload className='p-2' size={35} />{" "}
                  {loading ? "Downloading..." : "Download"}
                </button>
                {/* <p className='text-blue-500 flex items-center hover:underline duration-300 hover:scale-110 cursor-pointer mr-4'>
                <AiOutlineLink className='p-2' size={35} /> Share Link
              </p> */}
                <span className='border-l-[1px] border-gray-300 h-full p-2'></span>
                <Link
                  href={{
                    pathname: `/patient/edit-profile/${params.id}`,
                    query: { name: patient?.title },
                  }}
                  className='text-blue-500 flex items-center hover:underline duration-300 hover:scale-110 cursor-pointer'
                >
                  <MdOutlineEdit className='p-2' size={35} /> Edit
                </Link>
              </div>
              <div>
                {clickedRemove && (
                  <Dialog
                    open={clickedRemove}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseDeletePatient}
                    aria-describedby='alert-dialog-slide-description'
                  >
                    <DialogTitle className='text-red-600'>
                      {"Warning! You are deleting a patient permanently!"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id='alert-dialog-slide-description'>
                        By clicking delete, you will lose all of this patients
                        information.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDeletePatient}>Cancel</Button>
                      <Button onClick={deletePatient}>Delete</Button>
                    </DialogActions>
                  </Dialog>
                )}
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
                      patientsExercises?.map(
                        (exercise: ExerciseData, index) => (
                          <Draggable
                            key={exercise.id}
                            draggableId={exercise.name.toString()}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                className={`bg-[#fdfff5] shadow-lg shadow-gray-200 rounded-md m-3 p-7 duration-300 hover:scale-110 cursor-pointer ${
                                  snapshot.isDragging ? "shadow-gray-500" : ""
                                }`}
                              >
                                <h1 className='font-semibold'>
                                  {exercise.name}
                                </h1>
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
                        )
                      )
                    ) : (
                      <div className='m-1 tracking-widest flex flex-col items-center justify-center w-[100%]'>
                        {/* <p>No exercises for this patient.</p> */}
                        <Image
                          src={emptyImage}
                          alt='nothing-found'
                          height={200}
                          width={200}
                        />
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
                      <button
                        onClick={handleClickExpand}
                        className='text-[15px] text-blue-500 flex items-center hover:bg-[#fdfff5] hover:shadow-lg hover:shadow-gray-300 rounded-lg p-2 duration-300 hover:scale-110 cursor-pointer'
                      >
                        <FaExpand className='p-2' size={35} />
                        Expand
                      </button>
                      {!update ? (
                        <button
                          disabled={schedule.length === 0}
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
                                  className={`hover:shadow-lg ${
                                    index % 2 === 0
                                      ? "bg-white"
                                      : "bg-[#faffe6]"
                                  } hover:shadow-gray-400 w-full my-4 cursor-pointer tracking-normal rounded-lg duration-300 ${
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
      <Dialog
        fullScreen
        open={clickExpand}
        onClose={handleCloseExpand}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#3BE13B" }}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleCloseExpand}
              aria-label='close'
            >
              <AiOutlineClose />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
              {patient?.title.split(" ")[0]}'s Flowsheet
            </Typography>
            <Button
              disabled={schedule.length === 0}
              onClick={downloadExpandedPDF}
              autoFocus
              color='inherit'
            >
              <BsDownload className='p-2' size={35} />{" "}
              {expandedLoading ? "Downloading..." : "Download PDF"}
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent className='content'>
          <ExpandedView
            schedule={schedule}
            update={update}
            handleSetsChange={handleSetsChange}
            handleRepsChange={handleRepsChange}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
