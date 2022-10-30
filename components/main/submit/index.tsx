import React, { useCallback, useState } from 'react';
import { NextPage } from 'next';
import { Paper } from '@mui/material';
import SubmitToolbar from './toolbar';
import SubmitTable from './table';
import { ReconstructionInput } from '../../../models/reconstruction-input';
import { ReconstructionAlgorithmType } from '../../../models/reconstruction-algorithm-type';
import { ReconstructionDimension } from '../../../models/reconstruction-dimension';
import { enqueueReconstruction } from '../../../services/processing-service';
import SubmitModal from './modal';
import { useReconstructions } from '../../../hooks/reconstructions';

interface SubmitProps {}

const Submit: React.FC<SubmitProps> = ({}) => {
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    
    const { reconstructionsInputs, setReconstructionsInputs } = useReconstructions();

    const handleSubmitData = useCallback(async (data: ReconstructionInput) => {
        await enqueueReconstruction(data);

        setReconstructionsInputs([data, ...reconstructionsInputs]);
    }, [reconstructionsInputs, setReconstructionsInputs]);

    return (
      <Paper sx={{ p: 2, paddingBottom: 4 }}>
            <SubmitToolbar
                onSubmitionButtonClick={() => setModalOpen(true)}
                loading={false}
            />
            <SubmitTable loading={loading} submitions={reconstructionsInputs}/>

            <SubmitModal 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)} 
                onSubmit={handleSubmitData} 
            />
      </Paper>
    );
};

export default Submit;