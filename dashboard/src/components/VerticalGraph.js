import React from "react";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function VerticalGraph({ data }) {
  const values = data?.datasets?.[0]?.data ?? [];
  const labels = data?.labels ?? [];

  // Green for profit/positive, red for loss/negative
  const bgColors  = values.map((v) => v >= 0 ? "rgba(45,106,79,0.75)"  : "rgba(192,57,43,0.75)");
  const brdColors = values.map((v) => v >= 0 ? "rgba(45,106,79,1)"     : "rgba(192,57,43,1)");

  const chartData = {
    labels,
    datasets: [{
      label: data?.datasets?.[0]?.label ?? "Value",
      data: values,
      backgroundColor: bgColors,
      borderColor: brdColors,
      borderWidth: 1,
      borderRadius: 5,
      borderSkipped: false,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title:  { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const v = ctx.parsed.y;
            return ` ₹${Number(v).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: { size: 10, family: "DM Sans, sans-serif" },
          color: "#6B7C74",
          maxRotation: 45,
          minRotation: 30,
        },
        grid: { display: false },
      },
      y: {
        ticks: {
          font: { size: 10, family: "DM Mono, monospace" },
          color: "#6B7C74",
          callback: (v) => {
            if (Math.abs(v) >= 1000) return "₹" + (v / 1000).toFixed(1) + "k";
            return "₹" + v;
          },
        },
        grid: { color: "rgba(0,0,0,0.06)" },
      },
    },
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "260px" }}>
      <Bar options={options} data={chartData} />
    </div>
  );
}

export default VerticalGraph;