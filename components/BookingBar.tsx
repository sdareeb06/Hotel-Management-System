'use client';

import React from 'react';
import { Calendar, Search, MapPin, Users } from 'lucide-react';

interface BookingBarProps {
  onOpenBooking: () => void;
}

export default function BookingBar({ onOpenBooking }: BookingBarProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div 
        onClick={onOpenBooking}
        className="glass-panel-gold rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 cursor-pointer hover:border-[#C8A96B] transition-all group shadow-[0_15px_40px_rgba(7,17,31,0.7)]"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto flex-1">
          {/* Destination */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#07111F]/60 border border-[#123B70]">
            <MapPin className="w-4 h-4 text-[#C8A96B] shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[9px] uppercase tracking-widest text-[#C8A96B]">Location</span>
              <span className="text-xs font-serif text-[#F5F1E8]">Sapphire Grand Resort</span>
            </div>
          </div>

          {/* Check In / Out */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#07111F]/60 border border-[#123B70]">
            <Calendar className="w-4 h-4 text-[#C8A96B] shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[9px] uppercase tracking-widest text-[#C8A96B]">Dates</span>
              <span className="text-xs font-serif text-[#F5F1E8]">Select Check-in / Out</span>
            </div>
          </div>

          {/* Guests */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#07111F]/60 border border-[#123B70]">
            <Users className="w-4 h-4 text-[#C8A96B] shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[9px] uppercase tracking-widest text-[#C8A96B]">Guests & Rooms</span>
              <span className="text-xs font-serif text-[#F5F1E8]">2 Guests, 1 Suite</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button 
          onClick={onOpenBooking}
          className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C8A96B] to-[#A68848] text-[#07111F] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 group-hover:shadow-[0_0_25px_rgba(200,169,107,0.5)] transition-all shrink-0"
        >
          <Search className="w-4 h-4" />
          <span>Search Rooms</span>
        </button>
      </div>
    </div>
  );
}
