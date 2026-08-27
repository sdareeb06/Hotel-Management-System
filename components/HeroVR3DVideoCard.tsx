'use client';

import React, { useRef, useState } from 'react';

interface HeroVR3DVideoCardProps {
  imageSrc: string;
  altText?: string;
  className?: string;
}

export default function HeroVR3DVideoCard({
  imageSrc,
  altText = 'Sapphire Grand Resort 360 Cover',
  className = ''
}: HeroVR3DVideoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(10,23,44,0.18)] border border-[#CBD5E1] bg-[#0A172C] select-none ${className}`}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* CONTINUOUS 360 ADVERT ORBIT WRAPPER */}
      <div
        className="w-full h-full relative overflow-hidden transition-transform duration-500 ease-out"
        style={{
          transform: isHovered
            ? `rotateY(${mousePos.x * 14}deg) rotateX(${mousePos.y * -14}deg) scale3d(1.04, 1.04, 1)`
            : 'rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* CLEAN CONTINUOUS 360 PANNING IMAGE (No text overlay inside image box) */}
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-full object-cover animate-hero-ad-orbit"
          style={{
            willChange: 'transform'
          }}
        />

        {/* Dynamic Light Sheen Flare */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30 bg-gradient-to-tr from-transparent via-white/30 to-transparent animate-ad-sheen"
        />
      </div>
    </div>
  );
}
