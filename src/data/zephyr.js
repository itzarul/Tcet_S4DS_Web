// ============================================================
// ZEPHYR 2025 — "Cosmic Gateway" | TCET's Annual Tech Fest
// Data extracted from the official Zephyr 2025 brochure &
// zephyr-techfest.dev. Fest organized by TSDW (est. 2004).
// Images can be dropped into /public/zephyr and referenced
// via the optional `image` field on each event.
// ============================================================

export const zephyrMeta = {
  edition: "Zephyr 2025",
  theme: "Cosmic Gateway",
  organizedBy: "TSDW — Thakur Student Development Welfare",
  dates: "25, 26 & 27 September 2025",
  datesShort: "25–27 Sept 2025",
  time: "10:00 AM – 4:00 PM",
  venue: "TCET Campus, Kandivali East, Mumbai",
  estYear: 2004,
  totalEvents: 58,
  instagram: "https://www.instagram.com/zephyr_tcet/",
  website: "https://www.zephyr-techfest.dev/",
  email: "technicalteamtsdw@gmail.com",
  about:
    "Ever since it was first organized in 2004, Zephyr has been the most awaited event among the students of Thakur College of Engineering and Technology. This technical festival provides students a platform to enhance their technical skills — with workshops on in-demand technology, gaming tournaments and fun events. The theme of Zephyr '25 is Cosmic Gateway: a radiant portal shimmering with cosmic energy, opening the universe's doors to innovation and discovery.",
  // Drop fest photos here (public/zephyr/...) and they will render in the gallery strip.
  gallery: [],
};

// Category config — drives the filter tabs & section styling on /zephyr
export const zephyrCategories = [
  {
    id: "all",
    label: "All Events",
    accent: "text-white",
    chip: "bg-white/10 border-white/30 text-white",
  },
  {
    id: "workshop",
    label: "Workshops",
    accent: "text-cyan-300",
    chip: "bg-cyan-500/15 border-cyan-400/40 text-cyan-300",
  },
  {
    id: "technical",
    label: "Technical",
    accent: "text-amber-300",
    chip: "bg-amber-500/15 border-amber-400/40 text-amber-300",
  },
  {
    id: "fun",
    label: "Fun Events",
    accent: "text-fuchsia-300",
    chip: "bg-fuchsia-500/15 border-fuchsia-400/40 text-fuchsia-300",
  },
  {
    id: "egaming",
    label: "E-Gaming",
    accent: "text-violet-300",
    chip: "bg-violet-500/15 border-violet-400/40 text-violet-300",
  },
  {
    id: "mini",
    label: "Mini Events",
    accent: "text-emerald-300",
    chip: "bg-emerald-500/15 border-emerald-400/40 text-emerald-300",
  },
];

// ---------------- FULL EVENT CATALOG (from brochure) ----------------
// prize: null => "—" (certificates / goodies instead)
export const zephyrEvents = [
  // ================= WORKSHOPS =================
  { id: "content-creation", name: "Content Creation Workshop", category: "workshop", prize: null, team: "Individual", date: "25 Sep", fee: "₹100", blurb: "Learn the craft of digital storytelling — scripting, shooting and editing content that travels." },
  { id: "technical-seminar", name: "Technical Seminar", category: "workshop", prize: "₹1,000", team: "Individual", date: "25–27 Sep", fee: "₹70/120", blurb: "Expert-led sessions on frontier technology, delivered across all three days of the fest." },
  { id: "dance-workshop", name: "Dance Workshop", category: "workshop", prize: "Certificates", team: "Individual", date: "25–27 Sep", fee: "₹150", blurb: "Move with the cosmos — a high-energy workshop culminating in certificates for all participants." },
  { id: "garba-workshop", name: "Garba Workshop", category: "workshop", prize: null, team: "Individual", date: "25 & 27 Sep", fee: "₹200", blurb: "Traditional Garba steps meets fest energy. Learn the dandiya routine from the pros." },
  { id: "3d-printing", name: "3D Printing Workshop", category: "workshop", prize: "Certificates", team: "Individual", date: "26 Sep", fee: "₹200", blurb: "From CAD model to physical object — hands-on session on the full 3D printing pipeline." },
  { id: "technical-event-ws", name: "Technical Hands-on Event", category: "workshop", prize: null, team: "Individual", date: "26 Sep", fee: "Free", blurb: "A free-to-enter technical build session — walk in curious, walk out having built something." },
  { id: "art-workshop", name: "Art Workshop", category: "workshop", prize: "₹2,000", team: "Individual", date: "25 & 26 Sep", fee: "₹225", blurb: "Glow-art and creative expression session with prizes for the finest cosmic creations." },
  { id: "ai-iot", name: "Workshop on AI–IoT", category: "workshop", prize: "₹2,000", team: "Individual", date: "25 Sep", fee: "₹100", blurb: "Bridge the physical and digital worlds — sensors, automation and applied AI in one session." },

  // ================= TECHNICAL EVENTS =================
  { id: "ideathon", name: "Ideathon", category: "technical", prize: "₹30,000 (kind)", team: "2/3/4", date: "25 & 27 Sep", fee: "₹50", blurb: "The flagship big-pool idea sprint — pitch world-changing concepts to the jury panel.", featured: true },
  { id: "gen-ai-workshop", name: "Gen-AI Workshop", category: "technical", prize: null, team: "Individual", date: "25 Sep", fee: "₹100", blurb: "Prompt engineering to production — a guided deep-dive into generative AI tooling." },
  { id: "space-blitz", name: "Space Blitz", category: "technical", prize: "₹2,000", team: "Individual", date: "25–27 Sep", fee: "₹130", blurb: "A fast-paced cosmic tech challenge — think quick, answer quicker, the blitz waits for no one." },
  { id: "project-presentation", name: "Project Presentation", category: "technical", prize: "₹4,500", team: "Upto 4", date: "25–27 Sep", fee: "₹100", blurb: "Showcase your builds to faculty and industry judges — projects, prototypes and papers." },
  { id: "anomaly", name: "Anomaly", category: "technical", prize: "₹4,000", team: "Solo", date: "25–27 Sep", fee: "₹60", blurb: "Hunt the glitch in the system — a solo puzzle event for pattern-spotters and problem-solvers." },
  { id: "canvasphere", name: "Canvasphere", category: "technical", prize: "Goodies", team: "Individual", date: "25–27 Sep", fee: "₹50", blurb: "Where code meets canvas — a creative tech-art event with goodies for the winners." },
  { id: "ctf", name: "Capture The Flag", category: "technical", prize: "₹5,000", team: "1/2", date: "25–27 Sep", fee: "₹60", blurb: "The classic CTF — exploit, decrypt and escalate your way through the flag chain.", featured: true },
  { id: "tech-hunt", name: "Tech Hunt", category: "technical", prize: "₹1,000", team: "3", date: "25–27 Sep", fee: "₹100", blurb: "A treasure hunt through tech trivia and campus checkpoints — solve fast, move faster." },
  { id: "cad-competition", name: "CAD Competition", category: "technical", prize: "₹5,000", team: "Individual", date: "27 Sep", fee: "₹200", blurb: "Precision drafting showdown — model the given part faster and cleaner than the field." },

  // ================= FUN EVENTS =================
  { id: "haunted-house", name: "Haunted House", category: "fun", prize: "₹3,000", team: "4", date: "25–27 Sep", fee: "₹100", blurb: "Enter the anomaly zone — survive the scares with your squad of four and claim the prize." },
  { id: "arm-wrestling", name: "Arm Wrestling", category: "fun", prize: "₹3,000", team: "Individual", date: "25–27 Sep", fee: "₹30", blurb: "Raw strength, one table, zero excuses. The oldest competition in the universe." },
  { id: "squid-game", name: "Squid Game", category: "fun", prize: "₹2,000", team: "Individual", date: "25–27 Sep", fee: "₹40", blurb: "Red light, green light — fest-famous mini games straight out of the hit series." },
  { id: "gel-blaster", name: "Gel Blaster", category: "fun", prize: "Goodies", team: "4", date: "25–27 Sep", fee: "₹300", blurb: "Squad vs squad foam-blaster skirmishes across the arena — gear up and hold the line." },
  { id: "ar-cricket", name: "AR Cricket", category: "fun", prize: "₹3,000", team: "Individual", date: "25–27 Sep", fee: "₹150", blurb: "Augmented-reality batting — time your shots on the virtual pitch for the top score." },
  { id: "neon-football", name: "Neon Football", category: "fun", prize: "₹3,000", team: "Solo/Duo", date: "25–27 Sep", fee: "₹70/120", blurb: "UV-lit table football under blacklights — the glow makes every goal look cinematic." },
  { id: "escapee-arena", name: "Escapee-Arena", category: "fun", prize: "₹5,000", team: "Solo/Duo", date: "25–27 Sep", fee: "₹120/200", blurb: "Crack codes, find keys and beat the countdown — the big-pool escape room experience." },
  { id: "mystery-room", name: "Mystery Room", category: "fun", prize: "₹3,000", team: "4", date: "25–27 Sep", fee: "₹250", blurb: "A locked room, twelve clues and one way out. Teamwork is the only cheat code." },
  { id: "scavengers-hunt", name: "Scavengers Hunt", category: "fun", prize: "₹3,000", team: "4", date: "25–27 Sep", fee: "₹200", blurb: "Riddles scattered across the campus — your team of four against the clock." },
  { id: "power-show", name: "Power Show", category: "fun", prize: "₹3,000", team: "Individual", date: "25–27 Sep", fee: "₹100", blurb: "Feats of strength and stamina — individual bracket, roaring crowd." },
  { id: "mystery-maze", name: "Mystery Maze", category: "fun", prize: "₹7,500", team: "2/4", date: "25–27 Sep", fee: "₹160/280", blurb: "The giant maze returns — twists, dead-ends and a massive pool for the fastest crews." },
  { id: "takeshis-castle", name: "Takeshi's Castle", category: "fun", prize: "₹7,000", team: "2/4", date: "25–27 Sep", fee: "₹170/300", blurb: "Wacky obstacle gauntlet inspired by the cult classic — fall funny, win big." },
  { id: "box-cricket", name: "Box Cricket", category: "fun", prize: "₹9,000 worth", team: "7", date: "25–27 Sep", fee: "₹400", blurb: "Seven-a-side cage cricket — the biggest team event on the card with the richest prizes." },
  { id: "rink-football", name: "Rink Football", category: "fun", prize: "₹3,500", team: "5+2", date: "25–27 Sep", fee: "₹450", blurb: "Five plus two on a tight rink — quick feet, quick goals, no offside excuses." },
  { id: "neon-cricket", name: "Neon Cricket", category: "fun", prize: "₹2,500", team: "5", date: "25–27 Sep", fee: "₹250", blurb: "Cricket under UV — glowing stumps, glowing balls, glowing celebrations." },
  { id: "cricket-auction", name: "Cricket Auction", category: "fun", prize: "₹3,000", team: "5", date: "25–27 Sep", fee: "₹300", blurb: "Bid, bluff and build your dream squad with a fixed purse — IPL-style mini auction." },
  { id: "simulator", name: "Racing Simulator", category: "fun", prize: "₹4,000", team: "Solo/Duo", date: "25–27 Sep", fee: "₹200", blurb: "Full cockpit racing sim — fastest lap takes the pool. Wheel-to-wheel and clean." },
  { id: "neon-mania", name: "Neon Mania", category: "fun", prize: "₹3,000", team: "Solo", date: "25–27 Sep", fee: "₹120", blurb: "A blackout arena lit only by neon — reflex games where the glow decides the winner." },
  { id: "bowling", name: "Bowling", category: "fun", prize: "₹2,000", team: "Solo", date: "25–27 Sep", fee: "₹120", blurb: "Ten frames, one lane, all nerve. Strike your way up the leaderboard." },
  { id: "skribble", name: "Skribble", category: "fun", prize: "₹2,000", team: "Solo", date: "25–27 Sep", fee: "₹100", blurb: "Draw fast, guess faster — Pictionary-style chaos on the big screen." },
  { id: "tug-of-war", name: "Tug Of War", category: "fun", prize: "₹5,000", team: "5+1 / 7+1", date: "25–27 Sep", fee: "₹300/400", blurb: "The classic rope war — squad strength plus one captain pulling for glory." },
  { id: "standup-comedy", name: "Standup Comedy", category: "fun", prize: null, team: "Solo", date: "25–27 Sep", fee: "₹350", blurb: "Take the open mic — five minutes to make a full hall forget their problems." },
  { id: "glow-carrom", name: "Glow Carrom", category: "fun", prize: "₹3,500", team: "Solo", date: "25–27 Sep", fee: "₹150", blurb: "The board game you grew up with — remastered in UV glow." },

  // ================= E-GAMING =================
  { id: "valorant", name: "Valorant", category: "egaming", prize: "₹18,000", team: "5", date: "25–27 Sep", fee: "₹400", blurb: "The biggest LAN title of the fest — five-stacks clash for the richest gaming pool." },
  { id: "bgmi-classic", name: "BGMI (Classic)", category: "egaming", prize: "₹12,000", team: "4", date: "25–27 Sep", fee: "₹200", blurb: "Full-squad battle royale lobbies — drop smart, rotate smart, survive the zone." },
  { id: "codm-tdm", name: "CODM (TDM)", category: "egaming", prize: "₹8,000", team: "4", date: "25–27 Sep", fee: "₹200", blurb: "Team Deathmatch, pure gunskill — no rotations, just frags." },
  { id: "freefire-br", name: "Free Fire (BR Classic)", category: "egaming", prize: "₹8,000", team: "4+1", date: "25–27 Sep", fee: "₹200", blurb: "Squad battle royale with a substituted fifth — fast drops and faster fights." },
  { id: "freefire-classic", name: "Free Fire", category: "egaming", prize: "₹7,000", team: "2/4", date: "25–27 Sep", fee: "₹130/250", blurb: "Duo and squad lobbies — the classic clash royale of the mobile arena." },
  { id: "fifa-ps5", name: "FIFA (PS5)", category: "egaming", prize: "₹3,000", team: "Individual", date: "25–27 Sep", fee: "₹150", blurb: "1v1 football gaming bracket — silky skills and last-minute winners on PS5." },
  { id: "wwe-console", name: "WWE 2K (Console)", category: "egaming", prize: "₹3,000", team: "Individual", date: "25–27 Sep", fee: "₹50", blurb: "Rumble on the big screen — table-topping finishers in a single-elimination bracket." },
  { id: "bgmi-tdm", name: "BGMI (TDM)", category: "egaming", prize: "₹2,000", team: "5", date: "25–27 Sep", fee: "₹150", blurb: "Warehouse TDM brawls — respawn, re-peek, repeat till the kill target falls." },
  { id: "rocket-league", name: "Rocket League", category: "egaming", prize: "₹1,500", team: "Individual", date: "25–27 Sep", fee: "₹100", blurb: "Rocket-powered car football — aerials, flicks and overtime screamers." },
  { id: "efootball", name: "eFootball", category: "egaming", prize: "₹1,000", team: "Individual", date: "25–27 Sep", fee: "₹60", blurb: "Mobile football 1v1s — quick ties, quicker revenge matches." },
  { id: "stumble-guys", name: "Stumble Guys", category: "egaming", prize: "₹1,500", team: "Individual", date: "25–27 Sep", fee: "₹60", blurb: "Thirty-two stumble into the arena, one stumbles out crowned. Absolute chaos." },

  // ================= MINI EVENTS =================
  { id: "catch-the-baton", name: "Catch The Baton", category: "mini", prize: "₹1,000", team: "Individual", date: "25–27 Sep", fee: "₹60", blurb: "Lightning relay duels — grab, dash and don't drop." },
  { id: "arcade-game", name: "Arcade Game", category: "mini", prize: "₹1,000", team: "Individual", date: "25–27 Sep", fee: "₹50", blurb: "Classic cabinet challenges — chase the high score the old-school way." },
  { id: "bullseye-dart", name: "Bullseye Dart", category: "mini", prize: "Coupons", team: "Solo", date: "25–27 Sep", fee: "₹30", blurb: "Three darts, one target — land the treble, walk away with coupons." },
  { id: "dart-football", name: "Dart Football", category: "mini", prize: "Goodies", team: "Solo", date: "25–27 Sep", fee: "₹40", blurb: "Velcro darts meets football targets — stick it in the corners for goodies." },
  { id: "neon-dodgeball", name: "Neon Dodgeball", category: "mini", prize: null, team: "Individual", date: "25–27 Sep", fee: "₹60", blurb: "Dodge, duck, dip under UV light — last one standing takes the arena." },
  { id: "vintage-photobooth", name: "Vintage Photo Booth", category: "mini", prize: null, team: "Solo/Group", date: "25–27 Sep", fee: "₹100", blurb: "The fest-favourite retro booth — instant Polaroid souvenirs from the cosmic gateway." },
  { id: "murderer-among-us", name: "Murderer Among Us", category: "mini", prize: "₹2,000", team: "Solo/Group", date: "25–27 Sep", fee: "₹60", blurb: "Live social deduction — find the impostor before the crew runs out." },
];

// ---------------- FEST CONTACTS (from brochure back page) ----------------
export const zephyrContacts = [
  { name: "Akshat Prasad", phone: "+91 9987330273" },
  { name: "Srishti Srivastava", phone: "+91 9082414734" },
  { name: "Pooja Swamy", phone: "+91 7039419451" },
  { name: "Taran Shetty", phone: "+91 7045851407" },
  { name: "Chirayu Mishra", phone: "+91 9920660432" },
  { name: "Tanvi Kotian", phone: "+91 8452801821" },
  { name: "Sahil Keluskar", phone: "+91 9969461707" },
  { name: "Tanmay Tiwari", phone: "+91 9175955132" },
  { name: "Ahtesham Ali Khan", phone: "+91 9152026104" },
  { name: "Siddharth Thakare", phone: "+91 7385265895" },
  { name: "Suryakant Maurya", phone: "+91 9821430779" },
  { name: "Pallavi Jha", phone: "+91 7304603452" },
];

// ---------------- ADVISORS (from zephyr-techfest.dev) ----------------
export const zephyrAdvisors = [
  { name: "Neel Jain", role: "Outreach Advisory", phone: "+91 7020976545" },
  { name: "Amitabh Dwivedi", role: "Technical Advisory", phone: "+91 8429051078" },
];

// Stats strip for the hero
export const zephyrStats = [
  { value: "2004", label: "Running Since" },
  { value: "58", label: "Events" },
  { value: "3", label: "Days" },
  { value: "₹1.5L+", label: "Total Prize Pool" },
];
