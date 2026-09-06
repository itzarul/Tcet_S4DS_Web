import React from 'react';

interface S4DSLogoProps {
  className?: string;
  size?: number;
}

export const S4DSLogo: React.FC<S4DSLogoProps> = ({ className = '', size = 52 }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center animate-levitate select-none ${className}`}
      style={{ width: size, height: size }}
      title="S4DS Global Network"
    >
      <img
        src="/S4DS new logo.png"
        alt="S4DS Logo"
        className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(0,81,255,0.35)]"
      />
    </div>
  );
};