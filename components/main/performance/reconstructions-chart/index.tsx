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

interface ReconstructionsChartProps {
    data: {
        labels: string[];
        datasets: { data: number[]; borderColor: string; label: string }[];
    };
}

const ReconstructionsChart: NextPage<ReconstructionsChartProps> = (props) => {
    const { data } = props;

    return (
        <Line
            data={data}
            height={80}
            options={{
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        text: 'Reconstructions',
                        display: true,
                    },
                    filler: {
                        drawTime: 'beforeDatasetDraw',
                    },
                },
                elements: {
                    line: {
                        tension: 0,
                        borderWidth: 1,
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

export default ReconstructionsChart;
