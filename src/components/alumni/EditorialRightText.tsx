import React from 'react';
import { AlumniEvent } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, UserCheck } from 'lucide-react';

interface EditorialRightTextProps {
  event: AlumniEvent;
  onOpenJoinUs?: () => void;
}

export const EditorialRightText: React.FC<EditorialRightTextProps> = ({
  event,
  onOpenJoinUs,
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-6 select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 max-w-xl"
        >
          {/* Section Marker / Index tag without any card box */}
          <div className="flex items-center gap-2 font-mono-tech text-xs text-black/60">
            <span className="font-bold text-black uppercase tracking-wider">{event.code}</span>
            <span>•</span>
            <span className="uppercase tracking-widest text-[11px] font-semibold text-black/70">
              {event.category}
            </span>
          </div>

          {/* Large Editorial Headline (Inspired by reference screenshot) */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black leading-[1.1] font-display">
            {event.title.split(' ').map((word, idx) => {
              // Add subtle italic emphasis to key conceptual words
              const isKeyWord = idx % 3 === 1;
              return isKeyWord ? (
                <span key={idx} className="italic font-serif font-normal text-black mr-2">
                  {word}{' '}
                </span>
              ) : (
                <span key={idx} className="mr-2">
                  {word}{' '}
                </span>
              );
            })}
          </h2>

          {/* Subtitle / Focus sentence */}
          <p className="font-mono-tech text-xs sm:text-sm font-semibold text-black/80 uppercase tracking-wide leading-relaxed border-l-2 border-black pl-3">
            {event.subtitle}
          </p>

          {/* Pure narrative description text directly on background - No box! */}
          <p className="text-sm sm:text-base md:text-lg text-black/85 leading-relaxed font-normal">
            {event.description}
          </p>

          {/* Curator / Lead attribution line */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-3 font-mono-tech text-xs text-black/70">
            <div className="flex items-center gap-2">
              <UserCheck className="w-3.5 h-3.5 text-black" />
              <span className="font-bold text-black">{event.curator}</span>
              <span className="text-black/50">— {event.curatorRole}</span>
            </div>

            {onOpenJoinUs && (
              <button
                type="button"
                onClick={onOpenJoinUs}
                className="group flex items-center gap-1.5 font-bold text-black hover:underline underline-offset-4 cursor-pointer text-xs"
              >
                <span>CONNECT WITH CHAPTER</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
