
import React, { useState } from 'react';
import ConfigurationPanel from '../components/ConfigurationPanel';
import TheaterScene from '../components/TheaterScene';
import { SimulationConfig, SimulationState } from '../types/theater';

const Index = () => {
  const [config, setConfig] = useState<SimulationConfig>({
    lineLength: 10,
    actionInterval: 1000, // milliseconds
  });
  
  const [simulationState, setSimulationState] = useState<SimulationState>('configuration');

  const handleStartSimulation = (newConfig: SimulationConfig) => {
    setConfig(newConfig);
    setSimulationState('running');
  };

  const handleStopSimulation = () => {
    setSimulationState('configuration');
  };

  const handleResetSimulation = () => {
    setSimulationState('configuration');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {simulationState === 'configuration' ? (
        <ConfigurationPanel 
          onStart={handleStartSimulation}
          initialConfig={config}
        />
      ) : (
        <div className="relative w-full h-screen">
          <TheaterScene 
            config={config}
            simulationState={simulationState}
            onStop={handleStopSimulation}
            onReset={handleResetSimulation}
          />
          
          {/* Control Panel Overlay */}
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <button
              onClick={handleStopSimulation}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors"
            >
              Stop
            </button>
            <button
              onClick={handleResetSimulation}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md font-medium transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Information Panel */}
          <div className="absolute bottom-4 right-4 z-10 bg-black/70 text-white p-4 rounded-lg backdrop-blur-sm">
            <h3 className="text-lg font-bold mb-2">Fatland Theater</h3>
            <p className="text-sm text-gray-300 mb-1">Line Length: {config.lineLength} units</p>
            <p className="text-sm text-gray-300">Action Interval: {config.actionInterval / 1000}s</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
