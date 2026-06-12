"use client";
// Signature photo feature: a full-bleed "letterbox aperture" that opens from a
// thin horizontal slit to a full cinematic frame as it scrolls through view.
// A gold hairline frame traces in and an editorial caption rises. Scroll-scrubbed
// with Framer Motion; degrades to a static framed image under reduced-motion.
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Photo } from "@/data/photos";
import { Portrait } from "./Portrait";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Props = {
  photo: Photo;
  kicker?: string;
  title?: string;
  caption?: string;
  height?: string; // tailwind height for the band
};

export function CinematicReveal({
  photo,
  kicker,
  title,
  caption,
  height = "h-[78vh]",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Aperture: thin centre slit (45/45 inset) → fully open (0/0).
  const insetTop = useTransform(scrollYProgress, [0, 1], [46, 0]);
  const insetBottom = useTransform(scrollYProgress, [0, 1], [46, 0]);
  const clip = useTransform(
    [insetTop, insetBottom],
    ([t, b]: number[]) => `inset(${t}% 0% ${b}% 0%)`
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  const frameOpacity = useTransform(scrollYProgress, [0.4, 1], [0, 1]);
  const capY = useTransform(scrollYProgress, [0.55, 1], [40, 0]);
  const capOpacity = useTransform(scrollYProgress, [0.55, 1], [0, 1]);

  return (
    <section ref={ref} className={`relative w-full overflow-hidden bg-cream ${height}`}>
      {/* the opening image */}
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { clipPath: clip as unknown as string }}
      >
        <motion.div className="absolute inset-0" style={reduced ? undefined : { scale }}>
          <Portrait photo={photo} sizes="100vw" priority={false} />
        </motion.div>
        {/* gentle legibility scrim at the bottom */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />
      </motion.div>

      {/* gold hairline frame */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-6 md:inset-10"
        style={reduced ? { opacity: 1 } : { opacity: frameOpacity }}
      >
        <div className="h-full w-full border border-champagne-gold/70" />
        <span className="absolute -left-px -top-px h-5 w-5 border-l-2 border-t-2 border-champagne-gold" />
        <span className="absolute -right-px -top-px h-5 w-5 border-r-2 border-t-2 border-champagne-gold" />
        <span className="absolute -bottom-px -left-px h-5 w-5 border-b-2 border-l-2 border-champagne-gold" />
        <span className="absolute -bottom-px -right-px h-5 w-5 border-b-2 border-r-2 border-champagne-gold" />
      </motion.div>

      {/* editorial caption */}
      {(kicker || title || caption) && (
        <motion.div
          className="absolute inset-x-0 bottom-12 z-10 px-10 text-center md:bottom-16"
          style={reduced ? undefined : { y: capY, opacity: capOpacity }}
        >
          {kicker && (
            <p className="mb-2 font-carved text-[11px] uppercase tracking-[0.4em] text-champagne-gold">
              {kicker}
            </p>
          )}
          {title && (
            <h3 className="font-display text-3xl text-moon-cream md:text-5xl">{title}</h3>
          )}
          {caption && (
            <p className="mx-auto mt-3 max-w-xl font-body text-sm text-moon-cream/80">{caption}</p>
          )}
        </motion.div>
      )}
    </section>
  );
}
