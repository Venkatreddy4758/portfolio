// Generates tasteful gradient placeholder portraits so the site runs before the
// 12 real photos are added. Run: node scripts/gen-placeholders.mjs
// Overwrite each file in public/images/venkat/ with the real photo when ready.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const OUT = "public/images/venkat";
await mkdir(OUT, { recursive: true });

// Mirror of src/data/photos.ts (kept minimal here on purpose).
const photos = [
  { file: "01-hero-portrait", title: "Portrait of Purpose", a: "#741f3a", b: "#3a211d", mobile: true },
  { file: "02-traditional", title: "Rooted in Tradition", a: "#5e1826", b: "#3a211d" },
  { file: "03-outdoor", title: "Open Skies", a: "#174e48", b: "#153b34" },
  { file: "04-cambridge", title: "A Chapter Abroad", a: "#153b34", b: "#3a211d" },
  { file: "05-professional", title: "Quiet Confidence", a: "#3d2039", b: "#3a211d" },
  { file: "06-casual", title: "At Ease", a: "#68452f", b: "#3a211d" },
  { file: "07-family", title: "The Ones Who Shaped Him", a: "#d6b58a", b: "#68452f" },
  { file: "08-native", title: "Where It Began", a: "#68452f", b: "#3a211d" },
  { file: "09-travel", title: "Distances Travelled", a: "#741f3a", b: "#174e48" },
  { file: "10-festival", title: "In Celebration", a: "#9e2637", b: "#5e1826" },
  { file: "11-candid", title: "A Genuine Smile", a: "#b95872", b: "#5e1826" },
  { file: "12-final", title: "Ready to Begin", a: "#f8f0df", b: "#b95872" },
];

function svg(w, h, p) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${p.a}"/>
      <stop offset="1" stop-color="${p.b}"/>
    </linearGradient>
    <radialGradient id="v" cx="50%" cy="38%" r="75%">
      <stop offset="0" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.45"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#v)"/>
  <g fill="none" stroke="#c5a15a" stroke-opacity="0.5">
    <rect x="${w * 0.06}" y="${h * 0.06}" width="${w * 0.88}" height="${h * 0.88}" stroke-width="2"/>
  </g>
  <circle cx="${w / 2}" cy="${h * 0.4}" r="${Math.min(w, h) * 0.12}" fill="none" stroke="#e4c98e" stroke-opacity="0.6" stroke-width="1.5"/>
  <text x="${w / 2}" y="${h * 0.41}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.min(w, h) * 0.08}" fill="#e4c98e">VR</text>
  <text x="${w / 2}" y="${h * 0.62}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.min(w, h) * 0.045}" fill="#f8f0df" fill-opacity="0.92">${p.title}</text>
  <text x="${w / 2}" y="${h * 0.68}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.min(w, h) * 0.028}" fill="#c5a15a" letter-spacing="3">PLACEHOLDER · REPLACE WITH REAL PHOTO</text>
</svg>`;
}

for (const p of photos) {
  await sharp(Buffer.from(svg(1200, 1500, p)))
    .webp({ quality: 82 })
    .toFile(`${OUT}/${p.file}.webp`);
  if (p.mobile) {
    await sharp(Buffer.from(svg(750, 1000, p)))
      .webp({ quality: 80 })
      .toFile(`${OUT}/${p.file}-mobile.webp`);
  }
  console.log("✓", p.file);
}
console.log("Placeholders generated in", OUT);
