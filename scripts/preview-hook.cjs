/* Aperçu PNG 1080x1920 — slide HOOK (Pythagore 4ème).
   Style copie d'examen : header humoristique + espace commentaire (avec note)
   + gros hook rouge manuscrit + flèche. AUCUNE correction. */
const sharp = require('sharp');
const fs = require('fs');

const W = 1080, H = 1920;
const BLEU = '#2342a8', ROUGE = '#d11f1f', GRILLE = '#cdd7ee', PAPIER = '#fdfdfb';
const HAND = 'Caveat';
const SAFE_RIGHT = 130;
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function txt(x,y,s,{size=40,fill=BLEU,weight=400,anchor='start',style=''}={}) {
  return `<text x="${x}" y="${y}" font-family="${HAND}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" style="${style}">${esc(s)}</text>`;
}

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
const CAR = 52;            // gros carreaux
const MARGIN = CAR*3;      // marge rouge
const CL = MARGIN + 30;    // contenu à droite de la marge
svg += `<rect width="${W}" height="${H}" fill="${PAPIER}"/>`;
svg += `<defs><pattern id="g" width="${CAR}" height="${CAR}" patternUnits="userSpaceOnUse">
  <path d="M${CAR} 0H0V${CAR}" fill="none" stroke="${GRILLE}" stroke-width="1"/></pattern></defs>`;
svg += `<rect width="${W}" height="${H}" fill="url(#g)"/>`;
svg += `<line x1="${MARGIN}" y1="0" x2="${MARGIN}" y2="${H}" stroke="${ROUGE}" stroke-width="2"/>`;
svg += `<circle cx="27" cy="360" r="13" fill="#c7ccd4"/><circle cx="27" cy="1380" r="13" fill="#c7ccd4"/>`;

// ---------- EN-TÊTE (humour) ----------
svg += txt(CL, 215, 'Nom : ÉLÈVE', {size:50, weight:700});
svg += txt(560, 215, 'Prénom : EN DÉTRESSE', {size:50, weight:700});
svg += txt(CL, 285, 'Classe : 4ème B', {size:50, weight:700});

// ---------- ESPACE COMMENTAIRE (cadre + note) ----------
const bx=CL, by=330, bw=950-bx, bh=200;
svg += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="6" fill="#ffffff" fill-opacity="0.55" stroke="${ROUGE}" stroke-width="2"/>`;
// case note à gauche
const nx=bx+18, ny=by+22, nw=150, nh=156;
svg += `<rect x="${nx}" y="${ny}" width="${nw}" height="${nh}" rx="4" fill="none" stroke="${ROUGE}" stroke-width="2"/>`;
svg += txt(nx+nw/2, ny+92, '04', {size:74, fill:ROUGE, weight:700, anchor:'middle'});
svg += txt(nx+nw/2, ny+138, '/ 20', {size:30, fill:ROUGE, weight:700, anchor:'middle'});
// libellé + remarque (pas une correction)
svg += txt(bx+200, by+52, 'Commentaire :', {size:40, fill:ROUGE, weight:700, style:'text-decoration:underline'});
svg += txt(bx+200, by+108, 'Même Pythagore a renoncé', {size:40, fill:ROUGE});
svg += txt(bx+200, by+158, 'en lisant ta copie...', {size:40, fill:ROUGE});

// ---------- HOOK (gros, mordant, comme la copie d'examen) ----------
svg += txt(540, 760, "L'ERREUR DE PYTHAGORE", {size:78, fill:ROUGE, weight:700, anchor:'middle'});
svg += txt(540, 858, 'QUI FAIT PLEURER', {size:78, fill:ROUGE, weight:700, anchor:'middle'});
svg += txt(540, 956, 'TON PROF', {size:78, fill:ROUGE, weight:700, anchor:'middle'});

// ---------- FLÈCHE ----------
svg += txt(300, 1130, 'Sauve ta moyenne', {size:56, fill:BLEU, weight:700});
svg += `<line x1="730" y1="1112" x2="850" y2="1112" stroke="${BLEU}" stroke-width="4"/>`;
svg += `<path d="M850 1112 L828 1098 M850 1112 L828 1126" fill="none" stroke="${BLEU}" stroke-width="4"/>`;

svg += `</svg>`;
fs.writeFileSync('/tmp/hook.svg', svg);
sharp(Buffer.from(svg)).png().toFile('/home/user/anag-site/preview-hook-pythagore.png')
  .then(i => console.log('PNG OK', i.width+'x'+i.height))
  .catch(e => { console.error('ERR', e); process.exit(1); });
