/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState, ReactElement, Ref, forwardRef } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import type { AppDispatch, RootState } from "@/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPatients } from "@/Redux/Features/patients/patientSlice";
import { IoMdAddCircle, IoIosArrowForward } from "react-icons/io";
import { Patient } from "../../../types";
import { BiSolidCheckbox, BiSolidSelectMultiple } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { Button, Checkbox, InputAdornment, TextField } from "@mui/material";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { GoShare } from "react-icons/go";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import { BASE_URL, CLIENT } from "@/components/api";
import { useRouter } from "next/navigation";
import Pagination from "@mui/material/Pagination";
import { BsSearch } from "react-icons/bs";

const style = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#3BE13B",
    },
  },
  width: "50%",
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function AllPatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const clinic = useSelector((state: RootState) => state.auth.user);
  const [checked, setChecked] = useState<number[]>([]);
  const [showSelected, setShowSelected] = useState<boolean>(false);
  const [selectedPatients, setSelectedPatients] = useState<Patient[]>();
  const [clickedDelete, setClickedDelete] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (clinic?.id) {
      // If clinic data is available, fetch the patients
      async function getPatients() {
        const { payload } = await dispatch(fetchAllPatients(clinic.id));
        const arrayToSort = [...(payload as Patient[])];
        const sortedPayload = arrayToSort.sort((a, b) => a.id - b.id);
        setPatients(sortedPayload);
      }
      getPatients();
    }
  }, [clinic]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleOpenDelete = () => {
    setClickedDelete(true);
  };

  const handleCloseDelete = () => {
    setClickedDelete(false);
  };

  const deletePatients = () => {
    checked.forEach(async (id) => {
      await CLIENT.delete(`${BASE_URL}/api/patients/${id}`);
    });
    setClickedDelete(false);
    location.reload();
  };

  const handleClick = (patientId: number) => () => {
    if (checked.includes(patientId)) {
      const index = checked.indexOf(patientId);
      const checkedCopy = [...checked];
      checkedCopy.splice(index, 1);
      setChecked(checkedCopy);
    } else {
      const ids = [...checked, patientId];
      setChecked(ids);
    }
  };

  const handleToggle = (bool: boolean) => {
    setShowSelected(bool);
    const newPatientsArr = patients?.filter((patient) =>
      checked.includes(patient.id)
    );
    setSelectedPatients(newPatientsArr);
  };

  const changePageForAllPatients = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPageNumber(pageNumber - 1);
    window.scrollTo({ top: 0 });
  };

  const selectAllOrNone = () => {
    if (checked.length !== patients?.length) {
      const allChecked = patients?.map((patient) => patient.id);
      setChecked(allChecked as number[]);
    } else {
      setChecked([]);
    }
  };

  function stringToColor(string: string) {
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
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1]?.[0]}`,
    };
  }

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const showAppointment = () => {
    router.push("/");
  };

  const patientsPerPage = 7;
  const pagesVisited = pageNumber * patientsPerPage;

  const searchAllPatientsResults = patients?.filter((ex: Patient) =>
    ex.title.toLowerCase().includes(searchInput)
  );

  let allPatientsPageCount;
  if (searchAllPatientsResults?.length) {
    allPatientsPageCount = Math.ceil(
      searchAllPatientsResults?.length / patientsPerPage
    );
  } else {
    allPatientsPageCount = Math.ceil(patients?.length / patientsPerPage);
  }

  return (
    <div className='mt-[2rem] md:ml-[8rem] p-9'>
      <h1 className='text-xl tracking-widest font-bold uppercase'>
        <span className='text-green-500'>Patients</span> in your clinic
      </h1>
      <div className='mt-2 flex items-center justify-between'>
        <h1>
          Total Number of Patients: <span>{patients?.length}</span>
        </h1>
        <Link
          href='/patients/create-patient'
          className='p-2 bg-[#3BE13B] rounded-lg shadow-green-400 shadow-lg duration-300 hover:scale-110 text-white flex items-center gap-3'
        >
          <IoMdAddCircle size={22} />
          Create New Patient
        </Link>
      </div>
      <div className='flex items-center justify-center my-4'>
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
          placeholder='Search Patient'
        />
      </div>
      <div className='mt-8'>
        <div className='lg:grid hidden lg:grid-cols-6 gap-6 place-items-center text-sm bg-[#edecec] p-2 uppercase tracking-wide text-[10px] font-medium rounded-lg'>
          <></>
          <h1>Name</h1>
          <h1>Status</h1>
          <h1>Address</h1>
          <h1>Phone Number</h1>
          <h1>Reason For Visit</h1>
        </div>
        {patients?.length ? (
          !showSelected ? (
            patients
              .filter((ex) =>
                ex.title.toLowerCase().includes(searchInput.toLowerCase())
              )
              ?.slice(pagesVisited, pagesVisited + patientsPerPage)
              .map((patient) => (
                <div
                  key={patient.id}
                  className='grid lg:grid-cols-6 gap-[4rem] place-items-center p-6 border-b-[1px] border-[#eaece1] hover:bg-[#eae8e8] duration-300 cursor-pointer'
                >
                  <div style={{ whiteSpace: "nowrap" }}>
                    <div className='flex items-center gap-5'>
                      <Checkbox
                        {...label}
                        checked={checked.includes(patient.id)}
                        onClick={handleClick(patient?.id)}
                      />
                      <Stack direction='row' spacing={2}>
                        <Avatar
                          {...stringAvatar(patient.title)}
                          sx={{
                            width: 56,
                            height: 56,
                            bgcolor: `${stringToColor(patient.title)}`,
                          }}
                        />
                      </Stack>
                      <div
                        style={{ whiteSpace: "break-spaces" }}
                        className='w-[40px] sm:w-[70px] md:w-[100px] lg:w-[150px]'
                      >
                        <p className='font-bold text-[18px]'>{patient.title}</p>
                        <div
                          typeof='button'
                          className='hover:underline cursor-pointer'
                          onClick={showAppointment}
                        >
                          {new Date(patient?.appointments[0]?.start as Date) >
                          new Date() ? (
                            <div className='flex flex-col text-gray-500 text-[12px]'>
                              <p>Next Appointment</p>
                              {new Date(
                                patient?.appointments[0]?.start as Date
                              ).toDateString()}
                            </div>
                          ) : !patient?.appointments.length ? (
                            <div className='flex flex-col text-gray-500 text-[12px]'>
                              New Patient
                            </div>
                          ) : (
                            <div className='flex flex-col text-gray-500 text-[12px]'>
                              <p>Last Appointment</p>
                              {new Date(
                                patient?.appointments[0]?.start as Date
                              ).toDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-3 text-gray-500 text-[14px]'>
                    <BiSolidCheckbox
                      size={18}
                      color={
                        patient?.appointments.some(
                          (appointment) =>
                            new Date(appointment.start as Date) >= new Date()
                        )
                          ? "green"
                          : "red"
                      }
                    />{" "}
                    {`${
                      patient?.appointments.some(
                        (appointment) =>
                          new Date(appointment.start as Date) >= new Date()
                      )
                        ? "Scheduled"
                        : "No Appointment"
                    }`}
                  </div>
                  <p className='text-gray-500 text-[14px]'>{patient.address}</p>
                  <p className='text-gray-500 text-[14px]'>
                    {patient.phoneNumber}
                  </p>
                  <p className='text-[14px] text-center'>
                    {patient.reasonForVisit}
                  </p>
                  <Link
                    href={`/patient/${patient.id}`}
                    className='flex items-center justify-center rounded-lg w-[50%] cursor-pointer hover:scale-110 duration-300 '
                  >
                    <Button variant='outlined' endIcon={<IoIosArrowForward />}>
                      View
                    </Button>
                  </Link>
                </div>
              ))
          ) : (
            selectedPatients?.map((patient) => (
              <div
                key={patient.id}
                className='grid md:grid-cols-6 gap-8 place-items-center p-6 border-b-[1px] border-[#eaece1] hover:bg-[#eae8e8] duration-300 cursor-pointer'
              >
                <div style={{ whiteSpace: "nowrap" }}>
                  <div className='flex items-center gap-5'>
                    <Checkbox
                      {...label}
                      checked={checked.includes(patient.id)}
                      onClick={handleClick(patient?.id)}
                    />
                    <Stack direction='row' spacing={2}>
                      <Avatar
                        {...stringAvatar(patient.title)}
                        sx={{
                          width: 56,
                          height: 56,
                          bgcolor: `${stringToColor(patient.title)}`,
                        }}
                      />
                    </Stack>
                    <div
                      style={{ whiteSpace: "break-spaces" }}
                      className='w-[40px] sm:w-[70px] md:w-[100px] lg:w-[150px]'
                    >
                      <p className='font-bold text-[18px]'>{patient.title}</p>
                      <div>
                        {new Date(patient?.appointments[0]?.start as Date) >
                        new Date() ? (
                          <div className='flex flex-col text-gray-500 text-[12px]'>
                            <p>Next Appointment</p>
                            {new Date(
                              patient?.appointments[0]?.start as Date
                            ).toDateString()}
                          </div>
                        ) : (
                          <div className='flex flex-col text-gray-500 text-[12px]'>
                            <p>Last Appointment</p>
                            {new Date(
                              patient?.appointments[0]?.start as Date
                            ).toDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-3 text-gray-500 text-[14px]'>
                  <BiSolidCheckbox
                    size={18}
                    color={
                      patient?.appointments.some(
                        (appointment) =>
                          new Date(appointment.start as Date) >= new Date()
                      )
                        ? "green"
                        : "red"
                    }
                  />{" "}
                  {`${
                    patient?.appointments.some(
                      (appointment) =>
                        new Date(appointment.start as Date) >= new Date()
                    )
                      ? "Scheduled"
                      : "No Appointment"
                  }`}
                </div>
                <p className='text-gray-500 text-[14px]'>{patient.address}</p>
                <p className='text-gray-500 text-[14px]'>
                  {patient.phoneNumber}
                </p>
                <p className='text-[14px] text-center'>
                  {patient.reasonForVisit}
                </p>
                <Link
                  href={`/patient/${patient.id}`}
                  className='flex items-center justify-center rounded-lg w-[50%] cursor-pointer hover:scale-110 duration-300 '
                >
                  <Button variant='outlined' endIcon={<IoIosArrowForward />}>
                    View
                  </Button>
                </Link>
              </div>
            ))
          )
        ) : (
          <div className='bg-[#fdfff5] h-[400px] w-[100%] flex items-center justify-center'>
            No patients in your clinic
          </div>
        )}
        <div className='flex items-center justify-center mt-5'>
          <Pagination
            count={allPatientsPageCount}
            variant='outlined'
            shape='rounded'
            onChange={changePageForAllPatients}
          />
        </div>
      </div>
      {checked.length > 0 && (
        <div className='flex items-center justify-center gap-5 bg-[#3BE13B] rounded-lg shadow-lg shadow-gray-400 text-white p-4 text-center fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[35%]'>
          <p className='uppercase tracking-wider text-[13px]'>
            {checked.length} selected
          </p>
          <div className='border-l-[2px] border-white h-4 mx-2' />
          <button
            onClick={selectAllOrNone}
            className='hover:scale-110 duration-300'
          >
            <BiSolidSelectMultiple size={20} />
          </button>
          <button className='hover:scale-110 duration-300'>
            <GoShare size={20} />
          </button>
          <button
            onClick={handleOpenDelete}
            className='hover:scale-110 duration-300'
          >
            <RiDeleteBinLine size={20} />
          </button>
          <div className='border-l-[2px] border-white h-4 mx-2' />
          <FormControlLabel
            control={
              <Switch
                checked={showSelected}
                onChange={() => handleToggle(!showSelected)}
              />
            }
            label='Show selected'
          />
        </div>
      )}
      <div>
        {clickedDelete && (
          <Dialog
            open={clickedDelete}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDelete}
            aria-describedby='alert-dialog-slide-description'
          >
            <DialogTitle className='text-red-600'>
              {`Warning! You are deleting ${checked.length} patients permanently!`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-slide-description'>
                By clicking delete, you will lose all of this patient
                information.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDelete}>Cancel</Button>
              <Button onClick={deletePatients}>Delete</Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </div>
  );
}
