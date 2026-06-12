"use client";
// Refined EN · తె toggle. Switches ALL primary copy via the language context.
import { useLang } from "@/lib/LanguageProvider";

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center rounded-full border border-antique-gold/40 p-0.5 ${className ?? ""}`}
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        data-cursor="open"
        className={`rounded-full px-3 py-1 font-carved text-[11px] tracking-[0.15em] transition-colors ${
          lang === "en" ? "bg-antique-gold text-temple-stone" : "text-champagne-gold/80"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("te")}
        aria-pressed={lang === "te"}
        data-cursor="open"
        lang="te"
        className={`rounded-full px-3 py-1 font-telugu text-[13px] transition-colors ${
          lang === "te" ? "bg-antique-gold text-temple-stone" : "text-champagne-gold/80"
        }`}
      >
        తె
      </button>
    </div>
  );
}
