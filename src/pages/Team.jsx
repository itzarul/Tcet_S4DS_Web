import React, { useEffect, useRef, useCallback } from 'react';
import { Linkedin, Github, Mail, ExternalLink } from 'lucide-react';
import { hodData, facultyInchargeData, coreTeam, juniorCoreTeam } from '../data/team';

/* ──────────────────────────────────────────────
   Intersection Observer hook
   Adds .is-visible to observed elements on scroll
   ────────────────────────────────────────────── */
function useScrollReveal(rootMargin = '0px 0px -60px 0px', threshold = 0.15) {
  const observerRef = useRef(null);
  const observedSet = useRef(new Set());

  // Create observer once, lazily
  const getObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observerRef.current?.unobserve(entry.target);
              observedSet.current.delete(entry.target);
            }
          });
        },
        { rootMargin, threshold }
      );
    }
    return observerRef.current;
  }, [rootMargin, threshold]);

  // Ref callback — observes each element immediately when mounted
  const register = useCallback(
    (el) => {
      if (el && !observedSet.current.has(el)) {
        observedSet.current.add(el);
        getObserver().observe(el);
      }
    },
    [getObserver]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      observedSet.current.clear();
    };
  }, []);

  return register;
}

/* ──────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────── */
const ROLE_COLOR_MAP = {
  Chairperson: 'amber',
  'Vice Chairperson': 'amber',
  Secretary: 'rose',
  Treasurer: 'rose',
  'Technical Head': 'blue',
  'Events Head': 'purple',
  'Creative Head': 'purple',
  'Public Relations Head': 'cyan',
  'Marketing Head': 'cyan',
  'Design Head': 'purple',
  'Content Head': 'blue',
  'Operations Head': 'rose',
  'Community Head': 'cyan',
  'Sponsorship Head': 'amber',
};

function getTagColor(role, category) {
  if (category === 'Junior Core') return 'cyan';
  return ROLE_COLOR_MAP[role] || 'blue';
}

/* ──────────────────────────────────────────────
   Sub-components
   ────────────────────────────────────────────── */

/** Hero title with word-by-word reveal */
function HeroTitle({ text, observe }) {
  const words = text.split(' ');
  return (
    <h1 className="team-hero-title" ref={observe}>
      {words.map((word, i) => (
        <span className="word" key={i}>
          <span
            className="word-inner"
            style={{ transitionDelay: `${0.08 + i * 0.06}s` }}
          >
            {word}
          </span>
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </h1>
  );
}

/** Section heading (label + title + optional description) */
function SectionHeader({ label, title, description, observe }) {
  return (
    <div className="team-section-header">
      <p className="team-section-label" ref={observe}>
        {label}
      </p>
      <div>
        <h2 className="team-section-title" ref={observe}>
          {title}
        </h2>
        {description && (
          <p className="team-section-desc" ref={observe}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

/** Advisory card for HOD & Faculty Incharge */
function AdvisoryCard({ person, observe }) {
  return (
    <div className="team-advisory-card" ref={observe}>
      <div className="team-advisory-portrait">
        <img src={person.image} alt={person.name} loading="lazy" />
      </div>
      <h3 className="team-advisory-name">{person.name}</h3>
      <p className="team-advisory-designation">{person.designation}</p>
      {person.message && (
        <p className="team-advisory-message">{person.message}</p>
      )}
      {(person.linkedin || person.email) && (
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          {person.linkedin && (
            <a
              href={person.linkedin}
              target="_blank"
              rel="noreferrer"
              className="team-item-link"
              aria-label={`${person.name} LinkedIn`}
            >
              <Linkedin />
            </a>
          )}
          {person.email && (
            <a
              href={`mailto:${person.email}`}
              className="team-item-link"
              aria-label={`Email ${person.name}`}
            >
              <Mail />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

/** Single team list item row */
function TeamListItem({ member, observe }) {
  const color = getTagColor(member.role, member.category);

  return (
    <li className="team-list-item" ref={observe}>
      <div className="team-list-item-inner">
        {/* Left: tags + name + bio + links */}
        <div className="team-item-content">
          <div className="team-item-tags">
            <span className={`team-tag team-tag--${color}`}>
              {member.role}
            </span>
            {member.category && (
              <span className="team-tag team-tag--filled">
                {member.category}
              </span>
            )}
          </div>

          <p className="team-item-name">{member.name}</p>

          {member.bio && <p className="team-item-bio">{member.bio}</p>}

          <div className="team-item-links">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="team-item-link"
                aria-label={`${member.name} LinkedIn`}
              >
                <Linkedin />
              </a>
            )}
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noreferrer"
                className="team-item-link"
                aria-label={`${member.name} GitHub`}
              >
                <Github />
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="team-item-link"
                aria-label={`Email ${member.name}`}
              >
                <Mail />
              </a>
            )}
          </div>
        </div>

        {/* Right: portrait */}
        <div className="team-item-portrait">
          <img src={member.image} alt={member.name} loading="lazy" />
        </div>
      </div>

      {/* Bottom separator */}
      <div className="team-separator" />
    </li>
  );
}

/* ──────────────────────────────────────────────
   Main Page
   ────────────────────────────────────────────── */
export default function Team() {
  const observe = useScrollReveal();

  const totalMembers = coreTeam.length + juniorCoreTeam.length;

  return (
    <div className="pt-20 pb-12 relative z-10">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* ─── Hero ─── */}
        <section className="team-hero">
          <p className="team-hero-label" ref={observe}>
            Our People
          </p>

          <HeroTitle
            text="Meet the minds behind S4DS"
            observe={observe}
          />

          <p className="team-hero-desc" ref={observe}>
            The organising committee powering innovation, events, and
            community across data science at TCET — dedicated people
            who turn ideas into impact.
          </p>
        </section>

        {/* ─── Advisory Board ─── */}
        <section>
          <SectionHeader
            label="Advisory"
            title="Faculty Mentors"
            description="Institutional oversight guiding the committee's vision and mission."
            observe={observe}
          />
          <div className="team-advisory-grid">
            <AdvisoryCard person={hodData} observe={observe} />
            <AdvisoryCard person={facultyInchargeData} observe={observe} />
          </div>
        </section>

        {/* ─── Core Team ─── */}
        <section>
          <SectionHeader
            label="Core Team"
            title="Those who make it happen"
            description="Leadership and department heads driving every initiative forward."
            observe={observe}
          />

          <div className="team-list-top-separator" ref={observe} />
          <ul className="team-list">
            {coreTeam.map((member) => (
              <TeamListItem
                key={member.id}
                member={member}
                observe={observe}
              />
            ))}
          </ul>
        </section>

        {/* ─── Junior Core ─── */}
        <section style={{ marginTop: '2rem' }}>
          <SectionHeader
            label="Junior Core"
            title="The next wave"
            description="Rising talent learning the ropes and scaling operations."
            observe={observe}
          />

          <div className="team-list-top-separator" ref={observe} />
          <ul className="team-list">
            {juniorCoreTeam.map((member) => (
              <TeamListItem
                key={member.id}
                member={member}
                observe={observe}
              />
            ))}
          </ul>
        </section>

        {/* ─── Footer ─── */}
        <div className="team-footer" ref={observe}>
          <p className="team-footer-text">
            {totalMembers} members · S4DS TCET · 2025–26
          </p>
        </div>
      </div>
    </div>
  );
}
