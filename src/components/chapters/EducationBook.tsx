"use client";
// Education chapter (Section 15) — private-library mood. An academic book opens on
// scroll; each stage is a chapter, with a map line linking Siddipet→Hyderabad→
// Cambridge. Elegant and realistic (no fantasy theme).
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { content } from "@/data/content";
import { useLang } from "@/lib/LanguageProvider";
import { photoByType } from "@/data/photos";
import { Portrait } from "@/components/media/Portrait";
import { SectionDivider } from "@/components/art/SectionDivider";
import { FloatingDust } from "@/components/art/FloatingDust";

export function EducationBook() {
  const { lang } = useLang();
  const e = content.education[lang];
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yPhoto = useTransform(scrollYProgress, [0, 1], [40, -40]); // gentle parallax
  const photo = photoByType("education");

  return (
    <section
      id="education"
      ref={ref}
      className="grain relative overflow-hidden py-28"
      style={{ background: "radial-gradient(120% 100% at 70% 0%, #fbf7ef 0%, #f3ecdd 55%, #e9dec6 100%)" }}
    >
      {/* soft window light */}
      <div aria-hidden className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(229,201,142,0.18), transparent 70%)" }} />
      <FloatingDust count={14} />

      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider className="mb-6" />
        <h2 className="text-center font-display text-4xl text-royal-maroon md:text-5xl">{e.title}</h2>
        <p className="mt-3 text-center font-body text-temple-stone/70">{e.subtitle}</p>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* graduation portrait — clean editorial frame with a gentle parallax */}
          <motion.div
            className="relative mx-auto w-full max-w-sm"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* gold mat + frame */}
            <div className="relative rounded-[2px] bg-gradient-to-br from-champagne-gold/30 to-antique-gold/10 p-3 ring-1 ring-antique-gold/40">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2px]">
                {photo && (
                  <motion.div className="absolute inset-0" style={{ y: yPhoto }}>
                    <Portrait photo={photo} sizes="(max-width: 1024px) 80vw, 24rem" />
                  </motion.div>
                )}
                <div className="pointer-events-none absolute inset-3 border border-champagne-gold/50" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald-depth/75 to-transparent p-5 pt-14">
                  <p className="font-carved text-[10px] uppercase tracking-[0.3em] text-champagne-gold">Cambridge, UK</p>
                  <p className="font-display text-2xl text-moon-cream">The Graduate</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* stages timeline */}
          <ol className="relative space-y-7 border-l border-antique-gold/30 pl-8">
            {e.stages.map((s, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <span className="absolute -left-[37px] top-1 h-3 w-3 rotate-45 bg-rose-gold" />
                <p className="font-display text-xl text-royal-maroon">{s.place}</p>
                <p className="font-carved text-[11px] uppercase tracking-[0.2em] text-rose">{s.city}</p>
                <p className="mt-1 font-body text-sm text-temple-stone/70">{s.note}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
