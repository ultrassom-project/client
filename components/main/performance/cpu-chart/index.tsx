import React from 'react';
import { NextPage } from 'next';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

import { Bar, Line, Scatter, Bubble } from 'react-chartjs-2';

interface CpuChartProps {
    data: {
        labels: string[];
        datasets: { data: number[] }[];
    };
}

const CpuChart: NextPage<CpuChartProps> = (props) => {
    const { data } = props;

    return (
        <Line
            data={data}
            height={80}
            options={{
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        text: 'CPU Usage (%)',
                        display: true,
                    },
                },
                elements: {
                    line: {
                        tension: 0,
                        borderWidth: 1,
                        borderColor: '#792EEB',
                        fill: 'start',
                        // backgroundColor: '#111111',
                    },
                    point: {
                        radius: 0,
                        hitRadius: 0,
                    },
                },
                scales: {
                    xAxis: {
                        // display: false,
                    },
                },
            }}
        />
    );
};

export default CpuChart;
