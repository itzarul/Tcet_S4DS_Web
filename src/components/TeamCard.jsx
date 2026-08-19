import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Mail } from 'lucide-react';

function CornerBrackets({ className = "border-zinc-600", size = "w-2.5 h-2.5" }) {
  return (
    <>
      <span className={`absolute top-0 left-0 border-t-2 border-l-2 ${className} ${size}`} />
      <span className={`absolute top-0 right-0 border-t-2 border-r-2 ${className} ${size}`} />
      <span className={`absolute bottom-0 left-0 border-b-2 border-l-2 ${className} ${size}`} />
      <span className={`absolute bottom-0 right-0 border-b-2 border-r-2 ${className} ${size}`} />
    </>
  );
}

export default function TeamCard({ member, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="group relative bg-[#091124] border-2 border-blue-600 p-4 overflow-hidden hover:border-sky-400 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#38bdf8] transition-all duration-300 shadow-[4px_4px_0px_0px_#1d4ed8] flex flex-col justify-between font-body font-light"
    >
      <CornerBrackets className="border-blue-500 group-hover:border-sky-300" size="w-3 h-3" />

      {/* Image Container */}
      <div className="relative aspect-square w-[70%] mx-auto overflow-hidden bg-[#040814] border-2 border-blue-500 mb-4 shadow-[2px_2px_0px_0px_#1d4ed8]">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-[#040814]/20 to-transparent opacity-80" />
        <div className="crt-scanlines absolute inset-0 opacity-30 pointer-events-none" />

        {/* Role Badge Box */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 text-[11px] font-subheading bg-blue-600 border border-blue-300 text-white shadow-[2px_2px_0px_0px_#000] uppercase tracking-wide">
            {member.role}
          </span>
        </div>
      </div>

      {/* Content Info */}
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-heading font-semibold text-white group-hover:text-sky-300 transition-colors uppercase tracking-wide">
            {member.name}
          </h3>
          <p className="text-xs text-sky-400 font-subheading mt-0.5">
            {member.category || "Core Leadership"}
          </p>

          {member.bio && (
            <p className="text-sky-200/80 text-xs mt-3 font-body font-light leading-relaxed line-clamp-3">
              {member.bio}
            </p>
          )}
        </div>

        {/* Action Links */}
        <div className="mt-5 pt-3 border-t-2 border-blue-900 flex items-center justify-between">
          <div className="flex items-center gap-3 text-sky-300 text-xs font-subheading">
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="hover:text-white transition-colors flex items-center gap-1.5 font-body font-light"
                title={member.email}
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Contact</span>
              </a>
            )}
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noreferrer"
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
              aria-label={`${member.name} LinkedIn Profile`}
              className="p-2 bg-blue-600 border border-blue-300 text-white hover:bg-blue-500 transition-all shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#38bdf8] hover:-translate-x-0.5 hover:-translate-y-0.5 group/btn"
            >
              <Linkedin className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

