'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, Calendar, ShieldCheck } from 'lucide-react';

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
    <header className={`fixed top-0 left-0 right-0 z-50 pointer-events-auto transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-xl border-b border-[#CBD5E1] py-3 shadow-[0_10px_30px_rgba(10,23,44,0.06)]' 
        : 'bg-white/90 backdrop-blur-md py-4 sm:py-5 border-b border-[#CBD5E1]/60'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        
        {/* S Monogram & Brand Name */}
        <Link href="/" className="flex items-center gap-3 group pointer-events-auto cursor-pointer">
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
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 pointer-events-auto">
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
        <div className="hidden lg:flex items-center gap-3.5 pointer-events-auto">
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

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden pointer-events-auto">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#0A172C] hover:text-[#B8860B] focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Touch Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white/98 backdrop-blur-2xl z-50 flex flex-col p-6 border-t border-[#CBD5E1] pointer-events-auto overflow-y-auto max-h-[calc(100vh-4rem)]">
          <nav className="flex flex-col gap-3 mt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif font-bold text-[#0A172C] hover:text-[#B8860B] transition-colors py-2 border-b border-[#CBD5E1]/60 cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-[#CBD5E1]">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-xs font-bold uppercase tracking-widest text-[#0A172C] cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#B8860B]" />
              <span>Sapphire Management SaaS</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenBooking) onOpenBooking();
              }}
              className="w-full py-3.5 rounded-xl bg-[#0A172C] text-white font-bold text-xs tracking-widest uppercase text-center cursor-pointer shadow-md"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
