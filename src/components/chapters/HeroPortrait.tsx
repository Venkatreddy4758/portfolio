"use client";
// Full-screen cinematic hero. Commanding portrait inside a gopuram arch, layered
// silk gradients, gold engraving, drifting petals + light dust, slow parallax,
// responsive name type and a scroll indicator.
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { content } from "@/data/content";
import { photoByType } from "@/data/photos";
import { useLang } from "@/lib/LanguageProvider";
import { Portrait } from "@/components/media/Portrait";
import { TempleArchFrame } from "@/components/art/TempleArchFrame";
import { scrollToId } from "@/components/system/LenisProvider";

export function HeroPortrait() {
  const { lang } = useLang();
  const hero = content.hero[lang];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yPortrait = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const photo = photoByType("hero")!;

  return (
    <section
      id="intro"
      ref={ref}
      className="grain relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 8%, #fbf7ef 0%, #f3ecdd 48%, #e9dec6 100%)",
      }}
    >
      {/* drifting petals + dust */}
      <Petals />

      <motion.div style={{ opacity }} className="relative z-10 flex w-full max-w-6xl flex-col items-center px-6 py-24 lg:flex-row lg:justify-between lg:gap-12">
        {/* Name block */}
        <motion.div style={{ y: yText }} className="text-center lg:flex-1 lg:text-left">
          <p className="mb-5 font-carved text-[11px] uppercase tracking-[0.35em] text-rose">
            {hero.eyebrow}
          </p>
          <h1 className="font-display text-5xl leading-[0.95] text-temple-stone text-gold-edge sm:text-6xl xl:text-8xl">
            Venkat Reddy
            <span className="mt-1 block text-rose">Regulapally</span>
          </h1>
          <div className="gold-rule my-7 w-40 lg:mx-0 mx-auto" />
          <div className="space-y-1 font-body text-sm text-temple-stone/75 md:text-base">
            <p>{hero.tagline1}</p>
            <p>{hero.tagline2}</p>
            <p>{hero.tagline3}</p>
            <p>{hero.tagline4}</p>
          </div>
        </motion.div>

        {/* Portrait in temple arch */}
        <motion.div style={{ y: yPortrait }} className="mt-12 w-full max-w-sm lg:mt-0 lg:flex-1">
          <TempleArchFrame tone="gold" className="mx-auto aspect-[3/4] w-full max-w-[360px]">
            <div className="absolute inset-[6%] overflow-hidden rounded-t-[40%]">
              <Portrait photo={photo} priority sizes="(max-width: 1024px) 80vw, 360px" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream/40 to-transparent" />
            </div>
          </TempleArchFrame>
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.button
        onClick={() => scrollToId("story")}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-temple-stone/60"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll to begin"
        data-cursor="open"
      >
        <span className="font-carved text-[10px] uppercase tracking-[0.3em]">{hero.scroll}</span>
        <span className="h-10 w-px bg-gradient-to-b from-antique-gold to-transparent" />
      </motion.button>
    </section>
  );
}

function Petals() {
  const petals = Array.from({ length: 14 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((_, i) => {
        const left = (i * 73) % 100;
        const delay = (i % 7) * 1.3;
        const dur = 14 + (i % 5) * 3;
        const size = 6 + (i % 4) * 3;
        return (
          <motion.span
            key={i}
            className="absolute rounded-[60%_40%_60%_40%]"
            style={{
              left: `${left}%`,
              top: "-5%",
              width: size,
              height: size * 1.4,
              background: i % 3 === 0 ? "#2E7D6B" : "#C2A06A",
              opacity: 0.5,
            }}
            animate={{ y: ["-5vh", "105vh"], x: [0, 30, -20, 10], rotate: [0, 180, 360] }}
            transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
          />
        );
      })}
    </div>
  );
}
