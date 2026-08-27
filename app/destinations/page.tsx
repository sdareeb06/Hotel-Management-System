'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VRImageCard from '@/components/VRImageCard';
import VRScrollRotateCard from '@/components/VRScrollRotateCard';
import BookingModal from '@/components/BookingModal';
import AIConcierge from '@/components/AIConcierge';
import { DESTINATIONS_DATA } from '@/lib/mock-data';
import { Globe } from 'lucide-react';

export default function DestinationsPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div className="relative text-[#0F172A] min-h-screen bg-[#FFFFFF]">
      <div className="relative z-10 pointer-events-auto">
        <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

        <section className="relative pt-36 pb-16 px-4 sm:px-8">
          <VRScrollRotateCard>
            <div className="max-w-7xl mx-auto space-y-4 p-8 sm:p-10 rounded-3xl bg-white border border-[#CBD5E1] shadow-[0_15px_40px_rgba(10,23,44,0.06)]">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4EFE6] border border-[#B8860B]/40 text-[#0A172C] text-[10px] uppercase tracking-[0.3em] font-semibold">
                <Globe className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>GLOBAL PORTFOLIO CONCEPTS</span>
              </div>
              <h1 className="text-4xl sm:text-7xl font-serif font-bold text-[#0A172C]">DESTINATIONS</h1>
              <p className="text-sm sm:text-base text-[#475569] max-w-2xl font-serif italic">
                Where the world meets. Discover conceptual flagship properties governed under Sapphire Hotel Management standards.
              </p>
            </div>
          </VRScrollRotateCard>
        </section>

        <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {DESTINATIONS_DATA.map((dest) => (
            <VRScrollRotateCard key={dest.id}>
              <div className="rounded-3xl bg-white border border-[#CBD5E1] overflow-hidden shadow-[0_15px_40px_rgba(10,23,44,0.06)] group hover:border-[#0A172C] transition-all flex flex-col justify-between h-full">
                <VRImageCard src={dest.image} alt={dest.city} className="h-48 w-full rounded-b-none border-none" />
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#B8860B] font-bold">{dest.status}</span>
                    <h3 className="text-2xl font-serif font-bold text-[#0A172C] mt-0.5">{dest.city}</h3>
                    <p className="text-xs text-[#B8860B] font-serif">{dest.country}</p>
                    <p className="text-xs text-[#475569] leading-relaxed mt-2">{dest.description}</p>
                  </div>
                  <div className="pt-4 border-t border-[#CBD5E1]">
                    <button onClick={() => setBookingModalOpen(true)} className="w-full py-2.5 rounded-full border border-[#CBD5E1] text-[#0A172C] text-xs font-serif font-bold hover:bg-[#0A172C] hover:text-white transition-all">Explore Destination</button>
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
