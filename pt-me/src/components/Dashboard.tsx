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
import patients from "@/components/Patients";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch } from "react-redux";
import { fetchAllPatients } from "@/Redux/Features/patients/patientSlice";
import { AppDispatch } from "@/Redux/store";
import { BsSearch } from "react-icons/bs";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

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
}

interface Payload {
  payload: Patient[];
}

interface DashboardProps {
  clinicName: string;
}

// console.log(patients);

const Dashboard: FC<DashboardProps> = ({ clinicName }) => {
  const [events, setEvents] = useState<Patient[]>();
  const [searchInput, setSearchInput] = useState<string>("");
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

  const onEventDrop: withDragAndDropProps["onEventDrop"] = (data) => {
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

  function clickEvent() {}

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
        <div className='w-full'>
          <div>
            {events?.map((patient) => (
              <div key={patient.id} className='p-2'>
                {patient.title}
              </div>
            ))}
          </div>
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
