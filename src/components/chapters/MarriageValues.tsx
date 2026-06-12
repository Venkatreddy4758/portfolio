"use client";
// Marriage values chamber (Section 25). Eight engraved silk panels that unfold
// like invitations on hover/tap. Not a checklist of demands.
import { useState } from "react";
import { motion } from "framer-motion";
import { content } from "@/data/content";
import { useLang } from "@/lib/LanguageProvider";
import { SectionDivider } from "@/components/art/SectionDivider";
import { CornerOrnament } from "@/components/art/CornerOrnament";

export function MarriageValues() {
  const { lang } = useLang();
  const v = content.values[lang];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="values" className="grain relative bg-blush-deep py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider className="mb-6" />
        <h2 className="text-center font-display text-4xl text-royal-maroon md:text-5xl">{v.title}</h2>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {v.panels.map((panel, i) => {
            const isOpen = open === i;
            return (
              <motion.button
                key={i}
                onClick={() => setOpen(isOpen ? null : i)}
                onMouseEnter={() => setOpen(i)}
                data-cursor="open"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
                className="group relative overflow-hidden rounded-xl border border-antique-gold/30 bg-gradient-to-br from-rose-soft to-blush-deep p-5 text-left"
              >
                <CornerOrnament position="tl" size={28} className="absolute left-1 top-1 opacity-50" />
                <CornerOrnament position="br" size={28} className="absolute bottom-1 right-1 opacity-50" />
                <p className="font-display text-xl text-royal-maroon">{panel.title}</p>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 font-body text-sm leading-relaxed text-temple-stone/80">{panel.body}</p>
                </motion.div>
                {!isOpen && (
                  <span className="mt-3 block font-carved text-[10px] uppercase tracking-[0.2em] text-rose/70">
                    {"Unfold"} +
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
