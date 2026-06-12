"use client";
// Mango-leaf toranam — a hanging festoon border. Repeats horizontally and scales
// to any width. Used atop the family courtyard and ceremonial sections.
type Props = { className?: string; tone?: string; count?: number };

export function ToranamBorder({ className, tone = "#174E48", count = 14 }: Props) {
  return (
    <svg
      viewBox={`0 0 ${count * 40} 60`}
      preserveAspectRatio="none"
      className={`block w-full ${className ?? ""}`}
      height={36}
      aria-hidden
    >
      {/* string */}
      <path
        d={`M0 8 Q${(count * 40) / 2} 26 ${count * 40} 8`}
        stroke="#C5A15A"
        strokeWidth="1.2"
        fill="none"
      />
      {Array.from({ length: count }).map((_, i) => {
        const x = i * 40 + 20;
        const dip = Math.sin((i / (count - 1)) * Math.PI) * 14;
        const y = 10 + dip;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            {/* mango leaf */}
            <path
              d="M0 0 C-8 14 -6 34 0 44 C6 34 8 14 0 0 Z"
              fill={tone}
              opacity={0.9}
            />
            <path d="M0 4 L0 40" stroke="#0e2f2a" strokeWidth="0.6" opacity="0.6" />
            {/* small marigold accent */}
            {i % 2 === 0 && <circle cx="0" cy="48" r="3" fill="#D5A437" />}
          </g>
        );
      })}
    </svg>
  );
}
