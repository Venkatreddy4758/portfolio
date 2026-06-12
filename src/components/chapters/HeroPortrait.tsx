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

      {/* rich drifting aurora — bigger, brighter, more atmospheric */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-[52rem] w-[52rem] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(28,91,78,0.32), transparent 62%)", filter: "blur(44px)" }}
        animate={{ x: [0, 70, 0], y: [0, 40, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[46rem] w-[46rem] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(194,160,106,0.36), transparent 62%)", filter: "blur(44px)" }}
        animate={{ x: [0, -60, 0], y: [0, -28, 0], opacity: [0.5, 0.95, 0.5] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(216,190,126,0.28), transparent 60%)", filter: "blur(50px)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div style={{ opacity }} className="relative z-10 flex w-full max-w-6xl flex-col items-center px-6 py-24 lg:flex-row lg:justify-between lg:gap-12">
        {/* Name block */}
        <motion.div style={{ y: yText }} className="text-center lg:flex-1 lg:text-left">
          <p className="mb-5 font-carved text-[11px] uppercase tracking-[0.35em] text-rose">
            {hero.eyebrow}
          </p>
          <h1
            className="font-display text-5xl leading-[0.95] text-royal-maroon sm:text-6xl xl:text-8xl"
            style={{ textShadow: "0 2px 10px rgba(12,40,33,0.35), 0 0 26px rgba(183,151,74,0.45)" }}
          >
            Venkat Reddy
            <motion.span
              className="mt-1 block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, #9a7a30 0%, #b7974a 30%, #e4c98e 50%, #b7974a 70%, #9a7a30 100%)",
                backgroundSize: "220% 100%",
                // dark depth + gold halo glow
                filter:
                  "drop-shadow(0 2px 6px rgba(12,40,33,0.45)) drop-shadow(0 0 18px rgba(216,190,126,0.6))",
              }}
              animate={{ backgroundPositionX: ["0%", "100%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
            >
              Regulapally
            </motion.span>
          </h1>
          <div className="gold-rule my-7 w-40 lg:mx-0 mx-auto" />
          <div className="space-y-1 font-body text-sm text-temple-stone/75 md:text-base">
            <p>{hero.tagline1}</p>
            <p>{hero.tagline2}</p>
            <p>{hero.tagline3}</p>
            <p>{hero.tagline4}</p>
          </div>
        </motion.div>

        {/* Portrait in temple arch with a rotating gold orbit + glow */}
        <motion.div style={{ y: yPortrait }} className="relative mt-12 w-full max-w-sm lg:mt-0 lg:flex-1">
          <div className="relative mx-auto aspect-square w-full max-w-[500px]">
            {/* brighter halo glow */}
            <motion.div
              aria-hidden className="absolute inset-0 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(216,190,126,0.5), rgba(194,160,106,0.18) 45%, transparent 66%)", filter: "blur(22px)" }}
              animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.04, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* slow rotating light rays — the "aura" */}
            <motion.div
              aria-hidden className="absolute inset-[-8%] rounded-full"
              style={{ background: "conic-gradient(from 0deg, transparent 0deg, rgba(216,190,126,0.18) 18deg, transparent 36deg, transparent 90deg, rgba(28,91,78,0.14) 108deg, transparent 126deg, transparent 180deg, rgba(216,190,126,0.16) 198deg, transparent 216deg, transparent 300deg, rgba(28,91,78,0.12) 318deg, transparent 336deg)", filter: "blur(6px)", maskImage: "radial-gradient(circle, transparent 38%, #000 42%, #000 70%, transparent 78%)", WebkitMaskImage: "radial-gradient(circle, transparent 38%, #000 42%, #000 70%, transparent 78%)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            />
            {/* slow rotating dashed orbit */}
            <motion.svg
              aria-hidden viewBox="0 0 100 100" className="absolute inset-0 h-full w-full"
              animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="50" cy="50" r="48" fill="none" stroke="#c2a06a" strokeWidth="0.3" strokeDasharray="1 3" opacity="0.7" />
              <circle cx="50" cy="2" r="0.9" fill="#1c5b4e" />
              <circle cx="50" cy="98" r="0.7" fill="#c2a06a" />
            </motion.svg>
            <motion.svg
              aria-hidden viewBox="0 0 100 100" className="absolute inset-[5%] h-[90%] w-[90%]"
              animate={{ rotate: -360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="50" cy="50" r="49" fill="none" stroke="#1c5b4e" strokeWidth="0.2" opacity="0.4" />
            </motion.svg>
            {/* portrait arch */}
            <TempleArchFrame tone="gold" className="absolute left-1/2 top-1/2 aspect-[3/4] w-[78%] -translate-x-1/2 -translate-y-1/2">
              <div className="absolute inset-[6%] overflow-hidden rounded-t-[40%] shadow-[0_24px_70px_-20px_rgba(18,58,48,0.55)]">
                <Portrait photo={photo} priority sizes="(max-width: 1024px) 70vw, 320px" />
              </div>
            </TempleArchFrame>
          </div>
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
