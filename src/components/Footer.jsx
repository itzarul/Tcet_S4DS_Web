import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail } from 'lucide-react';

// ============================================================
// S4DS LOGO
// ============================================================

export function S4DSLogo({ className = "h-8" }) {
  return (
    <div className={`inline-flex items-center gap-1.5 select-none ${className}`}>
      <svg
        viewBox="0 0 320 90"
        className="h-full w-auto max-h-10 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="s4dsRibbonGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="40%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>

          <linearGradient
            id="s4dsInnerGrad"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="60%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>

        <path
          d="M 68 22 C 78 30, 84 45, 68 62 C 50 78, 22 76, 12 65 C 2 54, 8 40, 24 30 C 40 20, 60 16, 68 22 Z"
          fill="none"
          stroke="url(#s4dsRibbonGrad)"
          strokeWidth="7"
          strokeLinecap="round"
        />

        <path
          d="M 52 20 C 35 15, 20 25, 25 38 C 30 48, 55 45, 48 62 C 42 74, 25 72, 18 64"
          fill="none"
          stroke="url(#s4dsRibbonGrad)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M 36 28 L 36 58 C 36 58, 48 58, 52 50 C 56 42, 54 36, 48 30 C 44 28, 36 28, 36 28 Z"
          fill="url(#s4dsInnerGrad)"
        />

        <path
          d="M 40 34 L 40 52 C 40 52, 45 52, 47 47 C 49 42, 48 38, 45 35 C 43 34, 40 34, 40 34 Z"
          fill="#ffffff"
        />

        <text
          x="92"
          y="62"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="56"
          letterSpacing="-1px"
          fill="#2563eb"
        >
          S4DS
        </text>

        <rect
          x="8"
          y="78"
          width="240"
          height="3.5"
          rx="1.75"
          fill="#1d4ed8"
        />
      </svg>
    </div>
  );
}


// ============================================================
// DARK FUTURISTIC CYBERSPACE BACKGROUND
// ============================================================

function DimmedBluePixelBackground() {
  const blueShades = [
    '#00152f',
    '#002653',
    '#00366f',
    '#00427f',
    '#00315f',
    '#002449',
    '#004b82',
    '#001b3a'
  ];

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Dark base */}
      <div className="absolute inset-0 bg-[#01050d]" />

      {/* Blur layer */}
      <div className="absolute inset-0 backdrop-blur-2xl" />

      {/* Pixel Grid */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-[90%]
          grid
          grid-cols-12
          sm:grid-cols-24
          gap-[3px]
          p-2
          opacity-[0.16]
          blur-[2.5px]
        "
      >
        {Array.from({ length: 288 }).map((_, i) => {
          const row = Math.floor(i / 24);
          const col = i % 24;

          const normalizedRow = row / 12;

          const isVisible =
            ((i * 37 + col * 17) % 100) / 100 <
            Math.pow(normalizedRow, 1.8) + 0.08;

          if (!isVisible) {
            return (
              <div
                key={i}
                className="aspect-square"
              />
            );
          }

          return (
            <div
              key={i}
              className="aspect-square rounded-[1px]"
              style={{
                backgroundColor:
                  blueShades[
                    (i * 7 + col * 3) % blueShades.length
                  ],
                opacity: Math.min(
                  0.35,
                  Math.max(
                    0.04,
                    normalizedRow * 0.35
                  )
                )
              }}
            />
          );
        })}
      </div>

      {/* Center Glow */}
      <div
        className="
          absolute
          -bottom-28
          left-1/2
          -translate-x-1/2
          w-[70%]
          h-48
          bg-blue-700/[0.07]
          rounded-full
          blur-[100px]
        "
      />

      {/* Left Glow */}
      <div
        className="
          absolute
          bottom-0
          left-0
          w-[35%]
          h-32
          bg-cyan-900/[0.035]
          rounded-full
          blur-[90px]
        "
      />

      {/* Right Glow */}
      <div
        className="
          absolute
          bottom-0
          right-0
          w-[35%]
          h-32
          bg-blue-900/[0.035]
          rounded-full
          blur-[90px]
        "
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#01050d]/55" />
    </div>
  );
}


// ============================================================
// NEON COMET BORDER
// ============================================================

function NeonCometBorder({ active }) {
  return (
    <svg
      className={`
        absolute
        inset-0
        w-full
        h-full
        pointer-events-none
        z-30
        overflow-visible
        transition-opacity
        duration-500
        ${active ? 'opacity-100' : 'opacity-70'}
      `}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>

        <linearGradient
          id="cometTail"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop
            offset="0%"
            stopColor="#1d4ed8"
            stopOpacity="0"
          />

          <stop
            offset="35%"
            stopColor="#2563eb"
            stopOpacity="0.15"
          />

          <stop
            offset="65%"
            stopColor="#38bdf8"
            stopOpacity="0.55"
          />

          <stop
            offset="90%"
            stopColor="#38bdf8"
            stopOpacity="0.95"
          />

          <stop
            offset="100%"
            stopColor="#ffffff"
            stopOpacity="1"
          />
        </linearGradient>

        <filter
          id="cometGlow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur
            stdDeviation="2.5"
            result="blur"
          />

          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <path
          id="footerCometPath"
          d="
            M 24 1.2
            H calc(100% - 24px)
            Q calc(100% - 1.2px) 1.2 calc(100% - 1.2px) 24px
            V calc(100% - 24px)
            Q calc(100% - 1.2px) calc(100% - 1.2px) calc(100% - 24px) calc(100% - 1.2px)
            H 24
            Q 1.2 calc(100% - 1.2px) 1.2 calc(100% - 24px)
            V 24
            Q 1.2 1.2 24 1.2
            Z
          "
        />

      </defs>

      {/* Static Border */}
      <rect
        x="0.6"
        y="0.6"
        width="calc(100% - 1.2px)"
        height="calc(100% - 1.2px)"
        rx="24"
        fill="none"
        stroke="#38bdf8"
        strokeOpacity={active ? "0.18" : "0.08"}
        strokeWidth="1.2"
      />

      {/* Comet Tail */}
      <use
        href="#footerCometPath"
        fill="none"
        stroke="url(#cometTail)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="10 90"
        filter="url(#cometGlow)"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="-1000"
          dur="7s"
          repeatCount="indefinite"
        />
      </use>

      {/* Comet Head */}
      <use
        href="#footerCometPath"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="1 99"
        filter="url(#cometGlow)"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="-1000"
          dur="7s"
          repeatCount="indefinite"
        />
      </use>

    </svg>
  );
}


// ============================================================
// FOOTER
// ============================================================

export default function Footer() {

  const footerRef = useRef(null);

  const [cursor, setCursor] = useState({
    x: 50,
    y: 50
  });

  const [cursorInside, setCursorInside] = useState(false);


  // ==========================================================
  // SOCIAL LINKS
  // ==========================================================

  const instagramUrl =
    "https://www.instagram.com/tcet_s4ds?igsh=NmxwNnN5OGJwNGJz&igsi=NmxwNnN5OGJwNGJz";

  const linkedinUrl =
    "https://www.linkedin.com/company/s4dstcet/";

  const emailUrl =
    "mailto:s4ds@thakureducation.org";


  // ==========================================================
  // CURSOR TRACKING
  // ==========================================================

  useEffect(() => {

    const footer = footerRef.current;

    if (!footer) return;

    const handleMouseMove = (event) => {

      const rect = footer.getBoundingClientRect();

      const x =
        ((event.clientX - rect.left) / rect.width) * 100;

      const y =
        ((event.clientY - rect.top) / rect.height) * 100;

      setCursor({
        x,
        y
      });
    };

    const handleMouseEnter = () => {
      setCursorInside(true);
    };

    const handleMouseLeave = () => {
      setCursorInside(false);
    };

    footer.addEventListener(
      'mousemove',
      handleMouseMove
    );

    footer.addEventListener(
      'mouseenter',
      handleMouseEnter
    );

    footer.addEventListener(
      'mouseleave',
      handleMouseLeave
    );

    return () => {

      footer.removeEventListener(
        'mousemove',
        handleMouseMove
      );

      footer.removeEventListener(
        'mouseenter',
        handleMouseEnter
      );

      footer.removeEventListener(
        'mouseleave',
        handleMouseLeave
      );

    };

  }, []);


  // ==========================================================
  // LOGO → HOME
  // ==========================================================

  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  return (

    <footer
      ref={footerRef}
      id="s4ds-footer"
      className="
        relative
        w-full
        overflow-hidden
        border-t
        border-white/[0.06]
        bg-[#01050d]
      "
    >

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <DimmedBluePixelBackground />


      {/* =====================================================
          CURSOR RADIAL LIGHT
      ====================================================== */}

      <div
        className="
          absolute
          pointer-events-none
          z-20
          w-[280px]
          h-[280px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          blur-[80px]
          bg-sky-400/[0.055]
          transition-opacity
          duration-300
        "
        style={{
          left: `${cursor.x}%`,
          top: `${cursor.y}%`,
          opacity: cursorInside ? 1 : 0
        }}
      />


      {/* =====================================================
          NEON COMET BORDER
      ====================================================== */}

      <NeonCometBorder active={cursorInside} />


      {/* =====================================================
          TOP LASER RIM
      ====================================================== */}

      <div
        className="
          absolute
          top-0
          left-0
          right-0
          h-px
          z-40
          bg-sky-400/60
          shadow-[0_0_12px_#38bdf8]
          pointer-events-none
        "
      />


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-7xl
          mx-auto
          px-6
          sm:px-10
          lg:px-16
          py-6
          sm:py-7
        "
      >

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-4
            items-center
            gap-6
            md:gap-8
            text-white
          "
        >


          {/* =================================================
              LOGO
          ================================================= */}

          <div
            className="
              flex
              items-center
              justify-center
              md:justify-start
            "
          >

            <Link
              to="/"
              onClick={handleLogoClick}
              aria-label="S4DS Home"
              className="
                inline-flex
                hover:opacity-90
                transition-opacity
                duration-300
              "
            >
              <S4DSLogo className="h-8 sm:h-9" />
            </Link>

          </div>


          {/* =================================================
              NAVIGATION
          ================================================= */}

          <nav
            className="
              flex
              items-center
              justify-center
              gap-10
            "
            aria-label="Footer navigation"
          >

            {/* EVENTS */}

            <Link
              to="/events"
              className="
                text-sm
                sm:text-base
                font-medium
                tracking-wide
                text-slate-100
                hover:text-sky-400
                transition-colors
                duration-300
                cursor-pointer
              "
            >
              Events
            </Link>


            {/* TEAM */}

            <Link
              to="/team"
              className="
                text-sm
                sm:text-base
                font-medium
                tracking-wide
                text-slate-100
                hover:text-sky-400
                transition-colors
                duration-300
                cursor-pointer
              "
            >
              Team
            </Link>

          </nav>


          {/* =================================================
              CONNECT WITH US
          ================================================= */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-5
              md:translate-x-3
            "
          >

            <span
              className="
                text-sm
                sm:text-base
                font-medium
                tracking-wide
                text-slate-100
                whitespace-nowrap
              "
            >
              Connect with us
            </span>


            <div
              className="
                flex
                items-center
                gap-5
              "
            >

              {/* Instagram */}

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="
                  flex
                  items-center
                  justify-center
                  w-10
                  h-10
                  rounded-full
                  border
                  border-white/15
                  bg-white/[0.04]
                  text-white
                  hover:bg-blue-600
                  hover:border-blue-400
                  hover:shadow-lg
                  hover:shadow-blue-500/20
                  hover:scale-105
                  transition-all
                  duration-300
                "
              >
                <Instagram className="w-5 h-5" />
              </a>


              {/* LinkedIn */}

              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
                  flex
                  items-center
                  justify-center
                  w-10
                  h-10
                  rounded-full
                  border
                  border-white/15
                  bg-white/[0.04]
                  text-white
                  hover:bg-blue-600
                  hover:border-blue-400
                  hover:shadow-lg
                  hover:shadow-blue-500/20
                  hover:scale-105
                  transition-all
                  duration-300
                "
              >
                <Linkedin className="w-5 h-5" />
              </a>


              {/* Email */}

              <a
                href={emailUrl}
                aria-label="Email S4DS"
                className="
                  flex
                  items-center
                  justify-center
                  w-10
                  h-10
                  rounded-full
                  border
                  border-white/15
                  bg-white/[0.04]
                  text-white
                  hover:bg-blue-600
                  hover:border-blue-400
                  hover:shadow-lg
                  hover:shadow-blue-500/20
                  hover:scale-105
                  transition-all
                  duration-300
                "
              >
                <Mail className="w-5 h-5" />
              </a>

            </div>

          </div>


          {/* =================================================
              FOURTH GRID COLUMN
          ================================================= */}

          <div className="hidden md:block" />

        </div>

      </div>

    </footer>
  );
}