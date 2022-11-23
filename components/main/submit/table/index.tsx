import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import SubmitRow from '../row';
import SubmitRowSkeleton from '../row-sekeleton';
import { ReconstructionSubmition } from '../../../../models/reconstruction-submition';

interface SubmitTableProps {
    loading: boolean;
    submitions: ReconstructionSubmition[];
}

const SubmitTable: React.FC<SubmitTableProps> = ({ loading, submitions }) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Algorithm</TableCell>
                        <TableCell>Dimension</TableCell>
                        <TableCell>Signal Gain?</TableCell>
                        <TableCell>User</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {submitions.length > 0
                        ? submitions.map((reconstruction, index) => (
                              <SubmitRow key={index} submition={reconstruction} />
                          ))
                        : null}
                    {loading ? <SubmitRowSkeleton /> : null}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SubmitTable;
