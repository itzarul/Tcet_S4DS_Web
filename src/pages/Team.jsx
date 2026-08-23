import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { hodData, facultyInchargeData, coreTeam } from '../data/team';
import { Linkedin, Github, Mail, Search, X, Terminal, Cpu, Shield, Award, Sparkles } from 'lucide-react';

function CornerBrackets({ className = "border-[#6dccec]", size = "w-3.5 h-3.5" }) {
  return (
    <>
      <span className={`absolute -top-1 -left-1 border-t-4 border-l-4 ${className} ${size}`} />
      <span className={`absolute -top-1 -right-1 border-t-4 border-r-4 ${className} ${size}`} />
      <span className={`absolute -bottom-1 -left-1 border-b-4 border-l-4 ${className} ${size}`} />
      <span className={`absolute -bottom-1 -right-1 border-b-4 border-r-4 ${className} ${size}`} />
    </>
  );
}

/* ---------------- Motion variants ---------------- */
const EASE = [0.22, 1, 0.36, 1];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
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
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* ---------------- Animated count-up stat ---------------- */
function AnimatedCounter({ to }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  useEffect(() => {
    const controls = animate(count, to, { duration: 1.4, ease: 'easeOut' });
    return () => controls.stop();
  }, [to]);
  return <motion.span>{rounded}</motion.span>;
}

export default function Team() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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
      status: "ACTIVE"
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
      status: "ACTIVE"
    }
  ];

  // Level 2: Executive Core Members (14 Core Team Members)
  const executiveCoreMembers = coreTeam.map((member, idx) => ({
    ...member,
    codeName: `CORE_CMD_${String(idx + 1).padStart(2, '0')}`,
    nodeId: `ID: CR-${String(idx + 1).padStart(2, '0')}`,
    accessLevel: idx < 2 ? "Root Level" : "Department Lead",
    status: "ACTIVE"
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

  return (
    <div className="min-h-screen bg-[#000000] text-slate-100 pt-24 pb-24 px-4 sm:px-6 lg:px-8 font-body font-light selection:bg-[#2563eb] selection:text-white relative overflow-hidden">
      {/* Background Heavy Terminal Grid, CRT Scanlines & Laser Beam */}
      <div className="fixed inset-0 team-grid opacity-70 pointer-events-none z-0" />
      <div className="fixed inset-0 team-grid-dense opacity-50 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(#2563eb_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-20 pointer-events-none z-0" />
      <div className="team-scanlines fixed inset-0 opacity-50 pointer-events-none z-30" />
      <div className="team-beam pointer-events-none" />
      <div className="team-vignette fixed inset-0 z-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Industrial Header Bar */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 bg-[#0a0b12] border-4 border-[#2563eb] shadow-[6px_6px_0px_0px_#2563eb] mb-14"
        >
          <div className="flex flex-wrap items-center gap-3">
            <motion.span
              variants={slideInLeft}
              className="flex items-center gap-2 text-[#6dccec] font-subheading text-xs bg-[#000000] px-3.5 py-2 border-2 border-[#2563eb] shadow-[2px_2px_0px_0px_#000]"
            >
              <span className="w-2.5 h-2.5 bg-[#2563eb] animate-ping rounded-full" />
              &gt; SYS.LOC: S4DS.TCET
            </motion.span>
            <motion.span
              variants={fadeUp}
              className="bg-[#000000] px-3 py-2 border-2 border-[#0a0b12] text-[#6dccec] font-subheading text-xs shadow-[2px_2px_0px_0px_#000] hidden sm:inline-block"
            >
              [ PROTOCOL // HARSH_BRUTALIST ]
            </motion.span>
            <motion.span
              variants={scaleIn}
              className="bg-[#2563eb] text-white px-3 py-2 border-2 border-[#c0efff] font-subheading text-xs shadow-[2px_2px_0px_0px_#000]"
            >
              LIVE NODES: <AnimatedCounter to={totalNodes} />
            </motion.span>
          </div>

          {/* Harsh Cyber Search Bar */}
          <motion.div
            variants={slideInRight}
            className="relative w-full md:w-80"
          >
            <Search className="w-4 h-4 text-[#6dccec] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="SEARCH FACULTY / CORE NODE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#000000] border-3 border-[#2563eb] pl-10 pr-9 py-2 text-xs font-subheading text-white placeholder-[#6dccec]/60 focus:outline-none focus:border-[#c0efff] shadow-[3px_3px_0px_0px_#2563eb] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6dccec] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        </motion.div>

        {/* Harsh Hero Banner */}
        <div className="text-center mb-20">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="show"
            className="inline-block px-5 py-2 border-4 border-[#2563eb] bg-[#0a0b12] text-[#6dccec] font-subheading text-xs sm:text-sm tracking-widest uppercase mb-6 shadow-[6px_6px_0px_0px_#2563eb]"
          >
            ▪ HARSH_SYS // COMMAND_DIRECTIVE ▪
          </motion.div>

          {/* Masked line-by-line heading reveal */}
          <motion.h1
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="text-5xl sm:text-7xl md:text-8xl font-heading font-semibold text-white tracking-tight uppercase mb-4 drop-shadow-[0_6px_35px_rgba(37,99,235,0.7)]"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span variants={maskedLine} className="block team-glitch">
                ORGANISING COMMITTEE
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                variants={maskedLine}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6dccec] via-[#2563eb] to-[#c0efff]"
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
            className="w-full h-3 bg-[repeating-linear-gradient(45deg,#2563eb,#2563eb_12px,#000000_12px,#000000_24px)] border-y-2 border-[#6dccec] max-w-3xl mx-auto my-6 shadow-[3px_3px_0px_0px_#2563eb]"
          />

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.45 }}
            className="font-body font-light text-xs sm:text-sm text-[#c0efff] max-w-3xl mx-auto uppercase tracking-wider leading-relaxed bg-[#0a0b12] p-4 border-4 border-[#2563eb] shadow-[6px_6px_0px_0px_#2563eb]"
          >
            OFFICIAL DIRECTORY OF FACULTY LEADERSHIP & EXECUTIVE CORE COMMAND.<br />
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
            <motion.div variants={scaleIn} className="h-4 w-4 bg-[#2563eb] shadow-[2px_2px_0px_0px_#000]" />
            <motion.h2
              variants={slideInLeft}
              className="font-heading text-lg sm:text-xl font-semibold text-white uppercase tracking-widest px-6 py-2.5 bg-[#0a0b12] border-4 border-[#2563eb] shadow-[6px_6px_0px_0px_#2563eb]"
            >
              [ LEVEL 1 // FACULTIES ]
            </motion.h2>
            <motion.div
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.6, ease: EASE } } }}
              style={{ originX: 0 }}
              className="flex-1 h-1 bg-[repeating-linear-gradient(90deg,#2563eb,#2563eb_8px,transparent_8px,transparent_16px)]"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto"
          >
            {facultyMembers.map((member, index) => {
              const isMatch = matchesSearch(member);
              return (
                <motion.div
                  key={member.id}
                  variants={fadeUp}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  onClick={() => setSelectedNode(member)}
                  className={`relative bg-[#0a0b12] border-4 border-[#2563eb] p-5 sm:p-6 group hover:border-[#c0efff] hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[14px_14px_0px_0px_#6dccec] active:translate-x-0 active:translate-y-0 transition-all duration-150 cursor-pointer shadow-[8px_8px_0px_0px_#2563eb] ${
                    !isMatch ? 'opacity-25 blur-[1px]' : 'opacity-100'
                  }`}
                >
                  <CornerBrackets className="border-[#6dccec] group-hover:border-[#c0efff]" size="w-4 h-4" />
                  
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    {/* Square Photo Frame with Heavy Borders */}
                    <motion.div
                      whileHover={{ rotate: -2 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="relative w-32 h-32 shrink-0 bg-[#000000] border-4 border-[#2563eb] overflow-hidden shadow-[4px_4px_0px_0px_#000] group-hover:border-[#6dccec] transition-colors"
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="team-scanlines absolute inset-0 opacity-10 pointer-events-none" />
                    </motion.div>

                    {/* Member Details */}
                    <div className="flex-1 w-full text-center sm:text-left">
                      <div className="inline-block px-3 py-1 bg-[#2563eb] text-white font-subheading text-xs uppercase tracking-wider mb-2 border-2 border-[#c0efff] shadow-[3px_3px_0px_0px_#000]">
                        {member.codeName}
                      </div>

                      <h3 className="text-2xl font-heading font-semibold text-white group-hover:text-[#6dccec] transition-colors tracking-wide uppercase">
                        {member.name}
                      </h3>

                      <div className="text-xs font-subheading text-[#6dccec] uppercase tracking-wide mt-1">
                        {member.role} — {member.designation}
                      </div>

                      <div className="w-full h-1 bg-[#000000] my-4 border-b border-[#2563eb]/40" />

                      <p className="text-xs font-body font-light text-[#c0efff]/90 leading-relaxed italic bg-[#000000] p-3 border-2 border-[#2563eb] shadow-[3px_3px_0px_0px_#2563eb] line-clamp-3">
                        "{member.bio}"
                      </p>

                      {/* Contact Bar */}
                      <div className="mt-4 flex items-center justify-center sm:justify-start gap-3 font-subheading text-xs">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#000000] border-2 border-[#2563eb] text-[#6dccec] shadow-[2px_2px_0px_0px_#2563eb] hover:bg-[#2563eb] hover:text-white transition-all"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span className="font-body font-light">{member.email}</span>
                          </a>
                        )}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2563eb] border-2 border-[#c0efff] text-white shadow-[2px_2px_0px_0px_#000] hover:bg-[#6dccec] hover:text-black transition-all"
                          >
                            <Linkedin className="w-3.5 h-3.5" />
                            <span>LinkedIn</span>
                          </a>
                        )}
                      </div>
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
          className="w-full h-4 bg-[repeating-linear-gradient(45deg,#2563eb,#2563eb_14px,#000000_14px,#000000_28px)] border-y-2 border-[#2563eb] my-16 shadow-[4px_4px_0px_0px_#2563eb]"
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
            <motion.div variants={scaleIn} className="h-4 w-4 bg-[#6dccec] shadow-[2px_2px_0px_0px_#000]" />
            <motion.h2
              variants={slideInLeft}
              className="font-heading text-lg sm:text-xl font-semibold text-white uppercase tracking-widest px-6 py-2.5 bg-[#0a0b12] border-4 border-[#2563eb] shadow-[6px_6px_0px_0px_#2563eb]"
            >
              [ LEVEL 2 // EXECUTIVE CORE ]
            </motion.h2>
            <motion.div
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.6, ease: EASE } } }}
              style={{ originX: 0 }}
              className="flex-1 h-1 bg-[repeating-linear-gradient(90deg,#2563eb,#2563eb_8px,transparent_8px,transparent_16px)]"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          >
            {executiveCoreMembers.map((member, index) => {
              const isMatch = matchesSearch(member);
              return (
                <motion.div
                  key={member.id}
                  variants={{
                    hidden: { opacity: 0, y: 30, rotate: index % 2 === 0 ? -1.5 : 1.5 },
                    show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.45, ease: EASE } },
                  }}
                  whileHover={{ scale: 1.03, rotate: index % 2 === 0 ? -1 : 1, transition: { type: 'spring', stiffness: 300, damping: 18 } }}
                  onClick={() => setSelectedNode(member)}
                  className={`relative bg-[#0a0b12] border-3 border-[#2563eb] p-4 group hover:border-[#c0efff] hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-[12px_12px_0px_0px_#6dccec] active:translate-x-0 active:translate-y-0 transition-all duration-150 cursor-pointer shadow-[6px_6px_0px_0px_#2563eb] flex flex-col justify-between ${
                    !isMatch ? 'opacity-25 blur-[1px]' : 'opacity-100'
                  }`}
                >
                  <CornerBrackets className="border-[#2563eb] group-hover:border-[#6dccec]" size="w-3 h-3" />
                  
                  <div>
                    {/* Square Image Box */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="relative aspect-square w-[70%] mx-auto bg-[#000000] border-3 border-[#2563eb] overflow-hidden mb-4 shadow-[4px_4px_0px_0px_#2563eb] group-hover:border-[#6dccec] transition-colors"
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="team-scanlines absolute inset-0 opacity-10 pointer-events-none z-0" />
                      <div className="absolute bottom-2 right-2 z-10">
                        <span className="px-2.5 py-1 text-[11px] font-subheading bg-[#2563eb] border border-[#c0efff] text-white shadow-[2px_2px_0px_0px_#000] uppercase tracking-wide">
                          {member.role}
                        </span>
                      </div>
                    </motion.div>

                    {/* Info Section */}
                    <h3 className="text-xl font-heading font-semibold text-white group-hover:text-[#6dccec] transition-colors uppercase tracking-wide">
                      {member.name}
                    </h3>

                  </div>

                  {/* Actions Footer */}
                  <div className="mt-5 pt-3 border-t-2 border-[#000000] flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[#6dccec] text-xs font-subheading">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="hover:text-white transition-colors flex items-center gap-1.5"
                          title={member.email}
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline font-body font-light">Mail</span>
                        </a>
                      )}
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="hover:text-white transition-colors"
                          aria-label="GitHub Profile"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`${member.name} LinkedIn Profile`}
                        className="p-2 bg-[#2563eb] border border-[#c0efff] text-white hover:bg-[#6dccec] hover:text-black transition-all shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#6dccec] hover:-translate-x-0.5 hover:-translate-y-0.5"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>


        {/* Bottom Brutalist Status Footer Bar */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative max-w-7xl mx-auto mt-20 p-5 bg-[#0a0b12] border-4 border-[#2563eb] text-center font-subheading text-xs text-[#6dccec] shadow-[8px_8px_0px_0px_#2563eb]"
        >
          <CornerBrackets className="border-[#6dccec]" size="w-3 h-3" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4">
            <motion.span variants={slideInLeft}>[ PROTOCOL::LEVEL1_AND_LEVEL2_ONLY ]</motion.span>
            <motion.span variants={fadeUp} className="text-white font-body font-light">S4DS TCET EXECUTIVE COMMAND 2025-26</motion.span>
            <motion.span
              variants={scaleIn}
              className="text-white bg-[#2563eb] px-3 py-1 border border-[#c0efff] shadow-[2px_2px_0px_0px_#000]"
            >
              [SYSTEM_ONLINE]
            </motion.span>
          </div>
        </motion.div>

      </div>


      {/* ================= INTERACTIVE HARSH NODE TERMINAL MODAL ================= */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="relative w-full max-w-xl bg-[#0a0b12] border-4 border-[#6dccec] p-6 sm:p-8 shadow-[16px_16px_0px_0px_#2563eb] text-slate-100"
            >
              <CornerBrackets className="border-[#c0efff]" size="w-4 h-4" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedNode(null)}
                className="absolute top-4 right-4 text-white bg-[#2563eb] border-2 border-[#c0efff] p-2 hover:bg-[#6dccec] hover:text-black shadow-[3px_3px_0px_0px_#000] transition-all cursor-pointer z-10"
                aria-label="Close Inspector"
              >
                <X className="w-5 h-5 font-bold" />
              </button>

              {/* Terminal Header */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="flex items-center gap-2 text-xs font-subheading text-[#6dccec] border-b-3 border-[#2563eb] pb-3 mb-6"
              >
                <Terminal className="w-4 h-4 text-[#6dccec]" />
                <span>NODE INSPECTOR // {selectedNode.codeName || selectedNode.nodeId || 'EXECUTIVE_NODE'}</span>
              </motion.div>

              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-6 items-center sm:items-start"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25, type: 'spring', stiffness: 200, damping: 18 }}
                  className="w-32 h-32 shrink-0 bg-[#000000] border-3 border-[#2563eb] overflow-hidden shadow-[4px_4px_0px_0px_#2563eb]"
                >
                  <img
                    src={selectedNode.image}
                    alt={selectedNode.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <div className="flex-1 text-center sm:text-left space-y-2">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="inline-block px-3 py-1 bg-[#2563eb] border-2 border-[#c0efff] text-white text-xs font-subheading uppercase shadow-[3px_3px_0px_0px_#000]"
                  >
                    {selectedNode.codeName || selectedNode.role}
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="text-2xl font-heading font-semibold text-white uppercase tracking-wide"
                  >
                    {selectedNode.name}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xs font-subheading text-[#6dccec] uppercase"
                  >
                    {selectedNode.role} {selectedNode.designation ? `— ${selectedNode.designation}` : ''}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="text-xs text-[#c0efff] space-y-1 pt-2 font-subheading"
                  >
                    <div>&gt; ACCESS: <span className="text-white">{selectedNode.accessLevel || 'Full Command'}</span></div>
                    <div>&gt; STATUS: <span className="text-emerald-400 px-1.5 py-0.5 bg-emerald-950 border border-emerald-500">{selectedNode.status || 'ACTIVE'}</span></div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Bio Section */}
              {selectedNode.bio && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 p-4 bg-[#000000] border-3 border-[#2563eb] text-xs text-[#c0efff] leading-relaxed shadow-[4px_4px_0px_0px_#2563eb]"
                >
                  <p className="italic font-body font-light text-sm">"{selectedNode.bio}"</p>
                </motion.div>
              )}

              {/* Action Links */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="mt-6 pt-4 border-t-3 border-[#2563eb] flex flex-wrap items-center justify-between gap-3 font-subheading"
              >
                <div className="flex items-center gap-3">
                  {selectedNode.linkedin && (
                    <a
                      href={selectedNode.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#2563eb] border-2 border-[#c0efff] text-white text-xs shadow-[3px_3px_0px_0px_#000] hover:bg-[#6dccec] hover:text-black transition-all"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </a>
                  )}

                  {selectedNode.github && (
                    <a
                      href={selectedNode.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#0a0b12] border-2 border-[#2563eb] text-[#c0efff] text-xs shadow-[3px_3px_0px_0px_#2563eb] hover:bg-[#2563eb] hover:text-white transition-all"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>

                {selectedNode.email && (
                  <a
                    href={`mailto:${selectedNode.email}`}
                    className="inline-flex items-center gap-1.5 text-xs text-[#6dccec] hover:text-white transition-colors bg-[#000000] px-3 py-1.5 border border-[#2563eb] font-body font-light"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{selectedNode.email}</span>
                  </a>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
