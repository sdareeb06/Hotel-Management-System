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
    if (poolWaterRef.current) {
      poolWaterRef.current.position.y = 12.35 + Math.sin(time * 1.8) * 0.02;
    }
    if (fountainRef.current) {
      fountainRef.current.scale.y = 1 + Math.sin(time * 3) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      
      {/* ═══════ 1. GROUND PLAZA & LANDSCAPE ═══════ */}
      {/* Polished ground deck */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#040A14" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Subtle architectural floor grid */}
      <gridHelper args={[80, 40, '#0B1F3A', '#07111F']} position={[0, 0.01, 0]} />

      {/* Driveway approach path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 12]}>
        <planeGeometry args={[6, 16]} />
        <meshStandardMaterial color="#0B1F3A" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Driveway gold edge lines */}
      {[-3, 3].map((x, idx) => (
        <mesh key={`drive-${idx}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.03, 12]}>
          <planeGeometry args={[0.08, 16]} />
          <meshStandardMaterial color="#C8A96B" emissive="#C8A96B" emissiveIntensity={0.8} />
        </mesh>
      ))}

      {/* Garden landscape patches */}
      {[
        [-12, 0.05, 5], [12, 0.05, 5], [-12, 0.05, -5], [12, 0.05, -5],
        [-15, 0.05, 0], [15, 0.05, 0]
      ].map((pos, idx) => (
        <mesh key={`garden-${idx}`} position={pos as [number, number, number]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[2.5, 32]} />
          <meshStandardMaterial color="#0A2215" roughness={0.9} metalness={0.1} />
        </mesh>
      ))}

      {/* Decorative garden trees (simple cone + cylinder) */}
      {[
        [-12, 0, 5], [12, 0, 5], [-12, 0, -5], [12, 0, -5],
        [-15, 0, 0], [15, 0, 0], [-8, 0, 15], [8, 0, 15]
      ].map((pos, idx) => (
        <group key={`tree-${idx}`} position={pos as [number, number, number]}>
          <mesh position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.12, 0.15, 2.4, 8]} />
            <meshStandardMaterial color="#1A0F08" roughness={0.8} />
          </mesh>
          <mesh position={[0, 3.0, 0]}>
            <coneGeometry args={[1.2, 2.5, 8]} />
            <meshStandardMaterial color="#0D3320" roughness={0.7} metalness={0.1} />
          </mesh>
        </group>
      ))}


      {/* ═══════ 2. GRAND ENTRANCE CANOPY ═══════ */}
      <group position={[0, 0, 5]}>
        <mesh position={[0, 3.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[10, 0.3, 5]} />
          <meshStandardMaterial color="#07111F" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Gold trim edge */}
        <mesh position={[0, 3.35, 2.5]}>
          <boxGeometry args={[10, 0.12, 0.1]} />
          <meshStandardMaterial color="#C8A96B" emissive="#C8A96B" emissiveIntensity={1.0} />
        </mesh>
        {/* Canopy columns */}
        {[-4, -1.5, 1.5, 4].map((x, idx) => (
          <mesh key={`col-${idx}`} position={[x, 1.75, 2]} castShadow>
            <cylinderGeometry args={[0.15, 0.18, 3.5, 12]} />
            <meshStandardMaterial color="#C8A96B" metalness={0.85} roughness={0.15} />
          </mesh>
        ))}
        {/* Warm entrance glow */}
        <pointLight position={[0, 2.8, 1]} intensity={5.0} color="#E8D49B" distance={10} />
        <pointLight position={[-3, 2.8, 1]} intensity={3.0} color="#C8A96B" distance={6} />
        <pointLight position={[3, 2.8, 1]} intensity={3.0} color="#C8A96B" distance={6} />
        
        {/* Reception doors (glass panels) */}
        {[-1.2, 1.2].map((x, idx) => (
          <mesh key={`door-${idx}`} position={[x, 1.6, 2.5]}>
            <boxGeometry args={[1.8, 3.0, 0.08]} />
            <meshPhysicalMaterial color="#1B4D8E" transmission={0.5} transparent opacity={0.7} roughness={0.05} metalness={0.9} />
          </mesh>
        ))}
      </group>


      {/* ═══════ 3. MAIN CENTRAL TOWER (14 FLOORS) ═══════ */}
      <group position={[0, 0, 0]}>
        {/* Core structure */}
        <mesh position={[0, 7.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[10, 14, 6]} />
          <meshStandardMaterial color="#07111F" metalness={0.65} roughness={0.25} />
        </mesh>

        {/* Front glass curtain wall */}
        <mesh position={[0, 7.0, 3.01]}>
          <planeGeometry args={[9.6, 13.6]} />
          <meshPhysicalMaterial 
            color="#123B70" 
            transmission={0.55} 
            opacity={0.8} 
            transparent 
            roughness={0.08} 
            metalness={0.92} 
            reflectivity={1.0}
          />
        </mesh>

        {/* Rear glass curtain wall */}
        <mesh position={[0, 7.0, -3.01]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[9.6, 13.6]} />
          <meshPhysicalMaterial color="#0B1F3A" transmission={0.4} opacity={0.75} transparent roughness={0.1} metalness={0.9} />
        </mesh>

        {/* Emissive floor level strips (warm occupied suite glow) */}
        {[1.0, 2.3, 3.6, 4.9, 6.2, 7.5, 8.8, 10.1, 11.4, 12.7].map((y, idx) => (
          <group key={`floor-${idx}`}>
            <mesh position={[0, y, 3.02]}>
              <boxGeometry args={[9.4, 0.06, 0.04]} />
              <meshStandardMaterial color="#C8A96B" emissive="#C8A96B" emissiveIntensity={idx % 3 === 0 ? 2.0 : 1.0} />
            </mesh>
            {/* Random window lights */}
            {[-3.5, -1.5, 0.5, 2.5].map((wx, widx) => (
              idx % 2 === widx % 2 ? (
                <mesh key={`win-${idx}-${widx}`} position={[wx, y + 0.5, 3.02]}>
                  <planeGeometry args={[1.2, 0.8]} />
                  <meshStandardMaterial color="#E8D49B" emissive="#E8D49B" emissiveIntensity={0.6} transparent opacity={0.4} />
                </mesh>
              ) : null
            ))}
          </group>
        ))}

        {/* Vertical structural mullions */}
        {[-4.6, -2.3, 0, 2.3, 4.6].map((x, idx) => (
          <mesh key={`mul-${idx}`} position={[x, 7.0, 3.03]} castShadow>
            <boxGeometry args={[0.15, 14, 0.12]} />
            <meshStandardMaterial color="#C8A96B" metalness={0.85} roughness={0.15} />
          </mesh>
        ))}

        {/* Crown / top accent band */}
        <mesh position={[0, 14.1, 0]} castShadow>
          <boxGeometry args={[10.4, 0.3, 6.4]} />
          <meshStandardMaterial color="#C8A96B" metalness={0.9} roughness={0.1} emissive="#C8A96B" emissiveIntensity={0.5} />
        </mesh>
      </group>


      {/* ═══════ 4. EAST WING — LUXURY SUITES ═══════ */}
      <group position={[-8, 0, -1]}>
        <mesh position={[0, 4.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[6, 9, 5]} />
          <meshStandardMaterial color="#0B1F3A" metalness={0.55} roughness={0.35} />
        </mesh>
        {/* Suite balcony glass rails */}
        {[1.5, 3.3, 5.1, 6.9, 8.2].map((y, idx) => (
          <mesh key={`ebal-${idx}`} position={[0, y, 2.51]}>
            <boxGeometry args={[5.6, 0.5, 0.08]} />
            <meshStandardMaterial color="#387BCB" metalness={0.85} roughness={0.15} transparent opacity={0.7} />
          </mesh>
        ))}
        {/* Gold suite accent trim */}
        <mesh position={[0, 9.05, 0]}>
          <boxGeometry args={[6.2, 0.15, 5.2]} />
          <meshStandardMaterial color="#C8A96B" metalness={0.9} roughness={0.1} />
        </mesh>
        <pointLight position={[0, 3, 3]} intensity={2.5} color="#E8D49B" distance={8} />
      </group>


      {/* ═══════ 5. WEST WING — SPA & GASTRONOMY ═══════ */}
      <group position={[8, 0, -1]}>
        <mesh position={[0, 4.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[6, 9, 5]} />
          <meshStandardMaterial color="#0B1F3A" metalness={0.55} roughness={0.35} />
        </mesh>
        {[1.5, 3.3, 5.1, 6.9, 8.2].map((y, idx) => (
          <mesh key={`wbal-${idx}`} position={[0, y, 2.51]}>
            <boxGeometry args={[5.6, 0.5, 0.08]} />
            <meshStandardMaterial color="#387BCB" metalness={0.85} roughness={0.15} transparent opacity={0.7} />
          </mesh>
        ))}
        <mesh position={[0, 9.05, 0]}>
          <boxGeometry args={[6.2, 0.15, 5.2]} />
          <meshStandardMaterial color="#C8A96B" metalness={0.9} roughness={0.1} />
        </mesh>
        <pointLight position={[0, 3, 3]} intensity={2.5} color="#387BCB" distance={8} />
      </group>


      {/* ═══════ 6. SKY BRIDGE CONNECTOR ═══════ */}
      <group position={[0, 7, -1]}>
        {/* Left bridge */}
        <mesh position={[-5.5, 0, 0]} castShadow>
          <boxGeometry args={[3, 0.5, 2]} />
          <meshPhysicalMaterial color="#123B70" transmission={0.4} transparent opacity={0.65} roughness={0.1} metalness={0.9} />
        </mesh>
        {/* Right bridge */}
        <mesh position={[5.5, 0, 0]} castShadow>
          <boxGeometry args={[3, 0.5, 2]} />
          <meshPhysicalMaterial color="#123B70" transmission={0.4} transparent opacity={0.65} roughness={0.1} metalness={0.9} />
        </mesh>
      </group>


      {/* ═══════ 7. ROOFTOP INFINITY SKY POOL ═══════ */}
      <group position={[0, 14.2, 0]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[10.6, 0.5, 6.6]} />
          <meshStandardMaterial color="#07111F" metalness={0.75} roughness={0.25} />
        </mesh>
        {/* Pool water surface */}
        <mesh ref={poolWaterRef} position={[0, 0.35, 0]}>
          <boxGeometry args={[7, 0.08, 3.5]} />
          <meshStandardMaterial color="#2662AB" emissive="#2662AB" emissiveIntensity={2.5} roughness={0.05} />
        </mesh>
        {/* Pool railing */}
        <mesh position={[0, 0.6, 3.2]}>
          <boxGeometry args={[10.6, 0.8, 0.06]} />
          <meshPhysicalMaterial color="#387BCB" transmission={0.5} transparent opacity={0.5} roughness={0.1} metalness={0.8} />
        </mesh>
        <pointLight position={[0, 1.2, 0]} intensity={4.0} color="#2662AB" distance={12} />
      </group>


      {/* ═══════ 8. HELIPAD ═══════ */}
      <group position={[0, 14.8, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
          <ringGeometry args={[0.9, 1.3, 32]} />
          <meshStandardMaterial color="#C8A96B" emissive="#C8A96B" emissiveIntensity={2.0} />
        </mesh>
        {/* H marking */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
          <planeGeometry args={[0.5, 1.0]} />
          <meshStandardMaterial color="#F5F1E8" emissive="#F5F1E8" emissiveIntensity={0.5} />
        </mesh>
        <pointLight position={[0, 0.8, 0]} intensity={3.0} color="#C8A96B" distance={6} />
      </group>


      {/* ═══════ 9. WATER FEATURE & FOUNTAIN ═══════ */}
      <group position={[0, 0, 10]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <circleGeometry args={[3, 32]} />
          <meshStandardMaterial color="#0B1F3A" emissive="#123B70" emissiveIntensity={1.0} roughness={0.1} />
        </mesh>
        {/* Inner fountain ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
          <ringGeometry args={[1.0, 1.3, 24]} />
          <meshStandardMaterial color="#C8A96B" emissive="#C8A96B" emissiveIntensity={0.8} />
        </mesh>
        {/* Fountain jet */}
        <mesh ref={fountainRef} position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.08, 0.03, 1.6, 8]} />
          <meshStandardMaterial color="#387BCB" emissive="#387BCB" emissiveIntensity={2.0} transparent opacity={0.6} />
        </mesh>
        <pointLight position={[0, 1.5, 0]} intensity={4.0} color="#387BCB" distance={10} />
      </group>


      {/* ═══════ 10. PERIMETER PATHWAY LIGHTING ═══════ */}
      {[
        [-6, 0.6, 10], [6, 0.6, 10], [-10, 0.6, 5], [10, 0.6, 5],
        [-10, 0.6, -5], [10, 0.6, -5], [-6, 0.6, -8], [6, 0.6, -8],
        [0, 0.6, -8], [-14, 0.6, 10], [14, 0.6, 10]
      ].map((pos, idx) => (
        <group key={`lamp-${idx}`} position={pos as [number, number, number]}>
          <mesh>
            <cylinderGeometry args={[0.06, 0.06, 1.2, 8]} />
            <meshStandardMaterial color="#0B1F3A" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.7, 0]}>
            <sphereGeometry args={[0.15, 12, 12]} />
            <meshStandardMaterial color="#C8A96B" emissive="#C8A96B" emissiveIntensity={3.0} />
          </mesh>
          <pointLight position={[0, 0.8, 0]} intensity={1.5} color="#E8D49B" distance={5} />
        </group>
      ))}

    </group>
  );
}
