"use client";
// PHASE 4 — full narrative + all chapters. Gallery & Contact remain placeholders
// until Phases 5–6.
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
import { EducationBook } from "@/components/chapters/EducationBook";
import { ProfessionalChapter } from "@/components/chapters/ProfessionalChapter";
import { FamilyCourtyard } from "@/components/chapters/FamilyCourtyard";
import { TelanganaRoots } from "@/components/chapters/TelanganaRoots";
import { PersonalityConstellation } from "@/components/chapters/PersonalityConstellation";
import { DayInLifeTimeline } from "@/components/chapters/DayInLifeTimeline";
import { HoroscopeChamber } from "@/components/chapters/HoroscopeChamber";
import { MarriageValues } from "@/components/chapters/MarriageValues";
import { PartnerExpectations } from "@/components/chapters/PartnerExpectations";
import { TeluguPoetryInterlude } from "@/components/chapters/TeluguPoetryInterlude";
import { SectionDivider } from "@/components/art/SectionDivider";

const placeholderIds = ["gallery", "contact"];

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
        <TeluguPoetryInterlude index={3} tone="var(--color-temple-stone)" />
        <JourneyMap />
        <EducationBook />
        <ProfessionalChapter />
        <FamilyCourtyard />
        <TelanganaRoots />
        <TeluguPoetryInterlude index={1} tone="var(--color-silk-plum)" />
        <PersonalityConstellation />
        <DayInLifeTimeline />
        <HoroscopeChamber />
        <MarriageValues />
        <PartnerExpectations />
        <TeluguPoetryInterlude index={2} tone="var(--color-deep-wine)" />

        {/* Placeholder chapters — replaced in Phases 5–6. */}
        {sections.filter((s) => placeholderIds.includes(s.id)).map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center"
            style={{ background: i % 2 ? "var(--color-temple-stone)" : "var(--color-emerald-depth)" }}
          >
            <SectionDivider label={s.en} />
            <h2 className="font-display text-4xl text-champagne-gold md:text-5xl">{label(s, lang)}</h2>
            <p lang="te" className="font-telugu text-lg text-antique-gold">{s.te}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-warm-ivory/40">Chapter coming in a later phase</p>
          </section>
        ))}
      </main>

      <MobileNavigation />

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
