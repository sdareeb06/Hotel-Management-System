'use client';

import React from 'react';

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
  activeHotspot?: HotspotData | null;
  onSelectHotspot?: (hotspot: HotspotData) => void;
  visible?: boolean;
}

export default function DigitalTwinHotspots({}: DigitalTwinHotspotsProps) {
  // Completely removed yellow floating dot circles over building as requested
  return null;
}
