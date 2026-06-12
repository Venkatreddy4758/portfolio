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

export function EducationBook() {
  const { lang } = useLang();
  const e = content.education[lang];
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0.1, 0.4], [-72, 0]); // book cover opening
  const photo = photoByType("education");

  return (
    <section
      id="education"
      ref={ref}
      className="grain relative overflow-hidden py-28"
      style={{ background: "radial-gradient(120% 100% at 70% 0%, #174e48 0%, #153b34 55%, #0e2a26 100%)" }}
    >
      {/* soft window light */}
      <div aria-hidden className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(229,201,142,0.18), transparent 70%)" }} />

      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider className="mb-6" />
        <h2 className="text-center font-display text-4xl text-champagne-gold md:text-5xl">{e.title}</h2>
        <p className="mt-3 text-center font-body text-warm-ivory/70">{e.subtitle}</p>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* opening book */}
          <div className="relative mx-auto w-full max-w-md [perspective:1600px]">
            <div className="relative aspect-[4/3] rounded-r-lg bg-emerald-depth ring-1 ring-antique-gold/30">
              <div className="absolute inset-0 grid place-items-center p-8 text-center">
                <div>
                  <p className="font-carved text-xs uppercase tracking-[0.3em] text-antique-gold">Curriculum Vitae</p>
                  <div className="gold-rule my-4" />
                  <p lang="te" className="font-telugu text-lg text-champagne-gold">ప్రపంచ దృష్టి</p>
                </div>
              </div>
              {/* book cover that swings open */}
              <motion.div
                style={{ rotateY: rotate, transformOrigin: "left center" }}
                className="absolute inset-0 origin-left rounded-r-lg bg-gradient-to-br from-earth-brown to-temple-stone ring-1 ring-antique-gold/40 [backface-visibility:hidden]"
              >
                <div className="grid h-full place-items-center">
                  <span className="font-display text-3xl text-champagne-gold">VR</span>
                </div>
              </motion.div>
            </div>
          </div>

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
                <span className="absolute -left-[37px] top-1 h-3 w-3 rotate-45 bg-champagne-gold" />
                <p className="font-display text-xl text-champagne-gold">{s.place}</p>
                <p className="font-carved text-[11px] uppercase tracking-[0.2em] text-antique-gold">{s.city}</p>
                <p className="mt-1 font-body text-sm text-warm-ivory/70">{s.note}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        {photo && (
          <div className="mx-auto mt-16 aspect-[16/7] w-full max-w-3xl overflow-hidden rounded-2xl ring-1 ring-antique-gold/25">
            <Portrait photo={photo} sizes="(max-width: 768px) 90vw, 48rem" />
          </div>
        )}
      </div>
    </section>
  );
}
