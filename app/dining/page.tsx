'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VRImageCard from '@/components/VRImageCard';
import VRScrollRotateCard from '@/components/VRScrollRotateCard';
import BookingModal from '@/components/BookingModal';
import AIConcierge from '@/components/AIConcierge';
import { DINING_DATA } from '@/lib/mock-data';
import { Utensils, Clock, Wine } from 'lucide-react';

export default function DiningPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div className="relative text-[#0F172A] min-h-screen bg-[#FFFFFF]">
      <div className="relative z-10 pointer-events-auto">
        <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

        <section className="relative pt-36 pb-16 px-4 sm:px-8">
          <VRScrollRotateCard>
            <div className="max-w-7xl mx-auto space-y-4 p-8 sm:p-10 rounded-3xl bg-white border border-[#CBD5E1] shadow-[0_15px_40px_rgba(10,23,44,0.06)]">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4EFE6] border border-[#B8860B]/40 text-[#0A172C] text-[10px] uppercase tracking-[0.3em] font-semibold"><Utensils className="w-3.5 h-3.5 text-[#B8860B]" /><span>GASTRONOMY & VINTAGES</span></div>
              <h1 className="text-4xl sm:text-7xl font-serif font-bold text-[#0A172C]">FINE DINING & SKY LOUNGE</h1>
              <p className="text-sm sm:text-base text-[#475569] max-w-2xl font-serif italic">Sensory culinary journeys curated by world-renowned chefs, Three Michelin Star techniques, and over 4,500 estate vintages.</p>
            </div>
          </VRScrollRotateCard>
        </section>

        <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
          {DINING_DATA.map((dining, idx) => (
            <VRScrollRotateCard key={dining.id}>
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`}>
                <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <VRImageCard src={dining.image} alt={dining.name} className="h-[350px] w-full" />
                </div>
                <div className={`lg:col-span-5 space-y-4 p-8 rounded-3xl bg-white border border-[#CBD5E1] shadow-[0_15px_40px_rgba(10,23,44,0.06)] ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <span className="text-[10px] uppercase tracking-widest text-[#B8860B] font-semibold">{dining.cuisine}</span>
                  <h2 className="text-3xl font-serif font-bold text-[#0A172C]">{dining.name}</h2>
                  <p className="text-xs text-[#B8860B] font-serif italic">{dining.tagline}</p>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">{dining.description}</p>
                  <div className="pt-4 border-t border-[#CBD5E1] space-y-2 text-xs text-[#475569]">
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#B8860B]" /><span>{dining.hours}</span></div>
                    <div className="flex items-center gap-2"><Wine className="w-4 h-4 text-[#B8860B]" /><span>Dress Code: {dining.dressCode}</span></div>
                  </div>
                  <div className="pt-4"><button onClick={() => setBookingModalOpen(true)} className="px-6 py-3 rounded-full bg-[#0A172C] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#B8860B] transition-all">Reserve Table</button></div>
                </div>
              </div>
            </VRScrollRotateCard>
          ))}
        </section>

        <Footer />
      </div>
      <AIConcierge />
      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </div>
  );
}
