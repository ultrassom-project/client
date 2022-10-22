import { Ballot, BarChart, Publish } from '@mui/icons-material';
import { Box, Drawer, List, Toolbar } from '@mui/material';
import React from 'react';
import MainMenuItem from './item';

const drawerWidth = 240;

interface MainMenuProps {
    selected: string;
    setSelected: (selected: string) => void;
}

const MainMenu: React.FC<MainMenuProps> = (props) => {
    const { selected, setSelected } = props;

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'clip', background: '#1F1D2B', height: '100vh' }}>
                <List>
                    <MainMenuItem
                        name={'Performance'}
                        selected={selected === 'performance'}
                        icon={<BarChart htmlColor="#FFFFFF" />}
                        onClick={() => setSelected('performance')}
                    />

                    <MainMenuItem
                        name={'Reconstructions'}
                        selected={selected === 'reconstructions'}
                        icon={<Ballot htmlColor="#FFFFFF" />}
                        onClick={() => setSelected('reconstructions')}
                    />

                    <MainMenuItem
                        name={'Submit'}
                        selected={selected === 'submit'}
                        icon={<Publish htmlColor="#FFFFFF" />}
                        onClick={() => setSelected('submit')}
                    />
                </List>
            </Box>
        </Drawer>
    );
};

export default MainMenu;
