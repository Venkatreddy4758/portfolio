"use client";
// Elegant ambient-sound control. OFF by default; never autoplays.
import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/components/system/AudioProvider";
import { useLang } from "@/lib/LanguageProvider";
import { content } from "@/data/content";

export function AmbientAudioControl({ className }: { className?: string }) {
  const { enabled, toggle, available } = useAudio();
  const { lang } = useLang();
  if (!available) return null;
  const ui = content.ui[lang];

  return (
    <button
      type="button"
      onClick={toggle}
      data-cursor="open"
      aria-pressed={enabled}
      aria-label={enabled ? ui.audioOn : ui.audioOff}
      title={enabled ? ui.audioOn : ui.audioOff}
      className={`inline-flex items-center gap-2 rounded-full border border-antique-gold/50 px-3 py-1.5 text-royal-maroon/90 transition-all hover:border-antique-gold ${className ?? ""}`}
      style={{
        boxShadow:
          "0 0 0 1px rgba(183,151,74,0.15), 0 2px 10px rgba(12,40,33,0.18), 0 0 18px rgba(216,190,126,0.45)",
      }}
    >
      {enabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
      <span className={`text-[11px] tracking-[0.12em] ${"font-carved"}`}>
        {enabled ? ui.audioOn : ui.audioOff}
      </span>
      {enabled && (
        <span aria-hidden className="flex items-end gap-[2px]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-[2px] bg-antique-gold"
              style={{ height: 8, animation: `eq 1s ease-in-out ${i * 0.18}s infinite` }}
            />
          ))}
        </span>
      )}
      <style jsx>{`
        @keyframes eq {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </button>
  );
}
