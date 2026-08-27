'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#030810] text-[#F5F1E8] border-t border-[#C8A96B]/20 pt-20 pb-12 overflow-hidden">
      {/* Background Lighting Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#123B70]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Upper SaaS Teaser Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0B1F3A] via-[#07111F] to-[#0B1F3A] border border-[#C8A96B]/30 mb-20 shadow-[0_20px_50px_rgba(7,17,31,0.8)] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-[#C8A96B]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#C8A96B] font-semibold">
                BEYOND THE STAY
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#F5F1E8] mb-3">
              SAPPHIRE HOTEL MANAGEMENT
            </h3>
            <p className="text-sm text-[#8B96A8] leading-relaxed">
              Experience the complete digital hospitality SaaS ecosystem. Access reservations, real-time occupancy analytics, room inventory control, housekeeping dispatches, and guest CRM.
            </p>
          </div>

          <Link
            href="/admin"
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#C8A96B] to-[#A68848] text-[#07111F] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(200,169,107,0.5)] transition-all shrink-0 group"
          >
            <span>Enter Admin Dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#C8A96B]/50 flex items-center justify-center bg-[#0B1F3A] text-[#C8A96B]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#C8A96B]">SAPPHIRE HOTEL MANAGEMENT</span>
                <span className="text-xl font-serif text-[#F5F1E8]">SAPPHIRE GRAND</span>
              </div>
            </div>
            <p className="text-xs text-[#8B96A8] leading-relaxed italic">
              THE ART OF STAYING.
              <br />
              Luxury hospitality, reimagined for the modern global traveller.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] mb-5 font-semibold">The Resort</h4>
            <ul className="space-y-2.5 text-xs text-[#8B96A8]">
              <li><Link href="/" className="hover:text-[#C8A96B] transition-colors">3D Digital Twin</Link></li>
              <li><Link href="/rooms" className="hover:text-[#C8A96B] transition-colors">Rooms & Luxury Suites</Link></li>
              <li><Link href="/dining" className="hover:text-[#C8A96B] transition-colors">L’Orangerie & Sky Lounge</Link></li>
              <li><Link href="/wellness" className="hover:text-[#C8A96B] transition-colors">Sapphire Thermal Spa</Link></li>
              <li><Link href="/gallery" className="hover:text-[#C8A96B] transition-colors">Architectural Gallery</Link></li>
            </ul>
          </div>

          {/* Col 3: Management SaaS */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] mb-5 font-semibold">Management SaaS</h4>
            <ul className="space-y-2.5 text-xs text-[#8B96A8]">
              <li><Link href="/admin" className="hover:text-[#C8A96B] transition-colors">Executive KPI Overview</Link></li>
              <li><Link href="/admin/reservations" className="hover:text-[#C8A96B] transition-colors">Reservations Console</Link></li>
              <li><Link href="/admin/rooms" className="hover:text-[#C8A96B] transition-colors">Room Status Matrix</Link></li>
              <li><Link href="/admin/guests" className="hover:text-[#C8A96B] transition-colors">Guest CRM Profiles</Link></li>
              <li><Link href="/admin/reports" className="hover:text-[#C8A96B] transition-colors">Revenue Analytics</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Disclaimer */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] mb-5 font-semibold">Concierge Desk</h4>
            <div className="space-y-3 text-xs text-[#8B96A8]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C8A96B]" />
                <span>1 Sapphire Grand Way, Mayfair & Coast</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C8A96B]" />
                <span>+1 (800) 727-7447</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C8A96B]" />
                <span>concierge@sapphiregrand.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Disclaimer */}
        <div className="pt-8 border-t border-[#C8A96B]/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8B96A8] gap-4">
          <p>© {new Date().getFullYear()} Sapphire Hotel Management. All rights reserved.</p>
          <div className="p-2 rounded bg-[#07111F] border border-[#C8A96B]/20 text-[10px] text-[#C8A96B] italic">
            This website is a fictional portfolio/demo hotel application. Sapphire Grand is a demonstration concept.
          </div>
        </div>

      </div>
    </footer>
  );
}
