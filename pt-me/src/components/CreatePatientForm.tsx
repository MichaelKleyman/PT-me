"use client";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Controller, useController, useForm } from "react-hook-form";

const styling = { width: "100%", borderRadius: "10px", margin: "10px" };

const inputs = [
  "Last Name",
  "First Name",
  "Age",
  "Gender",
  "Email",
  "Phone Number",
  "Insurance",
  "Address",
  "State",
  "City",
  "Zipcode",
];

export default function CreatePatientForm() {
  const [page, setPage] = useState<number>(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const onSubmit = () => {};

  return (
    <div className='grid md:grid-cols-3 gap-6 py-5'>
      {/* <TextField type='text' required label='Last Name' sx={styling} />
      <TextField type='text' required label='First Name' sx={styling} />
      <TextField type='number' required label='Age' sx={styling} />
      <TextField type='number' required label='Gender' sx={styling} />
      <TextField type='email' required label='Email' sx={styling} />
      <TextField type='text' required label='Phone Number' sx={styling} />
      <TextField type='text' required label='Insurance' sx={styling} />
      <TextField type='text' required label='Address' sx={styling} />
      <TextField type='text' required label='State' sx={styling} />
      <TextField type='text' required label='City' sx={styling} />
      <TextField type='text' required label='Zipcode' sx={styling} />
      <div>
        <label className='ml-3 font-medium text-green-500'>Arrival Date</label>
        <TextField type='date' required sx={styling} />
      </div> */}
      <form onSubmit={handleSubmit(onSubmit)} className='w-[55%]'>
        {inputs.map((question, index) => (
          <div key={index}>
            <TextField type='text' required label={question} sx={styling} />
          </div>
        ))}
      </form>
    </div>
  );
}
