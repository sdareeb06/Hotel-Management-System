'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import BookingModal from '@/components/BookingModal';
import Simulated360Modal from '@/components/Simulated360Modal';
import AIConcierge from '@/components/AIConcierge';
import { ROOMS_DATA, RoomItem } from '@/lib/mock-data';
import { Sparkles, Eye } from 'lucide-react';

const HotelCanvas = dynamic(() => import('@/components/3d/HotelCanvas'), {
  ssr: false
});

export default function RoomsPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [selected360Room, setSelected360Room] = useState<RoomItem | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingRoomId, setBookingRoomId] = useState<string | undefined>();

  const roomsToDisplay = categoryFilter === 'ALL' 
    ? ROOMS_DATA 
    : ROOMS_DATA.filter((r) => r.category === categoryFilter);

  return (
    <div className="relative text-[#F5F1E8] min-h-screen">
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-auto">
        <HotelCanvas scrollProgress={0.45} activeHotspot={null} onSelectHotspot={() => {}} showHotspots={false} isInteractiveMode={false} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050C18]/90 via-[#050C18]/65 to-[#050C18]/70 pointer-events-none" />
      </div>

      <div className="relative z-10 pointer-events-none">
        <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

        <section className="relative pt-36 pb-16 px-4 sm:px-8 pointer-events-auto">
          <ScrollReveal direction="up" duration={900}>
            <div className="max-w-7xl mx-auto space-y-4 p-8 sm:p-10 rounded-3xl backdrop-blur-xl bg-[#07111F]/70 border border-[#C8A96B]/30 shadow-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#123B70]/80 border border-[#C8A96B]/40 text-[#C8A96B] text-[10px] uppercase tracking-[0.3em] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ACCOMMODATIONS DIRECTORY</span>
              </div>
              <h1 className="text-4xl sm:text-7xl font-serif text-[#F5F1E8]">ROOMS & LUXURY SUITES</h1>
              <p className="text-sm sm:text-base text-[#8B96A8] max-w-2xl font-serif italic">
                Each suite at Sapphire Grand is a bespoke architectural sanctuary designed around natural acoustic isolation, private terraces, and 24-hour butler service.
              </p>
              <div className="flex flex-wrap gap-2 pt-4">
                {['ALL', 'ROOM', 'SUITE', 'RESIDENCE'].map((cat) => (
                  <button key={cat} onClick={() => setCategoryFilter(cat)} className={`px-6 py-2.5 rounded-full text-xs font-serif tracking-widest uppercase transition-all ${categoryFilter === cat ? 'bg-[#C8A96B] text-[#07111F] font-bold shadow-[0_0_15px_rgba(200,169,107,0.4)]' : 'bg-[#0B1F3A]/80 text-[#8B96A8] border border-[#123B70] hover:text-[#F5F1E8]'}`}>{cat}</button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto pointer-events-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roomsToDisplay.map((room, idx) => (
              <ScrollReveal key={room.id} direction={idx % 2 === 0 ? 'left' : 'right'} delay={idx * 120} duration={900}>
                <div className="rounded-3xl backdrop-blur-2xl bg-[#0B1F3A]/85 border border-[#C8A96B]/30 overflow-hidden shadow-2xl hover:border-[#C8A96B] transition-all flex flex-col justify-between group">
                  <div className="h-64 sm:h-72 w-full overflow-hidden relative">
                    <img src={room.image} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 px-4 py-1.5 rounded-full bg-[#07111F]/90 border border-[#C8A96B]/40 text-xs font-serif text-[#C8A96B]">${room.price} / night</div>
                  </div>
                  <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#C8A96B] font-semibold">{room.category}</span>
                      <h3 className="text-2xl font-serif text-[#F5F1E8] group-hover:text-[#C8A96B] transition-colors mt-1">{room.name}</h3>
                      <p className="text-xs text-[#C8A96B] italic font-serif mt-0.5">{room.tagline}</p>
                      <p className="text-xs sm:text-sm text-[#8B96A8] leading-relaxed mt-3">{room.description}</p>
                    </div>
                    <div className="pt-4 border-t border-[#C8A96B]/15 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {room.features.map((f, i) => (<span key={i} className="px-3 py-1 rounded-full bg-[#07111F]/80 text-[11px] text-[#8B96A8] border border-[#123B70]">{f}</span>))}
                      </div>
                      <div className="flex items-center gap-3 pt-2">
                        <Link href={`/rooms/${room.id}`} className="flex-1 py-3 rounded-full bg-[#123B70] text-[#F5F1E8] font-bold text-xs uppercase tracking-widest text-center hover:bg-[#C8A96B] hover:text-[#07111F] transition-all">Suite Details</Link>
                        <button onClick={() => { setBookingRoomId(room.id); setBookingModalOpen(true); }} className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#C8A96B] to-[#A68848] text-[#07111F] font-bold text-xs uppercase tracking-widest text-center hover:shadow-[0_0_20px_rgba(200,169,107,0.4)] transition-all">Reserve</button>
                        <button onClick={() => setSelected360Room(room)} className="p-3 rounded-full border border-[#C8A96B]/40 text-[#C8A96B] hover:bg-[#123B70]/60 transition-colors" title="View 360 Tour"><Eye className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <Footer />
      </div>

      <AIConcierge />
      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} initialRoomId={bookingRoomId} />
      {selected360Room && <Simulated360Modal isOpen={!!selected360Room} onClose={() => setSelected360Room(null)} room={selected360Room} />}
    </div>
  );
}
