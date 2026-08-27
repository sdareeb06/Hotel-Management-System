'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import BookingModal from '@/components/BookingModal';
import AIConcierge from '@/components/AIConcierge';
import { WELLNESS_DATA } from '@/lib/mock-data';
import { Heart, Clock } from 'lucide-react';

const HotelCanvas = dynamic(() => import('@/components/3d/HotelCanvas'), {
  ssr: false
});

export default function WellnessPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div className="relative text-[#F5F1E8] min-h-screen">
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-auto">
        <HotelCanvas scrollProgress={0.78} activeHotspot={null} onSelectHotspot={() => {}} showHotspots={false} isInteractiveMode={false} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050C18]/90 via-[#050C18]/65 to-[#050C18]/70 pointer-events-none" />
      </div>

      <div className="relative z-10 pointer-events-none">
        <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

        <section className="relative pt-36 pb-16 px-4 sm:px-8 pointer-events-auto">
          <ScrollReveal direction="up" duration={900}>
            <div className="max-w-7xl mx-auto space-y-4 p-8 sm:p-10 rounded-3xl backdrop-blur-xl bg-[#07111F]/70 border border-[#C8A96B]/30 shadow-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#123B70]/80 border border-[#C8A96B]/40 text-[#C8A96B] text-[10px] uppercase tracking-[0.3em] font-semibold"><Heart className="w-3.5 h-3.5" /><span>HOLISTIC REJUVENATION</span></div>
              <h1 className="text-4xl sm:text-7xl font-serif text-[#F5F1E8]">SAPPHIRE THERMAL SPA & WELLNESS</h1>
              <p className="text-sm sm:text-base text-[#8B96A8] max-w-2xl font-serif italic">Restore body and clarity with organic botanical rituals, Himalayan salt saunas, ice fountains, and 50-meter floating infinity sky pools.</p>
            </div>
          </ScrollReveal>
        </section>

        <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pointer-events-auto">
          {WELLNESS_DATA.map((wellness, idx) => (
            <ScrollReveal key={wellness.id} direction="up" delay={idx * 200} duration={900}>
              <div className="rounded-3xl backdrop-blur-2xl bg-[#0B1F3A]/85 border border-[#C8A96B]/30 overflow-hidden shadow-2xl group hover:border-[#C8A96B] transition-all flex flex-col justify-between h-full">
                <div className="h-64 w-full overflow-hidden">
                  <img src={wellness.image} alt={wellness.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-serif text-[#F5F1E8]">{wellness.name}</h3>
                    <p className="text-xs text-[#C8A96B] font-serif italic mt-0.5">{wellness.tagline}</p>
                    <p className="text-xs text-[#8B96A8] leading-relaxed mt-3">{wellness.description}</p>
                  </div>
                  <div className="pt-4 border-t border-[#C8A96B]/15 flex items-center justify-between">
                    <span className="text-[11px] text-[#8B96A8] flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#C8A96B]" /> {wellness.hours}</span>
                    <button onClick={() => setBookingModalOpen(true)} className="px-4 py-2 rounded-full bg-[#C8A96B] text-[#07111F] text-[11px] font-bold uppercase tracking-widest hover:bg-[#E8D49B] transition-colors">Book Treatment</button>
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
