import React from 'react';
import { NextPage } from 'next';
import { Avatar, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { ReconstructionOutput } from '../../../../models/reconstruction-output';
import ReconstructionImage from '../image';
import { Person, PersonRounded, VerifiedUser } from '@mui/icons-material';

interface ReconstructionsRowProps {
    reconstruction: ReconstructionOutput;
}

const ReconstructionsRow: NextPage<ReconstructionsRowProps> = (props) => {
    const { reconstruction } = props;

    const startDate = new Date(reconstruction.startTime);
    const endDate = new Date(reconstruction.endTime);
    const duration = Math.abs(startDate.getTime() - endDate.getTime()) / 1000;

    return (
        <TableRow>
            <TableCell>
                <ReconstructionImage outputImageArray={reconstruction.outputImageArray} size={300} />
            </TableCell>
            <TableCell>
                {reconstruction.input.dimension} x {reconstruction.input.dimension}
            </TableCell>
            <TableCell>{reconstruction.input.algorithm}</TableCell>
            <TableCell>{reconstruction.input.signalGain}</TableCell>
            <TableCell>{reconstruction.iterations}</TableCell>
            <TableCell>{duration} s</TableCell>
            <TableCell>
                <Tooltip title={reconstruction.input.userId}>
                    <PersonRounded />
                </Tooltip>
            </TableCell>
        </TableRow>
    );
};

export default ReconstructionsRow;
