"use client";
// Ornamental section divider — a gold rule meeting a central lotus diamond.
import { LotusMedallion } from "./LotusMedallion";

type Props = { className?: string; tone?: string; label?: string };

export function SectionDivider({ className, tone = "#C5A15A", label }: Props) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className ?? ""}`} aria-hidden>
      <span className="h-px flex-1 max-w-[180px]" style={{ background: `linear-gradient(90deg, transparent, ${tone})` }} />
      <LotusMedallion size={28} tone={tone} />
      {label && (
        <span className="font-carved text-[11px] uppercase tracking-[0.3em]" style={{ color: tone }}>
          {label}
        </span>
      )}
      <LotusMedallion size={28} tone={tone} />
      <span className="h-px flex-1 max-w-[180px]" style={{ background: `linear-gradient(90deg, ${tone}, transparent)` }} />
    </div>
  );
}
