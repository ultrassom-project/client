import React, { useCallback, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Paper } from '@mui/material';
import { ReconstructionOutput } from '../../../models/reconstruction-output';
import { getReconstructionsReport } from '../../../services/processing-service';
import ReconstructionsToolbar from './toolbar';
import ReconstructionsTable from './table';
import { useReconstructions } from '../../../hooks/reconstructions';

interface ReconstructionsProps {}

const Reconstructions: NextPage<ReconstructionsProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(false);
    
    const { reconstructionsOutputs, setReconstructionsOutputs } = useReconstructions();

    const reloadReconstructions = useCallback(async () => {
        try {
            setLoading(true);
            setReconstructionsOutputs([]);

            const loadedReconstructions = await getReconstructionsReport();
            loadedReconstructions.reverse();

            setReconstructionsOutputs(loadedReconstructions);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, [setReconstructionsOutputs]);

    // useEffect(() => {
    //     reloadReconstructions();
    // }, [reloadReconstructions]);

    return (
        <Paper sx={{ p: 2, paddingBottom: 4 }}>
            <ReconstructionsToolbar
                reconstructionsCount={reconstructionsOutputs.length}
                loading={loading}
                onReloadButtonClick={reloadReconstructions}
            />
            <ReconstructionsTable reconstructions={reconstructionsOutputs} loading={loading} />
        </Paper>
    );
};

export default Reconstructions;
