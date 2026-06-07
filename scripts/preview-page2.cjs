/* Aperçu PNG 1080x1920 — PAGE 2 (modèle slide de contenu).
   Même copie que la page 1 + titre / rédaction / encadré / n° page. */
const sharp = require('sharp');
const fs = require('fs');

const W = 1080, H = 1920;
const BLEU = '#2342a8', ROUGE = '#d11f1f', PAPIER = '#fdfdfb';
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
for (let x = 0; x <= W; x += CAR)        svg += line(x, 0, x, H, FORTE, 1.2);     // verticales pleine hauteur
for (let y = GTOP; y <= GBOT; y += SOUS) svg += line(0, y, W, y, FINE, 1);        // fines horizontales (centre)
for (let y = GTOP; y <= GBOT; y += CAR)  svg += line(0, y, W, y, FORTE, 1.2);     // fortes horizontales (centre)
svg += line(MARGIN, 0, MARGIN, H, MARGE, 2);                                      // marge rouge
const hx = 40;
for (let y = 150; y <= H - 120; y += 240) svg += `<circle cx="${hx}" cy="${y}" r="15" fill="#c7ccd4" stroke="#aab0bb" stroke-width="2"/>`;

// ---------- TITRE ----------
svg += txt(CL, 250, 'La bonne méthode', {size:74, fill:ROUGE, weight:700});
svg += line(CL, 268, CL+560, 268, ROUGE, 3);

// ---------- CONTENU ----------
const corps = [
  'Dans un triangle rectangle en A :',
  'BC² = AB² + AC²',
  'BC² = 3² + 4²',
  'BC² = 9 + 16 = 25',
  'BC = √25 = 5 cm  ✓',
];
corps.forEach((l,i)=> svg += txt(CL, 380 + i*78, l, {size:50, fill:BLEU}));

// ---------- ENCADRÉ ----------
const bx=CL, by=1120, bw=950-CL, bh=210;
svg += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="8" fill="#ffffff" fill-opacity="0.5" stroke="${ROUGE}" stroke-width="3"/>`;
svg += txt(bx+22, by+50, 'À retenir', {size:40, fill:ROUGE, weight:700, style:'text-decoration:underline'});
svg += txt(bx+22, by+110, 'On finit TOUJOURS par la racine carrée :', {size:44, fill:ROUGE});
svg += txt(bx+22, by+165, 'BC = √25 = 5, et pas 25 !', {size:44, fill:ROUGE});

// ---------- N° PAGE + flèche ----------
svg += `<rect x="760" y="1380" width="70" height="60" rx="6" fill="none" stroke="${BLEU}" stroke-width="3"/>`;
svg += txt(795, 1426, '2', {size:46, fill:BLEU, weight:700, anchor:'middle'});
svg += line(850, 1410, 935, 1410, BLEU, 5);
svg += `<path d="M935 1410 L912 1396 M935 1410 L912 1424" fill="none" stroke="${BLEU}" stroke-width="5"/>`;

svg += `</svg>`;
fs.writeFileSync('/tmp/page2.svg', svg);
sharp(Buffer.from(svg)).png().toFile('/home/user/anag-site/preview-page2.png')
  .then(i => console.log('PNG OK', i.width+'x'+i.height))
  .catch(e => { console.error('ERR', e); process.exit(1); });
