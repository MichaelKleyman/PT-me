/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout, me } from "@/Redux/Features/auth/authSlice";
import { AppDispatch, RootState } from "../../Redux/store";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { Button } from "@mui/material";
import { BsChevronDown } from "react-icons/bs";
import { FcClock, FcCalendar } from "react-icons/fc";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import { Patient } from "../../../types";
import { fetchAllPatients } from "@/Redux/Features/patients/patientSlice";
import Badge from "@mui/material/Badge";
import { IoMdNotificationsOutline } from "react-icons/io";

type Obj = {
  id: Number;
};

type Params = {
  params: Obj;
};

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
    minWidth: 180,
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

export default function Account({ params }: Params) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [patients, setPatients] = useState<Patient[]>();
  const [todaysPatients, setTodaysPatients] = useState<Patient[]>();
  const [appointmentsInHour, setAppointments] = useState<any[]>();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch<AppDispatch>();
  const clinic = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  const appointmentsInOneHour = (patients: Patient[]) => {
    const todaysAppointments: any[] = [];
    patients.forEach((patient) => {
      todaysAppointments.push(patient.appointments);
    });
    const currentTimestamp = new Date().getTime(); // Get current timestamp in milliseconds
    const oneHourInMilliseconds = 60 * 60 * 1000; // One hour in milliseconds
    const appointmentsInAnHour = [];
    for (const nestedArray of todaysAppointments) {
      for (const appointment of nestedArray) {
        const appointmentStartTimestamp = new Date(appointment.start).getTime();
        const appointmentDate = new Date(
          appointment.start
        ).toLocaleDateString();

        const isSameDay =
          appointmentDate === new Date(currentTimestamp).toLocaleDateString();
        const isFuture = appointmentStartTimestamp > currentTimestamp;

        if (
          appointmentStartTimestamp - currentTimestamp <=
            oneHourInMilliseconds &&
          isSameDay &&
          isFuture
        ) {
          // If the appointment is an hour away or less and on the same day, add it to the filteredAppointments array
          
          appointmentsInAnHour.push(appointment);
        }
      }
    }
    setAppointments(appointmentsInAnHour);
  };

  useEffect(() => {
    if (clinic?.id) {
      // If clinic data is available, fetch the patients
      async function getPatients() {
        const { payload } = await dispatch(fetchAllPatients(clinic.id));
        appointmentsInOneHour(payload as Patient[]);
        const todaysPatients = (payload as Patient[]).filter((patient) => {
          const appointmentDate = new Date(
            patient?.appointments[0]?.start as Date
          ).getDate();
          const todaysDate = new Date().getDate();
          if (appointmentDate === todaysDate) {
            return patient;
          }
        });
        setTodaysPatients(todaysPatients);
        setPatients(payload as Patient[]);
      }
      getPatients();
    }
  }, [clinic]);

  const handleLogout = () => {
    try {
      router.push("/");
      dispatch(logout);
    } catch (error) {
      console.error("UH OH: ", error);
    }
  };

  const todaysDate = new Date().toDateString();
  const options: {
    hour: "2-digit" | "numeric" | undefined;
    minute: "2-digit" | "numeric" | undefined;
    hour12: boolean;
  } = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const formattedTime = new Date().toLocaleTimeString(undefined, options);

  return (
    <div className='ml-[5rem]'>
      <div className='flex items-center justify-between shadow-lg shadow-gray-400 p-6'>
        <div>
          <h1 className='text-[20px]'>Hi, {clinic?.clinicName}</h1>
          <div className='flex items-center gap-5'>
            <p className='text-[15px] mt-2 flex items-center gap-2'>
              <FcCalendar size={20} />{" "}
              <span className='text-gray-400'>{todaysDate}</span>
            </p>
            <p className='text-[15px] mt-2 flex items-center gap-2'>
              <FcClock size={20} />
              <span className='text-gray-400'>{formattedTime}</span>
            </p>
          </div>
        </div>
        <div className='flex items-center gap-8'>
          {/* <Badge badgeContent={4} color='success'>
            <div className='rounded-lg shadow-lg shadow-gray-400 p-2 hover:scale-110 duration-300 cursor-pointer'>
              <IoMdNotificationsOutline color='action' size={30} />
            </div>
          </Badge> */}
          <Button
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup='true'
            aria-expanded={open ? "true" : undefined}
            disableElevation
            endIcon={<BsChevronDown size={15} />}
            onClick={handleClick}
            className='bg-[#3BE13B] text-white p-3 rounded-lg flex justify-center no-underline items-center'
          >
            <FiSettings size={20} />
          </Button>
          <StyledMenu
            id='demo-customized-menu'
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              onClick={handleLogout}
              disableRipple
              className='flex gap-6'
            >
              <FiLogOut />
              Log Out
            </MenuItem>
          </StyledMenu>
        </div>
      </div>
      {/* <div className='p-4 text-[14px]'>
        <p className='mt-2'>Clinic Address: {clinic?.address}</p>
        <p className='mt-2'>Clinic Email: {clinic?.email}</p>
      </div> */}
      <div className='grid grid-cols-2'>
        <div className='flex items-center justify-center mt-8 m-[2rem]'>
          <div className='grid lg:grid-cols-2 gap-8'>
            <div className='card shadow-lg shadow-gray-400 rounded-lg p-4 w-[220px] h-[200px]'>
              <h1 className='text-[45px] flex items-center gap-1'>
                {todaysPatients?.length}
                <span className='text-[20px] text-gray-400'>
                  / {patients?.length}
                </span>
              </h1>
              <h2 className='text-[14px] text-gray-400'>Todays appointments</h2>
            </div>
            <div className='card shadow-lg shadow-gray-400 rounded-lg p-4 w-[220px] h-[200px]'>
              <h1 className='text-[45px]'>{patients?.length}</h1>
              <h2 className='text-[14px] text-gray-400'>Total Patients</h2>
            </div>
          </div>
        </div>
        <div className='m-[2rem] shadow-lg shadow-gray-400 rounded-lg'>
          <h1 className='font-bold text-lg shadow-lg shadow-gray-400 p-3'>
            Appointment Reminders
          </h1>
          {appointmentsInHour?.map((appointment) => (
            <div key={appointment.id}></div>
          ))}
        </div>
      </div>
    </div>
  );
}
