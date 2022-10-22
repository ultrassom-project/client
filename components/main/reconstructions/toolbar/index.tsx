import React from 'react';
import { NextPage } from 'next';
import { Box, Toolbar, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Sync } from '@mui/icons-material';

interface ReconstructionsToolbarProps {
    reconstructionsCount: number;
    loading: boolean;
    onReloadButtonClick: () => Promise<void>;
}

const ReconstructionsToolbar: NextPage<ReconstructionsToolbarProps> = (props) => {
    const { reconstructionsCount, loading, onReloadButtonClick } = props;

    return (
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
            <Typography variant="h6" sx={{ flex: '1 1 100%' }}>
                Reconstructions {loading ? '' : `(${reconstructionsCount})`}
            </Typography>
            <Box sx={{ paddingRight: 2 }}>
                <LoadingButton
                    color="primary"
                    variant="outlined"
                    onClick={onReloadButtonClick}
                    loading={loading}
                    loadingPosition="end"
                    endIcon={<Sync />}
                >
                    {loading ? 'Loading' : 'Reload'}
                </LoadingButton>
            </Box>
        </Toolbar>
    );
};

export default ReconstructionsToolbar;
