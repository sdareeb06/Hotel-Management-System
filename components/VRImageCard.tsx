'use client';

import React, { useState } from 'react';

interface VRImageCardProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

export default function VRImageCard({
  src,
  alt,
  className = 'h-56 sm:h-64 w-full',
  aspectRatio
}: VRImageCardProps) {
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Smooth 3D tilt math
    const rotateX = (-y / rect.height) * 12;
    const rotateY = (x / rect.width) * 12;
    
    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.03)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
  };

  return (
    <div 
      className={`relative overflow-hidden rounded-2xl group border border-[#D4AF37]/30 bg-[#0B1320] shadow-xl ${className} ${aspectRatio || ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform'
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        loading="lazy"
      />
      {/* Subtle luxury ambient sheen overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute inset-0 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/40 rounded-2xl transition-colors duration-500 pointer-events-none" />
    </div>
  );
}
