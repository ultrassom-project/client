import React from 'react';
import { Skeleton, TableCell, TableRow } from '@mui/material';

interface SubmitionRowSkeletonProps {}

const SubmitionRowSkeleton: React.FC<SubmitionRowSkeletonProps> = ({}) => {
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
        </TableRow>
    );
};

export default SubmitionRowSkeleton;
