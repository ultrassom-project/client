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
    reconstructionsOutputs: ReconstructionOutput[];
    setReconstructionsInputs: (data: ReconstructionInput[]) => void;
    setReconstructionsOutputs: (data: ReconstructionOutput[]) => void;
  }
  
  const ReconstructionsContext = createContext<ReconstructionsContextData>({} as ReconstructionsContextData);
  
  const ReconstructionsProvider: React.FC = ({ children }) => {
    const [reconstructionsInputs, setReconstructionsInputs] = useState<ReconstructionInput[]>([]);
    const [reconstructionsOutputs, setReconstructionsOutputs] = useState<ReconstructionOutput[]>([]);
  
    return (
      <ReconstructionsContext.Provider
        value={{
            reconstructionsInputs, 
            reconstructionsOutputs, 
            setReconstructionsInputs, 
            setReconstructionsOutputs,
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
  