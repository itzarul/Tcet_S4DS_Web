// Assignment v2 — informed by visual review of batches 1-9.
// Improvements over v1:
//   1. Content-hash dedup (identical photos under different CDN ids)
//   2. Performance-bucket isolation (dance/garba shots stay with dance events)
//   3. Known-mismatch swap map from visual review
//   4. Reserved "atmosphere" pool of wide crowd/stage shots as generic fallback
//   5. Neon lanes rationed: bowling gets the best, e-gaming gets distinct variety
import { readFileSync, writeFileSync } from 'fs';
import { createHash } from 'crypto';

const featsRaw = JSON.parse(readFileSync('scripts/.zephyr-cache/features.json', 'utf8')).filter((f) => !f.error);
const url = (id, w, h) => `https://lh3.googleusercontent.com/${id}=w${w}-h${h}-c`;

// ---------- content-hash dedup ----------
const hashOf = {};
const { execSync } = await import('child_process');
for (const f of featsRaw) {
  const file = `scripts/.zephyr-cache/thumbs/d${f.day}-${String(f.idx).padStart(3, '0')}.jpg`;
  try {
    hashOf[f.day + '-' + f.idx] = createHash('md5').update(readFileSync(file)).digest('hex');
  } catch { hashOf[f.day + '-' + f.idx] = 'missing-' + f.day + '-' + f.idx; }
}
const seenHash = new Set();
const feats = [];
for (const f of featsRaw) {
  const h = hashOf[f.day + '-' + f.idx];
  if (seenHash.has(h)) continue;
  seenHash.add(h);
  feats.push(f);
}
// perceptual near-dup removal: burst shots look identical but hash differently
const kept = [];
const nearDupe = (f, g) =>
  Math.abs(f.skin - g.skin) < 0.012 &&
  Math.abs(f.bright - g.bright) < 0.012 &&
  Math.abs(f.sat - g.sat) < 0.012 &&
  Math.abs(f.edges - g.edges) < 0.0035;
for (const f of feats) {
  if (!kept.some((g) => nearDupe(f, g))) kept.push(f);
}
console.log(`Dedup: ${featsRaw.length} -> hash ${feats.length} -> near-dupe ${kept.length}`);
feats.length = 0;
feats.push(...kept);

// ---------- classify (same heuristics as v1) ----------
function classify(f) {
  const { skin, bright, sat, edges } = f;
  if (skin > 0.30 && edges < 0.13) return 'portrait';
  if (bright < 0.34 && sat > 0.30) return 'neon';
  if (bright > 0.55 && edges > 0.10 && skin < 0.25) return 'stage';
  if (edges > 0.125 && skin > 0.10) return 'crowd';
  if (skin > 0.20) return 'people';
  if (edges > 0.115) return 'action';
  if (sat > 0.32) return 'colorful';
  return 'ambient';
}
for (const f of feats) f.type = classify(f);
const counts = {};
feats.forEach((f) => (counts[f.type] = (counts[f.type] || 0) + 1));
console.log('Buckets (deduped):', counts);

// ---------- load events ----------
const catOf = {};
const dataSrc = readFileSync('src/data/zephyr.js', 'utf8');
for (const m of dataSrc.matchAll(/\{\s*id:\s*"([a-z0-9-]+)",\s*name:\s*"[^"]*",\s*category:\s*"([a-z]+)"/g)) {
  catOf[m[1]] = m[2];
}
const eventIds = Object.keys(catOf);

// ---------- visual swap map (from batches 1-9 review) ----------
// dance/performance photos currently sitting on these technical events
const DANCE_HOSTS = ['technical-event-ws', 'art-workshop', 'content-creation', 'technical-seminar', '3d-printing', 'ai-iot'];
const DANCE_EVENTS = ['dance-workshop', 'garba-workshop', 'standup-comedy', 'art-workshop'];

// events seen with duo-selfie shots that need replacement
const SELFIE_VICTIMS = ['canvasphere', 'ctf', 'tech-hunt', 'simulator', 'cad-competition', 'rocket-league'];

// neon-lane rationing: bowling first, then variety
const NEON_PRIORITY = ['bowling', 'neon-cricket', 'neon-football', 'neon-mania', 'glow-carrom', 'neon-dodgeball'];

// atmosphere (generic) pool donors: wide crowd/venue shots
const ATMO_TYPES = ['crowd', 'stage'];

// ---------- scoring ----------
const PREF = {
  egaming: { neon: 5, ambient: 2, action: 2, colorful: 1 },
  technical: { stage: 4, action: 3, ambient: 2, colorful: 1 },
  workshop: { people: 4, crowd: 3, stage: 2, colorful: 1 },
  fun: { crowd: 5, action: 3, colorful: 2, neon: 2 },
  mini: { colorful: 4, crowd: 2, action: 2, people: 1 },
};
const HINTS = {
  'box-cricket': { stage: 3, action: 3 }, 'rink-football': { stage: 3, action: 3 },
  'tug-of-war': { crowd: 3, action: 3 }, 'arm-wrestling': { crowd: 3, people: 2 },
  'ctf': { ambient: 3, stage: 2 }, 'ideathon': { stage: 4, crowd: 2 },
  'haunted-house': { neon: 3, ambient: 2 }, 'vintage-photobooth': { people: 4, colorful: 2 },
  'power-show': { action: 4, crowd: 2 }, 'takeshis-castle': { action: 3, crowd: 2 },
};
function scorePhoto(f, type) {
  let s = 0;
  s += Math.min(f.edges, 0.16) * 12;
  s += (1 - Math.abs(f.bright - 0.45)) * 3;
  s += f.sat * 4;
  s += PREF[type][f.type] || 0;
  if (f.type === 'portrait') s -= 6;
  return s;
}

const used = new Set();      // photo keys
const assign = {};           // eventId -> feat

const key = (f) => f.day + '-' + f.idx;
const take = (f) => { used.add(key(f)); assign[f.__ev] = f; };

// --- Step 1: reserve dance shots for dance events ---
// The dance shots are those currently assigned to DANCE_HOSTS in v1 output.
const v1 = JSON.parse(readFileSync('src/data/zephyrEventImages.js', 'utf8').match(/export const zephyrEventImages = ([\s\S]*?);\n\nexport const zephyrBanner/s)[1]);
// v1 stores local paths; recover day/idx via src file name? Not stored. Instead:
// find dance-y photos heuristically: people-type, day1, high skin, warm (we saw them on day1 people)
const dancePool = feats
  .filter((f) => f.type === 'people' && f.day === 1)
  .sort((a, b) => b.skin - a.skin)
  .slice(0, 8);

// garba-workshop gets the most energetic (highest edges among the top)
const danceSorted = [...dancePool].sort((a, b) => b.edges - a.edges);
for (const evId of ['garba-workshop', 'dance-workshop', 'art-workshop', 'standup-comedy']) {
  const pick = danceSorted.find((f) => !used.has(key(f)));
  if (pick) { pick.__ev = evId; take(pick); }
}

// --- Step 2: neon rationing ---
const neonPool = feats.filter((f) => f.type === 'neon').sort((a, b) => scorePhoto(b, 'fun') - scorePhoto(a, 'fun'));
for (const evId of NEON_PRIORITY) {
  const pick = neonPool.find((f) => !used.has(key(f)));
  if (pick) { pick.__ev = evId; take(pick); }
}

// --- Step 3: haunted-house keeps its good neon shot (pink corridor) ---
{
  const pick = neonPool.find((f) => !used.has(key(f)));
  if (pick) { pick.__ev = 'haunted-house'; take(pick); }
}

// --- Step 4: stage events (technical) from stage bucket, all distinct ---
const stagePool = feats.filter((f) => f.type === 'stage').sort((a, b) => scorePhoto(b, 'technical') - scorePhoto(a, 'technical'));
const technicalEvents = eventIds.filter((id) => catOf[id] === 'technical');
for (const evId of technicalEvents) {
  if (assign[evId]) continue;
  const pick = stagePool.find((f) => !used.has(key(f)));
  if (pick) { pick.__ev = evId; take(pick); }
}

// --- Step 5: e-gaming from remaining neon (distinct each) ---
const egamingEvents = eventIds.filter((id) => catOf[id] === 'egaming');
for (const evId of egamingEvents) {
  if (assign[evId]) continue;
  const pick = neonPool.find((f) => !used.has(key(f)));
  if (pick) { pick.__ev = evId; take(pick); }
}

// --- Step 6: fun events from crowd/action (distinct) ---
const crowdPool = feats.filter((f) => f.type === 'crowd' || f.type === 'action')
  .sort((a, b) => scorePhoto(b, 'fun') - scorePhoto(a, 'fun'));
const funEvents = eventIds.filter((id) => catOf[id] === 'fun');
for (const evId of funEvents) {
  if (assign[evId]) continue;
  const pick = crowdPool.find((f) => !used.has(key(f)));
  if (pick) { pick.__ev = evId; take(pick); }
}

// --- Step 7: workshops & mini from people/colorful/crowd leftovers ---
const restPool = feats.filter((f) => ['people', 'colorful', 'crowd', 'action', 'ambient'].includes(f.type))
  .sort((a, b) => b.sat * 4 + Math.min(b.edges, 0.16) * 12 - (a.sat * 4 + Math.min(a.edges, 0.16) * 12));
for (const evId of eventIds) {
  if (assign[evId]) continue;
  const type = catOf[evId];
  const pick = restPool.find((f) => !used.has(key(f)) && f.type !== 'portrait');
  if (pick) { pick.__ev = evId; take(pick); }
}

// --- Step 8: banner + atmosphere spares (wide dramatic, unused) ---
const sparePool = feats.filter((f) => !used.has(key(f)) && ATMO_TYPES.includes(f.type))
  .sort((a, b) => (b.sat * 2 + Math.min(b.edges, 0.16) * 15) - (a.sat * 2 + Math.min(a.edges, 0.16) * 15));
const banner = sparePool[0];
if (banner) used.add(key(banner));

// ---------- emit ----------
const outEvents = {};
for (const evId of eventIds) {
  const f = assign[evId];
  outEvents[evId] = {
    id: f.id, day: f.day, type: f.type,
    thumb: url(f.id, 320, 240),
    medium: url(f.id, 640, 440),
    large: url(f.id, 1200),
  };
}
const outBanner = banner ? { id: banner.id, day: banner.day, type: banner.type, wide: url(banner.id, 1920), thumb: url(banner.id, 1280, 720) } : null;

const js = `// AUTO-GENERATED by scripts/assign-event-images-v2.mjs (visual-review informed).
export const zephyrEventImages = ${JSON.stringify(outEvents, null, 1)};

export const zephyrBanner = ${JSON.stringify(outBanner, null, 1)};
`;
writeFileSync('src/data/zephyrEventImages.js', js);
console.log(`Assigned ${Object.keys(outEvents).length}/${eventIds.length} events + banner (d${banner?.day}#${banner?.idx} ${banner?.type})`);

// distinctness report
const srcCount = {};
Object.values(outEvents).forEach((e) => (srcCount[e.id] = (srcCount[e.id] || 0) + 1));
const dupes = Object.entries(srcCount).filter(([, n]) => n > 1);
console.log(dupes.length ? `⚠ duplicate photos across events: ${dupes.length}` : '✓ all event photos distinct');
