import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const benefits = [
  {
    number: '01',
    title: 'HACKATHONS',
    tagline: 'COMPETE. BUILD. SHIP.',
    description:
      'Challenge yourself through hackathons where ideas turn into working solutions, teams collaborate, and you learn by building.',
  },
  {
    number: '02',
    title: 'REAL-WORLD PROJECTS',
    tagline: 'TAKE IT BEYOND THE CLASSROOM.',
    description:
      'Work on practical projects that let you apply data science and AI to meaningful problems beyond routine academic assignments.',
  },
  {
    number: '03',
    title: 'NETWORKING',
    tagline: 'CONNECT WITH PEOPLE WHO BUILD.',
    description:
      'Meet students, seniors, mentors and professionals who share an interest in technology, creating opportunities to collaborate and grow.',
  },
  {
    number: '04',
    title: '1:1 MENTORSHIP',
    tagline: 'LEARN FROM PEOPLE AHEAD.',
    description:
      'Get personal guidance from experienced members and mentors who can help you navigate projects, skills and your journey in tech.',
  },
];

function OpportunityVisual({ active }) {
  const visuals = [
    // HACKATHONS
    <div className="relative min-h-[360px] overflow-hidden border-l border-zinc-800 pl-8">

      <div className="absolute top-0 left-0 font-mono text-[10px] tracking-[0.2em] text-zinc-600">
        01 / HACKATHONS
      </div>

      <div className="absolute inset-0 flex items-center justify-center">

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="relative w-56 h-56 border border-zinc-700"
        >
          <div className="absolute inset-6 border border-dashed border-zinc-700" />

          <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-700" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-zinc-700" />

          <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-cyan-400" />

          <motion.div
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 border border-cyan-400"
          />
        </motion.div>

      </div>

      <div className="absolute bottom-0 left-8 font-mono text-xs text-zinc-600">
        BUILD / BREAK / REPEAT
      </div>

    </div>,

    // REAL WORLD PROJECTS
    <div className="relative min-h-[360px] overflow-hidden border-l border-zinc-800 pl-8">

      <div className="absolute top-0 left-0 font-mono text-[10px] tracking-[0.2em] text-zinc-600">
        02 / REAL-WORLD PROJECTS
      </div>

      <div className="absolute inset-0 flex items-center justify-center">

        <div className="relative w-full max-w-md">

          <div className="font-mono text-[10px] text-zinc-600 mb-5">
            PROBLEM → MODEL → SOLUTION
          </div>

          <div className="space-y-8">

            {[0, 1, 2].map((item) => (
              <div key={item} className="relative">

                <div className="h-px bg-zinc-800" />

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: ['15%', '80%', '45%'] }}
                  transition={{
                    duration: 2.5,
                    delay: item * 0.3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  className="absolute top-0 left-0 h-px bg-blue-400"
                />

                <div className="mt-2 flex justify-between font-mono text-[9px] text-zinc-600">
                  <span>0{item + 1}</span>
                  <span>
                    {['DATA', 'MODEL', 'DEPLOY'][item]}
                  </span>
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

      <div className="absolute bottom-0 left-8 font-mono text-xs text-zinc-600">
        FROM THEORY → IMPACT
      </div>

    </div>,

    // NETWORKING
    <div className="relative min-h-[360px] overflow-hidden border-l border-zinc-800 pl-8">

      <div className="absolute top-0 left-0 font-mono text-[10px] tracking-[0.2em] text-zinc-600">
        03 / NETWORKING
      </div>

      <div className="absolute inset-0 flex items-center justify-center">

        <div className="relative w-64 h-52">

          <svg
            viewBox="0 0 256 208"
            className="absolute inset-0 w-full h-full"
          >
            <motion.line
              x1="128"
              y1="104"
              x2="35"
              y2="45"
              stroke="#27272A"
              strokeWidth="1"
            />

            <motion.line
              x1="128"
              y1="104"
              x2="220"
              y2="45"
              stroke="#27272A"
              strokeWidth="1"
            />

            <motion.line
              x1="128"
              y1="104"
              x2="40"
              y2="165"
              stroke="#27272A"
              strokeWidth="1"
            />

            <motion.line
              x1="128"
              y1="104"
              x2="216"
              y2="165"
              stroke="#27272A"
              strokeWidth="1"
            />
          </svg>

          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute left-1/2 top-1/2 w-5 h-5 -translate-x-1/2 -translate-y-1/2 bg-cyan-400"
          />

          {[
            'left-4 top-8',
            'right-4 top-8',
            'left-6 bottom-6',
            'right-6 bottom-6',
          ].map((position, index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -5, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2 + index * 0.2,
                repeat: Infinity,
              }}
              className={`absolute ${position} w-4 h-4 border border-zinc-500`}
            />
          ))}

        </div>

      </div>

      <div className="absolute bottom-0 left-8 font-mono text-xs text-zinc-600">
        PEOPLE / IDEAS / OPPORTUNITY
      </div>

    </div>,

    // MENTORSHIP
    <div className="relative min-h-[360px] overflow-hidden border-l border-zinc-800 pl-8">

      <div className="absolute top-0 left-0 font-mono text-[10px] tracking-[0.2em] text-zinc-600">
        04 / 1:1 MENTORSHIP
      </div>

      <div className="absolute inset-0 flex items-center justify-center">

        <div className="flex items-center gap-8">

          <div className="text-center">
            <div className="w-16 h-16 border border-zinc-600 flex items-center justify-center font-display text-2xl">
              M
            </div>

            <div className="font-mono text-[9px] text-zinc-600 mt-3">
              MENTOR
            </div>
          </div>

          <motion.div
            animate={{ width: ['30px', '80px', '30px'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-px bg-cyan-400"
          />

          <div className="text-center">
            <div className="w-16 h-16 border border-cyan-400 flex items-center justify-center font-display text-2xl">
              Y
            </div>

            <div className="font-mono text-[9px] text-zinc-600 mt-3">
              YOU
            </div>
          </div>

        </div>

      </div>

      <div className="absolute bottom-0 left-8 font-mono text-xs text-zinc-600">
        EXPERIENCE → DIRECTION
      </div>

    </div>,
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.35 }}
      >
        {visuals[active]}
      </motion.div>
    </AnimatePresence>
  );
}

export default function BenefitsOpportunities() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-[#070B16]">
        {/* Background */}
{/* Background */}
<div className="absolute inset-0 pointer-events-none overflow-hidden">

  {/* Dark blue atmosphere */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(30,64,175,0.16),transparent_45%),radial-gradient(circle_at_85%_75%,rgba(6,182,212,0.08),transparent_40%)]" />

  {/* Grain */}
  <div className="absolute inset-0 opacity-[0.035] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

  {/* Scanlines */}
  <div className="absolute inset-0 opacity-[0.02] bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_3px,rgba(255,255,255,0.35)_4px)]" />

  {/* Technical network */}
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.10]"
    viewBox="0 0 1200 700"
    preserveAspectRatio="none"
  >
    {/* connections */}
    <g stroke="rgba(96,165,250,0.35)" strokeWidth="1">
      <line x1="80" y1="120" x2="300" y2="230" />
      <line x1="300" y1="230" x2="520" y2="130" />
      <line x1="520" y1="130" x2="760" y2="270" />
      <line x1="760" y1="270" x2="1080" y2="160" />

      <line x1="180" y1="520" x2="420" y2="410" />
      <line x1="420" y1="410" x2="650" y2="520" />
      <line x1="650" y1="520" x2="900" y2="400" />
      <line x1="900" y1="400" x2="1120" y2="520" />

      <line x1="300" y1="230" x2="420" y2="410" />
      <line x1="760" y1="270" x2="900" y2="400" />
    </g>

    {/* nodes */}
    <g fill="rgba(103,232,249,0.55)">
      <circle cx="80" cy="120" r="2" />
      <circle cx="300" cy="230" r="3" />
      <circle cx="520" cy="130" r="2" />
      <circle cx="760" cy="270" r="3" />
      <circle cx="1080" cy="160" r="2" />

      <circle cx="180" cy="520" r="2" />
      <circle cx="420" cy="410" r="3" />
      <circle cx="650" cy="520" r="2" />
      <circle cx="900" cy="400" r="3" />
      <circle cx="1120" cy="520" r="2" />
    </g>

    {/* highlighted nodes */}
    <motion.circle
      cx="300"
      cy="230"
      r="5"
      fill="none"
      stroke="rgba(34,211,238,0.5)"
      strokeWidth="1"
      animate={{ r: [4, 12, 4], opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 3, repeat: Infinity }}
    />

    <motion.circle
      cx="900"
      cy="400"
      r="5"
      fill="none"
      stroke="rgba(59,130,246,0.5)"
      strokeWidth="1"
      animate={{ r: [4, 12, 4], opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 4, repeat: Infinity, delay: 1 }}
    />
  </svg>

  {/* Faint technical text */}
  <div className="absolute top-32 right-10 font-mono text-[9px] tracking-[0.3em] text-blue-300 opacity-[0.12]">
    DATA / NETWORK / BUILD
  </div>

  

</div>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="font-mono text-xs tracking-[0.2em] text-zinc-500 mb-6">
            BENEFITS + OPPORTUNITIES
          </div>

          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl leading-[0.9] tracking-tight text-white">
           WHY JOIN
           <br />
           S4DS?
           </h2>

          <div className="font-mono text-xs text-zinc-500 mt-8 tracking-widest">
            LEARN → BUILD → CONNECT → GROW
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16">

          <div>
            {benefits.map((benefit, index) => {
              const isActive = active === index;

              return (
                <motion.div
                  key={benefit.number}
                  onMouseEnter={() => setActive(index)}
                  className="border-t border-zinc-800 cursor-pointer"
                >
                  <div className="py-7">
                    <div className="flex gap-6">

                      <span className="font-mono text-xs text-zinc-600 pt-2 w-6">
                        {benefit.number}
                      </span>

                      <div className="flex-1">
                        <div className="flex justify-between gap-4">
                          <h3
                            className={`font-display text-2xl md:text-4xl transition-colors duration-300 ${
                              isActive
                                ? 'text-white'
                                : 'text-zinc-500'
                            }`}
                          >
                            {benefit.title}
                          </h3>

                          <motion.span
                            animate={{
                              rotate: isActive ? 45 : 0,
                            }}
                            className="font-mono text-xl text-cyan-400"
                          >
                            +
                          </motion.span>
                        </div>

                        <div className="font-mono text-[10px] text-zinc-600 tracking-wider mt-2">
                          {benefit.tagline}
                        </div>

                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <p className="font-body text-sm md:text-base text-zinc-400 leading-relaxed max-w-xl mt-5">
                                {benefit.description}
                              </p>

                              <div className="font-mono text-[10px] text-cyan-400 mt-5 tracking-widest">
                                EXPLORE →
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <div className="border-t border-zinc-800" />
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24">
              <OpportunityVisual active={active} />
            </div>
          </div>

        </div>


      </div>
    </section>
  );
}