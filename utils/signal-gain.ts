import { ReconstructionDimension } from "../models/reconstruction-dimension";

interface SignalGainValues {
  N: number;
  S: number;
}

export const applySignalGain = (
  signalVector: number[], 
  reconstructionDimension: ReconstructionDimension
) => {
  const signalGainValues = getSignalGainValues(reconstructionDimension);

  let index = 0;
  for (let c = 0; c < signalGainValues.N; c += 1) {
    for (let l = 0; l < signalGainValues.S; l += 1) {
      const gainMultiplier = 100 + 1/20 * l * Math.sqrt(l);
      signalVector[index] *= gainMultiplier; 

      index += 1;
    }
  }
}

const getSignalGainValues = (
  reconstructionDimension: ReconstructionDimension
): SignalGainValues => {
  let N: number;
  let S: number;

  switch (reconstructionDimension) {
    case ReconstructionDimension["30x30"]: {
      N = 64;
      S = 436;
      break;
    }
    case ReconstructionDimension["60x60"]: {
      N = 64;
      S = 794;
      break;
    }
  }

  return {
    N,
    S
  }
}