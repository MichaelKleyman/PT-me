/* eslint-disable react-hooks/exhaustive-deps */
"use client"; //will be a client component because we're using useState

import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll/modules";
import Link from "next/link";
import { useTheme } from "next-themes";
import Logo1 from "../app/logos/logo-no-background.png";
// import Logo2 from '../logos/logo-white.png';
import Image from "next/image";
import { BsSun, BsFillMoonFill } from "react-icons/bs";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/Redux/store";
import { me, logout, login } from "@/Redux/Features/auth/authSlice";
import { useRouter } from "next/navigation";
import { BiClinic, BiCaretDown } from "react-icons/bi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { RxDashboard } from "react-icons/rx";
import { GiMuscleUp } from "react-icons/gi";
import { IoMdPeople } from "react-icons/io";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";

interface NavItem {
  label: string;
  page: string;
}

const navItems: Array<NavItem> = [
  {
    label: "About Us",
    page: "about-us",
  },
  {
    label: "Services",
    page: "services",
  },
];

const Navbar = ({ children }: any) => {
  const router = useRouter();
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [open, setOpenSideBar] = useState<boolean>(false);
  const [navbar, setNavbar] = useState<boolean>(false); //controlling if the navbar is in mobile view or desktop view.

  const [showNav, setShowNav] = useState<boolean>(false);
  const [showLoggedInNav, setShowLoggedInNav] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    async function fetchData() {
      await dispatch(me());
    }
    fetchData();
  }, []);

  const demoAccountLogin = async () => {
    const credentials: {
      email: string;
      password: string;
    } = {
      email: "feelgoodptclinic@gmail.com",
      password: "123456",
    };
    const response: any = await dispatch(login(credentials));
    if (!response.payload) {
      location.reload();
    }
  };

  const openNav = () => {
    setShowNav(!showNav);
  };

  const openLoggedInNav = () => {
    setShowLoggedInNav(!showLoggedInNav);
  };

  const reRoute = () => {
    router.push(`/${user.id}`);
  };

  const handleLogout = () => {
    dispatch(logout);
    router.push("/");
  };

  const openSidebar = () => {
    setOpenSideBar(!open);
  };

  const closeSideBar = () => {
    setOpenSideBar(false);
  };

  return (
    <header className='w-full shadow-lg shadow-gray-300 fixed top-0 z-50 bg-[#fdfff5] dark:bg-black'>
      <div className='justify-between md:items-center md:flex'>
        {!user?.id ? (
          <div className='stroke flex justify-between items-center w-full h-full px-2 2xl:px-16'>
            <ScrollLink
              to='about-us'
              activeClass='active'
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className='py-4 md:py-4 md:block ml-5'
            >
              <Image alt='/' src={Logo1} width={90} height={90} />
            </ScrollLink>
            <div className='md:flex items-center justify-between w-[60%] mr-6'>
              <ul className='hidden md:flex items-center justify-between w-full md:space-x-12'>
                <ScrollLink
                  to='about-us'
                  activeClass='active'
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  className='links nav-link tracking-widest uppercase no-underline
            duration-300 hover:scale-110 hover:font-bold cursor-pointer w-full'
                >
                  About us
                </ScrollLink>
                <ScrollLink
                  to='services'
                  activeClass='active'
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  className='links nav-link tracking-widest uppercase no-underline
            duration-300 hover:scale-110 hover:font-bold cursor-pointer w-full'
                >
                  Services
                </ScrollLink>
                <Link
                  href='/login'
                  className='links nav-link tracking-widest uppercase no-underline
            duration-300 hover:scale-110 hover:font-bold cursor-pointer w-full'
                >
                  Sign In
                </Link>
                <button
                  onClick={demoAccountLogin}
                  style={{ whiteSpace: "nowrap" }}
                  className='links nav-link tracking-widest uppercase no-underline
            duration-300 hover:scale-110 hover:font-bold cursor-pointer w-full'
                >
                  Demo Account
                </button>
                {/* <>
                  {currentTheme === "light" ? (
                    <button
                      onClick={() => setTheme("dark")}
                      className='bg-slate-100 p-2 rounded-xl duration-300 hover:scale-110'
                    >
                      <BsFillMoonFill size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setTheme("light")}
                      className='p-2 rounded-xl duration-300 hover:scale-110'
                    >
                      <BsSun size={20} />
                    </button>
                  )}
                </> */}
                <Link
                  href='/getstarted'
                  className='nav-link bg-[#3BE13B] p-2 rounded-xl w-[100%] text-center font-bold duration-300 hover:scale-110'
                >
                  <button>Get Started</button>
                </Link>
              </ul>
            </div>
          </div>
        ) : (
          <div className='hidden md:flex'>
            <div
              className={`fixed ${
                open ? "w-[250px] duration-300" : "w-20"
              } h-screen p-9 bg-[#eaece1] flex flex-col justify-between`}
            >
              {open ? (
                <button
                  onClick={openSidebar}
                  className='absolute right-0 top-[23.7rem] bg-[#3BE13B] shadow-lg shadow-gray-400 w-[1.5rem] h-[1.5rem] rounded-full flex justify-center items-center cursor-pointer translate-x-1/2 hover:scale-110 duration-300'
                >
                  <MdOutlineKeyboardArrowLeft size={25} />
                </button>
              ) : (
                <button
                  onClick={openSidebar}
                  className='absolute right-0 top-[23.7rem] bg-[#3BE13B] shadow-lg shadow-gray-400 w-[1.5rem] h-[1.5rem] rounded-full flex justify-center items-center cursor-pointer translate-x-1/2 hover:scale-110 duration-300'
                >
                  <MdOutlineKeyboardArrowRight size={25} />
                </button>
              )}
              <div className='flex flex-col items-center'>
                <Link
                  href={`/${user?.id}`}
                  onClick={closeSideBar}
                  className={`bg-[#3BE13B] text-white p-3 rounded-lg flex justify-center no-underline items-center ${
                    open ? "w-[190px] gap-4 duration-300" : ""
                  }`}
                >
                  <div>
                    <RxDashboard size={20} />
                  </div>
                  {open && <p className='duration-300'>Dashboard</p>}
                </Link>{" "}
                <span className='border-b-[1px] border-gray-300 w-full p-2'></span>
                <Link
                  href='/'
                  onClick={closeSideBar}
                  className={`${
                    open ? "w-[190px] gap-4 duration-300" : ""
                  } bg-gray-100 nav-link hover:bg-gray-200 no-underline cursor-pointer my-4 p-3 rounded-lg flex justify-center items-center`}
                >
                  <div className='text-[#3BE13B]'>
                    <AiOutlineSchedule size={20} />
                  </div>
                  {open && <p className='duration-300'>Schedule</p>}
                </Link>
                <Link
                  href='/exercises'
                  onClick={closeSideBar}
                  className={`${
                    open ? "w-[190px] gap-4 duration-300" : ""
                  } bg-gray-100 nav-link hover:bg-gray-200 no-underline cursor-pointer my-4 p-3 rounded-lg flex justify-center items-center`}
                >
                  <div className='text-[#3BE13B]'>
                    <GiMuscleUp size={20} />
                  </div>
                  {open && <p className='duration-300'>Exercises</p>}
                </Link>
                <Link
                  href='/patients'
                  onClick={closeSideBar}
                  className={`${
                    open ? "w-[190px] gap-4 duration-300" : ""
                  } bg-gray-100 nav-link hover:bg-gray-200 no-underline cursor-pointer my-4 p-3 rounded-lg flex justify-center items-center`}
                >
                  <div className='text-[#3BE13B]'>
                    <IoMdPeople size={20} />
                  </div>
                  {open && <p className='duration-300'>Patients</p>}
                </Link>
              </div>
            </div>
          </div>
        )}

        <div
          className={`${user?.id && "hidden"} md:hidden absolute top-8 right-5`}
          onClick={openNav}
        >
          <IoMdMenu size={35} />
        </div>
        <div
          className={
            showNav
              ? `${
                  user?.id && "hidden"
                } md:hidden fixed left-0 top-0 w-full h-screen bg-black/70`
              : ""
          }
        >
          <div
            className={
              showNav
                ? "md:hidden fixed left-0 top-0 w-[55%] sm:w-[65%] md:w-[45%] h-screen bg-[#FAF9F6] dark:bg-black p-10 ease-in duration-500"
                : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
            }
          >
            <div className='flex items-center justify-between'>
              <ScrollLink
                to='about-us'
                activeClass='active'
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className='py-4 md:py-4 md:block'
              >
                <Image alt='/' src={Logo1} width={90} height={90} />
              </ScrollLink>
              <div
                onClick={openNav}
                className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer'
              >
                <IoMdClose />
              </div>
            </div>
            <div className='border-b border-gray-300 my-4'>
              <p className='w-[85%] md:w-[90%] py-4 font-bold'>Menu</p>
            </div>
            <div className='py-4 flex flex-col'>
              <ul className='uppercase flex flex-col space-y-6'>
                <ScrollLink
                  to='about-us'
                  activeClass='active'
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  className='links tracking-widest uppercase
            duration-300 hover:scale-110 hover:font-bold cursor-pointer w-full'
                >
                  About us
                </ScrollLink>
                <ScrollLink
                  to='services'
                  activeClass='active'
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  className='links tracking-widest uppercase
            duration-300 hover:scale-110 hover:font-bold cursor-pointer w-full'
                >
                  Services
                </ScrollLink>
                <Link
                  href='/login'
                  className='links tracking-widest uppercase
            duration-300 hover:scale-110 hover:font-bold cursor-pointer w-full'
                >
                  Sign In
                </Link>
                <button
                  onClick={demoAccountLogin}
                  style={{ whiteSpace: "nowrap" }}
                  className='links tracking-widest uppercase
            duration-300 hover:scale-110 hover:font-bold cursor-pointer w-full'
                >
                  Demo Account
                </button>
                {/* {currentTheme === "light" ? (
                  <button
                    onClick={() => setTheme("dark")}
                    className='bg-slate-100 p-2 rounded-xl duration-300 hover:scale-110 w-[20%] flex items-center justify-center'
                  >
                    <BsFillMoonFill size={20} />
                  </button>
                ) : (
                  <button
                    onClick={() => setTheme("light")}
                    className='p-2 rounded-xl duration-300 hover:scale-110 w-[20%] flex items-center justify-center'
                  >
                    <BsSun size={20} />
                  </button>
                )} */}
                <div className='bg-[#3BE13B] p-2 rounded-xl w-[100%] text-center font-bold duration-300 hover:scale-110 '>
                  <button>Get Started</button>
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div className={`${user?.id ? "flex md:hidden p-3" : "hidden"}`}>
          <button
            onClick={openLoggedInNav}
            className='duration-300 hover:scale-110 cursor-pointer'
          >
            <IoMdMenu size={35} />
          </button>
        </div>
        <div
          className={
            showLoggedInNav
              ? `${
                  !user?.id && "hidden"
                } md:hidden fixed left-0 top-0 w-full h-screen bg-black/70`
              : ""
          }
        >
          <div
            className={
              showLoggedInNav
                ? "md:hidden fixed left-0 top-0 w-[55%] sm:w-[45%] md:w-[45%] h-screen bg-[#FAF9F6] dark:bg-black p-10 ease-in duration-500"
                : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
            }
          >
            <div className='flex items-center justify-between'>
              <div
                onClick={openLoggedInNav}
                className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer'
              >
                <IoMdClose />
              </div>
            </div>
            <div className='border-b border-gray-300 my-4'>
              <p className='w-[65%] md:w-[60%] py-4 font-bold'>Menu</p>
            </div>
            <div className='py-4 flex flex-col'>
              <Link
                href={`/${user?.id}`}
                className='bg-[#3BE13B] text-white p-3 rounded-lg flex justify-center no-underline items-center w-full gap-4 duration-300'
              >
                <RxDashboard size={20} />
                Dashboard
              </Link>
              <Link
                href='/'
                className='w-full gap-4 duration-300
bg-gray-100 nav-link hover:bg-gray-200 no-underline cursor-pointer my-4 p-3 rounded-lg flex justify-center items-center'
              >
                <AiOutlineSchedule size={20} />
                Schedule
              </Link>
              <Link
                href='/exercises'
                className='w-full gap-4 duration-300
bg-gray-100 nav-link hover:bg-gray-200 no-underline cursor-pointer my-4 p-3 rounded-lg flex justify-center items-center'
              >
                <GiMuscleUp size={20} />
                Exercises
              </Link>
              <Link
                href='/patients'
                className='w-full gap-4 duration-300
bg-gray-100 nav-link hover:bg-gray-200 no-underline cursor-pointer my-4 p-3 rounded-lg flex justify-center items-center'
              >
                <IoMdPeople size={20} />
                Patients
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
