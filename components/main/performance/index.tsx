import React, { useCallback, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Paper } from '@mui/material';
import { getPerformanceReport, getReconstructionsReport } from '../../../services/processing-service';
import PerformanceToolbar from './toolbar';
import CpuChart from './cpu-chart';
import MemoryChart from './memory-chart';
import { PerformanceSnapshot } from '../../../models/performance-snapshot';
import ReconstructionsChart from './reconstructions-chart';

interface PerformanceProps {}

const Performance: NextPage<PerformanceProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [performanceSnapshot, setPerformanceSnapshot] = useState<PerformanceSnapshot[]>([]);

    const reloadReconstructions = useCallback(async () => {
        try {
            setLoading(true);
            // setPerformanceSnapshot([]);

            const loadedSnapshots = await getPerformanceReport({
                startDate: new Date(),
                endDate: new Date(),
            });

            setPerformanceSnapshot(loadedSnapshots);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, []);

    // useEffect(() => {
    //     reloadReconstructions();
    // }, [reloadReconstructions]);

    return (
        <Paper sx={{ p: 2, paddingBottom: 4 }}>
            <PerformanceToolbar
                loading={loading}
                startDate={new Date()}
                endDate={new Date()}
                onReloadButtonClick={reloadReconstructions}
                onStartDateButtonClick={(a) => {}}
                onEndDateButtonClick={(a) => {}}
            />
            <ReconstructionsChart
                data={{
                    labels: performanceSnapshot.map((snap) => new Date(snap.date).toLocaleTimeString()),
                    datasets: [
                        {
                            data: performanceSnapshot.map((snap) => snap.reconstructionsInProgress),
                            borderColor: '#792EEB',
                            label: 'In progress',
                        },
                        {
                            data: performanceSnapshot.map((snap) => snap.reconstructionsInQueue),
                            borderColor: '#999900',
                            label: 'Queue',
                        },
                        {
                            data: performanceSnapshot.map((snap) => snap.finishedReconstructions),
                            borderColor: '#008000',
                            label: 'Finished',
                        },
                    ],
                }}
            />
            <CpuChart
                data={{
                    labels: performanceSnapshot.map((snap) => new Date(snap.date).toLocaleTimeString()),
                    datasets: [
                        {
                            data: performanceSnapshot.map((snap) => snap.cpu),
                        },
                    ],
                }}
            />
            <MemoryChart
                data={{
                    labels: performanceSnapshot.map((snap) => new Date(snap.date).toLocaleTimeString()),
                    datasets: [
                        {
                            data: performanceSnapshot.map((snap) => snap.memory),
                        },
                    ],
                }}
            />
        </Paper>
    );
};

export default Performance;
