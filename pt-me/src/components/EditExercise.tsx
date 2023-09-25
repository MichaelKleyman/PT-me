/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Controller, useController, useForm } from "react-hook-form";
import { CLIENT, BASE_URL } from "@/components/api";
import { ExerciseData } from "../../types";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import Select from "react-select";
import Iframe from "react-iframe";
import Link from "next/link";
import { AiOutlineCloseSquare } from "react-icons/ai";
interface Props {
  exerciseId: string | string[];
}

const styling = { width: "70%", borderRadius: "10px", margin: "10px" };

const exerciseTypeOptions = [
  { value: "Knee", label: "Knee" },
  { value: "Shoulders", label: "Shoulders" },
  { value: "Back", label: "Back" },
  { value: "Neck", label: "Neck" },
  { value: "Wrist/Hand", label: "Wrist/Hand" },
  { value: "Ankle/Foot", label: "Ankle/Foot" },
  { value: "Abdominal", label: "Abdominal" },
  { value: "Gluteal", label: "Gluteal" },
];

interface InjuryDictionary {
  [key: string]: number;
}
const injuryDictionary: InjuryDictionary = {
  Shoulders: 1,
  Back: 2,
  Knee: 3,
  Hip: 4,
  Neck: 5,
  "Wrist/Hand": 6,
  "Ankle/Foot": 7,
  Abdominal: 8,
  Gluteal: 9,
};

export default function EditExercise({ exerciseId }: Props) {
  const [exercise, setExercise] = useState<ExerciseData>();
  const [videoLink, setLink] = useState<string>();
  const [tips, setTips] = useState<string[]>([]);
  const [newTip, setNewTip] = useState<string>("");
  const {
    register,
    handleSubmit,
    trigger,
    control,
    getValues,
    formState,
    reset,
  } = useForm({ mode: "all" });

  useEffect(() => {
    const getExercise = async () => {
      const { data } = await CLIENT.get(
        `${BASE_URL}/api/exercises/${exerciseId}`
      );

      setExercise(data);
      setTips(data.tips.split(".").slice(0, -1));
    };
    getExercise();
  }, []);

  const exerciseTypeController = useController({
    name: "exerciseType",
    control,
  });

  const handleExerciseTypeSelectChange = (option: any) => {
    exerciseTypeController.field.onChange(option.value);
  };

  const handleAddTip = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTip(e.target.value);
  };

  const addTip = () => {
    if (newTip.trim() !== "") {
      setTips([...tips, newTip]); // Add the new tip to the list
      reset(); // Clear the input field
    }
  };

  console.log(getValues("exerciseTips"));

  const deleteTip = (index: number) => {
    const newTipsArray = tips.filter((tip, i) => index !== i);
    setTips(newTipsArray);
  };

  const handleVideoLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    const videoId = e.target.value.split("v=")[1];
    const embedLink = `https://www.youtube.com/embed/${videoId}`;
    setLink(embedLink);
  };

  const onSubmit = async (formData: any) => {
    const {
      exerciseName,
      exerciseType,
      musclesWorked,
      exerciseDescription,
      exerciseVideo,
    } = formData;
    const finalFormData = {
      name: exerciseName,
      injuryId: injuryDictionary[exerciseType],
      musclesWorked,
      description: exerciseDescription,
      tips: tips.join(","),
      videoLink: videoLink,
    };
  };

  const defaultExerciseOption = exerciseTypeOptions.filter((option) => {
    const matchedExercise = Object.entries(injuryDictionary).find(
      (val) => val[1] === exercise?.injuryId
    );
    if (option.value === matchedExercise?.[0]) {
      return option.value;
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex items-center justify-evenly'>
        <div className='w-[70%]'>
          <TextField
            type='text'
            label='Exercise Name'
            defaultValue={exercise?.name}
            sx={{ width: "90%", borderRadius: "10px", margin: "10px" }}
            {...register("exerciseName")}
          />
          <Controller
            control={control}
            name='exerciseType'
            render={({ field }) => (
              <>
                <Select
                  placeholder='Exercise Type'
                  options={exerciseTypeOptions}
                  onChange={handleExerciseTypeSelectChange}
                  className='w-[90%] rounded-lg m-[10px] z-[50]'
                />
              </>
            )}
          />
          <TextField
            type='text'
            defaultValue={exercise?.musclesWorked}
            label='Muscles Worked'
            sx={{ width: "90%", borderRadius: "10px", margin: "10px" }}
            {...register("musclesWorked")}
          />
        </div>
        <TextField
          multiline
          rows={5}
          type='text'
          defaultValue={exercise?.description}
          sx={styling}
          {...register("exerciseDescription")}
          label='Exercise Description'
        />
      </div>
      <div className='flex'>
        <div className='w-full'>
          <div className='flex items-center w-[90%]'>
            <TextField
              type='text'
              label='Add Tips For The Exercise'
              sx={{ width: "100%", borderRadius: "10px", margin: "10px" }}
              {...register("exerciseTips", {
                onChange: (e) => handleAddTip(e),
              })}
            />
            <button
              type='button'
              onClick={addTip}
              className='h-[40px] bg-[#3BE13B] w-[30%] rounded-lg shadow-green-400 shadow-lg duration-300 hover:scale-110 text-white'
            >
              Add
            </button>
          </div>
          <div className='p-3 bg-slate-100 overflow-y-scroll rounded-sm shadow-lg shadow-gray-200 w-[90%] h-[140px]'>
            {tips?.map((tip, index) => (
              <div
                key={index}
                className='flex items-center justify-between my-2'
              >
                <p>{tip}</p>
                <button
                  onClick={() => deleteTip(index)}
                  className='duration-300 hover:scale-100 shadow-lg shadow-slate-300 hover:shadow-slate-500'
                >
                  <AiOutlineCloseSquare size={23} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className='w-full'>
          <TextField
            type='text'
            defaultValue={exercise?.videoLink}
            label='Link To Exercise Instruction Video'
            sx={{ width: "100%", borderRadius: "10px", margin: "10px" }}
            {...register("exerciseVideo", {
              onChange: (e) => handleVideoLink(e),
            })}
          />
          {/* https://www.youtube.com/embed/TGmnvU2Tc-c?si=43l58nE-f3qfmd-_ */}
          {/* https://www.youtube.com/watch?v=TGmnvU2Tc-c */}
          {videoLink ? (
            <div className='text-center'>
              <Iframe
                url={videoLink}
                width='560'
                height='215'
                allowFullScreen
              />
            </div>
          ) : (
            <div className='text-center'>
              <Iframe
                url={exercise?.videoLink as string}
                width='560'
                height='215'
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
      <div className='flex items-center justify-center mt-[2rem] gap-4'>
        <Link
          href='/exercises'
          className='text-center w-[20%] hover:bg-[#3BE13B] hover:text-white bg-white text-[#3BE13B] rounded-lg shadow-green-400 shadow-lg duration-300 hover:scale-110  px-4 py-2'
        >
          Cancel
        </Link>
        <button
          type='submit'
          className='w-[20%] bg-[#3BE13B] rounded-lg shadow-green-400 shadow-lg duration-300 hover:scale-110 text-white px-4 py-2'
        >
          Submit
        </button>
      </div>
    </form>
  );
}
