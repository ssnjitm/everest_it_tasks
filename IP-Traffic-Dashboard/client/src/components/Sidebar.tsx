import React from 'react';
import { useAppStore } from '../store/useAppStore';
import type  { RegionData } from '../types';

interface SidebarProps {
  data?: RegionData[];
  serverTime?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ data, serverTime }) => {
  const { selectedRegion, setSelectedRegion } = useAppStore();

  return (
    <aside className="w-80 bg-white border-r border-slate-200 flex flex-col shadow-2xl z-20">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Traffic Hub</h1>
        <div className="mt-4 flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Server Status</span>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-sm text-slate-600">{serverTime || 'Syncing...'}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <p className="text-xs font-bold text-slate-400 uppercase px-2 mb-3">Detected Regions</p>
        {data?.map((item) => (
          <button
            key={item.name}
            onClick={() => setSelectedRegion(item.name)}
            className={`w-full text-left p-3 rounded-xl transition-all duration-200 border ${
              selectedRegion === item.name
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 scale-[1.02]'
                : 'bg-white border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-200'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-sm">{item.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                selectedRegion === item.name ? 'bg-indigo-400/30 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {item.count} IPs
              </span>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;