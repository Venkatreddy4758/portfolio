"use client";
// Formal biodata drawer (Section 32). Side panel styled like handmade paper with
// an embossed seal and gold border. Horoscope + phone hidden unless their privacy
// flags allow. Actions: print/PDF, share, copy link.
import { useEffect } from "react";
import { X, Printer, Share2, Link2 } from "lucide-react";
import { profile } from "@/data/profile";
import { privacy } from "@/config/privacy";
import { useLang } from "@/lib/LanguageProvider";
import { getAge } from "@/lib/getAge";
import { LotusMedallion } from "@/components/art/LotusMedallion";

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4 border-b border-temple-stone/15 py-2">
      <span className="font-carved text-[11px] uppercase tracking-[0.12em] text-earth-brown">{label}</span>
      <span className="text-right font-body text-sm text-temple-stone">{value}</span>
    </div>
  );
}

export function BiodataDrawer({ open, onClose, onShare }: { open: boolean; onClose: () => void; onShare?: () => void }) {
  const { lang } = useLang();
  const age = getAge(profile.dateOfBirthISO);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const jEntries = Object.entries(profile.jathakam).filter(([, v]) => v !== "");
  const showHoroscope = privacy.showHoroscopePublicly && jEntries.length > 0;

  return (
    <div className={`no-print fixed inset-0 z-[70] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-temple-stone/70 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Formal biodata"
        className={`absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-moon-cream shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "translate-x-0" : "translate-x-full"}`}
        style={{ borderLeft: "6px double #C5A15A" }}
      >
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 text-earth-brown hover:text-royal-maroon">
          <X size={22} />
        </button>

        <div className="p-8">
          <div className="flex flex-col items-center text-center">
            <LotusMedallion size={44} tone="#9E2637" open />
            <h2 className="mt-3 font-display text-3xl text-royal-maroon">{profile.fullName}</h2>
            <p lang="te" className="font-telugu text-lg text-earth-brown">{profile.teluguName}</p>
            <div className="gold-rule my-4 w-40" />
          </div>

          <section className="mt-2">
            <Row label="Born" value={`${profile.dateOfBirth} · ${age} yrs`} />
            <Row label="Birth Time" value={profile.birthTime} />
            <Row label="Birthplace" value={profile.birthplace} />
            <Row label="Height" value={profile.height} />
            <Row label="Weight" value={profile.weight} />
            <Row label="Religion" value={`${profile.religion} · ${profile.caste} (${profile.subCaste})`} />
            <Row label="Mother Tongue" value={profile.motherTongue} />
            <Row label="Languages" value={profile.languagesKnown.join(", ")} />
            <Row label="Diet" value={profile.diet} />
          </section>

          {showHoroscope && (
            <section className="mt-4">
              <p className="mb-1 font-carved text-[11px] uppercase tracking-[0.2em] text-royal-maroon">Jathakam</p>
              {profile.jathakam.gotram && <Row label="Gotram" value={profile.jathakam.gotram} />}
              {profile.jathakam.rasi && <Row label="Rasi" value={profile.jathakam.rasi} />}
              {profile.jathakam.nakshatram && <Row label="Nakshatram" value={profile.jathakam.nakshatram} />}
              {profile.jathakam.padam && <Row label="Padam" value={profile.jathakam.padam} />}
            </section>
          )}

          <section className="mt-4">
            <p className="mb-1 font-carved text-[11px] uppercase tracking-[0.2em] text-royal-maroon">Education & Career</p>
            <Row label="Master's" value={profile.education.masters} />
            <Row label="Bachelor's" value={profile.education.bachelors} />
            <Row label="Profession" value={`${profile.profession.title}, ${profile.profession.company}`} />
            <Row label="Income" value={profile.profession.income} />
            <Row label="Work" value={`${profile.profession.location} · ${profile.profession.workMode}`} />
          </section>

          <section className="mt-4">
            <p className="mb-1 font-carved text-[11px] uppercase tracking-[0.2em] text-royal-maroon">Family</p>
            <Row label="Father" value={`${profile.family.father.name} · ${profile.family.father.occupation}`} />
            <Row label="Mother" value={`${profile.family.mother.name} · ${profile.family.mother.occupation}`} />
            {profile.family.siblings.map((s, i) => (
              <Row key={i} label={s.relation} value={`${s.name} · ${s.profession}`} />
            ))}
            <Row label="Native" value={privacy.showExactAddressPublicly ? profile.family.nativePlace : profile.birthplace} />
          </section>

          <div className="mt-8 flex gap-2">
            <a href="/biodata/print" target="_blank" className="flex flex-1 items-center justify-center gap-2 rounded-full bg-royal-maroon py-2.5 font-carved text-[11px] uppercase tracking-[0.15em] text-warm-ivory">
              <Printer size={14} /> Print / PDF
            </a>
            {onShare && (
              <button onClick={onShare} className="flex items-center justify-center gap-2 rounded-full border border-royal-maroon/40 px-4 py-2.5 font-carved text-[11px] uppercase tracking-[0.15em] text-royal-maroon">
                <Share2 size={14} />
              </button>
            )}
            <button onClick={() => navigator.clipboard?.writeText(window.location.href)} className="flex items-center justify-center gap-2 rounded-full border border-royal-maroon/40 px-4 py-2.5 text-royal-maroon">
              <Link2 size={14} />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
