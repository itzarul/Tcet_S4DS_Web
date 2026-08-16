import React, { useState } from "react";
import { hodData, facultyInchargeData, coreTeam } from "../data/team";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TeamHero from "../components/team/TeamHero";
import TeamMemberEditorial from "../components/team/TeamMemberEditorial";

import "./Team.css";

const CURRENT_PERIOD = "2025–26";
const FOUNDATION_PERIOD = "2024–25";

const foundationTeam = [hodData, facultyInchargeData];

export default function Team() {
  const [currentFacultyIndex, setCurrentFacultyIndex] = useState(0);

  const nextFaculty = () => {
    setCurrentFacultyIndex((prev) =>
      prev === foundationTeam.length - 1 ? 0 : prev + 1
    );
  };

  const prevFaculty = () => {
    setCurrentFacultyIndex((prev) =>
      prev === 0 ? foundationTeam.length - 1 : prev - 1
    );
  };

  return (
    <div className="team-page">
      <div className="team-page-inner">
        <TeamHero />

        {/* =========================================
            FACULTY / HOD
            SLIDER FORMAT
            ========================================= */}

        <section
          className="team-roster team-roster--foundation relative"
          aria-labelledby="team-foundation-heading"
        >
          <div className="relative w-full max-w-5xl mx-auto px-12 sm:px-16">
            <div className="overflow-hidden min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFacultyIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <TeamMemberEditorial
                    member={foundationTeam[currentFacultyIndex]}
                    index={currentFacultyIndex}
                    period={FOUNDATION_PERIOD}
                    showBio={false}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Controls */}
            <button
              onClick={prevFaculty}
              className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#0D1730] border border-[#2E8FFF]/30 text-[#4FA8F5] hover:bg-[#1E3A6E] hover:border-[#2E8FFF] transition-all z-10 shadow-[0_0_10px_rgba(46,143,255,0.2)]"
              aria-label="Previous faculty"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={nextFaculty}
              className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#0D1730] border border-[#2E8FFF]/30 text-[#4FA8F5] hover:bg-[#1E3A6E] hover:border-[#2E8FFF] transition-all z-10 shadow-[0_0_10px_rgba(46,143,255,0.2)]"
              aria-label="Next faculty"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {foundationTeam.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentFacultyIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === currentFacultyIndex
                      ? "bg-[#2E8FFF] w-6 shadow-[0_0_8px_rgba(46,143,255,0.6)]"
                      : "bg-[#8CA0C4]/30 hover:bg-[#8CA0C4]/60"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* =========================================
            CURRENT 2025–26 TEAM
            EDITORIAL DESIGN
            ========================================= */}

        <section
          className="team-roster team-roster--current"
          aria-labelledby="team-current-heading"
        >
          <div className="flex flex-col items-center justify-center text-center pt-24 pb-12 px-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2E8FFF]/10 border border-[#2E8FFF]/30 text-[#2E8FFF] font-mono text-xs tracking-[0.2em] uppercase mb-6 shadow-[0_0_10px_rgba(46,143,255,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E8FFF] animate-ping"></span>
              {CURRENT_PERIOD} ACTIVE ROSTER
            </div>

            <h2 id="team-current-heading" className="text-4xl sm:text-5xl md:text-6xl font-black text-[#F5F7FF] tracking-tight uppercase drop-shadow-[0_0_15px_rgba(46,143,255,0.2)] mb-4">
              The Current Team
            </h2>
            
            <p className="text-[#8CA0C4] font-mono text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Executive board and department heads driving every initiative
              forward this year.
            </p>
          </div>

          <div className="team-roster-main">
            {coreTeam.map((member, i) => (
              <TeamMemberEditorial
                key={member.id}
                member={member}
                index={i}
                period={CURRENT_PERIOD}
                variant="editorial"
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
