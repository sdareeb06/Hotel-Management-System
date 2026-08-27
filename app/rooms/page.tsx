'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import VRImageCard from '@/components/VRImageCard';
import VRScrollRotateCard from '@/components/VRScrollRotateCard';
import BookingModal from '@/components/BookingModal';
import Simulated360Modal from '@/components/Simulated360Modal';
import AIConcierge from '@/components/AIConcierge';
import { ROOMS_DATA, RoomItem } from '@/lib/mock-data';
import { Sparkles, Eye } from 'lucide-react';

export default function RoomsPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [selected360Room, setSelected360Room] = useState<RoomItem | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingRoomId, setBookingRoomId] = useState<string | undefined>();

  const roomsToDisplay = categoryFilter === 'ALL' 
    ? ROOMS_DATA 
    : ROOMS_DATA.filter((r) => r.category === categoryFilter);

  return (
    <div className="relative text-[#0F172A] min-h-screen bg-[#FFFFFF]">
      <div className="relative z-10 pointer-events-auto">
        <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

        <section className="relative pt-36 pb-16 px-4 sm:px-8">
          <VRScrollRotateCard>
            <div className="max-w-7xl mx-auto space-y-4 p-8 sm:p-10 rounded-3xl bg-white border border-[#CBD5E1] shadow-[0_15px_40px_rgba(10,23,44,0.06)]">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4EFE6] border border-[#B8860B]/40 text-[#0A172C] text-[10px] uppercase tracking-[0.3em] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>ACCOMMODATIONS DIRECTORY</span>
              </div>
              <h1 className="text-4xl sm:text-7xl font-serif font-bold text-[#0A172C]">ROOMS & LUXURY SUITES</h1>
              <p className="text-sm sm:text-base text-[#475569] max-w-2xl font-serif italic">
                Each suite at Sapphire Grand is a bespoke architectural sanctuary designed around natural acoustic isolation, private terraces, and 24-hour butler service.
              </p>
              <div className="flex flex-wrap gap-2 pt-4">
                {['ALL', 'ROOM', 'SUITE', 'RESIDENCE'].map((cat) => (
                  <button key={cat} onClick={() => setCategoryFilter(cat)} className={`px-6 py-2.5 rounded-full text-xs font-serif tracking-widest uppercase transition-all ${categoryFilter === cat ? 'bg-[#0A172C] text-white font-bold shadow-md' : 'bg-[#F8FAFC] text-[#475569] border border-[#CBD5E1] hover:text-[#0A172C]'}`}>{cat}</button>
                ))}
              </div>
            </div>
          </VRScrollRotateCard>
        </section>

        <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roomsToDisplay.map((room) => (
              <VRScrollRotateCard key={room.id}>
                <div className="rounded-3xl bg-white border border-[#CBD5E1] overflow-hidden shadow-[0_15px_40px_rgba(10,23,44,0.06)] hover:border-[#0A172C] transition-all flex flex-col justify-between group">
                  <VRImageCard src={room.image} alt={room.name} className="h-64 sm:h-72 w-full rounded-b-none border-none" />
                  <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-[#B8860B] font-semibold">{room.category}</span>
                        <span className="text-sm font-serif text-[#0A172C] font-bold">${room.price} / night</span>
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-[#0A172C] group-hover:text-[#B8860B] transition-colors mt-1">{room.name}</h3>
                      <p className="text-xs text-[#B8860B] italic font-serif mt-0.5">{room.tagline}</p>
                      <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mt-3">{room.description}</p>
                    </div>
                    <div className="pt-4 border-t border-[#CBD5E1] space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {room.features.map((f, i) => (<span key={i} className="px-3 py-1 rounded-full bg-[#F8FAFC] text-[11px] text-[#475569] border border-[#CBD5E1]">{f}</span>))}
                      </div>
                      <div className="flex items-center gap-3 pt-2">
                        <Link href={`/rooms/${room.id}`} className="flex-1 py-3 rounded-full bg-[#0A172C] text-white font-bold text-xs uppercase tracking-widest text-center hover:bg-[#B8860B] transition-all">Suite Details</Link>
                        <button onClick={() => { setBookingRoomId(room.id); setBookingModalOpen(true); }} className="flex-1 py-3 rounded-full bg-[#B8860B] text-white font-bold text-xs uppercase tracking-widest text-center hover:bg-[#0A172C] transition-all">Reserve</button>
                        <button onClick={() => setSelected360Room(room)} className="p-3 rounded-full border border-[#CBD5E1] text-[#0A172C] hover:bg-[#F8FAFC] transition-colors" title="View 360 Tour"><Eye className="w-4 h-4 text-[#B8860B]" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              </VRScrollRotateCard>
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
