import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { hodData, facultyInchargeData, coreTeam } from "../data/team";
import {
  Linkedin,
  Github,
  Mail,
  Search,
  X,
  Terminal,
  Cpu,
  Shield,
  Award,
  Sparkles,
  Globe,
  ArrowUpRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CornerBrackets({
  className = "border-[#3585f6]",
  size = "w-3.5 h-3.5",
}) {
  return (
    <>
      <span
        className={`absolute -top-1 -left-1 border-t-4 border-l-4 ${className} ${size}`}
      />
      <span
        className={`absolute -top-1 -right-1 border-t-4 border-r-4 ${className} ${size}`}
      />
      <span
        className={`absolute -bottom-1 -left-1 border-b-4 border-l-4 ${className} ${size}`}
      />
      <span
        className={`absolute -bottom-1 -right-1 border-b-4 border-r-4 ${className} ${size}`}
      />
    </>
  );
}

/* ---------------- Motion variants ---------------- */
const EASE = [0.22, 1, 0.36, 1];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

/* Masked line reveal for headings */
const maskedLine = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* ---------------- Animated count-up stat ---------------- */
function AnimatedCounter({ to }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  useEffect(() => {
    const controls = animate(count, to, { duration: 1.4, ease: "easeOut" });
    return () => controls.stop();
  }, [to]);
  return <motion.span>{rounded}</motion.span>;
}

export default function Team() {
  const [searchQuery, setSearchQuery] = useState("");

  // Level 1: Faculties
  const facultyMembers = [
    {
      id: "fac-hod",
      name: hodData.name,
      codeName: "FAC_DIRECTOR_01",
      role: "Head of Department",
      designation: hodData.designation,
      department: hodData.department,
      image: hodData.image,
      bio: hodData.message,
      linkedin: hodData.linkedin,
      email: hodData.email,
      nodeId: "ID: HOD-DS",
      accessLevel: "Executive Oversight",
      status: "ACTIVE",
    },
    {
      id: "fac-incharge",
      name: facultyInchargeData.name,
      codeName: "FAC_MENTOR_02",
      role: "Faculty Incharge",
      designation: facultyInchargeData.designation,
      department: facultyInchargeData.department,
      image: facultyInchargeData.image,
      bio: facultyInchargeData.message,
      linkedin: facultyInchargeData.linkedin,
      email: facultyInchargeData.email,
      nodeId: "ID: FIC-DS",
      accessLevel: "Chief Advisory",
      status: "ACTIVE",
    },
  ];

  // Level 2: Executive Core Members (14 Core Team Members)
  const executiveCoreMembers = coreTeam.map((member, idx) => ({
    ...member,
    codeName: `CORE_CMD_${String(idx + 1).padStart(2, "0")}`,
    nodeId: `ID: CR-${String(idx + 1).padStart(2, "0")}`,
    accessLevel: idx < 2 ? "Root Level" : "Department Lead",
    status: "ACTIVE",
  }));

  const totalNodes = facultyMembers.length + executiveCoreMembers.length;

  // Search filter helper function
  const matchesSearch = (item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      (item.name && item.name.toLowerCase().includes(query)) ||
      (item.codeName && item.codeName.toLowerCase().includes(query)) ||
      (item.role && item.role.toLowerCase().includes(query)) ||
      (item.designation && item.designation.toLowerCase().includes(query)) ||
      (item.nodeId && item.nodeId.toLowerCase().includes(query)) ||
      (item.bio && item.bio.toLowerCase().includes(query))
    );
  };

  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".group");

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onLeave: () => gsap.set(cards, { clearProps: "all" }),
        onLeaveBack: () => gsap.set(cards, { clearProps: "all" }),
      });

      // Initially hide the elements before ScrollTrigger takes over to prevent them from being visible before the reveal
      gsap.set(cards, { opacity: 0, y: 40, scale: 0.95 });
      cards.forEach((card) => {
        const details = card.querySelectorAll(".card-detail");
        gsap.set(details, { opacity: 0, y: 15 });
      });

      ScrollTrigger.batch(cards, {
        start: "top 85%",
        end: "bottom 15%",
        onEnter: (batch) => {
          batch.forEach((card, i) => {
            const details = card.querySelectorAll(".card-detail");
            gsap.killTweensOf([card, details]);

            const tl = gsap.timeline({
              onComplete: () =>
                gsap.set([card, details], { clearProps: "all" }),
            });

            tl.fromTo(
              card,
              { opacity: 0, y: 40, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: "power3.out",
                delay: i * 0.15,
              },
            ).fromTo(
              details,
              { opacity: 0, y: 15 },
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.05,
                ease: "power2.out",
              },
              "-=0.25",
            );
          });
        },
        onLeave: (batch) => {
          batch.forEach((card, i) => {
            const details = card.querySelectorAll(".card-detail");
            gsap.killTweensOf([card, details]);
            gsap.to(card, {
              opacity: 0,
              y: -40,
              scale: 0.95,
              duration: 0.4,
              ease: "power2.in",
              delay: i * 0.1,
            });
            gsap.to(details, { opacity: 0, y: -15, duration: 0.3 });
          });
        },
        onEnterBack: (batch) => {
          batch.forEach((card, i) => {
            const details = card.querySelectorAll(".card-detail");
            gsap.killTweensOf([card, details]);

            const tl = gsap.timeline({
              onComplete: () =>
                gsap.set([card, details], { clearProps: "all" }),
            });

            tl.fromTo(
              card,
              { opacity: 0, y: -40, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: "power3.out",
                delay: i * 0.15,
              },
            ).fromTo(
              details,
              { opacity: 0, y: -15 },
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.05,
                ease: "power2.out",
              },
              "-=0.25",
            );
          });
        },
        onLeaveBack: (batch) => {
          batch.forEach((card, i) => {
            const details = card.querySelectorAll(".card-detail");
            gsap.killTweensOf([card, details]);
            gsap.to(card, {
              opacity: 0,
              y: 40,
              scale: 0.95,
              duration: 0.4,
              ease: "power2.in",
              delay: i * 0.1,
            });
            gsap.to(details, { opacity: 0, y: 15, duration: 0.3 });
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [searchQuery]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#252525] text-slate-100 pt-24 pb-24 px-4 sm:px-6 lg:px-8 team-primary font-light selection:bg-[#012f7c] selection:text-white relative overflow-hidden"
    >
      {/* Background Image and Overlays */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0 opacity-80"
        style={{ backgroundImage: "url('/team/background.jpeg')" }}
      />
      <div className="fixed inset-0 bg-[#252525]/60 pointer-events-none z-0" />{" "}
      {/* Darkening overlay */}
      <div className="team-scanlines fixed inset-0 opacity-40 pointer-events-none z-30" />
      <div className="team-beam pointer-events-none" />
      <div className="team-vignette fixed inset-0 z-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Harsh Hero Banner */}
        <div className="text-center mb-20">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="show"
            className="inline-block px-5 py-2 border-4 border-[#012f7c] bg-[#000000] text-[#3585f6] team-primary text-xs sm:text-sm tracking-widest uppercase mb-6 shadow-[6px_6px_0px_0px_#012f7c]"
          >
            ▪ HARSH_SYS // COMMAND_DIRECTIVE ▪
          </motion.div>

          {/* Masked line-by-line heading reveal */}
          <motion.h1
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="text-5xl sm:text-7xl md:text-8xl team-display font-semibold text-white tracking-tight uppercase mb-4 drop-shadow-[0_6px_35px_rgba(1, 47, 124,0.7)]"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span variants={maskedLine} className="block team-glitch">
                ORGANISING COMMITTEE
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                variants={maskedLine}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-[#3585f6] via-[#012f7c] to-[#bfdbfe]"
              >
                2025-26
              </motion.span>
            </span>
          </motion.h1>

          {/* Industrial Hazard Stripe Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
            style={{ originX: 0.5 }}
            className="w-full h-3 bg-[repeating-linear-gradient(45deg,#012f7c,#012f7c_12px,#000000_12px,#000000_24px)] border-y-2 border-[#3585f6] max-w-3xl mx-auto my-6 shadow-[3px_3px_0px_0px_#012f7c]"
          />

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.45 }}
            className="team-body font-light text-xs sm:text-sm text-[#bfdbfe] max-w-3xl mx-auto uppercase tracking-wider leading-relaxed bg-[#000000] p-4 border-4 border-[#012f7c] shadow-[6px_6px_0px_0px_#012f7c]"
          >
            OFFICIAL DIRECTORY OF FACULTY LEADERSHIP & EXECUTIVE CORE COMMAND.
            <br />
            STRUCTURAL ISOLATION COMPLETE. NO SUB-NODES ENGAGED.
          </motion.p>
        </div>

        {/* ================= LEVEL 1: FACULTIES ================= */}
        <section className="my-24">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="flex items-center gap-4 mb-10"
          >
            <motion.div
              variants={scaleIn}
              className="h-4 w-4 bg-[#012f7c] shadow-[2px_2px_0px_0px_#000]"
            />
            <motion.h2
              variants={slideInLeft}
              className="team-display text-lg sm:text-xl font-semibold text-white uppercase tracking-widest px-6 py-2.5 bg-[#000000] border-4 border-[#012f7c] shadow-[6px_6px_0px_0px_#012f7c]"
            >
              [ LEVEL 1 // FACULTIES ]
            </motion.h2>
            <motion.div
              variants={{
                hidden: { scaleX: 0 },
                show: { scaleX: 1, transition: { duration: 0.6, ease: EASE } },
              }}
              style={{ originX: 0 }}
              className="flex-1 h-1 bg-[repeating-linear-gradient(90deg,#012f7c,#012f7c_8px,transparent_8px,transparent_16px)]"
            />
          </motion.div>

          <motion.div className="team-card-grid grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {facultyMembers.map((member, index) => {
              const isMatch = matchesSearch(member);
              return (
                <motion.div
                  key={member.id}
                  className={`relative w-full max-w-lg mx-auto group ${
                    !isMatch ? "opacity-25 blur-[1px]" : "opacity-100"
                  }`}
                >
                  {/* Scroll-reveal shell: GSAP animates this element's transform, so the hover
                      scale is kept on the box below and the two can never overwrite each other. */}
                  <div className="team-card relative h-full bg-[#000000] border border-[#012f7c] p-3 sm:p-4 team-primary text-white overflow-hidden hover:border-[#3585f6] hover:shadow-[0_0_20px_rgba(53,133,246,0.5),inset_0_0_20px_rgba(53,133,246,0.2)]">
                    {/* Outer Border accents */}
                    <div className="absolute inset-1 border-[0.5px] border-[#3585f6]/20 pointer-events-none group-hover:border-[#3585f6]/50 transition-colors" />

                    {/* Top Bar */}
                    <div className="flex justify-between items-start border-b border-[#012f7c] pb-2 mb-4 relative z-10">
                      <span className="text-[9px] sm:text-[10px] text-[#3585f6] tracking-widest uppercase font-semibold">
                        S4DS.EXE // MEMBER_PROFILE
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-[2px] opacity-60">
                          <div className="w-[2px] h-5 bg-[#3585f6]"></div>
                          <div className="w-[2px] h-5 bg-[#3585f6]"></div>
                          <div className="w-[2px] h-3 bg-[#3585f6] mt-2"></div>
                          <div className="w-[2px] h-5 bg-[#3585f6]"></div>
                        </div>
                        <div className="text-[8px] text-[#3585f6] leading-[1] font-bold text-right">
                          <div>20</div>
                          <div>25</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 sm:gap-4 relative z-10 h-[180px] sm:h-[200px]">
                      {/* Left Column (Text & Actions) */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          {/* Audio Waveform */}
                          <div className="flex items-end gap-[2px] h-6 mb-3 opacity-80 card-detail">
                            {[
                              4, 8, 6, 12, 16, 10, 14, 24, 18, 12, 8, 14, 10, 6,
                              4,
                            ].map((h, i) => (
                              <div
                                key={i}
                                className="w-1 bg-[#3585f6]"
                                style={{ height: `${h}px` }}
                              />
                            ))}
                            <span className="text-[#3585f6] text-[8px] tracking-widest ml-1 hidden sm:inline-block">
                              .....
                            </span>
                          </div>

                          {/* Name */}
                          <h2
                            className="text-2xl sm:text-3xl font-black uppercase leading-[1.1] tracking-tight text-white mb-2 team-display group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300"
                            style={{ wordBreak: "break-word" }}
                          >
                            {member.name.split(" ").map((part, i) => (
                              <React.Fragment key={i}>
                                {part}
                                {i !== member.name.split(" ").length - 1 && (
                                  <br />
                                )}
                              </React.Fragment>
                            ))}
                          </h2>

                          {/* Role & Bio */}
                          <div className="flex items-center gap-2 mb-1 border-t border-[#012f7c] pt-2 card-detail">
                            <span className="text-[9px] sm:text-[10px] text-[#3585f6] group-hover:drop-shadow-[0_0_5px_rgba(53,133,246,0.8)] transition-all duration-300 uppercase tracking-widest">
                              {member.role}
                            </span>
                            {member.linkedin && (
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                title="LinkedIn profile"
                                aria-label={`${member.name} on LinkedIn`}
                                className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 border border-[#012f7c] hover:border-[#3585f6] hover:bg-[#3585f6]/10 flex items-center justify-center transition-colors"
                              >
                                <Linkedin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#3585f6]" />
                              </a>
                            )}
                          </div>
                          <div className="text-[7px] sm:text-[8px] text-zinc-400 uppercase tracking-widest card-detail">
                            PEOPLE // PROGRESS // PURPOSE
                          </div>

                          {/* Cyber line graphic */}
                          <div className="flex items-center gap-1 my-3 card-detail hidden sm:flex">
                            <div className="w-3 h-[2px] bg-[#3585f6] skew-x-[-30deg]"></div>
                            <div className="w-6 h-[2px] bg-[#3585f6] skew-x-[-30deg]"></div>
                            <div className="w-1.5 h-[2px] bg-[#3585f6] skew-x-[-30deg]"></div>
                            <div className="flex-1 h-[1px] bg-[#012f7c] relative">
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#3585f6]"></div>
                            </div>
                          </div>
                        </div>

                        {/* Social Buttons */}
                        <div className="flex gap-2 mt-auto card-detail">
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              onClick={(e) => e.stopPropagation()}
                              className="relative w-11 h-9 sm:w-14 sm:h-11 border border-[#012f7c] hover:border-[#3585f6] hover:bg-[#3585f6]/10 flex items-center justify-center pr-2.5 pb-2 sm:pr-4 sm:pb-3 transition-colors group/btn shrink-0"
                            >
                              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#3585f6]" />
                              <ArrowUpRight className="absolute bottom-1 right-1 w-2.5 h-2.5 text-[#3585f6] opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Right Column (Image) */}
                      <div className="w-[100px] sm:w-[140px] border border-[#012f7c] p-1 flex flex-col relative shrink-0">
                        {/* Image Header */}
                        <div className="flex justify-between items-center text-[7px] sm:text-[8px] text-[#3585f6] mb-1 px-0.5 uppercase tracking-widest font-bold">
                          <span>////L</span>
                          <span>// ONLINE</span>
                        </div>
                        <div className="relative w-full flex-1 overflow-hidden bg-[#000000] border border-[#012f7c]">
                          <img
                            src={member.image}
                            className="w-full h-full object-cover object-center filter contrast-110 group-hover:scale-105 transition-transform duration-500"
                            alt={member.name}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-[#012f7c]/10 mix-blend-overlay pointer-events-none"></div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-3 sm:mt-4 pt-2 border-t border-[#012f7c] flex justify-between items-center text-[7px] sm:text-[8px] text-[#3585f6] uppercase tracking-widest font-bold relative z-10 card-detail">
                      <span>A BRIGHTER TOMORROW, TOGETHER.</span>
                      <Globe className="w-3 h-3 opacity-80" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Industrial Hazard Stripe Interstitial */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ originX: 0 }}
          className="w-full h-4 bg-[repeating-linear-gradient(45deg,#012f7c,#012f7c_14px,#000000_14px,#000000_28px)] border-y-2 border-[#012f7c] my-16 shadow-[4px_4px_0px_0px_#012f7c]"
        />

        {/* ================= LEVEL 2: CORE ================= */}
        <section className="my-24">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="flex items-center gap-4 mb-10"
          >
            <motion.div
              variants={scaleIn}
              className="h-4 w-4 bg-[#3585f6] shadow-[2px_2px_0px_0px_#000]"
            />
            <motion.h2
              variants={slideInLeft}
              className="team-display text-lg sm:text-xl font-semibold text-white uppercase tracking-widest px-6 py-2.5 bg-[#000000] border-4 border-[#012f7c] shadow-[6px_6px_0px_0px_#012f7c]"
            >
              [ LEVEL 2 // EXECUTIVE CORE ]
            </motion.h2>
            <motion.div
              variants={{
                hidden: { scaleX: 0 },
                show: { scaleX: 1, transition: { duration: 0.6, ease: EASE } },
              }}
              style={{ originX: 0 }}
              className="flex-1 h-1 bg-[repeating-linear-gradient(90deg,#012f7c,#012f7c_8px,transparent_8px,transparent_16px)]"
            />
          </motion.div>

          <motion.div className="team-card-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {executiveCoreMembers.map((member, index) => {
              const isMatch = matchesSearch(member);
              return (
                <motion.div
                  key={member.id}
                  className={`relative w-full max-w-lg mx-auto group ${
                    !isMatch ? "opacity-25 blur-[1px]" : "opacity-100"
                  }`}
                >
                  {/* Scroll-reveal shell: GSAP animates this element's transform, so the hover
                      scale is kept on the box below and the two can never overwrite each other. */}
                  <div className="team-card relative h-full bg-[#000000] border border-[#012f7c] p-3 sm:p-4 team-primary text-white overflow-hidden hover:border-[#3585f6] hover:shadow-[0_0_20px_rgba(53,133,246,0.5),inset_0_0_20px_rgba(53,133,246,0.2)]">
                    {/* Outer Border accents */}
                    <div className="absolute inset-1 border-[0.5px] border-[#3585f6]/20 pointer-events-none group-hover:border-[#3585f6]/50 transition-colors" />

                    {/* Top Bar */}
                    <div className="flex justify-between items-start border-b border-[#012f7c] pb-2 mb-4 relative z-10">
                      <span className="text-[9px] sm:text-[10px] text-[#3585f6] tracking-widest uppercase font-semibold">
                        S4DS.EXE // MEMBER_PROFILE
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-[2px] opacity-60">
                          <div className="w-[2px] h-5 bg-[#3585f6]"></div>
                          <div className="w-[2px] h-5 bg-[#3585f6]"></div>
                          <div className="w-[2px] h-3 bg-[#3585f6] mt-2"></div>
                          <div className="w-[2px] h-5 bg-[#3585f6]"></div>
                        </div>
                        <div className="text-[8px] text-[#3585f6] leading-[1] font-bold text-right">
                          <div>20</div>
                          <div>25</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 sm:gap-4 relative z-10 h-[180px] sm:h-[200px]">
                      {/* Left Column (Text & Actions) */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          {/* Audio Waveform */}
                          <div className="flex items-end gap-[2px] h-6 mb-3 opacity-80 card-detail">
                            {[
                              4, 8, 6, 12, 16, 10, 14, 24, 18, 12, 8, 14, 10, 6,
                              4,
                            ].map((h, i) => (
                              <div
                                key={i}
                                className="w-1 bg-[#3585f6]"
                                style={{ height: `${h}px` }}
                              />
                            ))}
                            <span className="text-[#3585f6] text-[8px] tracking-widest ml-1 hidden sm:inline-block">
                              .....
                            </span>
                          </div>

                          {/* Name */}
                          <h2
                            className="text-2xl sm:text-3xl font-black uppercase leading-[1.1] tracking-tight text-white mb-2 team-display group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300"
                            style={{ wordBreak: "break-word" }}
                          >
                            {member.name.split(" ").map((part, i) => (
                              <React.Fragment key={i}>
                                {part}
                                {i !== member.name.split(" ").length - 1 && (
                                  <br />
                                )}
                              </React.Fragment>
                            ))}
                          </h2>

                          {/* Role & Bio */}
                          <div className="flex items-center gap-2 mb-1 border-t border-[#012f7c] pt-2 card-detail">
                            <span className="text-[9px] sm:text-[10px] text-[#3585f6] group-hover:drop-shadow-[0_0_5px_rgba(53,133,246,0.8)] transition-all duration-300 uppercase tracking-widest">
                              {member.role}
                            </span>
                            {member.linkedin && (
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                title="LinkedIn profile"
                                aria-label={`${member.name} on LinkedIn`}
                                className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 border border-[#012f7c] hover:border-[#3585f6] hover:bg-[#3585f6]/10 flex items-center justify-center transition-colors"
                              >
                                <Linkedin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#3585f6]" />
                              </a>
                            )}
                          </div>
                          <div className="text-[7px] sm:text-[8px] text-zinc-400 uppercase tracking-widest card-detail">
                            PEOPLE // PROGRESS // PURPOSE
                          </div>

                          {/* Cyber line graphic */}
                          <div className="flex items-center gap-1 my-3 card-detail hidden sm:flex">
                            <div className="w-3 h-[2px] bg-[#3585f6] skew-x-[-30deg]"></div>
                            <div className="w-6 h-[2px] bg-[#3585f6] skew-x-[-30deg]"></div>
                            <div className="w-1.5 h-[2px] bg-[#3585f6] skew-x-[-30deg]"></div>
                            <div className="flex-1 h-[1px] bg-[#012f7c] relative">
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#3585f6]"></div>
                            </div>
                          </div>
                        </div>

                        {/* Social Buttons */}
                        <div className="flex gap-2 mt-auto card-detail">
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              onClick={(e) => e.stopPropagation()}
                              className="relative w-11 h-9 sm:w-14 sm:h-11 border border-[#012f7c] hover:border-[#3585f6] hover:bg-[#3585f6]/10 flex items-center justify-center pr-2.5 pb-2 sm:pr-4 sm:pb-3 transition-colors group/btn shrink-0"
                            >
                              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#3585f6]" />
                              <ArrowUpRight className="absolute bottom-1 right-1 w-2.5 h-2.5 text-[#3585f6] opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Right Column (Image) */}
                      <div className="w-[100px] sm:w-[140px] border border-[#012f7c] p-1 flex flex-col relative shrink-0">
                        {/* Image Header */}
                        <div className="flex justify-between items-center text-[7px] sm:text-[8px] text-[#3585f6] mb-1 px-0.5 uppercase tracking-widest font-bold">
                          <span>////L</span>
                          <span>// ONLINE</span>
                        </div>
                        <div className="relative w-full flex-1 overflow-hidden bg-[#000000] border border-[#012f7c]">
                          <img
                            src={member.image}
                            className="w-full h-full object-cover object-center filter contrast-110 group-hover:scale-105 transition-transform duration-500"
                            alt={member.name}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-[#012f7c]/10 mix-blend-overlay pointer-events-none"></div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-3 sm:mt-4 pt-2 border-t border-[#012f7c] flex justify-between items-center text-[7px] sm:text-[8px] text-[#3585f6] uppercase tracking-widest font-bold relative z-10 card-detail">
                      <span>A BRIGHTER TOMORROW, TOGETHER.</span>
                      <Globe className="w-3 h-3 opacity-80" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      </div>
    </div>
  );
}
