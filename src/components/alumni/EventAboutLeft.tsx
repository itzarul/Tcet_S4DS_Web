import React from 'react';
import { AlumniEvent } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface EventAboutLeftProps {
  event: AlumniEvent;
}

export const EventAboutLeft: React.FC<EventAboutLeftProps> = ({ event }) => {
  return (
    <div className="w-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-4 select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-5 sm:space-y-6 max-w-2xl"
        >
          {/* Editorial Display Heading - Significantly Larger */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-black leading-[1.05] font-display uppercase">
            {event.title}
          </h2>

          {/* Focus Subtitle - Increased Font Size */}
          <p className="font-mono-tech text-sm sm:text-base md:text-lg font-bold text-black/90 uppercase tracking-wide leading-relaxed border-l-4 border-black pl-4 py-1">
            {event.subtitle}
          </p>

          {/* Direct Narrative Text - Larger Reading Size */}
          <p className="text-base sm:text-lg md:text-xl text-black/85 leading-relaxed font-normal">
            {event.description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};