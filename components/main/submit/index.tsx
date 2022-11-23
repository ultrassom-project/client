import React, { useCallback, useState } from 'react';
import { NextPage } from 'next';
import { Paper } from '@mui/material';
import SubmitToolbar from './toolbar';
import SubmitTable from './table';
import { ReconstructionAlgorithmType } from '../../../models/reconstruction-algorithm-type';
import { enqueueReconstruction } from '../../../services/processing-service';
import SubmitModal from './submit-modal';
import { useReconstructions } from '../../../hooks/reconstructions';
import { ReconstructionRandomInput } from '../../../models/reconstruction-random-input';
import RandomSubmitModal from './random-submit-modal';
import { randomIntFromInterval } from '../../../utils/random-number';
import { ReconstructionInputSignal } from '../../../models/reconstruction-input-signal';
import { applySignalGain } from '../../../utils/signal-gain';
import { ReconstructionSubmition } from '../../../models/reconstruction-submition';

interface SubmitProps {}

const Submit: React.FC<SubmitProps> = ({}) => {
    const [loading, setLoading] = useState(false);
    const [submitModalOpen, setSubmitModalOpen] = useState(false);
    const [randomSubmitModalOpen, setRandomSubmitModalOpen] = useState(false);

    const {
        reconstructionsSubmitions,
        setReconstructionsSubmitions,
        setRandomSubmitTimeInterval,
        setRunningRandomSubmit,
    } = useReconstructions();

    const handleSubmitData = useCallback(
        async (data: ReconstructionSubmition) => {
            await enqueueReconstruction({
                userId: data.userId,
                algorithm: data.algorithm,
                dimension: data.dimension,
                signalVector: data.signalVector,
            });

            setReconstructionsSubmitions([data, ...reconstructionsSubmitions]);
        },
        [reconstructionsSubmitions, setReconstructionsSubmitions]
    );

    const generateRandomReconstructionSubmition = useCallback(
        (userId: string, inputSignals: ReconstructionInputSignal[]): ReconstructionSubmition => {
            const algorithm = [ReconstructionAlgorithmType.CGNE, ReconstructionAlgorithmType.CGNR][
                randomIntFromInterval(0, 1)
            ];

            const signalGain = randomIntFromInterval(0, 1) === 0;

            let inputSignal = inputSignals[randomIntFromInterval(0, inputSignals.length - 1)];

            if (signalGain) {
                applySignalGain(inputSignal.signalVector, inputSignal.dimension);
            }

            return {
                userId,
                algorithm,
                dimension: inputSignal.dimension,
                signalGain,
                signalVector: inputSignal.signalVector,
            };
        },
        []
    );

    const handleRandomSubmitData = useCallback(
        async (data: ReconstructionRandomInput) => {
            const delay = (timeInterval: number) => new Promise((res) => setTimeout(() => res({}), timeInterval));
            let done = false;

            setRandomSubmitTimeInterval(data.timeInterval);
            setRunningRandomSubmit(true);

            setTimeout(() => {
                done = true;
                setRunningRandomSubmit(false);
            }, data.timeInterval * 1000);

            let previousSubmitions = [...reconstructionsSubmitions];
            while (!done) {
                const randomReconstructionSubmition = generateRandomReconstructionSubmition(
                    data.userId,
                    data.inputSignals
                );
                previousSubmitions = [randomReconstructionSubmition, ...previousSubmitions];

                await enqueueReconstruction({
                    userId: randomReconstructionSubmition.userId,
                    algorithm: randomReconstructionSubmition.algorithm,
                    dimension: randomReconstructionSubmition.dimension,
                    signalVector: randomReconstructionSubmition.signalVector,
                });
                setReconstructionsSubmitions(previousSubmitions);

                await delay(randomIntFromInterval(0, 2000));
            }
        },
        [
            generateRandomReconstructionSubmition,
            reconstructionsSubmitions,
            setReconstructionsSubmitions,
            setRandomSubmitTimeInterval,
            setRunningRandomSubmit,
        ]
    );

    return (
        <Paper sx={{ p: 2, paddingBottom: 4 }}>
            <SubmitToolbar
                onSubmitionButtonClick={() => setSubmitModalOpen(true)}
                onRandomSumbitButtonClick={() => setRandomSubmitModalOpen(true)}
                loading={false}
            />
            <SubmitTable loading={loading} submitions={reconstructionsSubmitions} />

            <SubmitModal
                isOpen={submitModalOpen}
                onClose={() => setSubmitModalOpen(false)}
                onSubmit={handleSubmitData}
            />

            <RandomSubmitModal
                isOpen={randomSubmitModalOpen}
                onClose={() => setRandomSubmitModalOpen(false)}
                onRandomSubmit={handleRandomSubmitData}
            />
        </Paper>
    );
};

export default Submit;
