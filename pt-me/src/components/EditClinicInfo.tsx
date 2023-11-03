"use client";
import { FormControl, Input, InputAdornment, InputLabel } from "@mui/material";
import { useState } from "react";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import { CLIENT, BASE_URL } from "./api";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface EditedData {
  clinicName: string;
  address: string;
  email: string;
}

export default function EditClinicInfo(params: {
  id: number;
  clinicName: string;
  address: string;
  email: string;
}) {
  const [error, setError] = useState<string>("");
  const [editedData, setEditedData] = useState<EditedData>({
    clinicName: params.clinicName,
    address: params.address,
    email: params.email,
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async () => {
    if (
      editedData.address !== params.address ||
      editedData.clinicName !== params.clinicName ||
      editedData.email !== params.email
    ) {
      const res = await CLIENT.put(
        `${BASE_URL}/api/clinic/edit-clinic/${params.id}`,
        editedData
      );
      if (res.status === 200) {
        router.push(`/${params.id}`);
      }
    } else {
      setError("Please fill in at least one field*");
    }
  };

  return (
    <div className='shadow-lg shadow-gray-400 rounded-lg p-8 m-3 max-w-[400px] w-full flex flex-col items-center justify-center gap-5'>
      <div>
        <label className='font-bold tracking-wide text-[1.3rem]'>Name</label>
        <FormControl sx={{ width: "35ch" }} variant='standard'>
          <InputLabel htmlFor='standard-adornment-password'>
            {editedData.clinicName}
          </InputLabel>
          <Input
            id='standard-adornment-password'
            onChange={handleChange}
            name='clinicName'
            endAdornment={
              <InputAdornment position='end'>
                <EditLocationIcon aria-label='name logo'></EditLocationIcon>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div>
        <label className='font-bold tracking-wide text-[1.3rem]'>Email</label>
        <FormControl sx={{ width: "35ch" }} variant='standard'>
          <InputLabel htmlFor='standard-adornment-password'>
            {editedData.email}
          </InputLabel>
          <Input
            id='standard-adornment-password'
            name='email'
            onChange={handleChange}
            endAdornment={
              <InputAdornment position='end'>
                <MarkEmailReadIcon aria-label='email logo'></MarkEmailReadIcon>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div>
        <label className='font-bold tracking-wide text-[1.3rem]'>Address</label>
        <FormControl sx={{ width: "35ch" }} variant='standard'>
          <InputLabel htmlFor='standard-adornment-password'>
            {editedData.address}
          </InputLabel>
          <Input
            id='standard-adornment-password'
            name='address'
            onChange={handleChange}
            endAdornment={
              <InputAdornment position='end'>
                <EditLocationIcon aria-label='location logo'></EditLocationIcon>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div className='flex items-center gap-8 w-full'>
        <Link
          href={`/${params.id}`}
          className='bg-gray-200 duration-300 hover:scale-110 cursor-pointer p-2 rounded-lg w-full text-center font-medium'
        >
          Cancel
        </Link>
        <button
          onClick={handleSubmit}
          className='bg-green-400 duration-300 hover:scale-110 cursor-pointer p-2 rounded-lg w-full text-center text-white font-medium'
        >
          Save
        </button>
      </div>
      {error && (
        <div className='text-[15px] text-red-600 text-center'>{error}</div>
      )}
    </div>
  );
}
