import React from 'react';
import { NextPage } from 'next';
import { Box, Stack } from '@mui/material';

interface ReconstructionImageProps {
    outputImageArray: string[][];
    size: number;
}

const ReconstructionImage: NextPage<ReconstructionImageProps> = (props) => {
    const { outputImageArray, size } = props;
    const pixelSize = size / outputImageArray.length;

    return (
        <Box sx={{ width: size, height: size }}>
            <Stack direction="column">
                {outputImageArray.map((line, index) => (
                    <Stack key={index} direction="row">
                        {line.map((item, index) => (
                            <Box key={index} sx={{ backgroundColor: item, width: pixelSize, height: pixelSize }} />
                        ))}
                    </Stack>
                ))}
            </Stack>
        </Box>
    );
};

export default ReconstructionImage;
