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

// Dynamic import for 3D VR Canvas to avoid SSR issues
const HotelCanvas = dynamic(() => import('@/components/3d/HotelCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#050C18]">
      <Sparkles className="w-8 h-8 text-[#C8A96B] animate-spin" />
      <span className="mt-3 text-xs uppercase tracking-widest text-[#C8A96B]">Loading Property View...</span>
    </div>
  )
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

  // Map scroll progress (0 to 1) for 3D VR flight camera trajectory
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalHeight));
        setScrollProgress(progress);
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
    <div ref={containerRef} className="relative text-[#F5F1E8] min-h-screen selection:bg-[#C8A96B] selection:text-[#07111F]">
      
      {/* Fixed Luxury Navigation */}
      <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

      {/* FULL-SCREEN PERMANENT 3D VR BACKGROUND VIEWPORT */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-auto">
        <HotelCanvas
          scrollProgress={scrollProgress}
          activeHotspot={activeHotspot}
          onSelectHotspot={handleSelectHotspot}
          showHotspots={true}
          isInteractiveMode={isInteractiveMode}
          onToggleInteractive={() => setIsInteractiveMode(!isInteractiveMode)}
        />
        {/* Subtle Ambient Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050C18]/80 via-transparent to-[#050C18]/50 pointer-events-none" />
      </div>

      {/* SPATIAL 3D VR HUD SCROLLING OVERLAYS (TRANSPARENT SECTIONS) */}
      <div className="relative z-10 w-full pointer-events-none">
        
        {/* SCENE 01 — ARRIVAL HERO */}
        <section className="relative min-h-screen flex flex-col justify-between px-4 sm:px-8 pt-32 pb-16 pointer-events-auto">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Glass VR Spatial HUD */}
            <div className="lg:col-span-7 space-y-6 p-6 sm:p-10 rounded-3xl backdrop-blur-xl bg-[#07111F]/70 border border-[#C8A96B]/30 shadow-[0_20px_60px_rgba(5,12,24,0.85)] max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C8A96B]/50 bg-[#0B1F3A]/90">
                <Sparkles className="w-4 h-4 text-[#C8A96B]" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A96B] font-semibold">
                  SAPPHIRE HOTEL MANAGEMENT
                </span>
              </div>

              <h1 className="text-4xl sm:text-7xl font-serif tracking-tight text-[#F5F1E8] leading-[0.95]">
                SAPPHIRE GRAND
              </h1>

              <div className="text-xl sm:text-3xl font-serif italic text-[#C8A96B]">
                THE ART OF STAYING.
              </div>

              <p className="text-xs sm:text-sm text-[#8B96A8] leading-relaxed font-light">
                A next-generation hospitality platform powering luxury operations, real-time guest management, Michelin gastronomy, and thermal spa sanctuaries — all unified under one intelligent system.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('digital-twin-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#C8A96B] to-[#A68848] text-[#07111F] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(200,169,107,0.5)] transition-all flex items-center gap-2"
                >
                  <Compass className="w-4 h-4" />
                  <span>EXPLORE THE PROPERTY</span>
                </button>

                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="px-6 py-3.5 rounded-full border border-[#C8A96B]/40 bg-[#0B1F3A]/90 text-[#F5F1E8] font-semibold text-xs uppercase tracking-widest hover:border-[#C8A96B] hover:bg-[#123B70]/80 transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#C8A96B]" />
                  <span>CHECK AVAILABILITY</span>
                </button>
              </div>
            </div>



          </div>

          {/* Floating Booking Search Bar */}
          <div className="w-full pt-12">
            <BookingBar onOpenBooking={() => setBookingModalOpen(true)} />
          </div>
        </section>


        {/* SCENE 02 — THE ENTRANCE REVEAL */}
        <section className="relative min-h-[80vh] flex items-center justify-center px-4 sm:px-8 py-24 pointer-events-auto">
          <ScrollReveal direction="scale" duration={1000}>
          <div className="max-w-2xl mx-auto text-center space-y-6 p-8 sm:p-12 rounded-3xl backdrop-blur-2xl bg-[#0B1F3A]/80 border border-[#C8A96B]/40 shadow-2xl">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C8A96B] font-semibold">
              SCENE 02 — THE ARRIVAL
            </span>

            <h2 className="text-3xl sm:text-5xl font-serif text-[#F5F1E8]">
              WELCOME TO SAPPHIRE GRAND
            </h2>

            <p className="text-base sm:text-lg font-serif italic text-[#C8A96B]">
              "Every arrival is an experience."
            </p>

            <p className="text-xs sm:text-sm text-[#8B96A8] leading-relaxed max-w-xl mx-auto font-light">
              Step through the grand canopy entrance into a world of custom architectural lighting, biometric concierge recognition, and seamless digital check-in — your luxury stay begins the moment you arrive.
            </p>
          </div>
          </ScrollReveal>
        </section>


        {/* SCENE 03 — MORE THAN A HOTEL */}
        <section className="relative min-h-screen flex items-center px-4 sm:px-8 py-24 pointer-events-auto">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Glass Panel */}
            <ScrollReveal className="lg:col-span-6 w-full" direction="left" duration={900}>
            <div className="space-y-6 p-8 sm:p-10 rounded-3xl backdrop-blur-xl bg-[#07111F]/90 border border-[#C8A96B]/30 shadow-2xl">
              <span className="text-xs uppercase tracking-[0.3em] text-[#C8A96B] font-semibold">
                SCENE 03 — PHILOSOPHY
              </span>

              <h2 className="text-3xl sm:text-5xl font-serif text-[#F5F1E8] leading-tight">
                MORE THAN A HOTEL.
              </h2>

              <p className="text-base sm:text-lg font-serif italic text-[#C8A96B]">
                Every arrival is an experience. Every detail has a purpose.
              </p>

              <p className="text-xs sm:text-sm text-[#8B96A8] leading-relaxed font-light">
                Sapphire Grand & Resort represents the convergence of international architectural design and intelligent property management technology — built for operators who demand precision.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#C8A96B]/20">
                <div>
                  <div className="text-3xl font-serif text-[#C8A96B]">100%</div>
                  <div className="text-xs text-[#8B96A8]">Acoustic Isolation</div>
                </div>
                <div>
                  <div className="text-3xl font-serif text-[#C8A96B]">24 / 7</div>
                  <div className="text-xs text-[#8B96A8]">Dedicated Butler Desk</div>
                </div>
              </div>
            </div>
            </ScrollReveal>

            <ScrollReveal className="lg:col-span-6 w-full" direction="right" delay={200} duration={900}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-3xl backdrop-blur-xl bg-[#0B1F3A]/85 border border-[#C8A96B]/30 overflow-hidden shadow-xl">
                <div className="h-44 w-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80" 
                    alt="Façade entrance" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-serif text-lg text-[#F5F1E8]">Architectural Canopy</h4>
                  <p className="text-xs text-[#8B96A8] mt-1">Main resort entrance with warm ambient lighting.</p>
                </div>
              </div>

              <div className="rounded-3xl backdrop-blur-xl bg-[#0B1F3A]/85 border border-[#C8A96B]/30 overflow-hidden shadow-xl">
                <div className="h-44 w-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" 
                    alt="Grand Marble Foyer" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-serif text-lg text-[#F5F1E8]">Marble Foyer</h4>
                  <p className="text-xs text-[#8B96A8] mt-1">Italian marble atrium and concierge desk.</p>
                </div>
              </div>
            </div>
            </ScrollReveal>

          </div>
        </section>


        {/* SCENE 04 — DIGITAL TWIN INTERACTION */}
        <section id="digital-twin-section" className="relative min-h-screen flex items-center px-4 sm:px-8 py-24 pointer-events-auto">
          <div className="max-w-7xl mx-auto w-full space-y-8">
            
            <div className="p-8 rounded-3xl backdrop-blur-xl bg-[#07111F]/70 border border-[#C8A96B]/30 shadow-2xl flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.3em] text-[#C8A96B] font-semibold">
                  SCENE 04 — PROPERTY MAP
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif text-[#F5F1E8]">
                  EXPLORE THE HOTEL
                </h2>
                <p className="text-xs sm:text-sm text-[#8B96A8] font-serif italic">
                  INTERACTIVE BUILDING ZONES & AMENITIES
                </p>
              </div>

              {/* Hotspot Selector Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {HOTSPOTS.map((hotspot) => {
                  const isActive = activeHotspot?.id === hotspot.id;
                  return (
                    <button
                      key={hotspot.id}
                      onClick={() => handleSelectHotspot(hotspot)}
                      className={`px-4 py-2 rounded-full border text-xs font-serif tracking-wider transition-all whitespace-nowrap ${
                        isActive 
                          ? 'bg-[#C8A96B] text-[#07111F] border-[#F5F1E8] font-bold shadow-[0_0_15px_rgba(200,169,107,0.5)]'
                          : 'bg-[#0B1F3A]/90 text-[#F5F1E8] border-[#C8A96B]/30 hover:border-[#C8A96B]'
                      }`}
                    >
                      {hotspot.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hotspot Information HUD Panel */}
            {activeHotspot && (
              <div className="p-8 rounded-3xl backdrop-blur-2xl bg-[#0B1F3A]/90 border border-[#C8A96B]/50 max-w-xl animate-in fade-in duration-300 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-[#C8A96B] font-semibold">{activeHotspot.category}</span>
                  <button 
                    onClick={() => setActiveHotspot(null)}
                    className="text-[#8B96A8] hover:text-[#F5F1E8]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <h3 className="text-2xl font-serif text-[#F5F1E8]">{activeHotspot.name}</h3>
                <p className="text-xs sm:text-sm text-[#8B96A8] leading-relaxed">{activeHotspot.description}</p>
                <div className="pt-2">
                  <button
                    onClick={() => setBookingModalOpen(true)}
                    className="px-6 py-2.5 rounded-full bg-[#C8A96B] text-[#07111F] text-xs font-bold uppercase tracking-widest hover:bg-[#E8D49B] transition-colors"
                  >
                    Reserve Zone Access
                  </button>
                </div>
              </div>
            )}

          </div>
        </section>


        {/* SCENE 05 — ROOMS & SUITES */}
        <section className="relative px-4 sm:px-8 py-24 pointer-events-auto">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="p-8 rounded-3xl backdrop-blur-xl bg-[#07111F]/70 border border-[#C8A96B]/30 shadow-2xl flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-[#C8A96B] font-semibold">ACCOMMODATIONS</span>
                <h2 className="text-3xl sm:text-5xl font-serif text-[#F5F1E8] mt-1">
                  CHOOSE YOUR EXPERIENCE
                </h2>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 bg-[#0B1F3A]/90 p-1.5 rounded-full border border-[#C8A96B]/40">
                {(['ROOM', 'SUITE', 'RESIDENCE'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveRoomCategory(cat)}
                    className={`px-5 py-2 rounded-full text-xs font-serif tracking-widest uppercase transition-all duration-300 ${
                      activeRoomCategory === cat
                        ? 'bg-[#C8A96B] text-[#07111F] font-bold shadow-[0_0_15px_rgba(200,169,107,0.5)]'
                        : 'text-[#8B96A8] hover:text-[#F5F1E8]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Clean Grid Cards (Image Top, Dedicated Text Bottom — No Overlapping) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredRooms.map((room) => (
                <div 
                  key={room.id}
                  className="rounded-3xl backdrop-blur-2xl bg-[#0B1F3A]/85 border border-[#C8A96B]/30 overflow-hidden shadow-2xl hover:border-[#C8A96B] transition-all duration-500 flex flex-col justify-between group"
                >
                  {/* Clean Upper Image Container */}
                  <div className="h-64 sm:h-72 w-full overflow-hidden relative">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Clean Dedicated Bottom Text Container */}
                  <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-[#C8A96B] font-semibold">{room.category}</span>
                        <span className="text-sm font-serif text-[#C8A96B] font-semibold">${room.price} / night</span>
                      </div>
                      <h3 className="text-2xl font-serif text-[#F5F1E8] group-hover:text-[#C8A96B] transition-colors mt-1">{room.name}</h3>
                      <p className="text-xs text-[#C8A96B] italic font-serif mt-0.5">{room.tagline}</p>
                      <p className="text-xs sm:text-sm text-[#8B96A8] leading-relaxed mt-3">{room.description}</p>
                    </div>

                    <div className="pt-4 border-t border-[#C8A96B]/20 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {room.features.map((feat, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-full bg-[#07111F]/80 text-[11px] text-[#8B96A8] border border-[#123B70]">
                            {feat}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={() => setBookingModalOpen(true)}
                          className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#C8A96B] to-[#A68848] text-[#07111F] font-bold text-xs uppercase tracking-widest text-center hover:shadow-[0_0_20px_rgba(200,169,107,0.5)] transition-all"
                        >
                          Reserve
                        </button>
                        <button
                          onClick={() => setSelected360Room(room)}
                          className="px-5 py-3 rounded-full border border-[#C8A96B]/40 text-[#F5F1E8] text-xs uppercase tracking-widest hover:border-[#C8A96B] hover:bg-[#123B70]/60 transition-all flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#C8A96B]" />
                          <span>View 360°</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </section>


        {/* SCENE 06 — GASTRONOMY (DINING) */}
        <section className="relative px-4 sm:px-8 py-24 pointer-events-auto">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="p-8 rounded-3xl backdrop-blur-xl bg-[#07111F]/70 border border-[#C8A96B]/30 shadow-2xl">
              <span className="text-xs uppercase tracking-[0.3em] text-[#C8A96B] font-semibold">GASTRONOMY</span>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#F5F1E8] mt-1">
                ANOTHER REASON TO STAY.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {DINING_DATA.map((dining) => (
                <div
                  key={dining.id}
                  className="rounded-3xl backdrop-blur-2xl bg-[#0B1F3A]/85 border border-[#C8A96B]/30 overflow-hidden shadow-2xl group hover:border-[#C8A96B] transition-all flex flex-col justify-between"
                >
                  <div className="h-56 w-full overflow-hidden">
                    <img
                      src={dining.image}
                      alt={dining.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#C8A96B] font-semibold">{dining.cuisine}</span>
                      <h3 className="text-xl font-serif text-[#F5F1E8] mt-0.5">{dining.name}</h3>
                      <p className="text-xs text-[#C8A96B] italic font-serif mt-0.5">{dining.tagline}</p>
                      <p className="text-xs text-[#8B96A8] leading-relaxed mt-2">{dining.description}</p>
                    </div>
                    
                    <div className="pt-3 border-t border-[#C8A96B]/20 text-[11px] text-[#8B96A8] space-y-1">
                      <div>Hours: <span className="text-[#F5F1E8]">{dining.hours}</span></div>
                      <div>Dress Code: <span className="text-[#C8A96B]">{dining.dressCode}</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>


        {/* SCENE 07 — WELLNESS EXPERIENCE */}
        <section className="relative px-4 sm:px-8 py-24 pointer-events-auto">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="text-center max-w-2xl mx-auto space-y-3 p-8 rounded-3xl backdrop-blur-xl bg-[#07111F]/70 border border-[#C8A96B]/30 shadow-2xl">
              <span className="text-xs uppercase tracking-[0.3em] text-[#C8A96B] font-semibold">SAPPHIRE THERMAL SPA</span>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#F5F1E8]">
                REST. RESET. RETURN.
              </h2>
              <p className="text-xs sm:text-sm text-[#8B96A8] leading-relaxed">
                Dedicated sanctuaries for organic hydrotherapy, Himalayan salt saunas, ice fountains, and temperature-controlled infinity skyline pools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {WELLNESS_DATA.map((wellness) => (
                <div
                  key={wellness.id}
                  className="rounded-3xl backdrop-blur-2xl bg-[#0B1F3A]/85 border border-[#C8A96B]/30 overflow-hidden shadow-2xl group hover:border-[#C8A96B] transition-all flex flex-col justify-between"
                >
                  <div className="h-60 w-full overflow-hidden">
                    <img
                      src={wellness.image}
                      alt={wellness.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-serif text-[#F5F1E8]">{wellness.name}</h3>
                      <p className="text-xs text-[#C8A96B] font-serif italic mt-0.5">{wellness.tagline}</p>
                      <p className="text-xs text-[#8B96A8] leading-relaxed mt-2">{wellness.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>


        {/* SCENE 08 — GLOBAL DESTINATIONS */}
        <section className="relative px-4 sm:px-8 py-24 pointer-events-auto">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="p-8 rounded-3xl backdrop-blur-xl bg-[#07111F]/70 border border-[#C8A96B]/30 shadow-2xl flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-[#C8A96B] font-semibold">PORTFOLIO CONCEPTS</span>
                <h2 className="text-3xl sm:text-5xl font-serif text-[#F5F1E8] mt-1">
                  WHERE THE WORLD MEETS.
                </h2>
              </div>
              <p className="text-xs text-[#8B96A8] max-w-md">
                Conceptual international properties designed under Sapphire Hotel Management standards.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {DESTINATIONS_DATA.map((dest) => (
                <div
                  key={dest.id}
                  className="rounded-3xl backdrop-blur-2xl bg-[#0B1F3A]/85 border border-[#C8A96B]/30 overflow-hidden shadow-2xl group hover:border-[#C8A96B] transition-all flex flex-col justify-between"
                >
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.city}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#C8A96B] font-semibold">{dest.status}</span>
                      <h3 className="text-xl font-serif text-[#F5F1E8] mt-0.5">{dest.city}</h3>
                      <p className="text-xs text-[#C8A96B] font-serif">{dest.country}</p>
                      <p className="text-xs text-[#8B96A8] leading-relaxed mt-2">{dest.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>


        {/* SCENE 09 — MASONRY GALLERY */}
        <section className="relative px-4 sm:px-8 py-24 pointer-events-auto">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="p-8 rounded-3xl backdrop-blur-xl bg-[#07111F]/70 border border-[#C8A96B]/30 shadow-2xl flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-[#C8A96B] font-semibold">VISUAL PORTFOLIO</span>
                <h2 className="text-3xl sm:text-5xl font-serif text-[#F5F1E8] mt-1">
                  ARCHITECTURAL GALLERY
                </h2>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {['All', 'Hotel', 'Rooms', 'Dining', 'Wellness', 'Experiences'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setGalleryFilter(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-serif tracking-wider transition-all ${
                      galleryFilter === cat
                        ? 'bg-[#C8A96B] text-[#07111F] font-bold'
                        : 'bg-[#0B1F3A]/90 text-[#8B96A8] hover:text-[#F5F1E8]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Clean Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedGalleryItem(item)}
                  className="rounded-3xl backdrop-blur-2xl bg-[#0B1F3A]/85 border border-[#C8A96B]/30 overflow-hidden shadow-xl group cursor-pointer hover:border-[#C8A96B] transition-all"
                >
                  <div className="h-56 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#C8A96B] font-semibold">{item.category}</span>
                      <h4 className="font-serif text-base text-[#F5F1E8]">{item.title}</h4>
                    </div>
                    <Maximize2 className="w-4 h-4 text-[#C8A96B]" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>


        {/* SCENE 10 — SAAS MANAGEMENT PORTAL TRANSITION */}
        <section className="relative px-4 sm:px-8 py-28 pointer-events-auto">
          <div className="max-w-4xl mx-auto text-center space-y-8 p-8 sm:p-12 rounded-3xl backdrop-blur-2xl bg-[#0B1F3A]/90 border border-[#C8A96B]/40 shadow-[0_25px_80px_rgba(5,12,24,0.95)]">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#123B70]/90 border border-[#C8A96B]/50 text-[#C8A96B] text-xs font-semibold uppercase tracking-[0.3em]">
              <ShieldCheck className="w-4 h-4" />
              <span>SAPPHIRE HOTEL MANAGEMENT PLATFORM</span>
            </div>

            <h2 className="text-3xl sm:text-6xl font-serif text-[#F5F1E8] leading-tight">
              BEYOND THE STAY.
            </h2>

            <p className="text-sm sm:text-lg font-serif italic text-[#8B96A8] max-w-2xl mx-auto">
              "A complete digital hospitality platform powering operations, guest CRM, housekeeping dispatches, and real-time revenue analytics."
            </p>

            <div className="pt-4">
              <Link
                href="/admin"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-[#C8A96B] to-[#A68848] text-[#07111F] font-bold text-sm uppercase tracking-widest shadow-[0_0_35px_rgba(200,169,107,0.6)] hover:scale-105 transition-all group"
              >
                <span>ENTER MANAGEMENT DASHBOARD</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />

      </div>

      {/* Floating AI Concierge Widget */}
      <AIConcierge />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialRoomId={bookingRoomId}
      />

      {/* 360 Simulated Tour Modal */}
      {selected360Room && (
        <Simulated360Modal
          isOpen={!!selected360Room}
          onClose={() => setSelected360Room(null)}
          room={selected360Room}
        />
      )}

      {/* Gallery Lightbox */}
      {selectedGalleryItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07111F]/95 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="relative max-w-5xl w-full rounded-2xl overflow-hidden border border-[#C8A96B]/30 bg-[#0B1F3A]">
            <button
              onClick={() => setSelectedGalleryItem(null)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-[#07111F]/80 text-[#F5F1E8] hover:text-[#C8A96B] z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedGalleryItem.image}
              alt={selectedGalleryItem.title}
              className="w-full max-h-[80vh] object-contain bg-black"
            />
            <div className="p-6 bg-[#07111F] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C8A96B] font-semibold">{selectedGalleryItem.category}</span>
                <h3 className="text-xl font-serif text-[#F5F1E8]">{selectedGalleryItem.title}</h3>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
