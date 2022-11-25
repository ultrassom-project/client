import axios from 'axios';
import { EnqueueReconstructionResponse } from '../models/enqueue-reconstruction-response';
import { PerformanceSnapshot } from '../models/performance-snapshot';
import { ReconstructionInput } from '../models/reconstruction-input';
import { ReconstructionOutput } from '../models/reconstruction-output';

export function buildEndpointURL(path: string): URL {
    const baseUrl = new URL('http://localhost:8080').origin;
    return new URL(`${baseUrl}${path}`);
}

export async function getPerformanceReport(data: { startDate: Date; endDate: Date }): Promise<PerformanceSnapshot[]> {
    const url = buildEndpointURL('/performance');
    const response = await axios.get<PerformanceSnapshot[]>(url.href);
    return response.data;
}

export async function enqueueReconstruction(data: ReconstructionInput): Promise<EnqueueReconstructionResponse> {
    const url = buildEndpointURL('/reconstructions');
    const response = await axios.post(url.href, data);

    return response.data;
}

export async function getReconstructionsReport(): Promise<ReconstructionOutput[]> {
    const url = buildEndpointURL('/reconstructions/report');
    const response = await axios.get<ReconstructionOutput[]>(url.href);
    return response.data;
}
