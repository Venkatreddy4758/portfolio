"use client";
// Desktop floating navigation. Transparent, fine gold outline, active-chapter
// indicator, condenses on scroll-down and returns on scroll-up. Houses the
// language toggle + ambient audio control. Hidden on small screens.
import { useEffect, useRef, useState } from "react";
import { navSections, label } from "@/config/sections";
import { useLang } from "@/lib/LanguageProvider";
import { useActiveSection } from "@/lib/useActiveSection";
import { scrollToId } from "@/components/system/LenisProvider";
import { LanguageToggle } from "./LanguageToggle";
import { AmbientAudioControl } from "./AmbientAudioControl";
import { RoyalMonogram } from "@/components/art/RoyalMonogram";

export function LuxuryNavigation({ onSecret }: { onSecret?: () => void }) {
  const { lang } = useLang();
  const ids = navSections.map((s) => s.id);
  const { active } = useActiveSection(ids);
  const [hidden, setHidden] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setCondensed(y > 80);
      setHidden(y > lastY.current && y > 240);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`no-print fixed left-0 right-0 top-0 z-40 hidden items-center justify-between px-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:flex ${
        condensed ? "py-3" : "py-5"
      } ${hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
      style={{
        background: condensed
          ? "linear-gradient(to bottom, rgba(58,33,29,0.82), rgba(58,33,29,0))"
          : "transparent",
        backdropFilter: condensed ? "blur(8px)" : "none",
      }}
    >
      <button onClick={() => scrollToId("intro")} aria-label="Back to top" data-cursor="open">
        <RoyalMonogram size={condensed ? 40 : 52} onSecret={onSecret} />
      </button>

      <nav aria-label="Sections">
        <ul className="flex items-center gap-1 rounded-full border border-antique-gold/25 bg-temple-stone/30 px-2 py-1.5">
          {navSections.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <button
                  onClick={() => scrollToId(s.id)}
                  data-cursor="open"
                  className="group relative rounded-full px-3 py-1.5"
                >
                  <span
                    className={`font-carved text-[11px] uppercase tracking-[0.16em] transition-colors ${
                      isActive ? "text-champagne-gold" : "text-warm-ivory/55 group-hover:text-warm-ivory"
                    }`}
                  >
                    {s.en}
                  </span>
                  {/* Telugu label appears on hover */}
                  <span
                    lang="te"
                    className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap pt-1 font-telugu text-[11px] text-antique-gold opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    {s.te}
                  </span>
                  {isActive && (
                    <span className="absolute inset-x-2 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-antique-gold to-transparent" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex items-center gap-3">
        <AmbientAudioControl />
        <LanguageToggle />
      </div>
      {/* keep `label` import meaningful for future locale-aware aria */}
      <span className="sr-only">{navSections.map((s) => label(s, lang)).join(", ")}</span>
    </header>
  );
}
