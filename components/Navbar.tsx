'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenBooking?: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '/', label: 'Hotel' },
    { href: '/rooms', label: 'Rooms & Suites' },
    { href: '/dining', label: 'Dining' },
    { href: '/wellness', label: 'Wellness' },
    { href: '/experiences', label: 'Experiences' },
    { href: '/destinations', label: 'Destinations' },
    { href: '/gallery', label: 'Gallery' },
  ];

  const isAdminRoute = pathname?.startsWith('/admin');
  if (isAdminRoute) return null;

  return (
    <>
      {/* Main Top Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-[#CBD5E1] py-3 shadow-[0_10px_30px_rgba(10,23,44,0.06)]' 
          : 'bg-white/90 backdrop-blur-md py-4 sm:py-5 border-b border-[#CBD5E1]/60'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          
          {/* S Monogram & Brand Name */}
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0A172C] text-[#FFFFFF] font-serif font-bold text-base sm:text-lg flex items-center justify-center shadow-md group-hover:bg-[#B8860B] transition-all duration-300">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-[#B8860B] text-[8px] sm:text-[9px] tracking-[0.25em] font-bold uppercase">
                SAPPHIRE GRAND · INTERNATIONAL
              </span>
              <span className="text-base sm:text-xl font-serif font-bold tracking-wider text-[#0A172C] group-hover:text-[#B8860B] transition-colors">
                SAPPHIRE GRAND
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest transition-all duration-300 relative py-1 cursor-pointer ${
                    isActive 
                      ? 'text-[#0A172C] font-bold' 
                      : 'text-[#475569] hover:text-[#0A172C]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B8860B] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Controls & Book Now */}
          <div className="hidden lg:flex items-center gap-3.5">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-widest text-[#475569] hover:text-[#0A172C] font-semibold transition-colors cursor-pointer"
              title="Hospitality Operations Platform"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Admin</span>
            </Link>

            <div className="flex items-center gap-1 text-xs text-[#475569] px-2 py-1">
              <Globe className="w-3.5 h-3.5 text-[#0A172C]" />
              <span className="font-semibold text-[#0F172A]">EN</span>
            </div>

            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A172C] text-[#FFFFFF] font-bold text-xs tracking-widest uppercase hover:bg-[#B8860B] shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Book Now</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-[#0A172C] hover:text-[#B8860B] focus:outline-none cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer Modal (Rendered outside header to escape backdrop-filter containing block!) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[99999] bg-white flex flex-col justify-between overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200">
          
          {/* Top Mobile Bar with Logo & Close Button */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#CBD5E1] px-5 py-4 flex items-center justify-between z-10 shrink-0">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5"
            >
              <div className="w-9 h-9 rounded-full bg-[#0A172C] text-white font-serif font-bold text-base flex items-center justify-center shadow">
                S
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-widest text-[#B8860B] font-bold">SAPPHIRE GRAND</span>
                <span className="text-sm font-serif font-bold text-[#0A172C]">HOTEL & RESORT</span>
              </div>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-[#F8FAFC] border border-[#CBD5E1] text-[#0A172C] hover:bg-[#CBD5E1]/40 cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links List */}
          <div className="flex-1 px-6 py-6 space-y-1 overflow-y-auto">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8860B] font-bold block mb-3">
              NAVIGATION DIRECTORY
            </span>

            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-3.5 px-3 rounded-xl text-base font-serif font-bold transition-colors border-b border-[#CBD5E1]/50 ${
                    isActive 
                      ? 'text-[#B8860B] bg-[#F8FAFC]' 
                      : 'text-[#0A172C] hover:text-[#B8860B]'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-[#CBD5E1]">→</span>
                </Link>
              );
            })}
          </div>

          {/* Bottom Action Cards: Admin SaaS & Book Now */}
          <div className="p-6 bg-[#F8FAFC] border-t border-[#CBD5E1] space-y-3 shrink-0">
            
            {/* Direct Link to Admin Dashboard */}
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between w-full p-4 rounded-2xl bg-[#0A172C] text-white shadow-lg cursor-pointer hover:bg-[#B8860B] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] uppercase tracking-widest text-[#B8860B] font-bold">MANAGEMENT SaaS</span>
                  <span className="text-sm font-serif font-bold text-white">Open Admin Dashboard</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Book Now Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenBooking) onOpenBooking();
              }}
              className="w-full py-4 rounded-2xl bg-[#B8860B] text-white font-bold text-xs tracking-widest uppercase text-center cursor-pointer shadow-md hover:bg-[#0A172C] transition-all"
            >
              Book Now
            </button>
          </div>

        </div>
      )}
    </>
  );
}
