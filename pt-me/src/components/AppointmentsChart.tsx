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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
      max: 30, // Adjust the max value as needed
    },
  },
  responsive: true,
};

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
      data: labels.map(() => 8),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

interface Props {
  clinicId: string;
}

export default function AppointmentsChart({ clinicId }: Props) {
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
        data: [8, 5, 9, 6, 7, 8, 9],
        backgroundColor: "transparent",
        borderColor: "blue",
        pointBorderColor: "white",
        pointBorderWidth: 4,
        tension: 0.5,
      },
    ],
  });

  useEffect(() => {
    if (clinicId) {
      const getAppointments = async () => {
        const { data } = await CLIENT.get(
          `${BASE_URL}/api/appointments/${clinicId}`
        );

        const currentDate = new Date();

        // Filter data to show only appointments up to the current date
        const filteredData = data
          .sort(
            (a: Appointment, b: Appointment) =>
              new Date(a.start as Date).getTime() -
              new Date(b.start as Date).getTime()
          )
          .filter((appointment: Appointment) => {
            const startDate = new Date(appointment.start as Date);
            return startDate <= currentDate;
          });

        // Extract dates and count of appointments for each date
        const appointmentData = filteredData.reduce(
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

        console.log(appointmentData);

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
  }, []);

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}
