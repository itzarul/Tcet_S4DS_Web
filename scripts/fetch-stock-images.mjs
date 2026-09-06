// Fetches copyright-safe stock photos per Zephyr event topic from Wikimedia
// Commons (CC-licensed, filtered to CC0 / CC BY / CC BY / SA only), downloads
// them locally, and emits src/data/zephyrStockImages.js with full credits.
import { mkdirSync, writeFileSync, readFileSync, existsSync, statSync } from 'fs';

const OUT_DIR = 'public/zephyr/stock';
mkdirSync(OUT_DIR, { recursive: true });

const OK_LICENSES = new Set(['CC0', 'CC BY 1.0', 'CC BY 2.0', 'CC BY 2.5', 'CC BY 3.0', 'CC BY 4.0', 'CC BY-SA 1.0', 'CC BY-SA 2.0', 'CC BY-SA 2.5', 'CC BY-SA 3.0', 'CC BY-SA 4.0', 'Public domain']);

const QUERIES = {
  'content-creation': ['video camera vlogger', 'content creation camera'],
  'technical-seminar': ['conference audience hall', 'lecture hall students'],
  'dance-workshop': ['dance class practice'],
  'garba-workshop': ['dandiya raas', 'garba dance'],
  '3d-printing': ['3d printer'],
  'technical-event-ws': ['electronics breadboard workshop'],
  'art-workshop': ['art class painting'],
  'ai-iot': ['circuit board macro'],
  'gen-ai-workshop': ['artificial intelligence neural network visualization'],
  'ideathon': ['hackathon students laptops'],
  'ctf': ['hacker terminal code'],
  'cad-competition': ['cad software screen', 'engineering drawing cad'],
  'project-presentation': ['student presentation slides'],
  'space-blitz': ['milky way galaxy'],
  'anomaly': ['jigsaw puzzle'],
  'canvasphere': ['digital painting tablet artist'],
  'tech-hunt': ['compass map adventure'],
  'arm-wrestling': ['arm wrestling match'],
  'squid-game': ['carnival game booth'],
  'gel-blaster': ['paintball player'],
  'ar-cricket': ['cricket batsman'],
  'box-cricket': ['cricket pitch night'],
  'rink-football': ['futsal'],
  'escapee-arena': ['escape room puzzle'],
  'mystery-room': ['old keys lock'],
  'scavengers-hunt': ['scavenger hunt'],
  'mystery-maze': ['hedge maze'],
  'power-show': ['deadlift'],
  'bowling': ['bowling alley lanes'],
  'simulator': ['racing simulator'],
  'neon-mania': ['neon signs room'],
  'skribble': ['sketch drawing hand'],
  'tug-of-war': ['tug of war'],
  'standup-comedy': ['microphone stage comedy'],
  'glow-carrom': ['carrom'],
  'valorant': ['esports tournament arena'],
  'bgmi-classic': ['mobile phone gaming'],
  'codm-tdm': ['game controller'],
  'freefire-br': ['gaming keyboard rgb'],
  'freefire-classic': ['smartphone game'],
  'fifa-ps5': ['playstation controller', 'game console controller'],
  'wwe-console': ['console gaming tv'],
  'bgmi-tdm': ['esports mobile tournament'],
  'rocket-league': ['gaming computer setup'],
  'stumble-guys': ['arcade machines colorful'],
  'catch-the-baton': ['relay running track'],
  'arcade-game': ['arcade cabinet'],
  'bullseye-dart': ['darts target board'],
  'dart-football': ['darts game'],
  'vintage-photobooth': ['polaroid photographs'],
  'murderer-among-us': ['magnifying glass mystery'],
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const strip = (s) => (s || '').replace(/<[^>]+>/g, '').trim();

async function searchCommons(query) {
  const url =
    `https://commons.wikimedia.org/w/api.php?action=query&generator=search` +
    `&gsrsearch=${encodeURIComponent('filetype:bitmap ' + query)}` +
    `&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|extmetadata|size` +
    `&iiurlwidth=900&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': 'ZephyrS4DSSite/1.0 (student club website; contact: technicalteamtsdw@gmail.com)' } });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const j = await res.json();
  return Object.values((j.query || {}).pages || {})
    .map((p) => {
      const ii = (p.imageinfo || [])[0];
      if (!ii) return null;
      const em = ii.extmetadata || {};
      return {
        title: p.title,
        thumb: ii.thumburl,
        width: ii.width, height: ii.height,
        license: (em.LicenseShortName || {}).value || '?',
        artist: strip((em.Artist || {}).value) || 'Unknown',
        creditUrl: (em.LicenseUrl || {}).value || ii.descriptionurl,
      };
    })
    .filter(Boolean);
}

const stock = {};
const credits = [];
let ok = 0, fail = 0;

for (const [evId, queries] of Object.entries(QUERIES)) {
  const out = `${OUT_DIR}/${evId}.jpg`;
  if (existsSync(out) && statSync(out).size > 12000) {
    ok++;
    continue; // cached from earlier run
  }
  let done = false;
  for (const q of queries) {
    try {
      const results = await searchCommons(q);
      const usable = results.find((r) => OK_LICENSES.has(r.license) && (r.width || 0) >= 640);
      if (!usable) continue;
      const res = await fetch(usable.thumb, { headers: { 'User-Agent': 'ZephyrS4DSSite/1.0' } });
      if (!res.ok) throw new Error('dl HTTP ' + res.status);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 12000) throw new Error('too small');
      writeFileSync(out, buf);
      stock[evId] = {
        src: `/zephyr/stock/${evId}.jpg`,
        title: usable.title.replace(/^File:/, ''),
        credit: `${usable.artist} · ${usable.license} · ${usable.creditUrl}`,
        query: q,
      };
      credits.push(`${evId}: "${usable.title.replace(/^File:/, '')}" by ${usable.artist} (${usable.license}) ${usable.creditUrl}`);
      console.log(`✓ ${evId.padEnd(22)} "${q}" | ${usable.license} | ${usable.artist.slice(0, 24)}`);
      ok++; done = true;
      break;
    } catch (e) {
      console.log(`  … "${q}": ${String(e).slice(0, 55)}`);
      await sleep(700);
    }
  }
  if (!done) { console.log(`✗ ${evId}`); fail++; }
  await sleep(1200); // be polite to the API
}

const js = `// AUTO-GENERATED by scripts/fetch-stock-images.mjs
// Source: Wikimedia Commons — CC0 / CC BY / CC BY-SA / Public Domain only.
// CC-BY and CC-BY-SA require attribution; full credits below and served in UI.
//
// ${credits.join('\n// ')}
//
export const zephyrStockImages = ${JSON.stringify(stock, null, 1)};
`;
writeFileSync('src/data/zephyrStockImages.js', js);
console.log(`\nDone: ${ok} fetched, ${fail} failed -> src/data/zephyrStockImages.js`);
