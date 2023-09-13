"use client";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useController, useForm } from "react-hook-form";
import Select from "react-select";
import { CLIENT, BASE_URL } from "./api";

const styling = { width: "70%", borderRadius: "10px", margin: "10px" };

export default function CreateExerciseForm() {
  const {
    register,
    handleSubmit,
    trigger,
    control,
    getValues,
    formState: { errors },
  } = useForm({ mode: "all" });

  return (
    <div>
      <div className='flex items-center justify-evenly'>
        <div className='w-[70%]'>
          <TextField
            type='text'
            required
            label='Exercise Name'
            sx={{ width: "90%", borderRadius: "10px", margin: "10px" }}
            {...register("exerciseName", {
              required: true,
            })}
          />
          <TextField
            type='text'
            required
            label='Muscles Worked'
            sx={{ width: "90%", borderRadius: "10px", margin: "10px" }}
            {...register("exerciseName", {
              required: true,
            })}
          />
        </div>
        <TextField
          multiline
          rows={5}
          type='text'
          required
          sx={styling}
          label='Exercise Description'
        />
      </div>
      <div className='flex items-center w-[50%]'>
        <TextField
          type='text'
          required
          label='Add Tips For The Exercise'
          sx={{ width: "100%", borderRadius: "10px", margin: "10px" }}
          {...register("exerciseName", {
            required: true,
          })}
        />
        <button className='h-[40px] w-[30%] bg-[#3BE13B] rounded-lg shadow-green-400 shadow-lg duration-300 hover:scale-110 text-white'>
          Add
        </button>
      </div>
    </div>
  );
}
