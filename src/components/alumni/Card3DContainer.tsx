import React, { useState, useRef, useEffect } from 'react';
import { AlumniEvent } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, RotateCw, Compass } from 'lucide-react';

interface Card3DContainerProps {
  event: AlumniEvent;
  currentIndex: number;
  totalEvents: number;
  onNext: () => void;
  onPrev: () => void;
  onSelectIndex: (index: number) => void;
  direction: number; // 1 for next, -1 for prev
}

export const Card3DContainer: React.FC<Card3DContainerProps> = ({
  event,
  currentIndex,
  totalEvents,
  onNext,
  onPrev,
  onSelectIndex,
  direction,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(false);

  // Dynamic 3D Parallax Tilt with cursor movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize to -1 ... 1
    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    // 3D tilt angles
    setMouseTilt({
      x: -normY * 12,
      y: normX * 16,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseTilt({ x: 0, y: 0 });
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === 'ArrowDown') {
        onNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'ArrowUp') {
        onPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none py-1 px-2 sm:px-4">
      
      {/* Top Header Row */}
      <div className="relative z-20 w-full max-w-[540px] xl:max-w-[600px] flex items-center justify-between gap-3 mb-2.5 font-mono-tech text-xs">
        <div className="flex items-center gap-3">
          <span className="font-black text-black uppercase tracking-tight text-sm sm:text-base font-display">
            Glimpses
          </span>
          <span className="font-bold text-black text-xs sm:text-sm">/{totalEvents}</span>
          
          {/* Carousel indicator dots */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalEvents }).map((_, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-black scale-125'
                      : 'border border-black bg-transparent hover:bg-black/40'
                  }`}
                  aria-label={`Jump to glimpse ${idx + 1}`}
                />
              );
            })}
          </div>
        </div>

        {/* Tactile scroll rotation prompt */}
        <div className="flex items-center gap-1.5 text-[10px] text-black/60 bg-white/90 px-2 py-0.5 border border-black/20 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
          <Compass className="w-3 h-3 text-black animate-spin" />
          <span className="font-bold">SCROLL TO ROTATE</span>
        </div>
      </div>

      {/* Main Container Wrapper with Perspective */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative z-20 w-full max-w-[540px] xl:max-w-[600px] cursor-grab active:cursor-grabbing perspective-1200"
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={event.id}
            custom={direction}
            initial={{
              rotateY: direction > 0 ? 180 : -180,
              rotateX: direction > 0 ? 15 : -15,
              scale: 0.82,
              opacity: 0,
            }}
            animate={{
              rotateY: mouseTilt.y,
              rotateX: mouseTilt.x,
              scale: 1,
              opacity: 1,
            }}
            exit={{
              rotateY: direction > 0 ? -180 : 180,
              rotateX: direction > 0 ? -15 : 15,
              scale: 0.82,
              opacity: 0,
            }}
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full transform-style-3d"
          >
            {/* Outer 3D Monitor / High-Fidelity Chassis */}
            <div className="relative rounded-2xl p-2.5 sm:p-3.5 bg-[#E2E2DF] border-[3px] border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] sm:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] transform-style-3d">
              
              {/* 3D Screen Viewport */}
              <div className="relative w-full aspect-[16/10] max-h-[350px] xl:max-h-[390px] bg-black rounded-lg overflow-hidden border-2 border-black shadow-inner">
                
                {/* Fullscreen Expansion Button Overlay */}
                <button
                  type="button"
                  onClick={() => setFullscreenImage(true)}
                  className="absolute top-2.5 right-2.5 z-10 p-1.5 bg-black/60 hover:bg-black text-white rounded border border-white/20 transition-colors backdrop-blur-sm cursor-pointer"
                  title="View Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>

                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-[1.0] transition-transform duration-700 ease-out hover:scale-105"
                  loading="eager"
                />

                {/* Glass Glare Dynamic Reflection */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                  style={{
                    transform: `translateX(${mouseTilt.y * 3}px) translateY(${mouseTilt.x * 3}px)`,
                  }}
                />

                {/* Bottom Bar Caption */}
                <div className="absolute bottom-0 inset-x-0 p-2.5 pointer-events-none select-none bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-center justify-between text-white font-mono-tech text-[10px] sm:text-[11px]">
                  <span className="truncate max-w-[280px] font-bold uppercase tracking-tight">
                    {event.title}
                  </span>
                  <span className="px-1.5 py-0.5 bg-black/60 border border-white/20 rounded font-bold uppercase text-[9px] shrink-0">
                    {event.code}
                  </span>
                </div>
              </div>

              {/* Bottom Monitor Base / Stand Bar */}
              <div className="mt-1.5 px-2.5 py-1 bg-[#D5D5D1] rounded-b-lg border-t-2 border-black flex items-center justify-between font-mono-tech text-[10px] sm:text-[11px] text-black">
                <div className="flex items-center gap-2">
                  <span className="font-bold uppercase text-[10px]">Glimpse View</span>
                  <span className="text-black/30">•</span>
                  <span className="text-black/70 text-[9px] sm:text-[10px]">SCROLL TO FLIP</span>
                </div>

                <button
                  type="button"
                  onClick={onNext}
                  className="flex items-center gap-1 px-2 py-0.5 bg-black text-white hover:bg-neutral-800 rounded font-bold text-[9px] sm:text-[10px] transition-colors cursor-pointer"
                >
                  <RotateCw className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span>ROTATE</span>
                </button>
              </div>
            </div>

            {/* Monitor Stand Foot */}
            <div className="w-28 sm:w-36 h-4 mx-auto bg-[#C5C5C0] border-2 border-black rounded-b-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
              <div className="w-10 h-1 bg-black/30 rounded-full"></div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Floor Shadow Effect */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-10 bg-black/40 blur-2xl rounded-full transition-all duration-300 pointer-events-none z-10"
          style={{
            transform: `scale(${isHovered ? 1.08 : 0.95})`,
          }}
        />
      </div>

      {/* Fullscreen Inspection Lightbox */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenImage(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <div className="relative max-w-4xl w-full bg-black border-2 border-white/20 p-3 rounded-2xl">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              />
              <div className="p-4 text-white font-mono-tech text-xs flex justify-between items-center">
                <div>
                  <div className="font-bold text-sm uppercase">{event.title}</div>
                  <div className="text-white/60">{event.subtitle}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setFullscreenImage(false)}
                  className="px-3 py-1.5 bg-white text-black font-bold uppercase rounded cursor-pointer"
                >
                  Close [ESC]
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};