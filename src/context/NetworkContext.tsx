import { createContext, useContext, useState, ReactNode } from 'react';

interface NetworkData {
  gps: string;
  crashes: string;
  st: string;
}

interface NetworkContextType {
  currentNetwork: 'original' | 'uploaded';
  uploadedNetworkData: NetworkData | null;
  hasUploadedNetwork: boolean;
  setUploadedNetwork: (data: NetworkData) => void;
  toggleNetwork: () => void;
  setCurrentNetwork: (network: 'original' | 'uploaded') => void;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export function NetworkProvider({ children }: { children: ReactNode }) {
  const [currentNetwork, setCurrentNetwork] = useState<'original' | 'uploaded'>('original');
  const [uploadedNetworkData, setUploadedNetworkData] = useState<NetworkData | null>(null);

  const hasUploadedNetwork = uploadedNetworkData !== null;

  const setUploadedNetwork = (data: NetworkData) => {
    setUploadedNetworkData(data);
    setCurrentNetwork('uploaded');
  };

  const toggleNetwork = () => {
    if (hasUploadedNetwork) {
      setCurrentNetwork(currentNetwork === 'original' ? 'uploaded' : 'original');
    }
  };

  return (
    <NetworkContext.Provider
      value={{
        currentNetwork,
        uploadedNetworkData,
        hasUploadedNetwork,
        setUploadedNetwork,
        toggleNetwork,
        setCurrentNetwork,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
}
