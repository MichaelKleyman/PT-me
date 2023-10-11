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
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import { Patient } from "../../../types";
import { fetchAllPatients } from "@/Redux/Features/patients/patientSlice";

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

  useEffect(() => {
    if (clinic?.id) {
      // If clinic data is available, fetch the patients
      async function getPatients() {
        const { payload } = await dispatch(fetchAllPatients(clinic.id));
        const todaysPatients = (payload as Patient[]).filter((patient) => {
          const appointmentDate = new Date(patient?.start as Date).getDate();
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

  return (
    <div className='ml-[5rem]'>
      <div className='flex items-center justify-between shadow-lg shadow-gray-400 p-6'>
        <div>
          <h1 className='text-[20px]'>Hi, {clinic?.clinicName}</h1>
          <p className='text-gray-400 text-[15px] italic mt-2'>{todaysDate}</p>
        </div>
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
          <MenuItem onClick={handleLogout} disableRipple className='flex gap-6'>
            <FiLogOut />
            Log Out
          </MenuItem>
        </StyledMenu>
      </div>
      <div className='p-4 text-[14px]'>
        <p className='mt-2'>Clinic Address: {clinic?.address}</p>
        <p className='mt-2'>Clinic Email: {clinic?.email}</p>
      </div>
      <div className='flex items-center justify-center mt-8'>
        <div className='grid lg:grid-cols-3 gap-8'>
          <div className='shadow-lg shadow-gray-400 rounded-lg p-4'>
            <h1 className='text-[35px] flex items-center gap-1'>
              {todaysPatients?.length}
              <span className='text-[20px] text-gray-400'>
                / {patients?.length}
              </span>
            </h1>
            <h2 className='text-[14px] text-gray-400'>Todays appointments</h2>
          </div>
          <div className='shadow-lg shadow-gray-400 rounded-lg p-4'>
            <h1 className='text-[35px]'>{patients?.length}</h1>
            <h2>Total Patients</h2>
          </div>
          <div className='shadow-lg shadow-gray-400 rounded-lg p-4'></div>
        </div>
      </div>
      {/* <p>Clinic ID: {params.id.toString()}</p>
      <p>Clinic Name: {clinic?.clinicName}</p>
      <p>Clinic Address: {clinic?.address}</p>
      <p>Clinic Email: {clinic?.email}</p>
      <button
        onClick={handleLogout}
        className='duration-300 hover:scale-110 cursor-pointer hover:bg-slate-200 p-2 rounded-lg bg-[#3BE13B] my-2'
      >
        Log out
      </button> */}
    </div>
  );
}
