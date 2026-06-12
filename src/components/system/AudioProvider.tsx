"use client";
import { createContext, useContext, useCallback, useEffect, useRef, useState } from "react";

// Ambient audio, OFF by default and never autoplaying. Uses a single looping
// track at /audio/ambient.mp3 (optional — gracefully no-ops if the file is absent).
type AudioCtx = { enabled: boolean; toggle: () => void; available: boolean };
const Ctx = createContext<AudioCtx | null>(null);
const KEY = "vr_audio";

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const a = new Audio("/audio/ambient.mp3");
    a.loop = true;
    a.volume = 0;
    a.preload = "none";
    a.addEventListener("error", () => setAvailable(false));
    ref.current = a;
    return () => {
      a.pause();
      ref.current = null;
    };
  }, []);

  const fade = useCallback((to: number) => {
    const a = ref.current;
    if (!a) return;
    const step = (to - a.volume) / 20;
    let i = 0;
    const id = setInterval(() => {
      if (!ref.current) return clearInterval(id);
      a.volume = Math.min(0.5, Math.max(0, a.volume + step));
      if (++i >= 20) {
        a.volume = to;
        clearInterval(id);
      }
    }, 30);
  }, []);

  const toggle = useCallback(() => {
    const a = ref.current;
    if (!a) return;
    setEnabled((prev) => {
      const next = !prev;
      try { sessionStorage.setItem(KEY, next ? "1" : "0"); } catch {}
      if (next) {
        a.play().then(() => fade(0.4)).catch(() => setAvailable(false));
      } else {
        fade(0);
        setTimeout(() => a.pause(), 650);
      }
      return next;
    });
  }, [fade]);

  return <Ctx.Provider value={{ enabled, toggle, available }}>{children}</Ctx.Provider>;
}

export function useAudio(): AudioCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}
