"use client";
// Private contact experience (Section 37), static-host edition. On GitHub Pages
// there is no server, so contact details are never published — families connect
// through the introduction form (opens the visitor's mail client). The biodata
// drawer, printable biodata and share card remain fully client-side.
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Share2, Mail } from "lucide-react";
import { privacy } from "@/config/privacy";
import { content } from "@/data/content";
import { useLang } from "@/lib/LanguageProvider";
import { SectionDivider } from "@/components/art/SectionDivider";
import { BiodataDrawer } from "./BiodataDrawer";
import { ShareCard } from "./ShareCard";
import { InquiryForm } from "./InquiryForm";

export function PrivateContactPanel() {
  const { lang } = useLang();
  const c = content.contact[lang];
  const [drawer, setDrawer] = useState(false);
  const [share, setShare] = useState(false);

  const btn =
    "flex items-center justify-center gap-2 rounded-full border border-antique-gold/50 px-6 py-3 font-carved text-[11px] uppercase tracking-[0.18em] text-royal-maroon transition-colors hover:bg-antique-gold hover:text-temple-stone";

  return (
    <section id="contact" className="grain relative bg-blush py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <SectionDivider className="mb-8" />
        <h2 className={`text-4xl text-royal-maroon md:text-5xl ${"font-display"}`}>{c.title}</h2>

        <p className="mx-auto mt-6 max-w-md font-body text-temple-stone/70">{c.restricted}</p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button onClick={() => setDrawer(true)} className={btn} data-cursor="open">
            <FileText size={14} /> {c.viewBiodata}
          </button>
          <button onClick={() => setShare(true)} className={btn} data-cursor="open">
            <Share2 size={14} /> {c.shareProfile}
          </button>
          {privacy.enableBiodataDownload && (
            <a href="/biodata/print" target="_blank" className={btn} data-cursor="open">
              <FileText size={14} /> {c.downloadBiodata}
            </a>
          )}
          <a href="#contact-form" className={btn} data-cursor="open">
            <Mail size={14} /> {c.contactFamily}
          </a>
        </div>

        {privacy.enableInquiryForm && (
          <div id="contact-form" className="mx-auto mt-14 max-w-lg scroll-mt-24">
            <InquiryForm />
          </div>
        )}
      </div>

      <AnimatePresence>
        {share && (
          <motion.div
            className="fixed inset-0 z-[75] grid place-items-center bg-blush/85 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShare(false)}
            role="dialog"
            aria-modal="true"
          >
            <div onClick={(e) => e.stopPropagation()}>
              <ShareCard onClose={() => setShare(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BiodataDrawer open={drawer} onClose={() => setDrawer(false)} onShare={() => { setDrawer(false); setShare(true); }} />
    </section>
  );
}
