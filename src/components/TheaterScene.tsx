
import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import TheaterStage from './TheaterStage';
import CharacterManager from './CharacterManager';
import { SimulationConfig, SimulationState, Character } from '../types/theater';
import { initializeCharacters } from '../utils/characterUtils';
import { useAnimationFrame } from '../hooks/useAnimationFrame';

interface TheaterSceneProps {
  config: SimulationConfig;
  simulationState: SimulationState;
  onStop: () => void;
  onReset: () => void;
}

const TheaterScene: React.FC<TheaterSceneProps> = ({ 
  config, 
  simulationState, 
  onStop, 
  onReset 
}) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const lastActionTime = useRef<number>(0);

  // Initialize characters when simulation starts
  useEffect(() => {
    if (simulationState === 'running') {
      const initialCharacters = initializeCharacters(config.lineLength);
      setCharacters(initialCharacters);
      lastActionTime.current = Date.now();
      console.log('Theater simulation started with characters:', initialCharacters);
    }
  }, [simulationState, config.lineLength]);

  // Animation frame loop for character updates
  useAnimationFrame(() => {
    if (simulationState !== 'running' || characters.length === 0) return;

    const now = Date.now();
    
    // Update animation progress for all characters
    setCharacters(prevCharacters => 
      prevCharacters.map(character => ({
        ...character,
        animationProgress: Math.min(1, character.animationProgress + 0.016) // ~60fps
      }))
    );

    // Trigger new actions at intervals
    if (now - lastActionTime.current >= config.actionInterval) {
      setCharacters(prevCharacters => {
        const updatedCharacters = [...prevCharacters];
        
        // Process actions for each character
        updatedCharacters.forEach((character, index) => {
          if (character.animationProgress >= 1) {
            // Character is ready for a new action
            // This will be expanded with the full action system
            updatedCharacters[index] = {
              ...character,
              animationState: 'idle',
              animationProgress: 0
            };
          }
        });

        return updatedCharacters;
      });
      
      lastActionTime.current = now;
    }
  });

  return (
    <div className="w-full h-screen bg-black">
      <Canvas shadows>
        {/* Camera positioned as theater audience */}
        <PerspectiveCamera 
          makeDefault 
          position={[0, 3, 8]} 
          fov={60}
        />
        
        {/* Controlled camera movement (limited to audience perspective) */}
        <OrbitControls 
          target={[0, 1, 0]}
          minDistance={6}
          maxDistance={12}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.5}
          maxAzimuthAngle={Math.PI / 4}
          minAzimuthAngle={-Math.PI / 4}
          enablePan={false}
        />

        {/* Theater Environment */}
        <TheaterStage lineLength={config.lineLength} />
        
        {/* Character System */}
        <CharacterManager 
          characters={characters}
          lineLength={config.lineLength}
          onCharactersUpdate={setCharacters}
        />
        
        {/* Ambient lighting */}
        <ambientLight intensity={0.2} color="#4a5568" />
        
        {/* Main stage lighting */}
        <spotLight
          position={[-3, 8, 2]}
          target-position={[-1, 0, 0]}
          angle={0.3}
          penumbra={0.5}
          intensity={1.5}
          color="#ffeb3b"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        <spotLight
          position={[3, 8, 2]}
          target-position={[1, 0, 0]}
          angle={0.3}
          penumbra={0.5}
          intensity={1.5}
          color="#ffeb3b"
          castShadow
        />
        
        {/* Rim lighting */}
        <directionalLight
          position={[0, 5, -3]}
          intensity={0.8}
          color="#ff6b6b"
        />
      </Canvas>
    </div>
  );
};

export default TheaterScene;
