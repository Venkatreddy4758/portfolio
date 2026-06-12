"use client";
// Vertical ceremonial gold thread on the right. Extends as you scroll, lotus
// markers activate per chapter, current chapter label shows, brightens near end.
import { sections, label } from "@/config/sections";
import { useLang } from "@/lib/LanguageProvider";
import { useActiveSection } from "@/lib/useActiveSection";
import { scrollToId } from "@/components/system/LenisProvider";

export function CeremonialScrollThread() {
  const { lang } = useLang();
  const ids = sections.map((s) => s.id);
  const { active, progress } = useActiveSection(ids);
  const activeIndex = Math.max(0, sections.findIndex((s) => s.id === active));

  return (
    <div
      aria-hidden
      className="no-print fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 lg:flex"
      style={{ height: "60vh" }}
    >
      <div className="relative flex flex-col items-center justify-between">
        {/* the thread */}
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-antique-gold/20" />
        <span
          className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-champagne-gold to-antique-gold transition-[height] duration-300"
          style={{
            height: `${progress * 100}%`,
            filter: progress > 0.8 ? "drop-shadow(0 0 6px #E4C98E)" : "none",
          }}
        />
        {sections.map((s, i) => {
          const reached = i <= activeIndex;
          const isActive = i === activeIndex;
          return (
            <button
              key={s.id}
              onClick={() => scrollToId(s.id)}
              className="group relative z-10 my-1 flex h-4 w-4 items-center justify-center"
              aria-label={label(s, lang)}
            >
              <span
                className={`h-2 w-2 rotate-45 transition-all duration-500 ${
                  reached ? "bg-champagne-gold" : "bg-antique-gold/30"
                } ${isActive ? "scale-150" : ""}`}
              />
              <span
                lang={lang === "te" ? "te" : undefined}
                className={`absolute right-full mr-3 whitespace-nowrap text-right text-[10px] tracking-[0.15em] transition-opacity ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                } ${lang === "te" ? "font-telugu text-antique-gold" : "font-carved uppercase text-champagne-gold"}`}
              >
                {label(s, lang)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
