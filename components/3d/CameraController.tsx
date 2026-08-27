'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraControllerProps {
  scrollProgress: number;
  activeHotspot?: any;
  isInteractiveMode?: boolean;
}

// Cinematic Short-Style Dynamic Zoom & Rotational Fly-Through Keyframes
const SCROLL_KEYFRAMES = [
  { progress: 0.00, pos: new THREE.Vector3(12, 6, 16), target: new THREE.Vector3(4.5, 2.5, 0), fov: 42 },
  { progress: 0.15, pos: new THREE.Vector3(7, 3.2, 10), target: new THREE.Vector3(3.5, 1.8, 0), fov: 32 },
  { progress: 0.30, pos: new THREE.Vector3(-14, 8, 16), target: new THREE.Vector3(5.5, 3.5, 0), fov: 44 },
  { progress: 0.45, pos: new THREE.Vector3(6, 15, 8), target: new THREE.Vector3(4.0, 3.0, 0), fov: 30 },
  { progress: 0.60, pos: new THREE.Vector3(16, 5, 12), target: new THREE.Vector3(5.0, 2.2, 0), fov: 36 },
  { progress: 0.75, pos: new THREE.Vector3(-10, 12, 14), target: new THREE.Vector3(4.5, 4.0, 0), fov: 40 },
  { progress: 0.90, pos: new THREE.Vector3(14, 14, 18), target: new THREE.Vector3(4.0, 3.0, 0), fov: 38 },
  { progress: 1.00, pos: new THREE.Vector3(10, 12, 20), target: new THREE.Vector3(3.5, 2.5, 0), fov: 40 }
];

export default function CameraController({
  scrollProgress,
  activeHotspot,
  isInteractiveMode = false
}: CameraControllerProps) {
  const { camera } = useThree();
  const currentTarget = useRef(new THREE.Vector3(4.5, 2.5, 0));
  const desiredPos = useRef(new THREE.Vector3(12, 6, 16));
  const desiredTarget = useRef(new THREE.Vector3(4.5, 2.5, 0));
  const desiredFov = useRef(42);

  useEffect(() => {
    if (activeHotspot && activeHotspot.cameraPos && activeHotspot.cameraTarget) {
      desiredPos.current.set(activeHotspot.cameraPos[0], activeHotspot.cameraPos[1], activeHotspot.cameraPos[2]);
      desiredTarget.current.set(activeHotspot.cameraTarget[0], activeHotspot.cameraTarget[1], activeHotspot.cameraTarget[2]);
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
        desiredFov.current = k1.fov + (k2.fov - k1.fov) * factor;
        break;
      }
    }
  }, [scrollProgress, activeHotspot, isInteractiveMode]);

  useFrame((state, delta) => {
    if (isInteractiveMode && !activeHotspot) return;

    const damping = Math.min(1, delta * 6.5);

    const time = state.clock.getElapsedTime();
    const bobY = Math.sin(time * 0.8) * 0.08;
    const bobX = Math.cos(time * 0.6) * 0.06;

    const tempPos = desiredPos.current.clone();
    tempPos.y += bobY;
    tempPos.x += bobX;

    camera.position.lerp(tempPos, damping);
    currentTarget.current.lerp(desiredTarget.current, damping);
    camera.lookAt(currentTarget.current);

    if ('fov' in camera) {
      const perspectiveCam = camera as THREE.PerspectiveCamera;
      perspectiveCam.fov += (desiredFov.current - perspectiveCam.fov) * damping;
      perspectiveCam.updateProjectionMatrix();
    }
  });

  return null;
}
