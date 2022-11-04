import React from 'react';
import { Box, Toolbar, Typography, Modal } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Send, Shuffle } from '@mui/icons-material';

interface SubmitToolbarProps {
    loading: boolean;
    onSubmitionButtonClick: () => void;
    onRandomSumbitButtonClick: () => void;
}

const SubmitToolbar: React.FC<SubmitToolbarProps> = ({
  loading,
  onSubmitionButtonClick,
  onRandomSumbitButtonClick
}) => {
    return (
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
            <Typography variant="h6" sx={{ flex: '1 1 10%' }}>
                Submit
            </Typography>

            <Box sx={{ paddingRight: 2 }}>
                <LoadingButton
                    color="primary"
                    variant="outlined"
                    onClick={onSubmitionButtonClick}
                    loading={loading}
                    loadingPosition="end"
                    endIcon={<Send />}
                >
                    {loading ? 'Loading' : 'Submit'}
                </LoadingButton>
            </Box>
            <Box sx={{ paddingRight: 2 }}>
                <LoadingButton
                    color="primary"
                    variant="outlined"
                    onClick={onRandomSumbitButtonClick}
                    loading={loading}
                    loadingPosition="end"
                    endIcon={<Shuffle />}
                >
                    {loading ? 'Loading' : 'Random Submit'}
                </LoadingButton>
            </Box>
        </Toolbar>
    );
};

export default SubmitToolbar;
