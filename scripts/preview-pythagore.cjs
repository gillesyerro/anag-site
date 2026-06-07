/* Aperçu PNG 1080x1920 — slide COURS : rédaction correcte de Pythagore.
   Triangle ABC rectangle en B -> AC² = AB² + BC² (AC = hypoténuse). */
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
svg += txt(CL, 250, 'Théorème de Pythagore', {size:58, fill:ROUGE, weight:700});
svg += line(CL, 268, CL+620, 268, ROUGE, 3);

// ---------- RÉDACTION ----------
svg += txt(CL, 360, 'Le triangle ABC est rectangle en B.', {size:42, fill:BLEU});
svg += txt(CL, 422, "D'après le théorème de Pythagore :", {size:42, fill:BLEU});

// formule (encadrée)
svg += `<rect x="${CL}" y="468" width="600" height="92" rx="8" fill="#ffffff" fill-opacity="0.5" stroke="${BLEU}" stroke-width="2.5"/>`;
svg += txt(CL+300, 532, 'AC² = AB² + BC²', {size:62, fill:BLEU, weight:700, anchor:'middle'});

// note hypoténuse
svg += txt(CL, 632, 'AC est l\'hypoténuse :', {size:42, fill:VERT, weight:700});
svg += txt(CL, 690, 'le côté opposé à l\'angle droit.', {size:42, fill:VERT});

// ---------- FIGURE : triangle ABC rectangle en B ----------
const Bx=470, By=1020, up=240, right=300;
const Bp=[Bx,By], Ap=[Bx,By-up], Cp=[Bx+right,By];
svg += `<polygon points="${Ap[0]},${Ap[1]} ${Bp[0]},${Bp[1]} ${Cp[0]},${Cp[1]}" fill="none" stroke="#222" stroke-width="2.5"/>`;
svg += line(Ap[0],Ap[1],Cp[0],Cp[1],ROUGE,3);               // hypoténuse AC (rouge)
svg += `<path d="M${Bx+22} ${By} L${Bx+22} ${By-22} L${Bx} ${By-22}" fill="none" stroke="#222" stroke-width="2"/>`; // angle droit B
svg += txt(Ap[0]-12, Ap[1]-6, 'A', {size:34, fill:'#222', weight:700, anchor:'end'});
svg += txt(Bp[0]-12, Bp[1]+34, 'B', {size:34, fill:'#222', weight:700, anchor:'end'});
svg += txt(Cp[0]+12, Cp[1]+34, 'C', {size:34, fill:'#222', weight:700});
svg += txt((Ap[0]+Cp[0])/2+18, (Ap[1]+Cp[1])/2-10, 'hyp.', {size:30, fill:ROUGE, weight:700});

// ---------- N° PAGE ----------
svg += `<rect x="780" y="1370" width="70" height="60" rx="6" fill="none" stroke="${BLEU}" stroke-width="3"/>`;
svg += txt(815, 1416, '2', {size:46, fill:BLEU, weight:700, anchor:'middle'});

svg += `</svg>`;
fs.writeFileSync('/tmp/pyth.svg', svg);
sharp(Buffer.from(svg)).png().toFile('/home/user/anag-site/preview-pythagore.png')
  .then(i => console.log('PNG OK', i.width+'x'+i.height))
  .catch(e => { console.error('ERR', e); process.exit(1); });
