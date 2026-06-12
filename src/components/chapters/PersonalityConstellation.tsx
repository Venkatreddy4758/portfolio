"use client";
// Personality constellation (Section 20). Central portrait orbited by refined
// trait words; hovering a node links it to the portrait and shows the trait.
// Sophisticated, not a sci-fi solar system.
import { useState } from "react";
import { motion } from "framer-motion";
import { content } from "@/data/content";
import { useLang } from "@/lib/LanguageProvider";
import { photoByType } from "@/data/photos";
import { Portrait } from "@/components/media/Portrait";

export function PersonalityConstellation() {
  const { lang } = useLang();
  const p = content.personality[lang];
  const photo = photoByType("candid") ?? photoByType("casual");
  const [active, setActive] = useState<number | null>(null);
  const traits = p.traits;

  return (
    <section id="personality" className="relative overflow-hidden bg-cream py-28">
      {/* faint star field */}
      <div aria-hidden className="absolute inset-0 opacity-40">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-rose-gold"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              width: 2,
              height: 2,
              opacity: 0.3 + ((i % 5) * 0.12),
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <h2 className="font-display text-4xl text-royal-maroon md:text-5xl">{p.title}</h2>

        <div className="relative mx-auto mt-16 aspect-square w-full max-w-xl">
          {/* central portrait */}
          <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full ring-2 ring-antique-gold/50 md:h-40 md:w-40">
            {photo && <Portrait photo={photo} sizes="10rem" />}
          </div>

          {/* orbit ring */}
          <div className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-antique-gold/20" />

          {traits.map((trait, i) => {
            const angle = (i / traits.length) * Math.PI * 2 - Math.PI / 2;
            const r = 39; // % radius
            const x = 50 + Math.cos(angle) * r;
            const y = 50 + Math.sin(angle) * r;
            const isActive = active === i;
            return (
              <div key={trait} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
                {/* connecting line to center when active */}
                {isActive && (
                  <svg className="pointer-events-none absolute left-1/2 top-1/2" width="2" height="2" style={{ overflow: "visible" }}>
                    <line
                      x1="0" y1="0"
                      x2={(50 - x) * 5.6} y2={(50 - y) * 5.6}
                      stroke="#E4C98E" strokeWidth="0.8" opacity="0.7"
                    />
                  </svg>
                )}
                <motion.button
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => setActive(isActive ? null : i)}
                  data-cursor="view"
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition-all ${
                    isActive
                      ? "scale-110 border-champagne-gold bg-rose-gold text-temple-stone"
                      : "border-antique-gold/40 bg-blush/40 text-temple-stone/80"
                  } ${lang === "te" ? "font-telugu" : "font-carved tracking-[0.12em]"}`}
                >
                  {trait}
                </motion.button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
