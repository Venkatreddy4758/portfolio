"use client";
// Private inquiry form (Section 36). Posts to /api/inquiry; falls back to a
// mailto: link if the endpoint is unavailable. Honeypot + graceful states.
import { useState } from "react";
import { content } from "@/data/content";
import { useLang } from "@/lib/LanguageProvider";

type Status = "idle" | "sending" | "ok" | "error";

export function InquiryForm() {
  const { lang } = useLang();
  const c = content.contact[lang];
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", relation: "", contact: "", message: "", company: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // Honeypot: ignore bots silently.
    if (form.company) {
      setStatus("ok");
      return;
    }
    // Static host (GitHub Pages) — open the visitor's mail client. The recipient
    // is left blank so the family's address is never published in page source;
    // the visitor sends it to the address shared with them privately.
    const subject = encodeURIComponent("Family Introduction — Venkat Reddy Regulapally");
    const bodyText = encodeURIComponent(
      `Name: ${form.name}\nFamily / relation: ${form.relation}\nContact: ${form.contact}\n\n${form.message}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${bodyText}`;
    setStatus("ok");
    setForm({ name: "", relation: "", contact: "", message: "", company: "" });
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-antique-gold/30 bg-rose/5 p-8 text-center">
        <p className="font-display text-2xl text-royal-maroon">{c.formSuccess}</p>
      </div>
    );
  }

  const field = "w-full rounded-lg border border-antique-gold/30 bg-blush/40 px-4 py-3 text-temple-stone placeholder:text-temple-stone/40 focus:border-antique-gold focus:outline-none";

  return (
    <form onSubmit={submit} className="space-y-3">
      <h3 className={`text-center text-xl text-royal-maroon ${"font-display"}`}>{c.inquiryTitle}</h3>
      {/* honeypot (hidden) */}
      <input type="text" name="company" value={form.company} onChange={set("company")} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <input className={field} placeholder={c.formName} value={form.name} onChange={set("name")} required aria-label={c.formName} />
      <input className={field} placeholder={c.formRelation} value={form.relation} onChange={set("relation")} aria-label={c.formRelation} />
      <input className={field} placeholder={c.formContact} value={form.contact} onChange={set("contact")} required aria-label={c.formContact} />
      <textarea className={field} placeholder={c.formMessage} value={form.message} onChange={set("message")} rows={4} aria-label={c.formMessage} />
      {status === "error" && <p className="text-sm text-lotus-rose">{c.formError}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        data-cursor="open"
        className="w-full rounded-full bg-antique-gold py-3 font-carved text-xs uppercase tracking-[0.2em] text-temple-stone transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "…" : c.formSubmit}
      </button>
    </form>
  );
}
