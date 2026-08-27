'use client';

import React from 'react';
import { Utensils, UtensilsCrossed, Clock, CheckCircle } from 'lucide-react';

const TABLES = [
  { tableNumber: 'T-01', capacity: 2, location: 'Main Dining Room', status: 'Reserved', currentGuest: 'Alexander Wright', time: '19:30' },
  { tableNumber: 'T-02', capacity: 4, location: 'Garden Terrace', status: 'Occupied', currentGuest: 'Elena Rostova', time: '18:45' },
  { tableNumber: 'T-03', capacity: 6, location: 'Private Sommelier Room', status: 'Available', currentGuest: '-', time: '-' },
  { tableNumber: 'T-04', capacity: 2, location: 'Main Dining Room', status: 'Available', currentGuest: '-', time: '-' }
];

export default function AdminRestaurantPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A96B] font-semibold">GASTRONOMY OPERATIONS</span>
        <h1 className="text-3xl font-serif text-[#F5F1E8] mt-1">L’Orangerie Restaurant Tables</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TABLES.map((t, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-[#07111F] border border-[#C8A96B]/20 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-mono text-[#C8A96B] font-bold">{t.tableNumber}</span>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase ${
                t.status === 'Available' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
              }`}>
                {t.status}
              </span>
            </div>

            <div className="text-xs text-[#8B96A8] space-y-1">
              <div>Capacity: <span className="text-[#F5F1E8]">{t.capacity} Guests</span></div>
              <div>Location: <span className="text-[#F5F1E8]">{t.location}</span></div>
              <div>Reserved For: <span className="text-[#C8A96B] font-medium">{t.currentGuest}</span></div>
              {t.time !== '-' && <div>Reservation Time: <span className="text-[#F5F1E8]">{t.time}</span></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
