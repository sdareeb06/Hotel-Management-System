'use client';

import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Users, Check, Sparkles, Bed, ShieldCheck } from 'lucide-react';
import { ROOMS_DATA, RoomItem } from '@/lib/mock-data';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoomId?: string;
}

export default function BookingModal({ isOpen, onClose, initialRoomId }: BookingModalProps) {
  const [step, setStep] = useState<'search' | 'confirm'>('search');
  const [selectedRoom, setSelectedRoom] = useState<RoomItem>(
    ROOMS_DATA.find((r) => r.id === initialRoomId) || ROOMS_DATA[0]
  );
  const [checkIn, setCheckIn] = useState('2026-09-01');
  const [checkOut, setCheckOut] = useState('2026-09-05');
  const [guests, setGuests] = useState(2);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07111F]/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl bg-[#0B1F3A] border border-[#C8A96B]/40 rounded-2xl shadow-[0_25px_80px_rgba(7,17,31,0.95)] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-[#07111F] border-b border-[#C8A96B]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#123B70] border border-[#C8A96B]/40 flex items-center justify-center text-[#C8A96B]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A96B]">RESERVATIONS ENGINE</span>
              <h3 className="text-xl font-serif text-[#F5F1E8]">SAPPHIRE GRAND BOOKING</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#8B96A8] hover:text-[#F5F1E8] rounded-full hover:bg-white/5 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        {!isBooked ? (
          <div className="p-6">
            {step === 'search' ? (
              <div className="space-y-6">
                {/* Dates & Guests Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-[#07111F] border border-[#123B70]">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#C8A96B] mb-1">Check-in</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-transparent text-sm text-[#F5F1E8] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#C8A96B] mb-1">Check-out</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-transparent text-sm text-[#F5F1E8] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#C8A96B] mb-1">Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-[#0B1F3A] text-sm text-[#F5F1E8] focus:outline-none py-1"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={5}>5+ Guests</option>
                    </select>
                  </div>
                </div>

                {/* Available Suites */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#8B96A8] mb-3">Available Accommodations</h4>
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-1 no-scrollbar">
                    {ROOMS_DATA.map((room) => (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoom(room)}
                        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                          selectedRoom.id === room.id
                            ? 'bg-[#123B70]/60 border-[#C8A96B] shadow-[0_0_15px_rgba(200,169,107,0.2)]'
                            : 'bg-[#07111F]/60 border-[#123B70]/50 hover:border-[#C8A96B]/50'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={room.image}
                            alt={room.name}
                            className="w-16 h-16 rounded-lg object-cover border border-[#C8A96B]/20"
                          />
                          <div>
                            <h5 className="font-serif text-base text-[#F5F1E8]">{room.name}</h5>
                            <p className="text-xs text-[#8B96A8]">{room.size} • {room.bed}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-serif text-[#C8A96B]">${room.price}</div>
                          <div className="text-[10px] text-[#8B96A8]">per night</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#C8A96B]/20">
                  <div className="text-xs text-[#8B96A8]">
                    Selected: <span className="text-[#C8A96B] font-semibold">{selectedRoom.name}</span>
                  </div>
                  <button
                    onClick={() => setStep('confirm')}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C8A96B] to-[#A68848] text-[#07111F] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(200,169,107,0.4)] transition-all"
                  >
                    Continue to Guest Details
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookSubmit} className="space-y-5">
                <div className="p-4 rounded-xl bg-[#07111F] border border-[#C8A96B]/30 flex items-center justify-between">
                  <div>
                    <h5 className="font-serif text-lg text-[#F5F1E8]">{selectedRoom.name}</h5>
                    <p className="text-xs text-[#8B96A8]">{checkIn} to {checkOut} ({guests} Guests)</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-serif text-[#C8A96B]">${selectedRoom.price * 4}</span>
                    <span className="block text-[10px] text-[#8B96A8]">Estimated Total (4 Nights)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#8B96A8] mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Lord Edward Sterling"
                      className="w-full bg-[#07111F] border border-[#123B70] rounded-xl px-4 py-3 text-sm text-[#F5F1E8] focus:border-[#C8A96B] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#8B96A8] mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="e.g. edward@sterling.co.uk"
                      className="w-full bg-[#07111F] border border-[#123B70] rounded-xl px-4 py-3 text-sm text-[#F5F1E8] focus:border-[#C8A96B] outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-[#123B70]/30 border border-[#123B70] text-xs text-[#8B96A8]">
                  <ShieldCheck className="w-4 h-4 text-[#C8A96B] shrink-0" />
                  <span>Complimentary airport chauffeur & guaranteed late check-out included with suite reservation.</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#C8A96B]/20">
                  <button
                    type="button"
                    onClick={() => setStep('search')}
                    className="text-xs uppercase tracking-widest text-[#8B96A8] hover:text-[#F5F1E8]"
                  >
                    Back to Suites
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C8A96B] to-[#A68848] text-[#07111F] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(200,169,107,0.5)] transition-all"
                  >
                    Confirm Instant Reservation
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif text-[#F5F1E8]">RESERVATION CONFIRMED</h3>
            <p className="text-sm text-[#8B96A8] max-w-md mx-auto">
              Thank you, <span className="text-[#C8A96B] font-semibold">{guestName || 'Valued Guest'}</span>. Your reservation reference <span className="font-mono text-[#F5F1E8]">#SP-8992</span> at Sapphire Grand has been processed.
            </p>
            <div className="p-4 rounded-xl bg-[#07111F] border border-[#C8A96B]/20 max-w-md mx-auto text-xs text-left space-y-1">
              <div className="text-[#8B96A8]">Accommodation: <span className="text-[#F5F1E8] font-medium">{selectedRoom.name}</span></div>
              <div className="text-[#8B96A8]">Dates: <span className="text-[#F5F1E8] font-medium">{checkIn} — {checkOut}</span></div>
              <div className="text-[#8B96A8]">Status: <span className="text-emerald-400 font-semibold">Guaranteed Instant Confirmation</span></div>
            </div>
            <button
              onClick={() => {
                setIsBooked(false);
                setStep('search');
                onClose();
              }}
              className="px-8 py-3 rounded-full bg-[#123B70] text-[#F5F1E8] text-xs uppercase tracking-widest hover:bg-[#C8A96B] hover:text-[#07111F] transition-all"
            >
              Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
