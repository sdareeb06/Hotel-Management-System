'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import BookingModal from '@/components/BookingModal';
import AIConcierge from '@/components/AIConcierge';
import { GALLERY_DATA, GalleryItem } from '@/lib/mock-data';
import { Camera, Maximize2, X } from 'lucide-react';

const HotelCanvas = dynamic(() => import('@/components/3d/HotelCanvas'), {
  ssr: false
});

export default function GalleryPage() {
  const [galleryFilter, setGalleryFilter] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const filteredGallery = galleryFilter === 'All' ? GALLERY_DATA : GALLERY_DATA.filter((g) => g.category === galleryFilter);

  return (
    <div className="relative text-[#F5F1E8] min-h-screen">
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-auto">
        <HotelCanvas scrollProgress={0.25} activeHotspot={null} onSelectHotspot={() => {}} showHotspots={false} isInteractiveMode={false} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050C18]/90 via-[#050C18]/65 to-[#050C18]/70 pointer-events-none" />
      </div>

      <div className="relative z-10 pointer-events-none">
        <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

        <section className="relative pt-36 pb-16 px-4 sm:px-8 pointer-events-auto">
          <ScrollReveal direction="up" duration={900}>
            <div className="max-w-7xl mx-auto space-y-4 p-8 sm:p-10 rounded-3xl backdrop-blur-xl bg-[#07111F]/70 border border-[#C8A96B]/30 shadow-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#123B70]/80 border border-[#C8A96B]/40 text-[#C8A96B] text-[10px] uppercase tracking-[0.3em] font-semibold"><Camera className="w-3.5 h-3.5" /><span>VISUAL PORTFOLIO</span></div>
              <h1 className="text-4xl sm:text-7xl font-serif text-[#F5F1E8]">ARCHITECTURAL GALLERY</h1>
              <p className="text-sm sm:text-base text-[#8B96A8] max-w-2xl font-serif italic">High-resolution captures of Sapphire Grand's exterior facades, luxury suites, and thermal spa sanctuaries.</p>
              <div className="flex flex-wrap gap-2 pt-4">
                {['All', 'Hotel', 'Rooms', 'Dining', 'Wellness', 'Experiences'].map((cat) => (
                  <button key={cat} onClick={() => setGalleryFilter(cat)} className={`px-5 py-2 rounded-full text-xs font-serif tracking-wider transition-all ${galleryFilter === cat ? 'bg-[#C8A96B] text-[#07111F] font-bold shadow-[0_0_15px_rgba(200,169,107,0.4)]' : 'bg-[#0B1F3A]/80 text-[#8B96A8] border border-[#123B70] hover:text-[#F5F1E8]'}`}>{cat}</button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto pointer-events-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item, idx) => (
              <ScrollReveal key={item.id} direction="scale" delay={idx * 100} duration={800}>
                <div onClick={() => setSelectedItem(item)} className="rounded-3xl backdrop-blur-2xl bg-[#0B1F3A]/85 border border-[#C8A96B]/30 overflow-hidden shadow-xl group cursor-pointer hover:border-[#C8A96B] transition-all">
                  <div className="h-56 w-full overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div><span className="text-[10px] uppercase tracking-widest text-[#C8A96B] font-semibold">{item.category}</span><h4 className="font-serif text-base text-[#F5F1E8]">{item.title}</h4></div>
                    <Maximize2 className="w-4 h-4 text-[#C8A96B]" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07111F]/95 backdrop-blur-2xl pointer-events-auto">
            <div className="relative max-w-5xl w-full rounded-2xl overflow-hidden border border-[#C8A96B]/30 bg-[#0B1F3A]">
              <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 p-2.5 rounded-full bg-[#07111F]/80 text-[#F5F1E8] hover:text-[#C8A96B] z-10"><X className="w-6 h-6" /></button>
              <img src={selectedItem.image} alt={selectedItem.title} className="w-full max-h-[80vh] object-contain bg-black" />
              <div className="p-6 bg-[#07111F] flex items-center justify-between">
                <div><span className="text-[10px] uppercase tracking-widest text-[#C8A96B] font-semibold">{selectedItem.category}</span><h3 className="text-xl font-serif text-[#F5F1E8]">{selectedItem.title}</h3></div>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
      <AIConcierge />
      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </div>
  );
}
