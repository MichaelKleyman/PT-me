'use client'; //will be a client component because we're using useState

import React, { useState } from 'react';
import { Link } from 'react-scroll/modules';
// import Link from 'next/link';
import { useTheme } from 'next-themes';
import Logo1 from '../logos/logo-no-background.png';
// import Logo2 from '../logos/logo-white.png';
import Image from 'next/image';
import { BsSun, BsFillMoonFill } from 'react-icons/bs';
import { IoMdMenu, IoMdClose } from 'react-icons/io';

interface NavItem {
  label: string;
  page: string;
}

const navItems: Array<NavItem> = [
  {
    label: 'About Us',
    page: 'about-us',
  },
  {
    label: 'Services',
    page: 'services',
  },
  {
    label: 'Log In',
    page: 'log-in',
  },
];

const Navbar = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [navbar, setNavbar] = useState(false); //controlling if the navbar is in mobile view or desktop view.

  return (
    <header className='w-full mx-auto px-4 shadow-lg shadow-gray-300 fixed top-0 z-50'>
      <div className='justify-between md:items-center md:flex'>
        <div>
          <div>
            <div className='flex items-center justify-between'>
              <Link
                to='about us'
                activeClass='active'
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className='py-4 md:py-4 md:block'
              >
                <Image alt='/' src={Logo1} width={90} height={90} />
              </Link>
              <div className='md:hidden'>
                <button onClick={() => setNavbar(!navbar)}>
                  {navbar ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`md:flex md:space-x-6 items-center justify-between w-[60%] ${
            navbar ? 'block' : 'hidden'
          }`}
        >
          {navItems.map((item, i) => (
            <Link
              key={i}
              to={item.page}
              activeClass='active'
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className='tracking-widest uppercase
            duration-300 hover:scale-110 hover:font-bold cursor-pointer w-full'
            >
              {item.label}
            </Link>
          ))}
          {currentTheme === 'light' ? (
            <button
              onClick={() => setTheme('dark')}
              className='bg-slate-100 p-2 rounded-xl duration-300 hover:scale-110'
            >
              <BsFillMoonFill size={20} />
            </button>
          ) : (
            <button
              onClick={() => setTheme('light')}
              className='p-2 rounded-xl duration-300 hover:scale-110'
            >
              <BsSun size={20} />
            </button>
          )}
          <div className='bg-[#3BE13B] p-2 rounded-xl w-[100%] text-center font-bold duration-300 hover:scale-110 '>
            <button>Get Started</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
