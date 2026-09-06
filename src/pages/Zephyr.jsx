import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, Calendar, MapPin, Trophy, Users, Ticket, Rocket, Gamepad2,
  Wrench, FlaskConical, PartyPopper, Zap, Phone, Mail, Globe, Instagram,
  ArrowRight, ArrowLeft, ChevronDown, BadgeCheck, Star, Radio,
} from 'lucide-react';
import {
  zephyrMeta, zephyrCategories, zephyrEvents, zephyrContacts, zephyrAdvisors, zephyrStats,
} from '../data/zephyr';
import { zephyrEventImages, zephyrBanner } from '../data/zephyrEventImages';
import { zephyrStockImages } from '../data/zephyrStockImages';

const CATEGORY_ICONS = {
  workshop: Wrench,
  technical: FlaskConical,
  fun: PartyPopper,
  egaming: Gamepad2,
  mini: Zap,
};

const CATEGORY_LABELS = {
  workshop: 'Workshop',
  technical: 'Technical',
  fun: 'Fun Event',
  egaming: 'E-Gaming',
  mini: 'Mini Event',
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

function EventRow({ ev, index }) {
  const Icon = CATEGORY_ICONS[ev.category] || Sparkles;
  const [open, setOpen] = useState(false);

  const img = zephyrEventImages[ev.id];
  const stock = zephyrStockImages[ev.id];
  const realPhoto = (img && !img.src.endsWith('generic.jpg') ? img.src : null) || stock?.src || null;

  const Thumb = realPhoto ? (
    <img
      src={realPhoto}
      alt={ev.name}
      loading="lazy"
      className="shrink-0 w-14 h-11 sm:w-16 sm:h-12 rounded-lg object-cover border border-white/15"
    />
  ) : (
    <div className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center border ${zephyrCategories.find(c => c.id === ev.category)?.chip || 'border-white/20 bg-white/5 text-white'}`}>
      <Icon className="w-5 h-5" />
    </div>
  );

  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.4) }}
      className="group"
    >
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-violet-400/40 hover:bg-white/[0.05]"
      >
        <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5">
          {Thumb}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold text-white truncate">
                {ev.name}
              </h3>
              {ev.featured && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 border border-amber-400/40 text-amber-300 flex items-center gap-1">
                  <Star className="w-2.5 h-2.5 fill-amber-300" /> POPULAR
                </span>
              )}
            </div>
            <div className="mt-1 flex items-center gap-3 text-[11px] font-mono text-zinc-400">
              <span className="hidden sm:inline">{CATEGORY_LABELS[ev.category]}</span>
              <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {ev.team}</span>
              <span className="hidden md:flex items-center gap-1"><Calendar className="w-3 h-3" /> {ev.date}</span>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-end gap-0.5 shrink-0">
            <span className="text-sm font-bold text-gradient-gold">{ev.prize || 'Goodies'}</span>
            <span className="text-[11px] font-mono text-zinc-500">Entry: {ev.fee}</span>
          </div>
          <div className="md:hidden shrink-0 text-right">
            <span className="text-sm font-bold text-gradient-gold">{ev.prize || 'Goodies'}</span>
          </div>

          <ChevronDown className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </div>

        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="border-t border-white/5"
          >
            {realPhoto && (
              <div className="relative h-52 sm:h-64 overflow-hidden">
                <img src={realPhoto} alt={ev.name} loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-zinc-950/85 border border-amber-500/40 text-amber-300 backdrop-blur-md">
                    🏆 {ev.prize || 'Goodies / Certificates'}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-zinc-950/85 border border-cyan-500/40 text-cyan-300 backdrop-blur-md">
                    Entry: {ev.fee}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-zinc-950/85 border border-white/20 text-zinc-200 backdrop-blur-md">
                    Team: {ev.team}
                  </span>
                  {stock && !img?.src?.endsWith(realPhoto) && (
                    <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-[10px] font-mono bg-zinc-950/70 border border-white/10 text-zinc-400 backdrop-blur-md ml-auto">
                      📷 {stock.credit.split('·')[0].trim().slice(0, 28)}
                    </span>
                  )}
                </div>
              </div>
            )}
            {!realPhoto && (
              <div className={`relative h-24 overflow-hidden flex items-center px-5 gap-4 border-b border-white/10 ${zephyrCategories.find(c => c.id === ev.category)?.chip || ''}`}>
                <div className="absolute inset-0 bg-cyber-grid opacity-40" />
                <Icon className="relative w-10 h-10" />
                <div className="relative">
                  <div className="font-heading text-xl font-black text-white tracking-wide">{ev.name.toUpperCase()}</div>
                  <div className="text-[10px] font-mono text-white/70">{CATEGORY_LABELS[ev.category].toUpperCase()} · ZEPHYR 2025</div>
                </div>
              </div>
            )}
            <div className="px-4 sm:px-5 pb-5">
              <p className="text-sm text-zinc-300 leading-relaxed mt-3">{ev.blurb}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-cyan-400" /> {ev.date}</span>
                <span className="flex items-center gap-1.5"><Ticket className="w-3.5 h-3.5 text-cyan-400" /> {ev.fee}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function Zephyr() {
  const [activeTab, setActiveTab] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return zephyrEvents.filter((ev) => {
      const matchesTab = activeTab === 'all' || ev.category === activeTab;
      const matchesQuery = ev.name.toLowerCase().includes(query.toLowerCase());
      return matchesTab && matchesQuery;
    });
  }, [activeTab, query]);

  const counts = useMemo(() => {
    const c = { all: zephyrEvents.length };
    zephyrEvents.forEach((e) => { c[e.category] = (c[e.category] || 0) + 1; });
    return c;
  }, []);

  return (
    <div className="zephyr-page relative">
      {/* Ambient CRT overlays (scoped) */}
      <div className="fixed inset-0 zephyr-scanlines pointer-events-none z-20" />
      <div className="fixed inset-0 zephyr-vignette pointer-events-none z-20" />

      <div className="pt-28 pb-20 relative z-10">
        {/* ================= HERO ================= */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-b-[3rem]">
            {/* Fest photo backdrop (scene-matched) */}
            {zephyrBanner && (
              <>
                <img
                  src={zephyrBanner?.src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-25"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#090D16]/60 via-[#090D16]/85 to-[#090D16]" />
              </>
            )}
            {/* cosmic portal glow */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full bg-violet-600/20 blur-[120px] animate-pulse-glow" />
            <div className="absolute left-1/4 top-20 w-72 h-72 rounded-full bg-cyan-500/10 blur-[100px]" />
            <div className="absolute right-1/4 top-24 w-72 h-72 rounded-full bg-fuchsia-500/10 blur-[100px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono mb-6"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>TRANSMISSION LIVE · COSMIC GATEWAY</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-5xl sm:text-7xl md:text-8xl font-black tracking-tight zephyr-glitch"
          >
            <span className="text-gradient-primary">ZEPHYR</span>{' '}
            <span className="text-gradient-gold">2025</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-zinc-300 text-lg sm:text-xl font-subheading tracking-wide"
          >
            ✦ Cosmic Gateway ✦
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-3 text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto"
          >
            TCET's flagship technical festival, organized by {zephyrMeta.organizedBy}.
            Three days of workshops, competitions, gaming arenas and fun — where ideas ignite.
          </motion.p>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto"
          >
            {zephyrStats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md py-4 px-2">
                <div className="text-2xl sm:text-3xl font-black text-gradient-gold font-heading">{s.value}</div>
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#zephyr-events"
              className="px-7 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition-transform shadow-xl shadow-blue-600/30 flex items-center gap-2"
            >
              <Rocket className="w-4 h-4" />
              <span>Explore {counts.all}+ Events</span>
            </a>
            <a
              href={zephyrMeta.instagram}
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3.5 rounded-2xl font-bold text-sm text-white border border-white/20 bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Instagram className="w-4 h-4 text-cyan-300" />
              <span>@zephyr_tcet</span>
            </a>
          </motion.div>
        </section>

        {/* ================= ABOUT / THEME ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            {/* Brochure poster */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 flex items-center justify-center"
            >
              <div className="relative animate-float">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-violet-600/30 to-cyan-500/20 blur-2xl animate-pulse-glow" />
                <img
                  src="/zephyr/brochure-cover.jpg"
                  alt="Zephyr 2025 — Cosmic Gateway official brochure cover"
                  className="relative w-56 sm:w-64 rounded-2xl border border-white/20 shadow-2xl shadow-violet-900/50"
                />
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-zinc-950/90 border border-amber-500/40 text-amber-300 whitespace-nowrap">
                  OFFICIAL BROCHURE '25
                </span>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7 sm:p-9"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-[11px] font-mono mb-5">
                <Sparkles className="w-3 h-3" /> ABOUT THE FEST
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-heading">
                A gateway to innovation since <span className="text-gradient-primary">2004</span>
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">{zephyrMeta.about}</p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2.5 text-zinc-300">
                  <Calendar className="w-4 h-4 text-cyan-400 shrink-0" /> {zephyrMeta.dates}
                </div>
                <div className="flex items-center gap-2.5 text-zinc-300">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" /> {zephyrMeta.venue}
                </div>
                <div className="flex items-center gap-2.5 text-zinc-300">
                  <Ticket className="w-4 h-4 text-cyan-400 shrink-0" /> On-spot & online registrations
                </div>
                <div className="flex items-center gap-2.5 text-zinc-300">
                  <Globe className="w-4 h-4 text-cyan-400 shrink-0" /> Open to all colleges
                </div>
              </div>
            </motion.div>

            {/* Advisors / meta card */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-5 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7 sm:p-9"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono mb-5">
                <BadgeCheck className="w-3 h-3" /> MISSION CONTROL
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-bold text-white mb-4 font-heading">Fest Advisories</h3>
                  <div className="space-y-3">
                    {zephyrAdvisors.map((a) => (
                      <div key={a.name} className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                        <div>
                          <div className="text-sm font-bold text-white">{a.name}</div>
                          <div className="text-[11px] font-mono text-zinc-500">{a.role}</div>
                        </div>
                        <a href={`tel:${a.phone.replace(/\s/g, '')}`} className="text-xs font-mono text-cyan-300 hover:text-cyan-200 flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2 flex flex-col justify-center gap-2.5 text-sm">
                  <a href={`mailto:${zephyrMeta.email}`} className="flex items-center gap-2.5 text-zinc-300 hover:text-white transition-colors">
                    <Mail className="w-4 h-4 text-fuchsia-300" /> {zephyrMeta.email}
                  </a>
                  <a href={zephyrMeta.website} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-zinc-300 hover:text-white transition-colors">
                    <Globe className="w-4 h-4 text-fuchsia-300" /> zephyr-techfest.dev
                  </a>
                  <span className="flex items-center gap-2.5 text-zinc-400">
                    <BadgeCheck className="w-4 h-4 text-emerald-400" /> Organized by {zephyrMeta.organizedBy}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= EVENTS CATALOG ================= */}
        <section id="zephyr-events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-300 text-xs font-mono mb-4">
              <Gamepad2 className="w-3.5 h-3.5" /> FULL EVENT CATALOG
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
              Pick Your <span className="text-gradient-primary">Arena</span>
            </h2>
            <p className="text-zinc-400 text-sm mt-3 max-w-xl mx-auto">
              {counts.all} events across five categories — tap any row for prize pool, team size, entry fee and schedule.
            </p>
          </div>

          {/* Filter tabs + search */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {zephyrCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer border ${
                    activeTab === cat.id
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-lg shadow-blue-600/30'
                      : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white hover:border-white/25'
                  }`}
                >
                  {cat.label}
                  <span className={`ml-1.5 ${activeTab === cat.id ? 'text-blue-200' : 'text-zinc-600'}`}>
                    {counts[cat.id] || 0}
                  </span>
                </button>
              ))}
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events…"
              className="w-full sm:w-64 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-violet-400/50 transition-colors"
            />
          </div>

          {/* Event rows */}
          <div className="space-y-2.5">
            {filtered.map((ev, i) => (
              <EventRow key={ev.id} ev={ev} index={i} />
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-16 text-zinc-500 font-mono text-sm">
                <Radio className="w-8 h-8 mx-auto mb-3 opacity-40" />
                No events match your search — try another signal.
              </div>
            )}
          </div>
        </section>

        {/* ================= CONTACTS ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-xl p-7 sm:p-10"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-mono mb-3">
                <Phone className="w-3 h-3" /> CREW CHANNELS
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                Questions? Call the <span className="text-gradient-gold">Crew</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {zephyrContacts.map((c) => (
                <a
                  key={c.name}
                  href={`tel:${c.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.06] transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600/40 to-cyan-500/30 border border-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white truncate">{c.name}</div>
                    <div className="text-[11px] font-mono text-zinc-500 group-hover:text-cyan-300 transition-colors">{c.phone}</div>
                  </div>
                </a>
              ))}
            </div>
            <p className="text-center text-xs font-mono text-zinc-500 mt-6">
              Organized by {zephyrMeta.organizedBy} · {zephyrMeta.venue}
            </p>
          </motion.div>
        </section>

        {/* ================= BACK TO EVENTS ================= */}
        <div className="text-center mt-16">
          <a
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to S4DS Events
          </a>
        </div>
      </div>
    </div>
  );
}
