"use client";
// PHASE 2 — global chrome (navigation, scroll thread) wired around placeholder
// chapter sections. Each section keeps its final id; Phases 3–7 replace the
// inner content with real chapters.
import { useLang } from "@/lib/LanguageProvider";
import { content } from "@/data/content";
import { profile } from "@/data/profile";
import { getAge } from "@/lib/getAge";
import { sections, label } from "@/config/sections";
import { LuxuryNavigation } from "@/components/nav/LuxuryNavigation";
import { MobileNavigation } from "@/components/nav/MobileNavigation";
import { CeremonialScrollThread } from "@/components/nav/CeremonialScrollThread";
import { SectionDivider } from "@/components/art/SectionDivider";
import { BrassLamp } from "@/components/art/BrassLamp";
import { ToranamBorder } from "@/components/art/ToranamBorder";
import { TempleArchFrame } from "@/components/art/TempleArchFrame";

export default function Home() {
  const { lang } = useLang();
  const hero = content.hero[lang];
  const age = getAge(profile.dateOfBirthISO);

  return (
    <>
      <LuxuryNavigation />
      <CeremonialScrollThread />

      <main className="bg-royal-maroon text-warm-ivory">
        {/* INTRO / HERO placeholder */}
        <section id="intro" className="grain relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="mb-6 font-carved text-xs uppercase tracking-[0.35em] text-antique-gold">{hero.eyebrow}</p>
          <TempleArchFrame className="mb-8 h-40 w-72" tone="gold">
            <div className="grid h-full place-items-center">
              <BrassLamp size={56} />
            </div>
          </TempleArchFrame>
          <h1 className="font-display text-5xl leading-tight text-gold-edge md:text-7xl">{profile.displayName}</h1>
          <p className="mt-3 font-telugu text-2xl text-champagne-gold md:text-3xl" lang="te">{profile.teluguName}</p>
          <SectionDivider className="my-10" />
          <div className="max-w-xl space-y-1 text-sm text-warm-ivory/80 md:text-base">
            <p>{hero.tagline1}</p><p>{hero.tagline2}</p><p>{hero.tagline3}</p><p>{hero.tagline4}</p>
          </div>
          <p className="mt-10 font-carved text-xs tracking-[0.25em] text-antique-gold/70">
            {age} · {profile.profession.title} · {profile.profession.location}
          </p>
        </section>

        <ToranamBorder className="opacity-80" />

        {/* Placeholder chapters — replaced in later phases. */}
        {sections.filter((s) => s.id !== "intro").map((s, i) => (
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
    </>
  );
}
