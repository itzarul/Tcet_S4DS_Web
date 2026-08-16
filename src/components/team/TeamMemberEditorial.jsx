import React, { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Linkedin, Github, Mail } from "lucide-react";
import { useReducedMotion } from "./useReducedMotion";

const EASE = [0.16, 1, 0.3, 1];

/* =========================================================
   PORTRAIT
   Used by Faculty / HOD only
   ========================================================= */

function Portrait({ member, sizeClass, reduced }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [30, -30],
  );

  return (
    <div ref={ref} className={`team-member-portrait ${sizeClass}`}>
      <motion.div
        className="team-member-portrait-clip"
        initial={
          reduced
            ? false
            : {
                clipPath: "inset(100% 0 0 0)",
              }
        }
        whileInView={{
          clipPath: "inset(0% 0 0 0)",
        }}
        viewport={{
          once: true,
          margin: "100px",
        }}
        transition={{
          duration: 1,
          ease: EASE,
        }}
      >
        <motion.div
          className="team-member-portrait-inner"
          initial={
            reduced
              ? false
              : {
                  scale: 1.03,
                  y: 40,
                }
          }
          whileInView={{
            scale: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "100px",
          }}
          transition={{
            duration: 1.1,
            ease: EASE,
          }}
        >
          <motion.img
            src={member.image}
            alt={member.name}
            loading="lazy"
            style={{ y: imageY }}
            whileHover={
              reduced
                ? {}
                : {
                    scale: 1.04,
                  }
            }
            transition={{
              duration: 0.6,
              ease: EASE,
            }}
          />

          <div className="team-member-portrait-overlay" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* =========================================================
   TEAM MEMBER
   ========================================================= */

export default function TeamMemberEditorial({
  member,
  index,
  period = "2025–26",
  showBio = true,

  /*
    default  = Faculty / HOD original design
    editorial = Current Team new editorial design
  */
  variant = "default",
}) {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  const reduced = useReducedMotion();

  /* Used only for Faculty / HOD */
  const isReversed = index % 2 === 1;

  /* Portrait sizing for Faculty / HOD */
  const sizeClass =
    index % 3 === 0
      ? "team-member-portrait--lg"
      : index % 3 === 1
        ? "team-member-portrait--md"
        : "";

  const displayIndex = String(index + 1).padStart(2, "0");

  const role = member.role || member.designation;

  /* =========================================================
     TEXT ANIMATION
     ========================================================= */

  const textAnim = (delay) =>
    reduced
      ? {}
      : {
          initial: {
            opacity: 0,
            y: 20,
          },

          animate: inView
            ? {
                opacity: 1,
                y: 0,
              }
            : {
                opacity: 0,
                y: 20,
              },

          transition: {
            duration: 0.75,
            ease: EASE,
            delay,
          },
        };

  /* Hover state for editorial variant */
  const [isHovered, setIsHovered] = useState(false);

  /* =========================================================
     CURRENT TEAM — EDITORIAL DESIGN
     
     This branch is used only when:
     
     <TeamMemberEditorial
       variant="editorial"
     />
     ========================================================= */

  if (variant === "editorial") {
    return (
      <article 
        ref={ref} 
        className="team-member team-member--editorial"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* -----------------------------------------------
            LEFT SIDE
            Index + Role + Department
            ----------------------------------------------- */}

        <motion.div className="team-member-meta" {...textAnim(0.05)}>
          <span className="team-member-index" aria-hidden="true">
            {displayIndex}
          </span>

          <div className="team-member-tags">
            {role && <span className="team-member-tag">{role}</span>}

            {member.department && (
              <span className="team-member-tag">{member.department}</span>
            )}
          </div>
        </motion.div>

        {/* -----------------------------------------------
            RIGHT SIDE
            Large Member Name + Socials
            ----------------------------------------------- */}

        <div className="team-member-name-wrap flex-col items-end justify-center gap-2 py-4">
          <motion.h3 className="team-member-name" {...textAnim(0.12)}>
            {member.name}
          </motion.h3>

          {/* Social Links for Editorial Variant */}
          <motion.div 
            className="flex items-center gap-3 mt-1"
            {...textAnim(0.2)}
          >
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-[#8CA0C4] hover:text-[#4FA8F5] transition-colors p-1"
                aria-label={`${member.name} on LinkedIn`}
              >
                <Linkedin size={18} />
              </a>
            )}
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noreferrer"
                className="text-[#8CA0C4] hover:text-[#4FA8F5] transition-colors p-1"
                aria-label={`${member.name} on GitHub`}
              >
                <Github size={18} />
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="text-[#8CA0C4] hover:text-[#4FA8F5] transition-colors p-1"
                aria-label={`Email ${member.name}`}
              >
                <Mail size={18} />
              </a>
            )}
          </motion.div>
        </div>

        {/* -----------------------------------------------
            HOVER-BASED POPUP IMAGE
            ----------------------------------------------- */}
        <AnimatePresence>
          {isHovered && member.image && !reduced && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 30 }}
                transition={{ duration: 0.35, type: "spring", bounce: 0.3 }}
                className="w-[240px] h-[300px] sm:w-[400px] sm:h-[520px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(46,143,255,0.3)] bg-[#0D1730]"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* -----------------------------------------------
            Accessibility information
            ----------------------------------------------- */}

        <span className="sr-only">
          {role && `${role}. `}
          {member.department && `${member.department}. `}
          {period && `${period}. `}
          {showBio && member.bio && member.bio}
          {member.message && ` ${member.message}`}
        </span>
      </article>
    );
  }

  /* =========================================================
     FACULTY / HOD — ORIGINAL DESIGN
     
     This is used when variant is NOT "editorial".
     
     Faculty/HOD from Team.jsx do not pass variant,
     so they automatically use this layout.
     ========================================================= */

  return (
    <article
      ref={ref}
      className={`team-member ${isReversed ? "team-member--reversed" : ""}`}
    >
      {/* -----------------------------------------------
          MEMBER INDEX
          ----------------------------------------------- */}

      <motion.span
        className="team-member-index"
        {...textAnim(0.05)}
        aria-hidden="true"
      >
        {displayIndex}
      </motion.span>

      {/* -----------------------------------------------
          MEMBER PORTRAIT
          ----------------------------------------------- */}

      <Portrait member={member} sizeClass={sizeClass} reduced={reduced} />

      {/* -----------------------------------------------
          MEMBER CONTENT
          ----------------------------------------------- */}

      <div className="team-member-content">
        {/* Role */}

        <motion.p className="team-member-role" {...textAnim(0.2)}>
          {role}
        </motion.p>

        {/* Header: Name + Links */}

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-2 sm:mb-0">
          <motion.h3 className="team-member-name" style={{ marginBottom: 0 }} {...textAnim(0.32)}>
            {member.name}
          </motion.h3>

          {(member.linkedin || member.github || member.email) && (
            <motion.div className="flex items-center justify-end gap-4 text-[#8CA0C4] shrink-0 mt-2 sm:mt-0" {...textAnim(0.32)}>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="hover:text-[#4FA8F5] transition-colors"
                >
                  <Linkedin size={22} />
                </a>
              )}
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${member.name} on GitHub`}
                  className="hover:text-[#4FA8F5] transition-colors"
                >
                  <Github size={22} />
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  aria-label={`Email ${member.name}`}
                  className="hover:text-[#4FA8F5] transition-colors"
                >
                  <Mail size={22} />
                </a>
              )}
            </motion.div>
          )}
        </div>

        {/* Period */}

        <motion.p className="team-member-period" {...textAnim(0.42)}>
          {period}
        </motion.p>

        {/* Department */}

        {member.department && (
          <motion.p className="team-member-dept" {...textAnim(0.48)}>
            {member.department}
          </motion.p>
        )}

        {/* Bio */}

        {showBio && member.bio && (
          <motion.p className="team-member-bio" {...textAnim(0.54)}>
            {member.bio}
          </motion.p>
        )}

        {/* Message / Quote */}

        {member.message && (
          <motion.p
            className="team-member-bio team-member-bio--quote"
            {...textAnim(0.54)}
          >
            &ldquo;{member.message}&rdquo;
          </motion.p>
        )}


      </div>
    </article>
  );
}
