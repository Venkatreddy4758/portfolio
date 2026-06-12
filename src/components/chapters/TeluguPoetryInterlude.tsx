"use client";
// Short poetic Telugu line between chapters with an elegant mask reveal and a
// small English meaning beneath. `index` selects which couplet from content.
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
        <LotusMedallion size={34} tone="#C5A15A" open={inView} />
        <div className="mask-reveal max-w-2xl" data-shown={inView} style={{ ["--reveal-dur" as string]: "1.4s" }}>
          <p lang="te" className="font-telugu text-2xl leading-relaxed text-champagne-gold md:text-3xl">
            {poem.te}
          </p>
        </div>
        <motion.p
          className="max-w-md font-body text-sm italic text-warm-ivory/55"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {poem.en}
        </motion.p>
      </div>
    </section>
  );
}
