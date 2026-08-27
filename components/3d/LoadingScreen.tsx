'use client';

import React from 'react';

interface LoadingScreenProps {
  progress?: number;
}

export default function LoadingScreen({ progress = 0 }: LoadingScreenProps) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#050C18]">
      <div className="space-y-4 text-center">
        <div className="w-10 h-10 mx-auto border-2 border-[#C8A96B]/30 border-t-[#C8A96B] rounded-full animate-spin" />
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#C8A96B] font-semibold">
          Loading Property View...
        </p>
        <div className="w-40 h-0.5 bg-[#123B70] rounded-full mx-auto overflow-hidden">
          <div 
            className="h-full bg-[#C8A96B] rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
