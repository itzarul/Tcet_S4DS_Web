// Applies the user's visual review verdicts (from review sheets / localStorage):
//   ok      -> keep current image
//   swap    -> assign a fresh distinct pool photo by category
//   generic -> assign the single shared generic fest-atmosphere image
import { readFileSync, writeFileSync, existsSync } from 'fs';

const VERDICTS = {
  "3d-printing":"generic","ai-iot":"generic","canvasphere":"generic","tech-hunt":"generic","ctf":"generic",
  "space-blitz":"generic","anomaly":"generic","gen-ai-workshop":"generic","project-presentation":"generic",
  "neon-football":"ok","arm-wrestling":"generic","ideathon":"generic","ar-cricket":"generic","squid-game":"generic",
  "haunted-house":"ok","escapee-arena":"generic","gel-blaster":"generic","cad-competition":"generic",
  "neon-cricket":"ok","mystery-room":"generic","box-cricket":"generic","rink-football":"generic",
  "mystery-maze":"generic","power-show":"generic","scavengers-hunt":"generic","takeshis-castle":"swap",
  "bowling":"generic","glow-carrom":"generic","skribble":"generic","cricket-auction":"swap",
  "standup-comedy":"generic","tug-of-war":"generic","codm-tdm":"generic","valorant":"generic","simulator":"generic",
  "wwe-console":"generic","fifa-ps5":"generic","bgmi-classic":"generic","freefire-classic":"generic",
  "bgmi-tdm":"generic","freefire-br":"generic","rocket-league":"generic","efootball":"swap","neon-dodgeball":"swap",
  "stumble-guys":"generic","dart-football":"generic","catch-the-baton":"generic","bullseye-dart":"generic",
  "arcade-game":"generic","murderer-among-us":"generic","vintage-photobooth":"generic","garba-workshop":"generic",
  "dance-workshop":"generic","content-creation":"generic","technical-event-ws":"generic","technical-seminar":"generic"
};

const feats = JSON.parse(readFileSync('scripts/.zephyr-cache/features.json', 'utf8')).filter((f) => !f.error);
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
feats.forEach((f) => (f.type = classify(f)));
const catOf = {};
for (const m of readFileSync('src/data/zephyr.js', 'utf8').matchAll(/\{\s*id:\s*"([a-z0-9-]+)",\s*name:\s*"[^"]*",\s*category:\s*"([a-z]+)"/g)) catOf[m[1]] = m[2];
const url = (id, w, h) => `https://lh3.googleusercontent.com/${id}=w${w}-h${h}-c`;

async function dl(id, w, h, out) {
  if (existsSync(out)) return;
  const res = await fetch(`https://lh3.googleusercontent.com/${id}=w${w}-h${h}-c`);
  if (!res.ok) throw new Error('HTTP ' + res.status);
  writeFileSync(out, Buffer.from(await res.arrayBuffer()));
}

// current data
const src = readFileSync('src/data/zephyrEventImages.js', 'utf8');
const events = JSON.parse(src.match(/export const zephyrEventImages = ([\s\S]*?);\n\nexport const zephyrBanner/s)[1]);
const banner = JSON.parse(src.match(/export const zephyrBanner = ([\s\S]*?);\n/s)[1]);

// photos to exclude from new picks: banner + all ok events
const excluded = new Set([banner.id]);
for (const [id, e] of Object.entries(events)) if (VERDICTS[id] === 'ok') excluded.add(e.id);

const score = (f) => f.edges * 12 + f.sat * 4 + (1 - Math.abs(f.bright - 0.45)) * 3;
const pickFor = (cat, preferTypes) => {
  const pool = feats
    .filter((f) => !excluded.has(f.id) && f.type !== 'portrait' && preferTypes.includes(f.type))
    .sort((a, b) => score(b) - score(a));
  return pool[0];
};

// ---- 1. generic image: best wide crowd shot not used anywhere ----
const genericFeat = pickFor('any', ['crowd', 'stage']);
await dl(genericFeat.id, 800, 550, 'public/zephyr/events/generic.jpg');
console.log(`generic image: d${genericFeat.day}#${genericFeat.idx} (${genericFeat.type})`);
excluded.add(genericFeat.id);

// ---- 2. swaps ----
const SWAP_PREFS = {
  'takeshis-castle': ['action', 'crowd'],
  'cricket-auction': ['crowd', 'action'],
  'efootball': ['neon', 'colorful'],
  'neon-dodgeball': ['neon', 'colorful'],
};
for (const [evId, prefs] of Object.entries(SWAP_PREFS)) {
  const f = pickFor(catOf[evId], prefs);
  if (!f) { console.error('no pick for', evId); continue; }
  await dl(f.id, 800, 550, `public/zephyr/events/${evId}.jpg`);
  events[evId] = { src: `/zephyr/events/${evId}.jpg`, type: f.type, day: f.day };
  excluded.add(f.id);
  console.log(`swap ${evId} -> d${f.day}#${f.idx} (${f.type})`);
}

// ---- 3. generics ----
let genericCount = 0;
for (const [evId, verdict] of Object.entries(VERDICTS)) {
  if (verdict === 'generic') {
    events[evId] = { src: '/zephyr/events/generic.jpg', type: 'generic', day: genericFeat.day };
    genericCount++;
  }
}

// ---- emit ----
const js = `// Final event images after user visual review (ok/swap/generic verdicts applied).
export const zephyrEventImages = ${JSON.stringify(events, null, 1)};

export const zephyrBanner = ${JSON.stringify(banner, null, 1)};
`;
writeFileSync('src/data/zephyrEventImages.js', js);
console.log(`Done: 3 ok kept, ${Object.keys(SWAP_PREFS).length} swapped, ${genericCount} set to generic.`);
