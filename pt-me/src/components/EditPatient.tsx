/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { AppDispatch } from "@/Redux/store";
import { useDispatch } from "react-redux";
import { fetchPatient } from "@/Redux/Features/patients/patientSlice";
import { Patient } from "../../types";
import Select from "react-select";
import { TextField } from "@mui/material";
import { Controller, useController, useForm } from "react-hook-form";
import { BASE_URL, CLIENT } from "@/components/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  patientId: string | string[];
}

const styling = { width: "100%", borderRadius: "10px", margin: "10px" };

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

const injuryTypes = [
  "All",
  "Shoulders",
  "Back",
  "Knee",
  "Hip",
  "Neck",
  "Wrist/Hand",
  "Ankle/Foot",
  "Abdominal",
  "Gluteal",
];

export default function EditPatient({ patientId }: Props) {
  const [patient, setPatient] = useState<Patient>();
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, control, formState } = useForm({
    mode: "all",
  });
  const router = useRouter();
  useEffect(() => {
    async function getPatient() {
      const { payload } = await dispatch(fetchPatient(Number(patientId)));
      setPatient(payload as Patient);
    }
    getPatient();
  }, []);

  const genderController = useController({
    name: "Gender",
    control,
  });

  const injuryTypeController = useController({
    name: "Injury Type",
    control,
  });

  const insuranceController = useController({
    name: "Insurance",
    control,
  });

  const onSubmit = async (formData: any) => {
    const updatedData = {
      "First Name":
        formData["First Name"] || patient?.title.split(" ")[0] || "",
      "Last Name": formData["Last Name"] || patient?.title.split(" ")[1] || "",
      Age: formData.Age || patient?.age || "",
      Email: formData.Email || patient?.email || "",
      "Phone Number":
        formData["Phone Number"] ||
        patient?.phoneNumber.replace(/-/g, "") ||
        "",
      Address: formData.Address || patientAddress || "",
      City: formData.City || patientCity || "",
      State: formData.State || patientState || "",
      Zipcode: formData.Zipcode || patientZipcode || "",
      Gender:
        formData.Gender ||
        (genderOptions[0].value === patient?.gender
          ? genderOptions[1]
          : genderOptions[0]),
      Insurance: formData.Insurance || defaultInsurance[0],
      "Injury Type": formData["Injury Type"] || patient?.injuryId || "",
      "Reason For Visit":
        formData["Reason For Visit"] || patient?.reasonForVisit || "",
    };
    const result = await CLIENT.put(
      `${BASE_URL}/api/patients/update/${patientId}`,
      updatedData
    );
    if (result.status === 200) {
      router.push(`/patient/${patientId}`);
    }
  };

  const handleGenderSelectChange = (option: any) => {
    genderController.field.onChange(option.value);
  };

  const handleInsuranceSelectChange = (option: any) => {
    insuranceController.field.onChange(option.value);
  };

  const handleInjuryTypeSelectChange = (option: any) => {
    injuryTypeController.field.onChange(option.value);
  };

  const patientAddress = patient?.address?.split(",")[0];
  const patientState = patient?.address?.split(",")[1]?.split(" ")[1];
  const patientCity = patient?.address?.split(",")[1]?.split(" ")[2];
  const patientZipcode = patient?.address?.split(",")[2];

  const defaultInsurance = insuranceOptions.filter((option) => {
    if (option.value === patient?.insurance) {
      return option.value;
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-[2rem]'>
      <div className='grid grid-cols-3 gap-4'>
        <TextField
          type='text'
          label='First Name'
          required
          defaultValue={patient?.title.split(" ")[0]}
          sx={styling}
          {...register(`First Name`, {
            required: false,
          })}
        />
        <TextField
          type='text'
          label='Last Name'
          required
          defaultValue={patient?.title.split(" ")[1]}
          sx={styling}
          {...register("Last Name", {
            required: false,
          })}
        />
        <TextField
          type='number'
          label='Age'
          required
          defaultValue={patient?.age}
          sx={styling}
          {...register(`Age`, {
            required: false,
          })}
        />
        <TextField
          type='email'
          label='Email'
          required
          defaultValue={patient?.email}
          sx={styling}
          {...register("Email", {
            required: false,
          })}
        />
        <TextField
          type='number'
          label='Phone Number'
          required
          defaultValue={patient?.phoneNumber.replace(/-/g, "")}
          sx={styling}
          {...register(`Phone Number`, {
            required: false,
          })}
        />
        <TextField
          type='text'
          label='Address'
          required
          defaultValue={patientAddress}
          sx={styling}
          {...register(`Address`, {
            required: false,
          })}
        />
        <TextField
          type='text'
          label='City'
          required
          defaultValue={patientCity}
          sx={styling}
          {...register(`City`, {
            required: false,
          })}
        />
        <TextField
          type='text'
          label='State'
          required
          defaultValue={patientState}
          sx={styling}
          {...register(`State`, {
            required: false,
          })}
        />
        <TextField
          type='number'
          label='Zipcode'
          required
          defaultValue={patientZipcode}
          sx={styling}
          {...register(`Zipcode`, {
            required: false,
          })}
        />

        <Controller
          control={control}
          name='Gender'
          render={({ field }) => (
            <>
              <Select
                placeholder='Gender'
                defaultValue={
                  genderOptions[0].value === patient?.gender
                    ? genderOptions[1]
                    : genderOptions[0]
                }
                options={genderOptions}
                onChange={handleGenderSelectChange}
                className='w-full rounded-lg m-[10px] z-[50]'
              />
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
                defaultValue={defaultInsurance[0]}
                options={insuranceOptions}
                onChange={handleInsuranceSelectChange}
                className='w-full rounded-lg m-[10px]'
              />
            </>
          )}
        />
        <Controller
          control={control}
          name='Injury Type'
          render={({ field }) => (
            <>
              <Select
                placeholder='Injury Type'
                options={injuryTypeOptions}
                onChange={handleInjuryTypeSelectChange}
                className='w-full rounded-lg m-[10px]'
              />
            </>
          )}
        />
        <TextField
          type='text'
          label='Reason For Visit'
          required
          defaultValue={patient?.reasonForVisit}
          sx={styling}
          {...register(`Reason For Visit`, {
            required: false,
          })}
        />
      </div>
      <div className='flex items-center justify-center mt-[2rem] gap-4'>
        <Link
          href={`/patient/${patient?.id}`}
          className='text-center w-[20%] hover:bg-[#3BE13B] hover:text-white bg-white text-[#3BE13B] rounded-lg shadow-green-400 shadow-lg duration-300 hover:scale-110  px-4 py-2'
        >
          Cancel
        </Link>
        <button
          type='submit'
          className='w-[20%] bg-[#3BE13B] rounded-lg shadow-green-400 shadow-lg duration-300 hover:scale-110 text-white px-4 py-2'
        >
          Save
        </button>
      </div>
    </form>
  );
}
