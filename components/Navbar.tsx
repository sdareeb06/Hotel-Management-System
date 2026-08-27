'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Menu, X, Globe, Calendar, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenBooking?: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  if (isAdminRoute) return null; // Admin has its own sidebar header

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 pointer-events-auto transition-all duration-500 ${
      scrolled 
        ? 'bg-[#07111F]/95 backdrop-blur-xl border-b border-[#C8A96B]/25 py-3 shadow-2xl' 
        : 'bg-gradient-to-b from-[#07111F]/95 via-[#07111F]/60 to-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        
        {/* Brand Identity */}
        <Link href="/" className="flex items-center gap-3 group pointer-events-auto cursor-pointer">
          <div className="w-10 h-10 rounded-full border border-[#C8A96B]/60 flex items-center justify-center bg-[#0B1F3A] shadow-[0_0_15px_rgba(200,169,107,0.3)] group-hover:border-[#C8A96B] transition-colors">
            <Sparkles className="w-5 h-5 text-[#C8A96B]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[#C8A96B] text-[9px] tracking-[0.3em] font-semibold uppercase">
              SAPPHIRE HOTEL MANAGEMENT
            </span>
            <span className="text-lg sm:text-xl font-serif tracking-wider text-[#F5F1E8] group-hover:text-[#C8A96B] transition-colors">
              SAPPHIRE GRAND
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 pointer-events-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs uppercase tracking-widest transition-all duration-300 relative py-1 cursor-pointer ${
                  isActive ? 'text-[#C8A96B] font-semibold' : 'text-[#F5F1E8]/80 hover:text-[#C8A96B]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8A96B] rounded-full shadow-[0_0_8px_#C8A96B]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & Admin Portal */}
        <div className="hidden lg:flex items-center gap-3 pointer-events-auto">
          <Link
            href="/admin"
            className="flex items-center gap-1 px-3 py-1.5 text-[11px] uppercase tracking-widest text-[#8B96A8] hover:text-[#C8A96B] transition-all cursor-pointer"
            title="Management Dashboard"
          >
            <ShieldCheck className="w-3 h-3 text-[#C8A96B]" />
            <span>Admin</span>
          </Link>

          <button 
            className="flex items-center gap-1 text-xs text-[#8B96A8] hover:text-[#F5F1E8] transition-colors px-2 py-1 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>EN</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C8A96B] to-[#A68848] text-[#07111F] font-bold text-xs tracking-widest uppercase hover:shadow-[0_0_25px_rgba(200,169,107,0.5)] transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Now</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#F5F1E8] hover:text-[#C8A96B] focus:outline-none pointer-events-auto cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-[#07111F]/98 backdrop-blur-2xl z-50 flex flex-col p-6 border-t border-[#C8A96B]/20 pointer-events-auto">
          <nav className="flex flex-col gap-4 mt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif text-[#F5F1E8] hover:text-[#C8A96B] transition-colors py-2 border-b border-white/5 cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-[#C8A96B]/20">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#123B70] bg-[#0B1F3A] text-sm text-[#F5F1E8] cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#C8A96B]" />
              <span>Sapphire Management SaaS</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenBooking) onOpenBooking();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C8A96B] to-[#A68848] text-[#07111F] font-bold text-sm tracking-widest uppercase text-center cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
