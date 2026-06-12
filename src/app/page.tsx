"use client";
// PHASE 4 — full narrative + all chapters. Gallery & Contact remain placeholders
// until Phases 5–6.
import { useState } from "react";
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
import { CinematicFilmstrip } from "@/components/media/CinematicFilmstrip";
import { CinematicReveal } from "@/components/media/CinematicReveal";
import { MuseumGallery } from "@/components/media/MuseumGallery";
import { PrivateContactPanel } from "@/components/contact/PrivateContactPanel";
import { FinalBlessing } from "@/components/chapters/FinalBlessing";
import { SecretLotusMessage, SecretBlessing } from "@/components/contact/SecretLotusMessage";
import { photoByType } from "@/data/photos";

export default function Home() {
  const [secret, setSecret] = useState(false);

  return (
    <>
      <LuxuryOpeningSequence />
      <LuxuryNavigation onSecret={() => setSecret(true)} />
      <CeremonialScrollThread />

      <main className="bg-cream text-temple-stone">
        <HeroPortrait />
        <StickyPhotoNarrative />
        <ProfileMedallion />
        <BeyondBiodata />
        <CinematicReveal
          photo={photoByType("outdoor")!}
          kicker="From the Soil of Telangana to the World"
          title="A Grounded Spirit"
          caption="Shaped by family and place, carried with quiet confidence."
        />
        <TeluguPoetryInterlude index={3} tone="var(--color-blush)" />
        <JourneyMap />
        <EducationBook />
        <ProfessionalChapter />
        <FamilyCourtyard />
        <TelanganaRoots />
        <TeluguPoetryInterlude index={1} tone="var(--color-blush-deep)" />
        <PersonalityConstellation />
        <DayInLifeTimeline />
        <HoroscopeChamber />
        <MarriageValues />
        <PartnerExpectations />
        <CinematicReveal
          photo={photoByType("travel")!}
          kicker="A Life in Motion"
          title="Eyes on the Future"
          caption="Distances travelled, perspective gained, a life built with purpose."
        />
        <CinematicFilmstrip />
        <MuseumGallery />
        <TeluguPoetryInterlude index={2} tone="var(--color-blush)" />
        <PrivateContactPanel />
        {/* hidden lotus seal — a tasteful secret interaction */}
        <div className="bg-blush">
          <SecretLotusMessage />
        </div>
        <FinalBlessing />
      </main>

      <MobileNavigation />

      {/* monogram 5-click secret blessing */}
      <SecretBlessing open={secret} onClose={() => setSecret(false)} />
    </>
  );
}
