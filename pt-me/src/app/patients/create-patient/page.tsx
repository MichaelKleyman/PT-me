"use client";
import Link from "next/link";
import { AiOutlineFileSearch } from "react-icons/ai";
import TextField from "@mui/material/TextField";

const styling = { width: "100%", borderRadius: "10px", margin: "10px" };

export default function page() {
  return (
    <div className='mt-[2rem] ml-[6rem] p-9'>
      <div className='flex text-center gap-2'>
        <Link
          href='/patients'
          className='mb-5 text-sm text-gray-400 hover:underline duration-300 hover:scale-110 flex items-center gap-2'
        >
          <AiOutlineFileSearch />
          All Patients
        </Link>
        <div>/</div>
        <div className='mb-5 text-sm'>Create Patient</div>
      </div>
      <h1 className='font-medium text-[1.5rem] tracking wide'>
        Create new patient
      </h1>
      <div className='grid md:grid-cols-3 gap-6 py-5'>
        <TextField type='text' required label='Last Name' sx={styling} />
        <TextField type='text' required label='First Name' sx={styling} />
        <TextField type='number' required label='Age' sx={styling} />
        <TextField type='email' required label='Email' sx={styling} />
        <TextField type='text' required label='Phone Number' sx={styling} />
        <TextField type='text' required label='Insurance' sx={styling} />
      </div>
    </div>
  );
}
