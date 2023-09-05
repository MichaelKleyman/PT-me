"use client";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useController, useForm } from "react-hook-form";
import PDFPreview from "./PDFPreview";
import Select from "react-select";
import { CLIENT, BASE_URL } from "./api";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

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

export interface PatientFormData {
  "Last Name": string;
  "First Name": string;
  Age: number | undefined;
  Gender: string;
  Email: string;
  "Phone Number": number | undefined;
  Insurance: string;
  Address: string;
  State: string;
  City: string;
  Zipcode: number | undefined;
  "Reason For Visit": string;
  "Injury Type": string;
}

export default function CreatePatientForm() {
  const [page, setPage] = useState<number>(0);
  const [selectErrorMessage, setSelectErrorMessage] = useState<string>("");
  const [patientFormData, setData] = useState<PatientFormData>({
    "Last Name": "",
    "First Name": "",
    Age: undefined,
    Gender: "",
    Email: "",
    "Phone Number": undefined,
    Insurance: "",
    Address: "",
    State: "",
    City: "",
    Zipcode: undefined,
    "Reason For Visit": "",
    "Injury Type": "",
  });
  const {
    register,
    handleSubmit,
    trigger,
    control,
    getValues,
    formState: { errors },
  } = useForm({ mode: "all" });
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

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

  const totalPages = 4;

  const onSubmit = async (formData: any) => {
    const isValid = Object.values(getValues()).every(
      (elem) => elem !== undefined
    );
    if (!insuranceController.fieldState.isDirty) {
      setData((prevState) => ({
        ...prevState,
        Insurance: getValues("Injury Type"),
      }));
      setSelectErrorMessage("Please select an option.");
    } else {
      if (isValid) {
        const res = await CLIENT.post(
          `${BASE_URL}/api/patients/${user.id}`,
          formData
        );
        router.push(`/patient/${res.data.patientId}`);
      }
    }
  };

  const handleNext = async () => {
    const result = await trigger(
      inputs.slice(
        page === totalPages - 1 ? page * 4 - 1 : page * 4,
        page === totalPages - 2 ? (page + 1) * 4 - 1 : (page + 1) * 4
      )
    );

    if (result && page === 0 && genderController.fieldState.isDirty) {
      setPage(page + 1);
      setSelectErrorMessage("");
      setData((prevState) => ({
        ...prevState,
        Gender: getValues("Gender"),
      }));
    } else {
      setSelectErrorMessage("Please select an option.");
    }
    if (result && page === 1 && insuranceController.fieldState.isDirty) {
      setPage(page + 1);
      setSelectErrorMessage("");
      setData((prevState) => ({
        ...prevState,
        Insurance: getValues("Insurance"),
      }));
    } else {
      setSelectErrorMessage("Please select an option.");
    }
    if (result && page === 2) {
      setPage(page + 1);
    }
  };

  const handleBack = () => {
    setPage(page - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGenderSelectChange = (option: any) => {
    setSelectErrorMessage("");
    genderController.field.onChange(option.value);
  };

  const handleInsuranceSelectChange = (option: any) => {
    setSelectErrorMessage("");
    insuranceController.field.onChange(option.value);
  };

  const handleInjuryTypeSelectChange = (option: any) => {
    setSelectErrorMessage("");
    injuryTypeController.field.onChange(option.value);
  };

  return (
    <div className='grid md:grid-cols-3 gap-6 py-5'>
      <form onSubmit={handleSubmit(onSubmit)} className='col-span-1'>
        {inputs
          .slice(
            page === totalPages - 2 || page === totalPages - 1
              ? page * 4 - 1
              : page * 4,
            page === totalPages - 3
              ? (page + 1) * 4 - 1
              : page === totalPages - 2
              ? (page + 1) * 4 - 1
              : (page + 1) * 4
          )
          .map((question, index) => (
            <div key={index}>
              {page * 4 + index === 3 ? (
                <Controller
                  control={control}
                  name='Gender'
                  render={({ field }) => (
                    <>
                      <Select
                        instanceId={inputs[index]}
                        value={genderOptions.find(
                          (option) => option.value === field.value
                        )}
                        placeholder='Gender'
                        options={genderOptions}
                        onChange={handleGenderSelectChange}
                        className='w-full rounded-lg m-[10px]'
                      />
                      {selectErrorMessage && (
                        <span className='text-red-500'>
                          {selectErrorMessage}
                        </span>
                      )}
                    </>
                  )}
                />
              ) : page * 4 + index === 6 ? (
                <Controller
                  control={control}
                  name='Insurance'
                  render={({ field }) => (
                    <>
                      <Select
                        instanceId={inputs[index]}
                        value={insuranceOptions.find(
                          (option) => option.value === field.value
                        )}
                        placeholder='Insurance'
                        options={insuranceOptions}
                        onChange={handleInsuranceSelectChange}
                        className='w-full rounded-lg m-[10px]'
                      />
                      {selectErrorMessage && (
                        <span className='text-red-500'>
                          {selectErrorMessage}
                        </span>
                      )}
                    </>
                  )}
                />
              ) : page * 4 + index === 13 ? (
                <Controller
                  control={control}
                  name='Insurance'
                  render={({ field }) => (
                    <>
                      <Select
                        instanceId={inputs[index]}
                        value={injuryTypeOptions.find(
                          (option) => option.value === field.value
                        )}
                        placeholder='Injury Type'
                        options={injuryTypeOptions}
                        onChange={handleInjuryTypeSelectChange}
                        className='w-full rounded-lg m-[10px]'
                      />
                      {selectErrorMessage && (
                        <span className='text-red-500'>
                          {selectErrorMessage}
                        </span>
                      )}
                    </>
                  )}
                />
              ) : (
                <>
                  {inputs[page * 4 + index] === "Email" ? (
                    <TextField
                      id={inputs[index]}
                      type='email'
                      required
                      label={question}
                      value={patientFormData[question as keyof PatientFormData]}
                      sx={styling}
                      {...register(`${question}`, {
                        required: true,
                        onChange: (e) => handleChange(e),
                      })}
                    />
                  ) : inputs[page * 4 + index] === "Phone Number" ||
                    inputs[page * 4 + index] === "Age" ? (
                    <TextField
                      id={inputs[page * 4 + index]}
                      type='number'
                      required
                      label={question}
                      value={patientFormData[question as keyof PatientFormData]}
                      sx={styling}
                      {...register(`${question}`, {
                        required: true,
                        onChange: (e) => handleChange(e),
                      })}
                    />
                  ) : (
                    <TextField
                      id={inputs[page * 4 + index]}
                      type='text'
                      required
                      value={patientFormData[question as keyof PatientFormData]}
                      label={question}
                      sx={styling}
                      {...register(`${question}`, {
                        required: true,
                        onChange: (e) => handleChange(e),
                      })}
                    />
                  )}
                  {errors[inputs[page * 4 + index]] && (
                    <span className='text-red-500'>
                      This field is required*
                    </span>
                  )}
                </>
              )}
            </div>
          ))}
        <div className='flex justify-between'>
          {page > 0 && (
            <button
              type='button'
              onClick={handleBack}
              className='bg-white rounded-lg shadow-green-400 shadow-lg duration-300 hover:scale-110 text-[#3BE13B] px-4 py-2'
            >
              Back
            </button>
          )}
          {page < totalPages - 1 && (
            <button
              type='button'
              onClick={handleNext}
              className='bg-[#3BE13B] rounded-lg shadow-green-400 shadow-lg duration-300 hover:scale-110 text-white px-4 py-2'
            >
              Next
            </button>
          )}
          {page === totalPages - 1 && (
            <button
              type='submit'
              className='bg-[#3BE13B] rounded-lg shadow-green-400 shadow-lg duration-300 hover:scale-110 text-white px-4 py-2'
            >
              Submit
            </button>
          )}
        </div>
      </form>
      <div className='col-span-2'>
        <h1 className='text-center p-3'>(PDF Preview)</h1>
        <div className=''>
          <PDFPreview patientFormData={patientFormData} />
        </div>
      </div>
    </div>
  );
}
