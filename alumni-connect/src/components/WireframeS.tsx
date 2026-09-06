import React from 'react';

interface WireframeSProps {
  className?: string;
  size?: number;
}

export const WireframeS: React.FC<WireframeSProps> = ({ className = '', size = 110 }) => {
  return (
    <div
      className={`inline-flex items-center justify-center select-none animate-levitate pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[4px_6px_0px_rgba(0,0,0,0.12)]"
      >
        {/* Isometric 3D Wireframe Ribbons "S" Contour */}
        {/* Top Loop Facet 1 */}
        <path
          d="M 52 14 L 76 28 L 54 41 L 30 27 Z"
          stroke="#000000"
          strokeWidth="2.2"
          strokeLinejoin="round"
          fill="#FFFFFF"
        />
        {/* Top Loop Facet 2 */}
        <path
          d="M 30 27 L 54 41 L 54 55 L 30 41 Z"
          stroke="#000000"
          strokeWidth="2.2"
          strokeLinejoin="round"
          fill="#F2F2F0"
        />
        {/* Mid Crossing Facet */}
        <path
          d="M 54 41 L 76 28 L 76 42 L 54 55 Z"
          stroke="#000000"
          strokeWidth="2.2"
          strokeLinejoin="round"
          fill="#E5E5E3"
        />
        {/* Bottom Loop Facet 1 */}
        <path
          d="M 54 55 L 78 69 L 56 82 L 32 68 Z"
          stroke="#000000"
          strokeWidth="2.2"
          strokeLinejoin="round"
          fill="#FFFFFF"
        />
        {/* Bottom Loop Facet 2 */}
        <path
          d="M 32 68 L 56 82 L 56 94 L 32 80 Z"
          stroke="#000000"
          strokeWidth="2.2"
          strokeLinejoin="round"
          fill="#F2F2F0"
        />
        {/* Bottom Loop Facet 3 */}
        <path
          d="M 56 82 L 78 69 L 78 81 L 56 94 Z"
          stroke="#000000"
          strokeWidth="2.2"
          strokeLinejoin="round"
          fill="#E5E5E3"
        />
        {/* Inner Connecting Edge */}
        <path
          d="M 44 48 L 64 60"
          stroke="#000000"
          strokeWidth="1.8"
          strokeDasharray="2 2"
        />
      </svg>
    </div>
  );
};
