import React, { useCallback, useState } from 'react';
import { NextPage } from 'next';
import { Paper } from '@mui/material';
import SubmitToolbar from './toolbar';
import SubmitTable from './table';
import { ReconstructionInput } from '../../../models/reconstruction-input';
import { ReconstructionAlgorithmType } from '../../../models/reconstruction-algorithm-type';
import { ReconstructionDimension } from '../../../models/reconstruction-dimension';
import { enqueueReconstruction } from '../../../services/processing-service';
import SubmitModal from './submit-modal';
import { useReconstructions } from '../../../hooks/reconstructions';
import { ReconstructionRandomInput } from '../../../models/reconstruction-random-input';
import RandomSubmitModal from './random-submit-modal';
import { randomIntFromInterval } from '../../../utils/random-number';
import { ReconstructionInputSignal } from '../../../models/reconstruction-input-signal';

interface SubmitProps {}

const Submit: React.FC<SubmitProps> = ({}) => {
    const [loading, setLoading] = useState(false);
    const [submitModalOpen, setSubmitModalOpen] = useState(false);
    const [randomSubmitModalOpen, setRandomSubmitModalOpen] = useState(false);
    
    const { 
        reconstructionsInputs, 
        setReconstructionsInputs,
        setRandomSubmitTimeInterval,
        setRunningRandomSubmit
    } = useReconstructions();

    const handleSubmitData = useCallback(async (data: ReconstructionInput) => {
        await enqueueReconstruction(data);

        setReconstructionsInputs([data, ...reconstructionsInputs]);
    }, [reconstructionsInputs, setReconstructionsInputs]);

    const generateRandomReconstructionInput = useCallback((
        userId: string, 
        inputSignals: ReconstructionInputSignal[]
    ): ReconstructionInput => {
        const algorithm = [ReconstructionAlgorithmType.CGNE, ReconstructionAlgorithmType.CGNR][
            randomIntFromInterval(0, 1)
        ];
        const signalGain = randomIntFromInterval(1, 10);
        const inputSignal = inputSignals[randomIntFromInterval(0, inputSignals.length-1)];

        return {
            userId,
            algorithm,
            signalGain,
            dimension: inputSignal.dimension,
            signalVector: inputSignal.signalVector,
        }
    }, []);

    const handleRandomSubmitData = useCallback(
        async (data: ReconstructionRandomInput) => {
            const delay = (timeInterval: number) => new Promise(res => setTimeout(() => res({}), timeInterval));
            let done = false;

            setRandomSubmitTimeInterval(data.timeInterval);
            setRunningRandomSubmit(true);
            
            setTimeout(() => {
                done = true;
                setRunningRandomSubmit(false);
            }, data.timeInterval * 1000);

            let previousInputs = [...reconstructionsInputs];
            while (!done) {
                const randomReconstructionInput = generateRandomReconstructionInput(data.userId, data.inputSignals);
                previousInputs = [randomReconstructionInput, ...previousInputs]

                await enqueueReconstruction(randomReconstructionInput);
                setReconstructionsInputs(previousInputs);

                await delay(randomIntFromInterval(0, data.timeInterval * 1000));
            }
        },
        [
            generateRandomReconstructionInput, 
            reconstructionsInputs, 
            setReconstructionsInputs,
            setRandomSubmitTimeInterval,
            setRunningRandomSubmit
        ]
    );

    return (
      <Paper sx={{ p: 2, paddingBottom: 4 }}>
            <SubmitToolbar
                onSubmitionButtonClick={() => setSubmitModalOpen(true)}
                onRandomSumbitButtonClick={() => setRandomSubmitModalOpen(true)}
                loading={false}
            />
            <SubmitTable loading={loading} submitions={reconstructionsInputs}/>

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