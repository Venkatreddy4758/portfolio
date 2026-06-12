"use client";
// Hobbies / interests — a luxury grid of what he loves beyond work. Deep-emerald
// feature band with gold accents, floating dust, animated sport icons (custom
// badminton + cricket) and a lively hover.
import { motion } from "framer-motion";
import { Dumbbell, Film, Newspaper, Music } from "lucide-react";
import { content } from "@/data/content";
import { useLang } from "@/lib/LanguageProvider";
import { SectionDivider } from "@/components/art/SectionDivider";
import { FloatingDust } from "@/components/art/FloatingDust";

// Custom sport glyphs (lucide has no badminton/cricket).
function BadmintonIcon() {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {/* racket */}
      <ellipse cx="8" cy="8" rx="4.2" ry="5" transform="rotate(-35 8 8)" />
      <path d="M5 5 l4 4 M7 4 l3.5 3.5 M4 7 l3.5 3.5" strokeWidth="0.7" />
      <path d="M10.8 11 L19 19" />
      <path d="M18 17.5 l2.5 2.5" strokeWidth="2" />
      {/* shuttlecock */}
      <circle cx="18.5" cy="5.5" r="1.3" />
      <path d="M18.5 5.5 L21 3 M19.5 5 L22 3.5 M18 4.5 L20.5 2" strokeWidth="0.8" />
    </svg>
  );
}
function CricketIcon() {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {/* bat */}
      <path d="M5 19 l9 -9" />
      <rect x="12.5" y="3" width="4" height="9" rx="1.6" transform="rotate(45 14.5 7.5)" />
      <path d="M5 19 l-1.5 1.5" strokeWidth="2" />
      {/* ball */}
      <circle cx="18" cy="18" r="2.4" />
      <path d="M16 17 q2 1 4 0 M16 19 q2 -1 4 0" strokeWidth="0.7" />
    </svg>
  );
}

const icons: Record<string, () => React.ReactNode> = {
  dumbbell: () => <Dumbbell size={22} />,
  badminton: () => <BadmintonIcon />,
  cricket: () => <CricketIcon />,
  film: () => <Film size={22} />,
  newspaper: () => <Newspaper size={22} />,
  music: () => <Music size={22} />,
};

export function Hobbies() {
  const { lang } = useLang();
  const h = content.hobbies[lang];

  return (
    <section id="hobbies" className="relative overflow-hidden py-28" style={{ background: "radial-gradient(120% 100% at 50% 0%, #14463b 0%, #0f3d33 55%, #0c2f28 100%)" }}>
      <FloatingDust count={22} tone="#caa861" />
      {/* a couple of drifting "balls" for playful energy */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute rounded-full border border-champagne-gold/30"
          style={{ width: 60 + i * 30, height: 60 + i * 30, left: `${10 + i * 35}%`, top: `${15 + i * 20}%` }}
          animate={{ y: [0, -18, 0], x: [0, 12, 0], rotate: [0, 360] }}
          transition={{ duration: 18 + i * 6, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionDivider className="mb-6" tone="#caa861" />
        <h2 className="text-center font-display text-4xl text-champagne-gold md:text-5xl">{h.title}</h2>
        <p className="mt-3 text-center font-body text-moon-cream/70">{h.subtitle}</p>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {h.items.map((item, i) => {
            const renderIcon = icons[item.icon] ?? icons.dumbbell;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-[2px] border border-champagne-gold/25 bg-white/[0.03] p-7 backdrop-blur-sm transition-colors hover:border-champagne-gold/70"
              >
                <span className="pointer-events-none absolute right-4 top-4 h-10 w-10 rounded-full border border-champagne-gold/20 transition-transform duration-700 group-hover:scale-150" />
                {/* animated icon */}
                <motion.div
                  className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full border border-champagne-gold/40 text-champagne-gold"
                  animate={{ y: [0, -4, 0], rotate: [0, 4, 0] }}
                  transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  whileHover={{ scale: 1.15, rotate: -8, backgroundColor: "rgba(216,190,126,0.15)" }}
                >
                  {renderIcon()}
                </motion.div>
                <h3 className="font-display text-2xl text-moon-cream">{item.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-moon-cream/70">{item.note}</p>
                <span className="mt-5 block h-px w-10 bg-champagne-gold/50 transition-all duration-500 group-hover:w-24" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
