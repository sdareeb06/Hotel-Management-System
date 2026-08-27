'use client';

import React, { useRef, useEffect, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  delay?: number;
  duration?: number;
  className?: string;
  distance?: number;
}

export default function ScrollReveal({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 800,
  className = '',
  distance = 60
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0,0,0) scale(1) rotateX(0deg)';
    switch (direction) {
      case 'up': return `translate3d(0, ${distance}px, -30px) rotateX(4deg)`;
      case 'down': return `translate3d(0, -${distance}px, -30px) rotateX(-4deg)`;
      case 'left': return `translate3d(${distance}px, 0, -20px) rotateY(-3deg)`;
      case 'right': return `translate3d(-${distance}px, 0, -20px) rotateY(3deg)`;
      case 'scale': return 'translate3d(0, 30px, -50px) scale(0.92) rotateX(3deg)';
      case 'fade': return 'translate3d(0, 20px, 0) scale(0.98)';
      default: return `translate3d(0, ${distance}px, -30px)`;
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: getTransform(),
        opacity: isVisible ? 1 : 0,
        transition: `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity ${duration * 0.7}ms ease ${delay}ms`,
        willChange: 'transform, opacity',
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
}
