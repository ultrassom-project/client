import React, {
    createContext,
    useCallback,
    useState,
    useContext,
    useEffect,
  } from 'react';
import { ReconstructionInput } from '../models/reconstruction-input';
import { ReconstructionOutput } from '../models/reconstruction-output';
  
  interface ReconstructionsContextData {
    reconstructionsInputs: ReconstructionInput[];
    setReconstructionsInputs: (data: ReconstructionInput[]) => void;
    reconstructionsOutputs: ReconstructionOutput[];
    setReconstructionsOutputs: (data: ReconstructionOutput[]) => void;
    randomSubmitTimeInterval: number;
    setRandomSubmitTimeInterval: (value: number) => void;
    runningRandomSubmit: boolean;
    setRunningRandomSubmit: (value: boolean) => void;
  }
  
  const ReconstructionsContext = createContext<ReconstructionsContextData>({} as ReconstructionsContextData);
  
  const ReconstructionsProvider: React.FC = ({ children }) => {
    const [reconstructionsInputs, setReconstructionsInputs] = useState<ReconstructionInput[]>([]);
    const [reconstructionsOutputs, setReconstructionsOutputs] = useState<ReconstructionOutput[]>([]);
    
    const [randomSubmitTimeInterval, setRandomSubmitTimeInterval] = useState(0);
    const [runningRandomSubmit, setRunningRandomSubmit] = useState(false);
  
    return (
      <ReconstructionsContext.Provider
        value={{
            reconstructionsInputs, 
            setReconstructionsInputs, 
            reconstructionsOutputs, 
            setReconstructionsOutputs,

            randomSubmitTimeInterval,
            setRandomSubmitTimeInterval,
            runningRandomSubmit,
            setRunningRandomSubmit,
        }}
      >
        {children}
      </ReconstructionsContext.Provider>
    );
  };
  
  function useReconstructions(): ReconstructionsContextData {
    const context = useContext(ReconstructionsContext);
  
    if (!context) {
      throw new Error('useReconstructions must be used within an ReconstructionsProvider');
    }
  
    return context;
  }
  
  export { ReconstructionsProvider, useReconstructions };
  