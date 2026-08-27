'use client';

import React, { useState } from 'react';
import { X, Sparkles, RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { RoomItem } from '@/lib/mock-data';

interface Simulated360ModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: RoomItem;
}

export default function Simulated360Modal({ isOpen, onClose, room }: Simulated360ModalProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  if (!isOpen) return null;

  const images = room.images && room.images.length > 0 ? room.images : [room.image];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl bg-white border border-[#CBD5E1] rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(10,23,44,0.3)]">
        
        {/* Prominent Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-3 rounded-full bg-[#0A172C] text-white hover:bg-[#B8860B] shadow-xl transition-all cursor-pointer flex items-center justify-center"
          title="Close 360 View"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-white border-b border-[#CBD5E1] pr-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0A172C] text-white flex items-center justify-center">
              <RotateCw className="w-5 h-5 animate-spin" style={{ animationDuration: '12s' }} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8860B] font-bold">INTERACTIVE VIRTUAL TOUR</span>
              <h3 className="text-xl font-serif font-bold text-[#0A172C]">{room.name} — 360° Panorama</h3>
            </div>
          </div>
        </div>

        {/* 360 Viewport Container */}
        <div className="relative w-full h-[450px] sm:h-[550px] overflow-hidden bg-black flex items-center justify-center group">
          <img
            src={images[currentIdx]}
            alt={`${room.name} 360 view`}
            className="w-full h-full object-cover transition-all duration-700 scale-100"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-6 p-4 rounded-full bg-black/60 border border-white/30 text-white hover:bg-[#B8860B] transition-all cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-6 p-4 rounded-full bg-black/60 border border-white/30 text-white hover:bg-[#B8860B] transition-all cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Center 360 Badge */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-2.5 rounded-full bg-black/80 border border-[#B8860B]/50 backdrop-blur-md text-xs text-[#D4AF37] font-serif tracking-widest uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Interactive 360° Angle {currentIdx + 1} of {images.length}</span>
          </div>
        </div>

        {/* Bottom Details */}
        <div className="p-6 bg-[#F8FAFC] border-t border-[#CBD5E1] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#475569]">
            <span className="text-[#0A172C] font-serif font-bold text-sm block">{room.view}</span>
            <span>{room.size} • {room.bed} • Up to {room.guests} Guests</span>
          </div>

          <div className="text-right">
            <span className="text-2xl font-serif font-bold text-[#0A172C]">${room.price}</span>
            <span className="text-xs text-[#475569]"> / night</span>
          </div>
        </div>

      </div>
    </div>
  );
}
