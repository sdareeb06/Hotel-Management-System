'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import BookingBar from '@/components/BookingBar';
import BookingModal from '@/components/BookingModal';
import AIConcierge from '@/components/AIConcierge';
import Simulated360Modal from '@/components/Simulated360Modal';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import VRImageCard from '@/components/VRImageCard';
import VRScrollRotateCard from '@/components/VRScrollRotateCard';
import HeroVR3DVideoCard from '@/components/HeroVR3DVideoCard';
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

export default function HomePage() {
  const [activeHotspot, setActiveHotspot] = useState<HotspotData | null>(null);
  const [activeRoomCategory, setActiveRoomCategory] = useState<'ROOM' | 'SUITE' | 'RESIDENCE'>('SUITE');
  const [selected360Room, setSelected360Room] = useState<RoomItem | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<string>('All');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingRoomId, setBookingRoomId] = useState<string | undefined>();

  const handleSelectHotspot = (hotspot: HotspotData) => {
    setActiveHotspot(hotspot);
  };

  const filteredRooms = ROOMS_DATA.filter((r) => r.category === activeRoomCategory);

  const filteredGallery = galleryFilter === 'All' 
    ? GALLERY_DATA 
    : GALLERY_DATA.filter((g) => g.category === galleryFilter);

  return (
    <div className="relative text-[#0F172A] min-h-screen selection:bg-[#123B70] selection:text-[#FFFFFF] bg-[#FFFFFF]">
      
      <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

      {/* PURE HD WHITE EDITORIAL CONTAINER */}
      <div className="relative z-10 w-full pointer-events-auto">
        
        {/* SCENE 01 — HERO ARRIVAL WITH CONTINUOUS 3D VR COMMERCIAL IMAGE */}
        <section className="relative min-h-screen flex flex-col justify-between px-4 sm:px-8 pt-28 sm:pt-36 pb-16">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <VRScrollRotateCard className="lg:col-span-6 space-y-6 p-8 sm:p-12 rounded-3xl bg-white border border-[#CBD5E1] shadow-[0_20px_50px_rgba(10,23,44,0.08)] w-full">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B8860B]/40 bg-[#F4EFE6]">
                <Sparkles className="w-4 h-4 text-[#123B70]" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#0A172C] font-bold">
                  SAPPHIRE GRAND · INTERNATIONAL HOSPITALITY
                </span>
              </div>

              <h1 className="text-4xl sm:text-7xl font-serif font-bold tracking-tight text-[#0A172C] leading-[0.95]">
                SAPPHIRE GRAND
              </h1>

              <div className="text-xl sm:text-3xl font-serif italic text-[#B8860B] font-medium">
                THE ART OF STAYING.
              </div>

              <p className="text-xs sm:text-base text-[#475569] leading-relaxed font-normal">
                Where hospitality meets intelligent technology. A next-generation hospitality platform powering luxury resort operations, guest management, Michelin gastronomy, and thermal spa sanctuaries.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('digital-twin-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 rounded-full bg-[#0A172C] text-[#FFFFFF] font-bold text-xs uppercase tracking-widest hover:bg-[#B8860B] shadow-[0_4px_15px_rgba(10,23,44,0.2)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>EXPLORE HOTEL</span>
                </button>

                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="px-8 py-4 rounded-full border border-[#CBD5E1] bg-[#F8FAFC] text-[#0A172C] font-semibold text-xs uppercase tracking-widest hover:border-[#0A172C] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#B8860B]" />
                  <span>CHECK AVAILABILITY</span>
                </button>
              </div>
            </VRScrollRotateCard>

            {/* CONTINUOUS 3D ADVERT MOTION COVER CARD */}
            <div className="lg:col-span-6 w-full">
              <HeroVR3DVideoCard 
                imageSrc="/sapphire-hero-cover.png"
                altText="Sapphire Grand & Resort Architectural Night Pool"
                className="h-[480px] w-full"
              />
            </div>

          </div>

          <div className="w-full pt-10">
            <BookingBar onOpenBooking={() => setBookingModalOpen(true)} />
          </div>
        </section>


        {/* SCENE 02 — THE ARRIVAL */}
        <section className="relative min-h-[80vh] flex items-center px-4 sm:px-8 py-20">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <VRScrollRotateCard className="lg:col-span-6 w-full">
              <div className="space-y-5 p-8 sm:p-10 rounded-3xl bg-white border border-[#CBD5E1] shadow-[0_15px_40px_rgba(10,23,44,0.06)] w-full">
                <span className="text-xs uppercase tracking-[0.35em] text-[#B8860B] font-bold">
                  SECTION 01 — YOUR ARRIVAL
                </span>

                <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#0A172C]">
                  YOUR ARRIVAL STARTS HERE.
                </h2>

                <p className="text-base sm:text-lg font-serif italic text-[#B8860B]">
                  "Every arrival is an experience."
                </p>

                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                  Step through the grand canopy entrance into custom architectural lighting, biometric concierge recognition, and seamless digital check-in.
                </p>
              </div>
            </VRScrollRotateCard>

            <VRScrollRotateCard className="lg:col-span-6">
              <VRImageCard 
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80" 
                alt="Grand Lobby Foyer" 
                className="h-[380px] w-full rounded-3xl"
              />
            </VRScrollRotateCard>

          </div>
        </section>


        {/* SCENE 03 — PHILOSOPHY */}
        <section className="relative min-h-screen flex items-center px-4 sm:px-8 py-20">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <VRScrollRotateCard className="lg:col-span-6 w-full">
              <div className="space-y-5 p-8 sm:p-10 rounded-3xl bg-white border border-[#CBD5E1] shadow-[0_15px_40px_rgba(10,23,44,0.06)] w-full">
                <span className="text-xs uppercase tracking-[0.3em] text-[#B8860B] font-bold">
                  SECTION 02 — THE HOTEL
                </span>

                <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#0A172C] leading-tight">
                  MORE THAN A HOTEL.
                </h2>

                <p className="text-base sm:text-lg font-serif italic text-[#B8860B]">
                  Every space is designed around the experience of the guest.
                </p>

                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                  Sapphire Grand & Resort represents the convergence of international architectural design and intelligent property management technology.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#CBD5E1]">
                  <div>
                    <div className="text-2xl sm:text-3xl font-serif font-bold text-[#0A172C]">100%</div>
                    <div className="text-xs text-[#475569]">Acoustic Isolation</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-serif font-bold text-[#0A172C]">24 / 7</div>
                    <div className="text-xs text-[#475569]">Dedicated Butler Desk</div>
                  </div>
                </div>
              </div>
            </VRScrollRotateCard>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <VRScrollRotateCard>
                <div className="rounded-3xl bg-white border border-[#CBD5E1] overflow-hidden shadow-[0_10px_30px_rgba(10,23,44,0.04)]">
                  <VRImageCard 
                    src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80" 
                    alt="Suite Interior"
                    className="h-44 w-full" 
                  />
                  <div className="p-4 sm:p-5">
                    <h4 className="font-serif font-bold text-base sm:text-lg text-[#0A172C]">Acoustic Suites</h4>
                    <p className="text-xs text-[#475569] mt-1">Soundproofed glass and private loggias.</p>
                  </div>
                </div>
              </VRScrollRotateCard>

              <VRScrollRotateCard>
                <div className="rounded-3xl bg-white border border-[#CBD5E1] overflow-hidden shadow-[0_10px_30px_rgba(10,23,44,0.04)]">
                  <VRImageCard 
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80" 
                    alt="Thermal Spa"
                    className="h-44 w-full" 
                  />
                  <div className="p-4 sm:p-5">
                    <h4 className="font-serif font-bold text-base sm:text-lg text-[#0A172C]">Thermal Spa</h4>
                    <p className="text-xs text-[#475569] mt-1">Hydrotherapy and botanical saunas.</p>
                  </div>
                </div>
              </VRScrollRotateCard>
            </div>

          </div>
        </section>


        {/* SCENE 04 — PROPERTY MAP */}
        <section id="digital-twin-section" className="relative min-h-screen flex items-center px-4 sm:px-8 py-20">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-6 space-y-5">
              <VRScrollRotateCard>
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#CBD5E1] shadow-[0_15px_40px_rgba(10,23,44,0.06)] space-y-4">
                  <span className="text-xs uppercase tracking-[0.3em] text-[#B8860B] font-bold">
                    PROPERTY MAP
                  </span>
                  <h2 className="text-2xl sm:text-5xl font-serif font-bold text-[#0A172C]">
                    EXPLORE THE HOTEL
                  </h2>
                  <p className="text-xs sm:text-sm text-[#475569] font-serif italic">
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
                              ? 'bg-[#0A172C] text-[#FFFFFF] border-[#0A172C] font-bold shadow-md'
                              : 'bg-[#F8FAFC] text-[#0F172A] border-[#CBD5E1] hover:border-[#0A172C]'
                          }`}
                        >
                          {hotspot.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </VRScrollRotateCard>

              {activeHotspot && (
                <VRScrollRotateCard>
                  <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#B8860B]/50 space-y-4 shadow-xl animate-in fade-in duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-[#B8860B] font-bold">{activeHotspot.category}</span>
                      <button 
                        onClick={() => setActiveHotspot(null)}
                        className="text-[#475569] hover:text-[#0A172C] cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0A172C]">{activeHotspot.name}</h3>
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">{activeHotspot.description}</p>
                    <div className="pt-2">
                      <button
                        onClick={() => setBookingModalOpen(true)}
                        className="px-6 py-2.5 rounded-full bg-[#0A172C] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#B8860B] transition-colors cursor-pointer"
                      >
                        Reserve Zone Access
                      </button>
                    </div>
                  </div>
                </VRScrollRotateCard>
              )}
            </div>

            <VRScrollRotateCard className="lg:col-span-6">
              <VRImageCard 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80" 
                alt="Property Map Visual" 
                className="h-[420px] w-full rounded-3xl"
              />
            </VRScrollRotateCard>

          </div>
        </section>


        {/* SCENE 05 — ROOMS & SUITES */}
        <section className="relative px-4 sm:px-8 py-20">
          <div className="max-w-7xl mx-auto space-y-10">
            
            <VRScrollRotateCard>
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#CBD5E1] shadow-[0_15px_40px_rgba(10,23,44,0.06)] flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-2xl">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-[#B8860B] font-bold">SECTION 03 — ROOMS</span>
                  <h2 className="text-2xl sm:text-5xl font-serif font-bold text-[#0A172C] mt-1">
                    FIND YOUR SPACE.
                  </h2>
                </div>

                <div className="flex items-center gap-2 bg-[#F8FAFC] p-1.5 rounded-full border border-[#CBD5E1]">
                  {(['ROOM', 'SUITE', 'RESIDENCE'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveRoomCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-serif tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                        activeRoomCategory === cat
                          ? 'bg-[#0A172C] text-[#FFFFFF] font-bold shadow-md'
                          : 'text-[#475569] hover:text-[#0A172C]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </VRScrollRotateCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredRooms.map((room) => (
                <VRScrollRotateCard key={room.id}>
                  <div className="rounded-3xl bg-white border border-[#CBD5E1] overflow-hidden shadow-[0_15px_40px_rgba(10,23,44,0.06)] hover:border-[#0A172C] transition-all duration-500 flex flex-col justify-between group">
                    <VRImageCard 
                      src={room.image} 
                      alt={room.name} 
                      className="h-56 sm:h-72 w-full rounded-b-none border-none"
                    />

                    <div className="p-5 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-widest text-[#B8860B] font-bold">{room.category}</span>
                          <span className="text-sm font-serif text-[#0A172C] font-bold">${room.price} / night</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0A172C] group-hover:text-[#B8860B] transition-colors mt-1">{room.name}</h3>
                        <p className="text-xs text-[#B8860B] italic font-serif mt-0.5">{room.tagline}</p>
                        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mt-3">{room.description}</p>
                      </div>

                      <div className="pt-4 border-t border-[#CBD5E1] space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {room.features.map((feat, fidx) => (
                            <span key={fidx} className="px-3 py-1 rounded-full bg-[#F8FAFC] text-[11px] text-[#475569] border border-[#CBD5E1]">
                              {feat}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                          <button
                            onClick={() => setBookingModalOpen(true)}
                            className="flex-1 py-3 rounded-full bg-[#0A172C] text-[#FFFFFF] font-bold text-xs uppercase tracking-widest text-center hover:bg-[#B8860B] shadow-md transition-all cursor-pointer"
                          >
                            Reserve Suite
                          </button>
                          <button
                            onClick={() => setSelected360Room(room)}
                            className="px-4 py-3 rounded-full border border-[#CBD5E1] bg-[#F8FAFC] text-[#0A172C] text-xs uppercase tracking-widest hover:border-[#0A172C] transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#B8860B]" />
                            <span>View 360°</span>
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </VRScrollRotateCard>
              ))}
            </div>

          </div>
        </section>


        {/* SCENE 06 — GASTRONOMY */}
        <section className="relative px-4 sm:px-8 py-20">
          <div className="max-w-7xl mx-auto space-y-10">
            
            <VRScrollRotateCard>
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#CBD5E1] shadow-[0_15px_40px_rgba(10,23,44,0.06)] max-w-2xl">
                <span className="text-xs uppercase tracking-[0.3em] text-[#B8860B] font-bold">SECTION 05 — DINING</span>
                <h2 className="text-2xl sm:text-5xl font-serif font-bold text-[#0A172C] mt-1">
                  ANOTHER REASON TO STAY.
                </h2>
              </div>
            </VRScrollRotateCard>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {DINING_DATA.map((dining) => (
                <VRScrollRotateCard key={dining.id}>
                  <div className="rounded-3xl bg-white border border-[#CBD5E1] overflow-hidden shadow-[0_15px_40px_rgba(10,23,44,0.06)] group hover:border-[#0A172C] transition-all flex flex-col justify-between h-full">
                    <VRImageCard 
                      src={dining.image} 
                      alt={dining.name} 
                      className="h-48 sm:h-56 w-full rounded-b-none border-none"
                    />

                    <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#B8860B] font-bold">{dining.cuisine}</span>
                        <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0A172C] mt-0.5">{dining.name}</h3>
                        <p className="text-xs text-[#B8860B] italic font-serif mt-0.5">{dining.tagline}</p>
                        <p className="text-xs text-[#475569] leading-relaxed mt-2">{dining.description}</p>
                      </div>
                      
                      <div className="pt-3 border-t border-[#CBD5E1] text-[11px] text-[#475569] space-y-1">
                        <div>Hours: <span className="text-[#0A172C] font-semibold">{dining.hours}</span></div>
                        <div>Dress Code: <span className="text-[#B8860B]">{dining.dressCode}</span></div>
                      </div>
                    </div>
                  </div>
                </VRScrollRotateCard>
              ))}
            </div>

          </div>
        </section>


        {/* SCENE 07 — WELLNESS */}
        <section className="relative px-4 sm:px-8 py-20">
          <div className="max-w-7xl mx-auto space-y-10">
            
            <VRScrollRotateCard>
              <div className="text-center max-w-2xl mx-auto space-y-3 p-6 sm:p-8 rounded-3xl bg-white border border-[#CBD5E1] shadow-[0_15px_40px_rgba(10,23,44,0.06)]">
                <span className="text-xs uppercase tracking-[0.3em] text-[#B8860B] font-bold">SECTION 06 — WELLNESS</span>
                <h2 className="text-2xl sm:text-5xl font-serif font-bold text-[#0A172C]">
                  REST. RESET. RETURN.
                </h2>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Dedicated sanctuaries for hydrotherapy, Himalayan salt saunas, ice fountains, and temperature-controlled infinity pools.
                </p>
              </div>
            </VRScrollRotateCard>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {WELLNESS_DATA.map((wellness) => (
                <VRScrollRotateCard key={wellness.id}>
                  <div className="rounded-3xl bg-white border border-[#CBD5E1] overflow-hidden shadow-[0_15px_40px_rgba(10,23,44,0.06)] group hover:border-[#0A172C] transition-all flex flex-col justify-between h-full">
                    <VRImageCard 
                      src={wellness.image} 
                      alt={wellness.name} 
                      className="h-56 sm:h-60 w-full rounded-b-none border-none"
                    />
                    <div className="p-5 sm:p-6 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0A172C]">{wellness.name}</h3>
                        <p className="text-xs text-[#B8860B] font-serif italic mt-0.5">{wellness.tagline}</p>
                        <p className="text-xs text-[#475569] leading-relaxed mt-2">{wellness.description}</p>
                      </div>
                    </div>
                  </div>
                </VRScrollRotateCard>
              ))}
            </div>

          </div>
        </section>


        {/* SCENE 08 — DESTINATIONS */}
        <section className="relative px-4 sm:px-8 py-20">
          <div className="max-w-7xl mx-auto space-y-10">
            
            <VRScrollRotateCard>
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#CBD5E1] shadow-[0_15px_40px_rgba(10,23,44,0.06)] flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-2xl">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-[#B8860B] font-bold">SECTION 09 — DESTINATION COLLECTION</span>
                  <h2 className="text-2xl sm:text-5xl font-serif font-bold text-[#0A172C] mt-1">
                    GLOBAL HOSPITALITY CONCEPT
                  </h2>
                </div>
                <p className="text-xs text-[#475569] max-w-md">
                  Conceptual international properties designed under Sapphire Hotel Management standards.
                </p>
              </div>
            </VRScrollRotateCard>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {DESTINATIONS_DATA.map((dest) => (
                <VRScrollRotateCard key={dest.id}>
                  <div className="rounded-3xl bg-white border border-[#CBD5E1] overflow-hidden shadow-[0_15px_40px_rgba(10,23,44,0.06)] group hover:border-[#0A172C] transition-all flex flex-col justify-between h-full">
                    <VRImageCard 
                      src={dest.image} 
                      alt={dest.city} 
                      className="h-44 sm:h-48 w-full rounded-b-none border-none"
                    />

                    <div className="p-5 sm:p-6 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#B8860B] font-bold">{dest.status}</span>
                        <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0A172C] mt-0.5">{dest.city}</h3>
                        <p className="text-xs text-[#B8860B] font-serif">{dest.country}</p>
                        <p className="text-xs text-[#475569] leading-relaxed mt-2">{dest.description}</p>
                      </div>
                    </div>
                  </div>
                </VRScrollRotateCard>
              ))}
            </div>

          </div>
        </section>


        {/* SCENE 09 — GALLERY */}
        <section className="relative px-4 sm:px-8 py-20">
          <div className="max-w-7xl mx-auto space-y-10">
            
            <VRScrollRotateCard>
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#CBD5E1] shadow-[0_15px_40px_rgba(10,23,44,0.06)] flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-2xl">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-[#B8860B] font-bold">VISUAL PORTFOLIO</span>
                  <h2 className="text-2xl sm:text-5xl font-serif font-bold text-[#0A172C] mt-1">
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
                          ? 'bg-[#0A172C] text-[#FFFFFF] font-bold shadow-md'
                          : 'bg-[#F8FAFC] text-[#475569] hover:text-[#0A172C]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </VRScrollRotateCard>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGallery.map((item) => (
                <VRScrollRotateCard key={item.id}>
                  <div
                    onClick={() => setSelectedGalleryItem(item)}
                    className="rounded-3xl bg-white border border-[#CBD5E1] overflow-hidden shadow-[0_15px_40px_rgba(10,23,44,0.06)] group cursor-pointer hover:border-[#0A172C] transition-all"
                  >
                    <VRImageCard 
                      src={item.image} 
                      alt={item.title} 
                      className="h-48 sm:h-56 w-full rounded-b-none border-none"
                    />
                    <div className="p-4 sm:p-5 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#B8860B] font-bold">{item.category}</span>
                        <h4 className="font-serif font-bold text-sm sm:text-base text-[#0A172C]">{item.title}</h4>
                      </div>
                      <Maximize2 className="w-4 h-4 text-[#B8860B]" />
                    </div>
                  </div>
                </VRScrollRotateCard>
              ))}
            </div>

          </div>
        </section>


        {/* SCENE 10 — HOTEL MANAGEMENT SYSTEM TRANSITION */}
        <section className="relative px-4 sm:px-8 py-24">
          <VRScrollRotateCard>
            <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 p-6 sm:p-12 rounded-3xl bg-white border border-[#CBD5E1] shadow-[0_25px_60px_rgba(10,23,44,0.08)]">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F4EFE6] border border-[#B8860B]/40 text-[#0A172C] text-[11px] font-bold uppercase tracking-[0.3em]">
                <ShieldCheck className="w-4 h-4 text-[#B8860B]" />
                <span>SECTION 10 — HOTEL MANAGEMENT SYSTEM</span>
              </div>

              <h2 className="text-3xl sm:text-6xl font-serif font-bold text-[#0A172C] leading-tight">
                BEYOND THE STAY.
              </h2>

              <p className="text-xs sm:text-lg font-serif italic text-[#475569] max-w-2xl mx-auto">
                "One intelligent system for every operation."
              </p>

              <div className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-[#0A172C] text-[#FFFFFF] font-bold text-xs sm:text-sm uppercase tracking-widest shadow-[0_6px_25px_rgba(10,23,44,0.3)] hover:bg-[#B8860B] transition-all group cursor-pointer"
                >
                  <span>ENTER MANAGEMENT DASHBOARD</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>
          </VRScrollRotateCard>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl pointer-events-auto">
          <div className="relative max-w-5xl w-full rounded-2xl overflow-hidden border border-[#CBD5E1] bg-white">
            <button
              onClick={() => setSelectedGalleryItem(null)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-[#0A172C] text-white hover:bg-[#B8860B] z-10 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedGalleryItem.image}
              alt={selectedGalleryItem.title}
              className="w-full max-h-[80vh] object-contain bg-black"
            />
            <div className="p-6 bg-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B8860B] font-bold">{selectedGalleryItem.category}</span>
                <h3 className="text-xl font-serif font-bold text-[#0A172C]">{selectedGalleryItem.title}</h3>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
