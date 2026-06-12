"use client";
// Profession chapter (Section 17). Refined glass/metal layers, subtle test-flow
// lines, one professional portrait. Stability, responsibility, growth — no
// code-rain / cyberpunk / clutter.
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { content } from "@/data/content";
import { useLang } from "@/lib/LanguageProvider";
import { photoByType } from "@/data/photos";
import { Portrait } from "@/components/media/Portrait";
import { SectionDivider } from "@/components/art/SectionDivider";

export function ProfessionalChapter() {
  const { lang } = useLang();
  const c = content.career[lang];
  const photo = photoByType("professional");

  const facts = [
    { k: lang === "te" ? "హోదా" : "Role", v: profile.profession.title },
    { k: lang === "te" ? "సంస్థ" : "Company", v: profile.profession.company },
    { k: lang === "te" ? "ప్రాంతం" : "Location", v: profile.profession.location },
    { k: lang === "te" ? "విధానం" : "Work Mode", v: profile.profession.workMode },
  ];

  return (
    <section id="career" className="relative overflow-hidden bg-blush py-28">
      {/* subtle test-flow lines */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]">
        <pattern id="flow" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M0 30 H40 M40 30 V10 H60 M40 30 V50 H60" stroke="#C5A15A" fill="none" strokeWidth="0.6" />
          <circle cx="40" cy="30" r="2" fill="#C5A15A" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#flow)" />
      </svg>

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
        <div>
          <SectionDivider className="mb-6 justify-start" />
          <h2 className="font-display text-4xl text-royal-maroon md:text-5xl">{c.title}</h2>
          <p className="mt-5 max-w-md font-body text-lg leading-relaxed text-temple-stone/80">{c.body}</p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {facts.map((f) => (
              <motion.div
                key={f.k}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-xl border border-antique-gold/25 bg-rose/[0.03] p-4 backdrop-blur-sm"
              >
                <p className={`text-[11px] uppercase tracking-[0.2em] text-rose ${lang === "te" ? "font-telugu normal-case" : "font-carved"}`}>{f.k}</p>
                <p className="mt-1 font-display text-xl text-temple-stone">{f.v}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {photo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl ring-1 ring-antique-gold/30"
          >
            <Portrait photo={photo} sizes="(max-width: 1024px) 80vw, 24rem" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream/60 to-transparent" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
