'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Sparkles, Stars } from '@react-three/drei';
import SapphireArchitecturalResort from './SapphireArchitecturalResort';
import CameraController from './CameraController';
import DigitalTwinHotspots, { HotspotData } from './DigitalTwinHotspots';
import LoadingScreen from './LoadingScreen';

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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full select-none overflow-hidden">
      {!isLoaded && <LoadingScreen progress={90} />}

      <Canvas
        shadows
        dpr={[1, 1.5]} // Performance optimized DPR cap for smooth 60fps scrolling
        camera={{ position: [16, 9, 22], fov: 38, near: 0.1, far: 800 }}
        gl={{ 
          antialias: true, 
          alpha: false, 
          powerPreference: 'high-performance',
          precision: 'mediump'
        }}
        onCreated={() => setIsLoaded(true)}
        className="w-full h-full"
      >
        <color attach="background" args={['#050C18']} />
        <fog attach="fog" args={['#050C18', 25, 75]} />

        {/* Optimized Lighting Setup */}
        <ambientLight intensity={1.6} color="#F5F1E8" />
        <directionalLight
          position={[20, 30, 20]}
          intensity={2.8}
          color="#FFF8EC"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />
        <directionalLight position={[-18, 15, -12]} intensity={1.2} color="#2662AB" />

        {/* Lightweight Environment & Atmosphere */}
        <Environment preset="city" />
        <Stars radius={50} depth={40} count={600} factor={3} saturation={0} fade speed={0.8} />
        <Sparkles count={40} scale={25} size={3} speed={0.3} color="#C8A96B" />

        <Suspense fallback={null}>
          <SapphireArchitecturalResort onLoaded={() => setIsLoaded(true)} />
          
          <DigitalTwinHotspots 
            activeHotspot={activeHotspot} 
            onSelectHotspot={onSelectHotspot}
            visible={showHotspots}
          />
        </Suspense>

        {/* Lightweight Ground Shadow */}
        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.6}
          scale={40}
          blur={1.5}
          far={10}
          color="#02050A"
        />

        {/* VR Spatial Camera Rig Controller */}
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
      {isLoaded && (
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
          {onToggleInteractive && (
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
          )}
        </div>
      )}
    </div>
  );
}
