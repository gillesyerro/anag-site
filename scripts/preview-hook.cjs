/* Aperçu PNG 1080x1920 — slide HOOK (Pythagore 4ème).
   Fond Seyès (grands carreaux) + trous de classeur.
   Header humoristique + espace commentaire (note) + gros hook + flèche.
   AUCUNE correction. */
const sharp = require('sharp');
const fs = require('fs');

const W = 1080, H = 1920;
const BLEU = '#2342a8', ROUGE = '#d11f1f', PAPIER = '#fdfdfb';
const FINE = '#e4e9f4', FORTE = '#b9c6e6', MARGE = '#e08a8a';
const HAND = 'Caveat';

const CAR = 56;            // gros carreau (Seyès, interligne fort)
const SOUS = CAR / 4;      // sous-lignes horizontales
const MARGIN = CAR * 3;    // marge rouge
const CL = MARGIN + 24;    // contenu, à droite de la marge

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function txt(x,y,s,{size=40,fill=BLEU,weight=400,anchor='start',style=''}={}) {
  return `<text x="${x}" y="${y}" font-family="${HAND}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" style="${style}">${esc(s)}</text>`;
}
const line = (x1,y1,x2,y2,c,w) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}"/>`;

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
svg += `<rect width="${W}" height="${H}" fill="${PAPIER}"/>`;

// ---------- QUADRILLAGE SEYÈS ----------
for (let y = 0; y <= H; y += SOUS) svg += line(0, y, W, y, FINE, 1);          // fines horizontales
for (let y = 0; y <= H; y += CAR)  svg += line(0, y, W, y, FORTE, 1.2);       // fortes horizontales
for (let x = 0; x <= W; x += CAR)  svg += line(x, 0, x, H, FORTE, 1.2);       // verticales
svg += line(MARGIN, 0, MARGIN, H, MARGE, 2);                                  // marge rouge

// ---------- TROUS DE CLASSEUR ----------
const hx = 40;
for (let y = 150; y <= H - 120; y += 240) {
  svg += `<circle cx="${hx}" cy="${y}" r="15" fill="#c7ccd4" stroke="#aab0bb" stroke-width="2"/>`;
}

// ---------- EN-TÊTE (humour, noms empilés pour rester dans la safe zone) ----------
svg += txt(CL, 205, 'Nom : ÉLÈVE', {size:50, weight:700});
svg += txt(CL, 267, 'Prénom : EN DÉTRESSE', {size:50, weight:700});
svg += txt(CL, 329, 'Classe : 4ème B', {size:50, weight:700});

// ---------- ESPACE COMMENTAIRE (cadre + note) ----------
const bx=CL, by=370, bw=950-CL, bh=200;
svg += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="6" fill="#ffffff" fill-opacity="0.55" stroke="${ROUGE}" stroke-width="2"/>`;
const nx=bx+18, ny=by+22, nw=150, nh=156;
svg += `<rect x="${nx}" y="${ny}" width="${nw}" height="${nh}" rx="4" fill="none" stroke="${ROUGE}" stroke-width="2"/>`;
svg += txt(nx+nw/2, ny+92, '04', {size:74, fill:ROUGE, weight:700, anchor:'middle'});
svg += txt(nx+nw/2, ny+138, '/ 20', {size:30, fill:ROUGE, weight:700, anchor:'middle'});
svg += txt(bx+200, by+52, 'Commentaire :', {size:40, fill:ROUGE, weight:700, style:'text-decoration:underline'});
svg += txt(bx+200, by+108, 'Même Pythagore a renoncé', {size:40, fill:ROUGE});
svg += txt(bx+200, by+158, 'en lisant ta copie...', {size:40, fill:ROUGE});

// ---------- HOOK ----------
svg += txt(540, 760, "L'ERREUR DE PYTHAGORE", {size:78, fill:ROUGE, weight:700, anchor:'middle'});
svg += txt(540, 858, 'QUI FAIT PLEURER', {size:78, fill:ROUGE, weight:700, anchor:'middle'});
svg += txt(540, 956, 'TON PROF', {size:78, fill:ROUGE, weight:700, anchor:'middle'});

// ---------- FLÈCHE ----------
svg += txt(CL+60, 1130, 'Sauve ta moyenne', {size:56, fill:BLEU, weight:700});
svg += line(740, 1112, 860, 1112, BLEU, 4);
svg += `<path d="M860 1112 L838 1098 M860 1112 L838 1126" fill="none" stroke="${BLEU}" stroke-width="4"/>`;

svg += `</svg>`;
fs.writeFileSync('/tmp/hook.svg', svg);
sharp(Buffer.from(svg)).png().toFile('/home/user/anag-site/preview-hook-pythagore.png')
  .then(i => console.log('PNG OK', i.width+'x'+i.height))
  .catch(e => { console.error('ERR', e); process.exit(1); });
