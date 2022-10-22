import { ReconstructionAlgorithmType } from './reconstruction-algorithm-type';

export type ReconstructionInput = {
    userId: string;
    algorithm: ReconstructionAlgorithmType;
    signalGain: number;
    signalVector: [number];
};
