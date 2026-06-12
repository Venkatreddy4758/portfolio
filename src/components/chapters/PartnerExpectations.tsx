"use client";
// Partner expectations (Section 26) — graceful and positive. Editable text from
// content.ts. No caste/salary/appearance demands.
import { useRef } from "react";
import { useInView } from "framer-motion";
import { content } from "@/data/content";
import { useLang } from "@/lib/LanguageProvider";
import { LotusMedallion } from "@/components/art/LotusMedallion";

export function PartnerExpectations() {
  const { lang } = useLang();
  const p = content.partner[lang];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section className="relative bg-cream py-28">
      <div ref={ref} className="mx-auto max-w-3xl px-6 text-center">
        <div className="mb-8 flex justify-center">
          <LotusMedallion size={40} tone="#B95872" open={inView} />
        </div>
        <h2 className="font-display text-4xl leading-snug text-royal-maroon md:text-5xl">{p.title}</h2>
        <div className="mask-reveal mx-auto mt-10 max-w-2xl" data-shown={inView} style={{ ["--reveal-dur" as string]: "1.6s" }}>
          <p className={`text-lg leading-relaxed text-temple-stone/85 ${lang === "te" ? "font-telugu" : "font-display text-xl"}`}>
            {p.body}
          </p>
        </div>
      </div>
    </section>
  );
}
