import { useQuery } from "@tanstack/react-query";
import { CLIENT, BASE_URL } from "./api";
import { Patient } from "../../types";
import Link from "next/link";
import { stringToColor, stringAvatar } from "@/app/[id]/page";
import { Avatar, Button, Stack } from "@mui/material";
import { IoIosArrowForward } from "react-icons/io";
import { injuryTypes } from "@/app/exercises/[id]/page";

export default function ExerciseAssignees({
  exerciseId,
  clinicId,
}: {
  exerciseId: number;
  clinicId: number;
}) {
  const getPatientsAssigned = async () => {
    const { data } = await CLIENT.get(
      `${BASE_URL}/api/exercises/assigned-to/${exerciseId}/${clinicId}`
    );
    if (data) {
      return data;
    }
  };

  const { data: patientsAssigned, isLoading } = useQuery({
    queryFn: () => getPatientsAssigned(),
    queryKey: ["exerciseAssignedTo"],
  });

  console.log(patientsAssigned);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center p-9 h-screen'>
        <span className='loader'></span>
      </div>
    );
  }
  return (
    <div className='h-[315px]'>
      {patientsAssigned.length ? (
        patientsAssigned.map((patient: Patient) => (
          <div key={patient.id}>
            <div key={patient.id} className='p-3 border-b grid grid-cols-3'>
              <div className='flex items-center gap-3'>
                <Stack direction='row' spacing={2}>
                  <Avatar
                    {...stringAvatar(patient?.title || "")}
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: `${stringToColor(patient?.title || "")}`,
                      fontSize: "12px",
                    }}
                  />
                </Stack>
                <div>
                  <h1>{patient.title}</h1>
                  <p className='text-gray-400 text-[12px]'>
                    {patient.gender}, {patient.age} Years
                  </p>
                </div>
              </div>
              <div className='flex justify-center items-center'>
                <p className='text-sm text-green-500'>
                  {injuryTypes[patient.injuryId - 1]}
                </p>
                <div className='border-l border-green-300 h-4 mx-2' />
                <p className='text-sm text-green-500'>
                  {patient.reasonForVisit}
                </p>
              </div>
              <div className='flex items-center justify-center text-sm'>
                <Link
                  href={`/patient/${patient.id}`}
                  className='flex items-center justify-center rounded-lg w-[50%] cursor-pointer hover:scale-110 duration-300 '
                >
                  <Button variant='outlined' endIcon={<IoIosArrowForward />}>
                    View
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No patients in your clinic are assigned this exercise</p>
      )}
    </div>
  );
}
