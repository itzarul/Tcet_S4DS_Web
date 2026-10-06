import React, { useEffect } from 'react';
import { GalleryItem } from '../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxModalProps {
  item: GalleryItem | null;
  itemsList: GalleryItem[];
  onClose: () => void;
  onSelect: (item: GalleryItem) => void;
}

export default function LightboxModal({ item, itemsList, onClose, onSelect }: LightboxModalProps) {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [item, itemsList]);

  if (!item) return null;

  const currentIndex = itemsList.findIndex((i) => i.id === item.id);
  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelect(itemsList[currentIndex - 1]);
    } else {
      onSelect(itemsList[itemsList.length - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < itemsList.length - 1) {
      onSelect(itemsList[currentIndex + 1]);
    } else {
      onSelect(itemsList[0]);
    }
  };

  return (
    <div
      id="lightbox-modal-backdrop"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-lg p-3 sm:p-6 md:p-8"
      onClick={onClose}
    >
      {/* Lightbox Container: ONLY the photo is showcased, no sidebar or text written on photo */}
      <div
        id="lightbox-modal-container"
        className="relative max-w-6xl w-full h-auto max-h-[92vh] bg-transparent border-0 rounded-none overflow-hidden flex items-center justify-center select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="lightbox-close-button"
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-10 h-10 rounded-none bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Navigation Arrow Left */}
        {itemsList.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-none bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Navigation Arrow Right */}
        {itemsList.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-none bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Main Image Only (Sharp 90-degree corners, no text) */}
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src={item.imageUrl}
            alt=""
            className="max-w-full max-h-[90vh] object-contain rounded-none shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}
