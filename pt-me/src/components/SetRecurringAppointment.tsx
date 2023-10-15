import MenuItem from "@mui/material/MenuItem";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useState, forwardRef } from "react";
import { TextField } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import React from "react";
import { BASE_URL, CLIENT } from "./api";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const steps = [
  {
    label: "Set number of days and weeks",
  },
  {
    label: "Select specific times",
  },
];

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

interface Appointment {
  day: string;
  start?: Date;
  end?: Date;
}

interface RecurringAppointment {
  day1?: Appointment;
  day2?: Appointment;
  day3?: Appointment;
  day4?: Appointment;
  day5?: Appointment;
  day6?: Appointment;
  day7?: Appointment;
}

export default function SetRecurringAppointment({
  handleCloseRecurring,
  setMakeAppointment,
  clinicId,
  patientId,
}: any) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [recurring, setRecurring] = useState<RecurringAppointment>();
  const [dayName, setDayName] = useState<string[]>([]);
  const [numberOfWeeks, setNumberOfWeeks] = useState<string>("");
  const [complete, setComplete] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent<typeof dayName>) => {
    const {
      target: { value },
    } = event;
    setDayName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleStart = (day: string, time: Date) => {
    Object.entries(recurring as RecurringAppointment).forEach((obj) => {
      if (day === obj[1].day) {
        obj[1].start = new Date(time);
      }
    });
  };

  const handleEnd = (day: string, time: Date) => {
    Object.entries(recurring as RecurringAppointment).forEach((obj) => {
      if (day === obj[1].day) {
        obj[1].end = new Date(time);
      }
    });
  };

  const handleWeeksNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfWeeks(e.target.value);
  };

  const handleNext = () => {
    if (dayName.length && numberOfWeeks.length) {
      const obj: RecurringAppointment = {};
      dayName.forEach((day, i) => {
        obj[`day${i + 1}` as keyof RecurringAppointment] = {
          day,
          start: undefined,
          end: undefined,
        };
      });

      setRecurring(obj);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleFinish = async () => {
    console.log(recurring);
    await CLIENT.post(
      `${BASE_URL}/api/appointments/recurring-appointments/${patientId}/${clinicId}`,
      { appointments: recurring, frequency: numberOfWeeks }
    );
    setComplete(true);
    setTimeout(() => {
      setComplete(false);
      handleCloseRecurring();
      setMakeAppointment(false);
    }, 3000);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setComplete(false);
  };

  const dayOptions: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  function getStyles(
    name: string,
    personName: readonly string[],
    theme: Theme
  ) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  return (
    <React.Fragment>
      <MenuItem className='w-[590px] h-[350px] z-[50] flex items-start'>
        <div>
          <Box sx={{ maxWidth: 500 }}>
            <Stepper activeStep={activeStep} orientation='vertical'>
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === 1 ? (
                        <Typography variant='caption'>Last step</Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <Typography>
                      {index === 0 ? (
                        <FormControl
                          sx={{
                            m: 1,
                            width: 300,
                            textAlign: "center",
                            gap: "15px",
                          }}
                        >
                          <InputLabel id='demo-multiple-chip-label'>
                            Days
                          </InputLabel>
                          <Select
                            labelId='demo-multiple-chip-label'
                            id='demo-multiple-chip'
                            multiple
                            value={dayName}
                            onChange={handleChange}
                            input={
                              <OutlinedInput
                                id='select-multiple-chip'
                                label='Chip'
                              />
                            }
                            renderValue={(selected) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((value) => (
                                  <Chip key={value} label={value} />
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                          >
                            {dayOptions.map((day) => (
                              <MenuItem
                                key={day}
                                value={day}
                                style={getStyles(day, dayOptions, theme)}
                              >
                                {day}
                              </MenuItem>
                            ))}
                          </Select>
                          <TextField
                            type='number'
                            label='Number of Weeks'
                            id='filled-size-normal'
                            defaultValue='1'
                            onChange={handleWeeksNumber}
                          />
                        </FormControl>
                      ) : (
                        <div>
                          {recurring &&
                            Object.values(
                              recurring as RecurringAppointment
                            )?.map((obj: Appointment, i) => (
                              <div key={i} className='grid md:grid-cols-3'>
                                <p className='my-2 p-1 col-span-1'>{obj.day}</p>
                                <div className='col-span-2'>
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DemoContainer
                                      components={["TimePicker", "TimePicker"]}
                                    >
                                      <div className='flex gap-3'>
                                        <TimePicker
                                          label='Start time'
                                          value={obj.start}
                                          onChange={(newValue) =>
                                            handleStart(
                                              obj.day,
                                              newValue as Date
                                            )
                                          }
                                        />
                                        <TimePicker
                                          label='End time'
                                          value={obj.end}
                                          onChange={(newValue) =>
                                            handleEnd(obj.day, newValue as Date)
                                          }
                                        />
                                      </div>
                                    </DemoContainer>
                                  </LocalizationProvider>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <div>
                        {index === steps.length - 1 ? (
                          <Button
                            disabled={!dayName.length || !numberOfWeeks.length}
                            onClick={handleFinish}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            Finish
                          </Button>
                        ) : (
                          <Button
                            disabled={!dayName.length || !numberOfWeeks.length}
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            Continue
                          </Button>
                        )}
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>
        </div>
      </MenuItem>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={complete}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity='success'
            sx={{ width: "100%" }}
            style={{ color: "white" }}
          >
            Recurring appointment made!
          </Alert>
        </Snackbar>
      </Stack>
    </React.Fragment>
  );
}
