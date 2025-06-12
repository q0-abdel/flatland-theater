
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
      {/* Theater Floor with Red Carpet */}
      <mesh position={[0, -0.1, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 12]} />
        <meshLambertMaterial color="#8B0000" />
      </mesh>
      
      {/* Carpet patterns */}
      <mesh position={[0, -0.09, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 10]} />
        <meshLambertMaterial color="#A0522D" />
      </mesh>
      
      {/* Stage Platform */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <boxGeometry args={[16, 0.2, 10]} />
        <meshLambertMaterial color="#654321" />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 4, -5]} receiveShadow>
        <planeGeometry args={[20, 8]} />
        <meshLambertMaterial color="#2F1B14" />
      </mesh>

      {/* Side Walls */}
      <mesh position={[-9, 4, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 8]} />
        <meshLambertMaterial color="#2F1B14" />
      </mesh>
      
      <mesh position={[9, 4, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 8]} />
        <meshLambertMaterial color="#2F1B14" />
      </mesh>

      {/* Theater Curtains - Background */}
      <mesh position={[0, 6, -4.8]} receiveShadow>
        <planeGeometry args={[18, 4]} />
        <meshLambertMaterial color="#8B0000" />
      </mesh>
      
      {/* Side Curtains */}
      <mesh position={[-8, 5, -2]} rotation={[0, Math.PI / 6, 0]} receiveShadow>
        <planeGeometry args={[3, 6]} />
        <meshLambertMaterial color="#8B0000" />
      </mesh>
      
      <mesh position={[8, 5, -2]} rotation={[0, -Math.PI / 6, 0]} receiveShadow>
        <planeGeometry args={[3, 6]} />
        <meshLambertMaterial color="#8B0000" />
      </mesh>
      
      {/* Curtain draping details */}
      <mesh position={[-6, 4, -4]} receiveShadow>
        <cylinderGeometry args={[0.1, 0.1, 6]} />
        <meshLambertMaterial color="#660000" />
      </mesh>
      
      <mesh position={[6, 4, -4]} receiveShadow>
        <cylinderGeometry args={[0.1, 0.1, 6]} />
        <meshLambertMaterial color="#660000" />
      </mesh>

      {/* Theater Seats (audience perspective elements) */}
      {Array.from({ length: 5 }, (_, row) => (
        Array.from({ length: 8 }, (_, seat) => {
          const x = -3.5 + seat * 1;
          const z = 6 + row * 1.2;
          return (
            <group key={`seat-${row}-${seat}`} position={[x, 0.5, z]}>
              <mesh receiveShadow>
                <boxGeometry args={[0.8, 0.8, 0.8]} />
                <meshLambertMaterial color="#4A0000" />
              </mesh>
              <mesh position={[0, 0.6, -0.3]} receiveShadow>
                <boxGeometry args={[0.8, 1, 0.1]} />
                <meshLambertMaterial color="#4A0000" />
              </mesh>
            </group>
          );
        })
      ))}

      {/* Movement Line - more theatrical */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[lineLength * lineSpacing + 0.4, 0.08]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.9} />
      </mesh>

      {/* Unit Markers - golden spots */}
      {Array.from({ length: lineLength }, (_, i) => {
        const x = lineStartX + i * lineSpacing;
        return (
          <mesh key={i} position={[x, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.08, 16]} />
            <meshBasicMaterial color="#FFD700" transparent opacity={0.8} />
          </mesh>
        );
      })}

      {/* Stage lighting equipment */}
      <mesh position={[0, 7.5, 2]} receiveShadow>
        <cylinderGeometry args={[0.2, 0.2, 16]} />
        <meshLambertMaterial color="#333333" />
      </mesh>
      
      {/* Ceiling */}
      <mesh position={[0, 8, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 12]} />
        <meshLambertMaterial color="#1A1A1A" />
      </mesh>
    </>
  );
};

export default TheaterStage;
