import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Team', path: '/team' },
    { name: 'Events', path: '/events' },
    { name: 'Publications', path: '/publications' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
      <>
        {/* --- CYBER GLASS CENTER-OUT ANIMATION --- */}
        <motion.header
            initial={{ clipPath: "inset(0 50% 0 50%)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0% 0 0%)", opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1.8 }}
            className={`fixed top-0 left-0 w-full z-50 font-plex border-b transition-all duration-500 ${
                isScrolled
                    // Scrolled: Frosted deep blue glass with a glowing cyan edge
                    ? 'bg-[#05103a]/40 backdrop-blur-xl border-[#6dccec]/30 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
                    // Default: Subtle dark glass so the expansion animation reveals a physical panel
                    : 'bg-[#010101]/20 backdrop-blur-md border-[#065cc8]/20'
            }`}
        >
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

            {/* --- BRAND LOGO --- */}
            <Link to="/" className="flex items-center gap-4 group outline-none" onClick={() => setMobileMenuOpen(false)}>
              {/* Glass Cyber Icon */}
              <div className="relative flex items-center justify-center w-10 h-10 border border-[#6dccec]/30 bg-[#065cc8]/10 backdrop-blur-md group-hover:bg-[#6dccec]/20 group-hover:border-[#c0efff]/60 transition-colors duration-300">
                <Terminal className="w-4 h-4 text-[#6dccec] group-hover:text-[#c0efff]" />
                {/* Micro Targeting Corners */}
                <span className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t border-l border-[#c0efff] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b border-r border-[#c0efff] opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </div>

              {/* Typography */}
              <div className="flex flex-col">
                <span className="font-chakra text-xl font-bold text-white tracking-[0.1em] group-hover:text-[#c0efff] transition-colors">
                    S4DS
                </span>
                <span className="text-[8px] tracking-[0.2em] text-[#6dccec]/70 uppercase hidden sm:block">
                    SYSTEM_ONLINE
                </span>
              </div>
            </Link>

            {/* --- DESKTOP LINKS --- */}
            <nav className="hidden md:flex items-center gap-8 h-full">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                    <Link
                        key={link.name}
                        to={link.path}
                        className={`relative h-full flex items-center text-xs uppercase tracking-[0.15em] transition-colors duration-300 group ${
                            isActive
                                ? 'text-[#c0efff] font-medium'
                                : 'text-[#6dccec]/70 hover:text-[#c0efff]'
                        }`}
                    >
                  <span className="flex items-center gap-2">
                    {/* Active State Terminal Arrow */}
                    <span className={`text-[#6dccec] font-bold transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}>
                        {'>'}
                    </span>
                    {link.name}
                  </span>

                      {/* Sharp Bottom Neon Underline */}
                      {isActive && (
                          <motion.div
                              layoutId="activeBottomLine"
                              className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c0efff] shadow-[0_0_12px_#c0efff]"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                      )}
                    </Link>
                );
              })}
            </nav>

            {/* --- RIGHT SIDE SPACER / MOBILE TOGGLE --- */}
            {/* Invisible spacer keeps the center links perfectly balanced with the logo */}
            <div className="hidden md:block w-32"></div>

            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#c0efff] border border-[#6dccec]/30 bg-[#065cc8]/10 backdrop-blur-md hover:bg-[#6dccec]/20 transition-colors"
                aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.header>

        {/* --- CINEMATIC GLASS MOBILE DRAWER --- */}
        <AnimatePresence>
          {mobileMenuOpen && (
              <motion.div
                  initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
                  exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 z-40 md:hidden bg-[#05103a]/60 flex flex-col pt-24 pb-8 px-6 font-plex"
              >
                {/* Tactical Grid Background overlaying the glass */}
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#c0efff 1px, transparent 1px)', backgroundSize: '16px 16px' }}
                />

                <div className="relative z-10 flex flex-col space-y-1">
                  <div className="text-[10px] tracking-[0.3em] text-[#6dccec] uppercase mb-6 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#6dccec] animate-pulse" />
                    SECURE_NET // ACTIVE
                  </div>

                  {navLinks.map((link, idx) => {
                    const isActive = location.pathname === link.path;
                    return (
                        <motion.div
                            key={link.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                          <Link
                              to={link.path}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`flex items-center gap-4 py-4 border-b transition-all ${
                                  isActive
                                      ? 'border-[#c0efff] text-[#c0efff]'
                                      : 'border-[#6dccec]/20 text-[#6dccec]/70 hover:text-[#c0efff]'
                              }`}
                          >
                            <span className="text-[9px] opacity-40">0{idx + 1}</span>
                            <span className={`text-[#6dccec] font-bold ${isActive ? 'opacity-100' : 'opacity-0'}`}>{'>'}</span>
                            <span className="text-sm uppercase tracking-[0.2em]">{link.name}</span>
                          </Link>
                        </motion.div>
                    );
                  })}
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </>
  );
}