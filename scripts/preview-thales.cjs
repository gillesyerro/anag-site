/* Aperçu PNG 1080x1920 — PAGE 2 Thalès (copie ROSE).
   Schéma Thalès + erreur sur les égalités + bonne rédaction du théorème. */
const sharp = require('sharp');
const fs = require('fs');

const W = 1080, H = 1920;
const BLEU = '#2342a8', ROUGE = '#d11f1f', VERT = '#1b8a3a', PAPIER = '#fdeaf1'; // ROSE
const FINE = '#f2d4e0', FORTE = '#e2a9c1', MARGE = '#d05a7a';
const HAND = 'Caveat';
const CAR = 56, SOUS = CAR/4, MARGIN = CAR*3, CL = MARGIN + 24;

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function txt(x,y,s,{size=40,fill=BLEU,weight=400,anchor='start',style=''}={}) {
  return `<text x="${x}" y="${y}" font-family="${HAND}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" style="${style}">${esc(s)}</text>`;
}
const line = (x1,y1,x2,y2,c,w) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}"/>`;

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
svg += `<rect width="${W}" height="${H}" fill="${PAPIER}"/>`;
const GTOP = 120, GBOT = 1790;
for (let x = 0; x <= W; x += CAR)        svg += line(x, 0, x, H, FORTE, 1.2);
for (let y = GTOP; y <= GBOT; y += SOUS) svg += line(0, y, W, y, FINE, 1);
for (let y = GTOP; y <= GBOT; y += CAR)  svg += line(0, y, W, y, FORTE, 1.2);
svg += line(MARGIN, 0, MARGIN, H, MARGE, 2);
for (let y = 150; y <= H - 120; y += 240) svg += `<circle cx="40" cy="${y}" r="15" fill="#e7c4d2" stroke="#c98aa3" stroke-width="2"/>`;

// TITRE
svg += txt(CL, 235, 'Théorème de Thalès', {size:58, fill:ROUGE, weight:700});
svg += line(CL, 253, CL+540, 253, ROUGE, 3);

// CONFIG
svg += txt(CL, 315, 'Triangle AMN, B∈[AM], C∈[AN], (BC)//(MN).', {size:34, fill:BLEU});

// vraie fraction : numérateur / barre / dénominateur
function frac(cx, ybar, num, den, color, size, hw) {
  return line(cx-hw, ybar, cx+hw, ybar, color, 3)
       + txt(cx, ybar-14, num, {size, fill:color, weight:700, anchor:'middle'})
       + txt(cx, ybar+size, den, {size, fill:color, weight:700, anchor:'middle'});
}
function eqrow(ybar, color, size, hw, cs, fr) {
  let o='';
  fr.forEach((f,i)=> o += frac(cs[i], ybar, f[0], f[1], color, size, hw));
  for (let i=0;i<cs.length-1;i++) o += txt((cs[i]+cs[i+1])/2, ybar+12, '=', {size:size+6, fill:color, weight:700, anchor:'middle'});
  return o;
}

// ERREUR
svg += txt(CL, 395, 'Erreur sur les égalités :', {size:44, fill:ROUGE, weight:700});
svg += eqrow(478, ROUGE, 40, 40, [292,472,652], [['AB','BM'],['AC','CN'],['BC','MN']]);
svg += txt(CL+10, 552, '✗ on ne part pas du point A !', {size:36, fill:ROUGE});

// BONNE RÉDACTION
svg += txt(CL, 632, 'La bonne écriture :', {size:44, fill:VERT, weight:700});
svg += txt(CL+10, 689, '(BC) // (MN), d\'après Thalès :', {size:36, fill:VERT});
svg += eqrow(775, VERT, 44, 44, [300,500,700], [['AB','AM'],['AC','AN'],['BC','MN']]);
svg += txt(CL+10, 845, '(on part toujours de A, même ordre)', {size:34, fill:VERT});

// FIGURE Thalès (centrée bas)
const A=[540,905], M=[372,1205], N=[708,1205];
const f=0.45, B=[A[0]+f*(M[0]-A[0]), A[1]+f*(M[1]-A[1])], C=[A[0]+f*(N[0]-A[0]), A[1]+f*(N[1]-A[1])];
svg += `<polygon points="${A[0]},${A[1]} ${M[0]},${M[1]} ${N[0]},${N[1]}" fill="none" stroke="#222" stroke-width="2.5"/>`;
svg += line(B[0],B[1],C[0],C[1],BLEU,2.5);
// marques parallèles
svg += `<path d="M${(B[0]+C[0])/2-6} ${B[1]-8} l12 8 l-12 8" fill="none" stroke="#222" stroke-width="2"/>`;
svg += `<path d="M${(M[0]+N[0])/2-6} ${M[1]-8} l12 8 l-12 8" fill="none" stroke="#222" stroke-width="2"/>`;
svg += txt(A[0], A[1]-14, 'A', {size:32, fill:'#222', weight:700, anchor:'middle'});
svg += txt(M[0]-16, M[1]+30, 'M', {size:32, fill:'#222', weight:700, anchor:'end'});
svg += txt(N[0]+16, N[1]+30, 'N', {size:32, fill:'#222', weight:700});
svg += txt(B[0]-24, B[1]+8, 'B', {size:32, fill:'#222', weight:700, anchor:'end'});
svg += txt(C[0]+12, C[1]+8, 'C', {size:32, fill:'#222', weight:700});

// N° PAGE
svg += `<rect x="780" y="1370" width="70" height="60" rx="6" fill="none" stroke="${BLEU}" stroke-width="3"/>`;
svg += txt(815, 1416, '2', {size:46, fill:BLEU, weight:700, anchor:'middle'});

svg += `</svg>`;
fs.writeFileSync('/tmp/th2.svg', svg);
sharp(Buffer.from(svg)).png().toFile('/home/user/anag-site/preview-thales.png')
  .then(i => console.log('PNG OK', i.width+'x'+i.height))
  .catch(e => { console.error('ERR', e); process.exit(1); });
