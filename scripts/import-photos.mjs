// One-off: map the real photos (IMG_*.jpg) to role-named, optimized WebP files.
// Run: node scripts/import-photos.mjs
import sharp from "sharp";
import { rm } from "node:fs/promises";

const DIR = "public/images/venkat";

// real source  ->  role filename  (chosen by viewing each photo)
const map = [
  ["IMG_7881.jpg", "01-hero-portrait.webp"], // cafe, confident, to camera
  ["IMG_7883.jpg", "02-traditional.webp"],   // vibrant floral shirt
  ["IMG_7873.jpg", "03-outdoor.webp"],       // bus stop, open woods
  ["IMG_7875.jpg", "04-cambridge.webp"],     // UK brick wall
  ["IMG_7878.jpg", "05-professional.webp"],  // park, editorial profile
  ["IMG_7874.jpg", "06-casual.webp"],        // relaxed mirror shot
  ["IMG_7880.jpg", "09-travel.webp"],        // waterfall
  ["IMG_7879.jpg", "10-festival.webp"],      // bonfire, warm
  ["IMG_7876.jpg", "11-candid.webp"],        // B&W genuine smile
  ["IMG_7877.jpg", "12-final.webp"],         // denim, looking ahead
];

for (const [src, out] of map) {
  await sharp(`${DIR}/${src}`)
    .rotate() // respect EXIF orientation
    .resize({ width: 1400, height: 1800, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(`${DIR}/${out}`);
  console.log("✓", src, "→", out);
}

// Remove the source JPGs once converted.
for (const [src] of map) {
  await rm(`${DIR}/${src}`, { force: true });
}
console.log("Done. Real photos imported as optimized WebP.");
