'use client';

import React from 'react';
import { 
  ADMIN_KPIS, 
  REVENUE_CHART_DATA, 
  RESERVATIONS_DATA 
} from '@/lib/mock-data';
import { 
  Calendar, 
  Users, 
  BedDouble, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  LogIn, 
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const PIE_DATA = [
  { name: 'Direct Booking', value: 55, color: '#C8A96B' },
  { name: 'Luxury Travel Agency', value: 25, color: '#123B70' },
  { name: 'Corporate Account', value: 12, color: '#2662AB' },
  { name: 'VIP Concierge', value: 8, color: '#E8D49B' }
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A96B] font-semibold">
            SAPPHIRE HOTEL MANAGEMENT PLATFORM
          </span>
          <h1 className="text-3xl font-serif text-[#F5F1E8] mt-1">Executive Operations Dashboard</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-full bg-[#0B1F3A] border border-[#123B70] text-xs text-[#8B96A8]">
            Property: <span className="text-[#C8A96B] font-semibold">Sapphire Grand Resort</span>
          </div>
        </div>
      </div>

      {/* KPI Grid (Req 28) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        
        {/* KPI 1 */}
        <div className="p-5 rounded-2xl bg-[#07111F] border border-[#C8A96B]/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-[#8B96A8]">Total Revenue</span>
            <div className="p-2 rounded-lg bg-[#123B70]/40 text-[#C8A96B]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif text-[#F5F1E8]">${ADMIN_KPIS.totalRevenue.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% vs last month</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-2xl bg-[#07111F] border border-[#C8A96B]/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-[#8B96A8]">Total Bookings</span>
            <div className="p-2 rounded-lg bg-[#123B70]/40 text-[#C8A96B]">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif text-[#F5F1E8]">{ADMIN_KPIS.totalBookings.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+8.6% active pace</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-5 rounded-2xl bg-[#07111F] border border-[#C8A96B]/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-[#8B96A8]">Occupancy Rate</span>
            <div className="p-2 rounded-lg bg-[#123B70]/40 text-[#C8A96B]">
              <BedDouble className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif text-[#C8A96B]">{ADMIN_KPIS.occupancyRate}%</div>
          <div className="flex items-center gap-1 text-[11px] text-[#8B96A8]">
            <span>Peak capacity high</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-2xl bg-[#07111F] border border-[#C8A96B]/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-[#8B96A8]">Today's Arrivals</span>
            <div className="p-2 rounded-lg bg-[#123B70]/40 text-emerald-400">
              <LogIn className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif text-[#F5F1E8]">{ADMIN_KPIS.todayArrivals}</div>
          <div className="text-[11px] text-[#8B96A8]">34 Checked in so far</div>
        </div>

        {/* KPI 5 */}
        <div className="p-5 rounded-2xl bg-[#07111F] border border-[#C8A96B]/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-[#8B96A8]">Today's Departures</span>
            <div className="p-2 rounded-lg bg-[#123B70]/40 text-amber-400">
              <LogOut className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif text-[#F5F1E8]">{ADMIN_KPIS.todayDepartures}</div>
          <div className="text-[11px] text-[#8B96A8]">28 Processed clean</div>
        </div>

        {/* KPI 6 */}
        <div className="p-5 rounded-2xl bg-[#07111F] border border-[#C8A96B]/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-[#8B96A8]">Available Rooms</span>
            <div className="p-2 rounded-lg bg-[#123B70]/40 text-[#C8A96B]">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif text-[#F5F1E8]">{ADMIN_KPIS.availableRooms}</div>
          <div className="text-[11px] text-[#8B96A8]">Out of 320 inventory</div>
        </div>

      </div>

      {/* Analytics Charts Section (Req 29) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Revenue Area Chart */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-[#07111F] border border-[#C8A96B]/20 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-serif text-[#F5F1E8]">Annual Revenue & Occupancy Growth</h3>
              <p className="text-xs text-[#8B96A8]">Monthly tracking performance across all Sapphire Grand wings</p>
            </div>
            <span className="text-xs text-[#C8A96B] font-mono">2026 Fiscal Year</span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_CHART_DATA}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C8A96B" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#C8A96B" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#123B70" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#123B70" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#123B70" opacity={0.3} />
                <XAxis dataKey="month" stroke="#8B96A8" fontSize={11} />
                <YAxis stroke="#8B96A8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B1F3A', borderColor: '#C8A96B', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#C8A96B" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue ($)" />
                <Area type="monotone" dataKey="occupancy" stroke="#387BCB" fillOpacity={1} fill="url(#colorOcc)" name="Occupancy (%)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Sources Pie Chart */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#07111F] border border-[#C8A96B]/20 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-serif text-[#F5F1E8]">Booking Channel Origin</h3>
            <p className="text-xs text-[#8B96A8]">Percentage distribution of incoming reservations</p>
          </div>

          <div className="h-56 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B1F3A', borderColor: '#C8A96B', borderRadius: '8px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 border-t border-[#C8A96B]/15 pt-3">
            {PIE_DATA.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[#8B96A8]">{item.name}</span>
                </div>
                <span className="text-[#F5F1E8] font-mono font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Reservations Snapshot */}
      <div className="p-6 rounded-3xl bg-[#07111F] border border-[#C8A96B]/20 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-serif text-[#F5F1E8]">Live Reservations Stream</h3>
            <p className="text-xs text-[#8B96A8]">Real-time guest check-ins and bookings</p>
          </div>
          <a href="/admin/reservations" className="text-xs text-[#C8A96B] hover:underline flex items-center gap-1">
            <span>View All Reservations</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B1F3A] text-[#8B96A8] uppercase text-[10px] tracking-widest border-b border-[#123B70]">
              <tr>
                <th className="p-3">Booking ID</th>
                <th className="p-3">Guest Name</th>
                <th className="p-3">Suite Type</th>
                <th className="p-3">Room</th>
                <th className="p-3">Check In</th>
                <th className="p-3">Check Out</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#123B70]/40">
              {RESERVATIONS_DATA.slice(0, 5).map((res) => (
                <tr key={res.id} className="hover:bg-[#0B1F3A]/60 transition-colors">
                  <td className="p-3 font-mono text-[#C8A96B] font-semibold">{res.id}</td>
                  <td className="p-3 font-medium text-[#F5F1E8]">{res.guestName}</td>
                  <td className="p-3 text-[#8B96A8]">{res.roomType}</td>
                  <td className="p-3 font-mono text-[#F5F1E8]">{res.roomNumber}</td>
                  <td className="p-3 text-[#8B96A8]">{res.checkIn}</td>
                  <td className="p-3 text-[#8B96A8]">{res.checkOut}</td>
                  <td className="p-3 font-serif text-[#C8A96B]">${res.amount.toLocaleString()}</td>
                  <td className="p-3">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
