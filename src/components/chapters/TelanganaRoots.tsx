"use client";
// Native roots (Section 19) — Telangana earth. Soil/fields/early light. Conveys
// pride and stability (never poverty). A gold "root" line travels beneath the
// section connecting family, place and identity.
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { profile } from "@/data/profile";
import { content } from "@/data/content";
import { useLang } from "@/lib/LanguageProvider";
import { photoByType } from "@/data/photos";
import { Portrait } from "@/components/media/Portrait";

export function TelanganaRoots() {
  const { lang } = useLang();
  const c = content.roots[lang];
  const photo = photoByType("native") ?? photoByType("outdoor");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section ref={ref} className="relative overflow-hidden py-28" style={{ background: "linear-gradient(180deg, #f3ecdd 0%, #eef0e7 55%, #e9dec6 100%)" }}>
      {photo && (
        <motion.div style={{ y }} className="absolute inset-0 opacity-25">
          <Portrait photo={photo} sizes="100vw" />
        </motion.div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-blush via-blush/40 to-transparent" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-4xl text-royal-maroon md:text-6xl">{c.title}</h2>
        <p className="mx-auto mt-6 max-w-xl font-body text-lg leading-relaxed text-temple-stone/85">{c.body}</p>
        <p className="mt-8 font-carved text-xs uppercase tracking-[0.25em] text-rose">
          {profile.family.nativePlace}
        </p>
      </div>

      {/* travelling gold root line */}
      <svg aria-hidden className="relative mx-auto mt-16 block w-full max-w-4xl" viewBox="0 0 800 80" height={70}>
        <motion.path
          d="M0 40 Q120 10 240 40 T480 40 T720 40 L800 40"
          fill="none"
          stroke="#C5A15A"
          strokeWidth="1.5"
          strokeDasharray="900"
          initial={{ strokeDashoffset: 900 }}
          animate={inView ? { strokeDashoffset: 0 } : {}}
          transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* roots dropping down */}
        {[120, 320, 520, 700].map((x, i) => (
          <motion.path
            key={i}
            d={`M${x} 40 q-6 20 -2 36 M${x} 40 q8 18 4 34`}
            stroke="#C5A15A"
            strokeWidth="0.8"
            fill="none"
            opacity="0.6"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.2, delay: 1 + i * 0.2 }}
          />
        ))}
      </svg>
    </section>
  );
}
