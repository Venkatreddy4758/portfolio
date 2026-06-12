"use client";
import { createContext, useContext, useCallback, useEffect, useState } from "react";
import type { Lang } from "@/data/content";

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; toggle: () => void };
const Ctx = createContext<LangCtx | null>(null);
const KEY = "vr_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Restore session preference after mount (avoids hydration mismatch).
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(KEY) as Lang | null;
      // SSR-safe: sessionStorage is unavailable during render, so the session
      // language must be restored after mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved === "en" || saved === "te") setLangState(saved);
    } catch {}
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { sessionStorage.setItem(KEY, l); } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = l === "te" ? "te" : "en";
    }
  }, []);

  const toggle = useCallback(() => setLang(lang === "en" ? "te" : "en"), [lang, setLang]);

  return <Ctx.Provider value={{ lang, setLang, toggle }}>{children}</Ctx.Provider>;
}

export function useLang(): LangCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
