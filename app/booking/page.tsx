'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIConcierge from '@/components/AIConcierge';
import { ROOMS_DATA, RoomItem } from '@/lib/mock-data';
import { Calendar, Check } from 'lucide-react';

const HotelCanvas = dynamic(() => import('@/components/3d/HotelCanvas'), {
  ssr: false
});

export default function BookingPage() {
  const [selectedRoom, setSelectedRoom] = useState<RoomItem>(ROOMS_DATA[0]);
  const [checkIn, setCheckIn] = useState('2026-09-01');
  const [checkOut, setCheckOut] = useState('2026-09-05');
  const [guests, setGuests] = useState(2);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmed(true);
  };

  return (
    <div className="relative text-[#F5F1E8] min-h-screen">
      
      {/* 3D VR BACKGROUND CANVAS */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-auto">
        <HotelCanvas
          scrollProgress={0.12} // Entrance canopy angle
          activeHotspot={null}
          onSelectHotspot={() => {}}
          showHotspots={false}
          isInteractiveMode={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050C18]/90 via-[#050C18]/65 to-[#050C18]/70 pointer-events-none" />
      </div>

      <div className="relative z-10 pointer-events-none">
        <Navbar />

        <section className="relative pt-36 pb-16 px-4 sm:px-8 pointer-events-auto">
          <div className="max-w-7xl mx-auto space-y-4 text-center p-8 sm:p-10 rounded-3xl backdrop-blur-xl bg-[#07111F]/70 border border-[#C8A96B]/30 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#123B70]/80 border border-[#C8A96B]/40 text-[#C8A96B] text-[10px] uppercase tracking-[0.3em] font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              <span>INSTANT RESERVATION PORTAL</span>
            </div>
            <h1 className="text-4xl sm:text-7xl font-serif text-[#F5F1E8]">RESERVE YOUR STAY</h1>
            <p className="text-sm sm:text-base text-[#8B96A8] max-w-xl mx-auto font-serif italic">
              Guaranteed instant confirmation for Sapphire King Suites, Executive Vistas, and Penthouse Residences.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-8 max-w-5xl mx-auto pointer-events-auto">
          {!isConfirmed ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Suite Selection Grid */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-xs uppercase tracking-widest text-[#C8A96B]">Select Accommodation</h3>
                
                <div className="space-y-4">
                  {ROOMS_DATA.map((room) => (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoom(room)}
                      className={`flex items-center justify-between p-5 rounded-3xl border cursor-pointer transition-all ${
                        selectedRoom.id === room.id
                          ? 'bg-[#123B70]/80 border-[#C8A96B] shadow-[0_0_20px_rgba(200,169,107,0.3)]'
                          : 'backdrop-blur-2xl bg-[#0B1F3A]/85 border-[#123B70] hover:border-[#C8A96B]/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-20 h-20 rounded-xl object-cover border border-[#C8A96B]/30"
                        />
                        <div>
                          <h4 className="font-serif text-lg text-[#F5F1E8]">{room.name}</h4>
                          <p className="text-xs text-[#8B96A8]">{room.size} • {room.bed}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xl font-serif text-[#C8A96B]">${room.price}</span>
                        <span className="block text-[10px] text-[#8B96A8]">/ night</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Form Card */}
              <form onSubmit={handleSubmit} className="lg:col-span-5 p-8 rounded-3xl backdrop-blur-2xl bg-[#0B1F3A]/90 border border-[#C8A96B]/40 shadow-2xl space-y-5">
                <h3 className="text-xl font-serif text-[#F5F1E8]">Reservation Details</h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#C8A96B] mb-1">Check-in Date</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-[#07111F] border border-[#123B70] rounded-xl px-4 py-3 text-sm text-[#F5F1E8] focus:border-[#C8A96B] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#C8A96B] mb-1">Check-out Date</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-[#07111F] border border-[#123B70] rounded-xl px-4 py-3 text-sm text-[#F5F1E8] focus:border-[#C8A96B] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#C8A96B] mb-1">Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-[#07111F] border border-[#123B70] rounded-xl px-4 py-3 text-sm text-[#F5F1E8] focus:border-[#C8A96B] outline-none"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#C8A96B] mb-1">Guest Full Name</label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Lady Victoria Vance"
                      className="w-full bg-[#07111F] border border-[#123B70] rounded-xl px-4 py-3 text-sm text-[#F5F1E8] focus:border-[#C8A96B] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#C8A96B] mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="e.g. victoria@vance.co.uk"
                      className="w-full bg-[#07111F] border border-[#123B70] rounded-xl px-4 py-3 text-sm text-[#F5F1E8] focus:border-[#C8A96B] outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-[#C8A96B]/20 text-xs">
                  <span className="text-[#8B96A8]">Total Estimate:</span>
                  <span className="text-xl font-serif text-[#C8A96B]">${selectedRoom.price * 4}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#C8A96B] to-[#A68848] text-[#07111F] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(200,169,107,0.5)] transition-all"
                >
                  Confirm Instant Booking
                </button>
              </form>

            </div>
          ) : (
            <div className="p-12 rounded-3xl backdrop-blur-2xl bg-[#0B1F3A]/90 border border-[#C8A96B]/40 text-center space-y-6 max-w-xl mx-auto shadow-2xl">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-serif text-[#F5F1E8]">RESERVATION CONFIRMED</h2>
              <p className="text-sm text-[#8B96A8]">
                Thank you, <span className="text-[#C8A96B] font-semibold">{guestName}</span>. Your stay reference <span className="font-mono text-[#F5F1E8]">#SP-8995</span> is locked in our system.
              </p>
              <div className="p-4 rounded-xl bg-[#07111F] border border-[#C8A96B]/20 text-left text-xs space-y-1">
                <div>Accommodation: <span className="text-[#F5F1E8] font-medium">{selectedRoom.name}</span></div>
                <div>Dates: <span className="text-[#F5F1E8] font-medium">{checkIn} to {checkOut}</span></div>
                <div>Guests: <span className="text-[#F5F1E8] font-medium">{guests}</span></div>
              </div>
              <button
                onClick={() => setIsConfirmed(false)}
                className="px-8 py-3 rounded-full bg-[#123B70] text-[#F5F1E8] text-xs uppercase tracking-widest hover:bg-[#C8A96B] hover:text-[#07111F] transition-all"
              >
                Make Another Reservation
              </button>
            </div>
          )}
        </section>

        <Footer />
      </div>

      <AIConcierge />
    </div>
  );
}
