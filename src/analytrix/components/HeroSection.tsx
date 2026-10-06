import { useState, useEffect, useRef } from 'react';
import { FULL_ARCHIVE_GRID } from '../data/eventData';
import { GalleryItem } from '../types';

interface HeroSectionProps {
  onCardClick: (card: GalleryItem) => void;
  onExploreChapters: () => void;
}

// 15 cards arranged in 3 rows x 5 columns
const GRID_ITEMS = FULL_ARCHIVE_GRID.slice(0, 15);

// Pre-defined initial scattered floating positions for the 15 cards
const INITIAL_SCATTER = [
  // col 0-4 row 0
  { x: -38, y: -32, rotateZ: -14, scale: 0.95 },
  { x: -20, y: -40, rotateZ: 8, scale: 1.05 },
  { x: 0, y: -45, rotateZ: -4, scale: 0.9 },
  { x: 22, y: -38, rotateZ: 12, scale: 1.0 },
  { x: 40, y: -28, rotateZ: -10, scale: 0.95 },
  // col 0-4 row 1
  { x: -44, y: -2, rotateZ: 14, scale: 0.9 },
  { x: -28, y: 4, rotateZ: -8, scale: 1.0 },
  { x: 0, y: 0, rotateZ: 0, scale: 1.15 }, // center card
  { x: 26, y: -2, rotateZ: 9, scale: 1.0 },
  { x: 45, y: 6, rotateZ: -12, scale: 0.92 },
  // col 0-4 row 2
  { x: -36, y: 32, rotateZ: -9, scale: 0.95 },
  { x: -18, y: 38, rotateZ: 7, scale: 1.02 },
  { x: 2, y: 42, rotateZ: -6, scale: 0.9 },
  { x: 22, y: 34, rotateZ: 11, scale: 1.0 },
  { x: 38, y: 28, rotateZ: -8, scale: 0.95 },
];

export default function HeroSection({ onCardClick, onExploreChapters }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // scrollProgress goes continuously from 0 (top/scattered) to 1 (assembled into concave 3D grid)
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const viewportH = window.innerHeight;
          const totalDistance = rect.height - viewportH;
          if (totalDistance <= 0) return;

          const scrolled = -rect.top;
          const rawP = Math.min(Math.max(scrolled / totalDistance, 0), 1);
          setScrollProgress(rawP);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hover clarity is enabled once photos assemble (scrollProgress >= 0.75)
  const isAssembled = scrollProgress >= 0.75;

  return (
    <section
      id="hero"
      ref={containerRef}
      /* Height 250vh provides generous, smooth scrolling for the continuous convergence */
      className="relative h-[250vh] bg-[#050505] text-white"
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center select-none">
        {/* Ambient subtle glow behind everything */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.015] rounded-full blur-3xl" />
        </div>

        {/* =========================================================================
            LAYER 1 (BACKGROUND): 3D CONCAVE SPHERE CURVED GRID STAGE
            - In the background of ANALYTRIX (z-10)
            - Default state: B/W and Gaussian blur (grayscale 100% blur 3px)
            - All photos have sharp 90-degree corners (rounded-none / non-curved vertex)
            - NO WHITE BORDER on hover (removed ring-2 ring-white)
            - Hover does NOTHING while scattered; once assembled, clears image and scales up
           ========================================================================= */}
        <div
          className={`relative w-full max-w-[1400px] h-[84vh] max-h-[800px] flex items-center justify-center px-4 sm:px-8 concave-stage z-10 ${
            isAssembled ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          {/* 5-Column, 3-Row Grid Container */}
          <div className="w-full h-full grid grid-cols-5 grid-rows-3 gap-3 sm:gap-4 md:gap-5">
            {GRID_ITEMS.map((item, idx) => {
              const col = idx % 5;
              const row = Math.floor(idx / 5);

              const deltaCol = col - 2;
              const deltaRow = row - 1;

              const targetRotateX = -deltaRow * 11;
              const targetRotateY = deltaCol * 13;

              const distFromCenter = Math.sqrt(deltaCol * deltaCol + deltaRow * deltaRow);
              const targetTranslateZ = 30 - distFromCenter * 35;

              const scatter = INITIAL_SCATTER[idx] || { x: 0, y: 0, rotateZ: 0, scale: 1 };

              const p = scrollProgress;
              const currentScatterX = scatter.x * (1 - p);
              const currentScatterY = scatter.y * (1 - p);
              const currentRotateZ = scatter.rotateZ * (1 - p);

              const currentRotateX = targetRotateX * p;
              const currentRotateY = targetRotateY * p;
              const currentTranslateZ = targetTranslateZ * p;

              const isCenter = col === 2 && row === 1;
              const isHovered = isAssembled && activeHoverId === item.id;

              return (
                <div
                  key={item.id}
                  id={`hero-concave-card-${item.id}`}
                  onClick={() => {
                    if (isAssembled) {
                      onCardClick(item);
                    }
                  }}
                  onMouseEnter={() => {
                    if (isAssembled) {
                      setActiveHoverId(item.id);
                    }
                  }}
                  onMouseLeave={() => {
                    setActiveHoverId(null);
                  }}
                  className={`concave-card group relative w-full h-full flex items-center justify-center select-none ${
                    isAssembled ? 'cursor-pointer' : 'cursor-default'
                  }`}
                  style={{
                    transform: `translate3d(${currentScatterX}vw, ${currentScatterY}vh, ${currentTranslateZ}px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) rotateZ(${currentRotateZ}deg)`,
                    opacity: 0.35 + p * 0.65,
                  }}
                >
                  {/* Card Container: Strict non-curved vertex (rounded-none, no border-radius)
                      NO WHITE BORDER on hover (removed ring-2 ring-white) */}
                  <div
                    className={`relative w-full aspect-video rounded-none overflow-hidden bg-zinc-950 transition-all duration-500 ${
                      isHovered
                        ? 'scale-108 z-40 shadow-[0_25px_60px_rgba(0,0,0,0.95)]'
                        : isCenter && isAssembled
                        ? 'shadow-[0_0_35px_rgba(255,255,255,0.06)]'
                        : 'shadow-xl'
                    }`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover rounded-none transition-all duration-500 ease-out"
                      style={{
                        filter: isHovered ? 'grayscale(0%) blur(0px)' : 'grayscale(100%) blur(2.5px)',
                        transform: isHovered ? 'scale(1.08)' : 'scale(1.0)',
                      }}
                    />

                    {/* Subtle vignette layer */}
                    <div
                      className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                        isHovered ? 'opacity-0' : 'bg-black/25 opacity-100'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Radial edge vignette */}
          <div
            className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(5,5,5,0) 25%, rgba(5,5,5,0.4) 60%, rgba(5,5,5,0.92) 88%, #050505 100%)`,
              opacity: 0.4 + scrollProgress * 0.6,
            }}
          />
        </div>

        {/* =========================================================================
            LAYER 2 (FOREGROUND): "ANALYTRIX"
            - No text coming between "analy" and "trix"
            - Kept together initially as one seamless word: "analytrix"
            - When you scroll down, "analy" splits left and "trix" splits right and go away,
              while the photos assemble in the background!
           ========================================================================= */}
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="flex items-center justify-center font-serif-display font-normal text-white text-[19vw] sm:text-[17vw] md:text-[15vw] leading-none tracking-tight select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.98)]">
            {/* Left Half: "Analy" - slides left and fades out as user scrolls down */}
            <span
              id="hero-analy-split"
              className="inline-block transition-transform ease-out will-change-transform"
              style={{
                transform: `translateX(-${scrollProgress * 70}vw)`,
                opacity: Math.max(1 - scrollProgress * 1.5, 0),
              }}
            >
              Analy
            </span>

            {/* Right Half: "trix" - slides right and fades out as user scrolls down */}
            <span
              id="hero-trix-split"
              className="inline-block transition-transform ease-out will-change-transform"
              style={{
                transform: `translateX(${scrollProgress * 70}vw)`,
                opacity: Math.max(1 - scrollProgress * 1.5, 0),
              }}
            >
              trix
            </span>
          </div>
        </div>

        {/* Bottom Scroll Prompt */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-auto transition-opacity duration-300"
          style={{
            opacity: Math.max(1 - scrollProgress * 1.4, 0),
          }}
        >
          <button
            onClick={onExploreChapters}
            className="group flex flex-col items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <span className="text-[10px] font-mono-code tracking-[0.3em] uppercase">
              SCROLL TO ASSEMBLE
            </span>
            <div className="w-5 h-8 rounded-none border border-zinc-600 flex items-start justify-center p-1 group-hover:border-zinc-300 transition-colors">
              <div className="w-1 h-2 bg-white animate-bounce" />
            </div>
          </button>
        </div>

        {/* Scroll Progress Bar at very bottom of viewport */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-900 z-40">
          <div
            className="h-full bg-white/70 transition-all duration-75 ease-out"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
