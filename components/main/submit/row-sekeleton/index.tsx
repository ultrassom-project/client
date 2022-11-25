import React from 'react';
import { Skeleton, TableCell, TableRow } from '@mui/material';

interface SubmitRowSkeletonProps {}

const SubmitRowSkeleton: React.FC<SubmitRowSkeletonProps> = ({}) => {
    return (
        <TableRow>
            <TableCell>
                <Skeleton variant="rounded" />
            </TableCell>
            <TableCell>
                <Skeleton variant="rounded" />
            </TableCell>
            <TableCell>
                <Skeleton variant="rounded" />
            </TableCell>
            <TableCell>
                <Skeleton variant="rounded" />
            </TableCell>
            <TableCell>
                <Skeleton variant="rounded" />
            </TableCell>
        </TableRow>
    );
};

export default SubmitRowSkeleton;
