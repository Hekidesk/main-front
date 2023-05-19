
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

const HistoryChart = ({color}) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['01/02/2022', '01/02/2022', '01/02/2022', '01/02/2022', '01/02/2022', '01/02/2022', '01/02/2022'],
            datasets: [
                {
                    label: 'Second Dataset',
                    data: [28, 48, 43, 58, 46, 89],
                    fill: false,
                    borderColor: color,
                    tension: 0.4
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            responsive:true,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        color: color
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card">
            <Chart type="line" className="chart" data={chartData} options={chartOptions} />
        </div>
    )
}
        
export default HistoryChart;