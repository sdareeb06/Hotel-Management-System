'use client';

import React, { useState } from 'react';
import { GUESTS_DATA, GuestProfile } from '@/lib/mock-data';
import { Users, Search, Crown, Award, Mail, Phone, MapPin, DollarSign, X } from 'lucide-react';

export default function AdminGuestsPage() {
  const [search, setSearch] = useState('');
  const [selectedGuest, setSelectedGuest] = useState<GuestProfile | null>(null);

  const filteredGuests = GUESTS_DATA.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.email.toLowerCase().includes(search.toLowerCase()) ||
    g.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A96B] font-semibold">GUEST RELATIONSHIP MANAGEMENT</span>
          <h1 className="text-3xl font-serif text-[#F5F1E8] mt-1">VIP Guest Profiles</h1>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B96A8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search guest CRM..."
            className="w-full bg-[#07111F] border border-[#123B70] rounded-xl pl-10 pr-4 py-2 text-xs text-[#F5F1E8] focus:border-[#C8A96B] outline-none"
          />
        </div>
      </div>

      {/* Guest Directory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuests.map((guest) => (
          <div
            key={guest.id}
            onClick={() => setSelectedGuest(guest)}
            className="p-6 rounded-3xl bg-[#07111F] border border-[#C8A96B]/20 space-y-4 shadow-xl hover:border-[#C8A96B] transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                  guest.vipStatus === 'Diamond'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : guest.vipStatus === 'Platinum'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                }`}>
                  <Crown className="w-3 h-3 inline mr-1" /> {guest.vipStatus} VIP
                </span>
                <span className="text-xs text-[#8B96A8]">{guest.staysCount} Stays Completed</span>
              </div>

              <h3 className="text-2xl font-serif text-[#F5F1E8] group-hover:text-[#C8A96B] transition-colors mt-3">{guest.name}</h3>
              <p className="text-xs text-[#8B96A8]">{guest.email}</p>
            </div>

            <div className="pt-4 border-t border-[#C8A96B]/15 space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#8B96A8]">
                <span>Total Lifetime Spend:</span>
                <span className="text-lg font-serif text-[#C8A96B] font-semibold">${guest.totalSpend.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-[#8B96A8]">
                <span>Country:</span>
                <span className="text-[#F5F1E8]">{guest.country}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Guest Profile Modal */}
      {selectedGuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07111F]/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-[#0B1F3A] border border-[#C8A96B]/40 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#C8A96B]/20 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C8A96B] font-semibold">VIP GUEST PROFILE DOSSIER</span>
                <h3 className="text-2xl font-serif text-[#F5F1E8]">{selectedGuest.name}</h3>
              </div>
              <button onClick={() => setSelectedGuest(null)} className="p-1 text-[#8B96A8] hover:text-[#F5F1E8]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#07111F] border border-[#123B70] flex items-center justify-between">
                <span className="text-[#8B96A8]">VIP Status</span>
                <span className="text-[#C8A96B] font-bold">{selectedGuest.vipStatus}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#07111F] border border-[#123B70] flex items-center justify-between">
                <span className="text-[#8B96A8]">Phone</span>
                <span className="text-[#F5F1E8]">{selectedGuest.phone}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#07111F] border border-[#123B70] flex items-center justify-between">
                <span className="text-[#8B96A8]">Total Spend</span>
                <span className="text-[#C8A96B] font-serif font-bold text-base">${selectedGuest.totalSpend.toLocaleString()}</span>
              </div>
              <div>
                <span className="block text-[#8B96A8] mb-1.5 font-semibold">Guest Preferences & Requirements</span>
                <div className="flex flex-wrap gap-2">
                  {selectedGuest.preferences.map((p, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-[#07111F] text-[#C8A96B] border border-[#123B70]">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedGuest(null)}
              className="w-full py-3 rounded-full bg-[#C8A96B] text-[#07111F] font-bold text-xs uppercase tracking-widest hover:bg-[#E8D49B] transition-colors"
            >
              Close Dossier
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
