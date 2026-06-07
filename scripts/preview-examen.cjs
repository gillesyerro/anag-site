/* Aperçu PNG 1080x1920 — COPIE D'EXAMEN (Brevet) facon Santori,
   recalee DANS la safe zone TikTok (repères affichés).
   Header officiel ECYC + hook rouge + "Le tuto ->" + page 1/4. */
const sharp = require('sharp');
const fs = require('fs');

const W = 1080, H = 1920;
const BLEU = '#1c3fa8', ROUGE = '#d11f1f', NOIR = '#222';
const HAND = 'Caveat', SANS = 'DejaVu Sans';

// safe zone
const S_TOP = 160, S_BOT = 480, S_RIGHT = 130, S_LEFT = 50;
const SR = W - S_RIGHT;            // 950
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function t(x,y,s,{size=28,fill=NOIR,weight=400,family=SANS,anchor='start',italic=false,style=''}={}){
  const it = italic ? 'font-style="italic"' : '';
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" ${it} style="${style}">${esc(s)}</text>`;
}
const R = (x,y,w,h,{s=NOIR,f='none',sw=1.5,rx=0}={}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" stroke="${s}" stroke-width="${sw}"/>`;
const L = (x1,y1,x2,y2,c=NOIR,w=1.5) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}"/>`;
// rangee de cases + lettres manuscrites
function cases(x,y,bw,bh,n,fill=''){
  let o='';
  for(let i=0;i<n;i++) o+=R(x+i*bw,y,bw,bh,{s:'#555',sw:1.2});
  const ch=[...fill];
  for(let i=0;i<ch.length && i<n;i++) o+=t(x+i*bw+bw/2, y+bh-12, ch[i], {family:HAND,size:38,fill:BLEU,weight:700,anchor:'middle'});
  return o;
}

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
svg += `<rect width="${W}" height="${H}" fill="#ffffff"/>`;

// lignes du corps (copie reglee)
for(let y=780;y<=1440;y+=68) svg += L(S_LEFT, y, SR, y, '#cfd6e6', 1.2);

/* ============ EN-TÊTE OFFICIEL (dans la safe zone) ============ */
const HX=S_LEFT, HY=S_TOP+8, HW=SR-S_LEFT;   // x50 y168 w900
const HBOT=720;
svg += R(HX,HY,HW,HBOT-HY,{s:NOIR,sw:2});

// -- identité
svg += t(HX+14, HY+26, 'Modèle ECYC - EONE', {size:18, fill:'#888'});
svg += t(HX+14, HY+70, 'Nom de famille', {size:24, weight:700});
svg += t(HX+186, HY+70, '(de naissance)', {size:17, fill:'#666'});
svg += t(HX+14, HY+92, "(Suivi, s'il y a lieu, du nom d'usage)", {size:15, fill:'#888', italic:true});
svg += cases(HX+300, HY+44, 46, 50, 12, 'CASIO');
svg += t(HX+14, HY+150, 'Prénom(s) :', {size:24, weight:700});
svg += cases(HX+300, HY+120, 46, 50, 12, 'STATISTIQUE');
svg += L(HX, HY+178, HX+HW, HY+178, NOIR, 1.5);

// -- bloc numéros
const NY=HY+178;
// drapeau RF
svg += R(HX+18, NY+22, 54, 36, {s:'#999', sw:1});
svg += `<rect x="${HX+18}" y="${NY+22}" width="18" height="36" fill="#1c3fa8"/><rect x="${HX+54}" y="${NY+22}" width="18" height="36" fill="#d11f1f"/>`;
svg += t(HX+82, NY+44, 'RF', {size:22, weight:700});
svg += t(HX+18, NY+78, 'Liberté', {size:14, fill:'#666', italic:true});
svg += t(HX+18, NY+96, 'Égalité', {size:14, fill:'#666', italic:true});
svg += t(HX+18, NY+114, 'Fraternité', {size:14, fill:'#666', italic:true});
// numéros candidat / inscription
svg += t(HX+170, NY+44, 'N° candidat :', {size:22, weight:700});
svg += cases(HX+340, NY+18, 44, 40, 5, '31415');
svg += t(HX+170, NY+98, "N° d'inscription :", {size:22, weight:700});
svg += cases(HX+390, NY+72, 44, 40, 7, '9265358');
svg += t(HX+170, NY+138, 'Les numéros figurent sur la convocation.', {size:15, fill:'#888', italic:true});
// né(e) le + 1.1
svg += t(HX+700, NY+34, 'Né(e)', {size:18, fill:'#444'});
svg += t(HX+700, NY+54, 'le :', {size:18, fill:'#444'});
svg += R(HX+760, NY+22, 40, 40, {s:'#555', sw:1.2});
svg += t(HX+780, NY+52, '3', {family:HAND, size:34, fill:BLEU, weight:700, anchor:'middle'});
svg += R(HX+800, NY+22, 56, 40, {s:'#555', sw:1.2});
svg += t(HX+828, NY+50, 'ème', {family:HAND, size:26, fill:BLEU, weight:700, anchor:'middle'});
svg += t(HX+HW-14, NY+150, '1.1', {size:18, fill:'#666', anchor:'end'});
svg += L(HX, NY+160, HX+HW, NY+160, NOIR, 1.5);

// -- infos épreuve
const EY=NY+160;
svg += t(HX+14, EY+44, 'Concours / Examen :', {size:24, weight:700});
svg += t(HX+300, EY+46, 'BREVET DES COLLÈGES', {family:HAND, size:46, fill:BLEU, weight:700});
svg += t(HX+14, EY+98, 'Section / Spécialité / Série :', {size:24, weight:700});
svg += t(HX+380, EY+100, 'MATHS – Casio fx-92', {family:HAND, size:42, fill:BLEU, weight:700});
svg += t(HX+14, EY+150, 'Épreuve :', {size:24, weight:700});
svg += t(HX+170, EY+152, 'FICHE – STATISTIQUES', {family:HAND, size:44, fill:BLEU, weight:700});
svg += `<ellipse cx="${HX+430}" cy="${EY+143}" rx="320" ry="40" fill="none" stroke="${ROUGE}" stroke-width="4"/>`;
svg += t(HX+14, EY+200, 'Matière :', {size:24, weight:700});
svg += t(HX+170, EY+202, 'Maths', {family:HAND, size:42, fill:BLEU, weight:700});
svg += L(HX, EY+222, HX+HW, EY+222, NOIR, 1.5);

// -- consignes + session
const CY=EY+222;
svg += t(HX+38, CY+96, 'C O N S I G N E S', {size:13, fill:'#777', anchor:'middle', style:`writing-mode:tb;`});
const cons=['• Remplir soigneusement, en majuscules, le cadre d\'identification.',
            '• Aucun signe distinctif ne doit permettre d\'identifier le candidat.',
            '• Écrire à l\'encre foncée. Ne pas composer dans la marge.',
            '• Numéroter chaque page et préciser le nombre total de pages.'];
cons.forEach((c,i)=> svg += t(HX+70, CY+34+i*24, c, {size:15, fill:'#555'}));
svg += L(HX+720, CY, HX+720, HBOT, NOIR, 1.5);
svg += t(HX+740, CY+44, 'Session :', {size:24, weight:700});
svg += t(HX+760, CY+110, '2026', {family:HAND, size:46, fill:BLEU, weight:700});

/* ============ HOOK ============ */
svg += t(540, 940, 'TA MOYENNE', {family:HAND, size:104, fill:ROUGE, weight:700, anchor:'middle'});
svg += t(540, 1050, 'EN 5 SECONDES', {family:HAND, size:104, fill:ROUGE, weight:700, anchor:'middle'});

/* ============ LE TUTO -> ============ */
svg += t(380, 1290, 'Le tuto', {family:HAND, size:60, fill:BLEU, weight:700});
svg += L(560, 1272, 700, 1272, BLEU, 5);
svg += `<path d="M700 1272 L674 1256 M700 1272 L674 1288" fill="none" stroke="${BLEU}" stroke-width="5"/>`;

/* ============ PAGE x / y (au-dessus de la zone basse) ============ */
svg += t(700, 1382, 'Page / nombre total de pages', {size:18, fill:'#777', italic:true});
svg += R(700, 1394, 50, 46, {s:'#555', sw:1.2});
svg += t(725, 1428, '1', {family:HAND, size:36, fill:BLEU, weight:700, anchor:'middle'});
svg += t(762, 1430, '/', {size:34, fill:'#555'});
svg += R(788, 1394, 50, 46, {s:'#555', sw:1.2});
svg += t(813, 1428, '4', {family:HAND, size:36, fill:BLEU, weight:700, anchor:'middle'});

/* ============ REPÈRES SAFE ZONE ============ */
const z='rgba(209,31,31,.10)';
svg += `<rect x="0" y="0" width="${W}" height="${S_TOP}" fill="${z}"/>`;
svg += `<rect x="0" y="${H-S_BOT}" width="${W}" height="${S_BOT}" fill="${z}"/>`;
svg += `<rect x="${SR}" y="0" width="${S_RIGHT}" height="${H}" fill="${z}"/>`;
svg += `<rect x="${S_LEFT}" y="${S_TOP}" width="${SR-S_LEFT}" height="${H-S_BOT-S_TOP}" fill="none" stroke="rgba(28,63,168,.55)" stroke-width="3" stroke-dasharray="14 10"/>`;
svg += t(S_LEFT+8, S_TOP-12, 'zone sûre TikTok', {size:22, fill:'rgba(209,31,31,.8)', weight:700});

svg += `</svg>`;
fs.writeFileSync('/tmp/examen.svg', svg);
sharp(Buffer.from(svg)).png().toFile('/home/user/anag-site/preview-examen-brevet.png')
  .then(i => console.log('PNG OK', i.width+'x'+i.height))
  .catch(e => { console.error('ERR', e); process.exit(1); });
