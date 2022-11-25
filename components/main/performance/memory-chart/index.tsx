import React from 'react';
import { NextPage } from 'next';
import {
    Chart as ChartJS,
    CategoryScale,
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, TimeScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

import { Line } from 'react-chartjs-2';

interface MemoryChartProps {
    data: {
        labels: string[];
        datasets: { data: number[] }[];
    };
}

const MemoryChart: NextPage<MemoryChartProps> = (props) => {
    const { data } = props;

    return (
        <Line
            title="memory"
            data={data}
            height={80}
            options={{
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        text: 'Memory Usage (mb)',
                        display: true,
                    },
                },
                elements: {
                    line: {
                        tension: 0,
                        borderWidth: 1,
                        borderColor: '#792EEB',
                        fill: 'start',
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

export default MemoryChart;
