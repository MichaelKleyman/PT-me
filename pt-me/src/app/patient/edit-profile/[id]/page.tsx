/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineFileSearch } from "react-icons/ai";
import { useParams } from "next/navigation";
import { AppDispatch } from "@/Redux/store";
import { useDispatch } from "react-redux";
import { fetchPatient } from "@/Redux/Features/patients/patientSlice";
import { Patient } from "../../../../../types";
import Select from "react-select";
import { TextField } from "@mui/material";
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
  "Reason For Visit",
  "Injury Type",
];

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const injuryTypeOptions = [
  { value: "Knee", label: "Knee" },
  { value: "Shoulders", label: "Shoulders" },
  { value: "Back", label: "Back" },
  { value: "Hip", label: "Hip" },
  { value: "Neck", label: "Neck" },
  { value: "Wrist/Hand", label: "Wrist/Hand" },
  { value: "Ankle/Foot", label: "Ankle/Foot" },
  { value: "Abdominal", label: "Abdominal" },
  { value: "Gluteal", label: "Gluteal" },
];

const insuranceOptions = [
  { value: "Humana", label: "Humana" },
  { value: "Aetna", label: "Aetna" },
  { value: "Cigna Group", label: "Cigna Group" },
  { value: "Blue Cross Blue Shield", label: "Blue Cross Blue Shield" },
  { value: "Anthem", label: "Anthem" },
  { value: "Fidelis", label: "Fidelis" },
  { value: "Medicare", label: "Medicare" },
  { value: "Medicaid", label: "Medicaid" },
  { value: "United Healthcare Service", label: "United Healthcare Service" },
  { value: "HCSC", label: "HCSC" },
  { value: "MetLife", label: "MetLife" },
];

export default function EditPatientInfo() {
  const [patient, setPatient] = useState<Patient>();
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    trigger,
    control,
    getValues,
    formState: { errors },
  } = useForm({ mode: "all" });

  const { id } = useParams();

  useEffect(() => {
    async function getPatient() {
      const { payload } = await dispatch(fetchPatient(Number(id)));
      setPatient(payload as Patient);
    }
    getPatient();
  }, []);

  return (
    <div className='mt-[1rem] ml-[6rem] p-4'>
      <div className='flex text-center gap-2'>
        <Link
          href={`/patient/${id}`}
          className='mb-5 text-sm text-gray-400 hover:underline duration-300 hover:scale-110 flex items-center gap-2'
        >
          <AiOutlineFileSearch />
          {patient?.title}
        </Link>
        <div>/</div>
        <div className='mb-5 text-sm'>Edit Profile</div>
      </div>
      <div className='mt-[2rem] grid grid-cols-3 gap-4'>
        <TextField
          type='text'
          label='First Name'
          required
          value={patient?.title.split(" ")[0]}
          sx={styling}
          {...register(`First Name`, {
            required: true,
            // onChange: (e) => handleChange(e),
          })}
        />
        <TextField
          type='text'
          label='Last Name'
          required
          value={patient?.title.split(" ")[1]}
          sx={styling}
          {...register("Last Name", {
            required: true,
            // onChange: (e) => handleChange(e),
          })}
        />
        <TextField
          type='number'
          label='Age'
          required
          value={patient?.age}
          sx={styling}
          {...register(`Age`, {
            required: true,
            //   onChange: (e) => handleChange(e),
          })}
        />
        <TextField
          type='email'
          label='Email'
          required
          value={patient?.email}
          sx={styling}
          {...register("Email", {
            required: true,
            // onChange: (e) => handleChange(e),
          })}
        />
        <TextField
          type='number'
          label='Phone Number'
          required
          value={patient?.phoneNumber}
          sx={styling}
          {...register(`Phone Number`, {
            required: true,
            //   onChange: (e) => handleChange(e),
          })}
        />
        <TextField
          type='text'
          label='Address'
          required
          value={patient?.address}
          sx={styling}
          {...register(`Address`, {
            required: true,
            //   onChange: (e) => handleChange(e),
          })}
        />

        <Controller
          control={control}
          name='Gender'
          render={({ field }) => (
            <>
              <Select
                placeholder='Gender'
                options={genderOptions}
                // onChange={handleGenderSelectChange}
                className='w-full rounded-lg m-[10px]'
              />
              {/* {selectErrorMessage && (
                <span className='text-red-500'>{selectErrorMessage}</span>
              )} */}
            </>
          )}
        />
        <Controller
          control={control}
          name='Insurance'
          render={({ field }) => (
            <>
              <Select
                placeholder='Insurance'
                options={insuranceOptions}
                // onChange={handleInsuranceSelectChange}
                className='w-full rounded-lg m-[10px]'
              />
              {/* {selectErrorMessage && (
                <span className='text-red-500'>{selectErrorMessage}</span>
              )} */}
            </>
          )}
        />
        <Controller
          control={control}
          name='Insurance'
          render={({ field }) => (
            <>
              <Select
                placeholder='Injury Type'
                options={injuryTypeOptions}
                // onChange={handleInjuryTypeSelectChange}
                className='w-full rounded-lg m-[10px]'
              />
              {/* {selectErrorMessage && (
                <span className='text-red-500'>{selectErrorMessage}</span>
              )} */}
            </>
          )}
        />
      </div>
    </div>
  );
}
