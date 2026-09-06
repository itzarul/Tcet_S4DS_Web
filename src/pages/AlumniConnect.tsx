import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

import { ALUMNI_EVENTS } from '../components/alumni/alumniEvents';
import { Header } from '../components/alumni/Header';
import { EventAboutLeft } from '../components/alumni/EventAboutLeft';
import { Card3DContainer } from '../components/alumni/Card3DContainer';
import { JoinUsModal } from '../components/alumni/JoinUsModal';
import { GoBackToast } from '../components/alumni/GoBackToast';

import '../components/alumni/alumni.css';

export default function AlumniConnect() {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isJoinUsOpen, setIsJoinUsOpen] = useState(false);
  const [isGoBackToastVisible, setIsGoBackToastVisible] = useState(false);

  const lastScrollTime = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  const totalEvents = ALUMNI_EVENTS.length;
  const currentEvent = ALUMNI_EVENTS[currentIndex];

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalEvents);
  }, [totalEvents]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalEvents) % totalEvents);
  }, [totalEvents]);

  const handleSelectIndex = useCallback(
    (index: number) => {
      if (index === currentIndex) return;

      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isJoinUsOpen) return;

      e.preventDefault();

      const now = Date.now();

      if (now - lastScrollTime.current < 380) return;

      if (Math.abs(e.deltaY) > 12) {
        lastScrollTime.current = now;

        if (e.deltaY > 0) {
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
      navigate('/gallery');
    }, 700);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="alumni-page h-screen max-h-screen w-full flex flex-col justify-between selection:bg-black selection:text-white bg-grid-pattern relative overflow-hidden"
    >
      <div className="pointer-events-none fixed inset-0 z-10 border border-black/15 m-2 sm:m-3" />

      <Header onGoBack={handleGoBack} />

      <main className="relative z-20 flex-1 w-full max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 px-4 sm:px-8 py-2 overflow-hidden items-center">
        <div className="lg:col-span-6 xl:col-span-5 h-full flex flex-col justify-center overflow-y-auto no-scrollbar py-2">
          <EventAboutLeft event={currentEvent} />
        </div>

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

      <footer className="relative z-20 px-4 sm:px-8 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-black/15 bg-[#F2F2F0]/90 backdrop-blur-sm select-none font-mono-tech text-xs">
        <div className="flex items-center gap-2.5 text-black">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
          </span>

          <span className="font-extrabold uppercase tracking-wider">
            BE PART OF SOMETHING EXTRAORDINARY
          </span>

          <span className="text-black/30 hidden md:inline">•</span>

          <span className="hidden md:inline font-bold text-black/70 uppercase">
            Join S4DS TCET and turn big ideas into unforgettable experiences
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-bold text-black/60 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-black" />
          <span>WHERE INNOVATION MEETS COMMUNITY</span>
        </div>
      </footer>

      <JoinUsModal
        isOpen={isJoinUsOpen}
        onClose={() => setIsJoinUsOpen(false)}
      />

      <GoBackToast
        isVisible={isGoBackToastVisible}
        onDismiss={() => setIsGoBackToastVisible(false)}
      />
    </div>
  );
}