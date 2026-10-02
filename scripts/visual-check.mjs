import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

await mkdir('artifacts', { recursive: true });
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome' });
try {
  for (const width of [320, 390, 768, 1440, 1920]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    await page.goto(`http://127.0.0.1:3000${process.env.NEXT_PUBLIC_BASE_PATH || ''}/`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const dimensions = await page.evaluate(() => ({ width: innerWidth, contentWidth: document.documentElement.scrollWidth, height: document.body.scrollHeight, mainCount: document.querySelectorAll('main').length }));
    if (dimensions.contentWidth > width || dimensions.mainCount !== 1) throw new Error(`Invalid layout at ${width}: ${JSON.stringify(dimensions)}`);
    await page.screenshot({ path: `artifacts/final-${width}.png`, fullPage: width === 390 });
    console.log(`${width}px: no overflow, one main element, ${dimensions.height}px content`);
    await page.close();
  }
} finally { await browser.close(); }
