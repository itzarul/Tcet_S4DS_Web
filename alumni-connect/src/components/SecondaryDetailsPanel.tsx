import React from 'react';
import { Layers, Activity, Radio, Cpu } from 'lucide-react';

interface SecondaryDetailsPanelProps {
  currentEventIndex: number;
  totalEvents: number;
  activeCategory: string;
}

export const SecondaryDetailsPanel: React.FC<SecondaryDetailsPanelProps> = ({
  activeCategory,
}) => {
  return (
    <div className="border-b lg:border-b-0 lg:border-l border-black/20 bg-[#F2F2F0]/80 backdrop-blur-sm p-4 sm:p-6 flex flex-col justify-between">
      {/* Top Section Header */}
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-black/20">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-black" />
            <span className="font-mono-tech text-xs font-bold uppercase tracking-widest text-black">
              METADATA DESCRIPTORS
            </span>
          </div>
          <span className="font-mono-tech text-[10px] px-2 py-0.5 bg-black text-white font-bold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
            VERIFIED
          </span>
        </div>

        {/* Structured Meta Fields */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 sm:gap-4 font-mono-tech">
          {/* Field 1: Role */}
          <div className="p-3 border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
            <span className="block text-[10px] uppercase tracking-wider text-black/60 font-bold mb-1">
              Role
            </span>
            <span className="block text-xs sm:text-sm font-black text-black uppercase tracking-tight">
              Community Hub
            </span>
          </div>

          {/* Field 2: Launch */}
          <div className="p-3 border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
            <span className="block text-[10px] uppercase tracking-wider text-black/60 font-bold mb-1">
              Launch
            </span>
            <span className="block text-xs sm:text-sm font-black text-black uppercase tracking-tight">
              2024
            </span>
          </div>

          {/* Field 3: Project */}
          <div className="p-3 border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
            <span className="block text-[10px] uppercase tracking-wider text-black/60 font-bold mb-1">
              Project
            </span>
            <span className="block text-xs sm:text-sm font-black text-black uppercase tracking-tight flex items-center gap-1.5">
              <span>Success</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            </span>
          </div>

          {/* Field 4: Stream */}
          <div className="p-3 border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
            <span className="block text-[10px] uppercase tracking-wider text-black/60 font-bold mb-1">
              Stream
            </span>
            <span className="block text-xs sm:text-sm font-black text-black uppercase tracking-tight">
              Release
            </span>
          </div>
        </div>
      </div>

      {/* Live System Telemetry Sub-panel */}
      <div className="mt-4 sm:mt-6 pt-4 border-t border-black/20 font-mono-tech text-[11px] space-y-2.5">
        <div className="flex items-center justify-between text-black/80">
          <span className="flex items-center gap-1.5 font-medium">
            <Activity className="w-3.5 h-3.5 text-black" />
            <span>Telemetry Status</span>
          </span>
          <span className="font-bold text-emerald-600 font-mono-tech">ONLINE</span>
        </div>

        <div className="flex items-center justify-between text-black/80">
          <span className="flex items-center gap-1.5 font-medium">
            <Radio className="w-3.5 h-3.5 text-black" />
            <span>Active Domain</span>
          </span>
          <span className="font-bold text-black uppercase truncate max-w-[140px]">
            {activeCategory}
          </span>
        </div>

        <div className="flex items-center justify-between text-black/80">
          <span className="flex items-center gap-1.5 font-medium">
            <Cpu className="w-3.5 h-3.5 text-black" />
            <span>Sync Latency</span>
          </span>
          <span className="font-bold text-emerald-600 font-mono-tech">18ms • Optimal</span>
        </div>
      </div>
    </div>
  );
};