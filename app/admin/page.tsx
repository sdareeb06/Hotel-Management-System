'use client';

import React from 'react';
import { 
  ADMIN_KPIS, 
  REVENUE_CHART_DATA, 
  RESERVATIONS_DATA 
} from '@/lib/mock-data';
import { 
  Calendar, 
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
  PieChart,
  Pie,
  Cell
} from 'recharts';

const PIE_DATA = [
  { name: 'Direct Booking', value: 55, color: '#C8A96B' },
  { name: 'Luxury Travel Agency', value: 25, color: '#123B70' },
  { name: 'Corporate Account', value: 12, color: '#2662AB' },
  { name: 'VIP Concierge', value: 8, color: '#8B6508' }
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
          <h1 className="text-3xl font-serif text-[#123B70] mt-1 font-semibold">Executive Operations Dashboard</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-full bg-white border border-[#E6E8EC] text-xs text-[#667085] shadow-sm">
            Property: <span className="text-[#123B70] font-semibold">Sapphire Grand Resort</span>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        
        {/* KPI 1 */}
        <div className="p-5 rounded-2xl bg-white border border-[#E6E8EC] shadow-[0_10px_30px_rgba(11,23,42,0.04)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-[#667085]">Total Revenue</span>
            <div className="p-2 rounded-lg bg-[#F7F8FA] text-[#123B70]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif text-[#123B70] font-semibold">${ADMIN_KPIS.totalRevenue.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% vs last month</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-2xl bg-white border border-[#E6E8EC] shadow-[0_10px_30px_rgba(11,23,42,0.04)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-[#667085]">Total Bookings</span>
            <div className="p-2 rounded-lg bg-[#F7F8FA] text-[#123B70]">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif text-[#0B172A] font-semibold">{ADMIN_KPIS.totalBookings.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+8.6% active pace</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-5 rounded-2xl bg-white border border-[#E6E8EC] shadow-[0_10px_30px_rgba(11,23,42,0.04)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-[#667085]">Occupancy Rate</span>
            <div className="p-2 rounded-lg bg-[#F7F8FA] text-[#C8A96B]">
              <BedDouble className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif text-[#C8A96B] font-semibold">{ADMIN_KPIS.occupancyRate}%</div>
          <div className="flex items-center gap-1 text-[11px] text-[#667085]">
            <span>Peak capacity high</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-2xl bg-white border border-[#E6E8EC] shadow-[0_10px_30px_rgba(11,23,42,0.04)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-[#667085]">Today's Arrivals</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <LogIn className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif text-[#0B172A] font-semibold">{ADMIN_KPIS.todayArrivals}</div>
          <div className="text-[11px] text-[#667085]">34 Checked in so far</div>
        </div>

        {/* KPI 5 */}
        <div className="p-5 rounded-2xl bg-white border border-[#E6E8EC] shadow-[0_10px_30px_rgba(11,23,42,0.04)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-[#667085]">Today's Departures</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <LogOut className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif text-[#0B172A] font-semibold">{ADMIN_KPIS.todayDepartures}</div>
          <div className="text-[11px] text-[#667085]">28 Processed clean</div>
        </div>

        {/* KPI 6 */}
        <div className="p-5 rounded-2xl bg-white border border-[#E6E8EC] shadow-[0_10px_30px_rgba(11,23,42,0.04)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-[#667085]">Available Rooms</span>
            <div className="p-2 rounded-lg bg-[#F7F8FA] text-[#123B70]">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif text-[#0B172A] font-semibold">{ADMIN_KPIS.availableRooms}</div>
          <div className="text-[11px] text-[#667085]">Out of 320 inventory</div>
        </div>

      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Revenue Area Chart */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-[#E6E8EC] shadow-[0_10px_30px_rgba(11,23,42,0.04)] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-serif text-[#123B70] font-semibold">Annual Revenue & Occupancy Growth</h3>
              <p className="text-xs text-[#667085]">Monthly tracking performance across all Sapphire Grand wings</p>
            </div>
            <span className="text-xs text-[#C8A96B] font-mono font-semibold">2026 Fiscal Year</span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_CHART_DATA}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#123B70" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#123B70" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C8A96B" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#C8A96B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E6E8EC" />
                <XAxis dataKey="month" stroke="#667085" fontSize={11} />
                <YAxis stroke="#667085" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E6E8EC', borderRadius: '12px', fontSize: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#123B70" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue ($)" />
                <Area type="monotone" dataKey="occupancy" stroke="#C8A96B" fillOpacity={1} fill="url(#colorOcc)" name="Occupancy (%)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Sources Pie Chart */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-[#E6E8EC] shadow-[0_10px_30px_rgba(11,23,42,0.04)] space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-serif text-[#123B70] font-semibold">Booking Channel Origin</h3>
            <p className="text-xs text-[#667085]">Percentage distribution of incoming reservations</p>
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
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E6E8EC', borderRadius: '8px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 border-t border-[#E6E8EC] pt-3">
            {PIE_DATA.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[#667085]">{item.name}</span>
                </div>
                <span className="text-[#0B172A] font-mono font-semibold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Reservations Snapshot */}
      <div className="p-6 rounded-3xl bg-white border border-[#E6E8EC] shadow-[0_10px_30px_rgba(11,23,42,0.04)] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-serif text-[#123B70] font-semibold">Live Reservations Stream</h3>
            <p className="text-xs text-[#667085]">Real-time guest check-ins and bookings</p>
          </div>
          <a href="/admin/reservations" className="text-xs text-[#123B70] hover:underline flex items-center gap-1 font-semibold">
            <span>View All Reservations</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C8A96B]" />
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F8FA] text-[#667085] uppercase text-[10px] tracking-widest border-b border-[#E6E8EC]">
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
            <tbody className="divide-y divide-[#E6E8EC]">
              {RESERVATIONS_DATA.slice(0, 5).map((res) => (
                <tr key={res.id} className="hover:bg-[#F7F8FA] transition-colors">
                  <td className="p-3 font-mono text-[#123B70] font-semibold">{res.id}</td>
                  <td className="p-3 font-medium text-[#0B172A]">{res.guestName}</td>
                  <td className="p-3 text-[#667085]">{res.roomType}</td>
                  <td className="p-3 font-mono text-[#0B172A]">{res.roomNumber}</td>
                  <td className="p-3 text-[#667085]">{res.checkIn}</td>
                  <td className="p-3 text-[#667085]">{res.checkOut}</td>
                  <td className="p-3 font-serif text-[#123B70] font-bold">${res.amount.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase ${
                      res.status === 'Checked In'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        : res.status === 'Confirmed'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : res.status === 'Pending'
                        ? 'bg-amber-50 text-amber-600 border border-amber-200'
                        : 'bg-rose-50 text-rose-600 border border-rose-200'
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
