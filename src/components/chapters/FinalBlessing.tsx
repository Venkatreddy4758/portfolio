"use client";
// Final ceremonial chapter (Section 38). Warm ivory, monumental arch, soft light,
// lotus petals, the 12th portrait emerging from depth, blessing + actions.
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { profile } from "@/data/profile";
import { content } from "@/data/content";
import { photoByType } from "@/data/photos";
import { useLang } from "@/lib/LanguageProvider";
import { scrollToId } from "@/components/system/LenisProvider";
import { LivingPortrait } from "@/components/media/LivingPortrait";
import { TempleArchFrame } from "@/components/art/TempleArchFrame";
import { BrassLamp } from "@/components/art/BrassLamp";

export function FinalBlessing({ onShare }: { onShare?: () => void }) {
  const { lang } = useLang();
  const f = content.finale[lang];
  const photo = photoByType("finale")!;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section className="grain relative overflow-hidden py-28" style={{ background: "radial-gradient(120% 90% at 50% 20%, #FFF9ED 0%, #F8F0DF 55%, #E9DCC0 100%)" }}>
      {/* soft rangoli floor glow */}
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[120%] -translate-x-1/2 rounded-[50%]" style={{ background: "radial-gradient(circle, rgba(197,161,90,0.25), transparent 65%)" }} />

      <div ref={ref} className="relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center text-royal-maroon">
        <div className="mb-8 flex gap-10">
          <BrassLamp size={48} />
          <BrassLamp size={48} />
        </div>

        <TempleArchFrame tone="gold" className="aspect-[3/4] w-full max-w-[300px]">
          <div className="absolute inset-[6%] overflow-hidden rounded-t-[40%]">
            <LivingPortrait photo={photo} className="h-full w-full" />
          </div>
        </TempleArchFrame>

        <motion.h2
          className="mt-12 font-display text-3xl leading-snug md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {f.line1}
          <br />
          {f.line2}
        </motion.h2>
        <p lang="te" className="mt-5 font-telugu text-xl text-deep-wine">
          {content.finale.te.line1}
          <br />
          {content.finale.te.line2}
        </p>

        <div className="gold-rule my-8 w-48" />
        <p className="font-display text-2xl text-royal-maroon">{profile.fullName}</p>
        <p lang="te" className="font-telugu text-lg text-deep-wine">{profile.teluguName}</p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href="/biodata/print" target="_blank" data-cursor="open" className="rounded-full bg-royal-maroon px-6 py-3 font-carved text-[11px] uppercase tracking-[0.18em] text-warm-ivory">
            {content.contact[lang].viewBiodata}
          </a>
          <button onClick={() => scrollToId("contact")} data-cursor="open" className="rounded-full border border-royal-maroon/50 px-6 py-3 font-carved text-[11px] uppercase tracking-[0.18em] text-royal-maroon hover:bg-royal-maroon hover:text-warm-ivory">
            {content.contact[lang].contactFamily}
          </button>
          {onShare && (
            <button onClick={onShare} data-cursor="open" className="rounded-full border border-royal-maroon/50 px-6 py-3 font-carved text-[11px] uppercase tracking-[0.18em] text-royal-maroon hover:bg-royal-maroon hover:text-warm-ivory">
              {content.contact[lang].shareProfile}
            </button>
          )}
        </div>

        <p lang="te" className="mt-12 font-telugu text-3xl text-turmeric">{f.sanskrit === "శుభమస్తు" ? f.sanskrit : "శుభమస్తు"}</p>
        <p className="mt-3 max-w-md font-body text-sm italic text-earth-brown">{f.blessing}</p>
      </div>
    </section>
  );
}
