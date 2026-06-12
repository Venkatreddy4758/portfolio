"use client";

// Sample an average/dominant colour from an image for ambient gallery tinting.
// Returns an rgb() string; falls back to a warm plum if sampling isn't possible.
const FALLBACK = "rgb(61, 32, 57)"; // silk-plum

const cache = new Map<string, string>();

export async function sampleImageColor(src: string): Promise<string> {
  if (typeof window === "undefined") return FALLBACK;
  if (cache.has(src)) return cache.get(src)!;
  try {
    const color = await new Promise<string>((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const w = (canvas.width = 24);
        const h = (canvas.height = 24);
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return resolve(FALLBACK);
        ctx.drawImage(img, 0, 0, w, h);
        try {
          const { data } = ctx.getImageData(0, 0, w, h);
          let r = 0, g = 0, b = 0, n = 0;
          for (let i = 0; i < data.length; i += 4) {
            r += data[i]; g += data[i + 1]; b += data[i + 2]; n++;
          }
          // Slightly deepen for a richer ambient backdrop.
          const f = 0.82;
          resolve(`rgb(${Math.round((r / n) * f)}, ${Math.round((g / n) * f)}, ${Math.round((b / n) * f)})`);
        } catch {
          resolve(FALLBACK);
        }
      };
      img.onerror = () => resolve(FALLBACK);
      img.src = src;
    });
    cache.set(src, color);
    return color;
  } catch {
    return FALLBACK;
  }
}
