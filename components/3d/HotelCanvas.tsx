'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import SapphireArchitecturalResort from './SapphireArchitecturalResort';
import CameraController from './CameraController';
import DigitalTwinHotspots, { HotspotData } from './DigitalTwinHotspots';

interface HotelCanvasProps {
  scrollProgress: number;
  activeHotspot: HotspotData | null;
  onSelectHotspot: (hotspot: HotspotData) => void;
  showHotspots?: boolean;
  isInteractiveMode?: boolean;
  onToggleInteractive?: () => void;
}

export default function HotelCanvas({
  scrollProgress,
  activeHotspot,
  onSelectHotspot,
  showHotspots = true,
  isInteractiveMode = false,
  onToggleInteractive
}: HotelCanvasProps) {
  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-[#050C18]">
      <Canvas
        dpr={[0.75, 1.25]} // High performance DPR scaling (0.75 for mobile, up to 1.25 for desktop)
        camera={{ position: [16, 9, 22], fov: 38, near: 0.1, far: 600 }}
        gl={{ 
          antialias: true, 
          alpha: false, 
          powerPreference: 'high-performance',
          precision: 'mediump'
        }}
        className="w-full h-full"
      >
        <color attach="background" args={['#050C18']} />
        <fog attach="fog" args={['#050C18', 25, 80]} />

        {/* 2 Lightweight Lighting Sources (High-FPS mobile compatible) */}
        <ambientLight intensity={1.8} color="#F5F1E8" />
        <directionalLight
          position={[20, 30, 20]}
          intensity={2.5}
          color="#FFF8EC"
        />
        <directionalLight
          position={[-15, 15, -10]}
          intensity={1.0}
          color="#123B70"
        />

        {/* Lightweight Stars Background */}
        <Stars radius={50} depth={30} count={350} factor={2} saturation={0} fade speed={0.5} />

        <Suspense fallback={null}>
          <SapphireArchitecturalResort />
          
          <DigitalTwinHotspots 
            activeHotspot={activeHotspot} 
            onSelectHotspot={onSelectHotspot}
            visible={showHotspots}
          />
        </Suspense>

        {/* VR Spatial Camera Controller */}
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
                ? 'bg-[#C8A96B] text-[#07111F] border-[#F5F1E8] font-bold shadow-[0_0_20px_rgba(200,169,107,0.6)]'
                : 'bg-[#0B1F3A]/90 text-[#F5F1E8] border-[#C8A96B]/50 hover:border-[#C8A96B]'
            }`}
          >
            {isInteractiveMode ? 'FREE ORBIT MODE' : 'GUIDED TOUR MODE'}
          </button>
        </div>
      )}
    </div>
  );
}
