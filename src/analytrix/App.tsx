import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ChapterSection from './components/ChapterSection';
import LightboxModal from './components/LightboxModal';
import AsciiEarth from './components/AsciiEarth';
import { CHAPTER_01_DATA, CHAPTER_02_DATA } from './data/eventData';
import { GalleryItem } from './types';

export default function App() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeGalleryList, setActiveGalleryList] = useState<GalleryItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Handle intersection observer to highlight current timeline point in Navbar
  useEffect(() => {
    const sections = ['hero', 'chapter-01', 'gallery-01', 'chapter-02', 'gallery-02'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLightbox = (item: GalleryItem, list: GalleryItem[]) => {
    setSelectedItem(item);
    setActiveGalleryList(list);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4F4F5] selection:bg-white selection:text-black">
      {/* PERSISTENT MINIMAL TOP NAVIGATION BAR */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleScrollToSection}
      />

      <main className="relative">
        {/* HERO SECTION: Concave 3D curved photo grid with dynamic title separation on scroll */}
        <HeroSection
          onCardClick={(card) => handleOpenLightbox(card, [card])}
          onExploreChapters={() => handleScrollToSection('chapter-01')}
        />

        {/* CHAPTER 01: DATATHON + DATATHON GALLERY */}
        <ChapterSection
          data={CHAPTER_01_DATA}
          gallerySectionId="gallery-01"
          onCardClick={(card) => handleOpenLightbox(card, CHAPTER_01_DATA.gallery)}
        />

        {/* CHAPTER 02: DATASCIENCE CONCLAVE + CONCLAVE GALLERY */}
        <ChapterSection
          data={CHAPTER_02_DATA}
          gallerySectionId="gallery-02"
          onCardClick={(card) => handleOpenLightbox(card, CHAPTER_02_DATA.gallery)}
        />

        {/* =========================================================================
            FOOTER: 
            - Moving ASCII Earth in background
            - "Analytrix archive" with white shadow glow effect
            - "Go back" option with clean generic navigation (without specifying where it diverges to)
            ========================================================================= */}
        <section
          id="archive-signoff"
          className="relative py-28 sm:py-36 border-t border-zinc-900 bg-[#050505] flex flex-col items-center justify-center text-center px-4 overflow-hidden select-none"
        >
          {/* Background Interactive ASCII / Canvas Earth Model */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-auto opacity-30 sm:opacity-35 hover:opacity-55 transition-opacity duration-700 z-0">
            <AsciiEarth />
          </div>

          {/* Foreground text content */}
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-9">
            <h2 className="archive-title-glow text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-display text-white tracking-tight leading-tight">
              Analytrix archive
            </h2>

            {/* Go Back Option (clean, does not specify where it diverges to) */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => {
                  if (window.history.length > 1) {
                    window.history.back();
                  } else {
                    window.location.href = '/';
                  }
                }}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 border border-zinc-800 hover:border-zinc-500 bg-zinc-950/80 hover:bg-zinc-900 transition-all duration-300 rounded-none text-zinc-300 hover:text-white backdrop-blur-md cursor-pointer"
              >
                <span className="text-xs sm:text-sm font-mono-code tracking-[0.25em] uppercase transition-colors">
                  ← Go Back
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* LIGHTBOX MODAL */}
      <LightboxModal
        item={selectedItem}
        itemsList={activeGalleryList}
        onClose={() => setSelectedItem(null)}
        onSelect={(item) => setSelectedItem(item)}
      />
    </div>
  );
}
