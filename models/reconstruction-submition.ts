import { ReconstructionAlgorithmType } from './reconstruction-algorithm-type';
import { ReconstructionDimension } from './reconstruction-dimension';

export type ReconstructionSubmition = {
    userId: string;
    algorithm: ReconstructionAlgorithmType;
    dimension: ReconstructionDimension;
    signalGain: boolean;
    signalVector: number[];
};
