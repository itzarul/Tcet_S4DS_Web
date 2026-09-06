import React from 'react';
import { AlumniEvent } from '../types';
import { Calendar, MapPin, Users, FileText, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface EventDescriptionPanelProps {
  event: AlumniEvent;
}

export const EventDescriptionPanel: React.FC<EventDescriptionPanelProps> = ({ event }) => {
  return (
    <motion.div
      key={event.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="p-5 sm:p-7 md:p-8 bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative flex flex-col justify-between h-full"
    >
      {/* Top Header & Classification */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-black/20 font-mono-tech text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-black text-white font-bold tracking-wider text-[11px] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              {event.code}
            </span>
            <span className="font-bold text-black uppercase tracking-wider text-[11px]">
              {event.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-black text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-black" />
            <span className="font-bold">CONFIRMED DISPATCH</span>
          </div>
        </div>

        {/* Event Main Headings */}
        <div className="space-y-1.5 mb-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-black leading-tight font-display">
            {event.title}
          </h2>
          <p className="text-xs sm:text-sm font-mono-tech text-black/75 font-semibold leading-normal">
            — {event.subtitle}
          </p>
        </div>

        {/* Detailed Description Typography Container (Replacing static media card & wireframe S) */}
        <div className="space-y-3.5 text-black/90 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
          <p>{event.description}</p>
        </div>

        {/* Key Contextual Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-black/20 font-mono-tech text-xs">
          <div className="flex items-start gap-2.5 p-2.5 bg-[#F2F2F0] border border-black/25 hover:border-black transition-colors">
            <Calendar className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
            <div>
              <span className="block text-[10px] uppercase text-black/60 font-bold">Date & Time</span>
              <span className="font-bold text-black text-[11px] sm:text-xs">{event.date}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 bg-[#F2F2F0] border border-black/25 hover:border-black transition-colors">
            <MapPin className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
            <div>
              <span className="block text-[10px] uppercase text-black/60 font-bold">Location / Mesh</span>
              <span className="font-bold text-black text-[11px] sm:text-xs truncate block max-w-[180px]">
                {event.location}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 bg-[#F2F2F0] border border-black/25 hover:border-black transition-colors">
            <Users className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
            <div>
              <span className="block text-[10px] uppercase text-black/60 font-bold">Delegation</span>
              <span className="font-bold text-black text-[11px] sm:text-xs">{event.attendeesCount}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 bg-[#F2F2F0] border border-black/25 hover:border-black transition-colors">
            <FileText className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
            <div>
              <span className="block text-[10px] uppercase text-black/60 font-bold">Lead Curator</span>
              <span className="font-bold text-black text-[11px] sm:text-xs truncate block max-w-[180px]">
                {event.curator}
              </span>
            </div>
          </div>
        </div>

        {/* Impact Metrics strip */}
        <div className="mt-4 pt-4 border-t border-black/20">
          <span className="block font-mono-tech text-[10px] uppercase tracking-widest text-black/60 font-bold mb-2">
            MEASURED IMPACT METRICS
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono-tech">
            {event.impactMetrics.map((metric, i) => (
              <div key={i} className="p-2.5 bg-[#F2F2F0] border border-black/25 hover:border-black transition-colors">
                <span className="block text-sm sm:text-base font-black text-black">{metric.value}</span>
                <span className="block text-[9px] uppercase tracking-tight text-black/70 font-semibold">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quote / Testimonial footer */}
      <div className="mt-6 pt-4 border-t border-black/20 bg-[#F2F2F0]/60 -mx-2 -mb-2 p-3 sm:p-4 border-x border-b border-black/20">
        <blockquote className="italic text-[11px] sm:text-xs text-black/85 leading-relaxed">
          "{event.quote.text}"
        </blockquote>
        <div className="mt-2 flex items-center justify-between font-mono-tech text-[10px] text-black/70">
          <span className="font-bold text-black">{event.quote.author}</span>
          <span className="font-semibold">{event.quote.role}</span>
        </div>
      </div>
    </motion.div>
  );
};
