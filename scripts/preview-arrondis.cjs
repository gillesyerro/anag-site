/* Aperçu PNG 1080x1920 — slide "valeurs approchées = faux".
   Carré ABCD aire 50 : arrondi -> 99,9698 (faux) vs exact -> 100. */
const sharp = require('sharp');
const fs = require('fs');

const W = 1080, H = 1920;
const BLEU = '#2342a8', ROUGE = '#d11f1f', VERT = '#1b8a3a', PAPIER = '#fdfdfb';
const FINE = '#e4e9f4', FORTE = '#b9c6e6', MARGE = '#e08a8a';
const HAND = 'Caveat';
const CAR = 56, SOUS = CAR/4, MARGIN = CAR*3, CL = MARGIN + 24;

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function txt(x,y,s,{size=40,fill=BLEU,weight=400,anchor='start',style=''}={}) {
  return `<text x="${x}" y="${y}" font-family="${HAND}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" style="${style}">${esc(s)}</text>`;
}
const line = (x1,y1,x2,y2,c,w) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}"/>`;

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
svg += `<rect width="${W}" height="${H}" fill="${PAPIER}"/>`;

// ---------- QUADRILLAGE ----------
const GTOP = 120, GBOT = 1790;
for (let x = 0; x <= W; x += CAR)        svg += line(x, 0, x, H, FORTE, 1.2);
for (let y = GTOP; y <= GBOT; y += SOUS) svg += line(0, y, W, y, FINE, 1);
for (let y = GTOP; y <= GBOT; y += CAR)  svg += line(0, y, W, y, FORTE, 1.2);
svg += line(MARGIN, 0, MARGIN, H, MARGE, 2);
for (let y = 150; y <= H - 120; y += 240) svg += `<circle cx="40" cy="${y}" r="15" fill="#c7ccd4" stroke="#aab0bb" stroke-width="2"/>`;

// ---------- TITRE ----------
svg += txt(CL, 235, 'Erreur : les valeurs', {size:60, fill:ROUGE, weight:700});
svg += txt(CL, 300, 'approchées', {size:60, fill:ROUGE, weight:700});
svg += line(CL, 318, CL+360, 318, ROUGE, 3);

// ---------- ÉNONCÉ ----------
svg += txt(CL, 388, 'Carré ABCD, aire = 50 cm².', {size:44, fill:BLEU});
svg += txt(CL, 442, 'Calcule AC (valeur exacte).', {size:44, fill:BLEU});

// ---------- AVEC ARRONDI (faux) ----------
svg += txt(CL, 535, 'Avec un arrondi :', {size:48, fill:ROUGE, weight:700});
[ 'AB = √50 ≈ 7,07',
  'AC² = 7,07² + 7,07²',
  'AC² = 99,9698   ≠ 100',
  '→ AC ≈ 9,998   FAUX',
].forEach((l,i)=> svg += txt(CL+10, 600 + i*60, l, {size:46, fill:ROUGE}));

// ---------- VALEUR EXACTE (vrai) ----------
svg += txt(CL, 905, 'Valeur exacte :', {size:48, fill:VERT, weight:700});
[ 'AB² = 50   et   AB = BC',
  'AC² = 50 + 50 = 100',
  'AC = 10 cm',
].forEach((l,i)=> svg += txt(CL+10, 970 + i*60, l, {size:46, fill:VERT}));

// ---------- PUNCHLINE ----------
svg += txt(540, 1230, 'Arrondir trop tôt = erreur !', {size:54, fill:ROUGE, weight:700, anchor:'middle'});

// ---------- N° PAGE ----------
svg += `<rect x="780" y="1370" width="70" height="60" rx="6" fill="none" stroke="${BLEU}" stroke-width="3"/>`;
svg += txt(815, 1416, '2', {size:46, fill:BLEU, weight:700, anchor:'middle'});

svg += `</svg>`;
fs.writeFileSync('/tmp/arr.svg', svg);
sharp(Buffer.from(svg)).png().toFile('/home/user/anag-site/preview-arrondis.png')
  .then(i => console.log('PNG OK', i.width+'x'+i.height))
  .catch(e => { console.error('ERR', e); process.exit(1); });
