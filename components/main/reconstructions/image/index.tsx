import React from 'react';
import { NextPage } from 'next';
import { Box, Stack } from '@mui/material';

interface ReconstructionImageProps {
    outputImageArray: string[][];
}

const ReconstructionImage: NextPage<ReconstructionImageProps> = (props) => {
    const { outputImageArray } = props;

    return (
        <Stack>
            {outputImageArray.map((line, index) => (
                <Stack key={index} direction="row">
                    {line.map((item, index) => (
                        <Box key={index} sx={{ backgroundColor: item, width: 10, height: 10 }} />
                    ))}
                </Stack>
            ))}
        </Stack>
    );
};

export default ReconstructionImage;
