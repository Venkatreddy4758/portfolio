import type { Lang } from "@/data/content";

// Single source of truth for section ids, nav labels and scroll-thread chapters.
export type Section = {
  id: string;
  en: string;
  te: string;
  inNav?: boolean; // shown in the top/bottom navigation
};

export const sections: Section[] = [
  { id: "intro", en: "Introduction", te: "ఆరంభం", inNav: true },
  { id: "story", en: "Story", te: "మూలాలు", inNav: true },
  { id: "education", en: "Education", te: "విద్య", inNav: true },
  { id: "career", en: "Career", te: "వృత్తి", inNav: true },
  { id: "family", en: "Family", te: "కుటుంబం", inNav: true },
  { id: "personality", en: "Personality", te: "వ్యక్తిత్వం" },
  { id: "gallery", en: "Gallery", te: "చిత్రాలు", inNav: true },
  { id: "values", en: "Values", te: "విలువలు", inNav: true },
  { id: "contact", en: "Contact", te: "సంప్రదింపు", inNav: true },
];

export const navSections = sections.filter((s) => s.inNav);
export const label = (s: Section, lang: Lang) => (lang === "te" ? s.te : s.en);
