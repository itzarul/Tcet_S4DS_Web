import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Github, Search } from 'lucide-react';

export function SystemStatusBar() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[10px] sm:text-xs font-terminal text-zinc-500 uppercase tracking-wider">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <span>
          <span className="text-blue-400/70">SYS.LOC:</span> S4DS.TCET
        </span>
        <span>
          <span className="text-blue-400/70">STATUS:</span>{' '}
          <span className="status-active">OPTIMAL</span>
        </span>
        <span>
          <span className="text-blue-400/70">NODES:</span> ACTIVE
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 sm:text-right">
        <span className="text-zinc-600">[DAT:::STREAM::0x0F]</span>
        <span className="text-cyan-400/60">ENCRYPTED CONNECTION</span>
      </div>
    </div>
  );
}

export function LevelHeader({ level, title, subtitle }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <span className="font-terminal text-[10px] sm:text-xs text-blue-400/80 tracking-widest">
          LEVEL {level}:
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 via-zinc-700/50 to-transparent" />
      </div>
      <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide uppercase">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-1 text-xs font-terminal text-zinc-500">{subtitle}</p>
      )}
    </div>
  );
}

export function TerminalFrame({ children, className = '', variant = 'blue' }) {
  const frameClass = variant === 'cyan' ? 'terminal-frame terminal-frame-cyan' : 'terminal-frame';
  return (
    <div className={`${frameClass} ${className}`}>
      <span className="corner-bl" aria-hidden="true" />
      <span className="corner-br" aria-hidden="true" />
      {children}
    </div>
  );
}

export function AdvisoryNode({ person, role, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex flex-col items-center group"
    >
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-zinc-700/80 group-hover:border-blue-400/60 transition-colors duration-300">
        <img
          src={person.image}
          alt={person.name}
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-full" />
      </div>
      <TerminalFrame className="mt-4 px-4 py-2.5 min-w-[160px] text-center group-hover:bg-blue-500/5 transition-colors">
        <p className="font-terminal text-xs text-white">{person.name}</p>
        <p className="font-terminal text-[10px] text-zinc-500 mt-0.5 uppercase">{role}</p>
      </TerminalFrame>
      <div className="mt-3 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
        {person.linkedin && (
          <a
            href={person.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-500 hover:text-blue-400 transition-colors"
            aria-label={`${person.name} LinkedIn`}
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>
        )}
        {person.email && (
          <a
            href={`mailto:${person.email}`}
            className="text-zinc-500 hover:text-cyan-400 transition-colors"
            aria-label={`Email ${person.name}`}
          >
            <Mail className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function LeadershipCard({ member, nodeId, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      className="group"
    >
      <TerminalFrame className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 hover:bg-blue-500/[0.03] transition-colors duration-300">
        <div className="shrink-0 w-full sm:w-28 h-28 overflow-hidden bg-zinc-950 border border-zinc-800">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-terminal text-[10px] text-zinc-600 space-y-0.5 mb-3">
            <p>
              <span className="text-blue-400/60">ACCESS:</span> Root
            </p>
            <p>
              <span className="text-blue-400/60">ID:</span> {nodeId}
            </p>
            <p>
              <span className="text-blue-400/60">STATUS:</span>{' '}
              <span className="status-active">&gt; Active</span>
            </p>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
            {member.name}
          </h3>
          <p className="font-terminal text-xs text-cyan-400/80 mt-0.5 uppercase tracking-wide">
            {member.role}
          </p>
          {member.bio && (
            <p className="text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed line-clamp-2">
              {member.bio}
            </p>
          )}
          <div className="mt-4 flex items-center gap-3">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="font-terminal text-[10px] text-zinc-500 hover:text-blue-400 transition-colors flex items-center gap-1"
              >
                <Linkedin className="w-3 h-3" />
                LINK
              </a>
            )}
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-500 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="font-terminal text-[10px] text-zinc-500 hover:text-cyan-400 transition-colors flex items-center gap-1"
              >
                <Mail className="w-3 h-3" />
                MAIL
              </a>
            )}
          </div>
        </div>
      </TerminalFrame>
    </motion.div>
  );
}

export function NodeHeadCard({ member, dept, nodeId, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="group"
    >
      <TerminalFrame
        variant="cyan"
        className="p-4 flex flex-col items-center text-center hover:bg-cyan-500/[0.04] transition-colors duration-300 h-full"
      >
        <div className="w-14 h-14 rounded-full overflow-hidden border border-zinc-700 mb-3 group-hover:border-cyan-400/50 transition-colors">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <p className="font-terminal text-[10px] text-cyan-400/70 underline underline-offset-4 decoration-cyan-500/30">
          {dept}
        </p>
        <p className="font-terminal text-[10px] text-zinc-600 mt-1">Node Head</p>
        <p className="text-sm font-semibold text-white mt-2 group-hover:text-cyan-300 transition-colors">
          {member.name}
        </p>
        <p className="font-terminal text-[9px] text-zinc-600 mt-1">{nodeId}</p>
      </TerminalFrame>
    </motion.div>
  );
}

export function OperationRecord({ member, nodeId, status = 'Active', delay = 0 }) {
  const statusClass = status === 'Active' ? 'status-active' : 'status-standby';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className="group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[120px_1fr_auto] items-center gap-3 sm:gap-4 py-3 px-3 sm:px-4 border-b border-zinc-800/60 hover:bg-blue-500/[0.03] transition-colors"
    >
      <span className="font-terminal text-[10px] sm:text-xs text-zinc-600 group-hover:text-blue-400/70 transition-colors truncate">
        {nodeId}
      </span>
      <div className="min-w-0">
        <p className="text-sm text-white font-medium truncate group-hover:text-blue-200 transition-colors">
          {member.name}
        </p>
        <p className="font-terminal text-[10px] text-zinc-500 truncate">{member.role}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className={`font-terminal text-[10px] ${statusClass}`}>
          &gt; {status}
        </span>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-blue-400 transition-all"
            aria-label={`${member.name} LinkedIn`}
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function TerminalSearch({ value, onChange, count }) {
  return (
    <TerminalFrame className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="font-terminal text-xs text-zinc-400">
        <span className="text-blue-400/70">REGISTRY:</span> {count} NODES LOADED
      </div>
      <div className="relative w-full sm:w-80">
        <Search className="w-3.5 h-3.5 text-zinc-600 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="query --filter=name,role..."
          className="w-full pl-9 pr-4 py-2 bg-zinc-950/80 border border-zinc-800 text-xs font-terminal text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors"
        />
      </div>
    </TerminalFrame>
  );
}

export function generateNodeId(role, index) {
  const abbrev = role
    .replace(/Head|Chairperson|Vice Chairperson|Secretary|Treasurer|Associate /gi, '')
    .trim()
    .split(/\s+/)
    .map((w) => w.slice(0, 4).toUpperCase())
    .join('_')
    .slice(0, 8);

  const prefix =
    role.includes('Chairperson') || role.includes('Vice')
      ? 'C'
      : role.includes('Associate') || role.includes('Junior')
        ? 'AS'
        : 'OP';

  const num = String(index + 1).padStart(2, '0');
  return `${prefix}_${abbrev || 'NODE'}_${num}`;
}
