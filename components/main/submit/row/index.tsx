import React from 'react';
import { TableCell, TableRow, Tooltip } from '@mui/material';
import { ReconstructionInput } from '../../../../models/reconstruction-input';
import { PersonRounded } from '@mui/icons-material';
import { ReconstructionSubmition } from '../../../../models/reconstruction-submition';

interface SubmitRowProps {
    submition: ReconstructionSubmition;
}

const SubmitRow: React.FC<SubmitRowProps> = ({ submition }) => {
    return (
        <TableRow>
            <TableCell>
                {submition.dimension} x {submition.dimension}
            </TableCell>
            <TableCell>{submition.algorithm}</TableCell>
            <TableCell>{submition.signalGain ? 'Yes' : 'No'}</TableCell>
            <TableCell>
                <Tooltip title={submition.userId}>
                    <PersonRounded />
                </Tooltip>
            </TableCell>
        </TableRow>
    );
};

export default SubmitRow;
