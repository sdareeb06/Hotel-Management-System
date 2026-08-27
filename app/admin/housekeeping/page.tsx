'use client';

import React, { useState } from 'react';
import { HOUSEKEEPING_DATA, HousekeepingTask } from '@/lib/mock-data';
import { Sparkles, CheckCircle2, Clock, AlertCircle, RefreshCw } from 'lucide-react';

export default function AdminHousekeepingPage() {
  const [tasks, setTasks] = useState<HousekeepingTask[]>(HOUSEKEEPING_DATA);

  const toggleStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextState: HousekeepingTask['status'] =
            t.status === 'Dirty' ? 'In Progress' : t.status === 'In Progress' ? 'Inspection' : 'Ready';
          return { ...t, status: nextState };
        }
        return t;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A96B] font-semibold">FACILITIES & DISPATCH</span>
        <h1 className="text-3xl font-serif text-[#F5F1E8] mt-1">Housekeeping Readiness Tracker</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-6 rounded-3xl bg-[#07111F] border border-[#C8A96B]/20 space-y-4 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-mono text-[#C8A96B] font-bold">Room #{task.roomNumber}</span>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                  task.priority === 'High' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}>
                  {task.priority} Priority
                </span>
              </div>

              <div className="text-xs text-[#8B96A8] space-y-1">
                <div>Assigned: <span className="text-[#F5F1E8] font-medium">{task.housekeeper}</span></div>
                <div>Last Cleaned: <span className="text-[#8B96A8]">{task.lastCleaned}</span></div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#C8A96B]/15 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#8B96A8]">Status:</span>
                <span className="text-[#C8A96B] font-semibold">{task.status}</span>
              </div>

              <button
                onClick={() => toggleStatus(task.id)}
                className="w-full py-2.5 rounded-xl bg-[#0B1F3A] border border-[#123B70] text-xs text-[#C8A96B] hover:bg-[#C8A96B] hover:text-[#07111F] font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Advance Task Stage</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
