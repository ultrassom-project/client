import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useReconstructions } from '../../../hooks/reconstructions';
import ProgressTopBar from '../../progressTopBar';

interface MainAppBarProps {}

const MainAppBar: React.FC<MainAppBarProps> = (props) => {
    const { runningRandomSubmit } = useReconstructions();

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: '#111111' }}>
            {runningRandomSubmit && <ProgressTopBar />}

            <Toolbar sx={{ pl: { sm: 1.5 }, pr: { sm: 1.5 } }}>
                <Typography variant="h5" noWrap component="div" sx={{ flex: '1 1 100%', paddingLeft: 1 }}>
                    Client
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default MainAppBar;
