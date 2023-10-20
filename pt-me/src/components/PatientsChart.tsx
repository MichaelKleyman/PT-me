import { useState } from "react";
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
      text: "Patients Chart",
    },
    legend: false,
  },
  scales: {
    x: {
      //   grid: {
      display: false,
      //   },
    },
    y: {
      min: 2,
      max: 10,
    },
  },
  responsive: true,
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Patients",
      data: labels.map(() => 8),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export default function PatientsChart() {
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
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}
