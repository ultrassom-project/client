import React, {
    createContext,
    useCallback,
    useState,
    useContext,
    useEffect,
  } from 'react';
import { ReconstructionSubmition } from '../models/reconstruction-submition';
import { ReconstructionOutput } from '../models/reconstruction-output';
  
  interface ReconstructionsContextData {
    reconstructionsSubmitions: ReconstructionSubmition[];
    setReconstructionsSubmitions: (data: ReconstructionSubmition[]) => void;
    reconstructionsOutputs: ReconstructionOutput[];
    setReconstructionsOutputs: (data: ReconstructionOutput[]) => void;
    randomSubmitTimeInterval: number;
    setRandomSubmitTimeInterval: (value: number) => void;
    runningRandomSubmit: boolean;
    setRunningRandomSubmit: (value: boolean) => void;
  }
  
  const ReconstructionsContext = createContext<ReconstructionsContextData>({} as ReconstructionsContextData);
  
  const ReconstructionsProvider: React.FC = ({ children }) => {
    const [reconstructionsSubmitions, setReconstructionsSubmitions] = useState<ReconstructionSubmition[]>([]);
    const [reconstructionsOutputs, setReconstructionsOutputs] = useState<ReconstructionOutput[]>([]);
    
    const [randomSubmitTimeInterval, setRandomSubmitTimeInterval] = useState(0);
    const [runningRandomSubmit, setRunningRandomSubmit] = useState(false);
  
    return (
      <ReconstructionsContext.Provider
        value={{
            reconstructionsSubmitions, 
            setReconstructionsSubmitions, 
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
  