'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  BedDouble, 
  Users, 
  Sparkles, 
  UtensilsCrossed, 
  Flower2, 
  FileText, 
  Settings, 
  CreditCard, 
  UserCheck, 
  ShieldAlert, 
  ArrowLeft,
  Search,
  Bell,
  ChevronDown
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/reservations', label: 'Reservations', icon: CalendarCheck },
    { href: '/admin/rooms', label: 'Rooms', icon: BedDouble },
    { href: '/admin/guests', label: 'Guests', icon: Users },
    { href: '/admin/housekeeping', label: 'Housekeeping', icon: Sparkles },
    { href: '/admin/staff', label: 'Staff', icon: UserCheck },
    { href: '/admin/payments', label: 'Payments', icon: CreditCard },
    { href: '/admin/restaurant', label: 'Restaurant', icon: UtensilsCrossed },
    { href: '/admin/spa', label: 'Spa', icon: Flower2 },
    { href: '/admin/reports', label: 'Reports', icon: FileText },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#030810] text-[#F5F1E8] overflow-hidden font-sans selection:bg-[#C8A96B] selection:text-[#07111F]">
      
      {/* SaaS Sidebar */}
      <aside className="w-64 bg-[#07111F] border-r border-[#C8A96B]/20 flex flex-col justify-between shrink-0 z-30">
        
        <div className="flex flex-col">
          {/* Brand Header */}
          <div className="p-6 border-b border-[#C8A96B]/15">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#123B70] border border-[#C8A96B]/40 flex items-center justify-center text-[#C8A96B] shadow-[0_0_15px_rgba(200,169,107,0.2)]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C8A96B] font-bold">
                  SAPPHIRE SaaS
                </span>
                <span className="text-sm font-serif tracking-wide text-[#F5F1E8]">
                  HOTEL MANAGEMENT
                </span>
              </div>
            </Link>
          </div>

          {/* Property Switcher Badge */}
          <div className="px-4 py-3 mx-4 my-4 rounded-xl bg-[#0B1F3A] border border-[#123B70] flex items-center justify-between text-xs text-[#8B96A8]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[#F5F1E8] font-medium truncate">Sapphire Grand Resort</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5" />
          </div>

          {/* Navigation Items */}
          <nav className="px-3 space-y-1 max-h-[calc(100vh-260px)] overflow-y-auto no-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#123B70] to-[#0B1F3A] text-[#C8A96B] border border-[#C8A96B]/40 shadow-lg'
                      : 'text-[#8B96A8] hover:text-[#F5F1E8] hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C8A96B]' : 'text-[#8B96A8]'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#C8A96B]/15 bg-[#07111F]">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-[#123B70] bg-[#0B1F3A] text-xs text-[#8B96A8] hover:text-[#C8A96B] hover:border-[#C8A96B]/40 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>
        </div>

      </aside>

      {/* Main SaaS Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-[#07111F] border-b border-[#C8A96B]/20 px-6 flex items-center justify-between shrink-0">
          
          {/* Search Input */}
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B96A8]" />
            <input
              type="text"
              placeholder="Search reservations, rooms, guests, staff..."
              className="w-full bg-[#0B1F3A] border border-[#123B70] rounded-xl pl-10 pr-4 py-2 text-xs text-[#F5F1E8] placeholder-[#8B96A8] focus:border-[#C8A96B] outline-none"
            />
          </div>

          {/* Right User Actions */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-xl bg-[#0B1F3A] border border-[#123B70] text-[#8B96A8] hover:text-[#F5F1E8] transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#C8A96B] rounded-full" />
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-[#C8A96B]/20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#C8A96B] to-[#A68848] flex items-center justify-center text-[#07111F] font-bold text-xs">
                GB
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-[#F5F1E8]">Guillaume Bernard</span>
                <span className="text-[10px] text-[#8B96A8]">General Manager</span>
              </div>
            </div>
          </div>

        </header>

        {/* Dynamic SaaS Page Body */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#030810] no-scrollbar">
          {children}
        </main>

      </div>

    </div>
  );
}
