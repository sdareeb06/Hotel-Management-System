'use client';

import React from 'react';
import { FileText, TrendingUp, Download, PieChart as PieIcon } from 'lucide-react';
import { REVENUE_CHART_DATA } from '@/lib/mock-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A96B] font-semibold">BUSINESS INTELLIGENCE</span>
          <h1 className="text-3xl font-serif text-[#F5F1E8] mt-1">Analytics & Financial Reports</h1>
        </div>

        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#123B70] text-[#F5F1E8] text-xs font-serif hover:bg-[#C8A96B] hover:text-[#07111F] transition-all self-start">
          <Download className="w-4 h-4" />
          <span>Export PDF Audit</span>
        </button>
      </div>

      <div className="p-6 rounded-3xl bg-[#07111F] border border-[#C8A96B]/20 space-y-4">
        <h3 className="text-lg font-serif text-[#F5F1E8]">Monthly Revenue Output ($ USD)</h3>
        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={REVENUE_CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#123B70" opacity={0.3} />
              <XAxis dataKey="month" stroke="#8B96A8" fontSize={11} />
              <YAxis stroke="#8B96A8" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1F3A', borderColor: '#C8A96B', borderRadius: '12px', fontSize: '12px' }} />
              <Bar dataKey="revenue" fill="#C8A96B" radius={[6, 6, 0, 0]} name="Revenue ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
