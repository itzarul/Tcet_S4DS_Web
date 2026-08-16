import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Mail } from "lucide-react";

export default function TeamCard({ member, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      className="group relative rounded-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 shadow-xl shadow-black/50 flex flex-col justify-between"
    >
      {/* Subtle Glow Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Image Container with Zoom */}
      <div className="relative aspect-[4/4] sm:aspect-[4/4] overflow-hidden bg-zinc-950">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent opacity-80" />

        {/* Role Pill Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-zinc-950/80 border border-blue-500/40 text-blue-400 backdrop-blur-md shadow-md">
            {member.role}
          </span>
        </div>
      </div>

      {/* Content Info */}
      <div className="p-6 relative z-10 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {member.name}
          </h3>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">
            {member.category || "Core Leadership"}
          </p>

          {member.bio && (
            <p className="text-zinc-400 text-xs sm:text-sm mt-3 leading-relaxed line-clamp-3">
              {member.bio}
            </p>
          )}
        </div>

        {/* Action Links & Fixed LinkedIn Icon at Bottom-Right */}
        <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono">
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="hover:text-blue-400 transition-colors flex items-center gap-1"
                title={member.email}
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="hidden ">Contact</span>
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

          {/* LinkedIn Icon anchored bottom-right */}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} LinkedIn Profile`}
              className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-500/30 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all shadow-md group/btn"
            >
              <Linkedin className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
