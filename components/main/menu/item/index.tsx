import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';

interface MainMenuItemProps {
    name: string;
    selected: boolean;
    maintenance?: boolean;
    icon: JSX.Element;
    onClick: () => void;
}

const MainMenuItem: React.FC<MainMenuItemProps> = (props) => {
    const { name, selected, maintenance, icon, onClick } = props;

    return (
        <ListItem key={name} disablePadding>
            <ListItemButton onClick={onClick} selected={selected} disabled={maintenance === true}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={name} />
            </ListItemButton>
        </ListItem>
    );
};

export default MainMenuItem;
