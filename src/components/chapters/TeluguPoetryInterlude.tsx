"use client";
// Short poetic Telugu line between chapters with an elegant mask reveal and a
// small English meaning beneath. `index` selects which couplet from content.
import { useRef } from "react";
import { useInView } from "framer-motion";
import { content } from "@/data/content";
import { LotusMedallion } from "@/components/art/LotusMedallion";

export function TeluguPoetryInterlude({
  index = 0,
  tone = "var(--color-temple-stone)",
}: {
  index?: number;
  tone?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25%" });
  const poem = content.poetry.en[index % content.poetry.en.length];

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center px-6 py-24 text-center"
      style={{ background: tone }}
      aria-label="Poetic interlude"
    >
      <div className="flex flex-col items-center gap-6">
        <LotusMedallion size={34} tone="#B7974A" open={inView} />
        <div className="mask-reveal max-w-2xl" data-shown={inView} style={{ ["--reveal-dur" as string]: "1.4s" }}>
          <p className="font-display text-2xl italic leading-relaxed text-royal-maroon md:text-3xl">
            {poem.en}
          </p>
        </div>
      </div>
    </section>
  );
}
