"use client";
import Link from "next/link";
import { AiOutlineFileSearch } from "react-icons/ai";
import { useParams, useSearchParams } from "next/navigation";
import EditPatient from "@/components/EditPatient";

export default function EditPatientInfo() {
  const { id } = useParams();
  const res = useSearchParams().get("name");

  return (
    <div className='mt-[1rem] md:ml-[6rem] p-4 m-4'>
      <div className='flex text-center gap-2'>
        <Link
          href='/patients'
          className='mb-5 text-sm text-gray-400 hover:underline duration-300 hover:scale-110 flex items-center gap-2'
        >
          <AiOutlineFileSearch />
          All Patients
        </Link>
        <div>/</div>
        <Link
          href={`/patient/${id}`}
          className='mb-5 text-sm text-gray-400 hover:underline duration-300 hover:scale-110 flex items-center gap-2'
        >
          <AiOutlineFileSearch />
          {res}
        </Link>
        <div>/</div>
        <div className='mb-5 text-sm'>Edit Profile</div>
      </div>

      <EditPatient patientId={id} />
    </div>
  );
}
