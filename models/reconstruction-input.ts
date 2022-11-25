import { ReconstructionAlgorithmType } from './reconstruction-algorithm-type';
import { ReconstructionDimension } from './reconstruction-dimension';

export type ReconstructionInput = {
    id?: number;
    userId: string;
    algorithm: ReconstructionAlgorithmType;
    dimension: ReconstructionDimension;
    signalVector: number[];
};
