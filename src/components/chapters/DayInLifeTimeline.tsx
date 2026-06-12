"use client";
// "A Day in His Life" (Section 21). Morning/Work/Evening/Weekend, each with a
// changing background light, a clock transition and one sincere line. Interests
// pulled only from profile.interests (no invented hobbies).
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/data/content";
import { profile } from "@/data/profile";
import { useLang } from "@/lib/LanguageProvider";

const skyByPhase = [
  "linear-gradient(180deg, #FDF6EC 0%, #F6E9D8 100%)", // morning — warm cream
  "linear-gradient(180deg, #FDF6EC 0%, #EAE6DA 100%)", // work — soft neutral
  "linear-gradient(180deg, #F8E3E6 0%, #F0CDD3 100%)", // evening — blush
  "linear-gradient(180deg, #F6E9D8 0%, #F0CDD3 100%)", // weekend — sand to blush
];
const clockTimes = ["7:00", "11:00", "19:00", "—"];

export function DayInLifeTimeline() {
  const { lang } = useLang();
  const d = content.dayInLife[lang];
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden py-24 transition-all duration-700" style={{ background: skyByPhase[active] }}>
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-display text-4xl text-temple-stone md:text-5xl">{d.title}</h2>

        {/* phase tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {d.blocks.map((b, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              data-cursor="open"
              className={`rounded-full border px-5 py-2 text-sm transition-all ${
                active === i ? "border-royal-maroon bg-rose/90 text-temple-stone" : "border-royal-maroon/40 text-temple-stone/80"
              } ${lang === "te" ? "font-telugu" : "font-carved tracking-[0.12em]"}`}
            >
              {b.phase}
            </button>
          ))}
        </div>

        {/* clock + line */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="relative grid h-24 w-24 place-items-center rounded-full border border-royal-maroon/40">
            <AnimatePresence mode="wait">
              <motion.span
                key={active}
                initial={{ opacity: 0, rotate: -20 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 20 }}
                transition={{ duration: 0.5 }}
                className="font-display text-2xl text-temple-stone"
              >
                {clockTimes[active]}
              </motion.span>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
              className="max-w-md font-body text-lg leading-relaxed text-temple-stone/90"
            >
              {d.blocks[active].line}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* interests from profile only */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {profile.interests.map((interest) => (
            <span key={interest} className="rounded-full border border-royal-maroon/30 px-3 py-1 font-carved text-[11px] uppercase tracking-[0.15em] text-temple-stone/75">
              {interest}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
