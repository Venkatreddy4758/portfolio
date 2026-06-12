"use client";
// Family courtyard (Section 18). Telangana courtyard with toranam, flanking
// pillars, central brass lamp, a warm family photo and engraved name plates
// around it. No cartoon family trees.
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { content } from "@/data/content";
import { useLang } from "@/lib/LanguageProvider";
import { photoByType } from "@/data/photos";
import { Portrait } from "@/components/media/Portrait";
import { ToranamBorder } from "@/components/art/ToranamBorder";
import { Pillar } from "@/components/art/Pillar";
import { BrassLamp } from "@/components/art/BrassLamp";

export function FamilyCourtyard() {
  const { lang } = useLang();
  const c = content.family[lang];
  // No dedicated family photo in the set — fall back to a warm casual portrait.
  const photo = photoByType("family") ?? photoByType("casual");

  const members = [
    { name: profile.family.grandfather, role: lang === "te" ? "తాత" : "Grandfather" },
    { name: profile.family.father.name, role: `${lang === "te" ? "నాన్న" : "Father"} · ${profile.family.father.occupation}` },
    { name: profile.family.mother.name, role: `${lang === "te" ? "అమ్మ" : "Mother"} · ${profile.family.mother.occupation}` },
    ...profile.family.siblings.map((s) => ({
      name: s.name,
      role: `${s.relation} · ${s.profession}${s.maritalStatus ? " · " + s.maritalStatus : ""}`,
    })),
  ];

  return (
    <section id="family" className="grain relative overflow-hidden py-10" style={{ background: "radial-gradient(120% 90% at 50% 0%, #fdf6ec 0%, #f6e9d8 45%, #f0cdd3 100%)" }}>
      <ToranamBorder count={16} tone="#C27C88" />

      <div className="relative mx-auto max-w-6xl px-6 py-16">
        {/* flanking pillars (desktop) */}
        <Pillar className="absolute left-0 top-10 hidden opacity-80 lg:block" tone="#8A6A2E" height={520} />
        <Pillar className="absolute right-0 top-10 hidden opacity-80 lg:block" tone="#8A6A2E" height={520} />

        <div className="text-center">
          <h2 className="font-display text-4xl text-temple-stone md:text-5xl">{c.title}</h2>
          <div className="mt-6 flex justify-center"><BrassLamp size={60} /></div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-10">
          {photo && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl ring-4 ring-rose-gold/60"
            >
              <Portrait photo={photo} sizes="(max-width: 768px) 90vw, 36rem" />
            </motion.div>
          )}

          {/* engraved name plates */}
          <div className="grid w-full max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
            {members.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="rounded-lg border border-temple-stone/30 bg-rose/70 p-4 text-center backdrop-blur-sm"
              >
                <p className="font-display text-lg text-temple-stone">{m.name}</p>
                <p className="mt-0.5 font-carved text-[10px] uppercase tracking-[0.15em] text-earth-brown">{m.role}</p>
              </motion.div>
            ))}
          </div>

          <p className="max-w-2xl text-center font-display text-xl text-temple-stone">{c.line}</p>
        </div>
      </div>
    </section>
  );
}
