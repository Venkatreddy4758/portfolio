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
  const rotate = useTransform(scrollYProgress, [0.1, 0.4], [-72, 0]); // book cover opening
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
          {/* opening book — the graduation portrait revealed as the cover swings open */}
          <div className="relative mx-auto w-full max-w-sm [perspective:1600px]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-r-lg ring-1 ring-antique-gold/30">
              {/* the photo behind the cover */}
              {photo && (
                <>
                  <Portrait photo={photo} sizes="(max-width: 1024px) 80vw, 24rem" />
                  <div className="pointer-events-none absolute inset-3 border border-champagne-gold/50" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald-depth/70 to-transparent p-5 pt-12">
                    <p className="font-carved text-[10px] uppercase tracking-[0.3em] text-champagne-gold">Cambridge, UK</p>
                    <p className="font-display text-xl text-moon-cream">The Graduate</p>
                  </div>
                </>
              )}
              {/* book cover that swings open to reveal the photo */}
              <motion.div
                style={{ rotateY: rotate, transformOrigin: "left center" }}
                className="absolute inset-0 origin-left rounded-r-lg bg-gradient-to-br from-peacock-green to-emerald-depth ring-1 ring-antique-gold/40 [backface-visibility:hidden]"
              >
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <p className="font-carved text-[10px] uppercase tracking-[0.3em] text-champagne-gold/80">Global Education</p>
                    <span className="mt-2 block font-display text-4xl text-champagne-gold">VR</span>
                  </div>
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
                <span className="absolute -left-[37px] top-1 h-3 w-3 rotate-45 bg-rose-gold" />
                <p className="font-display text-xl text-royal-maroon">{s.place}</p>
                <p className="font-carved text-[11px] uppercase tracking-[0.2em] text-rose">{s.city}</p>
                <p className="mt-1 font-body text-sm text-temple-stone/70">{s.note}</p>
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
