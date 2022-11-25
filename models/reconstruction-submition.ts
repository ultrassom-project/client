import { ReconstructionAlgorithmType } from './reconstruction-algorithm-type';
import { ReconstructionDimension } from './reconstruction-dimension';

export type ReconstructionSubmition = {
    id?: number;
    userId: string;
    algorithm: ReconstructionAlgorithmType;
    dimension: ReconstructionDimension;
    signalGain: boolean;
    signalVector: number[];
};
