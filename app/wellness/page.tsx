'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VRImageCard from '@/components/VRImageCard';
import VRScrollRotateCard from '@/components/VRScrollRotateCard';
import BookingModal from '@/components/BookingModal';
import AIConcierge from '@/components/AIConcierge';
import { WELLNESS_DATA } from '@/lib/mock-data';
import { Heart, Clock } from 'lucide-react';

export default function WellnessPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div className="relative text-[#0F172A] min-h-screen bg-[#FFFFFF]">
      <div className="relative z-10 pointer-events-auto">
        <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

        <section className="relative pt-36 pb-16 px-4 sm:px-8">
          <VRScrollRotateCard>
            <div className="max-w-7xl mx-auto space-y-4 p-8 sm:p-10 rounded-3xl bg-white border border-[#CBD5E1] shadow-[0_15px_40px_rgba(10,23,44,0.06)]">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4EFE6] border border-[#B8860B]/40 text-[#0A172C] text-[10px] uppercase tracking-[0.3em] font-semibold"><Heart className="w-3.5 h-3.5 text-[#B8860B]" /><span>HOLISTIC REJUVENATION</span></div>
              <h1 className="text-4xl sm:text-7xl font-serif font-bold text-[#0A172C]">SAPPHIRE THERMAL SPA & WELLNESS</h1>
              <p className="text-sm sm:text-base text-[#475569] max-w-2xl font-serif italic">Restore body and clarity with organic botanical rituals, Himalayan salt saunas, ice fountains, and 50-meter floating infinity sky pools.</p>
            </div>
          </VRScrollRotateCard>
        </section>

        <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {WELLNESS_DATA.map((wellness) => (
            <VRScrollRotateCard key={wellness.id}>
              <div className="rounded-3xl bg-white border border-[#CBD5E1] overflow-hidden shadow-[0_15px_40px_rgba(10,23,44,0.06)] group hover:border-[#0A172C] transition-all flex flex-col justify-between h-full">
                <VRImageCard src={wellness.image} alt={wellness.name} className="h-64 w-full rounded-b-none border-none" />
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[#0A172C]">{wellness.name}</h3>
                    <p className="text-xs text-[#B8860B] font-serif italic mt-0.5">{wellness.tagline}</p>
                    <p className="text-xs text-[#475569] leading-relaxed mt-3">{wellness.description}</p>
                  </div>
                  <div className="pt-4 border-t border-[#CBD5E1] flex items-center justify-between">
                    <span className="text-[11px] text-[#475569] flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#B8860B]" /> {wellness.hours}</span>
                    <button onClick={() => setBookingModalOpen(true)} className="px-4 py-2 rounded-full bg-[#0A172C] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#B8860B] transition-colors">Book Treatment</button>
                  </div>
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
