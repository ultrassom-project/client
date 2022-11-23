import { ReconstructionInputSignal } from './reconstruction-input-signal';

export type ReconstructionRandomInput = {
    userId: string;
    timeInterval: number;
    inputSignals: ReconstructionInputSignal[];
};
