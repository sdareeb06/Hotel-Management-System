'use client';

import React from 'react';
import { CreditCard, DollarSign, ArrowUpRight, CheckCircle } from 'lucide-react';

const TRANSACTIONS = [
  { id: 'TX-901', guest: 'Alexander Wright', description: 'Presidential Suite (6 nights) + Cellar Pairing', amount: 33000, date: '2026-08-27', method: 'Amex Centurion', status: 'Settled' },
  { id: 'TX-902', guest: 'Elena Rostova', description: 'Grand Residence Stay', amount: 8400, date: '2026-08-27', method: 'Visa Infinite', status: 'Settled' },
  { id: 'TX-903', guest: 'Marcus Sterling', description: 'Executive Suite Deposit', amount: 3600, date: '2026-08-26', method: 'Mastercard World Elite', status: 'Settled' },
  { id: 'TX-904', guest: 'Dr. Sophia Chen', description: 'Sapphire King Suite', amount: 1300, date: '2026-08-26', method: 'Apple Pay Luxury Card', status: 'Settled' }
];

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A96B] font-semibold">FINANCIAL LEDGER</span>
        <h1 className="text-3xl font-serif text-[#F5F1E8] mt-1">Payments & Revenue Settlement</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[#07111F] border border-[#C8A96B]/20 space-y-2">
          <span className="text-[10px] uppercase tracking-widest text-[#8B96A8]">Total Daily Settlement</span>
          <div className="text-3xl font-serif text-[#C8A96B]">$46,300.00</div>
          <span className="text-[11px] text-emerald-400">100% Cleared Merchant Accounts</span>
        </div>
        <div className="p-6 rounded-3xl bg-[#07111F] border border-[#C8A96B]/20 space-y-2">
          <span className="text-[10px] uppercase tracking-widest text-[#8B96A8]">Pending Room Folios</span>
          <div className="text-3xl font-serif text-[#F5F1E8]">$12,450.00</div>
          <span className="text-[11px] text-[#8B96A8]">Pre-authorization active</span>
        </div>
        <div className="p-6 rounded-3xl bg-[#07111F] border border-[#C8A96B]/20 space-y-2">
          <span className="text-[10px] uppercase tracking-widest text-[#8B96A8]">Merchant Gateway Fee</span>
          <div className="text-3xl font-serif text-[#F5F1E8]">1.2% Average</div>
          <span className="text-[11px] text-[#8B96A8]">Direct Bank Protocol</span>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-[#07111F] border border-[#C8A96B]/20 overflow-hidden">
        <h3 className="text-lg font-serif text-[#F5F1E8] mb-4">Recent Financial Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B1F3A] text-[#8B96A8] uppercase text-[10px] tracking-widest border-b border-[#123B70]">
              <tr>
                <th className="p-3.5">Tx Reference</th>
                <th className="p-3.5">Guest</th>
                <th className="p-3.5">Folio Description</th>
                <th className="p-3.5">Payment Method</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#123B70]/40">
              {TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#0B1F3A]/60 transition-colors">
                  <td className="p-3.5 font-mono text-[#C8A96B] font-semibold">{tx.id}</td>
                  <td className="p-3.5 font-medium text-[#F5F1E8]">{tx.guest}</td>
                  <td className="p-3.5 text-[#8B96A8]">{tx.description}</td>
                  <td className="p-3.5 text-[#8B96A8]">{tx.method}</td>
                  <td className="p-3.5 text-[#8B96A8]">{tx.date}</td>
                  <td className="p-3.5 font-serif text-[#C8A96B] font-semibold">${tx.amount.toLocaleString()}</td>
                  <td className="p-3.5 text-emerald-400 font-semibold">{tx.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
