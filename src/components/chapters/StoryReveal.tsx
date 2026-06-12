"use client";
// Story section — a NEW scroll style (replaces the pinned 01–04 sticky narrative).
// Four chapters as alternating full-width rows; each photo and its narrative slide
// in from opposite sides and settle as it enters view. No pinning, no large numerals.
import { motion } from "framer-motion";
import { content } from "@/data/content";
import { useLang } from "@/lib/LanguageProvider";
import { photoByType } from "@/data/photos";
import { Portrait } from "@/components/media/Portrait";
import { SectionDivider } from "@/components/art/SectionDivider";

const photoTypes = ["outdoor", "education", "professional", "traditional"];

export function StoryReveal() {
  const { lang } = useLang();
  const chapters = content.story[lang];

  return (
    <section id="story" className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider className="mb-16" label="His Story" />

        <div className="space-y-24 md:space-y-32">
          {chapters.map((ch, i) => {
            const photo = photoByType(photoTypes[i]);
            const reversed = i % 2 === 1;
            return (
              <div
                key={ch.no}
                className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${reversed ? "md:[direction:rtl]" : ""}`}
              >
                {/* photo */}
                <motion.div
                  className="md:[direction:ltr]"
                  initial={{ opacity: 0, x: reversed ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {photo && (
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] ring-1 ring-antique-gold/30">
                      <Portrait photo={photo} sizes="(max-width: 768px) 90vw, 45vw" />
                      <div className="pointer-events-none absolute inset-3 border border-champagne-gold/40" />
                    </div>
                  )}
                </motion.div>

                {/* narrative */}
                <motion.div
                  className="md:[direction:ltr]"
                  initial={{ opacity: 0, x: reversed ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-carved text-sm tracking-[0.3em] text-rose-gold">{ch.no}</span>
                    <span className="h-px w-12 bg-antique-gold/50" />
                    <span className="font-carved text-xs uppercase tracking-[0.3em] text-rose">{ch.kicker}</span>
                  </div>
                  <h3 className="mt-4 font-display text-4xl text-royal-maroon md:text-5xl">{ch.title}</h3>
                  <p className="mt-5 max-w-md font-body text-lg leading-relaxed text-temple-stone/75">{ch.body}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
