"use client";
// Living-portrait effect (Section 24). Very slow depth separation, gentle
// breathing camera move, drifting light, soft grain. Never animates the face or
// distorts identity — the photo itself is untouched; only camera/light move.
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Photo } from "@/data/photos";
import { Portrait } from "./Portrait";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function LivingPortrait({ photo, className }: { photo: Photo; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1.0]);
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <div ref={ref} className={`grain relative overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { scale, y }}
        animate={reduced ? undefined : { scale: [1.0, 1.02, 1.0] }}
        transition={reduced ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <Portrait photo={photo} sizes="100vw" />
      </motion.div>
      {/* drifting light across fabric */}
      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(115deg, transparent 35%, rgba(229,201,142,0.12) 50%, transparent 65%)" }}
          animate={{ backgroundPositionX: ["-30%", "130%"] }}
          transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
        />
      )}
      {/* atmospheric foreground vignette */}
      <div className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 0 140px rgba(26,15,23,0.6)" }} />
    </div>
  );
}
