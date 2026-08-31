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
    <div className="min-h-screen lg:h-screen w-full bg-[#F8FAFC] text-[#0B172A] flex flex-col lg:flex-row font-sans selection:bg-[#0A172C] selection:text-[#FFFFFF]">
      
      {/* ═══════ 1. DESKTOP PERMANENT SIDEBAR (lg and above) ═══════ */}
      <aside className="hidden lg:flex w-64 bg-[#0A172C] border-r border-[#0A172C] flex-col justify-between shrink-0 h-screen sticky top-0 z-30 shadow-xl text-white">
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


      {/* ═══════ 2. MOBILE STICKY TOP BAR (< lg) ═══════ */}
      <div className="lg:hidden sticky top-0 left-0 right-0 bg-[#0A172C] text-white z-40 border-b border-[#0A172C] px-4 py-3 flex items-center justify-between shadow-md shrink-0">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white text-[#0A172C] font-serif font-bold text-sm flex items-center justify-center shadow">
            S
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] uppercase tracking-widest text-[#B8860B] font-bold">SAPPHIRE SaaS</span>
            <span className="text-xs font-serif font-bold text-white">HOTEL MANAGEMENT</span>
          </div>
        </Link>

        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="px-3.5 py-1.5 rounded-xl bg-white text-[#0A172C] font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
        >
          <Menu className="w-4 h-4 text-[#0A172C]" />
          <span>MENU</span>
        </button>
      </div>


      {/* ═══════ 3. MOBILE QUICK HORIZONTAL MODULE NAV (< lg) ═══════ */}
      <div className="lg:hidden bg-white border-b border-[#CBD5E1] px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0 z-30">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                isActive
                  ? 'bg-[#0A172C] text-white shadow-sm'
                  : 'bg-[#F8FAFC] text-[#475569] border border-[#CBD5E1]'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>


      {/* ═══════ 4. MOBILE SLIDE-OUT DRAWER MODAL ═══════ */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-[9999] flex">
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />

          <div className="relative w-80 max-w-[85vw] bg-[#0A172C] text-white flex flex-col justify-between z-[10000] h-full shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="flex flex-col">
              <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#07111F]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white text-[#0A172C] font-serif font-bold text-lg flex items-center justify-center">
                    S
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-widest text-[#B8860B] font-bold">SAPPHIRE SaaS</span>
                    <span className="text-sm font-serif font-bold text-white">HOTEL MANAGEMENT</span>
                  </div>
                </div>

                <button 
                  onClick={() => setMobileSidebarOpen(false)} 
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-160px)] no-scrollbar">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-white text-[#0A172C] font-bold shadow-md'
                          : 'text-white/85 hover:bg-white/10'
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
                onClick={() => setMobileSidebarOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/10 text-xs font-bold text-white text-center cursor-pointer hover:bg-white hover:text-[#0A172C] transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Public Website</span>
              </Link>
            </div>
          </div>
        </div>
      )}


      {/* ═══════ 5. MAIN SAAS WORKSPACE ═══════ */}
      <div className="flex-1 flex flex-col min-w-0 w-full lg:h-full overflow-hidden">
        
        {/* Desktop Header Bar */}
        <header className="hidden lg:flex h-16 bg-white border-b border-[#CBD5E1] px-6 items-center justify-between shrink-0 shadow-sm gap-4 z-20">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085]" />
            <input
              type="text"
              placeholder="Search reservations, rooms, guests, staff..."
              className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl pl-10 pr-4 py-2 text-xs text-[#0F172A] placeholder-[#667085] focus:border-[#0A172C] outline-none"
            />
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button className="relative p-2 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-[#667085] hover:text-[#0A172C] transition-colors cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#B8860B] rounded-full" />
            </button>

            <div className="flex items-center gap-2.5 pl-4 border-l border-[#CBD5E1]">
              <div className="w-8 h-8 rounded-full bg-[#0A172C] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                GB
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-[#0F172A]">Guillaume Bernard</span>
                <span className="text-[10px] text-[#667085]">General Manager</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic SaaS Workspace Content */}
        <main className="flex-1 w-full lg:overflow-y-auto p-4 sm:p-8 bg-[#F8FAFC] no-scrollbar">
          {children}
        </main>

      </div>

    </div>
  );
}
