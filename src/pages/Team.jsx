import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { hodData, facultyInchargeData, coreTeam, juniorCoreTeam } from '../data/team';
import TeamCard from '../components/TeamCard';
import { Linkedin, Mail, Quote, Sparkles, Award, Search, Users } from 'lucide-react';

export default function Team() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');

  const filteredCore = coreTeam.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.bio.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="pt-28 pb-20 relative z-10">
      {/* Section 1: Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>LEADERSHIP & MENTORSHIP BOARD</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight"
        >
          Meet Our <span className="text-gradient-primary">Leadership Team</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto"
        >
          Faculty mentors and 14 student executive board members driving technological innovation, data science research, and national hackathons at TCET Mumbai.
        </motion.p>
      </section>

      {/* Section 2: Head of Department */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 sm:p-12 rounded-3xl bg-zinc-900/60 border border-blue-500/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8 group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Large Circular Image */}
          <div className="relative shrink-0 w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-blue-500/40 p-1 bg-zinc-950 shadow-xl group-hover:border-blue-400 transition-colors">
            <img
              src={hodData.image}
              alt={hodData.name}
              className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* HOD Bio */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Head of Department</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {hodData.name}
            </h2>
            <p className="text-xs font-mono text-zinc-400 mt-1">
              {hodData.designation} — {hodData.department}
            </p>

            <div className="mt-4 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 relative">
              <Quote className="w-6 h-6 text-blue-500/30 absolute -top-3 left-4" />
              <p className="text-zinc-300 text-sm sm:text-base italic leading-relaxed pt-1">
                "{hodData.message}"
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4">
              <a
                href={hodData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-semibold hover:bg-blue-600 hover:text-white transition-all"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href={`mailto:${hodData.email}`}
                className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{hodData.email}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 3: Faculty Incharge */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 sm:p-12 rounded-3xl bg-zinc-900/60 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8 group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Large Circular Image */}
          <div className="relative shrink-0 w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-cyan-500/40 p-1 bg-zinc-950 shadow-xl group-hover:border-cyan-400 transition-colors">
            <img
              src={facultyInchargeData.image}
              alt={facultyInchargeData.name}
              className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Faculty Bio */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Faculty Incharge</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {facultyInchargeData.name}
            </h2>
            <p className="text-xs font-mono text-zinc-400 mt-1">
              {facultyInchargeData.designation} — {facultyInchargeData.department}
            </p>

            <div className="mt-4 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 relative">
              <Quote className="w-6 h-6 text-cyan-500/30 absolute -top-3 left-4" />
              <p className="text-zinc-300 text-sm sm:text-base italic leading-relaxed pt-1">
                "{facultyInchargeData.message}"
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4">
              <a
                href={facultyInchargeData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold hover:bg-cyan-600 hover:text-white transition-all"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href={`mailto:${facultyInchargeData.email}`}
                className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>{facultyInchargeData.email}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Search & Filter Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Users className="w-5 h-5 text-blue-400" />
            <span>Executive Board Directory ({coreTeam.length} Members)</span>
          </div>

          <div className="w-full sm:w-72 relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search member or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Section 4: Core Team Grid (14 Roles) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {filteredCore.length === 0 ? (
          <div className="text-center py-16 bg-zinc-900/40 rounded-3xl border border-zinc-800">
            <p className="text-zinc-400 text-sm">No team member matches "{searchQuery}".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCore.map((member, index) => (
              <TeamCard key={member.id} member={member} delay={index * 0.04} />
            ))}
          </div>
        )}
      </section>

      {/* Section 5: Junior Core */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
            <span>ASSOCIATE BOARD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Junior Core Members
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Emerging leads managing technical executions and social outreach.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {juniorCoreTeam.map((member, index) => (
            <TeamCard key={member.id} member={member} delay={index * 0.06} />
          ))}
        </div>
      </section>
    </div>
  );
}
