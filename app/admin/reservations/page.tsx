'use client';

import React, { useState } from 'react';
import { RESERVATIONS_DATA, Reservation } from '@/lib/mock-data';
import { Search, Filter, Plus, Eye, X, Calendar, CheckCircle2, User, DollarSign } from 'lucide-react';

export default function AdminReservationsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);

  const filteredReservations = RESERVATIONS_DATA.filter((res) => {
    const matchesSearch = 
      res.guestName.toLowerCase().includes(search.toLowerCase()) ||
      res.id.toLowerCase().includes(search.toLowerCase()) ||
      res.roomType.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || res.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A96B] font-semibold">RESERVATIONS MANAGEMENT</span>
          <h1 className="text-3xl font-serif text-[#F5F1E8] mt-1">Bookings Console</h1>
        </div>

        <button 
          onClick={() => setSelectedRes(RESERVATIONS_DATA[0])}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C8A96B] to-[#A68848] text-[#07111F] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(200,169,107,0.4)] transition-all self-start"
        >
          <Plus className="w-4 h-4" />
          <span>New Manual Reservation</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#07111F] border border-[#C8A96B]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B96A8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search guest, booking ID, room..."
            className="w-full bg-[#0B1F3A] border border-[#123B70] rounded-xl pl-10 pr-4 py-2 text-xs text-[#F5F1E8] placeholder-[#8B96A8] focus:border-[#C8A96B] outline-none"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
          {['All', 'Confirmed', 'Checked In', 'Checked Out', 'Pending', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-serif transition-all whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-[#C8A96B] text-[#07111F] font-bold'
                  : 'bg-[#0B1F3A] text-[#8B96A8] border border-[#123B70] hover:text-[#F5F1E8]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

      </div>

      {/* Reservations Table */}
      <div className="p-6 rounded-3xl bg-[#07111F] border border-[#C8A96B]/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B1F3A] text-[#8B96A8] uppercase text-[10px] tracking-widest border-b border-[#123B70]">
              <tr>
                <th className="p-3.5">Booking ID</th>
                <th className="p-3.5">Guest</th>
                <th className="p-3.5">Room Type</th>
                <th className="p-3.5">Room No.</th>
                <th className="p-3.5">Check In</th>
                <th className="p-3.5">Check Out</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#123B70]/40">
              {filteredReservations.map((res) => (
                <tr key={res.id} className="hover:bg-[#0B1F3A]/60 transition-colors">
                  <td className="p-3.5 font-mono text-[#C8A96B] font-semibold">{res.id}</td>
                  <td className="p-3.5">
                    <div className="font-medium text-[#F5F1E8]">{res.guestName}</div>
                    <div className="text-[10px] text-[#8B96A8]">{res.guestEmail}</div>
                  </td>
                  <td className="p-3.5 text-[#8B96A8]">{res.roomType}</td>
                  <td className="p-3.5 font-mono text-[#F5F1E8]">{res.roomNumber}</td>
                  <td className="p-3.5 text-[#8B96A8]">{res.checkIn}</td>
                  <td className="p-3.5 text-[#8B96A8]">{res.checkOut}</td>
                  <td className="p-3.5 font-serif text-[#C8A96B] font-semibold">${res.amount.toLocaleString()}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase ${
                      res.status === 'Checked In'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : res.status === 'Confirmed'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : res.status === 'Pending'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {res.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setSelectedRes(res)}
                      className="p-1.5 rounded-lg bg-[#0B1F3A] border border-[#123B70] text-[#C8A96B] hover:bg-[#C8A96B] hover:text-[#07111F] transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedRes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07111F]/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-[#0B1F3A] border border-[#C8A96B]/40 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#C8A96B]/20 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C8A96B] font-semibold">RESERVATION DOSSIER</span>
                <h3 className="text-xl font-serif text-[#F5F1E8]">{selectedRes.id}</h3>
              </div>
              <button onClick={() => setSelectedRes(null)} className="p-1 text-[#8B96A8] hover:text-[#F5F1E8]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#07111F] border border-[#123B70] flex items-center justify-between">
                <span className="text-[#8B96A8]">Guest Name</span>
                <span className="text-[#F5F1E8] font-semibold">{selectedRes.guestName}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#07111F] border border-[#123B70] flex items-center justify-between">
                <span className="text-[#8B96A8]">Email</span>
                <span className="text-[#F5F1E8]">{selectedRes.guestEmail}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#07111F] border border-[#123B70] flex items-center justify-between">
                <span className="text-[#8B96A8]">Suite Assigned</span>
                <span className="text-[#C8A96B] font-serif font-semibold">{selectedRes.roomType} (Room #{selectedRes.roomNumber})</span>
              </div>
              <div className="p-3 rounded-xl bg-[#07111F] border border-[#123B70] flex items-center justify-between">
                <span className="text-[#8B96A8]">Dates</span>
                <span className="text-[#F5F1E8]">{selectedRes.checkIn} to {selectedRes.checkOut}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#07111F] border border-[#123B70] flex items-center justify-between">
                <span className="text-[#8B96A8]">Total Ledger Amount</span>
                <span className="text-lg font-serif text-[#C8A96B]">${selectedRes.amount.toLocaleString()} ({selectedRes.paymentStatus})</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#C8A96B]/20 flex items-center gap-3">
              <button
                onClick={() => setSelectedRes(null)}
                className="w-full py-3 rounded-full bg-[#C8A96B] text-[#07111F] font-bold text-xs uppercase tracking-widest hover:bg-[#E8D49B] transition-colors"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
