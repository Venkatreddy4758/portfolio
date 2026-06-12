"use client";
// Traditional one-page printable biodata (Section 33). Tasteful single page that
// looks professional in black-and-white and respects all privacy flags. This is
// the artefact relatives circulate.
import Image from "next/image";
import { profile } from "@/data/profile";
import { privacy } from "@/config/privacy";
import { photoByType } from "@/data/photos";
import { getAge } from "@/lib/getAge";

function Line({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <tr>
      <td className="py-1 pr-3 align-top text-[11px] font-semibold uppercase tracking-wide text-[#741f3a] whitespace-nowrap">{label}</td>
      <td className="py-1 align-top text-[12.5px] text-[#2a1714]">{value}</td>
    </tr>
  );
}

export function PrintableBiodata() {
  const age = getAge(profile.dateOfBirthISO);
  const photo = photoByType("hero");
  const jEntries = Object.entries(profile.jathakam).filter(([, v]) => v !== "");
  const showHoroscope = privacy.showHoroscopePublicly && jEntries.length > 0;
  const jLabels: Record<string, string> = { gotram: "Gotram", rasi: "Rasi", nakshatram: "Nakshatram", padam: "Padam", lagnam: "Lagnam", kujaDosham: "Kuja Dosham" };

  return (
    <div className="mx-auto bg-white text-[#2a1714] print:shadow-none" style={{ width: "210mm", minHeight: "297mm", padding: "16mm" }}>
      {/* header */}
      <header className="relative border-[3px] border-double border-[#C5A15A] p-6 text-center">
        <div className="mx-auto mb-2 h-10 w-10">
          <svg viewBox="0 0 100 100" aria-hidden>
            <circle cx="50" cy="50" r="46" fill="none" stroke="#C5A15A" strokeWidth="2" />
            {Array.from({ length: 8 }).map((_, i) => (
              <path key={i} d="M50 50 C44 30 44 18 50 8 C56 18 56 30 50 50 Z" fill="#9E2637" opacity="0.8" transform={`rotate(${i * 45} 50 50)`} />
            ))}
            <circle cx="50" cy="50" r="6" fill="#C5A15A" />
          </svg>
        </div>
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#741f3a]">శ్రీ గణేశాయ నమః</p>
        <h1 className="mt-1 font-serif text-3xl text-[#5e1826]">{profile.fullName}</h1>
        <p className="font-serif text-lg text-[#741f3a]">{profile.teluguName}</p>
      </header>

      <div className="mt-6 grid grid-cols-[1fr_60mm] gap-6">
        {/* fact tables */}
        <div>
          <h2 className="mb-1 border-b border-[#C5A15A] pb-0.5 font-serif text-sm font-bold uppercase tracking-wide text-[#5e1826]">Personal Details</h2>
          <table className="w-full border-collapse">
            <tbody>
              <Line label="Date of Birth" value={`${profile.dateOfBirth} (${age} yrs)`} />
              <Line label="Birth Time" value={profile.birthTime} />
              <Line label="Birthplace" value={profile.birthplace} />
              <Line label="Height / Weight" value={`${profile.height} · ${profile.weight}`} />
              <Line label="Religion / Caste" value={`${profile.religion}, ${profile.caste} (${profile.subCaste})`} />
              <Line label="Mother Tongue" value={profile.motherTongue} />
              <Line label="Languages" value={profile.languagesKnown.join(", ")} />
              <Line label="Diet" value={profile.diet} />
            </tbody>
          </table>

          {showHoroscope && (
            <>
              <h2 className="mb-1 mt-4 border-b border-[#C5A15A] pb-0.5 font-serif text-sm font-bold uppercase tracking-wide text-[#5e1826]">Jathakam</h2>
              <table className="w-full border-collapse">
                <tbody>
                  {jEntries.map(([k, v]) => (
                    <Line key={k} label={jLabels[k] ?? k} value={v as string} />
                  ))}
                </tbody>
              </table>
            </>
          )}

          <h2 className="mb-1 mt-4 border-b border-[#C5A15A] pb-0.5 font-serif text-sm font-bold uppercase tracking-wide text-[#5e1826]">Education & Profession</h2>
          <table className="w-full border-collapse">
            <tbody>
              <Line label="Master's" value={profile.education.masters} />
              <Line label="Bachelor's" value={profile.education.bachelors} />
              <Line label="School" value={profile.education.school} />
              <Line label="Profession" value={`${profile.profession.title}, ${profile.profession.company}`} />
              <Line label="Income" value={profile.profession.income} />
              <Line label="Work Mode" value={`${profile.profession.location} · ${profile.profession.workMode}`} />
            </tbody>
          </table>
        </div>

        {/* portrait */}
        <div>
          <div className="relative aspect-[3/4] w-full overflow-hidden border-[3px] border-[#C5A15A]">
            {photo && (
              <Image src={photo.src} alt={photo.alt} fill className="object-cover" style={{ objectPosition: photo.focalPoint.desktop }} sizes="60mm" />
            )}
          </div>
        </div>
      </div>

      {/* family */}
      <div className="mt-4">
        <h2 className="mb-1 border-b border-[#C5A15A] pb-0.5 font-serif text-sm font-bold uppercase tracking-wide text-[#5e1826]">Family Details</h2>
        <table className="w-full border-collapse">
          <tbody>
            <Line label="Grandfather" value={profile.family.grandfather} />
            <Line label="Father" value={`${profile.family.father.name} · ${profile.family.father.occupation}`} />
            <Line label="Mother" value={`${profile.family.mother.name} · ${profile.family.mother.occupation}`} />
            {profile.family.siblings.map((s, i) => (
              <Line key={i} label={s.relation} value={`${s.name} · ${s.profession} · ${s.maritalStatus}`} />
            ))}
            <Line label="Native Place" value={privacy.showExactAddressPublicly ? profile.family.nativePlace : profile.birthplace} />
          </tbody>
        </table>
      </div>

      {/* contact (only if public) */}
      <div className="mt-5 border-t border-[#C5A15A] pt-3 text-center">
        {privacy.showPhoneNumbersPublicly && !privacy.requireAccessCodeForContact ? (
          <p className="text-[12px] text-[#2a1714]">Contact shared with the printed copy.</p>
        ) : (
          <p className="text-[11px] italic text-[#741f3a]">Contact details are shared privately with interested families.</p>
        )}
        <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[#C5A15A]">శుభమస్తు</p>
      </div>
    </div>
  );
}
