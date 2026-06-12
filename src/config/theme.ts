// ─────────────────────────────────────────────────────────────────────────────
// Design tokens consumed by JS/TS (GSAP, Framer Motion, Three.js, canvas).
// The same palette is mirrored as CSS custom properties + Tailwind v4 @theme
// tokens in app/globals.css. Keep the two in sync.
// ─────────────────────────────────────────────────────────────────────────────

export const palette = {
  templeStone: "#3A211D",
  royalMaroon: "#5E1826",
  deepWine: "#741F3A",
  kumkumRed: "#9E2637",
  antiqueGold: "#C5A15A",
  champagneGold: "#E4C98E",
  warmIvory: "#F8F0DF",
  sandalwood: "#D6B58A",
  turmeric: "#D5A437",
  lotusRose: "#B95872",
  peacockGreen: "#174E48",
  emeraldDepth: "#153B34",
  silkPlum: "#3D2039",
  earthBrown: "#68452F",
  moonCream: "#FFF9ED",
} as const;

// Per-chapter sub-palettes — never show every colour at once.
export const chapterPalettes = {
  hero: { bg: palette.royalMaroon, accent: palette.antiqueGold, text: palette.warmIvory },
  education: { bg: palette.emeraldDepth, accent: palette.champagneGold, text: palette.moonCream },
  career: { bg: palette.templeStone, accent: palette.antiqueGold, text: palette.warmIvory },
  family: { bg: palette.sandalwood, accent: palette.turmeric, text: palette.templeStone },
  roots: { bg: palette.earthBrown, accent: palette.turmeric, text: palette.moonCream },
  personality: { bg: palette.silkPlum, accent: palette.champagneGold, text: palette.warmIvory },
  gallery: { bg: palette.silkPlum, accent: palette.champagneGold, text: palette.moonCream },
  values: { bg: palette.deepWine, accent: palette.antiqueGold, text: palette.warmIvory },
  finale: { bg: palette.warmIvory, accent: palette.lotusRose, text: palette.royalMaroon },
} as const;

export type ChapterKey = keyof typeof chapterPalettes;

// Motion tokens — use everywhere. Consistency is what reads as expensive.
export const motion = {
  ease: {
    silk: [0.16, 1, 0.3, 1] as [number, number, number, number], // primary reveal
    stone: [0.65, 0, 0.35, 1] as [number, number, number, number], // heavy doors
    drift: [0.25, 0.1, 0.25, 1] as [number, number, number, number], // ambient parallax
  },
  // CSS cubic-bezier strings (for GSAP / inline styles).
  easeCss: {
    silk: "cubic-bezier(0.16, 1, 0.3, 1)",
    stone: "cubic-bezier(0.65, 0, 0.35, 1)",
    drift: "cubic-bezier(0.25, 0.1, 0.25, 1)",
  },
  dur: { fast: 0.4, base: 0.8, slow: 1.4, cinematic: 2.2 }, // seconds
  stagger: 0.08,
} as const;

export const fonts = {
  display: "var(--font-cormorant)",
  displayAlt: "var(--font-playfair)",
  carved: "var(--font-cinzel)",
  body: "var(--font-manrope)",
  teluguSerif: "var(--font-noto-serif-telugu)",
  teluguSans: "var(--font-noto-sans-telugu)",
} as const;
