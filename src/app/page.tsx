"use client";
// PHASE 1 PLACEHOLDER HOME — proves fonts, tokens, data and providers are wired.
// Replaced chapter-by-chapter in Phases 2–7.
import { useLang } from "@/lib/LanguageProvider";
import { content } from "@/data/content";
import { profile } from "@/data/profile";
import { getAge } from "@/lib/getAge";

export default function Home() {
  const { lang, toggle } = useLang();
  const hero = content.hero[lang];
  const age = getAge(profile.dateOfBirthISO);

  return (
    <main className="min-h-screen bg-royal-maroon text-warm-ivory grain relative overflow-hidden">
      <button
        onClick={toggle}
        data-cursor="open"
        className="fixed right-6 top-6 z-50 rounded-full border border-antique-gold/60 px-4 py-2 font-carved text-xs tracking-[0.2em] text-champagne-gold"
      >
        {lang === "en" ? "EN · తె" : "తె · EN"}
      </button>

      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 font-carved text-xs uppercase tracking-[0.35em] text-antique-gold">
          {hero.eyebrow}
        </p>
        <h1 className="font-display text-5xl leading-tight text-gold-edge md:text-7xl">
          {profile.displayName}
        </h1>
        <p className="mt-3 font-telugu text-2xl text-champagne-gold md:text-3xl" lang="te">
          {profile.teluguName}
        </p>

        <div className="gold-rule my-10 w-48" />

        <div className="max-w-xl space-y-1 font-body text-sm text-warm-ivory/80 md:text-base">
          <p>{hero.tagline1}</p>
          <p>{hero.tagline2}</p>
          <p>{hero.tagline3}</p>
          <p>{hero.tagline4}</p>
        </div>

        <p className="mt-10 font-carved text-xs tracking-[0.25em] text-antique-gold/70">
          {age} · {profile.profession.title} · {profile.profession.location}
        </p>

        <p className="absolute bottom-8 font-body text-[11px] uppercase tracking-[0.3em] text-warm-ivory/40">
          Phase 1 foundation — chapters arrive next
        </p>
      </section>
    </main>
  );
}
