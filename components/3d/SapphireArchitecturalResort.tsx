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

  React.useEffect(() => {
    if (onLoaded) onLoaded();
  }, [onLoaded]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Smooth 360-degree continuous rotation orbit
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05;
    }

    if (poolWaterRef.current) {
      poolWaterRef.current.position.y = 14.3 + Math.sin(time * 1.5) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      
      {/* ═══════ 1. HIGH-CONTRAST GROUND PLAZA & APPROACH ═══════ */}
      {/* Polished Obsidian Slate Plaza Deck (Contrasts sharply against white background) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[90, 90]} />
        <meshStandardMaterial color="#0F172A" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Gold floor grid lines */}
      <gridHelper args={[90, 45, '#D4AF37', '#1E293B']} position={[0, 0.01, 0]} />

      {/* Deep Royal Driveway */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 14]} receiveShadow>
        <planeGeometry args={[7, 18]} />
        <meshStandardMaterial color="#020617" roughness={0.3} metalness={0.7} />
      </mesh>
      
      {/* Gold boundary lines */}
      {[-3.5, 3.5].map((x, idx) => (
        <mesh key={`drive-edge-${idx}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.03, 14]}>
          <planeGeometry args={[0.1, 18]} />
          <meshBasicMaterial color="#D4AF37" />
        </mesh>
      ))}


      {/* ═══════ 2. GRAND ENTRANCE CANOPY ═══════ */}
      <group position={[0, 0, 5.5]}>
        <mesh position={[0, 3.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[10.5, 0.28, 5]} />
          <meshStandardMaterial color="#0B1320" metalness={0.9} roughness={0.1} />
        </mesh>
        
        <mesh position={[0, 3.36, 2.51]}>
          <boxGeometry args={[10.5, 0.12, 0.08]} />
          <meshBasicMaterial color="#D4AF37" />
        </mesh>

        {[-4.2, -1.4, 1.4, 4.2].map((x, idx) => (
          <mesh key={`col-${idx}`} position={[x, 1.75, 2]} castShadow>
            <cylinderGeometry args={[0.14, 0.16, 3.5, 16]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.05} />
          </mesh>
        ))}

        <mesh position={[0, 1.6, 2.5]}>
          <boxGeometry args={[4, 3.0, 0.06]} />
          <meshPhysicalMaterial color="#1D4ED8" roughness={0.02} metalness={0.98} opacity={0.9} transparent />
        </mesh>
      </group>


      {/* ═══════ 3. MAIN CENTRAL TOWER (14 FLOORS) ═══════ */}
      <group position={[0, 0, 0]}>
        {/* Dark Obsidian Structure Core */}
        <mesh position={[0, 7.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[10.2, 14, 6.2]} />
          <meshStandardMaterial color="#0B1320" metalness={0.8} roughness={0.15} />
        </mesh>

        {/* Deep Sapphire Reflective Glass Wall */}
        <mesh position={[0, 7.0, 3.12]}>
          <planeGeometry args={[9.8, 13.8]} />
          <meshPhysicalMaterial 
            color="#0A172C" 
            roughness={0.02} 
            metalness={0.98} 
            reflectivity={1.0}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
          />
        </mesh>

        {/* Emissive Gold Floor Lighting Lines */}
        {[1.0, 2.3, 3.6, 4.9, 6.2, 7.5, 8.8, 10.1, 11.4, 12.7].map((y, idx) => (
          <mesh key={`floor-${idx}`} position={[0, y, 3.13]}>
            <boxGeometry args={[9.6, 0.08, 0.02]} />
            <meshBasicMaterial color="#D4AF37" />
          </mesh>
        ))}

        {/* Metallic Gold Vertical Mullions */}
        {[-4.7, -2.35, 0, 2.35, 4.7].map((x, idx) => (
          <mesh key={`mullion-${idx}`} position={[x, 7.0, 3.14]} castShadow>
            <boxGeometry args={[0.18, 14, 0.08]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.05} />
          </mesh>
        ))}

        {/* Roof Crown */}
        <mesh position={[0, 14.1, 0]} castShadow>
          <boxGeometry args={[10.6, 0.35, 6.6]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.05} />
        </mesh>
      </group>


      {/* ═══════ 4. EAST WING — LUXURY SUITES ═══════ */}
      <group position={[-8.2, 0, -1]}>
        <mesh position={[0, 4.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[6.2, 9, 5.2]} />
          <meshStandardMaterial color="#1E293B" metalness={0.7} roughness={0.2} />
        </mesh>
        {[1.5, 3.3, 5.1, 6.9, 8.2].map((y, idx) => (
          <mesh key={`ebal-${idx}`} position={[0, y, 2.61]}>
            <boxGeometry args={[5.8, 0.45, 0.06]} />
            <meshStandardMaterial color="#2563EB" metalness={0.9} roughness={0.1} transparent opacity={0.85} />
          </mesh>
        ))}
        <mesh position={[0, 9.05, 0]}>
          <boxGeometry args={[6.4, 0.15, 5.4]} />
          <meshBasicMaterial color="#D4AF37" />
        </mesh>
      </group>


      {/* ═══════ 5. WEST WING — SPA & GASTRONOMY ═══════ */}
      <group position={[8.2, 0, -1]}>
        <mesh position={[0, 4.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[6.2, 9, 5.2]} />
          <meshStandardMaterial color="#1E293B" metalness={0.7} roughness={0.2} />
        </mesh>
        {[1.5, 3.3, 5.1, 6.9, 8.2].map((y, idx) => (
          <mesh key={`wbal-${idx}`} position={[0, y, 2.61]}>
            <boxGeometry args={[5.8, 0.45, 0.06]} />
            <meshStandardMaterial color="#2563EB" metalness={0.9} roughness={0.1} transparent opacity={0.85} />
          </mesh>
        ))}
        <mesh position={[0, 9.05, 0]}>
          <boxGeometry args={[6.4, 0.15, 5.4]} />
          <meshBasicMaterial color="#D4AF37" />
        </mesh>
      </group>


      {/* ═══════ 6. SKY BRIDGES ═══════ */}
      <group position={[0, 7, -1]}>
        <mesh position={[-5.6, 0, 0]} castShadow>
          <boxGeometry args={[3, 0.5, 1.8]} />
          <meshStandardMaterial color="#0A172C" metalness={0.9} roughness={0.1} transparent opacity={0.85} />
        </mesh>
        <mesh position={[5.6, 0, 0]} castShadow>
          <boxGeometry args={[3, 0.5, 1.8]} />
          <meshStandardMaterial color="#0A172C" metalness={0.9} roughness={0.1} transparent opacity={0.85} />
        </mesh>
      </group>


      {/* ═══════ 7. ROOFTOP INFINITY POOL DECK ═══════ */}
      <group position={[0, 14.2, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[10.8, 0.4, 6.8]} />
          <meshStandardMaterial color="#0B1320" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh ref={poolWaterRef} position={[0, 0.28, 0]}>
          <boxGeometry args={[7.2, 0.08, 3.6]} />
          <meshStandardMaterial color="#0284C7" roughness={0.02} metalness={0.98} />
        </mesh>
      </group>


      {/* ═══════ 8. ROOFTOP HELIPAD ═══════ */}
      <group position={[0, 14.8, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
          <ringGeometry args={[1.0, 1.4, 32]} />
          <meshBasicMaterial color="#D4AF37" />
        </mesh>
      </group>

    </group>
  );
}
