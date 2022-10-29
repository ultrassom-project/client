import React, { useCallback, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Paper } from '@mui/material';
import { ReconstructionOutput } from '../../../models/reconstruction-output';
import { getReconstructionsReport } from '../../../services/processing-service';
import ReconstructionsToolbar from './toolbar';
import ReconstructionsTable from './table';

interface ReconstructionsProps {}

const Reconstructions: NextPage<ReconstructionsProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [reconstructions, setReconstructions] = useState<ReconstructionOutput[]>([]);

    const reloadReconstructions = useCallback(async () => {
        try {
            setLoading(true);
            setReconstructions([]);

            const loadedReconstructions = await getReconstructionsReport();

            setReconstructions(loadedReconstructions);
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
            <ReconstructionsToolbar
                reconstructionsCount={reconstructions.length}
                loading={loading}
                onReloadButtonClick={reloadReconstructions}
            />
            <ReconstructionsTable reconstructions={reconstructions} loading={loading} />
        </Paper>
    );
};

export default Reconstructions;
