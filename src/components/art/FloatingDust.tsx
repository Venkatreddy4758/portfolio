"use client";
// Subtle floating gold dust / motes for a premium atmospheric touch. Pure CSS
// motion, disabled under reduced-motion. Place inside a `relative` section.
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function FloatingDust({ count = 18, tone = "#C2A06A" }: { count?: number; tone?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const left = (i * 53) % 100;
        const top = (i * 37) % 100;
        const size = 2 + (i % 3);
        const dur = 9 + (i % 6) * 2;
        const delay = (i % 7) * 0.8;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size, background: tone, opacity: 0.35 }}
            animate={{ y: [0, -24, 0], x: [0, 10, 0], opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}
