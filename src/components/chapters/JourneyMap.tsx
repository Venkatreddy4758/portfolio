"use client";
// Interactive illustrated journey map (Section 16). Custom abstract route — no
// Google Maps. The path animates in on scroll; each stop reveals a story, life
// phase and one Telugu word.
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { content } from "@/data/content";
import { useLang } from "@/lib/LanguageProvider";

// Normalised stop positions along an abstract route (0–100 space).
const points = [
  { x: 12, y: 72 },
  { x: 40, y: 46 },
  { x: 72, y: 20 },
  { x: 90, y: 60 },
];

export function JourneyMap() {
  const { lang } = useLang();
  const j = content.journey[lang];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [active, setActive] = useState(0);

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <section className="relative bg-temple-stone py-24" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-12 text-center font-display text-4xl text-champagne-gold md:text-5xl">{j.title}</h2>

        <div className="relative">
          <svg viewBox="0 0 100 80" className="w-full" preserveAspectRatio="xMidYMid meet">
            {/* dotted ambient grid */}
            <defs>
              <pattern id="jm-dots" width="6" height="6" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.4" fill="#C5A15A" opacity="0.18" />
              </pattern>
            </defs>
            <rect width="100" height="80" fill="url(#jm-dots)" />
            {/* the route */}
            <motion.path
              d={path}
              fill="none"
              stroke="#C5A15A"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeDasharray="200"
              initial={{ strokeDashoffset: 200 }}
              animate={inView ? { strokeDashoffset: 0 } : {}}
              transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
            />
            {points.map((p, i) => (
              <g key={i} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} style={{ cursor: "pointer" }}>
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r={active === i ? 2.6 : 1.8}
                  fill={active === i ? "#E4C98E" : "#9E2637"}
                  stroke="#E4C98E"
                  strokeWidth="0.4"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.5, duration: 0.5 }}
                />
                <text x={p.x} y={p.y - 4} textAnchor="middle" fontSize="2.6" fill="#F8F0DF" fontFamily="Cinzel, serif">
                  {j.stops[i].place}
                </text>
              </g>
            ))}
          </svg>

          {/* active stop detail */}
          <motion.div
            key={active}
            className="mx-auto mt-8 max-w-lg text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p lang="te" className="font-telugu text-2xl text-antique-gold">{j.stops[active].word}</p>
            <p className="mt-2 font-display text-2xl text-champagne-gold">{j.stops[active].place}</p>
            <p className="mt-2 font-body text-warm-ivory/75">{j.stops[active].line}</p>
          </motion.div>

          {/* stop selector */}
          <div className="mt-6 flex justify-center gap-2">
            {j.stops.map((s, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={s.place}
                className={`h-2 w-2 rotate-45 transition-all ${active === i ? "scale-150 bg-champagne-gold" : "bg-antique-gold/40"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
