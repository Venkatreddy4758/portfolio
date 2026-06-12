"use client";
// Bottom "jewellery-strip" navigation for touch devices. Shows ≤5 primary icons;
// the rest live in an elegant sheet. Generous touch targets, no tiny text.
import { useState } from "react";
import { Home, BookOpen, GraduationCap, Users, Image as ImageIcon, Menu, X, Heart, Mail, Briefcase } from "lucide-react";
import { navSections, type Section } from "@/config/sections";
import { useActiveSection } from "@/lib/useActiveSection";
import { scrollToId } from "@/components/system/LenisProvider";
import { AmbientAudioControl } from "./AmbientAudioControl";

const icons: Record<string, React.ComponentType<{ size?: number }>> = {
  intro: Home,
  story: BookOpen,
  education: GraduationCap,
  career: Briefcase,
  family: Users,
  gallery: ImageIcon,
  values: Heart,
  contact: Mail,
};

const primary = ["intro", "story", "gallery", "values", "contact"];

export function MobileNavigation() {
  const ids = navSections.map((s) => s.id);
  const { active } = useActiveSection(ids);
  const [open, setOpen] = useState(false);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  const Item = ({ s }: { s: Section }) => {
    const Icon = icons[s.id] ?? Home;
    const isActive = active === s.id;
    return (
      <button
        onClick={() => go(s.id)}
        aria-current={isActive ? "true" : undefined}
        className="flex min-w-[56px] flex-col items-center gap-1 py-2"
      >
        <span className={isActive ? "text-royal-maroon" : "text-temple-stone/55"}>
          <Icon size={20} />
        </span>
        <span className={`text-[9px] tracking-wide ${isActive ? "text-royal-maroon" : "text-temple-stone/45"}`}>
          {s.en}
        </span>
      </button>
    );
  };

  return (
    <>
      <nav
        aria-label="Sections"
        className="no-print fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-antique-gold/25 bg-blush/90 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      >
        {navSections.filter((s) => primary.includes(s.id)).map((s) => (
          <Item key={s.id} s={s} />
        ))}
        <button
          onClick={() => setOpen(true)}
          aria-label="More"
          className="flex min-w-[56px] flex-col items-center gap-1 py-2 text-temple-stone/55"
        >
          <Menu size={20} />
          <span className="text-[9px]">More</span>
        </button>
      </nav>

      {open && (
        <div className="no-print fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-blush/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-x-4 bottom-6 rounded-3xl border border-antique-gold/30 bg-cream p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-carved text-xs uppercase tracking-[0.25em] text-royal-maroon">
                Navigate
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close" className="text-temple-stone/70">
                <X size={20} />
              </button>
            </div>
            <ul className="grid grid-cols-2 gap-2">
              {navSections.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => go(s.id)}
                    className="w-full rounded-xl border border-antique-gold/20 px-4 py-3 text-left"
                  >
                    <span className="block font-display text-base text-temple-stone">{s.en}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-center">
              <AmbientAudioControl />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
