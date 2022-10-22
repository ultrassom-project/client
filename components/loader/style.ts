import { SxProps } from '@mui/material';

type LoaderStyle = {
    componentBox: SxProps;
    pageBox: SxProps;
};

export const style: LoaderStyle = {
    componentBox: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageBox: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
};
