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
      if (window.scrollY > 30) {
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
    <header className={`fixed top-0 left-0 right-0 z-50 pointer-events-auto transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-xl border-b border-[#E6E8EC] py-3.5 shadow-[0_10px_30px_rgba(11,23,42,0.04)]' 
        : 'bg-gradient-to-b from-white/95 via-white/80 to-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        
        {/* S Monogram & Brand Name */}
        <Link href="/" className="flex items-center gap-3.5 group pointer-events-auto cursor-pointer">
          <div className="w-10 h-10 rounded-full border border-[#C8A96B]/50 flex items-center justify-center bg-[#123B70] text-[#FFFFFF] font-serif font-bold text-lg shadow-[0_4px_12px_rgba(18,59,112,0.2)] group-hover:bg-[#C8A96B] group-hover:text-[#123B70] transition-all duration-300">
            S
          </div>
          <div className="flex flex-col">
            <span className="text-[#C8A96B] text-[9px] tracking-[0.3em] font-semibold uppercase">
              SAPPHIRE GRAND · INTERNATIONAL HOSPITALITY
            </span>
            <span className="text-lg sm:text-xl font-serif font-semibold tracking-wider text-[#123B70] group-hover:text-[#C8A96B] transition-colors">
              SAPPHIRE GRAND
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 pointer-events-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs uppercase tracking-widest transition-all duration-300 relative py-1 cursor-pointer ${
                  isActive 
                    ? 'text-[#123B70] font-bold' 
                    : 'text-[#667085] hover:text-[#123B70]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8A96B] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & Book Now */}
        <div className="hidden lg:flex items-center gap-4 pointer-events-auto">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-widest text-[#667085] hover:text-[#123B70] font-medium transition-colors cursor-pointer"
            title="Hospitality Operations Platform"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span>Admin</span>
          </Link>

          <div className="flex items-center gap-1 text-xs text-[#667085] px-2 py-1">
            <Globe className="w-3.5 h-3.5 text-[#123B70]" />
            <span className="font-semibold text-[#0B172A]">EN</span>
          </div>

          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#123B70] text-[#FFFFFF] font-semibold text-xs tracking-widest uppercase hover:bg-[#C8A96B] hover:text-[#123B70] shadow-[0_4px_15px_rgba(18,59,112,0.25)] transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Now</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 lg:hidden pointer-events-auto">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#123B70] hover:text-[#C8A96B] focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white/98 backdrop-blur-2xl z-50 flex flex-col p-6 border-t border-[#E6E8EC] pointer-events-auto">
          <nav className="flex flex-col gap-4 mt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif text-[#0B172A] hover:text-[#123B70] transition-colors py-2 border-b border-[#E6E8EC] cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-[#E6E8EC]">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#E6E8EC] bg-[#F7F8FA] text-sm font-medium text-[#123B70] cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#C8A96B]" />
              <span>Sapphire Management SaaS</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenBooking) onOpenBooking();
              }}
              className="w-full py-3.5 rounded-xl bg-[#123B70] text-white font-bold text-sm tracking-widest uppercase text-center cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
