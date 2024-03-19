import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

const HistoryChart = ({ color, data, name }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    if (data) {
      console.log("data is: " + name + " " + JSON.stringify(data));
      const chartDataTemp = {
        labels: data[0].map((e) => e.date),
        datasets: [
          {
            label: name[0],
            data: data[0].map((e) => e.value),
            fill: false,
            borderColor: color,
            tension: 0.4,
          },
          {
            label: name.length > 1 ? name[1] : null,
            data: data.length > 1 ? data[1].map((e) => e.value) : null,
            fill: false,
            borderColor: 0xffffff - color,
            tension: 0.4,
          },
        ],
      };
      const options = {
        maintainAspectRatio: false,
        responsive: true,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            display: false,
            labels: {
              color: color,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };

      setChartData(chartDataTemp);
      setChartOptions(options);
    }
  }, [data]);

  return (
    <div className="card">
      {console.log("chartData is: " + JSON.stringify(chartData))}
      <Chart
        type="line"
        className="chart"
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
};

export default HistoryChart;
