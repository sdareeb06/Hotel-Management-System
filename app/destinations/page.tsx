'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import BookingModal from '@/components/BookingModal';
import AIConcierge from '@/components/AIConcierge';
import { DESTINATIONS_DATA } from '@/lib/mock-data';
import { Globe } from 'lucide-react';

const HotelCanvas = dynamic(() => import('@/components/3d/HotelCanvas'), {
  ssr: false
});

export default function DestinationsPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div className="relative text-[#F5F1E8] min-h-screen">
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-auto">
        <HotelCanvas scrollProgress={0.90} activeHotspot={null} onSelectHotspot={() => {}} showHotspots={false} isInteractiveMode={false} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050C18]/90 via-[#050C18]/65 to-[#050C18]/70 pointer-events-none" />
      </div>

      <div className="relative z-10 pointer-events-none">
        <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

        <section className="relative pt-36 pb-16 px-4 sm:px-8 pointer-events-auto">
          <ScrollReveal direction="up" duration={900}>
            <div className="max-w-7xl mx-auto space-y-4 p-8 sm:p-10 rounded-3xl backdrop-blur-xl bg-[#07111F]/70 border border-[#C8A96B]/30 shadow-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#123B70]/80 border border-[#C8A96B]/40 text-[#C8A96B] text-[10px] uppercase tracking-[0.3em] font-semibold"><Globe className="w-3.5 h-3.5" /><span>GLOBAL PORTFOLIO CONCEPTS</span></div>
              <h1 className="text-4xl sm:text-7xl font-serif text-[#F5F1E8]">DESTINATIONS</h1>
              <p className="text-sm sm:text-base text-[#8B96A8] max-w-2xl font-serif italic">Where the world meets. Discover conceptual flagship properties governed under Sapphire Hotel Management standards.</p>
            </div>
          </ScrollReveal>
        </section>

        <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pointer-events-auto">
          {DESTINATIONS_DATA.map((dest, idx) => (
            <ScrollReveal key={dest.id} direction="up" delay={idx * 150} duration={900}>
              <div className="rounded-3xl backdrop-blur-2xl bg-[#0B1F3A]/85 border border-[#C8A96B]/30 overflow-hidden shadow-2xl group hover:border-[#C8A96B] transition-all flex flex-col justify-between h-full">
                <div className="h-48 w-full overflow-hidden">
                  <img src={dest.image} alt={dest.city} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#C8A96B] font-semibold">{dest.status}</span>
                    <h3 className="text-2xl font-serif text-[#F5F1E8] mt-0.5">{dest.city}</h3>
                    <p className="text-xs text-[#C8A96B] font-serif">{dest.country}</p>
                    <p className="text-xs text-[#8B96A8] leading-relaxed mt-2">{dest.description}</p>
                  </div>
                  <div className="pt-4 border-t border-[#C8A96B]/15">
                    <button onClick={() => setBookingModalOpen(true)} className="w-full py-2.5 rounded-full border border-[#C8A96B]/40 text-[#C8A96B] text-xs font-serif hover:bg-[#C8A96B] hover:text-[#07111F] transition-all">Explore Destination</button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </section>

        <Footer />
      </div>
      <AIConcierge />
      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </div>
  );
}
