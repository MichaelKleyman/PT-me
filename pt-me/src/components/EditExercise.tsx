/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Controller, useController, useForm } from "react-hook-form";
import { CLIENT, BASE_URL } from "@/components/api";
import { ExerciseData } from "../../types";
import TextField from "@mui/material/TextField";
import Select from "react-select";
import Iframe from "react-iframe";
import Link from "next/link";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import { Alert, Button } from "@mui/material";
import type { AppDispatch, RootState } from "@/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { me } from "../Redux/Features/auth/authSlice";
import { FieldValues } from "react-hook-form";
import { AnyARecord } from "dns";

const style = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#fdfff5",
      borderRadius: "15px",
    },
  },
  width: "100%",
  height: "100%",
  backgroundColor: "white",
  borderRadius: "20px",
  boxShadow: "0px 0px 8px #ddd",
};

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle='#draggable-dialog-title'
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
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
interface Props {
  exerciseId: string | string[];
}

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
  const [clicked, setClicked] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [tips, setTips] = useState<string[]>([]);
  const [newTip, setNewTip] = useState<string>("");
  const [editedData, setEditedData] = useState<ExerciseData>();
  const [injuryOptionIndex, setInjuryIndex] = useState<number>();
  const [editorName, setEditorName] = useState<string>("");
  const [editedFields, setEditedFields] = useState<[string, unknown][]>();
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, control, reset, watch, setValue } = useForm({
    mode: "all",
  });
  const watchedFields = watch(); // Get all watched fields
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const clinic = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    dispatch(me());
    const getExercise = async () => {
      const { data } = await CLIENT.get(
        `${BASE_URL}/api/exercises/${exerciseId}`
      );
      for (let i = 0; i < exerciseTypeOptions.length; i++) {
        if (
          exerciseTypeOptions[i].value ===
          exerciseTypeOptions[data?.injuryId].value
        ) {
          setInjuryIndex(i);
          break;
        }
      }
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
      const tipToAdd = newTip.endsWith(".") ? newTip : newTip + ".";
      setTips([...tips, tipToAdd]); // Add the new tip to the list
      reset(); // Clear the input field
    }
  };

  const deleteTip = (index: number) => {
    const newTipsArray = tips.filter((_, i) => index !== i);
    setTips(newTipsArray);
  };

  const handleVideoLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    const videoId = e.target.value.split("v=")[1];
    const embedLink = `https://www.youtube.com/embed/${videoId}`;
    setLink(embedLink);
  };
  console.log("Touched/Edited fields:", watchedFields);

  const onSubmit = (data: any) => {
    console.log(watchedFields);
    const edited = Object.entries(watchedFields).filter(
      (field: any) => field[1]?.length > 1
    );
    console.log(edited);
    // setEditedFields(edited);
    const { exerciseName, exerciseType, musclesWorked, exerciseDescription } =
      data;
    const finalData = {
      name: exerciseName || exercise?.name || "",
      injuryId: injuryDictionary[exerciseType] || exercise?.injuryId || "",
      musclesWorked: musclesWorked || exercise?.musclesWorked || "",
      description: exerciseDescription || exercise?.description || "",
      tips:
        tips
          .map((tip) => {
            // Remove any existing trailing period
            const trimmedTip = tip.trim().replace(/\.$/, "");

            // Add a period to the end
            return trimmedTip + ".";
          })
          .join(" ") ||
        exercise?.tips ||
        "",
      videoLink: videoLink || exercise?.videoLink || "",
    };
    setEditedData(finalData as ExerciseData);
    setClicked(true);
  };

  const onSubmit2 = async () => {
    if (editorName) {
      // const updateStatus = await CLIENT.put(
      //   `${BASE_URL}/api/exercises/update/${exercise?.id}`,
      //   editedData
      // );
      const credentialStatus = await CLIENT.post(
        `${BASE_URL}/api/exEditCredentials/new-edit/${exercise?.id}`,
        {
          clinicName: clinic?.clinicName,
          editorName,
          editedFields,
          tips: editedData?.tips,
        }
      );
      // if (updateStatus.status === 200 && credentialStatus.status === 200) {
      //   router.push(`/exercises/${exercise?.id}`);
      //   setError(null);
      // }
    } else {
      setError("Please type editor name*");
    }
  };

  const handleClose = () => {
    setClicked(false);
  };

  const handleEditorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditorName(e.target.value);
  };

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
                {injuryOptionIndex !== undefined ? (
                  <Select
                    placeholder='Exercise Type'
                    options={exerciseTypeOptions}
                    onChange={handleExerciseTypeSelectChange}
                    className='w-[90%] rounded-lg m-[10px] z-[50]'
                  />
                ) : (
                  <div>Loading...</div> // You can show a loading indicator until the value is available
                )}
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
      <Dialog
        open={clicked}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
        fullWidth={true}
      >
        <DialogTitle style={{ cursor: "move" }} id='draggable-dialog-title'>
          Who's making these changes
        </DialogTitle>

        <DialogContent>
          <TextField
            type='text'
            disabled
            value={clinic?.clinicName}
            label='Clinic Name'
            sx={{ width: "100%", borderRadius: "10px", margin: "10px" }}
          />
          <TextField
            type='text'
            label='Editor Name'
            sx={{ width: "100%", borderRadius: "10px", margin: "10px" }}
            value={editorName}
            onChange={handleEditorChange}
          />
          {error && (
            <div className='text-red-500 text-sm text-center'>{error}</div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {saved ? (
            <Alert severity='success'>Successfully Saved</Alert>
          ) : (
            <Button
              onClick={onSubmit2}
              className='bg-[#3BE13B] rounded-lg shadow-green-400 shadow-lg duration-300 hover:scale-110 text-white px-4 py-2'
            >
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </form>
  );
}
