'use client'; //will be a client component because we're using useState

import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll/modules';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import Logo1 from '../app/logos/logo-no-background.png';
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
];

const Navbar = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [navbar, setNavbar] = useState(false); //controlling if the navbar is in mobile view or desktop view.

  const [showNav, setShowNav] = useState(false);

  const openNav = () => {
    setShowNav(!showNav);
  };

  return (
    <header className='w-full mx-auto px-4 shadow-lg shadow-gray-300 fixed top-0 z-50 bg-[#fdfff5] dark:bg-black'>
      <div className='justify-between md:items-center md:flex'>
        <div className='flex justify-between items-center w-full h-full px-2 2xl:px-16'>
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
          <div className='md:flex items-center justify-between w-[60%]'>
            <ul className='hidden md:flex items-center justify-between w-full md:space-x-6'>
              <ScrollLink
                to='about-us'
                activeClass='active'
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className='tracking-widest uppercase
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
                className='tracking-widest uppercase
            duration-300 hover:scale-110 hover:font-bold cursor-pointer w-full'
              >
                Services
              </ScrollLink>
              <Link
                href='/login'
                className='tracking-widest uppercase
            duration-300 hover:scale-110 hover:font-bold cursor-pointer w-full'
              >
                Sign In
              </Link>
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
            </ul>
            <div className='md:hidden absolute right-5' onClick={openNav}>
              <IoMdMenu size={35} />
            </div>
          </div>
        </div>
        <div
          className={
            showNav
              ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/70'
              : ''
          }
        >
          <div
            className={
              showNav
                ? 'md:hidden fixed left-0 top-0 w-[75%] sm:w-[65%] md:w-[45%] h-screen bg-[#FAF9F6] dark:bg-black p-10 ease-in duration-500'
                : 'fixed left-[-100%] top-0 p-10 ease-in duration-500'
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
              <p className='w-[85%] md:w-[90%] py-4'>Menu</p>
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
                  className='tracking-widest uppercase
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
                  className='tracking-widest uppercase
            duration-300 hover:scale-110 hover:font-bold cursor-pointer w-full'
                >
                  Services
                </ScrollLink>
                <Link
                  href='/login'
                  className='tracking-widest uppercase
            duration-300 hover:scale-110 hover:font-bold cursor-pointer w-full'
                >
                  Sign In
                </Link>
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
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

{
  /* <div className='justify-between md:items-center md:flex'>
  <div>
    <div>
      <div className='flex items-center justify-between cursor-pointer'>
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
        <div className='md:hidden'>
          <button onClick={() => setNavbar(!navbar)}>
            {navbar ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    className='hidden md:flex md:space-x-6 items-center justify-between w-[60%]
            navbar px-4'
  >
    {navItems.map((item, i) => (
      <ScrollLink
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
      </ScrollLink>
    ))}
    <Link
      href='/login'
      className='tracking-widest uppercase
            duration-300 hover:scale-110 hover:font-bold cursor-pointer w-full'
    >
      Sign In
    </Link>
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
</div>; */
}
