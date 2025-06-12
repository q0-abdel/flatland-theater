
import React, { useRef, useEffect } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import { Character } from '../types/theater';

interface CharacterModelProps {
  character: Character;
  position: [number, number, number];
}

const CharacterModel: React.FC<CharacterModelProps> = ({ character, position }) => {
  const meshRef = useRef<Mesh>(null);
  
  // Convert body orientation to radians
  const bodyRotationY = (character.bodyOrientation * Math.PI) / 180;
  
  // Convert head orientation to radians (relative to body)
  const headRotationY = (character.headOrientation * Math.PI) / 180;

  // Animation updates
  useFrame(() => {
    if (!meshRef.current) return;
    
    // Handle different animation states
    switch (character.animationState) {
      case 'idle':
        // Subtle breathing animation
        const breathe = Math.sin(Date.now() * 0.003) * 0.02;
        meshRef.current.scale.y = 1 + breathe;
        break;
        
      case 'walking':
        // Subtle bob during walk animation
        const walkBob = Math.sin(character.animationProgress * Math.PI * 2) * 0.1;
        meshRef.current.position.y = position[1] + walkBob;
        break;
        
      case 'turning_body':
        // Smooth rotation interpolation
        const startRotation = bodyRotationY - (Math.PI / 2);
        const endRotation = bodyRotationY;
        const currentRotation = startRotation + (endRotation - startRotation) * character.animationProgress;
        meshRef.current.rotation.y = currentRotation;
        break;
        
      default:
        meshRef.current.rotation.y = bodyRotationY;
        meshRef.current.position.y = position[1];
        meshRef.current.scale.y = 1;
    }
  });

  // Get character appearance based on type
  const getCharacterAppearance = () => {
    switch (character.type) {
      case 'young_woman':
        return { color: '#ff6b9d', size: [0.6, 1.7, 0.3] as [number, number, number] };
      case 'boy_glasses':
        return { color: '#4ecdc4', size: [0.6, 1.6, 0.3] as [number, number, number] };
      case 'boy_afro':
        return { color: '#45b7d1', size: [0.6, 1.65, 0.3] as [number, number, number] };
      default:
        return { color: '#gray', size: [0.6, 1.6, 0.3] as [number, number, number] };
    }
  };

  const appearance = getCharacterAppearance();

  return (
    <group position={position}>
      {/* Main Character Body */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={appearance.size} />
        <meshPhongMaterial 
          color={appearance.color}
          shininess={30}
        />
      </mesh>
      
      {/* Head (separate for head rotation) */}
      <mesh 
        position={[0, appearance.size[1] / 2 + 0.2, 0]} 
        rotation={[0, bodyRotationY + headRotationY, 0]}
        castShadow
      >
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshPhongMaterial 
          color={appearance.color}
          shininess={50}
        />
      </mesh>

      {/* Character Type Indicators */}
      {character.type === 'young_woman' && (
        <mesh position={[0, appearance.size[1] / 2 + 0.4, 0]} castShadow>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshPhongMaterial color="#d63031" />
        </mesh>
      )}
      
      {character.type === 'boy_glasses' && (
        <mesh 
          position={[0, appearance.size[1] / 2 + 0.2, 0.15]} 
          rotation={[0, bodyRotationY + headRotationY, 0]}
          castShadow
        >
          <boxGeometry args={[0.25, 0.08, 0.02]} />
          <meshPhongMaterial color="#2d3436" />
        </mesh>
      )}
      
      {character.type === 'boy_afro' && (
        <mesh position={[0, appearance.size[1] / 2 + 0.3, 0]} castShadow>
          <sphereGeometry args={[0.25, 12, 12]} />
          <meshPhongMaterial color="#2d3436" />
        </mesh>
      )}

      {/* Position Debug Marker */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.02]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
      </mesh>
    </group>
  );
};

export default CharacterModel;
