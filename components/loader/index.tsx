import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { style } from './style';

interface LoaderProps {
    isPage?: boolean;
}

const Loader: React.FC<LoaderProps> = (props) => {
    const { isPage } = props;

    return (
        <Box sx={isPage === true ? style.pageBox : style.componentBox}>
            <CircularProgress />
        </Box>
    );
};

export default Loader;
