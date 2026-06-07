/* Aperçu PNG 1080x1920 — slide "valeurs approchées = faux", RÉDIGÉ CORRECTEMENT.
   Carré ABCD aire 50 : arrondi -> 99,9698 (faux) vs exact -> 100 (AC = 10 cm). */
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
svg += txt(CL, 235, 'Erreur : les valeurs', {size:58, fill:ROUGE, weight:700});
svg += txt(CL, 300, 'approchées', {size:58, fill:ROUGE, weight:700});
svg += line(CL, 318, CL+360, 318, ROUGE, 3);

// ---------- ÉNONCÉ ----------
svg += txt(CL, 380, 'Carré ABCD, aire = 50 cm² → AC exacte ?', {size:38, fill:BLEU});

// ---------- AVEC ARRONDI (faux) ----------
svg += txt(CL, 460, 'Avec un arrondi :', {size:46, fill:ROUGE, weight:700});
[ 'On a AB² = 50, donc AB ≈ 7,07.',
  'ABC rectangle en B, d\'après Pythagore :',
  'AC² = AB² + BC²',
  'AC² = 7,07² + 7,07² = 99,9698',
  '→ FAUX : 99,9698 ≠ 100',
].forEach((l,i)=> svg += txt(CL+10, 518 + i*52, l, {size:38, fill:ROUGE}));

// ---------- VALEUR EXACTE (vrai) ----------
svg += txt(CL, 845, 'Valeur exacte :', {size:46, fill:VERT, weight:700});
[ 'AB² = 50 et AB = BC (carré).',
  'AC² = AB² + BC² = 50 + 50',
  'AC² = 100   donc   AC = 10 cm',
].forEach((l,i)=> svg += txt(CL+10, 903 + i*52, l, {size:38, fill:VERT}));

// ---------- FIGURE (optionnelle) : carré ABCD, diagonale AC, angle droit en B ----------
const s=180, fx=(W-s)/2, fy=1070;
const A=[fx,fy], B=[fx+s,fy], C=[fx+s,fy+s], D=[fx,fy+s];
svg += `<rect x="${fx}" y="${fy}" width="${s}" height="${s}" fill="none" stroke="#222" stroke-width="2.5"/>`;
svg += line(A[0],A[1],C[0],C[1],ROUGE,2.5);
svg += `<path d="M${B[0]-18} ${B[1]} L${B[0]-18} ${B[1]+18} L${B[0]} ${B[1]+18}" fill="none" stroke="#222" stroke-width="2"/>`;
svg += txt(A[0]-8, A[1]-8, 'A', {size:30, fill:'#222', weight:700, anchor:'end'});
svg += txt(B[0]+8, B[1]-8, 'B', {size:30, fill:'#222', weight:700});
svg += txt(C[0]+8, C[1]+28, 'C', {size:30, fill:'#222', weight:700});
svg += txt(D[0]-8, D[1]+28, 'D', {size:30, fill:'#222', weight:700, anchor:'end'});
svg += txt(fx+s+16, fy+s+28, 'aire = 50 cm²', {size:28, fill:BLEU});

// ---------- N° PAGE ----------
svg += `<rect x="780" y="1370" width="70" height="60" rx="6" fill="none" stroke="${BLEU}" stroke-width="3"/>`;
svg += txt(815, 1416, '3', {size:46, fill:BLEU, weight:700, anchor:'middle'});

svg += `</svg>`;
fs.writeFileSync('/tmp/arr.svg', svg);
sharp(Buffer.from(svg)).png().toFile('/home/user/anag-site/preview-arrondis.png')
  .then(i => console.log('PNG OK', i.width+'x'+i.height))
  .catch(e => { console.error('ERR', e); process.exit(1); });
