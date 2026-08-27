'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import SapphireArchitecturalResort from './SapphireArchitecturalResort';
import CameraController from './CameraController';

export interface HotelCanvasProps {
  scrollProgress: number;
  activeHotspot?: any;
  onSelectHotspot?: (hotspot: any) => void;
  showHotspots?: boolean;
  isInteractiveMode?: boolean;
  onToggleInteractive?: () => void;
}

export default function HotelCanvas({
  scrollProgress,
  activeHotspot = null,
  isInteractiveMode = false,
  onToggleInteractive
}: HotelCanvasProps) {
  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-[#F1F5F9]">
      <Canvas
        shadows
        dpr={[1, 2]} // High-resolution sharp rendering (No Blurriness)
        camera={{ position: [16, 9, 22], fov: 34, near: 0.1, far: 500 }}
        gl={{ 
          antialias: true, 
          alpha: false, 
          powerPreference: 'high-performance',
          precision: 'highp',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3
        }}
        className="w-full h-full"
      >
        {/* Soft Sky & Crisp Edge Fog */}
        <color attach="background" args={['#F1F5F9']} />
        <fog attach="fog" args={['#F1F5F9', 28, 90]} />

        {/* Photorealistic High-Contrast Sunlight & Shadow Lighting */}
        <ambientLight intensity={2.2} color="#FFFFFF" />
        <directionalLight
          position={[30, 40, 25]}
          intensity={3.8}
          color="#FFFDF7"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
        />
        <directionalLight
          position={[-25, 20, -20]}
          intensity={1.5}
          color="#93C5FD"
        />

        <Suspense fallback={null}>
          <SapphireArchitecturalResort />
        </Suspense>

        {/* Spatial Camera Controller */}
        <CameraController
          scrollProgress={scrollProgress}
          activeHotspot={activeHotspot}
          isInteractiveMode={isInteractiveMode}
        />
      </Canvas>

      {/* Mode Control Indicator Badge */}
      {onToggleInteractive && (
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
          <button
            onClick={onToggleInteractive}
            className={`px-4 py-2.5 rounded-full border text-xs font-serif tracking-widest transition-all backdrop-blur-md shadow-lg cursor-pointer ${
              isInteractiveMode
                ? 'bg-[#0A172C] text-[#FFFFFF] border-[#D4AF37] font-bold shadow-[0_0_20px_rgba(10,23,44,0.4)]'
                : 'bg-white text-[#0A172C] border-[#CBD5E1] hover:border-[#0A172C]'
            }`}
          >
            {isInteractiveMode ? 'FREE ORBIT MODE' : 'GUIDED TOUR MODE'}
          </button>
        </div>
      )}
    </div>
  );
}
