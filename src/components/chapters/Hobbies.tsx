"use client";
// Hobbies / interests — a luxury grid of what he loves beyond work. Deep-emerald
// feature band with gold accents, floating dust, and refined hover lift.
import { motion } from "framer-motion";
import { Dumbbell, Trophy, Film, Newspaper, Plane, Music, type LucideIcon } from "lucide-react";
import { content } from "@/data/content";
import { useLang } from "@/lib/LanguageProvider";
import { SectionDivider } from "@/components/art/SectionDivider";
import { FloatingDust } from "@/components/art/FloatingDust";

const icons: Record<string, LucideIcon> = {
  dumbbell: Dumbbell,
  trophy: Trophy,
  film: Film,
  newspaper: Newspaper,
  plane: Plane,
  music: Music,
};

export function Hobbies() {
  const { lang } = useLang();
  const h = content.hobbies[lang];

  return (
    <section id="hobbies" className="relative overflow-hidden py-28" style={{ background: "radial-gradient(120% 100% at 50% 0%, #14463b 0%, #0f3d33 55%, #0c2f28 100%)" }}>
      <FloatingDust count={22} tone="#caa861" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionDivider className="mb-6" tone="#caa861" />
        <h2 className="text-center font-display text-4xl text-champagne-gold md:text-5xl">{h.title}</h2>
        <p className="mt-3 text-center font-body text-moon-cream/70">{h.subtitle}</p>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {h.items.map((item, i) => {
            const Icon = icons[item.icon] ?? Dumbbell;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-[2px] border border-champagne-gold/25 bg-white/[0.03] p-7 backdrop-blur-sm transition-colors hover:border-champagne-gold/60"
              >
                <span className="pointer-events-none absolute right-4 top-4 h-10 w-10 rounded-full border border-champagne-gold/20 transition-transform duration-700 group-hover:scale-150" />
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-champagne-gold/40 text-champagne-gold">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-2xl text-moon-cream">{item.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-moon-cream/70">{item.note}</p>
                <span className="mt-5 block h-px w-10 bg-champagne-gold/50 transition-all duration-500 group-hover:w-20" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
