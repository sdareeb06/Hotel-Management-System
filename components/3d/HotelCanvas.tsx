'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import SapphireArchitecturalResort from './SapphireArchitecturalResort';
import CameraController from './CameraController';
import { HotspotData } from './DigitalTwinHotspots';

interface HotelCanvasProps {
  scrollProgress: number;
  activeHotspot?: HotspotData | null;
  onSelectHotspot?: (hotspot: HotspotData) => void;
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
    <div className="relative w-full h-full select-none overflow-hidden bg-[#030712]">
      <Canvas
        dpr={1} // Nanosecond fast initialization & 120fps smooth performance
        camera={{ position: [16, 9, 22], fov: 38, near: 0.1, far: 500 }}
        gl={{ 
          antialias: true, 
          alpha: false, 
          powerPreference: 'high-performance',
          precision: 'mediump',
          preserveDrawingBuffer: false
        }}
        className="w-full h-full"
      >
        <color attach="background" args={['#030712']} />
        <fog attach="fog" args={['#030712', 25, 80]} />

        {/* 2 Lightweight Lighting Sources */}
        <ambientLight intensity={1.8} color="#F9F8F6" />
        <directionalLight
          position={[20, 30, 20]}
          intensity={2.5}
          color="#FFF8EC"
        />

        {/* Lightweight Stars Atmosphere */}
        <Stars radius={45} depth={25} count={250} factor={2} saturation={0} fade speed={0.4} />

        <Suspense fallback={null}>
          <SapphireArchitecturalResort />
        </Suspense>

        {/* Spatial Camera Controller */}
        <CameraController
          scrollProgress={scrollProgress}
          activeHotspot={activeHotspot}
          isInteractiveMode={isInteractiveMode}
        />

        {isInteractiveMode && (
          <OrbitControls 
            enableZoom={true} 
            enablePan={true}
            maxPolarAngle={Math.PI / 2 - 0.02}
            minDistance={5}
            maxDistance={45}
          />
        )}
      </Canvas>

      {/* Mode Control Indicator Badge */}
      {onToggleInteractive && (
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
          <button
            onClick={onToggleInteractive}
            className={`px-4 py-2.5 rounded-full border text-xs font-serif tracking-widest transition-all backdrop-blur-md shadow-2xl cursor-pointer ${
              isInteractiveMode
                ? 'bg-[#D4AF37] text-[#030712] border-[#F9F8F6] font-bold shadow-[0_0_20px_rgba(212,175,55,0.6)]'
                : 'bg-[#0B1320]/90 text-[#F9F8F6] border-[#D4AF37]/50 hover:border-[#D4AF37]'
            }`}
          >
            {isInteractiveMode ? 'FREE ORBIT MODE' : 'GUIDED TOUR MODE'}
          </button>
        </div>
      )}
    </div>
  );
}
