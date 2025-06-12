
import React from 'react';
import { extend } from '@react-three/fiber';
import { PlaneGeometry, BoxGeometry } from 'three';

extend({ PlaneGeometry, BoxGeometry });

interface TheaterStageProps {
  lineLength: number;
}

const TheaterStage: React.FC<TheaterStageProps> = ({ lineLength }) => {
  const lineSpacing = 0.8; // spacing between units on the line
  const lineStartX = -(lineLength - 1) * lineSpacing / 2;
  const lineEndX = (lineLength - 1) * lineSpacing / 2;

  return (
    <>
      {/* Stage Floor */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[16, 10]} />
        <meshLambertMaterial color="#2d1810" />
      </mesh>
      
      {/* Stage Platform */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <boxGeometry args={[14, 0.2, 8]} />
        <meshLambertMaterial color="#1a1a1a" />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 4, -4]} receiveShadow>
        <planeGeometry args={[20, 8]} />
        <meshLambertMaterial color="#4a1810" />
      </mesh>

      {/* Side Walls */}
      <mesh position={[-8, 4, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshLambertMaterial color="#2d1810" />
      </mesh>
      
      <mesh position={[8, 4, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshLambertMaterial color="#2d1810" />
      </mesh>

      {/* Movement Line */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[lineLength * lineSpacing + 0.2, 0.05]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>

      {/* Unit Markers */}
      {Array.from({ length: lineLength }, (_, i) => {
        const x = lineStartX + i * lineSpacing;
        return (
          <mesh key={i} position={[x, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.1, 0.1]} />
            <meshBasicMaterial color="#cccccc" transparent opacity={0.7} />
          </mesh>
        );
      })}

      {/* Curtains */}
      <mesh position={[0, 6, -4.5]} receiveShadow>
        <planeGeometry args={[20, 4]} />
        <meshLambertMaterial color="#8b0000" />
      </mesh>
    </>
  );
};

export default TheaterStage;
