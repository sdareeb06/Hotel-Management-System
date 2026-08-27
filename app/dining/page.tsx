'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import BookingModal from '@/components/BookingModal';
import AIConcierge from '@/components/AIConcierge';
import { DINING_DATA } from '@/lib/mock-data';
import { Utensils, Clock, Wine } from 'lucide-react';

const HotelCanvas = dynamic(() => import('@/components/3d/HotelCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#050C18]">
      <div className="w-8 h-8 border-2 border-[#C8A96B]/30 border-t-[#C8A96B] rounded-full animate-spin" />
      <span className="mt-3 text-xs uppercase tracking-widest text-[#C8A96B]">Loading Property View...</span>
    </div>
  )
});

export default function DiningPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div className="relative text-[#F5F1E8] min-h-screen">
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-auto">
        <HotelCanvas scrollProgress={0.65} activeHotspot={null} onSelectHotspot={() => {}} showHotspots={false} isInteractiveMode={false} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050C18]/90 via-[#050C18]/65 to-[#050C18]/70 pointer-events-none" />
      </div>

      <div className="relative z-10 pointer-events-none">
        <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

        <section className="relative pt-36 pb-16 px-4 sm:px-8 pointer-events-auto">
          <ScrollReveal direction="up" duration={900}>
            <div className="max-w-7xl mx-auto space-y-4 p-8 sm:p-10 rounded-3xl backdrop-blur-xl bg-[#07111F]/70 border border-[#C8A96B]/30 shadow-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#123B70]/80 border border-[#C8A96B]/40 text-[#C8A96B] text-[10px] uppercase tracking-[0.3em] font-semibold"><Utensils className="w-3.5 h-3.5" /><span>GASTRONOMY & VINTAGES</span></div>
              <h1 className="text-4xl sm:text-7xl font-serif text-[#F5F1E8]">FINE DINING & SKY LOUNGE</h1>
              <p className="text-sm sm:text-base text-[#8B96A8] max-w-2xl font-serif italic">Sensory culinary journeys curated by world-renowned chefs, Three Michelin Star techniques, and over 4,500 estate vintages.</p>
            </div>
          </ScrollReveal>
        </section>

        <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 pointer-events-auto">
          {DINING_DATA.map((dining, idx) => (
            <ScrollReveal key={dining.id} direction={idx % 2 === 0 ? 'left' : 'right'} delay={idx * 150} duration={900}>
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`}>
                <div className={`lg:col-span-7 h-[350px] rounded-3xl overflow-hidden border border-[#C8A96B]/30 shadow-2xl group ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <img src={dining.image} alt={dining.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className={`lg:col-span-5 space-y-4 p-8 rounded-3xl backdrop-blur-2xl bg-[#0B1F3A]/85 border border-[#C8A96B]/30 shadow-2xl ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <span className="text-[10px] uppercase tracking-widest text-[#C8A96B] font-semibold">{dining.cuisine}</span>
                  <h2 className="text-3xl font-serif text-[#F5F1E8]">{dining.name}</h2>
                  <p className="text-xs text-[#C8A96B] font-serif italic">{dining.tagline}</p>
                  <p className="text-xs sm:text-sm text-[#8B96A8] leading-relaxed">{dining.description}</p>
                  <div className="pt-4 border-t border-[#C8A96B]/15 space-y-2 text-xs text-[#8B96A8]">
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#C8A96B]" /><span>{dining.hours}</span></div>
                    <div className="flex items-center gap-2"><Wine className="w-4 h-4 text-[#C8A96B]" /><span>Dress Code: {dining.dressCode}</span></div>
                  </div>
                  <div className="pt-4"><button onClick={() => setBookingModalOpen(true)} className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C8A96B] to-[#A68848] text-[#07111F] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(200,169,107,0.4)] transition-all">Reserve Table</button></div>
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
