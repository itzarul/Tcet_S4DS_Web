import React from "react";
import { motion } from "framer-motion";
import { SystemStatusBar } from "./TeamTerminal";

export default function TeamHero() {
  return (
    <section className="relative w-full min-h-[70vh] flex flex-col justify-center items-center py-20 bg-[#060B18] overflow-hidden">
      {/* Subtle Grid overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(30, 58, 110, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30, 58, 110, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060B18]/50 to-[#060B18] pointer-events-none" />

      {/* Absolute positioning for status bars to match the image layout */}
      <div className="absolute top-6 left-6 font-terminal text-[10px] sm:text-xs text-[#8CA0C4] uppercase tracking-wider space-y-1">
        <div>
          <span className="text-[#2E8FFF]">&gt; </span>
          <span className="text-[#4FA8F5]">SYS.LOC:</span> S4DS.TCET
        </div>
        <div>
          <span className="text-[#2E8FFF]">&gt; </span>
          <span className="text-[#4FA8F5]">STATUS:</span>{" "}
          <span className="text-[#4ade80]">OPTIMAL</span>
        </div>
        <div>
          <span className="text-[#2E8FFF]">&gt; </span>
          <span className="text-[#4FA8F5]">NODES:</span> ACTIVE
        </div>
      </div>

      <div className="absolute bottom-6 right-6 font-terminal text-[10px] sm:text-xs text-right uppercase tracking-wider space-y-1">
        <div className="text-[#1E3A6E]">[DAT::STREAM::0x8F]</div>
        <div className="text-[#8CA0C4]">ENCRYPTED CONNECTION</div>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto mt-8">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-[#F5F7FF] tracking-tight uppercase mb-2 drop-shadow-[0_0_30px_rgba(46,143,255,0.3)]"
        >
          Organising Committee
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-[#2E8FFF] tracking-tight uppercase mb-10 drop-shadow-[0_0_30px_rgba(46,143,255,0.5)]"
        >
          2025-26
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-terminal text-xs sm:text-sm text-[#8CA0C4] tracking-widest uppercase space-y-2 max-w-2xl mx-auto"
        >
          <p>
            The operational nodes powering the future of data science innovation.
          </p>
          <p>Secure connection established. Protocol active.</p>
        </motion.div>
      </div>
    </section>
  );
}
