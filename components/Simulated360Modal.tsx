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
  const [isRotating, setIsRotating] = useState(false);

  if (!isOpen) return null;

  const images = room.images && room.images.length > 0 ? room.images : [room.image];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07111F]/90 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl bg-[#0B1F3A] border border-[#C8A96B]/40 rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(7,17,31,0.95)]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-[#07111F] border-b border-[#C8A96B]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#123B70] border border-[#C8A96B]/40 flex items-center justify-center text-[#C8A96B]">
              <RotateCw className="w-5 h-5 animate-spin" style={{ animationDuration: '12s' }} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A96B]">INTERACTIVE VIRTUAL TOUR</span>
              <h3 className="text-xl font-serif text-[#F5F1E8]">{room.name} — 360° Panorama</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#8B96A8] hover:text-[#F5F1E8] rounded-full hover:bg-white/5 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 360 Viewport Container */}
        <div className="relative w-full h-[450px] sm:h-[550px] overflow-hidden bg-black flex items-center justify-center group">
          <img
            src={images[currentIdx]}
            alt={`${room.name} 360 view`}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isRotating ? 'scale-105 filter brightness-105' : 'scale-100'
            }`}
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-transparent to-[#07111F]/40 pointer-events-none" />

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-6 p-4 rounded-full bg-[#07111F]/70 border border-[#C8A96B]/30 text-[#F5F1E8] hover:bg-[#C8A96B] hover:text-[#07111F] transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-6 p-4 rounded-full bg-[#07111F]/70 border border-[#C8A96B]/30 text-[#F5F1E8] hover:bg-[#C8A96B] hover:text-[#07111F] transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Center 360 Badge */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#07111F]/80 border border-[#C8A96B]/50 backdrop-blur-md text-xs text-[#C8A96B] font-serif tracking-widest uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Interactive 360° Angle {currentIdx + 1} of {images.length}</span>
          </div>
        </div>

        {/* Bottom Details */}
        <div className="p-6 bg-[#07111F] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#8B96A8]">
            <span className="text-[#F5F1E8] font-serif text-sm block">{room.view}</span>
            <span>{room.size} • {room.bed} • Up to {room.guests} Guests</span>
          </div>

          <div className="text-right">
            <span className="text-2xl font-serif text-[#C8A96B]">${room.price}</span>
            <span className="text-xs text-[#8B96A8]"> / night</span>
          </div>
        </div>

      </div>
    </div>
  );
}
