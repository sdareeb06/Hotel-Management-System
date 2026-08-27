'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import BookingBar from '@/components/BookingBar';
import BookingModal from '@/components/BookingModal';
import AIConcierge from '@/components/AIConcierge';
import Simulated360Modal from '@/components/Simulated360Modal';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import VRImageCard from '@/components/VRImageCard';
import { HOTSPOTS, HotspotData } from '@/components/3d/DigitalTwinHotspots';
import { 
  ROOMS_DATA, 
  DINING_DATA, 
  WELLNESS_DATA, 
  DESTINATIONS_DATA, 
  GALLERY_DATA, 
  RoomItem,
  GalleryItem 
} from '@/lib/mock-data';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Eye, 
  Calendar, 
  X, 
  ShieldCheck, 
  Maximize2
} from 'lucide-react';

const HotelCanvas = dynamic(() => import('@/components/3d/HotelCanvas'), {
  ssr: false
});

export default function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<HotspotData | null>(null);
  const [isInteractiveMode, setIsInteractiveMode] = useState(false);
  const [activeRoomCategory, setActiveRoomCategory] = useState<'ROOM' | 'SUITE' | 'RESIDENCE'>('SUITE');
  const [selected360Room, setSelected360Room] = useState<RoomItem | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<string>('All');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingRoomId, setBookingRoomId] = useState<string | undefined>();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let requestRunning = false;

    const handleScroll = () => {
      if (!requestRunning) {
        requestRunning = true;
        requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const progress = Math.min(1, Math.max(0, window.scrollY / totalHeight));
            setScrollProgress(progress);
          }
          requestRunning = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectHotspot = (hotspot: HotspotData) => {
    setActiveHotspot(hotspot);
  };

  const filteredRooms = ROOMS_DATA.filter((r) => r.category === activeRoomCategory);

  const filteredGallery = galleryFilter === 'All' 
    ? GALLERY_DATA 
    : GALLERY_DATA.filter((g) => g.category === galleryFilter);

  return (
    <div ref={containerRef} className="relative text-[#F9F8F6] min-h-screen selection:bg-[#D4AF37] selection:text-[#030712] bg-[#030712]">
      
      <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

      {/* PERMANENT 3D BACKGROUND CANVAS */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-auto">
        <HotelCanvas
          scrollProgress={scrollProgress}
          activeHotspot={activeHotspot}
          onSelectHotspot={handleSelectHotspot}
          showHotspots={false}
          isInteractiveMode={isInteractiveMode}
          onToggleInteractive={() => setIsInteractiveMode(!isInteractiveMode)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/60 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 w-full pointer-events-none">
        
        {/* SCENE 01 — HERO ARRIVAL */}
        <section className="relative min-h-screen flex flex-col justify-between px-4 sm:px-8 pt-28 sm:pt-36 pb-16 pointer-events-auto">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-6 space-y-5 p-6 sm:p-10 rounded-3xl bg-[#0B1320]/95 border border-[#D4AF37]/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] max-w-xl w-full">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#030712]/80">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                  SAPPHIRE HOTEL MANAGEMENT
                </span>
              </div>

              <h1 className="text-3xl sm:text-6xl font-serif tracking-tight text-[#F9F8F6] leading-[0.95]">
                SAPPHIRE GRAND
              </h1>

              <div className="text-lg sm:text-2xl font-serif italic text-[#D4AF37]">
                THE ART OF STAYING.
              </div>

              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-light">
                A next-generation hospitality platform powering luxury resort operations, guest management, Michelin gastronomy, and thermal spa sanctuaries.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('digital-twin-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA8535] text-[#030712] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>EXPLORE PROPERTY</span>
                </button>

                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="px-6 py-3 rounded-full border border-[#D4AF37]/40 bg-[#030712]/80 text-[#F9F8F6] font-semibold text-xs uppercase tracking-widest hover:border-[#D4AF37] hover:bg-[#0F2038]/80 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  <span>CHECK AVAILABILITY</span>
                </button>
              </div>
            </div>

          </div>

          <div className="w-full pt-10">
            <BookingBar onOpenBooking={() => setBookingModalOpen(true)} />
          </div>
        </section>


        {/* SCENE 02 — THE ARRIVAL */}
        <section className="relative min-h-[85vh] flex items-center px-4 sm:px-8 py-20 pointer-events-auto">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
            <ScrollReveal className="lg:col-span-6 w-full" direction="left" duration={650}>
              <div className="space-y-5 p-6 sm:p-10 rounded-3xl bg-[#0B1320]/95 border border-[#D4AF37]/30 shadow-2xl max-w-xl w-full">
                <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-semibold">
                  SCENE 02 — THE ARRIVAL
                </span>

                <h2 className="text-2xl sm:text-5xl font-serif text-[#F9F8F6]">
                  WELCOME TO SAPPHIRE GRAND
                </h2>

                <p className="text-base sm:text-lg font-serif italic text-[#D4AF37]">
                  "Every arrival is an experience."
                </p>

                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-light">
                  Step through the grand canopy entrance into custom architectural lighting, biometric concierge recognition, and seamless digital check-in.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>


        {/* SCENE 03 — PHILOSOPHY */}
        <section className="relative min-h-screen flex items-center px-4 sm:px-8 py-20 pointer-events-auto">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <ScrollReveal className="lg:col-span-6 w-full" direction="left" duration={650}>
              <div className="space-y-5 p-6 sm:p-10 rounded-3xl bg-[#0B1320]/95 border border-[#D4AF37]/30 shadow-2xl max-w-xl w-full">
                <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                  SCENE 03 — PHILOSOPHY
                </span>

                <h2 className="text-2xl sm:text-5xl font-serif text-[#F9F8F6] leading-tight">
                  MORE THAN A HOTEL.
                </h2>

                <p className="text-base sm:text-lg font-serif italic text-[#D4AF37]">
                  Every arrival is an experience. Every detail has a purpose.
                </p>

                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-light">
                  Sapphire Grand & Resort represents the convergence of international architectural design and intelligent property management technology.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#D4AF37]/20">
                  <div>
                    <div className="text-2xl sm:text-3xl font-serif text-[#D4AF37]">100%</div>
                    <div className="text-xs text-[#94A3B8]">Acoustic Isolation</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-serif text-[#D4AF37]">24 / 7</div>
                    <div className="text-xs text-[#94A3B8]">Dedicated Butler Desk</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal className="lg:col-span-6 w-full" direction="right" delay={150} duration={650}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="rounded-3xl bg-[#0B1320]/95 border border-[#D4AF37]/30 overflow-hidden shadow-xl">
                  <VRImageCard 
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80" 
                    alt="Façade entrance"
                    className="h-40 sm:h-44 w-full" 
                  />
                  <div className="p-4 sm:p-5">
                    <h4 className="font-serif text-base sm:text-lg text-[#F9F8F6]">Architectural Canopy</h4>
                    <p className="text-xs text-[#94A3B8] mt-1">Main resort entrance with ambient warm lighting.</p>
                  </div>
                </div>

                <div className="rounded-3xl bg-[#0B1320]/95 border border-[#D4AF37]/30 overflow-hidden shadow-xl">
                  <VRImageCard 
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" 
                    alt="Grand Marble Foyer"
                    className="h-40 sm:h-44 w-full" 
                  />
                  <div className="p-4 sm:p-5">
                    <h4 className="font-serif text-base sm:text-lg text-[#F9F8F6]">Marble Foyer</h4>
                    <p className="text-xs text-[#94A3B8] mt-1">Italian marble atrium & concierge desk.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </section>


        {/* SCENE 04 — PROPERTY MAP */}
        <section id="digital-twin-section" className="relative min-h-screen flex items-center px-4 sm:px-8 py-20 pointer-events-auto">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-6 space-y-5">
              <ScrollReveal direction="up">
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1320]/95 border border-[#D4AF37]/30 shadow-2xl space-y-4">
                  <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                    SCENE 04 — PROPERTY MAP
                  </span>
                  <h2 className="text-2xl sm:text-5xl font-serif text-[#F9F8F6]">
                    EXPLORE THE HOTEL
                  </h2>
                  <p className="text-xs sm:text-sm text-[#94A3B8] font-serif italic">
                    INTERACTIVE BUILDING ZONES & AMENITIES
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {HOTSPOTS.map((hotspot) => {
                      const isActive = activeHotspot?.id === hotspot.id;
                      return (
                        <button
                          key={hotspot.id}
                          onClick={() => handleSelectHotspot(hotspot)}
                          className={`px-3.5 py-2 rounded-full border text-xs font-serif tracking-wider transition-all cursor-pointer ${
                            isActive 
                              ? 'bg-[#D4AF37] text-[#030712] border-[#F9F8F6] font-bold shadow-[0_0_15px_rgba(212,175,55,0.5)]'
                              : 'bg-[#030712]/80 text-[#F9F8F6] border-[#D4AF37]/30 hover:border-[#D4AF37]'
                          }`}
                        >
                          {hotspot.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>

              {activeHotspot && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1320]/95 border border-[#D4AF37]/50 space-y-4 shadow-2xl animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">{activeHotspot.category}</span>
                    <button 
                      onClick={() => setActiveHotspot(null)}
                      className="text-[#94A3B8] hover:text-[#F9F8F6] cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif text-[#F9F8F6]">{activeHotspot.name}</h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">{activeHotspot.description}</p>
                  <div className="pt-2">
                    <button
                      onClick={() => setBookingModalOpen(true)}
                      className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-[#030712] text-xs font-bold uppercase tracking-widest hover:bg-[#E8D49B] transition-colors cursor-pointer"
                    >
                      Reserve Zone Access
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>


        {/* SCENE 05 — ROOMS & SUITES */}
        <section className="relative px-4 sm:px-8 py-20 pointer-events-auto">
          <div className="max-w-7xl mx-auto space-y-10">
            
            <ScrollReveal direction="up">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1320]/95 border border-[#D4AF37]/30 shadow-2xl flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-2xl">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">ACCOMMODATIONS</span>
                  <h2 className="text-2xl sm:text-5xl font-serif text-[#F9F8F6] mt-1">
                    CHOOSE YOUR EXPERIENCE
                  </h2>
                </div>

                <div className="flex items-center gap-2 bg-[#030712]/80 p-1.5 rounded-full border border-[#D4AF37]/40">
                  {(['ROOM', 'SUITE', 'RESIDENCE'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveRoomCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-serif tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                        activeRoomCategory === cat
                          ? 'bg-[#D4AF37] text-[#030712] font-bold shadow-[0_0_15px_rgba(212,175,55,0.5)]'
                          : 'text-[#94A3B8] hover:text-[#F9F8F6]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredRooms.map((room, idx) => (
                <ScrollReveal key={room.id} direction={idx % 2 === 0 ? 'left' : 'right'} delay={idx * 100}>
                  <div className="rounded-3xl bg-[#0B1320]/95 border border-[#D4AF37]/30 overflow-hidden shadow-2xl hover:border-[#D4AF37] transition-all duration-500 flex flex-col justify-between group">
                    <VRImageCard 
                      src={room.image} 
                      alt={room.name} 
                      className="h-56 sm:h-72 w-full rounded-b-none border-none"
                    />

                    <div className="p-5 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">{room.category}</span>
                          <span className="text-sm font-serif text-[#D4AF37] font-semibold">${room.price} / night</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-serif text-[#F9F8F6] group-hover:text-[#D4AF37] transition-colors mt-1">{room.name}</h3>
                        <p className="text-xs text-[#D4AF37] italic font-serif mt-0.5">{room.tagline}</p>
                        <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mt-3">{room.description}</p>
                      </div>

                      <div className="pt-4 border-t border-[#D4AF37]/20 space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {room.features.map((feat, fidx) => (
                            <span key={fidx} className="px-3 py-1 rounded-full bg-[#030712]/80 text-[11px] text-[#94A3B8] border border-[#0F2038]">
                              {feat}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                          <button
                            onClick={() => setBookingModalOpen(true)}
                            className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA8535] text-[#030712] font-bold text-xs uppercase tracking-widest text-center hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all cursor-pointer"
                          >
                            Reserve
                          </button>
                          <button
                            onClick={() => setSelected360Room(room)}
                            className="px-4 py-3 rounded-full border border-[#D4AF37]/40 text-[#F9F8F6] text-xs uppercase tracking-widest hover:border-[#D4AF37] hover:bg-[#0F2038]/60 transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>View 360°</span>
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </section>


        {/* SCENE 06 — GASTRONOMY */}
        <section className="relative px-4 sm:px-8 py-20 pointer-events-auto">
          <div className="max-w-7xl mx-auto space-y-10">
            
            <ScrollReveal direction="up">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1320]/95 border border-[#D4AF37]/30 shadow-2xl max-w-2xl">
                <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">GASTRONOMY</span>
                <h2 className="text-2xl sm:text-5xl font-serif text-[#F9F8F6] mt-1">
                  ANOTHER REASON TO STAY.
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {DINING_DATA.map((dining, idx) => (
                <ScrollReveal key={dining.id} direction="up" delay={idx * 80}>
                  <div className="rounded-3xl bg-[#0B1320]/95 border border-[#D4AF37]/30 overflow-hidden shadow-2xl group hover:border-[#D4AF37] transition-all flex flex-col justify-between h-full">
                    <VRImageCard 
                      src={dining.image} 
                      alt={dining.name} 
                      className="h-48 sm:h-56 w-full rounded-b-none border-none"
                    />

                    <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">{dining.cuisine}</span>
                        <h3 className="text-lg sm:text-xl font-serif text-[#F9F8F6] mt-0.5">{dining.name}</h3>
                        <p className="text-xs text-[#D4AF37] italic font-serif mt-0.5">{dining.tagline}</p>
                        <p className="text-xs text-[#94A3B8] leading-relaxed mt-2">{dining.description}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-[#D4AF37]/20 text-[11px] text-[#94A3B8] space-y-1">
                        <div>Hours: <span className="text-[#F9F8F6]">{dining.hours}</span></div>
                        <div>Dress Code: <span className="text-[#D4AF37]">{dining.dressCode}</span></div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </section>


        {/* SCENE 07 — WELLNESS */}
        <section className="relative px-4 sm:px-8 py-20 pointer-events-auto">
          <div className="max-w-7xl mx-auto space-y-10">
            
            <ScrollReveal direction="up">
              <div className="text-center max-w-2xl mx-auto space-y-3 p-6 sm:p-8 rounded-3xl bg-[#0B1320]/95 border border-[#D4AF37]/30 shadow-2xl">
                <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">SAPPHIRE THERMAL SPA</span>
                <h2 className="text-2xl sm:text-5xl font-serif text-[#F9F8F6]">
                  REST. RESET. RETURN.
                </h2>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Dedicated sanctuaries for hydrotherapy, Himalayan salt saunas, ice fountains, and temperature-controlled infinity pools.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {WELLNESS_DATA.map((wellness, idx) => (
                <ScrollReveal key={wellness.id} direction="up" delay={idx * 120}>
                  <div className="rounded-3xl bg-[#0B1320]/95 border border-[#D4AF37]/30 overflow-hidden shadow-2xl group hover:border-[#D4AF37] transition-all flex flex-col justify-between h-full">
                    <VRImageCard 
                      src={wellness.image} 
                      alt={wellness.name} 
                      className="h-56 sm:h-60 w-full rounded-b-none border-none"
                    />
                    <div className="p-5 sm:p-6 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg sm:text-xl font-serif text-[#F9F8F6]">{wellness.name}</h3>
                        <p className="text-xs text-[#D4AF37] font-serif italic mt-0.5">{wellness.tagline}</p>
                        <p className="text-xs text-[#94A3B8] leading-relaxed mt-2">{wellness.description}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </section>


        {/* SCENE 08 — DESTINATIONS */}
        <section className="relative px-4 sm:px-8 py-20 pointer-events-auto">
          <div className="max-w-7xl mx-auto space-y-10">
            
            <ScrollReveal direction="up">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1320]/95 border border-[#D4AF37]/30 shadow-2xl flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-2xl">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">PORTFOLIO CONCEPTS</span>
                  <h2 className="text-2xl sm:text-5xl font-serif text-[#F9F8F6] mt-1">
                    WHERE THE WORLD MEETS.
                  </h2>
                </div>
                <p className="text-xs text-[#94A3B8] max-w-md">
                  Conceptual international properties designed under Sapphire Hotel Management standards.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {DESTINATIONS_DATA.map((dest, idx) => (
                <ScrollReveal key={dest.id} direction="up" delay={idx * 80}>
                  <div className="rounded-3xl bg-[#0B1320]/95 border border-[#D4AF37]/30 overflow-hidden shadow-2xl group hover:border-[#D4AF37] transition-all flex flex-col justify-between h-full">
                    <VRImageCard 
                      src={dest.image} 
                      alt={dest.city} 
                      className="h-44 sm:h-48 w-full rounded-b-none border-none"
                    />

                    <div className="p-5 sm:p-6 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">{dest.status}</span>
                        <h3 className="text-lg sm:text-xl font-serif text-[#F9F8F6] mt-0.5">{dest.city}</h3>
                        <p className="text-xs text-[#D4AF37] font-serif">{dest.country}</p>
                        <p className="text-xs text-[#94A3B8] leading-relaxed mt-2">{dest.description}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </section>


        {/* SCENE 09 — GALLERY */}
        <section className="relative px-4 sm:px-8 py-20 pointer-events-auto">
          <div className="max-w-7xl mx-auto space-y-10">
            
            <ScrollReveal direction="up">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1320]/95 border border-[#D4AF37]/30 shadow-2xl flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-2xl">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">VISUAL PORTFOLIO</span>
                  <h2 className="text-2xl sm:text-5xl font-serif text-[#F9F8F6] mt-1">
                    ARCHITECTURAL GALLERY
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['All', 'Hotel', 'Rooms', 'Dining', 'Wellness', 'Experiences'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setGalleryFilter(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-serif tracking-wider transition-all cursor-pointer ${
                        galleryFilter === cat
                          ? 'bg-[#D4AF37] text-[#030712] font-bold'
                          : 'bg-[#030712]/80 text-[#94A3B8] hover:text-[#F9F8F6]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGallery.map((item, idx) => (
                <ScrollReveal key={item.id} direction="scale" delay={idx * 60}>
                  <div
                    onClick={() => setSelectedGalleryItem(item)}
                    className="rounded-3xl bg-[#0B1320]/95 border border-[#D4AF37]/30 overflow-hidden shadow-xl group cursor-pointer hover:border-[#D4AF37] transition-all"
                  >
                    <VRImageCard 
                      src={item.image} 
                      alt={item.title} 
                      className="h-48 sm:h-56 w-full rounded-b-none border-none"
                    />
                    <div className="p-4 sm:p-5 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">{item.category}</span>
                        <h4 className="font-serif text-sm sm:text-base text-[#F9F8F6]">{item.title}</h4>
                      </div>
                      <Maximize2 className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </section>


        {/* SCENE 10 — SAAS MANAGEMENT PLATFORM */}
        <section className="relative px-4 sm:px-8 py-24 pointer-events-auto">
          <ScrollReveal direction="up">
            <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 p-6 sm:p-12 rounded-3xl bg-[#0B1320]/95 border border-[#D4AF37]/40 shadow-[0_25px_80px_rgba(0,0,0,0.95)]">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F2038]/90 border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-semibold uppercase tracking-[0.3em]">
                <ShieldCheck className="w-4 h-4" />
                <span>SAPPHIRE HOTEL MANAGEMENT PLATFORM</span>
              </div>

              <h2 className="text-3xl sm:text-6xl font-serif text-[#F9F8F6] leading-tight">
                BEYOND THE STAY.
              </h2>

              <p className="text-xs sm:text-lg font-serif italic text-[#94A3B8] max-w-2xl mx-auto">
                "A complete digital hospitality platform powering operations, guest CRM, housekeeping dispatches, and real-time revenue analytics."
              </p>

              <div className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA8535] text-[#030712] font-bold text-xs sm:text-sm uppercase tracking-widest shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:scale-105 transition-all group cursor-pointer"
                >
                  <span>ENTER MANAGEMENT DASHBOARD</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <Footer />

      </div>

      <AIConcierge />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialRoomId={bookingRoomId}
      />

      {selected360Room && (
        <Simulated360Modal
          isOpen={!!selected360Room}
          onClose={() => setSelected360Room(null)}
          room={selected360Room}
        />
      )}

      {selectedGalleryItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030712]/95 backdrop-blur-2xl pointer-events-auto">
          <div className="relative max-w-5xl w-full rounded-2xl overflow-hidden border border-[#D4AF37]/30 bg-[#0B1320]">
            <button
              onClick={() => setSelectedGalleryItem(null)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-[#030712]/80 text-[#F9F8F6] hover:text-[#D4AF37] z-10 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedGalleryItem.image}
              alt={selectedGalleryItem.title}
              className="w-full max-h-[80vh] object-contain bg-black"
            />
            <div className="p-6 bg-[#030712] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">{selectedGalleryItem.category}</span>
                <h3 className="text-xl font-serif text-[#F9F8F6]">{selectedGalleryItem.title}</h3>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
