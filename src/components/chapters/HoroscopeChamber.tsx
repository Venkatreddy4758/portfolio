"use client";
// Horoscope chamber (Section 33 jathakam). Privacy-gated: when
// privacy.showHoroscopePublicly is false the values are NOT rendered into the
// page — only a graceful note + a request-access action. Blank fields auto-hide.
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { privacy } from "@/config/privacy";
import { content } from "@/data/content";
import { useLang } from "@/lib/LanguageProvider";
import { scrollToId } from "@/components/system/LenisProvider";
import { LotusMedallion } from "@/components/art/LotusMedallion";

const fieldLabels: Record<string, { en: string; te: string }> = {
  gotram: { en: "Gotram", te: "గోత్రం" },
  rasi: { en: "Rasi", te: "రాశి" },
  nakshatram: { en: "Nakshatram", te: "నక్షత్రం" },
  padam: { en: "Padam", te: "పాదం" },
  lagnam: { en: "Lagnam", te: "లగ్నం" },
  kujaDosham: { en: "Kuja Dosham", te: "కుజ దోషం" },
};

export function HoroscopeChamber() {
  const { lang } = useLang();
  const c = content.horoscope[lang];

  const entries = Object.entries(profile.jathakam).filter(([, v]) => v !== "");
  const canShow = privacy.showHoroscopePublicly && entries.length > 0;

  return (
    <section className="relative overflow-hidden bg-emerald-depth py-24">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 opacity-20">
        <LotusMedallion size={220} tone="#C5A15A" open />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-4xl text-champagne-gold md:text-5xl">{c.title}</h2>

        {canShow ? (
          <div className="mx-auto mt-12 grid max-w-xl grid-cols-2 gap-4">
            {entries.map(([key, value], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="rounded-xl border border-antique-gold/30 bg-temple-stone/40 p-4"
              >
                <p className={`text-[11px] uppercase tracking-[0.18em] text-antique-gold ${lang === "te" ? "font-telugu normal-case" : "font-carved"}`}>
                  {lang === "te" ? fieldLabels[key]?.te : fieldLabels[key]?.en}
                </p>
                <p className="mt-1 font-display text-xl text-warm-ivory">{value}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-lg">
            <p className="font-body text-warm-ivory/75">{c.gatedNote}</p>
            <button
              onClick={() => scrollToId("contact")}
              data-cursor="open"
              className="mt-7 rounded-full border border-antique-gold/50 px-6 py-2.5 font-carved text-xs uppercase tracking-[0.2em] text-champagne-gold transition-colors hover:bg-antique-gold hover:text-temple-stone"
            >
              {c.reveal}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
