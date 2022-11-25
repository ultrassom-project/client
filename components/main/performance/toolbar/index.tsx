import React from 'react';
import { NextPage } from 'next';
import { Box, TextField, Toolbar, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Sync } from '@mui/icons-material';

interface PerformanceToolbarProps {
    loading: boolean;
    startDate: Date;
    endDate: Date;
    onReloadButtonClick: () => Promise<void>;
    onStartDateButtonClick: (date: Date) => Promise<void> | void;
    onEndDateButtonClick: (date: Date) => Promise<void> | void;
}

const PerformanceToolbar: NextPage<PerformanceToolbarProps> = (props) => {
    const { loading, startDate, endDate, onReloadButtonClick, onStartDateButtonClick, onEndDateButtonClick } = props;

    return (
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
            <Typography variant="h6" sx={{ flex: '1 1 10%' }}>
                Performance
            </Typography>

            {/* <Box sx={{ paddingRight: 2 }}>
                <TextField
                    disabled={loading}
                    label="Start Date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={startDate}
                    color="primary"
                    id="time"
                    type="datetime-local"
                    onChange={() => {}}
                />
            </Box>
            <Box sx={{ paddingRight: 2 }}>
                <TextField
                    disabled={loading}
                    label="End Date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={endDate}
                    color="primary"
                    id="time"
                    type="datetime-local"
                    onChange={() => {}}
                />
            </Box> */}
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

export default PerformanceToolbar;
