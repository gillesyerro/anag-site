/* Génère un aperçu PNG 1080x1920 de la slide HOOK (Pythagore 4ème).
   Rendu SVG -> PNG via sharp. Police manuscrite : Caveat. */
const sharp = require('sharp');
const fs = require('fs');

const W = 1080, H = 1920;
const BLEU = '#2342a8', ROUGE = '#d11f1f', GRILLE = '#cdd7ee', PAPIER = '#fdfdfb';
const HAND = 'Caveat';

// safe zones
const SAFE_TOP = 160, SAFE_BOTTOM = 480, SAFE_RIGHT = 130, SAFE_LEFT = 70;
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function txt(x,y,s,{size=40,fill=BLEU,weight=400,family=HAND,anchor='start',rotate=0,style=''}={}) {
  const tr = rotate ? ` transform="rotate(${rotate} ${x} ${y})"` : '';
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${tr} style="${style}">${esc(s)}</text>`;
}

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
// fond papier
svg += `<rect width="${W}" height="${H}" fill="${PAPIER}"/>`;
// quadrillage
svg += `<defs><pattern id="g" width="30" height="30" patternUnits="userSpaceOnUse">
  <path d="M30 0H0V30" fill="none" stroke="${GRILLE}" stroke-width="1"/></pattern></defs>`;
svg += `<rect width="${W}" height="${H}" fill="url(#g)"/>`;
// marge rouge
svg += `<line x1="90" y1="0" x2="90" y2="${H}" stroke="${ROUGE}" stroke-width="2"/>`;
// trous
svg += `<circle cx="27" cy="360" r="13" fill="#c7ccd4"/><circle cx="27" cy="1380" r="13" fill="#c7ccd4"/>`;

// ---------- EN-TÊTE ----------
svg += txt(130, 215, 'Nom : Mathéo', {size:48, weight:700});
svg += txt(560, 215, 'Prénom : K.', {size:48, weight:700});
svg += txt(130, 285, 'Classe : 4ème B', {size:48, weight:700});

// ---------- CASE NOTE ----------
const nx=720, ny=175, nw=230, nh=200;
svg += `<rect x="${nx}" y="${ny}" width="${nw}" height="${nh}" rx="8" fill="#ffffff" fill-opacity="0.6" stroke="${ROUGE}" stroke-width="3"/>`;
svg += txt(nx+nw/2, ny+45, 'NOTE', {size:34, fill:ROUGE, weight:700, anchor:'middle'});
svg += txt(nx+nw/2, ny+135, '04', {size:96, fill:ROUGE, weight:700, anchor:'middle'});
svg += txt(nx+nw/2, ny+185, '/ 20', {size:42, fill:ROUGE, weight:700, anchor:'middle'});

// ---------- EXERCICE (copie élève) ----------
let y = 430;
svg += txt(130, y, 'Exercice — Théorème de Pythagore', {size:46, weight:700});
svg += `<line x1="130" y1="${y+10}" x2="820" y2="${y+10}" stroke="${BLEU}" stroke-width="2"/>`;
y += 70;
const lignes = [
  'ABC est un triangle rectangle en A.',
  'AB = 3 cm  ;  AC = 4 cm',
  'D\'après Pythagore :',
  'BC² = AB² + AC²',
  'BC² = 3² + 4² = 9 + 16 = 25',
  'BC = 25 cm',
];
lignes.forEach((l,i)=>{ svg += txt(150, y + i*58, l, {size:44}); });
const yErr = y + (lignes.length-1)*58; // ligne "BC = 25 cm"
// correction rouge sur la dernière ligne
svg += `<ellipse cx="245" cy="${yErr-12}" rx="135" ry="38" fill="none" stroke="${ROUGE}" stroke-width="4"/>`;
svg += txt(410, yErr-2, '✗  BC = √25 = 5 cm !', {size:42, fill:ROUGE, weight:700});
svg += txt(820, yErr-2, '− 4', {size:50, fill:ROUGE, weight:700});

// ---------- HOOK (mordant) ----------
let hy = yErr + 150;
svg += txt(540, hy,      'TU FAIS ENCORE', {size:78, fill:ROUGE, weight:700, anchor:'middle'});
svg += txt(540, hy+86,   'CETTE ERREUR ?', {size:78, fill:ROUGE, weight:700, anchor:'middle'});
svg += txt(540, hy+165,  '90% des 4ème oublient la racine carrée', {size:40, fill:BLEU, weight:700, anchor:'middle'});
svg += txt(540, hy+225,  'Le vrai résultat ? ➡️ swipe', {size:44, fill:BLEU, weight:700, anchor:'middle'});

// ---------- COMMENTAIRE PROF ----------
const cy = 1200, cx=130, cw=820, ch=210;
svg += `<rect x="${cx}" y="${cy}" width="${cw}" height="${ch}" rx="8" fill="#ffffff" fill-opacity="0.5" stroke="${ROUGE}" stroke-width="2"/>`;
svg += txt(cx+24, cy+50, 'Commentaire :', {size:40, fill:ROUGE, weight:700, style:'text-decoration:underline'});
svg += txt(cx+24, cy+108, 'BC = 25 ?! Non. Tu oublies la racine', {size:42, fill:ROUGE});
svg += txt(cx+24, cy+160, 'carrée À CHAQUE FOIS. BC = 5 cm. Revois !', {size:42, fill:ROUGE});

svg += `</svg>`;

fs.writeFileSync('/tmp/hook.svg', svg);
sharp(Buffer.from(svg)).png().toFile('/home/user/anag-site/preview-hook-pythagore.png')
  .then(i => console.log('PNG OK', i.width+'x'+i.height))
  .catch(e => { console.error('ERR', e); process.exit(1); });
