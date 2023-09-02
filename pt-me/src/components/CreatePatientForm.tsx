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

  const totalPages = 3;

  const onSubmit = () => {};

  const handleNext = () => {
    setPage(page + 1);
  };

  const handleBack = () => {
    setPage(page - 1);
  };

  return (
    <div className='grid md:grid-cols-3 gap-6 py-5'>
      <form onSubmit={handleSubmit(onSubmit)}>
        {inputs
          .slice(
            page === totalPages - 1 ? page * 4 - 1 : page * 4,
            page === totalPages - 2 ? (page + 1) * 4 - 1 : (page + 1) * 4
          )
          .map((question, index) => (
            <div key={index}>
              <TextField type='text' required label={question} sx={styling} />
            </div>
          ))}
        <div className='flex justify-between'>
          {page > 0 && (
            <button
              type='button'
              onClick={handleBack}
              className='bg-white rounded-lg shadow-green-400 shadow-lg duration-300 hover:scale-110 text-[#3BE13B] px-4 py-2'
            >
              Back
            </button>
          )}
          {page < totalPages - 1 && (
            <button
              type='button'
              onClick={handleNext}
              className='bg-[#3BE13B] rounded-lg shadow-green-400 shadow-lg duration-300 hover:scale-110 text-white px-4 py-2'
            >
              Next
            </button>
          )}
          {page === totalPages - 1 && (
            <button
              type='submit'
              className='bg-[#3BE13B] rounded-lg shadow-green-400 shadow-lg duration-300 hover:scale-110 text-white px-4 py-2'
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
