import React from 'react';
import { TableCell, TableRow, Tooltip } from '@mui/material';
import { ReconstructionInput } from '../../../../models/reconstruction-input';
import { PersonRounded } from '@mui/icons-material';

interface SubmitionRowProps {
    submition: ReconstructionInput;
}

const SubmitionRow: React.FC<SubmitionRowProps> = ({
    submition
}) => {
    return (
        <TableRow>
            <TableCell>
                {submition.dimension} x {submition.dimension}
            </TableCell>
            <TableCell>{submition.algorithm}</TableCell>
            <TableCell>{submition.signalGain}</TableCell>
            {/* <TableCell>{duration} s</TableCell> */}
            <TableCell>
                <Tooltip title={submition.userId}>
                    <PersonRounded />
                </Tooltip>
            </TableCell>
        </TableRow>
    );
};

export default SubmitionRow;