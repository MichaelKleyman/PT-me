/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useCallback, useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPatients } from "@/Redux/Features/patients/patientSlice";
import { AppDispatch, RootState } from "@/Redux/store";
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
import { SlotInfo } from "react-big-calendar";
import Alert from "@mui/material/Alert";
import { me } from "@/Redux/Features/auth/authSlice";

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
  clinicId: number;
  insurance: string;
  appointments: {
    id: number;
    clinicId: number;
    patientId: number;
    start?: Date | undefined;
    end?: Date | undefined;
  }[];
  start?: Date | undefined;
  end?: Date | undefined;
}

interface Appointments {
  id: number;
  clinicId: number;
  patientId: number;
  start?: Date | undefined;
  end?: Date | undefined;
  patient: {
    id: number;
    title: string;
  };
}

interface DashboardProps {
  clinicName: string;
}

const injuryTypes = ["Shoulders", "Back", "Knee", "Hip"];

const Dashboard: FC<DashboardProps> = ({ clinicName }) => {
  const [events, setEvents] = useState<Appointments[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [makeAppointment, setMakeAppointment] = useState<boolean>(false);
  const [scheduled, setScheduled] = useState({ clicked: false, id: -1 });
  const [appointmentId, setAppointmentToDelete] = useState<number>();
  const [appointmentTime, setAppointmentTime] = useState<SlotInfo>();
  const dispatch = useDispatch<AppDispatch>();
  const clinic = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    dispatch(me());
    async function getPatients() {
      const { payload } = await dispatch(fetchAllPatients(clinic.id));
      const { data } = await CLIENT.get(
        `${BASE_URL}/api/appointments/${clinic.id}`
      );
      setPatients(payload as Patient[]);
      const convertedDatabaseData = data?.map((item: Appointments) => ({
        ...item,
        start: item.start ? new Date(item.start) : undefined,
        end: item.end ? new Date(item.end) : undefined,
        title: item.patient.title,
      }));
      setEvents(convertedDatabaseData);
    }
    getPatients();
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const onEventResize: withDragAndDropProps["onEventResize"] = (data) => {
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
      updatedEvents?.forEach((event) => {
        if (event.id === (data.event as Patient).id) {
          updateAppointment(event);
        }
      });
      return updatedEvents;
    });
  };

  const updateAppointment = async (event: Appointments) => {
    await CLIENT.put(
      `${BASE_URL}/api/appointments/update-appointment/${event.id}`,
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
        return event;
      });
      updatedEvents?.forEach((event) => {
        if (event.id === (data.event as Patient).id) {
          updateAppointment(event);
        }
      });
      return updatedEvents;
    });
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
    await CLIENT.delete(
      `${BASE_URL}/api/appointments/delete-appointment/${appointmentId}`
    );
    const newEventsArray = events?.filter((event) => {
      if (event.id !== appointmentId) {
        return event;
      }
    });
    setEvents(newEventsArray);
    setOpen(false);
  };

  const handleSelectSlot = useCallback(
    (slotInfo: SlotInfo) => {
      setMakeAppointment(true);
      setAppointmentTime(slotInfo);
    },
    [setEvents]
  );

  const schedulePatient = async (patient: Patient) => {
    const { data } = await CLIENT.post(
      `${BASE_URL}/api/appointments/create-appointment/${patient.id}`,
      {
        start: appointmentTime?.start,
        end: appointmentTime?.end,
        clinicId: clinic.id,
      }
    );
    const newEvent = {
      id: data.id,
      clinicId: patient.clinicId,
      patientId: patient.id,
      title: patient.title,
      start: appointmentTime?.start,
      end: appointmentTime?.end,
      patient: { id: patient.id, title: patient.title },
    };
    setEvents((prev) => [...prev, newEvent]);
    setScheduled({ clicked: true, id: patient.id });
    setTimeout(() => {
      setScheduled({ clicked: false, id: -1 });
      setMakeAppointment(false);
    }, 1800);
  };

  const cancelMakeAppointment = () => {
    setMakeAppointment(false);
  };

  return (
    <div>
      <div>
        <p className='text-xl tracking-widest font-bold uppercase'>
          {clinicName} <span className='text-green-500'>Dashboard</span>{" "}
        </p>

        <DnDCalendar
          dayLayoutAlgorithm='no-overlap'
          onSelectSlot={handleSelectSlot}
          onSelectEvent={clickEvent}
          defaultView='week'
          events={events}
          localizer={localizer}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          resizable
          selectable
          style={{ height: "100%" }}
        />
      </div>
      <div>
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
        <Dialog
          open={makeAppointment}
          onClose={cancelMakeAppointment}
          PaperComponent={PaperComponent}
          aria-labelledby='draggable-dialog-title'
          fullWidth={true}
        >
          <DialogTitle
            style={{ cursor: "move", color: "red" }}
            id='draggable-dialog-title'
          >
            Schedule An Appointment
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
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
              <div>
                <div>
                  {patients?.map((patient, index) => (
                    <div
                      key={patient?.id}
                      className='bg-gradient-to-tr from-green-100 via-green-200 to-green-300 mt-4 m-3 p-7 rounded-lg shadow-lg shadow-green-300'
                    >
                      <div className='flex justify-between'>
                        <h1 className='text-lg'>{patient?.title}</h1>
                        {scheduled.id === patient.id ? (
                          <Alert severity='success'>Scheduled</Alert>
                        ) : (
                          <Button
                            onClick={() => schedulePatient(patient)}
                            className='text-sm rounded-lg p-2 bg-[#313586cd] text-white duration-300 hover:scale-110'
                          >
                            Schedule
                          </Button>
                        )}
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
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={cancelMakeAppointment}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
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
