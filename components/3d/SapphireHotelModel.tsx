'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface SapphireHotelModelProps {
  onLoaded?: () => void;
}

export default function SapphireHotelModel({ onLoaded }: SapphireHotelModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/sapphire-grand-hotel.glb');

  useLayoutEffect(() => {
    if (!scene) return;

    // Enhance materials & enable shadows for high-end architectural rendering
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          // Clone material to avoid shared texture state issues
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          mat.envMapIntensity = 2.5;
          mat.roughness = 0.35;
          mat.metalness = 0.45;
          mat.needsUpdate = true;
          mesh.material = mat;
        }
      }
    });

    // Auto-center and normalize scale based on bounding box
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);
    const targetScale = 14 / (maxDim || 1); // Fills 65-75% of view grid

    scene.position.x = -center.x * targetScale;
    scene.position.y = -box.min.y * targetScale; // Place ground at Y = 0
    scene.position.z = -center.z * targetScale;
    scene.scale.setScalar(targetScale);

    if (onLoaded) onLoaded();
  }, [scene, onLoaded]);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive object={scene} />

      {/* Architectural Façade Warm Gold Accent Lights */}
      <pointLight position={[0, 3, 4]} intensity={4.0} color="#C8A96B" distance={15} />
      <pointLight position={[-3, 6, 2]} intensity={3.5} color="#E8D49B" distance={18} />
      <pointLight position={[3, 6, 2]} intensity={3.5} color="#387BCB" distance={18} />
      <pointLight position={[0, 10, 0]} intensity={3.0} color="#F5F1E8" distance={20} />

      {/* Reflective Dark Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial 
          color="#050B14" 
          roughness={0.4} 
          metalness={0.6}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload('/models/sapphire-grand-hotel.glb');
