import { ReconstructionAlgorithmType } from './reconstruction-algorithm-type';
import { ReconstructionDimension } from './reconstruction-dimension';

export type ReconstructionInput = {
    userId: string;
    algorithm: ReconstructionAlgorithmType;
    dimension: ReconstructionDimension;
    signalGain: number;
    signalVector: number[];
};
