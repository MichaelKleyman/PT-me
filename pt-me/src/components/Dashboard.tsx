import { FC, useState } from "react";
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

interface DashboardProps {
  clinicName: string;
}

console.log(patients);

const Dashboard: FC<DashboardProps> = ({ clinicName }) => {
  const [events, setEvents] = useState<Patient[]>(patients);

  const onEventResize: withDragAndDropProps["onEventResize"] = (data) => {
    console.log(data);

    setEvents((currentEvents) => {
      const updatedEvents = currentEvents.map((event) => {
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
      const updatedEvents = currentEvents.map((event) => {
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
    <div>
      <p className='text-xl tracking-widest font-bold uppercase'>
        {clinicName} <span className='text-green-500'>Dashboard</span>{" "}
      </p>
      <div className='mt-[2rem]'>
        <DnDCalendar
          onSelectEvent={clickEvent}
          defaultView='week'
          events={events}
          localizer={localizer}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          resizable
          style={{ height: "100vh" }}
        />
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
