/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import { Credential, Clinic } from "../../types";
import { CLIENT, BASE_URL } from "@/components/api";
import { AiOutlineMail, AiOutlineEdit } from "react-icons/ai";
import { BsPersonCheck } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import type { RootState } from "@/Redux/store";
import { useSelector } from "react-redux";

type Props = {
  exerciseId: number;
};

export default function ExerciseEditHistory({ exerciseId }: Props) {
  const [editHistory, setEditHistory] = useState<Credential[]>([]);
  const [selectEditor, setSelected] = useState<Credential>();
  const [selectedClinic, setClinic] = useState<Clinic>();
  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<
    { comment: string; clinicName: string }[]
  >([]);
  const clinic = useSelector((state: RootState) => state.auth.user);

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
    setComments(editor.comments);
    const getSpecificClinic = async () => {
      const { data } = await CLIENT.get(
        `${BASE_URL}/api/clinic/${editor?.clinicName}`
      );
      setClinic(data);
    };
    getSpecificClinic();
  };

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }
  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1]?.[0]}`,
    };
  }

  const handleNewComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const submitComment = async () => {
    const { data } = await CLIENT.post(
      `${BASE_URL}/api/exEditCredentials/comment/${selectEditor?.id}`,
      { comment: newComment, clinicName: clinic?.clinicName }
    );
    setComments(data.comments);
    setNewComment("");
  };

  return (
    <div className='flex ml-[2rem]'>
      <div className='w-[450px] h-screen shadow-xl shadow-gray-400 flex flex-col justify-between overflow-y-scroll'>
        <div className='mt-3'>
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
        <div className='w-[70%]'>
          <div className='max-h-[250px] overflow-y-scroll flex gap-[1rem] shadow-lg shadow-gray-400 rounded-lg p-5'>
            <div className='flex-grow border-r-[0.5px] border-gray-400'>
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
            <div className='w-[55%] mr-[3rem] p-3'>
              <h1 className='font-medium text-[1.2rem]'>Changes made:</h1>
              <div className='font-medium mt-4 underline flex justify-around'>
                <h1>Previous</h1>
                <h1>Updated</h1>
              </div>
              <div className='mt-6 grid lg:grid-cols-3'>
                <div>
                  {selectEditor?.editedFields.map((field, i) => (
                    <div key={i} className='text-[14px]'>
                      <p className='text-gray-400'>
                        {Object.entries(field)[0][0]}
                      </p>
                      <p>{Object.entries(field)[0][1]}</p>
                    </div>
                  ))}
                </div>
                <div className='flex items-center justify-center'>
                  <FaArrowRight color='green' />
                </div>
                <div>
                  {selectEditor?.editedFields.map((field, i) => (
                    <div key={i} className='text-[14px]'>
                      <p className='text-gray-400'>
                        {Object.entries(field)[1][0]}
                      </p>
                      <p>{Object.entries(field)[1][1]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='mt-6 m-5'>
            <div>
              <h2 className='mb-4'>{comments?.length} Comments</h2>
              <div className='flex gap-6'>
                <Stack direction='row' spacing={2}>
                  <Avatar
                    {...stringAvatar(selectedClinic.clinicName)}
                    sx={{
                      width: 56,
                      height: 56,
                      bgcolor: `${stringToColor(selectedClinic.clinicName)}`,
                    }}
                  />
                </Stack>
                <TextField
                  id='standard-basic'
                  label='Add a comment'
                  variant='standard'
                  fullWidth
                  value={newComment}
                  onChange={handleNewComment}
                />
              </div>
              <Button onClick={submitComment} className='absolute right-3'>
                Comment
              </Button>
            </div>
            <div className='m-8 lg:h-[250px] xl:h-[320px] overflow-y-scroll shadow-sm shadow-gray-400 rounded-lg p-3'>
              {comments ? (
                comments.map((elem, i) => (
                  <div key={i} className='border-b-[0.5px]'>
                    <div className='py-3 flex items-center gap-4'>
                      <Stack direction='row' spacing={2}>
                        <Avatar
                          {...stringAvatar(elem.clinicName)}
                          sx={{
                            width: 56,
                            height: 56,
                            bgcolor: `${stringToColor(elem.clinicName)}`,
                          }}
                        />
                      </Stack>
                      <p>{elem.comment}</p>
                    </div>
                    <div className='ml-4 text-gray-400 text-sm'>
                      {elem.clinicName === clinic.clinicName ? (
                        "You"
                      ) : (
                        <p className='hover:underline cursor-pointer'>
                          {elem.clinicName}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className='flex items-center justify-center mt-[3rem]'>
                  No comments yet
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
