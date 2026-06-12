"use client";
// Royal profile medallions (Section 14) — replaces the biodata table with six
// interactive coin/temple-seal pendants. Hover/tap rotates the seal, reveals the
// detail + Telugu label, and runs an engraved border animation.
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { content } from "@/data/content";
import { useLang } from "@/lib/LanguageProvider";
import { getAge } from "@/lib/getAge";
import { SectionDivider } from "@/components/art/SectionDivider";

export function ProfileMedallion() {
  const { lang } = useLang();
  const labels = content.medallions[lang];
  const age = getAge(profile.dateOfBirthISO);

  const values: Record<string, string> = {
    born: lang === "te" ? `${profile.dateOfBirth} · ${age}` : `${profile.dateOfBirth} · ${age} yrs`,
    height: profile.height,
    native: profile.birthplace,
    tongue: profile.motherTongue,
    profession: profile.profession.title,
    city: profile.profession.location,
  };

  return (
    <section className="relative bg-blush-deep py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider className="mb-14" label={lang === "te" ? "వివరాలు" : "At a Glance"} />
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {labels.map((m, i) => (
            <motion.div
              key={m.key}
              className="group flex flex-col items-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative h-24 w-24" data-cursor="view">
                {/* engraved rotating border */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 transition-transform duration-700 group-hover:rotate-[18deg]">
                  <circle cx="50" cy="50" r="47" fill="none" stroke="#C5A15A" strokeWidth="1" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#C5A15A" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.7" />
                  {Array.from({ length: 24 }).map((_, k) => {
                    const a = (k / 24) * Math.PI * 2;
                    return <circle key={k} cx={50 + Math.cos(a) * 47} cy={50 + Math.sin(a) * 47} r="0.8" fill="#E4C98E" />;
                  })}
                </svg>
                <div className="absolute inset-[14%] grid place-items-center rounded-full bg-gradient-to-br from-rose-soft to-blush-deep ring-1 ring-antique-gold/40">
                  <span className="font-display text-base leading-tight text-royal-maroon text-center px-1">
                    {m.key === "born" ? "★" : ""}
                    {m.key === "height" ? "↥" : ""}
                    {m.key === "native" ? "⌂" : ""}
                    {m.key === "tongue" ? "అ" : ""}
                    {m.key === "profession" ? "✦" : ""}
                    {m.key === "city" ? "◈" : ""}
                  </span>
                </div>
              </div>
              <p className={`mt-4 text-center text-[11px] uppercase tracking-[0.2em] text-rose ${lang === "te" ? "font-telugu normal-case tracking-normal text-sm" : "font-carved"}`}>
                {m.label}
              </p>
              <p className="mt-1 text-center font-body text-sm text-temple-stone/90">{values[m.key]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
