// Downloads 200px thumbnails for all Zephyr gallery photos and computes
// lightweight perceptual features for smart classification:
//   skinRatio   -> portraits/speakers
//   neonScore   -> dark scenes with saturated color (UV/neon arenas)
//   brightness  -> dark venue vs bright outdoor
//   saturation  -> colorful action vs dull talk sessions
//   edgeDensity -> busy crowd/action scenes
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'fs';
import jpeg from 'jpeg-js';

const W = 160, H = 107, BATCH = 24;
mkdirSync('scripts/.zephyr-cache/thumbs', { recursive: true });

const ids = [];
for (const d of [1, 2, 3]) {
  readFileSync(`scripts/.zephyr-cache/day${d}.ids`, 'utf8').trim().split('\n')
    .map((l) => l.trim().replace(/^(https:\/\/)?lh3\.googleusercontent\.com\//, ''))
    .filter(Boolean)
    .forEach((id, i) => ids.push({ day: d, idx: i + 1, id }));
}

const features = [];
const jpg = (buf) => jpeg.decode(buf, { useTArray: true, maxMemoryUsageInMB: 512 });

// mean over horizontal neighbors (edge-ish density proxy)
function analyze(img) {
  const { data, width, height } = img;
  let skin = 0, bright = 0, sat = 0, edges = 0, n = 0;
  const lum = new Float32Array(width * height);
  for (let i = 0; i < width * height; i++) {
    const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    const L = 0.299 * r + 0.587 * g + 0.114 * b;
    lum[i] = L; bright += L; sat += mx === 0 ? 0 : (mx - mn) / mx;
    // skin-ish: r>g>b in warm range
    if (r > 95 && g > 40 && b > 20 && r > g && g > b && r - mn > 15 && Math.abs(r - g) > 8) skin++;
    n++;
  }
  for (let y = 1; y < height - 1; y++)
    for (let x = 1; x < width - 1; x++) {
      const i = y * width + x;
      edges += Math.abs(lum[i] - lum[i + 1]) + Math.abs(lum[i] - lum[i + width]);
    }
  edges /= (width - 2) * (height - 2);
  return { skin: skin / n, bright: bright / n / 255, sat: sat / n, edges: edges / 255 };
}

let cursor = 0;
async function worker(wid) {
  while (cursor < ids.length) {
    const item = ids[cursor++];
    const fname = `scripts/.zephyr-cache/thumbs/d${item.day}-${String(item.idx).padStart(3, '0')}.jpg`;
    try {
      let buf;
      if (existsSync(fname)) buf = readFileSync(fname);
      else {
        const res = await fetch(`https://lh3.googleusercontent.com/${item.id}=w${W}-h${H}-c`);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        buf = Buffer.from(await res.arrayBuffer());
        writeFileSync(fname, buf);
        await new Promise((r) => setTimeout(r, 60)); // be polite to the CDN
      }
      const f = analyze(jpg(buf));
      features.push({ ...item, ...f });
    } catch (e) {
      features.push({ ...item, error: String(e).slice(0, 60) });
    }
  }
}

await Promise.all(Array.from({ length: BATCH }, (_, i) => worker(i)));

const ok = features.filter((f) => !f.error);
console.log(`Analyzed ${ok.length}/${features.length} photos`);
writeFileSync('scripts/.zephyr-cache/features.json', JSON.stringify(features, null, 1));

// quick distribution preview
const dist = (sel, label) => {
  const vals = ok.map(sel).sort((a, b) => a - b);
  const q = (p) => vals[Math.floor(p * (vals.length - 1))].toFixed(3);
  console.log(`${label}: p10=${q(0.1)} p50=${q(0.5)} p90=${q(0.9)}`);
};
dist((f) => f.skin, 'skin');
dist((f) => f.bright, 'bright');
dist((f) => f.sat, 'sat');
dist((f) => f.edges, 'edges');
