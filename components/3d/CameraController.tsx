'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { HotspotData } from './DigitalTwinHotspots';

interface CameraControllerProps {
  scrollProgress: number;
  activeHotspot: HotspotData | null;
  isInteractiveMode: boolean;
}

// 3D Architectural Trajectory: Offset target (X = 4.5 to 6.0) so 3D model stays framed on the RIGHT HALF of the viewport
// Left half remains completely clear for text cards with zero overlapping!
const SCROLL_KEYFRAMES = [
  { progress: 0.00, pos: new THREE.Vector3(18, 9, 20), target: new THREE.Vector3(5.0, 3.0, 0) },
  { progress: 0.12, pos: new THREE.Vector3(10, 4.5, 14), target: new THREE.Vector3(4.0, 2.0, 0) },
  { progress: 0.25, pos: new THREE.Vector3(-14, 9, 18), target: new THREE.Vector3(6.0, 3.5, 0) },
  { progress: 0.38, pos: new THREE.Vector3(15, 11, 16), target: new THREE.Vector3(5.0, 4.0, 0) },
  { progress: 0.50, pos: new THREE.Vector3(-12, 8, 14), target: new THREE.Vector3(5.5, 4.5, 0) },
  { progress: 0.65, pos: new THREE.Vector3(14, 11, 14), target: new THREE.Vector3(4.5, 5.0, 0) },
  { progress: 0.78, pos: new THREE.Vector3(15, 6, -8), target: new THREE.Vector3(5.0, 2.0, -2) },
  { progress: 0.90, pos: new THREE.Vector3(-15, 12, 16), target: new THREE.Vector3(5.5, 3.0, 0) },
  { progress: 1.00, pos: new THREE.Vector3(12, 15, 22), target: new THREE.Vector3(4.0, 3.0, 0) }
];

export default function CameraController({
  scrollProgress,
  activeHotspot,
  isInteractiveMode
}: CameraControllerProps) {
  const { camera } = useThree();
  const currentTarget = useRef(new THREE.Vector3(5.0, 3.0, 0));
  const desiredPos = useRef(new THREE.Vector3(18, 9, 20));
  const desiredTarget = useRef(new THREE.Vector3(5.0, 3.0, 0));

  useEffect(() => {
    if (activeHotspot) {
      desiredPos.current.set(...activeHotspot.cameraPos);
      desiredTarget.current.set(...activeHotspot.cameraTarget);
      return;
    }

    if (isInteractiveMode) return;

    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
    
    for (let i = 0; i < SCROLL_KEYFRAMES.length - 1; i++) {
      const k1 = SCROLL_KEYFRAMES[i];
      const k2 = SCROLL_KEYFRAMES[i + 1];

      if (clampedProgress >= k1.progress && clampedProgress <= k2.progress) {
        const factor = (clampedProgress - k1.progress) / (k2.progress - k1.progress);
        desiredPos.current.lerpVectors(k1.pos, k2.pos, factor);
        desiredTarget.current.lerpVectors(k1.target, k2.target, factor);
        break;
      }
    }
  }, [scrollProgress, activeHotspot, isInteractiveMode]);

  useFrame((state, delta) => {
    if (isInteractiveMode && !activeHotspot) return;

    const damping = Math.min(1, delta * 4.5);

    const time = state.clock.getElapsedTime();
    const bobY = Math.sin(time * 0.5) * 0.06;
    const bobX = Math.cos(time * 0.3) * 0.04;

    const tempPos = desiredPos.current.clone();
    tempPos.y += bobY;
    tempPos.x += bobX;

    camera.position.lerp(tempPos, damping);
    currentTarget.current.lerp(desiredTarget.current, damping);
    camera.lookAt(currentTarget.current);
  });

  return null;
}
