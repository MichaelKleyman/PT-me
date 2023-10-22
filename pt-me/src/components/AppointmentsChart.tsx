/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { CLIENT, BASE_URL } from "./api";
import { Appointment } from "../../types";
import { BsCalendarWeek } from "react-icons/bs";
import { AiOutlineCaretDown } from "react-icons/ai";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Appointments",

      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

interface Props {
  clinicId: string;
}

export default function AppointmentsChart({ clinicId }: Props) {
  const [filter, setFilter] = useState<string>("Current Week");
  const [appointmentQuantity, setQuantity] = useState<number>(10);
  const [data, setData] = useState({
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: "transparent",
        borderColor: "blue",
        pointBorderColor: "white",
        pointBorderWidth: 4,
        tension: 0.5,
      },
    ],
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleFilter = (selected: string) => {
    setFilter(selected);
    setAnchorEl(null);
  };

  useEffect(() => {
    if (clinicId) {
      const getAppointments = async () => {
        const { data } = await CLIENT.get(
          `${BASE_URL}/api/appointments/filter-appointments/${filter}/${clinicId}`
        );
        const sortedData = data.sort(
          (a: Appointment, b: Appointment) =>
            new Date(a.start as Date).getTime() -
            new Date(b.start as Date).getTime()
        );

        // Extract dates and count of appointments for each date
        const appointmentData = sortedData.reduce(
          (acc: any, appointment: Appointment) => {
            const startDate = new Date(appointment.start as Date);
            const dateKey = startDate.toDateString();

            if (!acc[dateKey]) {
              acc[dateKey] = 0;
            }

            acc[dateKey]++;

            return acc;
          },
          {}
        );
        let max = 0;
        Object.values(appointmentData).forEach((quantity) => {
          if ((quantity as number) > max) {
            max = quantity as number;
          }
        });
        setQuantity(max + 3);
        // Get an array of unique dates and their counts
        const uniqueDates = Object.keys(appointmentData);
        const appointmentCounts = uniqueDates.map(
          (date) => appointmentData[date]
        );

        setData((prevData) => ({
          ...prevData,
          labels: uniqueDates,
          datasets: [
            {
              ...prevData.datasets[0],
              data: appointmentCounts,
            },
          ],
        }));
      };
      getAppointments();
    }
  }, [filter, clinicId]);

  const options: any = {
    plugins: {
      title: {
        display: true,
        text: "Appointments Chart",
      },
      legend: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: appointmentQuantity, // Adjust the max value as needed
      },
    },
    responsive: true,
  };

  return (
    <div>
      <div className='flex items-center justify-between'>
        <button
          onClick={handleClick}
          className='hover:scale-110 duration-300 hover:text-blue-700'
        >
          <p className='flex items-center gap-3 text-[13px]'>
            <BsCalendarWeek />
            {filter}
            <AiOutlineCaretDown />
          </p>
        </button>
        <Menu
          id='fade-menu'
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={() => handleFilter("Current Week")}>
            Current Week
          </MenuItem>
          <MenuItem onClick={() => handleFilter("Last 30 Days")}>
            Last 30 Days
          </MenuItem>
          <MenuItem onClick={() => handleFilter("Last 3 Months")}>
            Last 3 Months
          </MenuItem>
        </Menu>
      </div>
      <Line options={options} data={data} />
    </div>
  );
}
