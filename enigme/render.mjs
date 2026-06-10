import puppeteer from 'puppeteer';
import path from 'node:path';

const out = process.argv[2] || 'enigme.jpeg';
const dir = path.resolve('.');
const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--force-device-scale-factor=1'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
await page.goto('file://' + path.join(dir, 'enigme.html'), { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 400));
const el = await page.$('.canvas');
await el.screenshot({
  path: out,
  type: out.endsWith('.png') ? 'png' : 'jpeg',
  quality: out.endsWith('.png') ? undefined : 95,
});
await browser.close();
console.log('written', out);
