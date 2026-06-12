"use client";
// Visible drifting petals — gold, champagne and emerald — for a premium, romantic
// atmosphere across the whole site. Pure transform motion; off under reduced-motion.
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const TONES = ["#c2a06a", "#d8be7e", "#2e7d6b", "#caa861"];

export function FloatingPetals({ count = 18 }: { count?: number }) {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const left = (i * 61) % 100;
        const size = 8 + (i % 5) * 3;          // 8–20px
        const dur = 16 + (i % 6) * 4;           // 16–36s fall
        const delay = (i % 9) * 1.6;
        const drift = (i % 2 === 0 ? 1 : -1) * (30 + (i % 4) * 18);
        const tone = TONES[i % TONES.length];
        return (
          <motion.span
            key={i}
            className="absolute rounded-[60%_40%_60%_40%]"
            style={{ left: `${left}%`, top: "-6%", width: size, height: size * 1.5, background: tone, opacity: 0.45 }}
            animate={{
              y: ["-6vh", "108vh"],
              x: [0, drift, drift * 0.4, 0],
              rotate: [0, 180, 360],
              opacity: [0, 0.5, 0.5, 0],
            }}
            transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
          />
        );
      })}
    </div>
  );
}
