"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineFileSearch } from "react-icons/ai";
import { CLIENT, BASE_URL } from "@/components/api";
import Iframe from "react-iframe";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import TextField from "@mui/material/TextField";
import { BsSearch } from "react-icons/bs";
import InputAdornment from "@mui/material/InputAdornment";
import type { AppDispatch, RootState } from "../../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPatients,
  fetchAssignPatients,
} from "@/Redux/Features/patients/patientSlice";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Alert from "@mui/material/Alert";
import { Patient, Credential } from "../../../../types";
import { FaArrowLeft } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { CustomTabPanel, a11yProps } from "@/components/MUITabFunctions";
import Box from "@mui/material/Box";
import ExerciseAssignees from "@/components/ExerciseAssignees";

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

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle='#draggable-dialog-title'
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

type Obj = {
  id: Number;
};

type Params = {
  params: Obj;
};
const injuryTypes = [
  "Shoulders",
  "Back",
  "Knee",
  "Hip",
  "Neck",
  "Wrist/Hand",
  "Ankle/Foot",
  "Abdominal",
  "Gluteal",
];

export default function SpecificExercise({ params }: Params) {
  const [results, setResults] = useState<Patient[]>([]);
  const [clicked, setClicked] = useState<boolean>(false);
  const [assigned, setAssigned] = useState<boolean>(false);
  const [patients, setPatients] = useState<Patient[]>();
  const [ids, setIds] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [credential, setCredential] = useState<Credential>();
  const dispatch = useDispatch<AppDispatch>();
  const clinic = useSelector((state: RootState) => state.auth.user);
  const [value, setValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getExercise = async () => {
    const { data } = await CLIENT.get(`${BASE_URL}/api/exercises/${params.id}`);
    if (data) {
      return data;
    }
  };

  const { data: exercise, isLoading: isLoading } = useQuery({
    queryFn: () => getExercise(),
    queryKey: ["exercise"],
  });

  useEffect(() => {
    const getExerciseCredentialsHistory = async () => {
      const amountOfCredentials = "One";
      const { data } = await CLIENT.get(
        `${BASE_URL}/api/exEditCredentials/credential-history/${params.id}/${amountOfCredentials}`
      );
      setCredential(data);
    };
    getExerciseCredentialsHistory();
  }, []);

  const handleClose = () => {
    setClicked(false);
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    const input = e.target.value;
    if (input.length >= 2) {
      const { data } = await CLIENT.get(
        `${BASE_URL}/api/patients/search-patients/${input}`
      );

      setResults(data);
    }
  };

  const clickedPatient = async (id: number) => {
    setIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((prevId) => prevId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };

  const submitAssignExercise = async () => {
    for (let i = 0; i < ids.length; i++) {
      const { data } = await CLIENT.post(
        `${BASE_URL}/api/exercises/patient/add-exercise/${ids[i]}/${exercise.id}`
      );
    }
    setAssigned(true);
    setTimeout(() => {
      setAssigned(false);
      handleClose();
    }, 2500);
  };

  const clickAssign = async () => {
    setClicked(true);
    setLoading(true);

    try {
      const { payload } = await dispatch(
        fetchAssignPatients({ clinicId: clinic.id, exerciseId: exercise.id })
      );
      setPatients(payload as Patient[]);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center p-9 h-screen'>
        <span className='loader'></span>
      </div>
    );
  }

  return (
    <div className='mt-[1rem] md:ml-[6rem] p-4'>
      <div className='mb-2 flex text-center gap-2'>
        <Link
          href='/exercises'
          className='mb-5 text-sm text-gray-400 hover:underline duration-300 hover:scale-110 flex items-center gap-2'
        >
          <AiOutlineFileSearch />
          All Exercises
        </Link>
        <div>/</div>
        <div className='text-sm'>Exercise</div>
      </div>
      <div className='grid lg:grid-cols-2 gap-4 mt-[1rem] place-items-start'>
        <div>
          <h1 className='uppercase tracking-widest text-2xl font-medium'>
            {exercise?.name}
          </h1>
          <div className='mt-2 text-[12px] text-gray-400'>
            {credential ? (
              <Link
                href={{
                  pathname: `/exercises/${exercise.id}/edit-history`,
                  query: { name: `${exercise.name}` },
                }}
                className='hover:underline hover:cursor-pointer flex items-center gap-3'
              >
                Edited by {credential?.editorName} from {credential?.clinicName}{" "}
                {credential && (
                  <p className='flex items-center gap-3 text-green-500 text-[12px]'>
                    <FaArrowLeft className='animate-bounce' /> Click to view
                  </p>
                )}
              </Link>
            ) : (
              "No edits have been made to this exercise page"
            )}
          </div>
          <div className='mt-4'>
            <h1 className='underline text-green-500 my-2'>Description</h1>
            <p>{exercise?.description}</p>
          </div>
          <div className='mt-3'>
            <h1 className='underline text-green-500 my-2'>Tips</h1>
            <p>{exercise?.tips}</p>
          </div>
          <div className='mt-3'>
            <h1 className='underline text-green-500 my-2'>Muscles Worked</h1>
            <p>{exercise?.musclesWorked}</p>
          </div>
        </div>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              aria-label='basic tabs example'
            >
              <Tab label='Instructional Video' {...a11yProps(0)} />
              <Tab label='Assigned To' {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Iframe
              url={exercise?.videoLink}
              width='540'
              height='315'
              allowFullScreen
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ExerciseAssignees exerciseId={exercise.id} clinicId={clinic.id} />
          </CustomTabPanel>
        </Box>
      </div>

      <button
        className='hover:bg-blue-100 hover:text-white mt-[2rem] cursor-pointer bg-blue-500 text-white p-1 text-center duration-300 hover:scale-110 rounded-lg w-[20%] md:w-[30%] lg:w-[10%]'
        onClick={clickAssign}
      >
        Assign
      </button>

      <Dialog
        open={clicked}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
        fullWidth={true}
      >
        <DialogTitle style={{ cursor: "move" }} id='draggable-dialog-title'>
          Exercise Assignment
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Assign this exercise to patients in your practice.
          </DialogContentText>
          <div className='flex items-center justify-center py-[1rem]'>
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
              placeholder='Search Patients'
            />
          </div>
          <div className='h-[200px] overflow-y-scroll'>
            {loading ? (
              <div className='flex items-center justify-center p-9'>
                <span className='loader'></span>
              </div>
            ) : (
              <div>
                {patients?.length ? (
                  (!searchInput.length ? patients : results)?.map((patient) => (
                    <div
                      key={patient.id}
                      className='p-2 flex items-center justify-between'
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={() => clickedPatient(patient.id)}
                          />
                        }
                        label={patient.title}
                      />
                      <div className='flex justify-between items-center'>
                        <p className='text-sm text-green-500'>
                          {injuryTypes[patient.injuryId - 1]}
                        </p>
                        <div className='border-l border-green-300 h-4 mx-2' />
                        <p className='text-sm text-green-500'>
                          {patient.reasonForVisit}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='flex items-center justify-center'>
                    No patients in your clinic
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          {assigned ? (
            <Alert severity='success'>Successfully Assigned</Alert>
          ) : (
            <Button onClick={submitAssignExercise}>Assign</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
