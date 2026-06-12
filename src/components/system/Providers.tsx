"use client";
import { GsapProvider } from "./GsapProvider";
import { LenisProvider } from "./LenisProvider";
import { AudioProvider } from "./AudioProvider";
import { LanguageProvider } from "@/lib/LanguageProvider";
import { privacy } from "@/config/privacy";

// Single client boundary that wraps the whole app with motion/scroll/lang/audio.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AudioProvider>
        <GsapProvider>
          <LenisProvider>
            <div className={privacy.blockImageDownload ? "no-save" : undefined}>
              {children}
            </div>
          </LenisProvider>
        </GsapProvider>
      </AudioProvider>
    </LanguageProvider>
  );
}
