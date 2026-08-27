'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import BookingModal from '@/components/BookingModal';
import AIConcierge from '@/components/AIConcierge';
import { Compass as CompassIcon } from 'lucide-react';

const HotelCanvas = dynamic(() => import('@/components/3d/HotelCanvas'), {
  ssr: false
});

const EXPERIENCES = [
  { title: 'Private Yacht Charter Excursions', category: 'Marine Excursion', description: 'Sail the coastal waters aboard Sapphire Grand\'s private 85-foot Riviera yacht, equipped with onboard sommelier service and underwater diving equipment.', image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1200&q=80' },
  { title: 'Rooftop Helipad VIP Transfers', category: 'Aviation', description: 'Bypass ground traffic with private Airbus H145 helicopter transfers directly to Sapphire Grand\'s rooftop landing pad.', image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80' },
  { title: 'Private Candlelight Sommelier Cellar', category: 'Gastronomy', description: 'Private 7-course pairing menu inside our stone vault housing over 4,500 estate vintages, hosted by our master sommelier.', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80' }
];

export default function ExperiencesPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div className="relative text-[#F5F1E8] min-h-screen">
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-auto">
        <HotelCanvas scrollProgress={0.50} activeHotspot={null} onSelectHotspot={() => {}} showHotspots={false} isInteractiveMode={false} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050C18]/90 via-[#050C18]/65 to-[#050C18]/70 pointer-events-none" />
      </div>

      <div className="relative z-10 pointer-events-none">
        <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

        <section className="relative pt-36 pb-16 px-4 sm:px-8 pointer-events-auto">
          <ScrollReveal direction="up" duration={900}>
            <div className="max-w-7xl mx-auto space-y-4 p-8 sm:p-10 rounded-3xl backdrop-blur-xl bg-[#07111F]/70 border border-[#C8A96B]/30 shadow-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#123B70]/80 border border-[#C8A96B]/40 text-[#C8A96B] text-[10px] uppercase tracking-[0.3em] font-semibold"><CompassIcon className="w-3.5 h-3.5" /><span>BESPOKE ADVENTURES</span></div>
              <h1 className="text-4xl sm:text-7xl font-serif text-[#F5F1E8]">CURATED EXPERIENCES</h1>
              <p className="text-sm sm:text-base text-[#8B96A8] max-w-2xl font-serif italic">From private marine charters to rooftop aviation transfers, our Head Butler desk tailors every moment to your exact desires.</p>
            </div>
          </ScrollReveal>
        </section>

        <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 pointer-events-auto">
          {EXPERIENCES.map((exp, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 200} duration={900}>
              <div className="rounded-3xl backdrop-blur-2xl bg-[#0B1F3A]/85 border border-[#C8A96B]/30 overflow-hidden shadow-2xl group hover:border-[#C8A96B] transition-all flex flex-col justify-between h-full">
                <div className="h-64 w-full overflow-hidden">
                  <img src={exp.image} alt={exp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#C8A96B] font-semibold">{exp.category}</span>
                    <h3 className="text-2xl font-serif text-[#F5F1E8] mt-1">{exp.title}</h3>
                    <p className="text-xs text-[#8B96A8] leading-relaxed mt-3">{exp.description}</p>
                  </div>
                  <div className="pt-4 border-t border-[#C8A96B]/15">
                    <button onClick={() => setBookingModalOpen(true)} className="w-full py-3 rounded-full bg-gradient-to-r from-[#C8A96B] to-[#A68848] text-[#07111F] font-bold text-xs uppercase tracking-widest text-center hover:shadow-[0_0_20px_rgba(200,169,107,0.4)] transition-all">Inquire Experience</button>
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
