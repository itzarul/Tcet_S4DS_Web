import React, { useState } from 'react';
import { AlumniEvent } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { WireframeS } from './WireframeS';
import { ArrowUpRight, Camera, Sparkles } from 'lucide-react';

interface GlimpsesCaseProps {
  event: AlumniEvent;
  allEvents: AlumniEvent[];
  currentIndex: number;
  onSelectEvent: (index: number) => void;
  onOpenJoinUs?: () => void;
}

export const GlimpsesCase: React.FC<GlimpsesCaseProps> = ({
  event,
  allEvents,
  currentIndex,
  onSelectEvent,
  onOpenJoinUs,
}) => {
  const [activeNav, setActiveNav] = useState('HOME');
  const [isHovered, setIsHovered] = useState(false);

  const navItems = [
    { label: 'HOME', action: () => onSelectEvent(0) },
    { label: 'EVENTS', action: () => onSelectEvent((currentIndex + 1) % allEvents.length) },
    { label: 'GLIMPSES', action: () => {} },
    { label: 'STORIES', action: () => onSelectEvent(2 % allEvents.length) },
    { label: 'NETWORK', action: () => onSelectEvent(4 % allEvents.length) },
    { label: 'JOIN', action: onOpenJoinUs },
  ];

  return (
    <div className="flex flex-col justify-between h-full select-none">
      {/* Top Left: Clean Editorial Vertical Navigation matching reference image */}
      <div>
        <nav className="space-y-1.5 sm:space-y-2 mb-8 sm:mb-10 font-black tracking-tight uppercase text-lg sm:text-xl lg:text-2xl font-display">
          {navItems.map((item) => {
            const isSelected = activeNav === item.label;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setActiveNav(item.label);
                  if (item.action) item.action();
                }}
                className={`group flex items-center gap-2 transition-all duration-150 text-left cursor-pointer ${
                  isSelected
                    ? 'text-black font-black translate-x-1'
                    : 'text-black/60 hover:text-black hover:translate-x-1'
                }`}
              >
                {isSelected ? (
                  <span className="font-mono-tech text-black font-bold">→</span>
                ) : (
                  <span className="w-4 opacity-0 group-hover:opacity-100 font-mono-tech transition-opacity">
                    →
                  </span>
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Heading of Glimpses + The Case as requested */}
        <div className="mt-4 sm:mt-6">
          <div className="flex items-center gap-2 mb-2.5">
            <Camera className="w-4 h-4 text-black" />
            <h3 className="font-bold text-base sm:text-lg uppercase tracking-tight text-black font-display">
              Glimpses
            </h3>
            <span className="text-[11px] font-mono-tech font-bold px-1.5 py-0.5 bg-black text-white ml-auto">
              0{currentIndex + 1}/0{allEvents.length}
            </span>
          </div>

          {/* The Glimpses Case: Framed rounded photographic case from the reference */}
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full max-w-[280px] sm:max-w-[320px] rounded-2xl overflow-hidden border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 group"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
              <AnimatePresence mode="wait">
                <motion.img
                  key={event.id}
                  src={event.imageUrl}
                  alt={`Glimpse from ${event.title}`}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </AnimatePresence>

              {/* High-contrast subtle overlay badge */}
              <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1.5 bg-black/85 backdrop-blur-sm rounded-lg text-white font-mono-tech text-[10px] flex items-center justify-between border border-white/15">
                <span className="truncate max-w-[170px] font-bold uppercase">
                  {event.title}
                </span>
                <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
              </div>
            </div>

            {/* Micro Caption bar */}
            <div className="p-2.5 bg-white border-t border-black/15 font-mono-tech text-[10px] flex items-center justify-between text-black/80">
              <span className="font-bold">{event.code}</span>
              <span className="text-black/60 truncate max-w-[140px]">{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom of Left Column: Floating Architectural Wireframe "S" from reference image */}
      <div className="pt-6 sm:pt-8 flex items-center justify-start relative">
        <WireframeS size={105} />
      </div>
    </div>
  );
};
