import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { S4DSLogo } from './S4DSLogo';

interface HeaderProps {
  onGoBack: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onGoBack }) => {
  return (
    <header className="relative z-30 px-4 sm:px-8 pt-3 sm:pt-4 pb-1 sm:pb-2 flex items-center justify-between select-none">
      {/* Left side: Go Back + Levitating S4DS Logo + Title */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Clean Go Back Button */}
        <button
          type="button"
          onClick={onGoBack}
          className="group flex items-center gap-2 px-3 py-1.5 border-2 border-black bg-white hover:bg-black hover:text-white transition-all duration-150 text-xs font-mono-tech uppercase tracking-wider font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Go Back</span>
        </button>

        {/* Levitating S4DS Logo attached */}
        <div className="flex items-center gap-3">
          <S4DSLogo size={46} />
          
          {/* Main Title: S4DS ALUMNI CONNECT */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-black leading-none font-display">
            S4DS ALUMNI CONNECT
          </h1>
        </div>
      </div>
    </header>
  );
};

