
import React, { useRef, useEffect } from 'react';
import { Group, Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import { Character } from '../types/theater';

interface CharacterModelProps {
  character: Character;
  position: [number, number, number];
}

const CharacterModel: React.FC<CharacterModelProps> = ({ character, position }) => {
  const groupRef = useRef<Group>(null);
  const bodyRef = useRef<Mesh>(null);
  const headRef = useRef<Group>(null);
  
  // Convert body orientation to radians
  const bodyRotationY = (character.bodyOrientation * Math.PI) / 180;
  
  // Convert head orientation to radians (relative to body)
  const headRotationY = (character.headOrientation * Math.PI) / 180;

  // Animation updates
  useFrame(() => {
    if (!groupRef.current || !bodyRef.current || !headRef.current) return;
    
    // Handle different animation states
    switch (character.animationState) {
      case 'idle':
        // Subtle breathing animation
        const breathe = Math.sin(Date.now() * 0.003) * 0.02;
        bodyRef.current.scale.y = 1 + breathe;
        break;
        
      case 'walking':
        // Subtle bob during walk animation
        const walkBob = Math.sin(character.animationProgress * Math.PI * 2) * 0.1;
        groupRef.current.position.y = position[1] + walkBob;
        break;
        
      case 'turning_body':
        // Smooth rotation interpolation
        const startRotation = bodyRotationY - (Math.PI / 2);
        const endRotation = bodyRotationY;
        const currentRotation = startRotation + (endRotation - startRotation) * character.animationProgress;
        groupRef.current.rotation.y = currentRotation;
        break;
        
      default:
        groupRef.current.rotation.y = bodyRotationY;
        groupRef.current.position.y = position[1];
        bodyRef.current.scale.y = 1;
    }
    
    // Always update head rotation
    headRef.current.rotation.y = headRotationY;
  });

  // Get character appearance based on type
  const getCharacterAppearance = () => {
    switch (character.type) {
      case 'young_woman':
        return { 
          bodyColor: '#ffb3ba', 
          skinColor: '#fdbcb4',
          hairColor: '#d2691e',
          size: [0.7, 1.8, 0.4] as [number, number, number] 
        };
      case 'boy_glasses':
        return { 
          bodyColor: '#b3d9ff', 
          skinColor: '#deb887',
          hairColor: '#8b4513',
          size: [0.7, 1.7, 0.4] as [number, number, number] 
        };
      case 'boy_afro':
        return { 
          bodyColor: '#b3ffb3', 
          skinColor: '#8d5524',
          hairColor: '#2f1b14',
          size: [0.7, 1.75, 0.4] as [number, number, number] 
        };
      default:
        return { 
          bodyColor: '#cccccc', 
          skinColor: '#deb887',
          hairColor: '#8b4513',
          size: [0.7, 1.7, 0.4] as [number, number, number] 
        };
    }
  };

  const appearance = getCharacterAppearance();

  return (
    <group ref={groupRef} position={position}>
      {/* Main Character Body with detailed geometry */}
      <mesh ref={bodyRef} castShadow receiveShadow>
        <boxGeometry args={appearance.size} />
        <meshPhongMaterial color={appearance.bodyColor} shininess={30} />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.5, appearance.size[1] / 4, 0]} castShadow>
        <boxGeometry args={[0.15, 0.8, 0.15]} />
        <meshPhongMaterial color={appearance.skinColor} />
      </mesh>
      <mesh position={[0.5, appearance.size[1] / 4, 0]} castShadow>
        <boxGeometry args={[0.15, 0.8, 0.15]} />
        <meshPhongMaterial color={appearance.skinColor} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.2, -appearance.size[1] / 2 - 0.4, 0]} castShadow>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshPhongMaterial color={appearance.bodyColor} />
      </mesh>
      <mesh position={[0.2, -appearance.size[1] / 2 - 0.4, 0]} castShadow>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshPhongMaterial color={appearance.bodyColor} />
      </mesh>
      
      {/* Detailed Head with facial features */}
      <group ref={headRef} position={[0, appearance.size[1] / 2 + 0.3, 0]}>
        {/* Head base */}
        <mesh castShadow>
          <boxGeometry args={[0.4, 0.4, 0.3]} />
          <meshPhongMaterial color={appearance.skinColor} />
        </mesh>
        
        {/* Eyes - Much more prominent and visible */}
        <mesh position={[-0.1, 0.05, 0.14]} castShadow>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshPhongMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.1, 0.05, 0.14]} castShadow>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshPhongMaterial color="#ffffff" />
        </mesh>
        
        {/* Eye pupils - Larger and more visible */}
        <mesh position={[-0.1, 0.05, 0.17]} castShadow>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshPhongMaterial color="#000000" />
        </mesh>
        <mesh position={[0.1, 0.05, 0.17]} castShadow>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshPhongMaterial color="#000000" />
        </mesh>
        
        {/* Eye iris - Add color to make eyes more expressive */}
        <mesh position={[-0.1, 0.05, 0.16]} castShadow>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshPhongMaterial color="#4169e1" />
        </mesh>
        <mesh position={[0.1, 0.05, 0.16]} castShadow>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshPhongMaterial color="#4169e1" />
        </mesh>
        
        {/* Nose */}
        <mesh position={[0, 0, 0.13]} castShadow>
          <boxGeometry args={[0.04, 0.06, 0.04]} />
          <meshPhongMaterial color={appearance.skinColor} />
        </mesh>
        
        {/* Mouth */}
        <mesh position={[0, -0.08, 0.12]} castShadow>
          <boxGeometry args={[0.08, 0.02, 0.02]} />
          <meshPhongMaterial color="#cc6666" />
        </mesh>
        
        {/* Body orientation indicator - arrow on chest */}
        <mesh position={[0, -0.3, 0.18]} castShadow>
          <coneGeometry args={[0.08, 0.15, 3]} />
          <meshPhongMaterial color="#ffff00" />
        </mesh>
      </group>

      {/* Character Type Specific Features */}
      {character.type === 'young_woman' && (
        <group position={[0, appearance.size[1] / 2 + 0.3, 0]}>
          {/* Ponytail hair */}
          <mesh position={[0, 0.1, -0.2]} castShadow>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshPhongMaterial color={appearance.hairColor} />
          </mesh>
          <mesh position={[0, -0.1, -0.3]} castShadow>
            <cylinderGeometry args={[0.08, 0.06, 0.3]} />
            <meshPhongMaterial color={appearance.hairColor} />
          </mesh>
        </group>
      )}
      
      {character.type === 'boy_glasses' && (
        <group position={[0, appearance.size[1] / 2 + 0.3, 0]}>
          {/* Glasses frame */}
          <mesh position={[0, 0.05, 0.15]} castShadow>
            <torusGeometry args={[0.12, 0.01, 8, 16]} />
            <meshPhongMaterial color="#333333" />
          </mesh>
          {/* Glasses bridge */}
          <mesh position={[0, 0.05, 0.15]} castShadow>
            <boxGeometry args={[0.04, 0.01, 0.01]} />
            <meshPhongMaterial color="#333333" />
          </mesh>
          {/* Hair */}
          <mesh position={[0, 0.15, 0]} castShadow>
            <sphereGeometry args={[0.22, 12, 12]} />
            <meshPhongMaterial color={appearance.hairColor} />
          </mesh>
        </group>
      )}
      
      {character.type === 'boy_afro' && (
        <group position={[0, appearance.size[1] / 2 + 0.3, 0]}>
          {/* Afro hair */}
          <mesh position={[0, 0.1, 0]} castShadow>
            <sphereGeometry args={[0.28, 16, 16]} />
            <meshPhongMaterial color={appearance.hairColor} />
          </mesh>
        </group>
      )}

      {/* Position Debug Marker */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.02]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
      </mesh>
      
      {/* Character ID label */}
      <mesh position={[0, appearance.size[1] + 0.8, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={character.color} />
      </mesh>
    </group>
  );
};

export default CharacterModel;
