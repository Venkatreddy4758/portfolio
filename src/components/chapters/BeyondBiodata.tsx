"use client";
// "Beyond the Biodata" — personality, not facts. Cinematic editorial statements
// with a candid photo set between the blocks.
import { motion } from "framer-motion";
import { content } from "@/data/content";
import { useLang } from "@/lib/LanguageProvider";
import { photoByType } from "@/data/photos";
import { Portrait } from "@/components/media/Portrait";
import { SectionDivider } from "@/components/art/SectionDivider";

export function BeyondBiodata() {
  const { lang } = useLang();
  const c = content.beyond[lang];
  const candid = photoByType("candid");

  return (
    <section className="grain relative bg-blush py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <SectionDivider className="mb-10" />
        <motion.h2
          className="font-display text-4xl text-royal-maroon md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {c.title}
        </motion.h2>

        <div className="mt-16 space-y-14">
          {c.lines.map((line, i) => (
            <div key={i}>
              <motion.p
                className={`mx-auto max-w-2xl font-display leading-snug text-temple-stone ${i === 0 ? "text-2xl md:text-4xl" : "text-xl md:text-2xl text-temple-stone/85"}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.p>

              {/* candid photo between the first and second statements */}
              {i === 0 && candid && (
                <motion.div
                  className="mx-auto my-14 aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl ring-1 ring-antique-gold/25"
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Portrait photo={candid} sizes="(max-width: 768px) 90vw, 28rem" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
