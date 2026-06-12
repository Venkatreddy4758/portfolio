"use client";
// Carved temple pillar (Thousand-Pillar-Temple proportions, original geometry).
// Used to flank the family courtyard and education chapters.
type Props = { className?: string; tone?: string; height?: number };

export function Pillar({ className, tone = "#C5A15A", height = 480 }: Props) {
  return (
    <svg
      viewBox="0 0 60 480"
      width={60}
      height={height}
      preserveAspectRatio="none"
      className={className}
      fill="none"
      aria-hidden
    >
      {/* capital */}
      <rect x="6" y="0" width="48" height="14" fill={tone} opacity="0.9" />
      <path d="M2 14 L58 14 L50 26 L10 26 Z" fill={tone} opacity="0.8" />
      {/* shaft with carved bands */}
      <rect x="16" y="26" width="28" height="410" fill={tone} opacity="0.16" />
      <rect x="16" y="26" width="28" height="410" stroke={tone} strokeWidth="1" />
      {Array.from({ length: 7 }).map((_, i) => (
        <g key={i} transform={`translate(0 ${60 + i * 52})`}>
          <line x1="16" y1="0" x2="44" y2="0" stroke={tone} strokeWidth="0.6" opacity="0.6" />
          <circle cx="30" cy="20" r="3" fill={tone} opacity="0.5" />
          <path d="M22 36 Q30 28 38 36" stroke={tone} strokeWidth="0.6" fill="none" opacity="0.5" />
        </g>
      ))}
      {/* base */}
      <path d="M2 466 L58 466 L50 436 L10 436 Z" fill={tone} opacity="0.8" />
      <rect x="6" y="466" width="48" height="14" fill={tone} opacity="0.9" />
    </svg>
  );
}
