"use client";
import Link from "next/link";
import { AiOutlineFileSearch } from "react-icons/ai";
import type { AppDispatch, RootState } from "@/Redux/store";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchPatient } from "@/Redux/Features/patients/patientSlice";
import { Appointment, Patient } from "../../../../../types";
import { CLIENT, BASE_URL } from "@/components/api";

export default function PreviousAppointments({
  params,
}: {
  params: { id: number };
}) {
  const dispatch = useDispatch<AppDispatch>();

  const getPatient = async () => {
    const { payload } = await dispatch(fetchPatient(params.id));
    if (payload) {
      return payload as Patient;
    }
  };

  const getAppointments = async () => {
    const { data } = await CLIENT.get(
      `${BASE_URL}/api/appointments/all-patient-appointments/${params.id}`
    );
    if (data) {
      return data;
    }
  };

  const { data: patient, isLoading } = useQuery({
    queryFn: () => getPatient(),
    queryKey: ["patient"],
  });

  const { data: patientAppointments, isLoading: isLoadingAppointments } =
    useQuery({
      queryFn: () => getAppointments(),
      queryKey: ["patient-appointments"],
    });

  if (isLoading || isLoadingAppointments) {
    return (
      <div className='flex items-center justify-center p-9 h-screen'>
        <span className='loader'></span>
      </div>
    );
  }
  return (
    <div className='mt-[1rem] md:ml-[6rem] p-4'>
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
          href={`/patient/${params.id}`}
          className='mb-5 text-sm text-gray-400 hover:underline duration-300 hover:scale-110 flex items-center gap-2'
        >
          <AiOutlineFileSearch />
          {patient?.title}
        </Link>
        <div>/</div>
        <div className='mb-5 text-sm'>Appointments/Notes</div>
      </div>
      <div className='mt-2'>
        <h1 className='uppercase tracking-widest text-xl font-medium'>
          Previous Appointments
        </h1>
        <div className='mt-[1rem] md:flex'>
          <div className='w-full md:w-[450px] md:h-screen shadow-xl shadow-gray-400 flex flex-col justify-between overflow-y-scroll'>
            {patientAppointments.map((appointment: Appointment) => (
              <div
                key={appointment.id}
                className='p-6 border-b-[0.5px] border-green-300 cursor-pointer hover:bg-gray-200 duration-300'
              >
                <h3>
                  {new Date(appointment?.start as Date).toLocaleDateString()}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
