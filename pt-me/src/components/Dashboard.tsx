/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Event } from "react-big-calendar";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import addHours from "date-fns/addHours";
import startOfHour from "date-fns/startOfHour";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch } from "react-redux";
import { fetchAllPatients } from "@/Redux/Features/patients/patientSlice";
import { AppDispatch } from "@/Redux/store";
import { BsSearch } from "react-icons/bs";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import { CLIENT, BASE_URL } from "./api";

const style = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#fdfff5",
      borderRadius: "15px",
    },
  },
  width: "100%",
  height: "30%",
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

interface Patient extends Event {
  id: number;
  title: string;
  address: string;
  phoneNumber: string;
  email: string;
  reasonForVisit: string;
  age: string;
  injuryId: number;
  insurance: string;
  start?: Date | undefined;
  end?: Date | undefined;
  isDraggable?: boolean | undefined;
}

interface Payload {
  payload: Patient[];
}

interface DashboardProps {
  clinicName: string;
}

const injuryTypes = ["Shoulders", "Back", "Knee", "Hip"];

const Dashboard: FC<DashboardProps> = ({ clinicName }) => {
  const [events, setEvents] = useState<Patient[]>();
  const [searchInput, setSearchInput] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [patientId, setAppointmentToDelete] = useState<number>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function getPatients() {
      const { payload } = await dispatch(fetchAllPatients(1));
      console.log(payload);
      const convertedDatabaseData = (payload as Patient[]).map(
        (item: Patient) => ({
          ...item,
          start: item.start ? new Date(item.start) : undefined,
          end: item.end ? new Date(item.end) : undefined,
        })
      );
      setEvents(convertedDatabaseData as Patient[]);
    }
    getPatients();
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const onEventResize: withDragAndDropProps["onEventResize"] = (data) => {
    console.log(data);

    setEvents((currentEvents) => {
      const updatedEvents = currentEvents?.map((event) => {
        if (event.id === (data.event as Patient).id) {
          return {
            ...event,
            start: new Date(data.start),
            end: new Date(data.end),
          };
        }
        return event;
      });
      return updatedEvents;
    });
  };

  const updateAppointment = async (event: Patient) => {
    await CLIENT.put(
      `${BASE_URL}/api/patients/update-appointment/${event.id}`,
      event
    );
  };

  const onEventDrop: withDragAndDropProps["onEventDrop"] = (data) => {
    setEvents((currentEvents) => {
      const updatedEvents = currentEvents?.map((event) => {
        if (event.id === (data.event as Patient).id) {
          return {
            ...event,
            start: new Date(data.start),
            end: new Date(data.end),
          };
        }
        // updateAppointment(event);
        return event;
      });
      console.log(updatedEvents);
      updatedEvents?.forEach((event) => {
        if (event.id === (data.event as Patient).id) {
          updateAppointment(event);
        }
      });
      return updatedEvents;
    });
  };

  const handleClickPatient = (patient: Patient) => {
    console.log(patient);
  };

  function clickEvent(data: any) {
    console.log(data);
    setOpen(true);
    setAppointmentToDelete(data.id);
  }

  function handleClose() {
    setOpen(false);
  }

  const cancelAppointment = async () => {
    const { data } = await CLIENT.put(
      `${BASE_URL}/api/patients/delete-appointment/${patientId}`
    );
    const newEventsArray = events?.map((event) => {
      if (event.id === data.id) {
        return data;
      } else {
        return event;
      }
    });
    setEvents(newEventsArray);
    setOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "space-between",
        gap: "2rem",
      }}
    >
      <div style={{ flex: "75%" }}>
        <p className='text-xl tracking-widest font-bold uppercase'>
          {clinicName} <span className='text-green-500'>Dashboard</span>{" "}
        </p>

        <DnDCalendar
          onSelectEvent={clickEvent}
          defaultView='week'
          events={events}
          localizer={localizer}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          resizable
          style={{ height: "100%" }}
        />
      </div>
      <div style={{ flex: "25%" }}>
        <div className='flex items-center justify-center py-[1rem]'>
          <TextField
            id='outlined-search'
            value={searchInput}
            onChange={handleSearch}
            type='search'
            focused
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <BsSearch color='#3BE13B' />
                </InputAdornment>
              ),
            }}
            sx={style}
            placeholder='Search Patients'
          />
        </div>
        <div className='w-[400px]'>
          <div>
            {events
              ?.filter((patient) => !patient?.start || !patient?.end)
              .map((patient, index) => (
                <div
                  key={patient?.id}
                  onClick={() => handleClickPatient(patient)}
                  className='bg-gradient-to-tr from-green-100 via-green-200 to-green-300 mt-4 m-3 p-7 rounded-lg shadow-lg shadow-green-300'
                >
                  <div className='flex justify-between'>
                    <h1 className='text-lg'>{patient?.title}</h1>
                    <button className='text-sm rounded-lg p-2 bg-[#313586cd] text-white duration-300 hover:scale-110'>
                      Schedule
                    </button>
                  </div>
                  <div className='flex items-center gap-4'>
                    <p className='text-sm text-gray-400'>
                      {patient.reasonForVisit}
                    </p>
                    <div className='h-3 w-[1px] bg-gray-400'></div>
                    <p className='text-sm text-gray-400'>
                      {injuryTypes[patient.injuryId - 1]}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={PaperComponent}
            aria-labelledby='draggable-dialog-title'
            fullWidth={true}
          >
            <DialogTitle
              style={{ cursor: "move", color: "red" }}
              id='draggable-dialog-title'
            >
              Cancel This Appointment
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to cancel this appointment
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Exit
              </Button>
              <Button className='text-red-600' onClick={cancelAppointment}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

const locales = {
  "en-US": enUS,
};
const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);
const now = new Date();
const start = endOfHour(now);
const end = addHours(start, 2);
// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
//@ts-ignore
const DnDCalendar = withDragAndDrop(Calendar);

export default Dashboard;
