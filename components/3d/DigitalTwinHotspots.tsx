'use client';

import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { Sparkles, Compass } from 'lucide-react';

export interface HotspotData {
  id: string;
  name: string;
  category: string;
  position: [number, number, number];
  cameraTarget: [number, number, number];
  cameraPos: [number, number, number];
  description: string;
}

export const HOTSPOTS: HotspotData[] = [
  {
    id: 'lobby',
    name: 'THE GRAND LOBBY',
    category: 'Entrance & Concierge',
    position: [0, 1.2, 3.5],
    cameraPos: [0, 2.5, 7.5],
    cameraTarget: [0, 1.2, 0],
    description: 'An elegant arrival experience designed around natural light, Italian marble, warm metallic brass accents and 24/7 digital concierge service.'
  },
  {
    id: 'rooms',
    name: 'LUXURY SUITES',
    category: 'Accommodations',
    position: [-2.8, 4.2, 1.2],
    cameraPos: [-6.5, 6.0, 6.5],
    cameraTarget: [-2.5, 4.0, 0],
    description: 'Private sanctuaries designed around pure acoustic isolation, fine linens, floor-to-ceiling glass, and smart room automation.'
  },
  {
    id: 'dining',
    name: 'SIGNATURE DINING',
    category: 'Gastronomy',
    position: [3.2, 2.0, 2.0],
    cameraPos: [7.0, 4.5, 5.5],
    cameraTarget: [3.0, 2.0, 0],
    description: 'An elevated culinary destination featuring Three Michelin Star gastronomy, rare estate wine cellars, and sky lounge mixology.'
  },
  {
    id: 'spa',
    name: 'WELLNESS & SPA',
    category: 'Rejuvenation',
    position: [3.5, 1.0, -2.5],
    cameraPos: [7.5, 3.5, -4.5],
    cameraTarget: [3.0, 1.0, -2.0],
    description: 'A serene sanctuary dedicated to organic hydrotherapy, Himalayan salt sauna pavilions, and private holistic treatments.'
  },
  {
    id: 'pool',
    name: 'INFINITY SKY POOL',
    category: 'Leisure',
    position: [0, 6.8, -0.5],
    cameraPos: [0, 9.5, 5.0],
    cameraTarget: [0, 6.5, -0.5],
    description: 'A refined leisure deck featuring a 50m temperature-controlled floating pool overlooking panoramic skyline sunsets.'
  }
];

interface DigitalTwinHotspotsProps {
  activeHotspot: HotspotData | null;
  onSelectHotspot: (hotspot: HotspotData) => void;
  visible?: boolean;
}

export default function DigitalTwinHotspots({
  activeHotspot,
  onSelectHotspot,
  visible = true
}: DigitalTwinHotspotsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (!visible) return null;

  return (
    <group>
      {HOTSPOTS.map((hotspot) => {
        const isActive = activeHotspot?.id === hotspot.id;
        const isHovered = hoveredId === hotspot.id;

        return (
          <group key={hotspot.id} position={hotspot.position}>
            {/* Sleek, Non-Intrusive 3D Glowing Orb Marker */}
            <Html center distanceFactor={14}>
              <div 
                className="relative cursor-pointer pointer-events-auto select-none group"
                onClick={() => onSelectHotspot(hotspot)}
                onMouseEnter={() => setHoveredId(hotspot.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Outer Pulsing Aura */}
                <div className={`absolute -inset-2 rounded-full transition-all duration-500 ${
                  isActive || isHovered 
                    ? 'bg-[#C8A96B]/50 animate-ping' 
                    : 'bg-[#C8A96B]/20'
                }`} />

                {/* Minimal Glowing Gold Pin Point */}
                <div className={`relative flex items-center justify-center w-5 h-5 rounded-full border transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#C8A96B] border-[#F5F1E8] scale-125 shadow-[0_0_20px_#C8A96B]'
                    : isHovered
                    ? 'bg-[#C8A96B] border-[#C8A96B] scale-110 shadow-[0_0_15px_#C8A96B]'
                    : 'bg-[#07111F]/90 border-[#C8A96B]/60 hover:border-[#C8A96B]'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#07111F]' : 'bg-[#C8A96B]'}`} />
                </div>

                {/* Tooltip Card Shown ONLY on Hover or Selection */}
                {(isHovered || isActive) && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-48 p-3 rounded-xl bg-[#0B1F3A]/95 border border-[#C8A96B]/40 backdrop-blur-xl text-left shadow-2xl z-50 animate-in fade-in duration-200">
                    <span className="text-[9px] uppercase tracking-widest text-[#C8A96B] font-semibold block mb-0.5">
                      {hotspot.category}
                    </span>
                    <h5 className="font-serif text-xs text-[#F5F1E8] font-bold">{hotspot.name}</h5>
                    <p className="text-[10px] text-[#8B96A8] mt-1 line-clamp-2">{hotspot.description}</p>
                  </div>
                )}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
