'use client';

import React, { useRef, useEffect, useState, ReactNode } from 'react';

interface VRScrollRotateCardProps {
  children: ReactNode;
  className?: string;
  maxRotation?: number;
}

export default function VRScrollRotateCard({
  children,
  className = '',
  maxRotation = 8
}: VRScrollRotateCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [styleState, setStyleState] = useState({
    transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0px) scale3d(1, 1, 1)',
    boxShadow: '0 10px 30px rgba(10, 23, 44, 0.05)'
  });

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            const cardCenter = rect.top + rect.height / 2;
            const viewportCenter = windowHeight / 2;
            const progress = (cardCenter - viewportCenter) / (windowHeight / 2);
            const clampedProgress = Math.max(-1.0, Math.min(1.0, progress));

            // Smooth video-ad commercial flow factor
            const focalFactor = Math.cos(clampedProgress * (Math.PI / 2)); // 0 at edges, 1 at center
            
            const rotateX = clampedProgress * -maxRotation;
            const rotateY = Math.sin(clampedProgress * Math.PI) * 4;
            const translateZ = focalFactor * 45; // Smooth +45px depth pop (prevents layout distortion)
            const scale = 0.98 + focalFactor * 0.03; // Smooth 1.01x focal zoom
            const shadowBlur = 15 + focalFactor * 30;
            const shadowOpacity = 0.05 + focalFactor * 0.10;

            setStyleState({
              transform: `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, 0, ${translateZ.toFixed(1)}px) scale3d(${scale.toFixed(3)}, ${scale.toFixed(3)}, 1)`,
              boxShadow: `0 ${shadowBlur.toFixed(0)}px ${(shadowBlur * 1.4).toFixed(0)}px rgba(10, 23, 44, ${shadowOpacity.toFixed(2)})`
            });
          }
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [maxRotation]);

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        transform: styleState.transform,
        boxShadow: styleState.boxShadow,
        transition: 'transform 400ms cubic-bezier(0.25, 1, 0.5, 1), box-shadow 400ms ease-out',
        willChange: 'transform, box-shadow',
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden'
      }}
    >
      {children}
    </div>
  );
}
