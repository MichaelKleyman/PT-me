/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout, me } from "@/Redux/Features/auth/authSlice";
import { AppDispatch, RootState } from "../../Redux/store";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { Avatar, Button, Stack } from "@mui/material";
import { BsChevronDown } from "react-icons/bs";
import { FcClock, FcCalendar } from "react-icons/fc";
import { AiOutlineMail, AiOutlineEdit } from "react-icons/ai";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import { Patient } from "../../../types";
import { fetchAllPatients } from "@/Redux/Features/patients/patientSlice";
import Badge from "@mui/material/Badge";
import { IoIosArrowForward, IoMdNotificationsOutline } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import Link from "next/link";
import Image from "next/legacy/image";
import noAppointmentsImage from "../../images/none.jpg";
import DoughnutChart from "@/components/DoughnutChart";
import AppointmentsChart from "@/components/AppointmentsChart";
import Skeleton from "@mui/material/Skeleton";

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
    minWidth: 200,
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [patients, setPatients] = useState<Patient[]>();
  const [todaysPatients, setTodaysPatients] = useState<Patient[]>();
  const [appointmentsInHour, setAppointments] = useState<Patient[]>([]);
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
    const currentTime = new Date();
    const oneHourFromNow = new Date(currentTime.getTime() + 60 * 60 * 1000);
    const patientsWithAppointmentsInNextHour = patients.filter((patient) => {
      const hasAppointmentInNextHour = patient.appointments.some(
        (appointment) => {
          const appointmentStart = new Date(appointment.start as Date);
          return (
            appointmentStart > currentTime && appointmentStart <= oneHourFromNow
          );
        }
      );
      return hasAppointmentInNextHour;
    });
    return patientsWithAppointmentsInNextHour;
  };

  useEffect(() => {
    async function fetchData() {
      await dispatch(me());
    }
    fetchData();
    if (clinic?.id) {
      // If clinic data is available, fetch the patients
      async function getPatients() {
        const { payload } = await dispatch(fetchAllPatients(clinic.id));
        const todaysPatients = (payload as Patient[]).filter((patient) => {
          const appointmentDate = new Date(
            patient?.appointments[0]?.start as Date
          ).getDate();
          const todaysDate = new Date().getDate();
          if (appointmentDate === todaysDate) {
            return patient;
          }
        });
        const apts = appointmentsInOneHour(todaysPatients as Patient[]);
        setTimeout(() => {
          setAppointments(apts);
          setTodaysPatients(todaysPatients);
          setPatients(payload as Patient[]);
          setIsLoading(false);
        }, 1000);
      }
      getPatients();
    }
  }, []);

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
    <div className='md:ml-[5rem]'>
      <div className='mt-[4rem] md:mt-0 flex items-center justify-between shadow-lg shadow-gray-400 p-6 w-full'>
        <div
          style={{ whiteSpace: "nowrap" }}
          className='w-full overflow-x-scroll lg:overflow-hidden'
        >
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
            <p className='text-[15px] mt-2 flex items-center gap-2'>
              <AiOutlineMail size={20} />
              <span className='text-gray-400'>@{clinic?.email}</span>
            </p>
            <p className='text-[15px] mt-2 flex items-center gap-2'>
              <MdLocationOn size={20} />
              <span className='text-gray-400'>@{clinic?.address}</span>
            </p>
          </div>
        </div>
        <div className='flex items-center gap-8'>
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
            <MenuItem disableRipple>
              <Link
                href={{
                  pathname: `/${params.id}/edit-portal`,
                  query: {
                    clinicName: `${clinic?.clinicName}`,
                    address: `${clinic?.address}`,
                    email: `${clinic?.email}`,
                  },
                }}
                className='flex gap-6'
              >
                <AiOutlineEdit />
                Edit Portal
              </Link>
            </MenuItem>
          </StyledMenu>
        </div>
      </div>
      <div className='grid xl:grid-cols-2 gap-8'>
        <div className='flex items-center justify-center mt-8 sm:p-[4rem] p-0 m-[2rem] w-[70%] md:w-[80%] sm:ml-[1rem] md:ml-[6rem]'>
          <div>
            <DoughnutChart patients={patients} />
          </div>
        </div>
        <div className='mt-1 w-[60%] md:w-[80%] lg:w-full ml-[4rem] md:ml-0'>
          {isLoading ? (
            <div className='grid grid-cols-2 gap-4 m-[1.5rem]'>
              <Skeleton variant='rounded' width={"100%"} height={110} />
              <Skeleton variant='rounded' width={"100%"} height={110} />
            </div>
          ) : (
            <div className='grid grid-cols-2 gap-4 m-[1.5rem]'>
              <div className='shadow-lg shadow-gray-400 rounded-lg p-4 card'>
                <h1 className='text-[40px] flex items-center gap-1'>
                  {todaysPatients?.length}
                  <span className='text-[20px] text-gray-400'>
                    / {patients?.length}
                  </span>
                </h1>

                <h2 className='text-[18px] text-gray-400'>
                  Todays appointments
                </h2>
              </div>

              <div className='shadow-lg shadow-gray-400 rounded-lg p-4 card'>
                <h1 className='text-[40px]'>{patients?.length}</h1>
                <h2 className='text-[16px] text-gray-400'>Total Patients</h2>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className='m-[1.5rem]'>
              <Skeleton variant='rounded' width={"100%"} height={290} />
            </div>
          ) : (
            <div className='relative m-[1.5rem] shadow-lg shadow-gray-400 rounded-lg'>
              {appointmentsInHour?.length > 0 && (
                <div className='animate-bounce absolute -top-1 -left-5 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold'>
                  <Badge
                    badgeContent={appointmentsInHour?.length}
                    color='success'
                  >
                    <div className='z-50 rounded-lg shadow-lg shadow-gray-400 p-2 hover:scale-110 duration-300 cursor-pointer '>
                      <IoMdNotificationsOutline color='action' size={30} />
                    </div>
                  </Badge>
                </div>
              )}
              <h1 className='font-bold text-lg shadow-md shadow-gray-400 p-3'>
                Appointment Reminders{" "}
                <span className='text-gray-400 text-[14px] font-normal ml-2'>
                  (In an hour)
                </span>
              </h1>
              <div
                className={`h-[200px] ${
                  appointmentsInHour?.length > 0 && "overflow-y-scroll"
                }`}
              >
                {appointmentsInHour.length > 0 ? (
                  appointmentsInHour
                    ?.sort(
                      (a, b) =>
                        new Date(a?.appointments[0].start as Date).getTime() -
                        new Date(b?.appointments[0].start as Date).getTime()
                    )
                    .map((appointment) => (
                      <div
                        key={appointment.id}
                        className='p-3 border-b grid grid-cols-3'
                      >
                        <div className='flex items-center gap-3'>
                          <Stack direction='row' spacing={2}>
                            <Avatar
                              {...stringAvatar(appointment?.title || "")}
                              sx={{
                                width: 36,
                                height: 36,
                                bgcolor: `${stringToColor(
                                  appointment?.title || ""
                                )}`,
                                fontSize: "12px",
                              }}
                            />
                          </Stack>
                          <div>
                            <h1>{appointment.title}</h1>
                            <p className='text-gray-400 text-[12px]'>
                              {appointment.gender}, {appointment.age} Years
                            </p>
                          </div>
                        </div>
                        <div className='flex items-center justify-center text-sm'>
                          {new Date(
                            appointment?.appointments?.[0]?.start as Date
                          ).toLocaleTimeString(undefined, options)}{" "}
                          -{" "}
                          {new Date(
                            appointment?.appointments?.[0]?.end as Date
                          ).toLocaleTimeString(undefined, options)}
                        </div>
                        <div className='flex items-center justify-center text-sm'>
                          <Link
                            href={{
                              pathname: `/patient/${appointment.id}`,
                              query: {
                                openEmail: true,
                                appointmentTime: `${new Date(
                                  appointment?.appointments?.[0]?.start as Date
                                ).toLocaleTimeString(undefined, options)}`,
                              },
                            }}
                            className='flex items-center justify-center rounded-lg w-[50%] cursor-pointer hover:scale-110 duration-300 '
                          >
                            <Button
                              variant='outlined'
                              endIcon={<IoIosArrowForward />}
                            >
                              Remind
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className='flex items-center justify-center m-3 mt-3'>
                    <Image
                      src={noAppointmentsImage}
                      alt='nothing-found'
                      height={200}
                      width={200}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <div className='grid lg:grid-cols-2 gap-3'> */}
      <div className='m-[2rem] flex items-center justify-center'>
        <AppointmentsChart clinicId={clinic?.id} />
      </div>
      {/* <div className='m-[2rem]'>
          <PatientsChart />
        </div> */}
      {/* </div> */}
    </div>
  );
}
