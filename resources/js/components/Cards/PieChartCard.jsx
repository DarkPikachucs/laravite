import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function PieChartCard({ title, data, labels, colors = [] }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const defaultColors = [
    "rgb(59, 130, 246)",
    "rgb(168, 85, 247)",
    "rgb(236, 72, 153)",
    "rgb(249, 115, 22)",
    "rgb(34, 197, 94)",
    "rgb(239, 68, 68)",
    "rgb(14, 165, 233)",
    "rgb(139, 92, 246)",
  ];

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: colors.length > 0 ? colors : defaultColors,
            borderWidth: 2,
            borderColor: "rgb(255, 255, 255)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 15,
              font: {
                size: 12,
              },
              usePointStyle: true,
              pointStyle: "circle",
            },
          },
          tooltip: {
            backgroundColor: "rgb(255, 255, 255)",
            titleColor: "rgb(55, 65, 81)",
            bodyColor: "rgb(55, 65, 81)",
            borderColor: "rgb(229, 231, 235)",
            borderWidth: 1,
            padding: 10,
            displayColors: true,
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.parsed || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                return `${label}: ${value} (${percentage}%)`;
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, labels, colors]);

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl border border-gray-100">
      <div className="px-4 py-3 flex flex-wrap items-center">
        <div className="relative w-full">
          <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
        </div>
      </div>
      <div className="flex-auto px-4 pb-4" style={{ height: "300px" }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}
