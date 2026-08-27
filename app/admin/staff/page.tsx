'use client';

import React from 'react';
import { STAFF_DATA } from '@/lib/mock-data';
import { UserCheck, ShieldCheck, Mail, Clock } from 'lucide-react';

export default function AdminStaffPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A96B] font-semibold">HUMAN RESOURCES & ROSTER</span>
        <h1 className="text-3xl font-serif text-[#F5F1E8] mt-1">Staff Roster & Attendance</h1>
      </div>

      <div className="p-6 rounded-3xl bg-[#07111F] border border-[#C8A96B]/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B1F3A] text-[#8B96A8] uppercase text-[10px] tracking-widest border-b border-[#123B70]">
              <tr>
                <th className="p-3.5">Staff Member</th>
                <th className="p-3.5">Department</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Shift</th>
                <th className="p-3.5">Attendance</th>
                <th className="p-3.5">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#123B70]/40">
              {STAFF_DATA.map((s) => (
                <tr key={s.id} className="hover:bg-[#0B1F3A]/60 transition-colors">
                  <td className="p-3.5 font-medium text-[#F5F1E8]">{s.name}</td>
                  <td className="p-3.5 text-[#C8A96B] font-serif">{s.department}</td>
                  <td className="p-3.5 text-[#8B96A8]">{s.role}</td>
                  <td className="p-3.5 text-[#8B96A8]">{s.shift}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase ${
                      s.attendance === 'Present'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {s.attendance}
                    </span>
                  </td>
                  <td className="p-3.5 text-[#8B96A8]">{s.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
