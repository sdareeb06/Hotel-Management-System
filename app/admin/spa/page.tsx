'use client';

import React from 'react';
import { SPA_BOOKINGS_DATA } from '@/lib/mock-data';
import { Flower2, Clock, CheckCircle } from 'lucide-react';

export default function AdminSpaPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A96B] font-semibold">THERMAL SPA APPOINTMENTS</span>
        <h1 className="text-3xl font-serif text-[#F5F1E8] mt-1">Spa Bookings & Therapist Roster</h1>
      </div>

      <div className="p-6 rounded-3xl bg-[#07111F] border border-[#C8A96B]/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B1F3A] text-[#8B96A8] uppercase text-[10px] tracking-widest border-b border-[#123B70]">
              <tr>
                <th className="p-3.5">Booking ID</th>
                <th className="p-3.5">Guest</th>
                <th className="p-3.5">Treatment Ritual</th>
                <th className="p-3.5">Therapist</th>
                <th className="p-3.5">Time & Date</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#123B70]/40">
              {SPA_BOOKINGS_DATA.map((sp) => (
                <tr key={sp.id} className="hover:bg-[#0B1F3A]/60 transition-colors">
                  <td className="p-3.5 font-mono text-[#C8A96B] font-semibold">{sp.id}</td>
                  <td className="p-3.5 font-medium text-[#F5F1E8]">{sp.guestName}</td>
                  <td className="p-3.5 text-[#F5F1E8] font-serif">{sp.treatment} ({sp.duration})</td>
                  <td className="p-3.5 text-[#8B96A8]">{sp.therapist}</td>
                  <td className="p-3.5 text-[#8B96A8]">{sp.date} @ {sp.time}</td>
                  <td className="p-3.5 font-serif text-[#C8A96B]">${sp.price}</td>
                  <td className="p-3.5 text-emerald-400 font-semibold">{sp.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
