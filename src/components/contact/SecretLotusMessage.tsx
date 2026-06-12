"use client";
// Secret cultural interactions (Section 31). A hidden lotus seal that, on click,
// softens the lights and blooms a Telugu line with English meaning; plus a
// blessing overlay triggered by 5 clicks on the monogram (driven from the page).
import { AnimatePresence, motion } from "framer-motion";
import { content } from "@/data/content";
import { useLang } from "@/lib/LanguageProvider";
import { LotusMedallion } from "@/components/art/LotusMedallion";
import { useState } from "react";

// The blessing overlay (monogram 5-click). Controlled by the parent.
export function SecretBlessing({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang } = useLang();
  const s = content.secret[lang];
  return (
    <AnimatePresence>
      {open && (
        <motion.button
          className="fixed inset-0 z-[95] grid place-items-center bg-blush/95 px-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-label="Close blessing"
        >
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center gap-6">
            <LotusMedallion size={64} tone="#B7974A" open />
            <p className="font-display text-2xl leading-relaxed text-royal-maroon md:text-4xl">
              Two hearts,
              <br />two families,
              <br />one beautiful future.
            </p>
            <p className="font-body text-sm italic text-temple-stone/60">{s.blessing}</p>
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// The hidden lotus seal — place subtly in the page. Click to reveal the message.
export function SecretLotusMessage() {
  const { lang } = useLang();
  const s = content.secret[lang];
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="A hidden blessing"
        data-cursor="chudandi"
        className="mx-auto block py-10 opacity-40 transition-opacity hover:opacity-90"
      >
        <LotusMedallion size={36} tone="#C5A15A" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.button
            className="fixed inset-0 z-[95] grid place-items-center px-6 text-center backdrop-blur-sm"
            style={{ background: "rgba(58,33,29,0.92)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center gap-6">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.4 }}>
                <LotusMedallion size={72} tone="#B7974A" open />
              </motion.div>
              <motion.p className="max-w-xl font-display text-2xl italic leading-relaxed text-royal-maroon md:text-3xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                {s.lotus}
              </motion.p>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
