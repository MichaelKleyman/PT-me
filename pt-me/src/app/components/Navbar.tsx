'use client'; //will be a client component because we're using useState

import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import Logo from '../logos/logo-no-background.png';
import Image from 'next/image';

interface NavItem {
  label: string;
  page: string;
}

const navItems: Array<NavItem> = [
  {
    label: 'About Us',
    page: 'about us',
  },
  {
    label: 'Services',
    page: 'services',
  },
  {
    label: 'Log In',
    page: 'log in',
  },
];

const Navbar = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [navbar, setNavbar] = useState(false); //controlling if the navbar is in mobile view or desktop view.

  return (
    <div>Hello world</div>
    // <header className='flex items-center justify-between p-4 shadow-lg shadow-gray-300 '>
    //   <div className='ml-8'>
    //     <Link href='/'>
    //       <Image alt='/' src={Logo} width={90} height={90} />
    //     </Link>
    //   </div>
    //   <div className='flex items-center justify-between mr-[1rem] w-[60%]'>
    //     <div className='grid grid-cols-3 gap-1 mr-[5rem]'>
    //       <Link
    //         href='/AboutUs'
    //         className='tracking-widest uppercase px-5 duration-300 hover:scale-110 hover:font-bold'
    //       >
    //         About Us
    //       </Link>
    //       <Link
    //         href='/'
    //         className='tracking-widest uppercase px-5 duration-300 hover:scale-110 hover:font-bold'
    //       >
    //         Services
    //       </Link>
    //       <Link
    //         href='/'
    //         className='tracking-widest uppercase px-5 duration-300 hover:scale-110 hover:font-bold'
    //       >
    //         Log In
    //       </Link>
    //     </div>
    //     <div className='bg-[#3BE13B] p-2 rounded-xl w-[30%] text-center font-bold duration-300 hover:scale-110 '>
    //       <button>Get Started</button>
    //     </div>
    //   </div>
    // </header>
  );
};

export default Navbar;
