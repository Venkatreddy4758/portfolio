"use client";
// Private contact experience (Section 37). Gated reveal checked server-side via
// /api/access (code + real numbers never ship to the client). Orchestrates the
// biodata drawer, share card and inquiry form.
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, MessageCircle, Mail, FileText, Share2, X } from "lucide-react";
import { privacy } from "@/config/privacy";
import { content } from "@/data/content";
import { useLang } from "@/lib/LanguageProvider";
import { SectionDivider } from "@/components/art/SectionDivider";
import { BiodataDrawer } from "./BiodataDrawer";
import { ShareCard } from "./ShareCard";
import { InquiryForm } from "./InquiryForm";

type Revealed = { phone: string; whatsapp: string; email: string } | null;

export function PrivateContactPanel() {
  const { lang } = useLang();
  const c = content.contact[lang];
  const [drawer, setDrawer] = useState(false);
  const [share, setShare] = useState(false);
  const [askCode, setAskCode] = useState(false);
  const [code, setCode] = useState("");
  const [revealed, setRevealed] = useState<Revealed>(null);
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);

  async function requestDetails() {
    if (!privacy.requireAccessCodeForContact) {
      setAskCode(true);
      return;
    }
    setAskCode(true);
  }

  async function submitCode(e: React.FormEvent) {
    e.preventDefault();
    setChecking(true);
    setError(false);
    try {
      const res = await fetch("/api/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (data.ok && data.contact) {
        setRevealed(data.contact);
        setAskCode(false);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setChecking(false);
    }
  }

  const btn = "flex items-center justify-center gap-2 rounded-full border border-antique-gold/50 px-6 py-3 font-carved text-[11px] uppercase tracking-[0.18em] text-champagne-gold transition-colors hover:bg-antique-gold hover:text-temple-stone";

  return (
    <section id="contact" className="grain relative bg-temple-stone py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <SectionDivider className="mb-8" />
        <h2 className={`text-4xl text-champagne-gold md:text-5xl ${lang === "te" ? "font-telugu" : "font-display"}`}>{c.title}</h2>

        {/* revealed contact (only after server check) */}
        <AnimatePresence>
          {revealed && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-8 flex max-w-md flex-col gap-2 rounded-2xl border border-antique-gold/30 bg-warm-ivory/5 p-6">
              {revealed.phone && <a href={`tel:${revealed.phone}`} className="flex items-center justify-center gap-2 text-warm-ivory"><Phone size={16} /> {revealed.phone}</a>}
              {revealed.whatsapp && privacy.enableWhatsAppContact && <a href={`https://wa.me/${revealed.whatsapp.replace(/\D/g, "")}`} className="flex items-center justify-center gap-2 text-warm-ivory"><MessageCircle size={16} /> WhatsApp</a>}
              {revealed.email && <a href={`mailto:${revealed.email}`} className="flex items-center justify-center gap-2 text-warm-ivory"><Mail size={16} /> {revealed.email}</a>}
            </motion.div>
          )}
        </AnimatePresence>

        {!revealed && (
          <p className="mx-auto mt-6 max-w-md font-body text-warm-ivory/70">{c.restricted}</p>
        )}

        {/* actions */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {!revealed && (
            <button onClick={requestDetails} className={btn} data-cursor="open">
              <Phone size={14} /> {c.requestDetails}
            </button>
          )}
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
        </div>

        {/* inquiry form */}
        {privacy.enableInquiryForm && (
          <div className="mx-auto mt-14 max-w-lg">
            <InquiryForm />
          </div>
        )}
      </div>

      {/* access code modal */}
      <AnimatePresence>
        {askCode && (
          <motion.div className="fixed inset-0 z-[75] grid place-items-center bg-temple-stone/85 px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true">
            <form onSubmit={submitCode} className="relative w-full max-w-sm rounded-2xl border border-antique-gold/40 bg-royal-maroon p-8 text-center">
              <button type="button" onClick={() => setAskCode(false)} aria-label="Close" className="absolute right-3 top-3 text-warm-ivory/70"><X size={18} /></button>
              <p className="font-display text-xl text-champagne-gold">{c.accessPrompt}</p>
              <p className="mt-2 text-xs text-warm-ivory/50">{privacy.accessCodeHint}</p>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                autoFocus
                className="mt-5 w-full rounded-lg border border-antique-gold/30 bg-temple-stone/40 px-4 py-3 text-center tracking-[0.3em] text-warm-ivory focus:border-antique-gold focus:outline-none"
                aria-label={c.accessPrompt}
              />
              {error && <p className="mt-3 text-sm text-lotus-rose">{c.accessError}</p>}
              <button type="submit" disabled={checking} className="mt-5 w-full rounded-full bg-antique-gold py-3 font-carved text-xs uppercase tracking-[0.2em] text-temple-stone disabled:opacity-60">
                {checking ? "…" : c.accessButton}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* share modal */}
      <AnimatePresence>
        {share && (
          <motion.div className="fixed inset-0 z-[75] grid place-items-center bg-temple-stone/85 px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShare(false)} role="dialog" aria-modal="true">
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
