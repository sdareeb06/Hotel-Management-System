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
  ArrowLeft,
  Search,
  Bell,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
    <div className="flex h-screen w-screen bg-[#F8FAFC] text-[#0B172A] overflow-hidden font-sans selection:bg-[#0A172C] selection:text-[#FFFFFF]">
      
      {/* Desktop Sidebar (lg and above) */}
      <aside className="hidden lg:flex w-64 bg-[#0A172C] border-r border-[#0A172C] flex-col justify-between shrink-0 z-30 shadow-xl text-white">
        <div className="flex flex-col">
          <div className="p-6 border-b border-white/10">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-[#0A172C] font-serif font-bold text-lg flex items-center justify-center shadow-md">
                S
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#B8860B] font-bold">
                  SAPPHIRE SaaS
                </span>
                <span className="text-sm font-serif font-bold tracking-wide text-white">
                  HOTEL MANAGEMENT
                </span>
              </div>
            </Link>
          </div>

          <div className="px-4 py-3 mx-4 my-4 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between text-xs text-white/80">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-white font-medium truncate">Sapphire Grand Resort</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-white/60" />
          </div>

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
                      ? 'bg-white text-[#0A172C] font-bold shadow-md'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#0A172C]' : 'text-[#B8860B]'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 bg-[#07111F]">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-white/20 bg-white/10 text-xs text-white hover:bg-white hover:text-[#0A172C] transition-all font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay Drawer */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 bg-[#0A172C] text-white flex flex-col justify-between z-50 h-full shadow-2xl">
            <div className="flex flex-col">
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white text-[#0A172C] font-serif font-bold text-base flex items-center justify-center">
                    S
                  </div>
                  <span className="text-sm font-serif font-bold text-white">SAPPHIRE SaaS</span>
                </Link>
                <button 
                  onClick={() => setMobileSidebarOpen(false)} 
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-140px)]">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-white text-[#0A172C] font-bold shadow-md'
                          : 'text-white/80 hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#B8860B]" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="p-4 border-t border-white/10 bg-[#07111F]">
              <Link
                href="/"
                onClick={() => setMobileSidebarOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/10 text-xs font-bold text-white text-center cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Public Website</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main SaaS Workspace Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-[#CBD5E1] px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-sm gap-2 sm:gap-4 z-20">
          
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden p-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-[#0A172C] hover:bg-[#CBD5E1]/40 shrink-0 cursor-pointer"
            aria-label="Toggle Mobile Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Input */}
          <div className="relative max-w-[180px] sm:max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085]" />
            <input
              type="text"
              placeholder="Search admin..."
              className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl pl-9 pr-3 sm:pl-10 sm:pr-4 py-1.5 sm:py-2 text-xs text-[#0F172A] placeholder-[#667085] focus:border-[#0A172C] outline-none"
            />
          </div>

          {/* Right User Actions */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button className="relative p-2 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-[#667085] hover:text-[#0A172C] transition-colors cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#B8860B] rounded-full" />
            </button>

            <div className="flex items-center gap-2.5 pl-2 sm:pl-4 border-l border-[#CBD5E1]">
              <div className="w-8 h-8 rounded-full bg-[#0A172C] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                GB
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold text-[#0F172A]">Guillaume Bernard</span>
                <span className="text-[10px] text-[#667085]">General Manager</span>
              </div>
            </div>
          </div>

        </header>

        {/* Dynamic SaaS Page Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#F8FAFC] no-scrollbar">
          {children}
        </main>

      </div>

    </div>
  );
}
