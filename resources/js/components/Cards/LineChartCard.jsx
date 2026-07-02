import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function LineChartCard({ title, data, labels, color = "blue" }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const colorConfig = {
    blue: {
      border: "rgb(59, 130, 246)",
      background: "rgba(59, 130, 246, 0.1)",
    },
    green: {
      border: "rgb(34, 197, 94)",
      background: "rgba(34, 197, 94, 0.1)",
    },
    purple: {
      border: "rgb(168, 85, 247)",
      background: "rgba(168, 85, 247, 0.1)",
    },
    red: {
      border: "rgb(239, 68, 68)",
      background: "rgba(239, 68, 68, 0.1)",
    },
  };

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    const colors = colorConfig[color] || colorConfig.blue;

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: title,
            data: data,
            borderColor: colors.border,
            backgroundColor: colors.background,
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: colors.border,
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgb(255, 255, 255)",
            titleColor: "rgb(55, 65, 81)",
            bodyColor: "rgb(55, 65, 81)",
            borderColor: "rgb(229, 231, 235)",
            borderWidth: 1,
            padding: 10,
            displayColors: false,
            callbacks: {
              label: function (context) {
                return context.parsed.y + " รายการ";
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "rgb(156, 163, 175)",
              font: {
                size: 11,
              },
            },
          },
          y: {
            grid: {
              color: "rgb(243, 244, 246)",
              borderDash: [5, 5],
            },
            ticks: {
              color: "rgb(156, 163, 175)",
              font: {
                size: 11,
              },
              precision: 0,
            },
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, labels, color]);

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
