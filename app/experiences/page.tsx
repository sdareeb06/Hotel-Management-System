'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VRImageCard from '@/components/VRImageCard';
import VRScrollRotateCard from '@/components/VRScrollRotateCard';
import BookingModal from '@/components/BookingModal';
import AIConcierge from '@/components/AIConcierge';
import { Compass as CompassIcon } from 'lucide-react';

const EXPERIENCES = [
  { 
    title: 'Private Yacht Charter Excursions', 
    category: 'Marine Excursion', 
    description: 'Sail the coastal waters aboard Sapphire Grand\'s private 85-foot Riviera yacht, equipped with onboard sommelier service and underwater diving equipment.', 
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1200&q=80' 
  },
  { 
    title: 'Rooftop Helipad VIP Transfers', 
    category: 'Aviation', 
    description: 'Bypass ground traffic with private Airbus H145 helicopter transfers directly to Sapphire Grand\'s rooftop landing pad.', 
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80' 
  },
  { 
    title: 'Private Candlelight Sommelier Cellar', 
    category: 'Gastronomy', 
    description: 'Private 7-course pairing menu inside our stone vault housing over 4,500 estate vintages, hosted by our master sommelier.', 
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80' 
  }
];

export default function ExperiencesPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div className="relative text-[#0F172A] min-h-screen bg-[#FFFFFF]">
      <div className="relative z-10 pointer-events-auto">
        <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

        <section className="relative pt-36 pb-16 px-4 sm:px-8">
          <VRScrollRotateCard>
            <div className="max-w-7xl mx-auto space-y-4 p-8 sm:p-10 rounded-3xl bg-white border border-[#CBD5E1] shadow-[0_15px_40px_rgba(10,23,44,0.06)]">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4EFE6] border border-[#B8860B]/40 text-[#0A172C] text-[10px] uppercase tracking-[0.3em] font-semibold">
                <CompassIcon className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>BESPOKE ADVENTURES</span>
              </div>
              <h1 className="text-4xl sm:text-7xl font-serif font-bold text-[#0A172C]">CURATED EXPERIENCES</h1>
              <p className="text-sm sm:text-base text-[#475569] max-w-2xl font-serif italic">
                From private marine charters to rooftop aviation transfers, our Head Butler desk tailors every moment to your exact desires.
              </p>
            </div>
          </VRScrollRotateCard>
        </section>

        <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {EXPERIENCES.map((exp, idx) => (
            <VRScrollRotateCard key={idx}>
              <div className="rounded-3xl bg-white border border-[#CBD5E1] overflow-hidden shadow-[0_15px_40px_rgba(10,23,44,0.06)] group hover:border-[#0A172C] transition-all flex flex-col justify-between h-full">
                <VRImageCard src={exp.image} alt={exp.title} className="h-64 w-full rounded-b-none border-none" />
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#B8860B] font-bold">{exp.category}</span>
                    <h3 className="text-2xl font-serif font-bold text-[#0A172C] mt-1">{exp.title}</h3>
                    <p className="text-xs text-[#475569] leading-relaxed mt-3">{exp.description}</p>
                  </div>
                  <div className="pt-4 border-t border-[#CBD5E1]">
                    <button onClick={() => setBookingModalOpen(true)} className="w-full py-3.5 rounded-full bg-[#0A172C] text-white font-bold text-xs uppercase tracking-widest text-center hover:bg-[#B8860B] transition-all">Inquire Experience</button>
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
