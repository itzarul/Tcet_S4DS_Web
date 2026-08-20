import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <div className="min-h-screen bg-[#010101] text-slate-100 pt-24 pb-24 px-4 sm:px-6 lg:px-8 font-body font-light selection:bg-[#065cc8] selection:text-white relative overflow-hidden">
      {/* Background Heavy Terminal Grid, CRT Scanlines & Laser Beam */}
      <div className="fixed inset-0 bg-cyber-grid opacity-60 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-cyber-grid-dense opacity-40 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(#065cc8_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-25 pointer-events-none z-0" />
      <div className="crt-scanlines fixed inset-0 opacity-45 pointer-events-none z-30" />
      <div className="animate-crt-beam pointer-events-none" />
      <div className="crt-vignette fixed inset-0 z-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Industrial Header Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 bg-[#05103a] border-4 border-[#065cc8] shadow-[6px_6px_0px_0px_#065cc8] mb-14">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 text-[#6dccec] font-subheading text-xs bg-[#010101] px-3.5 py-2 border-2 border-[#065cc8] shadow-[2px_2px_0px_0px_#000]">
              <span className="w-2.5 h-2.5 bg-[#065cc8] animate-ping rounded-full" />
              &gt; SYS.LOC: S4DS.TCET
            </span>
            <span className="bg-[#010101] px-3 py-2 border-2 border-[#05103a] text-[#6dccec] font-subheading text-xs shadow-[2px_2px_0px_0px_#000] hidden sm:inline-block">
              [ PROTOCOL // HARSH_BRUTALIST ]
            </span>
            <span className="bg-[#065cc8] text-white px-3 py-2 border-2 border-[#c0efff] font-subheading text-xs shadow-[2px_2px_0px_0px_#000]">
              LIVE NODES: {facultyMembers.length + executiveCoreMembers.length}
            </span>
          </div>

          {/* Harsh Cyber Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#6dccec] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="SEARCH FACULTY / CORE NODE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#010101] border-3 border-[#065cc8] pl-10 pr-9 py-2 text-xs font-subheading text-white placeholder-[#6dccec]/60 focus:outline-none focus:border-[#c0efff] shadow-[3px_3px_0px_0px_#065cc8] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6dccec] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Harsh Hero Banner */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-5 py-2 border-4 border-[#065cc8] bg-[#05103a] text-[#6dccec] font-subheading text-xs sm:text-sm tracking-widest uppercase mb-6 shadow-[6px_6px_0px_0px_#065cc8]"
          >
            ▪ HARSH_SYS // COMMAND_DIRECTIVE ▪
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl font-heading font-semibold text-white tracking-tight uppercase mb-4 drop-shadow-[0_6px_35px_rgba(6,92,200,0.7)]"
          >
            ORGANISING COMMITTEE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6dccec] via-[#065cc8] to-[#c0efff]">2025-26</span>
          </motion.h1>

          {/* Industrial Hazard Stripe Divider */}
          <div className="w-full h-3 bg-[repeating-linear-gradient(45deg,#065cc8,#065cc8_12px,#010101_12px,#010101_24px)] border-y-2 border-[#6dccec] max-w-3xl mx-auto my-6 shadow-[3px_3px_0px_0px_#065cc8]" />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body font-light text-xs sm:text-sm text-[#c0efff] max-w-3xl mx-auto uppercase tracking-wider leading-relaxed bg-[#05103a] p-4 border-4 border-[#065cc8] shadow-[6px_6px_0px_0px_#065cc8]"
          >
            OFFICIAL DIRECTORY OF FACULTY LEADERSHIP & EXECUTIVE CORE COMMAND.<br />
            STRUCTURAL ISOLATION COMPLETE. NO SUB-NODES ENGAGED.
          </motion.p>
        </div>


        {/* ================= LEVEL 1: FACULTIES ================= */}
        <section className="my-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-4 w-4 bg-[#065cc8] shadow-[2px_2px_0px_0px_#000]" />
            <h2 className="font-heading text-lg sm:text-xl font-semibold text-white uppercase tracking-widest px-6 py-2.5 bg-[#05103a] border-4 border-[#065cc8] shadow-[6px_6px_0px_0px_#065cc8]">
              [ LEVEL 1 // FACULTIES ]
            </h2>
            <div className="flex-1 h-1 bg-[repeating-linear-gradient(90deg,#065cc8,#065cc8_8px,transparent_8px,transparent_16px)]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {facultyMembers.map((member, index) => {
              const isMatch = matchesSearch(member);
              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  onClick={() => setSelectedNode(member)}
                  className={`relative bg-[#05103a] border-4 border-[#065cc8] p-5 sm:p-6 group hover:border-[#c0efff] hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[14px_14px_0px_0px_#6dccec] active:translate-x-0 active:translate-y-0 transition-all duration-150 cursor-pointer shadow-[8px_8px_0px_0px_#065cc8] ${
                    !isMatch ? 'opacity-25 blur-[1px]' : 'opacity-100'
                  }`}
                >
                  <CornerBrackets className="border-[#6dccec] group-hover:border-[#c0efff]" size="w-4 h-4" />
                  
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    {/* Square Photo Frame with Heavy Borders */}
                    <div className="relative w-32 h-32 shrink-0 bg-[#010101] border-4 border-[#065cc8] overflow-hidden shadow-[4px_4px_0px_0px_#000] group-hover:border-[#6dccec] transition-colors">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="crt-scanlines absolute inset-0 opacity-30 pointer-events-none" />
                    </div>

                    {/* Member Details */}
                    <div className="flex-1 w-full text-center sm:text-left">
                      <div className="inline-block px-3 py-1 bg-[#065cc8] text-white font-subheading text-xs uppercase tracking-wider mb-2 border-2 border-[#c0efff] shadow-[3px_3px_0px_0px_#000]">
                        {member.codeName}
                      </div>

                      <h3 className="text-2xl font-heading font-semibold text-white group-hover:text-[#6dccec] transition-colors tracking-wide uppercase">
                        {member.name}
                      </h3>

                      <div className="text-xs font-subheading text-[#6dccec] uppercase tracking-wide mt-1">
                        {member.role} — {member.designation}
                      </div>

                      <div className="w-full h-1 bg-[#010101] my-4 border-b border-[#065cc8]/40" />

                      <p className="text-xs font-body font-light text-[#c0efff]/90 leading-relaxed italic bg-[#010101] p-3 border-2 border-[#065cc8] shadow-[3px_3px_0px_0px_#065cc8] line-clamp-3">
                        "{member.bio}"
                      </p>

                      {/* Contact Bar */}
                      <div className="mt-4 flex items-center justify-center sm:justify-start gap-3 font-subheading text-xs">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#010101] border-2 border-[#065cc8] text-[#6dccec] shadow-[2px_2px_0px_0px_#065cc8] hover:bg-[#065cc8] hover:text-white transition-all"
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
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#065cc8] border-2 border-[#c0efff] text-white shadow-[2px_2px_0px_0px_#000] hover:bg-[#6dccec] hover:text-black transition-all"
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
          </div>
        </section>


        {/* Industrial Hazard Stripe Interstitial */}
        <div className="w-full h-4 bg-[repeating-linear-gradient(45deg,#065cc8,#065cc8_14px,#010101_14px,#010101_28px)] border-y-2 border-[#065cc8] my-16 shadow-[4px_4px_0px_0px_#065cc8]" />


        {/* ================= LEVEL 2: CORE ================= */}
        <section className="my-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-4 w-4 bg-[#6dccec] shadow-[2px_2px_0px_0px_#000]" />
            <h2 className="font-heading text-lg sm:text-xl font-semibold text-white uppercase tracking-widest px-6 py-2.5 bg-[#05103a] border-4 border-[#065cc8] shadow-[6px_6px_0px_0px_#065cc8]">
              [ LEVEL 2 // EXECUTIVE CORE ]
            </h2>
            <div className="flex-1 h-1 bg-[repeating-linear-gradient(90deg,#065cc8,#065cc8_8px,transparent_8px,transparent_16px)]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {executiveCoreMembers.map((member, index) => {
              const isMatch = matchesSearch(member);
              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedNode(member)}
                  className={`relative bg-[#05103a] border-3 border-[#065cc8] p-4 group hover:border-[#c0efff] hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-[12px_12px_0px_0px_#6dccec] active:translate-x-0 active:translate-y-0 transition-all duration-150 cursor-pointer shadow-[6px_6px_0px_0px_#065cc8] flex flex-col justify-between ${
                    !isMatch ? 'opacity-25 blur-[1px]' : 'opacity-100'
                  }`}
                >
                  <CornerBrackets className="border-[#065cc8] group-hover:border-[#6dccec]" size="w-3 h-3" />
                  
                  <div>
                    {/* Square Image Box */}
                    <div className="relative aspect-square w-[70%] mx-auto bg-[#010101] border-3 border-[#065cc8] overflow-hidden mb-4 shadow-[4px_4px_0px_0px_#065cc8] group-hover:border-[#6dccec] transition-colors">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="crt-scanlines absolute inset-0 opacity-30 pointer-events-none z-0" />
                      <div className="absolute top-2 left-2 z-10">
                        <span className="px-2.5 py-1 text-[11px] font-subheading bg-[#065cc8] border border-[#c0efff] text-white shadow-[2px_2px_0px_0px_#000] uppercase tracking-wide">
                          {member.role}
                        </span>
                      </div>
                      <div className="absolute bottom-2 right-2 z-10">
                        <span className="px-2 py-0.5 text-[10px] font-subheading bg-[#010101] border border-[#6dccec] text-[#6dccec]">
                          {member.codeName}
                        </span>
                      </div>
                    </div>

                    {/* Info Section */}
                    <h3 className="text-xl font-heading font-semibold text-white group-hover:text-[#6dccec] transition-colors uppercase tracking-wide">
                      {member.name}
                    </h3>
                    
                    <p className="text-xs font-subheading text-[#6dccec] uppercase mt-0.5">
                      {member.category} COMMAND
                    </p>

                    {member.bio && (
                      <p className="text-[#c0efff]/90 text-xs mt-3 font-body font-light leading-relaxed line-clamp-3 bg-[#010101] p-2.5 border border-[#065cc8] shadow-[2px_2px_0px_0px_#065cc8]">
                        {member.bio}
                      </p>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-5 pt-3 border-t-2 border-[#010101] flex items-center justify-between">
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
                        className="p-2 bg-[#065cc8] border border-[#c0efff] text-white hover:bg-[#6dccec] hover:text-black transition-all shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#6dccec] hover:-translate-x-0.5 hover:-translate-y-0.5"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>


        {/* Bottom Brutalist Status Footer Bar */}
        <div className="relative max-w-7xl mx-auto mt-20 p-5 bg-[#05103a] border-4 border-[#065cc8] text-center font-subheading text-xs text-[#6dccec] shadow-[8px_8px_0px_0px_#065cc8]">
          <CornerBrackets className="border-[#6dccec]" size="w-3 h-3" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4">
            <span>[ PROTOCOL::LEVEL1_AND_LEVEL2_ONLY ]</span>
            <span className="text-white font-body font-light">S4DS TCET EXECUTIVE COMMAND 2025-26</span>
            <span className="text-white bg-[#065cc8] px-3 py-1 border border-[#c0efff] shadow-[2px_2px_0px_0px_#000]">[SYSTEM_ONLINE]</span>
          </div>
        </div>

      </div>


      {/* ================= INTERACTIVE HARSH NODE TERMINAL MODAL ================= */}
      <AnimatePresence>
        {selectedNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-xl bg-[#05103a] border-4 border-[#6dccec] p-6 sm:p-8 shadow-[16px_16px_0px_0px_#065cc8] text-slate-100"
            >
              <CornerBrackets className="border-[#c0efff]" size="w-4 h-4" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedNode(null)}
                className="absolute top-4 right-4 text-white bg-[#065cc8] border-2 border-[#c0efff] p-2 hover:bg-[#6dccec] hover:text-black shadow-[3px_3px_0px_0px_#000] transition-all cursor-pointer"
                aria-label="Close Inspector"
              >
                <X className="w-5 h-5 font-bold" />
              </button>

              {/* Terminal Header */}
              <div className="flex items-center gap-2 text-xs font-subheading text-[#6dccec] border-b-3 border-[#065cc8] pb-3 mb-6">
                <Terminal className="w-4 h-4 text-[#6dccec]" />
                <span>NODE INSPECTOR // {selectedNode.codeName || selectedNode.nodeId || 'EXECUTIVE_NODE'}</span>
              </div>

              {/* Modal Content */}
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <div className="w-32 h-32 shrink-0 bg-[#010101] border-3 border-[#065cc8] overflow-hidden shadow-[4px_4px_0px_0px_#065cc8]">
                  <img
                    src={selectedNode.image}
                    alt={selectedNode.name}
                    className="w-full h-full object-cover filter contrast-110"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left space-y-2">
                  <div className="inline-block px-3 py-1 bg-[#065cc8] border-2 border-[#c0efff] text-white text-xs font-subheading uppercase shadow-[3px_3px_0px_0px_#000]">
                    {selectedNode.codeName || selectedNode.role}
                  </div>

                  <h3 className="text-2xl font-heading font-semibold text-white uppercase tracking-wide">
                    {selectedNode.name}
                  </h3>

                  <p className="text-xs font-subheading text-[#6dccec] uppercase">
                    {selectedNode.role} {selectedNode.designation ? `— ${selectedNode.designation}` : ''}
                  </p>

                  <div className="text-xs text-[#c0efff] space-y-1 pt-2 font-subheading">
                    <div>&gt; ACCESS: <span className="text-white">{selectedNode.accessLevel || 'Full Command'}</span></div>
                    <div>&gt; STATUS: <span className="text-emerald-400 px-1.5 py-0.5 bg-emerald-950 border border-emerald-500">{selectedNode.status || 'ACTIVE'}</span></div>
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              {selectedNode.bio && (
                <div className="mt-6 p-4 bg-[#010101] border-3 border-[#065cc8] text-xs text-[#c0efff] leading-relaxed shadow-[4px_4px_0px_0px_#065cc8]">
                  <p className="italic font-body font-light text-sm">"{selectedNode.bio}"</p>
                </div>
              )}

              {/* Action Links */}
              <div className="mt-6 pt-4 border-t-3 border-[#065cc8] flex flex-wrap items-center justify-between gap-3 font-subheading">
                <div className="flex items-center gap-3">
                  {selectedNode.linkedin && (
                    <a
                      href={selectedNode.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#065cc8] border-2 border-[#c0efff] text-white text-xs shadow-[3px_3px_0px_0px_#000] hover:bg-[#6dccec] hover:text-black transition-all"
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
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#05103a] border-2 border-[#065cc8] text-[#c0efff] text-xs shadow-[3px_3px_0px_0px_#065cc8] hover:bg-[#065cc8] hover:text-white transition-all"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>

                {selectedNode.email && (
                  <a
                    href={`mailto:${selectedNode.email}`}
                    className="inline-flex items-center gap-1.5 text-xs text-[#6dccec] hover:text-white transition-colors bg-[#010101] px-3 py-1.5 border border-[#065cc8] font-body font-light"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{selectedNode.email}</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


