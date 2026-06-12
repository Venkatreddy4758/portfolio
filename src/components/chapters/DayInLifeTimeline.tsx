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
  "linear-gradient(180deg, #E4C98E 0%, #B95872 100%)", // morning
  "linear-gradient(180deg, #174E48 0%, #153B34 100%)", // work
  "linear-gradient(180deg, #741F3A 0%, #3D2039 100%)", // evening
  "linear-gradient(180deg, #3A211D 0%, #5E1826 100%)", // weekend
];
const clockTimes = ["7:00", "11:00", "19:00", "—"];

export function DayInLifeTimeline() {
  const { lang } = useLang();
  const d = content.dayInLife[lang];
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden py-24 transition-all duration-700" style={{ background: skyByPhase[active] }}>
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-display text-4xl text-warm-ivory md:text-5xl">{d.title}</h2>

        {/* phase tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {d.blocks.map((b, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              data-cursor="open"
              className={`rounded-full border px-5 py-2 text-sm transition-all ${
                active === i ? "border-warm-ivory bg-warm-ivory/90 text-temple-stone" : "border-warm-ivory/40 text-warm-ivory/80"
              } ${lang === "te" ? "font-telugu" : "font-carved tracking-[0.12em]"}`}
            >
              {b.phase}
            </button>
          ))}
        </div>

        {/* clock + line */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="relative grid h-24 w-24 place-items-center rounded-full border border-warm-ivory/40">
            <AnimatePresence mode="wait">
              <motion.span
                key={active}
                initial={{ opacity: 0, rotate: -20 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 20 }}
                transition={{ duration: 0.5 }}
                className="font-display text-2xl text-warm-ivory"
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
              className="max-w-md font-body text-lg leading-relaxed text-warm-ivory/90"
            >
              {d.blocks[active].line}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* interests from profile only */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {profile.interests.map((interest) => (
            <span key={interest} className="rounded-full border border-warm-ivory/30 px-3 py-1 font-carved text-[11px] uppercase tracking-[0.15em] text-warm-ivory/75">
              {interest}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
