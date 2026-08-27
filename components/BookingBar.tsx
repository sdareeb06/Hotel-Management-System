'use client';

import React from 'react';
import { Calendar, Search, MapPin, Users } from 'lucide-react';

interface BookingBarProps {
  onOpenBooking: () => void;
}

export default function BookingBar({ onOpenBooking }: BookingBarProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4">
      <div 
        onClick={onOpenBooking}
        className="rounded-2xl p-3 sm:p-4 bg-white border border-[#CBD5E1] shadow-[0_15px_40px_rgba(10,23,44,0.08)] flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 cursor-pointer hover:border-[#0A172C] transition-all group"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 w-full md:w-auto flex-1">
          {/* Location */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1]">
            <MapPin className="w-4 h-4 text-[#B8860B] shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[9px] uppercase tracking-widest text-[#B8860B] font-bold">Location</span>
              <span className="text-xs font-serif font-bold text-[#0A172C]">Sapphire Grand Resort</span>
            </div>
          </div>

          {/* Check In / Out */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1]">
            <Calendar className="w-4 h-4 text-[#B8860B] shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[9px] uppercase tracking-widest text-[#B8860B] font-bold">Dates</span>
              <span className="text-xs font-serif font-bold text-[#0A172C]">Select Check-in / Out</span>
            </div>
          </div>

          {/* Guests */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1]">
            <Users className="w-4 h-4 text-[#B8860B] shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[9px] uppercase tracking-widest text-[#B8860B] font-bold">Guests & Rooms</span>
              <span className="text-xs font-serif font-bold text-[#0A172C]">2 Guests, 1 Suite</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button 
          onClick={onOpenBooking}
          className="w-full md:w-auto px-7 py-3 sm:py-3.5 rounded-xl bg-[#0A172C] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#B8860B] transition-all shrink-0 cursor-pointer shadow-md"
        >
          <Search className="w-4 h-4 text-[#D4AF37]" />
          <span>Search Rooms</span>
        </button>
      </div>
    </div>
  );
}
