import React from "react";
import MetricItem from "./MetricItem";
import { ChartRoot, MetricChartRoot, MetricRoot } from "./style";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
    },
  },
};
function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const labels = [
  "1/9",
  "2/9",
  "3/9",
  "5/9",
  "6/9",
  "7/9",
  "10/9",
  "11/9",
  "12/9",
  "13/9",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Impression",
      data: labels.map(() => randomIntFromInterval(20, 1000)),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const MetricChart = () => {
  return (
    <MetricChartRoot>
      <MetricRoot>
        <MetricItem title="Impressions" value={"28"} percent={5.28} />
        <MetricItem title="Clicks" value={"14"} percent={0} />
        <MetricItem title="Conversion Rate" value={"50%"} percent={-3.5} />
      </MetricRoot>

      <ChartRoot>
        <p className="title">Widget Performance</p>
        <Bar options={options} data={data} />
      </ChartRoot>
    </MetricChartRoot>
  );
};

export default MetricChart;
