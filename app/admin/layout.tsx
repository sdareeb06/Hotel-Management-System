'use client';

import React from 'react';
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
    <div className="flex h-screen bg-[#F7F8FA] text-[#0B172A] overflow-hidden font-sans selection:bg-[#123B70] selection:text-[#FFFFFF]">
      
      {/* Sapphire Brand Sidebar */}
      <aside className="w-64 bg-[#123B70] border-r border-[#123B70] flex flex-col justify-between shrink-0 z-30 shadow-xl text-white">
        
        <div className="flex flex-col">
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-[#123B70] font-serif font-bold text-lg flex items-center justify-center shadow-md">
                S
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C8A96B] font-semibold">
                  SAPPHIRE SaaS
                </span>
                <span className="text-sm font-serif font-bold tracking-wide text-white">
                  HOTEL MANAGEMENT
                </span>
              </div>
            </Link>
          </div>

          {/* Property Switcher Badge */}
          <div className="px-4 py-3 mx-4 my-4 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between text-xs text-white/80">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-white font-medium truncate">Sapphire Grand Resort</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-white/60" />
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
                      ? 'bg-white text-[#123B70] font-bold shadow-md'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#123B70]' : 'text-[#C8A96B]'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0E2F5A]">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-white/20 bg-white/10 text-xs text-white hover:bg-white hover:text-[#123B70] transition-all font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>
        </div>

      </aside>

      {/* Main SaaS Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-[#E6E8EC] px-6 flex items-center justify-between shrink-0 shadow-sm">
          
          {/* Search Input */}
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085]" />
            <input
              type="text"
              placeholder="Search reservations, rooms, guests, staff..."
              className="w-full bg-[#F7F8FA] border border-[#E6E8EC] rounded-xl pl-10 pr-4 py-2 text-xs text-[#0B172A] placeholder-[#667085] focus:border-[#123B70] outline-none"
            />
          </div>

          {/* Right User Actions */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-xl bg-[#F7F8FA] border border-[#E6E8EC] text-[#667085] hover:text-[#123B70] transition-colors cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#C8A96B] rounded-full" />
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-[#E6E8EC]">
              <div className="w-8 h-8 rounded-full bg-[#123B70] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                GB
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-[#0B172A]">Guillaume Bernard</span>
                <span className="text-[10px] text-[#667085]">General Manager</span>
              </div>
            </div>
          </div>

        </header>

        {/* Dynamic SaaS Page Body */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#F7F8FA] no-scrollbar">
          {children}
        </main>

      </div>

    </div>
  );
}
