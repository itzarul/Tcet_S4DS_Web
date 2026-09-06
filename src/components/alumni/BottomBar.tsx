import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface BottomBarProps {
  onOpenJoinUs: () => void;
}

export const BottomBar: React.FC<BottomBarProps> = ({ onOpenJoinUs }) => {
  return (
    <footer className="relative z-30 px-4 sm:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t-2 border-black bg-white select-none">
      {/* Left text: S4DS Value Proposition */}
      <div className="flex items-center gap-2.5 font-mono-tech text-xs sm:text-sm text-black">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
        </span>
        <span className="font-extrabold uppercase tracking-wider text-black">
          JOIN S4DS TCET
        </span>
        <span className="text-black/30 font-bold">•</span>
        <span className="font-bold text-black/80 tracking-tight">
          Unlock Alumni Mentorship, Networking & Real-World Projects
        </span>
      </div>

      {/* Right side: Action trigger encouraging membership */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-1.5 font-mono-tech text-[11px] font-bold text-black/60 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-black" />
          <span>BE PART OF THE NEXT CHAPTER</span>
        </div>

        <button
          type="button"
          onClick={onOpenJoinUs}
          id="btn-message-us-action"
          className="group relative flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg font-mono-tech text-xs font-bold uppercase cursor-pointer transition-all duration-300 hover:bg-neutral-800 hover:scale-[1.02] active:scale-95 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          aria-label="Become a Member"
        >
          <span>BECOME A MEMBER</span>
          <ArrowUpRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
};