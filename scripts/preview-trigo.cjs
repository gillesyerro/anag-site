/* Aperçu PNG 1080x1920 — PAGE 2 Trigo (copie BLEUE).
   Erreur fréquente (cos = opposé/hyp) vs bonne formule (cos = adj/hyp = AB/AC).
   Vraies fractions. Figure : triangle ABC rectangle en B, angle Â. */
const sharp = require('sharp');
const fs = require('fs');

const W = 1080, H = 1920;
const BLEU = '#1d3c9e', ROUGE = '#d11f1f', VERT = '#1b8a3a', PAPIER = '#e9f0fb';
const FINE = '#d3e0f4', FORTE = '#a9c2e6', MARGE = '#3f63b5';
const HAND = 'Caveat';
const CAR = 56, SOUS = CAR/4, MARGIN = CAR*3, CL = MARGIN + 24;

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function txt(x,y,s,{size=40,fill=BLEU,weight=400,anchor='start',style=''}={}) {
  return `<text x="${x}" y="${y}" font-family="${HAND}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" style="${style}">${esc(s)}</text>`;
}
const line = (x1,y1,x2,y2,c,w) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}"/>`;
function frac(cx, ybar, num, den, color, size, hw) {
  return line(cx-hw, ybar, cx+hw, ybar, color, 3)
       + txt(cx, ybar-12, num, {size, fill:color, weight:700, anchor:'middle'})
       + txt(cx, ybar+size, den, {size, fill:color, weight:700, anchor:'middle'});
}

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
svg += `<rect width="${W}" height="${H}" fill="${PAPIER}"/>`;
const GTOP = 120, GBOT = 1790;
for (let x = 0; x <= W; x += CAR)        svg += line(x, 0, x, H, FORTE, 1.2);
for (let y = GTOP; y <= GBOT; y += SOUS) svg += line(0, y, W, y, FINE, 1);
for (let y = GTOP; y <= GBOT; y += CAR)  svg += line(0, y, W, y, FORTE, 1.2);
svg += line(MARGIN, 0, MARGIN, H, MARGE, 2);
for (let y = 150; y <= H - 120; y += 240) svg += `<circle cx="40" cy="${y}" r="15" fill="#cdd9ee" stroke="#9fb4d8" stroke-width="2"/>`;

// TITRE
svg += txt(CL, 235, 'Trigonométrie', {size:58, fill:ROUGE, weight:700});
svg += line(CL, 253, CL+400, 253, ROUGE, 3);
svg += txt(CL, 315, 'ABC rectangle en B — angle Â.', {size:34, fill:BLEU});

// ERREUR
svg += txt(CL, 395, 'Erreur fréquente :', {size:44, fill:ROUGE, weight:700});
svg += txt(CL+10, 478, 'cos Â =', {size:46, fill:ROUGE});
svg += frac(CL+290, 470, 'BC', 'AC', ROUGE, 42, 44);
svg += txt(CL+10, 552, '✗ ça, c\'est sin Â ! (côté opposé)', {size:36, fill:ROUGE});

// BONNE FORMULE
svg += txt(CL, 638, 'La bonne formule :', {size:44, fill:VERT, weight:700});
svg += txt(CL+10, 700, 'Pour l\'angle Â (adjacent / hypoténuse) :', {size:34, fill:VERT});
svg += txt(CL+10, 780, 'cos Â =', {size:48, fill:VERT, weight:700});
svg += frac(CL+300, 772, 'AB', 'AC', VERT, 46, 46);
svg += txt(CL+10, 848, 'CAH : Cosinus = Adjacent / Hypoténuse', {size:32, fill:VERT});

// FIGURE : triangle ABC rectangle en B, angle Â
const A=[450,915], B=[450,1185], C=[770,1185];
svg += `<polygon points="${A[0]},${A[1]} ${B[0]},${B[1]} ${C[0]},${C[1]}" fill="none" stroke="#222" stroke-width="2.5"/>`;
svg += `<path d="M${B[0]+22} ${B[1]} L${B[0]+22} ${B[1]-22} L${B[0]} ${B[1]-22}" fill="none" stroke="#222" stroke-width="2"/>`; // angle droit B
svg += `<path d="M${A[0]} ${A[1]+44} A 44 44 0 0 1 ${A[0]+34} ${A[1]+28}" fill="none" stroke="${BLEU}" stroke-width="2.5"/>`; // arc angle Â
svg += txt(A[0]+18, A[1]+82, 'Â', {size:32, fill:BLEU, weight:700});
svg += txt(A[0]-12, A[1]-6, 'A', {size:32, fill:'#222', weight:700, anchor:'end'});
svg += txt(B[0]-12, B[1]+34, 'B', {size:32, fill:'#222', weight:700, anchor:'end'});
svg += txt(C[0]+12, C[1]+34, 'C', {size:32, fill:'#222', weight:700});
svg += txt(A[0]-20, (A[1]+B[1])/2, 'adj.', {size:28, fill:'#444', anchor:'end'});
svg += txt((B[0]+C[0])/2, B[1]+34, 'opp.', {size:28, fill:'#444', anchor:'middle'});
svg += txt((A[0]+C[0])/2+18, (A[1]+C[1])/2-8, 'hyp.', {size:28, fill:'#444'});

// N° PAGE
svg += `<rect x="780" y="1370" width="70" height="60" rx="6" fill="none" stroke="${BLEU}" stroke-width="3"/>`;
svg += txt(815, 1416, '2', {size:46, fill:BLEU, weight:700, anchor:'middle'});

svg += `</svg>`;
fs.writeFileSync('/tmp/tr2.svg', svg);
sharp(Buffer.from(svg)).png().toFile('/home/user/anag-site/preview-trigo.png')
  .then(i => console.log('PNG OK', i.width+'x'+i.height))
  .catch(e => { console.error('ERR', e); process.exit(1); });
