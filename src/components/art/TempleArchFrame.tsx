"use client";
// Kakatiya-inspired pointed temple arch (toranam) used to frame portraits and
// hero content. Original geometry — not traced from any single temple. The arch
// is an SVG mask/outline; children render inside the opening.
import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  tone?: "gold" | "ivory" | "stone";
  withPillars?: boolean;
};

const stroke = {
  gold: "#C5A15A",
  ivory: "#F8F0DF",
  stone: "#6B4A3A",
};

export function TempleArchFrame({
  children,
  className,
  tone = "gold",
  withPillars = true,
}: Props) {
  const c = stroke[tone];
  return (
    <div className={`relative ${className ?? ""}`}>
      {/* The carved arch outline sits above the content via absolute SVG. */}
      <svg
        viewBox="0 0 400 520"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="taf-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={c} stopOpacity="0.95" />
            <stop offset="1" stopColor={c} stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {/* outer arch: shoulders + pointed crown + small kalasha finial */}
        <path
          d="M14 516 L14 150 Q14 96 60 70 Q120 36 200 30 Q280 36 340 70 Q386 96 386 150 L386 516"
          fill="none"
          stroke="url(#taf-grad)"
          strokeWidth="2.5"
        />
        <path
          d="M30 516 L30 156 Q30 110 70 86 Q126 54 200 48 Q274 54 330 86 Q370 110 370 156 L370 516"
          fill="none"
          stroke={c}
          strokeWidth="0.8"
          opacity="0.5"
        />
        {/* crown finial */}
        <path d="M200 30 L200 8 M188 18 Q200 -2 212 18" stroke={c} strokeWidth="1.6" fill="none" />
        <circle cx="200" cy="24" r="3" fill={c} />
        {/* carved corner scrolls */}
        <path d="M60 70 q-22 8 -26 34" stroke={c} strokeWidth="1" fill="none" opacity="0.7" />
        <path d="M340 70 q22 8 26 34" stroke={c} strokeWidth="1" fill="none" opacity="0.7" />
        {withPillars && (
          <>
            <line x1="22" y1="150" x2="22" y2="516" stroke={c} strokeWidth="1" opacity="0.4" />
            <line x1="378" y1="150" x2="378" y2="516" stroke={c} strokeWidth="1" opacity="0.4" />
          </>
        )}
      </svg>
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}
