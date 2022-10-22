import React from 'react';
import { NextPage } from 'next';
import { Skeleton, TableCell, TableRow } from '@mui/material';

interface ReconstructionsRowSkeletonProps {}

const ReconstructionsRowSkeleton: NextPage<ReconstructionsRowSkeletonProps> = (props) => {
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
            <TableCell>
                <Skeleton variant="rounded" />
            </TableCell>
            <TableCell>
                <Skeleton variant="rounded" />
            </TableCell>
        </TableRow>
    );
};

export default ReconstructionsRowSkeleton;
