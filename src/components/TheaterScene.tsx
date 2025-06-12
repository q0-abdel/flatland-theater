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

  // Animation frame loop for character updates with actual movement logic
  useAnimationFrame(() => {
    if (simulationState !== 'running' || characters.length === 0) return;

    const now = Date.now();
    
    // Update animation progress for all characters
    setCharacters(prevCharacters => 
      prevCharacters.map(character => ({
        ...character,
        animationProgress: Math.min(1, character.animationProgress + 0.02) // Slightly faster animation
      }))
    );

    // Trigger new actions at intervals
    if (now - lastActionTime.current >= config.actionInterval) {
      setCharacters(prevCharacters => {
        const updatedCharacters = [...prevCharacters];
        
        // Process actions for each character
        updatedCharacters.forEach((character, index) => {
          if (character.animationProgress >= 1) {
            // Character is ready for a new action - implement actual movement logic
            const actions = ['move_forward', 'turn_body_left', 'turn_body_right', 'turn_head_left', 'turn_head_right', 'idle'];
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            
            let newCharacter = { ...character };
            
            switch (randomAction) {
              case 'move_forward':
                // Check if character can move forward
                if ((character.bodyOrientation === 90 || character.bodyOrientation === 270) && 
                    character.headOrientation === 0) {
                  const targetPos = character.bodyOrientation === 90 ? 
                    character.position + 1 : character.position - 1;
                  
                  // Check bounds and if position is free
                  if (targetPos >= 0 && targetPos < config.lineLength && 
                      !prevCharacters.some(c => c.id !== character.id && c.position === targetPos)) {
                    newCharacter.position = targetPos;
                    newCharacter.animationState = 'walking';
                  }
                }
                break;
                
              case 'turn_body_left':
                newCharacter.bodyOrientation = ((character.bodyOrientation - 90 + 360) % 360) as any;
                newCharacter.animationState = 'turning_body';
                break;
                
              case 'turn_body_right':
                newCharacter.bodyOrientation = ((character.bodyOrientation + 90) % 360) as any;
                newCharacter.animationState = 'turning_body';
                break;
                
              case 'turn_head_left':
                newCharacter.headOrientation = Math.max(-90, character.headOrientation - 90) as any;
                newCharacter.animationState = 'turning_head';
                break;
                
              case 'turn_head_right':
                newCharacter.headOrientation = Math.min(90, character.headOrientation + 90) as any;
                newCharacter.animationState = 'turning_head';
                break;
                
              default:
                newCharacter.animationState = 'idle';
            }
            
            newCharacter.animationProgress = 0;
            updatedCharacters[index] = newCharacter;
          }
        });

        return updatedCharacters;
      });
      
      lastActionTime.current = now;
    }
  });

  return (
    <div className="w-full h-screen bg-gray-900">
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
        
        {/* Much brighter ambient lighting */}
        <ambientLight intensity={0.8} color="#ffffff" />
        
        {/* Multiple bright stage lights */}
        <spotLight
          position={[-4, 10, 3]}
          target-position={[-1, 0, 0]}
          angle={0.4}
          penumbra={0.3}
          intensity={2.5}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        <spotLight
          position={[4, 10, 3]}
          target-position={[1, 0, 0]}
          angle={0.4}
          penumbra={0.3}
          intensity={2.5}
          color="#ffffff"
          castShadow
        />
        
        <spotLight
          position={[0, 12, 4]}
          target-position={[0, 0, 0]}
          angle={0.6}
          penumbra={0.4}
          intensity={2.0}
          color="#f8f8ff"
          castShadow
        />
        
        {/* Fill lighting from sides */}
        <directionalLight
          position={[-8, 6, 2]}
          intensity={1.2}
          color="#ffffff"
        />
        
        <directionalLight
          position={[8, 6, 2]}
          intensity={1.2}
          color="#ffffff"
        />
        
        {/* Back lighting */}
        <directionalLight
          position={[0, 5, -3]}
          intensity={1.0}
          color="#ffffff"
        />
      </Canvas>
    </div>
  );
};

export default TheaterScene;
