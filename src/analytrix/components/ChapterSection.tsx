import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Database, Cpu, Users, Presentation, Globe, Sparkles, Compass, Layers } from 'lucide-react';
import { ChapterData, GalleryItem } from '../types';

interface ChapterSectionProps {
  data: ChapterData;
  gallerySectionId: string;
  onCardClick: (card: GalleryItem) => void;
}

// Map icon string to Lucide icon component
function getFeatureIcon(iconName: string) {
  switch (iconName) {
    case 'database':
      return <Database className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors duration-300 stroke-[1.5]" />;
    case 'cpu':
      return <Cpu className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors duration-300 stroke-[1.5]" />;
    case 'users':
      return <Users className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors duration-300 stroke-[1.5]" />;
    case 'presentation':
      return <Presentation className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors duration-300 stroke-[1.5]" />;
    case 'globe':
      return <Globe className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors duration-300 stroke-[1.5]" />;
    case 'sparkles':
      return <Sparkles className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors duration-300 stroke-[1.5]" />;
    case 'compass':
      return <Compass className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors duration-300 stroke-[1.5]" />;
    case 'layers':
      return <Layers className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors duration-300 stroke-[1.5]" />;
    default:
      return <Layers className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors duration-300 stroke-[1.5]" />;
  }
}

export default function ChapterSection({
  data,
  gallerySectionId,
  onCardClick,
}: ChapterSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const isGalleryInView = useInView(galleryRef, { once: true, margin: '-60px' });

  // Format the description text to render italic emphasis on highlighted phrases
  const renderFormattedDescription = (text: string) => {
    if (data.id === 'chapter-01') {
      return (
        <>
          Step into Chapter 01 of ANALYTRIX, where{' '}
          <em className="font-serif-display italic text-white not-italic-font">real-world datasets</em> meet{' '}
          <em className="font-serif-display italic text-white not-italic-font">analytical problem solving</em>. Students
          collaborate in intensive sprints to explore messy telemetry, extract actionable patterns, and engineer{' '}
          <em className="font-serif-display italic text-white not-italic-font">predictive models</em> under deadlines.
          Experience firsthand how data-driven challenges move beyond classroom theory into tangible, high-impact
          solutions.
        </>
      );
    }

    if (data.id === 'chapter-02') {
      return (
        <>
          Chapter 02 takes you into the broader landscape of modern{' '}
          <em className="font-serif-display italic text-white not-italic-font">Data Science and AI</em>. Connect directly
          with industry leaders, examine{' '}
          <em className="font-serif-display italic text-white not-italic-font">production architectures</em>, and
          uncover emerging technical{' '}
          <em className="font-serif-display italic text-white not-italic-font">career pathways</em>. Discover essential
          industry-ready toolsets and gain clear perspective on where data expertise can take your professional journey.
        </>
      );
    }

    return text;
  };

  return (
    <div
      id={data.id}
      ref={sectionRef}
      className="relative py-24 sm:py-32 border-t border-zinc-900 bg-[#050505]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Eyebrow Tracker with left-slide animation */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex items-center gap-4"
        >
          <span className="text-xs sm:text-sm font-mono-code tracking-[0.35em] text-zinc-500 uppercase">
            {data.badge.split('').join(' ')}
          </span>
          <div className="h-px w-12 bg-zinc-800" />
        </motion.div>

        {/* =========================================================================
            MAIN SECTION LAYOUT:
            Left: Big Title, Tagline, Description (sliding animation from left)
            Right: 4 Features with duller font that becomes white on hover
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sliding in from left */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            {/* Big Chapter Title */}
            <motion.h2
              initial={{ opacity: 0, x: -80 }}
              animate={isSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-7xl md:text-8xl font-serif-display font-normal text-white tracking-tight leading-[0.98] mb-6"
            >
              {data.title}
            </motion.h2>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, x: -65 }}
              animate={isSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -65 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg font-mono-code text-zinc-400 mb-8 uppercase tracking-widest"
            >
              {data.tagline}
            </motion.p>

            {/* Description: lowered by one font size, sliding in from left */}
            <motion.p
              initial={{ opacity: 0, x: -55 }}
              animate={isSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -55 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl sm:text-2xl lg:text-[26px] font-sans font-light text-zinc-300 leading-[1.4] tracking-[-0.01em]"
            >
              {renderFormattedDescription(data.description)}
            </motion.p>
          </div>

          {/* Right Column: 4 Clean Features (no boxes, font color duller than description, becomes white on hover) */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 relative border-l border-zinc-800/80">
              {data.features.slice(0, 4).map((feature, idx) => {
                const isTopRow = idx < 2;
                const isLeftCol = idx % 2 === 0;

                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, x: -45 }}
                    animate={isSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -45 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + idx * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`group p-6 sm:p-8 flex flex-col transition-colors duration-300 ${
                      isTopRow ? 'border-b border-zinc-800/80' : ''
                    } ${!isLeftCol ? 'sm:border-l border-zinc-800/80' : ''}`}
                  >
                    {/* Minimal Icon */}
                    <div className="mb-4">
                      {getFeatureIcon(feature.iconName)}
                    </div>

                    {/* Category Title: duller (text-zinc-400), becomes white on hover */}
                    <h3 className="text-2xl sm:text-3xl font-serif-display italic text-zinc-400 group-hover:text-white transition-colors duration-300 mb-4 font-normal">
                      {feature.title}
                    </h3>

                    {/* Bulleted list: duller (text-zinc-500), becomes white on hover */}
                    <ul className="space-y-2.5">
                      {feature.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2.5 text-sm font-sans text-zinc-500 group-hover:text-white transition-colors duration-300 font-light leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-white transition-colors duration-300 mt-2 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================================
            GALLERY SECTION: DIRECTLY AFTER FEATURES
            - 9 clean photographs with non-curved vertices
            - NO text below photos
            - Sliding animation on photos like description (x: -50 to 0)
            - Hover effect: white shadow-like subtle shine behind the photo
            ========================================================================= */}
        <div id={gallerySectionId} ref={galleryRef} className="mt-20 pt-16 border-t border-zinc-900">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isGalleryInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex items-center justify-between"
          >
            <div className="flex items-center gap-2 text-xs font-mono-code text-zinc-500 uppercase tracking-widest">
              <span>{data.badge}</span>
              <span>•</span>
              <span>9 PHOTOGRAPHS</span>
            </div>
          </motion.div>

          {/* Grid Layout: 3 Columns x 3 Rows = 9 photos on md/lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-7">
            {data.gallery.slice(0, 9).map((item, photoIdx) => (
              <motion.div
                key={item.id}
                id={`gallery-item-${item.id}`}
                onClick={() => onCardClick(item)}
                initial={{ opacity: 0, x: -55 }}
                animate={isGalleryInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -55 }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + photoIdx * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="gallery-shine-card group cursor-pointer relative bg-zinc-950 overflow-visible rounded-none"
              >
                {/* 16:9 photo container with non-curved vertex and white shadow shine behind on hover */}
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-900 rounded-none z-10 transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                  <img
                    src={item.imageUrl}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover rounded-none transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
