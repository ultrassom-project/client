import React from 'react';
import { NextPage } from 'next';
import { TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { ReconstructionOutput } from '../../../../models/reconstruction-output';
import ReconstructionImage from '../image';

interface ReconstructionsRowProps {
    reconstruction: ReconstructionOutput;
}

const ReconstructionsRow: NextPage<ReconstructionsRowProps> = (props) => {
    const { reconstruction } = props;

    return (
        <TableRow>
            <TableCell>
                <ReconstructionImage outputImageArray={reconstruction.outputImageArray} />
            </TableCell>{' '}
            {/* TODO */}
            <TableCell>{reconstruction.input.userId}</TableCell>
            <TableCell>{reconstruction.input.algorithm}</TableCell>
            <TableCell>{reconstruction.input.signalGain}</TableCell>
            <TableCell>{reconstruction.iterations}</TableCell>
            <TableCell>
                <Tooltip title={new Date(reconstruction.startTime).toISOString()}>
                    <Typography>{new Date(reconstruction.startTime).toLocaleDateString('en-US')}</Typography>
                </Tooltip>
            </TableCell>
            <TableCell>
                <Tooltip title={new Date(reconstruction.endTime).toISOString()}>
                    <Typography>{new Date(reconstruction.endTime).toLocaleDateString('en-US')}</Typography>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
};

export default ReconstructionsRow;
