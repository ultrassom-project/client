import { ReconstructionInput } from './reconstruction-input';

export type ReconstructionOutput = {
    input: ReconstructionInput;
    outputImageArray: string[][];
    iterations: number;
    startTime: string;
    endTime: string;
};
