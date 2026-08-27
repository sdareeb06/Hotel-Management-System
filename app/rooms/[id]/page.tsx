'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import Simulated360Modal from '@/components/Simulated360Modal';
import AIConcierge from '@/components/AIConcierge';
import { ROOMS_DATA } from '@/lib/mock-data';
import { Sparkles, Eye, Calendar, ArrowLeft, Check, ShieldCheck, Users, Maximize, Bed } from 'lucide-react';

export default function RoomDetailPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params?.id as string;

  const room = ROOMS_DATA.find((r) => r.id === roomId) || ROOMS_DATA[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [show360, setShow360] = useState(false);

  const gallery = room.images || [room.image];

  return (
    <div className="bg-[#07111F] text-[#F5F1E8] min-h-screen">
      <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Header Bar */}
      <div className="pt-28 px-6 max-w-7xl mx-auto">
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#8B96A8] hover:text-[#C8A96B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Accommodations</span>
        </Link>
      </div>

      {/* Main Suite Content */}
      <section className="py-8 px-6 max-w-7xl mx-auto space-y-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Gallery Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative h-[400px] sm:h-[500px] rounded-3xl overflow-hidden border border-[#C8A96B]/30 shadow-2xl group">
              <img
                src={gallery[activeImageIdx]}
                alt={room.name}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <button
                onClick={() => setShow360(true)}
                className="absolute bottom-4 right-4 flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#07111F]/80 backdrop-blur-md border border-[#C8A96B]/50 text-xs text-[#C8A96B] font-serif hover:bg-[#C8A96B] hover:text-[#07111F] transition-all"
              >
                <Eye className="w-4 h-4" />
                <span>Launch 360° Virtual View</span>
              </button>
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-24 h-20 rounded-xl overflow-hidden border transition-all ${
                    activeImageIdx === idx 
                      ? 'border-[#C8A96B] scale-105 shadow-[0_0_15px_rgba(200,169,107,0.4)]' 
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Suite Information Column */}
          <div className="lg:col-span-5 space-y-6 p-8 rounded-3xl bg-[#0B1F3A] border border-[#C8A96B]/30 shadow-2xl">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A96B] font-semibold">{room.category}</span>
              <h1 className="text-3xl sm:text-4xl font-serif text-[#F5F1E8] mt-1">{room.name}</h1>
              <p className="text-xs text-[#C8A96B] font-serif italic mt-1">{room.tagline}</p>
            </div>

            <div className="flex items-baseline gap-2 pb-4 border-b border-[#C8A96B]/20">
              <span className="text-3xl font-serif text-[#C8A96B]">${room.price}</span>
              <span className="text-xs text-[#8B96A8]">/ night</span>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#07111F] border border-[#123B70] text-center text-xs">
              <div>
                <Maximize className="w-4 h-4 text-[#C8A96B] mx-auto mb-1" />
                <span className="block text-[#8B96A8] text-[10px]">SIZE</span>
                <span className="text-[#F5F1E8] font-medium">{room.size}</span>
              </div>
              <div>
                <Bed className="w-4 h-4 text-[#C8A96B] mx-auto mb-1" />
                <span className="block text-[#8B96A8] text-[10px]">BED</span>
                <span className="text-[#F5F1E8] font-medium">{room.bed}</span>
              </div>
              <div>
                <Users className="w-4 h-4 text-[#C8A96B] mx-auto mb-1" />
                <span className="block text-[#8B96A8] text-[10px]">GUESTS</span>
                <span className="text-[#F5F1E8] font-medium">Up to {room.guests}</span>
              </div>
            </div>

            <p className="text-xs text-[#8B96A8] leading-relaxed">{room.description}</p>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs uppercase tracking-widest text-[#C8A96B]">Bespoke Inclusions</h4>
              <ul className="space-y-1.5 text-xs text-[#8B96A8]">
                {room.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C8A96B]" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#C8A96B]/20 space-y-3">
              <button
                onClick={() => setBookingModalOpen(true)}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#C8A96B] to-[#A68848] text-[#07111F] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(200,169,107,0.5)] transition-all"
              >
                Reserve Instant Stay
              </button>
            </div>
          </div>

        </div>

      </section>

      <Footer />
      <AIConcierge />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialRoomId={room.id}
      />

      <Simulated360Modal
        isOpen={show360}
        onClose={() => setShow360(false)}
        room={room}
      />
    </div>
  );
}
