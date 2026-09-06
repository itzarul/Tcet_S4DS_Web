import React from 'react';
import { Check, Undo2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GoBackToastProps {
  isVisible: boolean;
  onDismiss: () => void;
}

export const GoBackToast: React.FC<GoBackToastProps> = ({ isVisible, onDismiss }) => {
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-20 left-6 z-50 p-3.5 bg-black text-white border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] font-mono-tech text-xs flex items-center gap-3"
      >
        <div className="w-5 h-5 bg-white text-black flex items-center justify-center">
          <Check className="w-3 h-3 text-black stroke-[3]" />
        </div>
        <div>
          <span className="block font-bold">DIRECTORY NAVIGATED</span>
          <span className="text-[10px] text-white/80 font-mono-tech">Returning to S4DS Global Portal directory root...</span>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="ml-2 px-2 py-1 bg-white text-black font-bold border border-black hover:bg-neutral-200 transition-colors text-[10px] cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
        >
          <Undo2 className="w-3 h-3" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
