"use client";
// Cinematic 35mm filmstrip (Section 22). Horizontal draggable strip of five
// photos with frame numbering, grain, captions, drag + wheel + swipe, inertia
// and magnetic snapping. Not an Instagram carousel.
import { useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { photos } from "@/data/photos";
import { content } from "@/data/content";
import { useLang } from "@/lib/LanguageProvider";
import { Portrait } from "./Portrait";

const stripIds = [4, 5, 9, 3, 10]; // Cambridge, professional, travel, outdoor, festival
const FRAME = 320; // px per frame incl. gap

export function CinematicFilmstrip() {
  const { lang } = useLang();
  const f = content.filmstrip[lang];
  const frames = stripIds.map((id) => photos.find((p) => p.id === id)!).filter(Boolean);
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const maxScroll = -(frames.length * FRAME - (typeof window !== "undefined" ? Math.min(window.innerWidth, 900) : 800) + 80);

  const snap = () => {
    const current = x.get();
    const idx = Math.round(-current / FRAME);
    const target = Math.max(maxScroll, Math.min(0, -idx * FRAME));
    animate(x, target, { type: "spring", stiffness: 220, damping: 30 });
  };

  const onWheel = (e: React.WheelEvent) => {
    const next = Math.max(maxScroll, Math.min(0, x.get() - e.deltaY));
    x.set(next);
  };

  return (
    <section className="relative overflow-hidden bg-blush py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-10 text-center font-display text-4xl text-royal-maroon md:text-5xl">{f.title}</h2>
      </div>

      <div ref={containerRef} className="relative cursor-grab overflow-hidden px-6 active:cursor-grabbing" onWheel={onWheel}>
        <motion.div
          className="flex gap-6"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: maxScroll, right: 0 }}
          dragElastic={0.08}
          onDragEnd={snap}
        >
          {frames.map((photo, i) => (
            <div key={photo.id} className="relative w-[296px] shrink-0 select-none">
              {/* film sprocket holes */}
              <div className="flex justify-between px-1 py-1">
                {Array.from({ length: 8 }).map((_, k) => (
                  <span key={k} className="h-2 w-3 rounded-[2px] bg-rose/15" />
                ))}
              </div>
              <div className="grain relative aspect-[3/4] overflow-hidden rounded-sm ring-1 ring-antique-gold/20">
                <Portrait photo={photo} sizes="296px" />
                <span className="absolute left-2 top-2 font-carved text-[10px] tracking-[0.2em] text-temple-stone/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex justify-between px-1 py-1">
                {Array.from({ length: 8 }).map((_, k) => (
                  <span key={k} className="h-2 w-3 rounded-[2px] bg-rose/15" />
                ))}
              </div>
              <p className={`mt-2 text-center text-sm text-rose ${"font-display"}`}>
                {f.captions[i] ?? photo.title}
              </p>
              {photo.location && (
                <p className="text-center font-carved text-[10px] uppercase tracking-[0.2em] text-temple-stone/45">
                  {photo.location}
                </p>
              )}
            </div>
          ))}
        </motion.div>
        {/* edge blur */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-blush to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-blush to-transparent" />
      </div>
      <p className="mt-6 text-center font-carved text-[10px] uppercase tracking-[0.25em] text-temple-stone/40">
        {"Drag · Scroll · Swipe"}
      </p>
    </section>
  );
}
