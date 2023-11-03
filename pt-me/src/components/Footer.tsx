import React from "react";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { BsGithub, BsLinkedin } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className='w-full py-4 text-center'>
      <div className='flex items-center justify-center my-[1rem] gap-4'>
        <a
          href='https://github.com/MichaelKleyman/PT-me'
          target='_blank'
          className='duration:300 hover:scale-110 cursor-pointer'
        >
          <BsGithub size={25} color='#3BE13B' />
        </a>
        <a
          href='https://www.linkedin.com/in/michael-kleyman/'
          target='_blank'
          className='duration:300 hover:scale-110 cursor-pointer'
        >
          <BsLinkedin size={25} color='#3BE13B' />
        </a>
      </div>
      <div className='flex items-center justify-center gap-2 text-gray-400 text-[13px]'>
        <AiOutlineCopyrightCircle /> PT-me. 2023, All rights reserved.
      </div>
      <p className='flex items-center justify-center gap-2 text-gray-400 text-[13px] mt-3'>
        Designed & Built by Michael Kleyman
      </p>
    </footer>
  );
}
