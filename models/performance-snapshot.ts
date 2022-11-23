export type PerformanceSnapshot = {
    date: string;
    memory: number;
    cpu: number;
    reconstructionsInProgress: number;
    reconstructionsInQueue: number;
    finishedReconstructions: number;
};
