import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ALUMNI_EVENTS } from './data/alumniEvents';
import { Header } from './components/Header';
import { EventAboutLeft } from './components/EventAboutLeft';
import { Card3DContainer } from './components/Card3DContainer';
import { JoinUsModal } from './components/JoinUsModal';
import { GoBackToast } from './components/GoBackToast';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isJoinUsOpen, setIsJoinUsOpen] = useState(false);
  const [isGoBackToastVisible, setIsGoBackToastVisible] = useState(false);
  const lastScrollTime = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const totalEvents = ALUMNI_EVENTS.length;

  const currentEvent = ALUMNI_EVENTS[currentIndex];

  // Navigate to Next Event with smooth 3D rotation
  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalEvents);
  }, [totalEvents]);

  // Navigate to Prev Event with smooth 3D rotation
  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalEvents) % totalEvents);
  }, [totalEvents]);

  // Direct selection of an event index
  const handleSelectIndex = useCallback((index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Scroll-driven interaction: Window DOES NOT scroll, just the card rotates with scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isJoinUsOpen) return;

      // Lock window scrolling so window remains steady
      e.preventDefault();

      const now = Date.now();
      // Debounce window wheel events for deliberate, tactile rotations
      if (now - lastScrollTime.current < 380) return;

      const delta = e.deltaY;
      if (Math.abs(delta) > 12) {
        lastScrollTime.current = now;
        if (delta > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [handleNext, handlePrev, isJoinUsOpen]);

  // Touch gesture support for mobile / tablets
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isJoinUsOpen) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    const now = Date.now();
    if (now - lastScrollTime.current < 380) return;

    if (Math.abs(diff) > 30) {
      lastScrollTime.current = now;
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const handleGoBack = () => {
    setIsGoBackToastVisible(true);
    setTimeout(() => {
      setIsGoBackToastVisible(false);
    }, 3500);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="h-screen max-h-screen w-full bg-[#F2F2F0] text-black flex flex-col justify-between selection:bg-black selection:text-white bg-grid-pattern relative overflow-hidden"
    >
      {/* Hairline subtle outer architectural frame */}
      <div className="pointer-events-none fixed inset-0 z-10 border border-black/15 m-2 sm:m-3" />

      {/* Header: Levitating S4DS Logo + Title + Go Back */}
      <Header onGoBack={handleGoBack} />

      {/* Main Layout Area */}
      <main className="relative z-20 flex-1 w-full max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 px-4 sm:px-8 py-2 overflow-hidden items-center">
        
        {/* Left: About the Event */}
        <div className="lg:col-span-6 xl:col-span-5 h-full flex flex-col justify-center overflow-y-auto no-scrollbar py-2">
          <EventAboutLeft event={currentEvent} />
        </div>

        {/* Right: The 3D Card that rotates and levitates */}
        <div className="lg:col-span-6 xl:col-span-7 h-full flex items-center justify-center relative py-2">
          <Card3DContainer
            event={currentEvent}
            currentIndex={currentIndex}
            totalEvents={totalEvents}
            onNext={handleNext}
            onPrev={handlePrev}
            onSelectIndex={handleSelectIndex}
            direction={direction}
          />
        </div>
      </main>

      {/* Inspiring Footer Statement */}
      <footer className="relative z-20 px-4 sm:px-8 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-black/15 bg-[#F2F2F0]/90 backdrop-blur-sm select-none font-mono-tech text-xs">
        
        {/* Persuasive Message */}
        <div className="flex items-center gap-2.5 text-black">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
          </span>
          <span className="font-extrabold uppercase tracking-wider">
            BE PART OF SOMETHING EXTRAORDINARY
          </span>
          <span className="text-black/30 hidden md:inline">•</span>
          <span className="hidden md:inline font-bold text-black/70 uppercase">
            Join S4DS TCET and turn big ideas into unforgettable experiences
          </span>
        </div>

        {/* Highlight Tag */}
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-black/60 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-black" />
          <span>WHERE INNOVATION MEETS COMMUNITY</span>
        </div>
      </footer>

      {/* Interactive Join Us Modal */}
      <JoinUsModal
        isOpen={isJoinUsOpen}
        onClose={() => setIsJoinUsOpen(false)}
      />

      {/* Go Back Toast Feedback */}
      <GoBackToast
        isVisible={isGoBackToastVisible}
        onDismiss={() => setIsGoBackToastVisible(false)}
      />
    </div>
  );
}