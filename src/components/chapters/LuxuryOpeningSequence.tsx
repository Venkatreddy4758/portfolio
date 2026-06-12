"use client";
// Cinematic opening (~4–6s, skippable). Ivory screen → rangoli draws → carved
// doors part → ceremonial light → Telugu then English name → lotus seal → enter.
// Respects prefers-reduced-motion (instant fade). Shows once per session.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/profile";
import { content } from "@/data/content";
import { useLang } from "@/lib/LanguageProvider";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { RangoliLoader } from "@/components/art/RangoliLoader";
import { LotusMedallion } from "@/components/art/LotusMedallion";

const SEEN_KEY = "vr_opening_seen";

export function LuxuryOpeningSequence({ onDone }: { onDone?: () => void }) {
  const { lang } = useLang();
  const reduced = useReducedMotion();
  const [show, setShow] = useState(true);
  const [stage, setStage] = useState(0); // 0 rangoli · 1 doors+light · 2 names · 3 seal
  const c = content.opening[lang];

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SEEN_KEY)) {
        // SSR-safe: only skip the intro after we can read sessionStorage on mount.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShow(false);
        onDone?.();
        return;
      }
    } catch {}
    if (reduced) {
      const t = setTimeout(finish, 600);
      return () => clearTimeout(t);
    }
    const timers = [
      setTimeout(() => setStage(1), 1600),
      setTimeout(() => setStage(2), 3000),
      setTimeout(() => setStage(3), 4400),
      setTimeout(finish, 6000),
    ];
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  function finish() {
    try { sessionStorage.setItem(SEEN_KEY, "1"); } catch {}
    setShow(false);
    onDone?.();
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-warm-ivory"
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          role="dialog"
          aria-label="Introduction"
        >
          {/* carved doors */}
          {!reduced && (
            <>
              <motion.div
                className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-temple-stone to-royal-maroon"
                initial={{ x: 0 }}
                animate={{ x: stage >= 1 ? "-100%" : 0 }}
                transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
                style={{ boxShadow: "inset -20px 0 40px rgba(0,0,0,0.4)" }}
              />
              <motion.div
                className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-temple-stone to-royal-maroon"
                initial={{ x: 0 }}
                animate={{ x: stage >= 1 ? "100%" : 0 }}
                transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
                style={{ boxShadow: "inset 20px 0 40px rgba(0,0,0,0.4)" }}
              />
            </>
          )}

          {/* ceremonial light shaft */}
          {stage >= 1 && (
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-0 h-full w-1/3 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 1.4 }}
              style={{ background: "linear-gradient(to bottom, rgba(229,201,142,0.5), transparent 70%)" }}
            />
          )}

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            {stage === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <RangoliLoader size={180} tone="#C5A15A" play />
              </motion.div>
            )}

            {stage >= 2 && (
              <>
                <motion.p
                  lang="te"
                  className="font-telugu text-3xl text-royal-maroon md:text-5xl"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {profile.teluguName}
                </motion.p>
                <motion.h1
                  className="mt-3 font-display text-4xl tracking-wide text-temple-stone md:text-6xl"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {profile.fullName}
                </motion.h1>
              </>
            )}

            {stage >= 3 && (
              <motion.div
                className="mt-8 flex flex-col items-center gap-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.6, ease: "easeOut" }}>
                  <LotusMedallion size={48} tone="#9E2637" open />
                </motion.div>
                <button
                  onClick={finish}
                  data-cursor="open"
                  className="rounded-full border border-royal-maroon/40 px-6 py-2.5 font-carved text-xs uppercase tracking-[0.25em] text-royal-maroon transition-colors hover:bg-royal-maroon hover:text-warm-ivory"
                >
                  {c.cta}
                </button>
              </motion.div>
            )}
          </div>

          <button
            onClick={finish}
            className="absolute bottom-6 right-6 z-20 font-carved text-[11px] uppercase tracking-[0.25em] text-royal-maroon/60 hover:text-royal-maroon"
          >
            {c.skip} →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
