import React from 'react';
import { Box, Toolbar, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Send } from '@mui/icons-material';

interface SubmitToolbarProps {
    loading: boolean;
    onSubmitionButtonClick: () => Promise<void>;
}

const SubmitToolbar: React.FC<SubmitToolbarProps> = ({
  loading,
  onSubmitionButtonClick
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
        </Toolbar>
    );
};

export default SubmitToolbar;
