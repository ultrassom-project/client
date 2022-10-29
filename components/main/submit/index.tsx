import React, { useCallback, useState } from 'react';
import { NextPage } from 'next';
import { Paper } from '@mui/material';
import SubmitToolbar from './toolbar';
import SubmitTable from './table';
import { ReconstructionInput } from '../../../models/reconstruction-input';
import { ReconstructionAlgorithmType } from '../../../models/reconstruction-algorithm-type';
import { ReconstructionDimension } from '../../../models/reconstruction-dimension';

interface SubmitProps {}

const Submit: React.FC<SubmitProps> = ({}) => {
    const [loading, setLoading] = useState(false);
    const [submitions, setSubmitions] = useState<ReconstructionInput[]>([]);

    const handleSubmitionButtonClick = useCallback(async () => {
        setLoading(true);
        console.log('here');

        await new Promise(res => setTimeout(() => res(null), 2000));

        setSubmitions([{
            algorithm: ReconstructionAlgorithmType.CGNE,
            dimension: ReconstructionDimension['30x30'],
            signalGain: 1,
            signalVector: [0, 0, 0],
            userId: 'TESTE'
        }])

        setLoading(false);
    }, []);

    return (
      <Paper sx={{ p: 2, paddingBottom: 4 }}>
            <SubmitToolbar
                onSubmitionButtonClick={handleSubmitionButtonClick}
                loading={false}
            />
            <SubmitTable loading={loading} submitions={submitions}/>
      </Paper>
    );
};

export default Submit;