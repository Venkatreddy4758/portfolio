"use client";
// Scroll-reveal photo chapter (Section 11). Each photo gets a distinct reveal,
// driven by scroll position (GSAP ScrollTrigger scrub) — not a plain fade-up.
// Reveal style is chosen from the photo type.
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Photo } from "@/data/photos";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Portrait } from "./Portrait";

// Register at module load (client) so the plugin is ready before this
// component's effect creates a scrollTrigger timeline.
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Reveal =
  | "temple-door"
  | "silk-curtain"
  | "lotus-aperture"
  | "page-turn"
  | "gold-frame"
  | "carving-dissolve"
  | "focus-pull";

const revealByType: Record<string, Reveal> = {
  traditional: "temple-door",
  outdoor: "silk-curtain",
  casual: "lotus-aperture",
  education: "page-turn",
  professional: "gold-frame",
  native: "carving-dissolve",
  travel: "focus-pull",
};

export function ScrollRevealPhoto({
  photo,
  align = "center",
}: {
  photo: Photo;
  align?: "left" | "right" | "center";
}) {
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const reveal = revealByType[photo.type] ?? "silk-curtain";

  useEffect(() => {
    if (reduced) return;
    const el = root.current;
    if (!el) return;
    const img = el.querySelector<HTMLElement>(".srp-img");
    const door1 = el.querySelector<HTMLElement>(".srp-door-l");
    const door2 = el.querySelector<HTMLElement>(".srp-door-r");
    if (!img) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 85%", end: "top 30%", scrub: 0.6 },
      });

      switch (reveal) {
        case "temple-door":
          gsap.set([door1, door2], { display: "block" });
          tl.fromTo(door1, { xPercent: 0 }, { xPercent: -100, ease: "none" }, 0)
            .fromTo(door2, { xPercent: 0 }, { xPercent: 100, ease: "none" }, 0)
            .fromTo(img, { scale: 1.2 }, { scale: 1, ease: "none" }, 0);
          break;
        case "silk-curtain":
          tl.fromTo(img, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", ease: "none" });
          break;
        case "lotus-aperture":
          tl.fromTo(img, { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(75% at 50% 50%)", ease: "none" });
          break;
        case "page-turn":
          tl.fromTo(img, { rotateY: -80, transformOrigin: "left center", opacity: 0.3 }, { rotateY: 0, opacity: 1, ease: "none" });
          break;
        case "gold-frame":
          tl.fromTo(img, { clipPath: "inset(50% 50% 50% 50%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" });
          break;
        case "carving-dissolve":
          tl.fromTo(img, { opacity: 0, filter: "blur(14px) sepia(0.6)" }, { opacity: 1, filter: "blur(0px) sepia(0)", ease: "none" });
          break;
        case "focus-pull":
          tl.fromTo(img, { filter: "blur(16px)", scale: 1.1 }, { filter: "blur(0px)", scale: 1, ease: "none" });
          break;
      }
    }, el);
    return () => ctx.revert();
  }, [reveal, reduced]);

  const alignClass = align === "left" ? "lg:mr-auto" : align === "right" ? "lg:ml-auto" : "mx-auto";

  return (
    <div className="px-6 py-12">
      <div ref={root} className={`relative aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-2xl ring-1 ring-antique-gold/25 [perspective:1400px] ${alignClass}`}>
        <div className="srp-img absolute inset-0 h-full w-full">
          <Portrait photo={photo} sizes="(max-width: 768px) 90vw, 42rem" />
        </div>
        {/* carved doors for temple-door reveal */}
        <div className="srp-door-l absolute inset-y-0 left-0 z-10 hidden w-1/2 bg-gradient-to-r from-rose-soft to-blush-deep" style={{ boxShadow: "inset -12px 0 24px rgba(0,0,0,0.4)" }} />
        <div className="srp-door-r absolute inset-y-0 right-0 z-10 hidden w-1/2 bg-gradient-to-l from-rose-soft to-blush-deep" style={{ boxShadow: "inset 12px 0 24px rgba(0,0,0,0.4)" }} />
        {/* caption */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-cream/95 to-transparent p-5">
          <p className="font-display text-lg text-temple-stone">{photo.title}</p>
          <p lang="te" className="font-telugu text-sm text-rose">{photo.titleTelugu}</p>
        </div>
      </div>
    </div>
  );
}
