import { Box, CssBaseline, Toolbar } from '@mui/material';
import React from 'react';
import { NextPage } from 'next';
import MainAppBar from './app-bar';
import MainMenu from './menu';
import Reconstructions from './reconstructions';
import Performance from './performance';

const Main: NextPage = (props) => {
    const [selected, setSelected] = React.useState<string>('performance');

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <MainAppBar />
            <MainMenu selected={selected} setSelected={setSelected} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {selected === 'reconstructions' ? <Reconstructions /> : null}
                {selected === 'performance' ? <Performance /> : null}
            </Box>
        </Box>
    );
};

export default Main;
