'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SapphireArchitecturalResortProps {
  onLoaded?: () => void;
}

export default function SapphireArchitecturalResort({ onLoaded }: SapphireArchitecturalResortProps) {
  const groupRef = useRef<THREE.Group>(null);
  const poolWaterRef = useRef<THREE.Mesh>(null);
  const fountainRef = useRef<THREE.Mesh>(null);

  React.useEffect(() => {
    if (onLoaded) onLoaded();
  }, [onLoaded]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Smooth 360-degree continuous rotation orbit
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.06;
    }

    if (poolWaterRef.current) {
      poolWaterRef.current.position.y = 14.3 + Math.sin(time * 1.5) * 0.02;
    }
    if (fountainRef.current) {
      fountainRef.current.scale.y = 1 + Math.sin(time * 2.5) * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      
      {/* ═══════ 1. GROUND PLAZA & APPROACH ═══════ */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[90, 90]} />
        <meshStandardMaterial color="#040914" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Subtle architectural floor grid */}
      <gridHelper args={[90, 45, '#0B1320', '#061120']} position={[0, 0.01, 0]} />

      {/* Entrance driveway */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 14]}>
        <planeGeometry args={[7, 18]} />
        <meshStandardMaterial color="#0B1320" roughness={0.4} metalness={0.5} />
      </mesh>
      
      {/* Gold boundary strips */}
      {[-3.5, 3.5].map((x, idx) => (
        <mesh key={`drive-edge-${idx}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.03, 14]}>
          <planeGeometry args={[0.08, 18]} />
          <meshBasicMaterial color="#D4AF37" />
        </mesh>
      ))}


      {/* ═══════ 2. GRAND ENTRANCE CANOPY ═══════ */}
      <group position={[0, 0, 5.5]}>
        <mesh position={[0, 3.5, 0]}>
          <boxGeometry args={[10.5, 0.28, 5]} />
          <meshStandardMaterial color="#07111F" metalness={0.8} roughness={0.2} />
        </mesh>
        
        <mesh position={[0, 3.36, 2.51]}>
          <boxGeometry args={[10.5, 0.12, 0.08]} />
          <meshBasicMaterial color="#D4AF37" />
        </mesh>

        {[-4.2, -1.4, 1.4, 4.2].map((x, idx) => (
          <mesh key={`col-${idx}`} position={[x, 1.75, 2]}>
            <cylinderGeometry args={[0.14, 0.16, 3.5, 8]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}

        <mesh position={[0, 1.6, 2.5]}>
          <boxGeometry args={[4, 3.0, 0.06]} />
          <meshStandardMaterial color="#1B4D8E" roughness={0.1} metalness={0.9} transparent opacity={0.8} />
        </mesh>
      </group>


      {/* ═══════ 3. MAIN CENTRAL TOWER (14 FLOORS) ═══════ */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 7.0, 0]}>
          <boxGeometry args={[10.2, 14, 6.2]} />
          <meshStandardMaterial color="#07111F" metalness={0.7} roughness={0.2} />
        </mesh>

        {/* Front glass curtain wall */}
        <mesh position={[0, 7.0, 3.12]}>
          <planeGeometry args={[9.8, 13.8]} />
          <meshStandardMaterial 
            color="#123B70" 
            roughness={0.1} 
            metalness={0.9} 
            transparent 
            opacity={0.85} 
          />
        </mesh>

        {/* Glowing floor strips */}
        {[1.0, 2.3, 3.6, 4.9, 6.2, 7.5, 8.8, 10.1, 11.4, 12.7].map((y, idx) => (
          <mesh key={`floor-${idx}`} position={[0, y, 3.13]}>
            <boxGeometry args={[9.6, 0.06, 0.02]} />
            <meshBasicMaterial color="#D4AF37" />
          </mesh>
        ))}

        {/* Vertical mullions */}
        {[-4.7, -2.35, 0, 2.35, 4.7].map((x, idx) => (
          <mesh key={`mullion-${idx}`} position={[x, 7.0, 3.14]}>
            <boxGeometry args={[0.16, 14, 0.08]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}

        <mesh position={[0, 14.1, 0]}>
          <boxGeometry args={[10.6, 0.3, 6.6]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>


      {/* ═══════ 4. EAST WING — LUXURY SUITES ═══════ */}
      <group position={[-8.2, 0, -1]}>
        <mesh position={[0, 4.5, 0]}>
          <boxGeometry args={[6.2, 9, 5.2]} />
          <meshStandardMaterial color="#0B1320" metalness={0.6} roughness={0.3} />
        </mesh>
        {[1.5, 3.3, 5.1, 6.9, 8.2].map((y, idx) => (
          <mesh key={`ebal-${idx}`} position={[0, y, 2.61]}>
            <boxGeometry args={[5.8, 0.45, 0.06]} />
            <meshStandardMaterial color="#387BCB" metalness={0.8} roughness={0.2} transparent opacity={0.8} />
          </mesh>
        ))}
        <mesh position={[0, 9.05, 0]}>
          <boxGeometry args={[6.4, 0.15, 5.4]} />
          <meshBasicMaterial color="#D4AF37" />
        </mesh>
      </group>


      {/* ═══════ 5. WEST WING — SPA & GASTRONOMY ═══════ */}
      <group position={[8.2, 0, -1]}>
        <mesh position={[0, 4.5, 0]}>
          <boxGeometry args={[6.2, 9, 5.2]} />
          <meshStandardMaterial color="#0B1320" metalness={0.6} roughness={0.3} />
        </mesh>
        {[1.5, 3.3, 5.1, 6.9, 8.2].map((y, idx) => (
          <mesh key={`wbal-${idx}`} position={[0, y, 2.61]}>
            <boxGeometry args={[5.8, 0.45, 0.06]} />
            <meshStandardMaterial color="#387BCB" metalness={0.8} roughness={0.2} transparent opacity={0.8} />
          </mesh>
        ))}
        <mesh position={[0, 9.05, 0]}>
          <boxGeometry args={[6.4, 0.15, 5.4]} />
          <meshBasicMaterial color="#D4AF37" />
        </mesh>
      </group>


      {/* ═══════ 6. SKY BRIDGES ═══════ */}
      <group position={[0, 7, -1]}>
        <mesh position={[-5.6, 0, 0]}>
          <boxGeometry args={[3, 0.5, 1.8]} />
          <meshStandardMaterial color="#123B70" metalness={0.8} roughness={0.2} transparent opacity={0.75} />
        </mesh>
        <mesh position={[5.6, 0, 0]}>
          <boxGeometry args={[3, 0.5, 1.8]} />
          <meshStandardMaterial color="#123B70" metalness={0.8} roughness={0.2} transparent opacity={0.75} />
        </mesh>
      </group>


      {/* ═══════ 7. ROOFTOP INFINITY POOL DECK ═══════ */}
      <group position={[0, 14.2, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[10.8, 0.4, 6.8]} />
          <meshStandardMaterial color="#07111F" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh ref={poolWaterRef} position={[0, 0.28, 0]}>
          <boxGeometry args={[7.2, 0.08, 3.6]} />
          <meshStandardMaterial color="#2662AB" roughness={0.1} metalness={0.9} />
        </mesh>
      </group>


      {/* ═══════ 8. ROOFTOP HELIPAD ═══════ */}
      <group position={[0, 14.7, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
          <ringGeometry args={[1.0, 1.4, 24]} />
          <meshBasicMaterial color="#D4AF37" />
        </mesh>
      </group>


      {/* ═══════ 9. WATER FOUNTAIN ═══════ */}
      <group position={[0, 0, 11]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <circleGeometry args={[3.2, 24]} />
          <meshStandardMaterial color="#123B70" roughness={0.1} metalness={0.9} />
        </mesh>
        <mesh ref={fountainRef} position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.08, 0.03, 1.4, 8]} />
          <meshStandardMaterial color="#387BCB" transparent opacity={0.7} />
        </mesh>
      </group>

    </group>
  );
}
