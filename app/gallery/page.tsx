'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VRImageCard from '@/components/VRImageCard';
import VRScrollRotateCard from '@/components/VRScrollRotateCard';
import BookingModal from '@/components/BookingModal';
import AIConcierge from '@/components/AIConcierge';
import { GALLERY_DATA, GalleryItem } from '@/lib/mock-data';
import { Camera, Maximize2, X } from 'lucide-react';

export default function GalleryPage() {
  const [galleryFilter, setGalleryFilter] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const filteredGallery = galleryFilter === 'All' ? GALLERY_DATA : GALLERY_DATA.filter((g) => g.category === galleryFilter);

  return (
    <div className="relative text-[#0F172A] min-h-screen bg-[#FFFFFF]">
      <div className="relative z-10 pointer-events-auto">
        <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

        <section className="relative pt-36 pb-16 px-4 sm:px-8">
          <VRScrollRotateCard>
            <div className="max-w-7xl mx-auto space-y-4 p-8 sm:p-10 rounded-3xl bg-white border border-[#CBD5E1] shadow-[0_15px_40px_rgba(10,23,44,0.06)]">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4EFE6] border border-[#B8860B]/40 text-[#0A172C] text-[10px] uppercase tracking-[0.3em] font-semibold"><Camera className="w-3.5 h-3.5 text-[#B8860B]" /><span>VISUAL PORTFOLIO</span></div>
              <h1 className="text-4xl sm:text-7xl font-serif font-bold text-[#0A172C]">ARCHITECTURAL GALLERY</h1>
              <p className="text-sm sm:text-base text-[#475569] max-w-2xl font-serif italic">High-resolution captures of Sapphire Grand's exterior facades, luxury suites, and thermal spa sanctuaries.</p>
              <div className="flex flex-wrap gap-2 pt-4">
                {['All', 'Hotel', 'Rooms', 'Dining', 'Wellness', 'Experiences'].map((cat) => (
                  <button key={cat} onClick={() => setGalleryFilter(cat)} className={`px-5 py-2 rounded-full text-xs font-serif tracking-wider transition-all ${galleryFilter === cat ? 'bg-[#0A172C] text-white font-bold shadow-md' : 'bg-[#F8FAFC] text-[#475569] border border-[#CBD5E1] hover:text-[#0A172C]'}`}>{cat}</button>
                ))}
              </div>
            </div>
          </VRScrollRotateCard>
        </section>

        <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <VRScrollRotateCard key={item.id}>
                <div onClick={() => setSelectedItem(item)} className="rounded-3xl bg-white border border-[#CBD5E1] overflow-hidden shadow-[0_15px_40px_rgba(10,23,44,0.06)] group cursor-pointer hover:border-[#0A172C] transition-all">
                  <VRImageCard src={item.image} alt={item.title} className="h-56 w-full rounded-b-none border-none" />
                  <div className="p-5 flex items-center justify-between">
                    <div><span className="text-[10px] uppercase tracking-widest text-[#B8860B] font-semibold">{item.category}</span><h4 className="font-serif font-bold text-base text-[#0A172C]">{item.title}</h4></div>
                    <Maximize2 className="w-4 h-4 text-[#B8860B]" />
                  </div>
                </div>
              </VRScrollRotateCard>
            ))}
          </div>
        </section>

        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl pointer-events-auto">
            <div className="relative max-w-5xl w-full rounded-2xl overflow-hidden border border-[#CBD5E1] bg-white">
              <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 p-2.5 rounded-full bg-[#0A172C] text-white hover:bg-[#B8860B] z-10"><X className="w-6 h-6" /></button>
              <img src={selectedItem.image} alt={selectedItem.title} className="w-full max-h-[80vh] object-contain bg-black" />
              <div className="p-6 bg-white flex items-center justify-between">
                <div><span className="text-[10px] uppercase tracking-widest text-[#B8860B] font-semibold">{selectedItem.category}</span><h3 className="text-xl font-serif font-bold text-[#0A172C]">{selectedItem.title}</h3></div>
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
