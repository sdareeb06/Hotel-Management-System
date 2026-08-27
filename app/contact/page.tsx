'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIConcierge from '@/components/AIConcierge';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';

const HotelCanvas = dynamic(() => import('@/components/3d/HotelCanvas'), {
  ssr: false
});

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative text-[#F5F1E8] min-h-screen">
      
      {/* 3D VR BACKGROUND CANVAS */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-auto">
        <HotelCanvas
          scrollProgress={0.00} // Front 3/4 resort view
          activeHotspot={null}
          onSelectHotspot={() => {}}
          showHotspots={false}
          isInteractiveMode={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050C18]/90 via-[#050C18]/65 to-[#050C18]/70 pointer-events-none" />
      </div>

      <div className="relative z-10 pointer-events-none">
        <Navbar />

        <section className="relative pt-36 pb-16 px-4 sm:px-8 pointer-events-auto">
          <div className="max-w-7xl mx-auto space-y-4 text-center p-8 sm:p-10 rounded-3xl backdrop-blur-xl bg-[#07111F]/70 border border-[#C8A96B]/30 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#123B70]/80 border border-[#C8A96B]/40 text-[#C8A96B] text-[10px] uppercase tracking-[0.3em] font-semibold">
              <Mail className="w-3.5 h-3.5" />
              <span>24/7 BUTLER DESK</span>
            </div>
            <h1 className="text-4xl sm:text-7xl font-serif text-[#F5F1E8]">CONTACT CONCIERGE</h1>
            <p className="text-sm sm:text-base text-[#8B96A8] max-w-xl mx-auto font-serif italic">
              Connect directly with our Head Concierge team for bespoke inquiries, private event hosting, or helipad arrangements.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pointer-events-auto">
          <div className="md:col-span-5 space-y-6 p-8 rounded-3xl backdrop-blur-2xl bg-[#0B1F3A]/85 border border-[#C8A96B]/30 shadow-2xl">
            <h3 className="text-2xl font-serif text-[#F5F1E8]">Head Concierge</h3>
            <div className="space-y-4 text-xs text-[#8B96A8]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C8A96B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#F5F1E8] mb-0.5">Address</strong>
                  1 Sapphire Grand Way, Mayfair & Coast
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C8A96B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#F5F1E8] mb-0.5">Direct Line</strong>
                  +1 (800) 727-7447
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C8A96B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#F5F1E8] mb-0.5">Electronic Dispatch</strong>
                  concierge@sapphiregrand.com
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 p-8 rounded-3xl backdrop-blur-2xl bg-[#0B1F3A]/85 border border-[#C8A96B]/30 shadow-2xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-2xl font-serif text-[#F5F1E8]">Dispatch Inquiry</h3>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#8B96A8] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Edward Sterling"
                    className="w-full bg-[#07111F] border border-[#123B70] rounded-xl px-4 py-3 text-sm text-[#F5F1E8] focus:border-[#C8A96B] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#8B96A8] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="edward@sterling.co.uk"
                    className="w-full bg-[#07111F] border border-[#123B70] rounded-xl px-4 py-3 text-sm text-[#F5F1E8] focus:border-[#C8A96B] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#8B96A8] mb-1">Message / Request</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your inquiry or special stay requirements..."
                    className="w-full bg-[#07111F] border border-[#123B70] rounded-xl px-4 py-3 text-sm text-[#F5F1E8] focus:border-[#C8A96B] outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#C8A96B] to-[#A68848] text-[#07111F] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(200,169,107,0.5)] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Dispatch to Butler</span>
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif text-[#F5F1E8]">MESSAGE DISPATCHED</h3>
                <p className="text-xs text-[#8B96A8]">Our Head Concierge has received your transmission and will reply shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-[#123B70] text-xs text-[#F5F1E8]"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>

      <AIConcierge />
    </div>
  );
}
