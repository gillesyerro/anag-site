// Générateur d'icônes PWA en Node pur (sans dépendance).
// Dessine un fond dégradé + un livre ouvert blanc avec une coche verte.
// Produit des PNG RGBA 8 bits. Lance : `node icons/generate-icons.mjs`
import { deflateSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));

// --- mini moteur de rendu (buffer RGBA) ---------------------------------
function createCanvas(size) {
  const px = new Uint8ClampedArray(size * size * 4);
  return { size, px };
}
function setPx(c, x, y, [r, g, b, a]) {
  if (x < 0 || y < 0 || x >= c.size || y >= c.size) return;
  const i = (y * c.size + x) * 4;
  const ia = a / 255;
  c.px[i]     = c.px[i]     * (1 - ia) + r * ia;
  c.px[i + 1] = c.px[i + 1] * (1 - ia) + g * ia;
  c.px[i + 2] = c.px[i + 2] * (1 - ia) + b * ia;
  c.px[i + 3] = Math.max(c.px[i + 3], a);
}
function lerp(a, b, t) { return a + (b - a) * t; }

// Remplissage d'un polygone (scanline) avec léger anti-crénelage par sur-échantillon.
function fillPoly(c, pts, color) {
  let minY = Infinity, maxY = -Infinity;
  for (const [, y] of pts) { minY = Math.min(minY, y); maxY = Math.max(maxY, y); }
  minY = Math.max(0, Math.floor(minY));
  maxY = Math.min(c.size - 1, Math.ceil(maxY));
  for (let y = minY; y <= maxY; y++) {
    const cy = y + 0.5;
    const xs = [];
    for (let i = 0; i < pts.length; i++) {
      const [x1, y1] = pts[i];
      const [x2, y2] = pts[(i + 1) % pts.length];
      if ((y1 <= cy && y2 > cy) || (y2 <= cy && y1 > cy)) {
        xs.push(x1 + (cy - y1) / (y2 - y1) * (x2 - x1));
      }
    }
    xs.sort((a, b) => a - b);
    for (let k = 0; k < xs.length; k += 2) {
      const xa = Math.round(xs[k]);
      const xb = Math.round(xs[k + 1]);
      for (let x = xa; x < xb; x++) setPx(c, x, y, color);
    }
  }
}
function fillRoundedRect(c, x0, y0, w, h, rad, color) {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dx = Math.min(x, w - 1 - x);
      const dy = Math.min(y, h - 1 - y);
      if (dx < rad && dy < rad) {
        const d = Math.hypot(rad - dx, rad - dy);
        if (d > rad) continue;
      }
      setPx(c, x0 + x, y0 + y, color);
    }
  }
}

// --- PNG encoder (8-bit RGBA) -------------------------------------------
function crc32(buf) {
  let crc = ~0;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) crc = (crc >>> 1) ^ (0xEDB88320 & -(crc & 1));
  }
  return ~crc >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const t = Buffer.from(type, 'ascii');
  const body = Buffer.concat([t, data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}
function encodePng(c) {
  const { size, px } = c;
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6; // 8 bits, RGBA
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0; // filtre 0
    for (let x = 0; x < size * 4; x++) {
      raw[y * (size * 4 + 1) + 1 + x] = px[y * size * 4 + x];
    }
  }
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// --- dessin de l'icône ---------------------------------------------------
function drawIcon(size, { fullBleed = false } = {}) {
  const c = createCanvas(size);
  // fond dégradé bleu ClicMaths (navy -> bleu royal)
  const top = [30, 58, 138], bot = [37, 99, 235];
  for (let y = 0; y < size; y++) {
    const t = y / (size - 1);
    const col = [lerp(top[0], bot[0], t), lerp(top[1], bot[1], t), lerp(top[2], bot[2], t), 255];
    for (let x = 0; x < size; x++) setPx(c, x, y, col);
  }
  // zone de sécurité : on garde le dessin dans ~62% au centre (compatible maskable)
  const s = size;
  const cx = s / 2, cy = s * 0.47;
  const bw = s * (fullBleed ? 0.38 : 0.33);  // demi-largeur du livre
  const bh = s * (fullBleed ? 0.26 : 0.22);  // demi-hauteur
  const white = [255, 255, 255, 255];
  const shadow = [60, 40, 120, 80];
  const spineGap = s * 0.02;
  // ombre portée
  fillPoly(c, [
    [cx - bw + s * 0.01, cy - bh + s * 0.02 + s * 0.015],
    [cx - spineGap + s * 0.015, cy - bh * 0.7 + s * 0.015],
    [cx - spineGap + s * 0.015, cy + bh + s * 0.015],
    [cx - bw + s * 0.01, cy + bh * 0.8 + s * 0.015],
  ], shadow);
  // page gauche
  fillPoly(c, [
    [cx - bw, cy - bh],
    [cx - spineGap, cy - bh * 0.7],
    [cx - spineGap, cy + bh],
    [cx - bw, cy + bh * 0.8],
  ], white);
  // page droite
  fillPoly(c, [
    [cx + bw, cy - bh],
    [cx + spineGap, cy - bh * 0.7],
    [cx + spineGap, cy + bh],
    [cx + bw, cy + bh * 0.8],
  ], white);
  // lignes de texte (gris clair) sur la page droite
  const lineCol = [180, 180, 200, 255];
  for (let i = 0; i < 4; i++) {
    const ly = cy - bh * 0.45 + i * bh * 0.42;
    fillPoly(c, [
      [cx + spineGap + s * 0.03, ly],
      [cx + bw - s * 0.05, ly - s * 0.01],
      [cx + bw - s * 0.05, ly + s * 0.012],
      [cx + spineGap + s * 0.03, ly + s * 0.022],
    ], lineCol);
  }
  // pastille bleu clair avec coche en bas à droite
  const r = s * 0.16;
  const gx = cx + bw * 0.55, gy = cy + bh * 0.75;
  const badge = [56, 189, 248, 255]; // bleu ciel ClicMaths
  for (let y = -r; y <= r; y++) {
    for (let x = -r; x <= r; x++) {
      if (x * x + y * y <= r * r) setPx(c, Math.round(gx + x), Math.round(gy + y), badge);
    }
  }
  // coche blanche
  const t2 = s * 0.028;
  function thickLine(x1, y1, x2, y2) {
    const steps = Math.ceil(Math.hypot(x2 - x1, y2 - y1));
    for (let i = 0; i <= steps; i++) {
      const px2 = lerp(x1, x2, i / steps), py2 = lerp(y1, y2, i / steps);
      for (let dy = -t2; dy <= t2; dy++)
        for (let dx = -t2; dx <= t2; dx++)
          if (dx * dx + dy * dy <= t2 * t2) setPx(c, Math.round(px2 + dx), Math.round(py2 + dy), white);
    }
  }
  thickLine(gx - r * 0.45, gy, gx - r * 0.05, gy + r * 0.4);
  thickLine(gx - r * 0.05, gy + r * 0.4, gx + r * 0.5, gy - r * 0.4);
  return c;
}

const targets = [
  { name: 'icon-192.png', size: 192, opts: {} },
  { name: 'icon-512.png', size: 512, opts: {} },
  { name: 'apple-touch-icon.png', size: 180, opts: { fullBleed: true } },
];
for (const t of targets) {
  const c = drawIcon(t.size, t.opts);
  writeFileSync(join(here, t.name), encodePng(c));
  console.log('écrit', t.name, `(${t.size}px)`);
}
