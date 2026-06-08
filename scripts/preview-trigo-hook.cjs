/* Aperçu PNG 1080x1920 — HOOK Trigo (copie BLEUE, couleurs OM).
   PARIS / EST TRAGIQUE, classe Ligue 2, commentaire "À jamais les premiers". */
const sharp = require('sharp');
const fs = require('fs');

const W = 1080, H = 1920;
const BLEU = '#1d3c9e', ROUGE = '#d11f1f', PAPIER = '#e9f0fb';   // copie BLEUE
const FINE = '#d3e0f4', FORTE = '#a9c2e6', MARGE = '#3f63b5';
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
for (let y = 150; y <= H - 120; y += 240) svg += `<circle cx="40" cy="${y}" r="15" fill="#cdd9ee" stroke="#9fb4d8" stroke-width="2"/>`;

// EN-TÊTE
svg += txt(CL, 205, 'Nom : PARIS', {size:50, weight:700});
svg += txt(CL, 267, 'Prénom : EST TRAGIQUE', {size:50, weight:700});
svg += txt(CL, 329, 'Classe : Ligue 2', {size:50, weight:700});

// COMMENTAIRE + NOTE
const bx=CL, by=370, bw=950-CL, bh=200;
svg += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="6" fill="#ffffff" fill-opacity="0.55" stroke="${ROUGE}" stroke-width="2"/>`;
const nx=bx+18, ny=by+22, nw=150, nh=156;
svg += `<rect x="${nx}" y="${ny}" width="${nw}" height="${nh}" rx="4" fill="none" stroke="${ROUGE}" stroke-width="2"/>`;
svg += txt(nx+nw/2, ny+92, '04', {size:74, fill:ROUGE, weight:700, anchor:'middle'});
svg += txt(nx+nw/2, ny+138, '/ 20', {size:30, fill:ROUGE, weight:700, anchor:'middle'});
svg += txt(bx+200, by+52, 'Commentaire :', {size:40, fill:ROUGE, weight:700, style:'text-decoration:underline'});
svg += txt(bx+200, by+108, 'À jamais les premiers.', {size:40, fill:ROUGE});
svg += txt(bx+200, by+158, '(signé : Marseille)', {size:36, fill:ROUGE});

// HOOK
svg += txt(540, 720, "L'ERREUR DE TRIGO", {size:78, fill:ROUGE, weight:700, anchor:'middle'});
svg += txt(540, 808, 'QUI FAIT COULER', {size:78, fill:ROUGE, weight:700, anchor:'middle'});
svg += txt(540, 896, 'TA MOYENNE', {size:78, fill:ROUGE, weight:700, anchor:'middle'});

// FLÈCHE
svg += txt(330, 1060, 'La correction', {size:56, fill:BLEU, weight:700});
svg += line(700, 1042, 820, 1042, BLEU, 4);
svg += `<path d="M820 1042 L798 1028 M820 1042 L798 1056" fill="none" stroke="${BLEU}" stroke-width="4"/>`;

// N° PAGE
svg += `<rect x="780" y="1370" width="70" height="60" rx="6" fill="none" stroke="${BLEU}" stroke-width="3"/>`;
svg += txt(815, 1416, '1', {size:46, fill:BLEU, weight:700, anchor:'middle'});

svg += `</svg>`;
fs.writeFileSync('/tmp/tr.svg', svg);
sharp(Buffer.from(svg)).png().toFile('/home/user/anag-site/preview-trigo-hook.png')
  .then(i => console.log('PNG OK', i.width+'x'+i.height))
  .catch(e => { console.error('ERR', e); process.exit(1); });
