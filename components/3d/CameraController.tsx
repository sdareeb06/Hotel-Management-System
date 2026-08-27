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

// 3D Spatial Fly-Through Keyframes positioned to frame resort on right/center without colliding with left text cards
const SCROLL_KEYFRAMES = [
  { progress: 0.00, pos: new THREE.Vector3(16, 9, 22), target: new THREE.Vector3(-2, 2.5, 0) },
  { progress: 0.12, pos: new THREE.Vector3(8, 4.5, 16), target: new THREE.Vector3(-3, 2.0, 0) },
  { progress: 0.25, pos: new THREE.Vector3(-16, 9, 20), target: new THREE.Vector3(4, 3.0, 0) },
  { progress: 0.38, pos: new THREE.Vector3(14, 10, 18), target: new THREE.Vector3(-2, 3.5, 0) },
  { progress: 0.50, pos: new THREE.Vector3(-12, 8, 14), target: new THREE.Vector3(3, 4.5, 0) },
  { progress: 0.65, pos: new THREE.Vector3(12, 11, 14), target: new THREE.Vector3(-3, 5.0, 0) },
  { progress: 0.78, pos: new THREE.Vector3(14, 6, -8), target: new THREE.Vector3(0, 2.0, -2) },
  { progress: 0.90, pos: new THREE.Vector3(-16, 12, 18), target: new THREE.Vector3(2, 3.0, 0) },
  { progress: 1.00, pos: new THREE.Vector3(0, 16, 24), target: new THREE.Vector3(0, 2.0, 0) }
];

export default function CameraController({
  scrollProgress,
  activeHotspot,
  isInteractiveMode
}: CameraControllerProps) {
  const { camera } = useThree();
  const currentTarget = useRef(new THREE.Vector3(0, 2.0, 0));
  const desiredPos = useRef(new THREE.Vector3(16, 9, 22));
  const desiredTarget = useRef(new THREE.Vector3(-2, 2.5, 0));

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

    // Optimized camera lerp damping for smooth 60fps performance
    const damping = Math.min(1, delta * 4.0);

    const time = state.clock.getElapsedTime();
    const bobY = Math.sin(time * 0.5) * 0.08;
    const bobX = Math.cos(time * 0.3) * 0.05;

    const tempPos = desiredPos.current.clone();
    tempPos.y += bobY;
    tempPos.x += bobX;

    camera.position.lerp(tempPos, damping);
    currentTarget.current.lerp(desiredTarget.current, damping);
    camera.lookAt(currentTarget.current);
  });

  return null;
}
