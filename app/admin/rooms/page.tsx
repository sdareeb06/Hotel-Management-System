'use client';

import React, { useState } from 'react';
import { ROOMS_ADMIN_DATA, AdminRoom } from '@/lib/mock-data';
import { BedDouble, Plus, CheckCircle, Wrench, RefreshCw, UserPlus } from 'lucide-react';

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<AdminRoom[]>(ROOMS_ADMIN_DATA);
  const [filter, setFilter] = useState<string>('All');

  const updateStatus = (id: string, newStatus: AdminRoom['status'], housekeepingState: AdminRoom['housekeeping']) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus, housekeeping: housekeepingState } : r))
    );
  };

  const filtered = filter === 'All' ? rooms : rooms.filter((r) => r.status === filter);

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A96B] font-semibold">INVENTORY CONTROL</span>
          <h1 className="text-3xl font-serif text-[#F5F1E8] mt-1">Room Status Matrix</h1>
        </div>

        <button 
          onClick={() => {
            const newR: AdminRoom = {
              id: Date.now().toString(),
              roomNumber: `${Math.floor(Math.random() * 30 + 10)}0${Math.floor(Math.random() * 9 + 1)}`,
              type: 'Sapphire King Suite',
              floor: 15,
              price: 650,
              status: 'Available',
              housekeeping: 'Ready'
            };
            setRooms([newR, ...rooms]);
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C8A96B] to-[#A68848] text-[#07111F] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(200,169,107,0.4)] transition-all self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Room</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {['All', 'Available', 'Occupied', 'Cleaning', 'Maintenance', 'Reserved'].map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`px-4 py-2 rounded-full text-xs font-serif transition-all ${
              filter === st
                ? 'bg-[#C8A96B] text-[#07111F] font-bold shadow-[0_0_15px_rgba(200,169,107,0.4)]'
                : 'bg-[#0B1F3A] text-[#8B96A8] border border-[#123B70] hover:text-[#F5F1E8]'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Grid Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((room) => (
          <div
            key={room.id}
            className="p-6 rounded-3xl bg-[#07111F] border border-[#C8A96B]/20 space-y-4 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-mono text-[#C8A96B] font-bold">#{room.roomNumber}</span>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase ${
                  room.status === 'Available'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : room.status === 'Occupied'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : room.status === 'Cleaning'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : room.status === 'Maintenance'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                }`}>
                  {room.status}
                </span>
              </div>

              <h4 className="font-serif text-lg text-[#F5F1E8]">{room.type}</h4>
              <p className="text-xs text-[#8B96A8]">Floor {room.floor} • ${room.price}/night</p>

              {room.guestName && (
                <div className="mt-3 p-2.5 rounded-xl bg-[#0B1F3A] border border-[#123B70] text-xs text-[#F5F1E8]">
                  Guest: <span className="text-[#C8A96B] font-semibold">{room.guestName}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#C8A96B]/15 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[#8B96A8]">
                <span>Housekeeping:</span>
                <span className="text-[#C8A96B] font-medium">{room.housekeeping}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => updateStatus(room.id, 'Available', 'Ready')}
                  className="py-2 rounded-xl bg-[#0B1F3A] border border-[#123B70] text-[10px] uppercase text-[#F5F1E8] hover:border-emerald-400 hover:text-emerald-400 transition-colors flex items-center justify-center gap-1"
                >
                  <CheckCircle className="w-3 h-3" /> Mark Ready
                </button>
                <button
                  onClick={() => updateStatus(room.id, 'Maintenance', 'Dirty')}
                  className="py-2 rounded-xl bg-[#0B1F3A] border border-[#123B70] text-[10px] uppercase text-[#F5F1E8] hover:border-rose-400 hover:text-rose-400 transition-colors flex items-center justify-center gap-1"
                >
                  <Wrench className="w-3 h-3" /> Maintenance
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
