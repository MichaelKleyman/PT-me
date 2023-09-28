/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import { Credential } from "../../types";
import { CLIENT, BASE_URL } from "@/components/api";

type Props = {
  exerciseId: number;
};

export default function ExerciseEditHistory({ exerciseId }: Props) {
  const [editHistory, setEditHistory] = useState<Credential[]>([]);

  useEffect(() => {
    const getExerciseCredentialsHistory = async () => {
      const amountOfCredentials = "All";
      const { data } = await CLIENT.get(
        `${BASE_URL}/api/exEditCredentials/credential-history/${exerciseId}/${amountOfCredentials}`
      );
      setEditHistory(data);
    };
    getExerciseCredentialsHistory();
  }, []);

  return (
    <div className='flex'>
      <div className='fixed w-[450px] duration-300 h-screen shadow-xl shadow-gray-400 flex flex-col justify-between'>
        <div className='mt-3 overflow-y-scroll'>
          {editHistory?.map((editor) => (
            <button
              key={editor.id}
              className='w-[80%] ml-[3rem] text-start m-3 p-2 border border-green-500 rounded-lg bg-[#f6f6f4] duration-300 hover:scale-105 cursor-pointer hover:bg-[#efefe5]'
            >
              <h1 className='text-lg font-bold'>{editor.clinicName}</h1>
              <p className='text-sm text-gray-400 mt-2'>{editor.editorName}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
