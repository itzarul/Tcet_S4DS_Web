import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Terminal, Users } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-[90vh] flex flex-col justify-center font-inter font-light">

            {/* Subtle Tech Grid Overlay using Secondary Color */}
            <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                    backgroundImage: 'linear-gradient(rgba(109, 204, 236, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(109, 204, 236, 0.15) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* --- TACTICAL HUD OVERLAY --- */}
            {/* Fades in smoothly after the background bloom to frame the screen */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="absolute inset-0 pointer-events-none z-0 overflow-hidden font-plex"
            >
                {/* 1. Schematic Axis Lines */}
                <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#6dccec]/20 to-transparent"></div>
                <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#6dccec]/20 to-transparent"></div>
                <div className="absolute top-[15%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#6dccec]/10 to-transparent"></div>

                {/* 2. Micro Crosshairs at Intersections */}
                <div className="absolute top-[15%] left-[8%] -translate-x-1/2 -translate-y-1/2 text-[#c0efff]/40 text-[10px] leading-none">+</div>
                <div className="absolute top-[15%] right-[8%] -translate-x-1/2 -translate-y-1/2 text-[#c0efff]/40 text-[10px] leading-none">+</div>

                {/* 3. Corner Framing Brackets */}
                <div className="absolute top-6 left-6 md:w-12 md:h-12 w-6 h-6 border-t border-l border-[#6dccec]/30"></div>
                <div className="absolute top-6 right-6 md:w-12 md:h-12 w-6 h-6 border-t border-r border-[#6dccec]/30"></div>
                <div className="absolute bottom-6 left-6 md:w-12 md:h-12 w-6 h-6 border-b border-l border-[#6dccec]/30"></div>
                <div className="absolute bottom-6 right-6 md:w-12 md:h-12 w-6 h-6 border-b border-r border-[#6dccec]/30"></div>

                {/* 4. Floating Data Readouts (Hidden on mobile to keep it clean) */}
                <div className="absolute bottom-10 left-[9%] text-[#c0efff]/30 text-[9px] uppercase tracking-[0.3em] hidden md:flex flex-col gap-1">
                    <span>V 2.0.4 // SYSTEM_ACTIVE</span>
                    <span className="text-[#065cc8]">NET: SECURE</span>
                </div>

                <div className="absolute top-[16%] right-[9%] text-[#c0efff]/30 text-[9px] uppercase tracking-[0.3em] text-right hidden md:flex flex-col gap-1">
                    <span>AXIS_Y: 45.92</span>
                    <span>AXIS_X: 12.04</span>
                </div>

                {/* 5. Decorative Data Bar */}
                <div className="absolute bottom-[20%] right-[8%] hidden md:flex gap-1 translate-x-1/2 rotate-90">
                    <div className="w-1 h-4 bg-[#6dccec]/40"></div>
                    <div className="w-1 h-6 bg-[#6dccec]/20"></div>
                    <div className="w-1 h-3 bg-[#c0efff]/60 animate-pulse"></div>
                    <div className="w-1 h-5 bg-[#6dccec]/40"></div>
                    <div className="w-1 h-2 bg-[#6dccec]/20"></div>
                </div>
            </motion.div>


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

                {/* Cyber System Readout */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="font-plex font-normal text-xs md:text-sm text-[#6dccec]/80 mb-8 flex items-center justify-center gap-4 uppercase tracking-[0.1em]"
                >
                    <span className="flex items-center gap-2 text-[#c0efff]">
                        <div className="w-2 h-2 bg-[#c0efff] animate-pulse" />
                        SYS.ONLINE
                    </span>

                    <span className="text-[#065cc8] font-bold">//</span>

                    <span>LOC: TCET_MUMBAI</span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="font-chakra font-semibold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white max-w-5xl mx-auto leading-[1.1]"
                >
                    <span className="block mb-2">S4DS — Society For</span>

                    {/* Gradient from Secondary to Primary */}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6dccec] to-[#065cc8]">
                        Data Science
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.05 }}
                    className="mt-8 text-lg sm:text-xl text-[#c0efff]/60 max-w-2xl mx-auto leading-relaxed"
                >
                    Empowering Future Data Scientists, AI Engineers and Innovators through practical workshops, flagship hackathons, and cutting-edge research.
                </motion.p>

                {/* Cyber Digital Brutalist Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-8 font-plex font-normal"
                >

                    {/* Primary Button: Join Us */}
                    <NavLink to="/join" className="relative group w-full sm:w-auto">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative z-10 flex items-center justify-between gap-4 px-8 py-4 bg-[#6dccec] text-[#010101] font-bold uppercase text-sm tracking-[0.1em] border border-[#c0efff] shadow-[0_0_20px_rgba(109,204,236,0.3)] transition-all duration-300 group-hover:bg-[#c0efff] group-hover:shadow-[0_0_30px_rgba(192,239,255,0.6)]"
                        >
                            <span className="text-[#010101]/40 group-hover:text-[#010101]/70 transition-colors">
                                [
                            </span>

                            <span className="flex items-center gap-3">
                                <Terminal className="w-4 h-4" />
                                JOIN_US
                                <span className="animate-pulse font-black">_</span>
                            </span>

                            <span className="text-[#010101]/40 group-hover:text-[#010101]/70 transition-colors">
                                ]
                            </span>
                        </motion.div>

                        {/* Animated HUD Targeting Corners */}
                        <div className="absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 border-[#c0efff] opacity-60 group-hover:opacity-100 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300 z-20" />

                        <div className="absolute -top-2 -right-2 w-3 h-3 border-t-2 border-r-2 border-[#c0efff] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 z-20" />

                        <div className="absolute -bottom-2 -left-2 w-3 h-3 border-b-2 border-l-2 border-[#c0efff] opacity-60 group-hover:opacity-100 group-hover:-translate-x-1 group-hover:translate-y-1 transition-all duration-300 z-20" />

                        <div className="absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 border-[#c0efff] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-300 z-20" />
                    </NavLink>

                    {/* Secondary Button: Our Team */}
                    <NavLink to="/team" className="relative group w-full sm:w-auto">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative z-10 flex items-center justify-between gap-4 px-8 py-4 border border-[#065cc8]/60 bg-[#05103a]/50 text-[#6dccec] uppercase text-sm tracking-[0.1em] backdrop-blur-sm transition-colors group-hover:bg-[#05103a]/80 group-hover:border-[#6dccec] group-hover:text-[#c0efff]"
                        >
                            <span className="text-[#065cc8] group-hover:text-[#6dccec] transition-colors">
                                {'<'}
                            </span>

                            <span className="flex items-center gap-3">
                                <Users className="w-4 h-4 text-[#065cc8] group-hover:text-[#6dccec] transition-colors" />
                                OUR_TEAM
                            </span>

                            <span className="text-[#065cc8] group-hover:text-[#6dccec] transition-colors">
                                {'>'}
                            </span>
                        </motion.div>

                        {/* Animated HUD Targeting Corners */}
                        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#065cc8] opacity-0 group-hover:border-[#6dccec] group-hover:opacity-100 group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-300 z-20" />

                        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#065cc8] opacity-0 group-hover:border-[#6dccec] group-hover:opacity-100 group-hover:-translate-x-1 group-hover:translate-y-1 transition-all duration-300 z-20" />

                        <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#065cc8] opacity-0 group-hover:border-[#6dccec] group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 z-20" />

                        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#065cc8] opacity-0 group-hover:border-[#6dccec] group-hover:opacity-100 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300 z-20" />
                    </NavLink>

                </motion.div>

            </div>
        </section>
    );
}