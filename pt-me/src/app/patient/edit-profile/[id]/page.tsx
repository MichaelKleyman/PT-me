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

export default function EditPatientInfo() {
  const [patient, setPatient] = useState<Patient>();
  const dispatch = useDispatch<AppDispatch>();

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
    </div>
  );
}
