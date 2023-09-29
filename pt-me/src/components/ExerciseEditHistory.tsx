/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import { Credential, Clinic } from "../../types";
import { CLIENT, BASE_URL } from "@/components/api";
import { AiOutlineMail, AiOutlineEdit } from "react-icons/ai";
import { BsPersonCheck } from "react-icons/bs";

type Props = {
  exerciseId: number;
};

export default function ExerciseEditHistory({ exerciseId }: Props) {
  const [editHistory, setEditHistory] = useState<Credential[]>([]);
  const [selectEditor, setSelected] = useState<Credential>();
  const [selectedClinic, setClinic] = useState<Clinic>();

  useEffect(() => {
    const getExerciseCredentialsHistory = async () => {
      const amountOfCredentials = "All";
      const { data } = await CLIENT.get<Credential[]>(
        `${BASE_URL}/api/exEditCredentials/credential-history/${exerciseId}/${amountOfCredentials}`
      );
      setEditHistory(data);
    };
    getExerciseCredentialsHistory();
  }, []);

  const handleSelectEditor = (editor: Credential) => {
    setSelected(editor);
    const getSpecificClinic = async () => {
      console.log(editor?.clinicName);
      const { data } = await CLIENT.get(
        `${BASE_URL}/api/clinic/${editor?.clinicName}`
      );
      setClinic(data);
    };
    // const getExerciseCredentialHistory = async () => {
    //   const amountOfCredentials = "One";
    //   const { data } = await CLIENT.get<Credential>(
    //     `${BASE_URL}/api/exEditCredentials/credential-history/${exerciseId}/${amountOfCredentials}`
    //   );
    //   setEditor(data);
    // };
    // getExerciseCredentialHistory();
    getSpecificClinic();
  };

  return (
    <div className='flex ml-[2rem] gap-8'>
      <div className='w-[450px] h-screen shadow-xl shadow-gray-400 flex flex-col justify-between'>
        <div className='mt-3 overflow-y-scroll'>
          {editHistory?.map((editor) => (
            <button
              onClick={() => handleSelectEditor(editor)}
              key={editor.id}
              className={`${
                selectEditor?.id === editor.id
                  ? "border-green-600 bg-[#f9f9e4] shadow-gray-400 shadow-lg"
                  : "border-green-500 bg-[#f6f6f4]"
              } w-[80%] ml-[3rem] text-start m-3 p-2 border rounded-lg duration-300 hover:scale-105 cursor-pointer hover:bg-[#efefe5]`}
            >
              <h1 className='text-lg font-bold'>{editor.clinicName}</h1>
              <p className='text-sm text-gray-400 mt-2'>
                Editor: {editor.editorName}
              </p>
              <p className='text-center w-[30%] p-1 text-[10px] mt-2 border border-green-500 text-green-500'>
                {new Date(editor.createdAt).toDateString()}
              </p>
            </button>
          ))}
        </div>
      </div>
      {selectedClinic && (
        <div className=' flex flex-col'>
          <div>
            <h1 className='text-[2rem] font-bold'>
              {selectedClinic.clinicName}
            </h1>
            <h3 className='mt-2 text-gray-500 flex items-center gap-3'>
              <AiOutlineMail /> {selectedClinic.email}
            </h3>
            <h3 className='mt-2 text-gray-500 flex items-center gap-3'>
              <BsPersonCheck /> {selectEditor?.editorName}
            </h3>
            <p className='mt-2 text-gray-500 flex items-center gap-3'>
              <AiOutlineEdit />
              Latest edit made on
              <span className='text-green-500'>
                {new Date(selectEditor?.createdAt as string).toDateString()}
              </span>
            </p>
          </div>
          <div>m</div>
        </div>
      )}
    </div>
  );
}
