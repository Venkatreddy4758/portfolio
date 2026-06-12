"use client";
// Sticky storytelling (Section 12). Desktop: pinned right photo changes while the
// left narrative + background transition per chapter; Telugu chapter numerals on
// the side; progress line at the bottom. Mobile: lighter vertical story.
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/data/content";
import { useLang } from "@/lib/LanguageProvider";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { photoByType } from "@/data/photos";
import { Portrait } from "@/components/media/Portrait";

const photoTypes = ["outdoor", "education", "professional", "casual"];
const bgByChapter = ["#3a211d", "#153b34", "#3d2039", "#68452f"];

export function StickyPhotoNarrative() {
  const { lang } = useLang();
  const reduced = useReducedMotion();
  const chapters = content.story[lang];
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced || window.innerWidth < 1024) return;
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".story-panel");
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${panels.length * 100}%`,
        pin: ".story-sticky",
        scrub: true,
        onUpdate: (self) => {
          const idx = Math.min(panels.length - 1, Math.floor(self.progress * panels.length));
          setActive(idx);
        },
      });
    }, el);
    return () => ctx.revert();
  }, [reduced, chapters.length]);

  return (
    <section id="story" ref={root} className="relative lg:min-h-screen">
      {/* Desktop pinned stage */}
      <div
        className="story-sticky hidden min-h-screen items-center transition-colors duration-700 lg:flex"
        style={{ background: bgByChapter[active] }}
      >
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 items-center gap-12 px-10">
          {/* narrative */}
          <div className="relative">
            <span className="font-display text-[8rem] leading-none text-antique-gold/15">
              {chapters[active].no}
            </span>
            <div className="-mt-10">
              <p lang="te" className="font-telugu text-xl text-antique-gold">{chapters[active].kicker}</p>
              <h2 className="mt-2 font-display text-5xl text-champagne-gold">{chapters[active].title}</h2>
              <p className="mt-5 max-w-md font-body text-lg leading-relaxed text-warm-ivory/80">
                {chapters[active].body}
              </p>
            </div>
            {/* progress dots */}
            <div className="mt-10 flex gap-2">
              {chapters.map((_, i) => (
                <span key={i} className={`h-px transition-all duration-500 ${i === active ? "w-12 bg-champagne-gold" : "w-5 bg-warm-ivory/25"}`} />
              ))}
            </div>
          </div>
          {/* photo */}
          <div className="relative aspect-[3/4] w-full max-w-sm justify-self-center overflow-hidden rounded-2xl">
            {photoTypes.map((type, i) => {
              const p = photoByType(type);
              if (!p) return null;
              return (
                <div
                  key={type}
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{ opacity: i === active ? 1 : 0 }}
                >
                  <Portrait photo={p} sizes="40vw" />
                </div>
              );
            })}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-antique-gold/30 rounded-2xl" />
          </div>
        </div>
      </div>

      {/* Mobile vertical story */}
      <div className="lg:hidden">
        {chapters.map((ch, i) => {
          const p = photoByType(photoTypes[i]);
          return (
            <div key={ch.no} className="px-6 py-14" style={{ background: bgByChapter[i] }}>
              {p && (
                <div className="relative mb-6 aspect-[4/5] w-full overflow-hidden rounded-2xl">
                  <Portrait photo={p} sizes="90vw" />
                </div>
              )}
              <span className="font-display text-6xl text-antique-gold/20">{ch.no}</span>
              <p lang="te" className="-mt-4 font-telugu text-lg text-antique-gold">{ch.kicker}</p>
              <h2 className="mt-1 font-display text-3xl text-champagne-gold">{ch.title}</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-warm-ivory/80">{ch.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
