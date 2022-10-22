import React from 'react';
import { NextPage } from 'next';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ReconstructionsRowSkeleton from '../row-skeleton';
import { ReconstructionOutput } from '../../../../models/reconstruction-output';
import ReconstructionsRow from '../row';

interface ReconstructionsTableProps {
    reconstructions: ReconstructionOutput[];
    loading: boolean;
}

const ReconstructionsTable: NextPage<ReconstructionsTableProps> = (props) => {
    const { reconstructions, loading } = props;

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>User Id</TableCell>
                        <TableCell>Algorithm</TableCell>
                        <TableCell>Signal Gain</TableCell>
                        <TableCell>I</TableCell>
                        <TableCell>Start Time</TableCell>
                        <TableCell>End Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reconstructions.length > 0
                        ? reconstructions.map((reconstruction, index) => (
                              <ReconstructionsRow key={index} reconstruction={reconstruction} />
                          ))
                        : null}
                    {loading ? <ReconstructionsRowSkeleton /> : null}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ReconstructionsTable;
