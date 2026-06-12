"use client";
// PHASE 3 — core narrative assembled. Career/Family/Personality/Gallery/Values/
// Contact remain placeholders until Phases 4–6.
import { useState } from "react";
import { useLang } from "@/lib/LanguageProvider";
import { content } from "@/data/content";
import { sections, label } from "@/config/sections";
import { LuxuryNavigation } from "@/components/nav/LuxuryNavigation";
import { MobileNavigation } from "@/components/nav/MobileNavigation";
import { CeremonialScrollThread } from "@/components/nav/CeremonialScrollThread";
import { LuxuryOpeningSequence } from "@/components/chapters/LuxuryOpeningSequence";
import { HeroPortrait } from "@/components/chapters/HeroPortrait";
import { StickyPhotoNarrative } from "@/components/chapters/StickyPhotoNarrative";
import { ProfileMedallion } from "@/components/chapters/ProfileMedallion";
import { BeyondBiodata } from "@/components/chapters/BeyondBiodata";
import { JourneyMap } from "@/components/chapters/JourneyMap";
import { TeluguPoetryInterlude } from "@/components/chapters/TeluguPoetryInterlude";
import { SectionDivider } from "@/components/art/SectionDivider";

const placeholderIds = ["career", "family", "personality", "gallery", "values", "contact"];

export default function Home() {
  const { lang } = useLang();
  const [secret, setSecret] = useState(false);

  return (
    <>
      <LuxuryOpeningSequence />
      <LuxuryNavigation onSecret={() => setSecret(true)} />
      <CeremonialScrollThread />

      <main className="bg-royal-maroon text-warm-ivory">
        <HeroPortrait />
        <StickyPhotoNarrative />
        <ProfileMedallion />
        <BeyondBiodata />
        <TeluguPoetryInterlude index={0} tone="var(--color-temple-stone)" />
        <JourneyMap />

        {/* Placeholder chapters — replaced in Phases 4–6. */}
        {sections.filter((s) => placeholderIds.includes(s.id)).map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center"
            style={{ background: i % 2 ? "var(--color-temple-stone)" : "var(--color-deep-wine)" }}
          >
            <SectionDivider label={s.en} />
            <h2 className="font-display text-4xl text-champagne-gold md:text-5xl">{label(s, lang)}</h2>
            <p lang="te" className="font-telugu text-lg text-antique-gold">{s.te}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-warm-ivory/40">Chapter coming in a later phase</p>
          </section>
        ))}
      </main>

      <MobileNavigation />

      {/* secret blessing placeholder — full overlay arrives in Phase 7 */}
      {secret && (
        <button
          onClick={() => setSecret(false)}
          className="fixed inset-0 z-[90] grid place-items-center bg-temple-stone/95 px-6 text-center"
        >
          <p lang="te" className="font-telugu text-2xl text-champagne-gold md:text-4xl">
            {content.secret[lang].blessing}
          </p>
        </button>
      )}
    </>
  );
}
