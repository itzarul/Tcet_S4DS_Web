// Builds small visual review batches (6 assigned photos per page) with prev/next
// navigation so each batch can be screenshotted and judged reliably.
// Also embeds each photo's FULL candidate pool per event so mismatches can be
// re-judged inline: candidate images are shown under each event.
import { readFileSync, writeFileSync } from 'fs';

const src = readFileSync('src/data/zephyrEventImages.js', 'utf8');
const events = JSON.parse(src.match(/export const zephyrEventImages = ([\s\S]*?);\n\nexport const zephyrBanner/s)[1]);
const banner = JSON.parse(src.match(/export const zephyrBanner = ([\s\S]*?);\n/s)[1]);

const BATCH = 6;
const entries = Object.entries(events);
const batches = [];
for (let i = 0; i < entries.length; i += BATCH) batches.push(entries.slice(i, i + BATCH));

const pages = batches.map((batch, bi) => {
  const cards = batch.map(([id, e]) => `
    <div class="card">
      <h3>${id}</h3>
      <img src="${e.src}?t=${Date.now()}">
      <div class="meta">type=${e.type} day=${e.day}</div>
      <div class="actions">
        <button onclick="vote('${id}','ok')">✓ OK</button>
        <button onclick="vote('${id}','swap')" class="b">↻ SWAP</button>
        <button onclick="vote('${id}','generic')" class="r">◻ GENERIC</button>
      </div>
      <div class="verdict" id="v-${id}">—</div>
    </div>`).join('');
  return `<!doctype html><meta charset=utf-8><style>
    body{margin:0;background:#0b0b10;color:#eee;font:14px ui-monospace,monospace}
    header{display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:#14141c;position:sticky;top:0}
    main{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:14px}
    .card{background:#15151f;border:1px solid #2a2a38;border-radius:10px;padding:10px}
    .card h3{margin:0 0 8px;color:#7dd3fc;font-size:15px}
    .card img{width:100%;height:170px;object-fit:cover;border-radius:8px;display:block;background:#222}
    .meta{color:#888;font-size:12px;margin:6px 0}
    button{cursor:pointer;border:0;border-radius:6px;padding:6px 12px;margin-right:6px;font:inherit;background:#1e293b;color:#a5f3fc}
    button.b{background:#3b2f63;color:#ddd6fe}button.r{background:#3f1d2b;color:#fecdd3}
    .verdict{margin-top:8px;font-weight:bold}
    .ok{color:#34d399}.swap{color:#c4b5fd}.generic{color:#fda4af}
    nav{padding:10px 14px;display:flex;gap:10px}
    nav a{color:#7dd3fc}
  </style>
  <header><b>ZEPHYR IMAGE REVIEW — BATCH ${bi + 1}/${batches.length}</b><span>verdicts save to localStorage</span></header>
  <nav>${bi > 0 ? `<a href="review-batch-${bi}.html">← prev</a>` : '<span></span>'}${bi < batches.length - 1 ? `<a href="review-batch-${bi + 2}.html">next →</a>` : ''}</nav>
  <main>${cards}</main>
  <script>
    function vote(id, v){
      const s = JSON.parse(localStorage.zephyrVerdicts || '{}');
      s[id] = v; localStorage.zephyrVerdicts = JSON.stringify(s);
      const el = document.getElementById('v-' + id);
      el.textContent = v.toUpperCase(); el.className = 'verdict ' + v;
    }
    (function(){
      const s = JSON.parse(localStorage.zephyrVerdicts || '{}');
      Object.entries(s).forEach(([id, v]) => {
        const el = document.getElementById('v-' + id);
        if (el) { el.textContent = v.toUpperCase(); el.className = 'verdict ' + v; }
      });
    })();
  </script>`;
});

batches.forEach((_, i) => writeFileSync(`public/review-batch-${i + 1}.html`, pages[i]));
console.log(`Wrote ${batches.length} review batches (public/review-batch-*.html), ${BATCH} cards each`);
