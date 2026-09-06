import React from 'react';
import { AlumniEvent } from '../types';
import { Clock, Terminal, ChevronRight, Hash } from 'lucide-react';
import { motion } from 'motion/react';

interface BackgroundContextPanelProps {
  event: AlumniEvent;
  currentIndex: number;
  totalEvents: number;
}

export const BackgroundContextPanel: React.FC<BackgroundContextPanelProps> = ({
  event,
  currentIndex,
  totalEvents,
}) => {
  return (
    <div className="relative w-full h-full p-5 sm:p-7 md:p-8 bg-[#F2F2F0] border-t lg:border-t-0 border-black/20 flex flex-col justify-between overflow-hidden">
      {/* Subtle background architectural watermark replacing old 04/26 counter */}
      <div className="absolute top-2 right-4 pointer-events-none select-none opacity-5 font-mono-tech text-8xl md:text-9xl font-black text-black">
        {event.code.replace('EV-2024-', '#0')}
      </div>

      <div>
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-5 border-b border-black/20 font-mono-tech text-xs">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-black" />
            <span className="font-bold tracking-widest uppercase text-black">
              ACTIVITY BREAKDOWN & CONTEXT TELEMETRY
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-black/70">
            <span className="px-2 py-0.5 bg-black text-white font-mono-tech font-bold text-[10px] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              STEP {currentIndex + 1} OF {totalEvents}
            </span>
          </div>
        </div>

        {/* Dynamic Activity Breakdown list matching the active event picture */}
        <div className="space-y-3 sm:space-y-4">
          {event.activities.map((activity, idx) => (
            <motion.div
              key={`${event.id}-${idx}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="p-3.5 sm:p-4 bg-white border-2 border-black hover:translate-x-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              {/* Activity Meta Bar */}
              <div className="flex items-center justify-between gap-2 mb-2 font-mono-tech text-[11px]">
                <div className="flex items-center gap-1.5 text-black font-bold">
                  <Clock className="w-3 h-3 text-black" />
                  <span>{activity.time}</span>
                </div>
                <span className="px-2 py-0.5 bg-black text-white text-[10px] font-bold tracking-wider shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                  {activity.tag}
                </span>
              </div>

              {/* Activity Title */}
              <h4 className="text-xs sm:text-sm font-bold text-black uppercase tracking-tight mb-1.5 flex items-start gap-1 font-display">
                <ChevronRight className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                <span>{activity.title}</span>
              </h4>

              {/* Activity Detailed Explanation */}
              <p className="text-xs text-black/80 leading-relaxed font-normal pl-4 mb-2">
                {activity.description}
              </p>

              {/* Session Lead / Fellow */}
              <div className="pl-4 pt-1.5 border-t border-black/15 font-mono-tech text-[10px] text-black/70 flex items-center justify-between">
                <span className="font-medium">Presenter / Lead:</span>
                <span className="font-bold text-black">{activity.lead}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Technical Key Topics tags */}
      <div className="mt-5 pt-4 border-t border-black/20">
        <div className="flex items-center gap-1.5 mb-2 font-mono-tech text-[10px] uppercase tracking-widest text-black/70 font-bold">
          <Hash className="w-3 h-3 text-black" />
          <span>SYNCHRONIZED KNOWLEDGE DOMAINS</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {event.keyTopics.map((topic, i) => (
            <span
              key={i}
              className="px-2.5 py-1 bg-white border border-black text-[11px] font-mono-tech font-bold text-black uppercase tracking-tight shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              #{topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
