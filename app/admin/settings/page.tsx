'use client';

import React, { useState } from 'react';
import { Settings, Save, Shield, Bell, Key, Sparkles } from 'lucide-react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A96B] font-semibold">CONFIGURATION</span>
        <h1 className="text-3xl font-serif text-[#F5F1E8] mt-1">System & Property Settings</h1>
      </div>

      <form onSubmit={handleSave} className="p-8 rounded-3xl bg-[#07111F] border border-[#C8A96B]/20 space-y-6">
        <h3 className="text-xl font-serif text-[#F5F1E8]">Property Configuration</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#8B96A8] mb-1">Hotel Property Name</label>
            <input
              type="text"
              defaultValue="Sapphire Grand Hotel & Resort"
              className="w-full bg-[#0B1F3A] border border-[#123B70] rounded-xl px-4 py-3 text-sm text-[#F5F1E8] focus:border-[#C8A96B] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#8B96A8] mb-1">Management Platform</label>
            <input
              type="text"
              defaultValue="SAPPHIRE HOTEL MANAGEMENT"
              className="w-full bg-[#0B1F3A] border border-[#123B70] rounded-xl px-4 py-3 text-sm text-[#F5F1E8] focus:border-[#C8A96B] outline-none"
            />
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-[#C8A96B]/15">
          <h4 className="text-xs uppercase tracking-widest text-[#C8A96B]">Notification Dispatch</h4>
          <div className="space-y-2 text-xs">
            <label className="flex items-center gap-3 text-[#F5F1E8] cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded accent-[#C8A96B]" />
              <span>Real-time instant alert on high-value VIP arrivals ($5,000+ folio)</span>
            </label>
            <label className="flex items-center gap-3 text-[#F5F1E8] cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded accent-[#C8A96B]" />
              <span>Automated housekeeping priority re-routing</span>
            </label>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <button
            type="submit"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#C8A96B] to-[#A68848] text-[#07111F] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(200,169,107,0.4)] transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>

          {saved && (
            <span className="text-xs text-emerald-400 font-semibold animate-in fade-in">
              System Settings Updated Successfully!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
